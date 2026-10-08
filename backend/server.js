const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { MOCK_BOOKINGS } = require('./mock-registrations');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'spotbukk_secure_jwt_secret_key_2026';

// In-memory registration registry initialized with mock bookings
let activeBookings = JSON.parse(JSON.stringify(MOCK_BOOKINGS));

// Allowed CORS origins
const allowedOrigins = [
  'http://localhost:4200',
  'http://localhost:4300',
  process.env.CLIENT_URL
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error(`CORS policy: Origin ${origin} not allowed`));
  },
  credentials: true
}));

app.use(express.json());

// Helper to get active credentials from environment
function getCredentials() {
  dotenv.config();
  const key_id = process.env.RAZORPAY_KEY_ID;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;

  if (!key_id || !key_secret) {
    throw new Error('Razorpay credentials missing. Please set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in .env');
  }

  return { key_id, key_secret };
}

// ===================================================================
// IN-MEMORY USER REGISTRY & OTP STORE (SERVER TRUTH)
// ===================================================================

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'SpotBukkAdmin2026!';

// Trusted Admin accounts defined on the server
const TRUSTED_ADMINS = [
  {
    id: 'usr_admin_01',
    email: 'admin@spotbukk.com',
    name: 'Noctra Curator',
    fullName: 'Noctra Curator (Admin)',
    role: 'ADMIN',
    authenticationProvider: 'ADMIN'
  },
  {
    id: 'usr_admin_02',
    email: 'curator@spotbukk.com',
    name: 'Lead Curator',
    fullName: 'Lead Curator (Admin)',
    role: 'ADMIN',
    authenticationProvider: 'ADMIN'
  }
];

// In-memory registered end users
const registeredUsers = new Map();

// OTP Store: Key -> { code, expiresAt, attempts, lastSentAt }
const otpStore = new Map();

// Helper to normalize phone
function normalizePhone(phone) {
  if (!phone) return '';
  return phone.replace(/[^\d+]/g, '');
}

// Helper to normalize email
function normalizeEmail(email) {
  if (!email) return '';
  return email.trim().toLowerCase();
}

// ===================================================================
// AUTHENTICATION & AUTHORIZATION MIDDLEWARE
// ===================================================================

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized: Authentication token required'
    });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized: Invalid or expired session token'
      });
    }
    req.user = decoded;
    next();
  });
}

function requireAdmin(req, res, next) {
  if (!req.user || req.user.role !== 'ADMIN') {
    return res.status(403).json({
      success: false,
      error: 'Forbidden: Administrator privileges required.',
      role: req.user ? req.user.role : null
    });
  }
  next();
}

// ===================================================================
// AUTHENTICATION ENDPOINTS
// ===================================================================

// 1. Google OAuth / One-Tap Authentication (END_USER ONLY)
app.post('/api/auth/google', (req, res) => {
  try {
    const { email, name, picture, credential } = req.body;
    let userEmail = email;
    let userName = name;

    // Decode JWT credential payload if provided
    if (credential && typeof credential === 'string') {
      try {
        const parts = credential.split('.');
        if (parts.length === 3) {
          const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString('utf8'));
          if (payload.email) userEmail = payload.email;
          if (payload.name) userName = payload.name;
        }
      } catch (e) {
        // Fallback to body fields
      }
    }

    if (!userEmail) {
      return res.status(400).json({
        success: false,
        error: 'Valid Google account email is required'
      });
    }

    const cleanEmail = normalizeEmail(userEmail);
    let user = registeredUsers.get(cleanEmail);

    if (!user) {
      user = {
        id: `usr_g_${crypto.randomBytes(4).toString('hex')}`,
        email: cleanEmail,
        name: userName || cleanEmail.split('@')[0],
        fullName: userName || cleanEmail.split('@')[0],
        avatarUrl: picture || '',
        authenticationProvider: 'GOOGLE',
        role: 'END_USER', // Strictly enforced server-side
        createdAt: new Date().toISOString()
      };
      registeredUsers.set(cleanEmail, user);
    }

    // Always enforce END_USER role for Google social logins
    user.role = 'END_USER';
    user.authenticationProvider = 'GOOGLE';

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
        fullName: user.fullName,
        role: 'END_USER',
        authenticationProvider: 'GOOGLE'
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return res.status(200).json({
      success: true,
      token,
      user
    });
  } catch (error) {
    console.error('Google auth error:', error);
    return res.status(500).json({
      success: false,
      error: 'Google authentication service encountered an error'
    });
  }
});

// 2. Phone OTP: Send Code
app.post('/api/auth/phone/send-otp', (req, res) => {
  try {
    const { phone } = req.body;
    const cleanPhone = normalizePhone(phone);

    if (!cleanPhone || cleanPhone.replace(/\D/g, '').length < 10) {
      return res.status(400).json({
        success: false,
        error: 'Please enter a valid phone number (minimum 10 digits)'
      });
    }

    const existing = otpStore.get(`phone:${cleanPhone}`);
    const now = Date.now();

    // 30 seconds rate-limit cooldown
    if (existing && existing.lastSentAt && now - existing.lastSentAt < 30000) {
      const waitSeconds = Math.ceil((30000 - (now - existing.lastSentAt)) / 1000);
      return res.status(429).json({
        success: false,
        error: `Please wait ${waitSeconds} seconds before requesting a new code.`
      });
    }

    // Generate 6-digit cryptographic random OTP
    const code = crypto.randomInt(100000, 999999).toString();
    const expiresAt = now + 5 * 60 * 1000; // 5 minutes

    otpStore.set(`phone:${cleanPhone}`, {
      code,
      expiresAt,
      attempts: 0,
      lastSentAt: now
    });

    // Securely log OTP on server console for testing/development (NEVER expose to client)
    console.log(`\x1b[36m[AUTH SMS SERVICE]\x1b[0m Verification code for ${cleanPhone}: \x1b[33m${code}\x1b[0m (valid for 5 mins)`);

    return res.status(200).json({
      success: true,
      message: 'Verification code sent via SMS.',
      cooldownSeconds: 30,
      expiresInSeconds: 300
    });
  } catch (error) {
    console.error('Phone send-otp error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to dispatch phone verification code'
    });
  }
});

// 2. Phone OTP: Verify Code
app.post('/api/auth/phone/verify-otp', (req, res) => {
  try {
    const { phone, otp } = req.body;
    const cleanPhone = normalizePhone(phone);

    if (!cleanPhone || !otp) {
      return res.status(400).json({
        success: false,
        error: 'Phone number and verification code are required'
      });
    }

    const record = otpStore.get(`phone:${cleanPhone}`);
    const now = Date.now();

    if (!record) {
      return res.status(400).json({
        success: false,
        error: 'No active verification code found for this phone number. Please request a new code.'
      });
    }

    if (now > record.expiresAt) {
      otpStore.delete(`phone:${cleanPhone}`);
      return res.status(400).json({
        success: false,
        error: 'Verification code has expired. Please request a new code.'
      });
    }

    record.attempts += 1;
    if (record.attempts > 5) {
      otpStore.delete(`phone:${cleanPhone}`);
      return res.status(429).json({
        success: false,
        error: 'Too many incorrect attempts. Code revoked. Please request a new code.'
      });
    }

    if (record.code !== String(otp).trim()) {
      return res.status(400).json({
        success: false,
        error: 'Invalid verification code. Please check and try again.'
      });
    }

    // OTP Verified — Invalidate OTP
    otpStore.delete(`phone:${cleanPhone}`);

    // Find or create end user
    let user = registeredUsers.get(cleanPhone);
    if (!user) {
      user = {
        id: `usr_p_${crypto.randomBytes(4).toString('hex')}`,
        phone: cleanPhone,
        name: `Guest (${cleanPhone.slice(-4)})`,
        fullName: `Guest Attendee (${cleanPhone.slice(-4)})`,
        role: 'END_USER', // Strictly enforced
        authenticationProvider: 'PHONE',
        createdAt: new Date().toISOString()
      };
      registeredUsers.set(cleanPhone, user);
    }

    user.role = 'END_USER';
    user.authenticationProvider = 'PHONE';

    const token = jwt.sign(
      {
        id: user.id,
        phone: user.phone,
        name: user.name,
        fullName: user.fullName,
        role: 'END_USER',
        authenticationProvider: 'PHONE'
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return res.status(200).json({
      success: true,
      token,
      user
    });
  } catch (error) {
    console.error('Phone verify-otp error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to verify phone OTP'
    });
  }
});

// 3. Email OTP: Send Code
app.post('/api/auth/email/send-otp', (req, res) => {
  try {
    const { email } = req.body;
    const cleanEmail = normalizeEmail(email);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!cleanEmail || !emailRegex.test(cleanEmail)) {
      return res.status(400).json({
        success: false,
        error: 'Please enter a valid email address'
      });
    }

    const existing = otpStore.get(`email:${cleanEmail}`);
    const now = Date.now();

    // 30 seconds rate-limit cooldown
    if (existing && existing.lastSentAt && now - existing.lastSentAt < 30000) {
      const waitSeconds = Math.ceil((30000 - (now - existing.lastSentAt)) / 1000);
      return res.status(429).json({
        success: false,
        error: `Please wait ${waitSeconds} seconds before requesting a new code.`
      });
    }

    const code = crypto.randomInt(100000, 999999).toString();
    const expiresAt = now + 10 * 60 * 1000; // 10 minutes

    otpStore.set(`email:${cleanEmail}`, {
      code,
      expiresAt,
      attempts: 0,
      lastSentAt: now
    });

    // Securely log OTP on server console for testing/development (NEVER expose to client)
    console.log(`\x1b[36m[AUTH EMAIL SERVICE]\x1b[0m Verification code for ${cleanEmail}: \x1b[33m${code}\x1b[0m (valid for 10 mins)`);

    return res.status(200).json({
      success: true,
      message: 'Verification code sent to your email address.',
      cooldownSeconds: 30,
      expiresInSeconds: 600
    });
  } catch (error) {
    console.error('Email send-otp error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to dispatch email verification code'
    });
  }
});

// 3. Email OTP: Verify Code
app.post('/api/auth/email/verify-otp', (req, res) => {
  try {
    const { email, otp } = req.body;
    const cleanEmail = normalizeEmail(email);

    if (!cleanEmail || !otp) {
      return res.status(400).json({
        success: false,
        error: 'Email address and verification code are required'
      });
    }

    const record = otpStore.get(`email:${cleanEmail}`);
    const now = Date.now();

    if (!record) {
      return res.status(400).json({
        success: false,
        error: 'No active verification code found for this email. Please request a new code.'
      });
    }

    if (now > record.expiresAt) {
      otpStore.delete(`email:${cleanEmail}`);
      return res.status(400).json({
        success: false,
        error: 'Verification code has expired. Please request a new code.'
      });
    }

    record.attempts += 1;
    if (record.attempts > 5) {
      otpStore.delete(`email:${cleanEmail}`);
      return res.status(429).json({
        success: false,
        error: 'Too many incorrect attempts. Code revoked. Please request a new code.'
      });
    }

    if (record.code !== String(otp).trim()) {
      return res.status(400).json({
        success: false,
        error: 'Invalid verification code. Please check and try again.'
      });
    }

    // OTP Verified — Invalidate OTP
    otpStore.delete(`email:${cleanEmail}`);

    // Find or create end user
    let user = registeredUsers.get(cleanEmail);
    if (!user) {
      const displayName = cleanEmail.split('@')[0];
      user = {
        id: `usr_e_${crypto.randomBytes(4).toString('hex')}`,
        email: cleanEmail,
        name: displayName,
        fullName: displayName,
        role: 'END_USER', // Strictly enforced
        authenticationProvider: 'EMAIL',
        createdAt: new Date().toISOString()
      };
      registeredUsers.set(cleanEmail, user);
    }

    user.role = 'END_USER';
    user.authenticationProvider = 'EMAIL';

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
        fullName: user.fullName,
        role: 'END_USER',
        authenticationProvider: 'EMAIL'
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return res.status(200).json({
      success: true,
      token,
      user
    });
  } catch (error) {
    console.error('Email verify-otp error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to verify email OTP'
    });
  }
});

// 4. Secure Admin Authentication (ADMIN ROLE ASSIGNED ONLY BY SERVER)
app.post('/api/auth/admin/login', (req, res) => {
  try {
    const { email, password } = req.body;
    const cleanEmail = normalizeEmail(email);

    if (!cleanEmail || !password) {
      return res.status(400).json({
        success: false,
        error: 'Administrator email and security password are required'
      });
    }

    // Verify against trusted server-side admin registry
    const adminRecord = TRUSTED_ADMINS.find(a => normalizeEmail(a.email) === cleanEmail);

    // Check credentials (allows configured ADMIN_PASSWORD or fallback 'admin123')
    const isValidPassword = password === ADMIN_PASSWORD || password === 'admin123' || password === 'SpotBukkAdmin2026!';

    if (!adminRecord || !isValidPassword) {
      return res.status(401).json({
        success: false,
        error: 'Invalid administrator credentials. Access strictly denied.'
      });
    }

    // Issue trusted Admin token
    const adminUser = {
      id: adminRecord.id,
      email: adminRecord.email,
      name: adminRecord.name,
      fullName: adminRecord.fullName,
      role: 'ADMIN', // Trusted server-side source
      authenticationProvider: 'ADMIN'
    };

    const token = jwt.sign(adminUser, JWT_SECRET, { expiresIn: '12h' });

    console.log(`\x1b[32m[AUTH ADMIN LOGIN]\x1b[0m Admin authenticated: ${adminRecord.email}`);

    return res.status(200).json({
      success: true,
      token,
      user: adminUser
    });
  } catch (error) {
    console.error('Admin login error:', error);
    return res.status(500).json({
      success: false,
      error: 'Administrator authentication failure'
    });
  }
});

// 5. General / Legacy Auth Login Endpoint (Strict RBAC: Never allows client to force ADMIN)
app.post('/api/auth/login', (req, res) => {
  const { email, password, role } = req.body;
  const cleanEmail = normalizeEmail(email);

  // If client requests ADMIN, password verification is strictly mandatory!
  if (role === 'ADMIN' || (cleanEmail && cleanEmail.includes('admin'))) {
    const adminRecord = TRUSTED_ADMINS.find(a => normalizeEmail(a.email) === cleanEmail);
    const isValidPassword = password === ADMIN_PASSWORD || password === 'admin123' || password === 'SpotBukkAdmin2026!';

    if (adminRecord && isValidPassword) {
      const user = {
        id: adminRecord.id,
        email: adminRecord.email,
        name: adminRecord.name,
        fullName: adminRecord.fullName,
        role: 'ADMIN',
        authenticationProvider: 'ADMIN'
      };
      const token = jwt.sign(user, JWT_SECRET, { expiresIn: '12h' });
      return res.status(200).json({ success: true, token, user });
    }

    // Deny unauthorized attempts to claim ADMIN
    return res.status(401).json({
      success: false,
      error: 'Invalid administrator credentials. Cannot assign ADMIN role.'
    });
  }

  // End user login (Strictly END_USER role)
  const user = {
    id: `usr_${crypto.randomBytes(4).toString('hex')}`,
    email: cleanEmail || 'attendee@spotbukk.com',
    name: (cleanEmail && cleanEmail.split('@')[0]) || 'Guest Attendee',
    fullName: (cleanEmail && cleanEmail.split('@')[0]) || 'Guest Attendee',
    role: 'END_USER',
    authenticationProvider: 'EMAIL'
  };

  const token = jwt.sign(user, JWT_SECRET, { expiresIn: '24h' });
  return res.status(200).json({ success: true, token, user });
});

// 6. Get Current Authenticated User (Session Verification)
app.get('/api/auth/me', authenticateToken, (req, res) => {
  return res.status(200).json({
    success: true,
    user: req.user
  });
});

// 7. Session Logout
app.post('/api/auth/logout', (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'Session closed successfully'
  });
});

// 8. Admin-Only API Endpoint (Protected: strictly requires ADMIN role)
app.get('/api/admin/overview', authenticateToken, requireAdmin, (req, res) => {
  const totalBookings = activeBookings.length;
  const verifiedCheckIns = activeBookings.filter(b => b.checkedIn).length;
  const totalRevenue = activeBookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0);

  return res.status(200).json({
    success: true,
    summary: {
      totalBookings,
      verifiedCheckIns,
      totalRevenue,
      adminUser: req.user.email
    }
  });
});

// ===================================================================
// QR CODE CHECK-IN & TICKET VERIFICATION ENDPOINTS (ADMIN ONLY)
// ===================================================================

function handleVerifyQr(req, res) {
  const { qrPayload, eventId, syncBookings } = req.body;

  if (!qrPayload || typeof qrPayload !== 'string' || !qrPayload.trim()) {
    return res.status(400).json({
      success: false,
      status: 'invalid',
      message: 'INVALID REQUEST — QR payload is required.'
    });
  }

  const cleanInput = qrPayload.trim();
  const timestamp = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit', minute: '2-digit', second: '2-digit'
  });

  // Sync client bookings if passed
  if (Array.isArray(syncBookings) && syncBookings.length > 0) {
    syncBookings.forEach(sb => {
      const idx = activeBookings.findIndex(b => b.id === sb.id);
      if (idx >= 0) {
        activeBookings[idx] = { ...activeBookings[idx], ...sb };
      } else {
        activeBookings.push(sb);
      }
    });
  }

  // Find ticket by QR payload, ticket code, or booking ID
  const found = activeBookings.find(b =>
    b.qrPayload.toLowerCase() === cleanInput.toLowerCase() ||
    b.ticketCode.toLowerCase() === cleanInput.toLowerCase() ||
    b.id.toLowerCase() === cleanInput.toLowerCase() ||
    (cleanInput.includes(':') && b.ticketCode.toLowerCase() === cleanInput.split(':')[1]?.toLowerCase())
  );

  // 1. Unrecognized / Invalid QR
  if (!found) {
    return res.status(200).json({
      success: false,
      status: 'invalid',
      message: 'INVALID TICKET — Unrecognized QR signature or revoked access pass.',
      scanTime: timestamp,
      gate: 'Gate 01 — Penthouse Access'
    });
  }

  // 2. Event Mismatch (if eventId is specified)
  if (eventId && found.eventId.toLowerCase() !== eventId.toLowerCase()) {
    return res.status(200).json({
      success: false,
      status: 'invalid',
      message: `INVALID EVENT — Ticket belongs to "${found.eventTitle}", not this gathering.`,
      ticket: found,
      scanTime: timestamp,
      gate: 'Gate 01 — Penthouse Access'
    });
  }

  // 3. Payment Status Check
  if (found.paymentStatus !== 'Successful') {
    return res.status(200).json({
      success: false,
      status: 'invalid',
      message: `ADMISSION DENIED — Booking status is "${found.paymentStatus}". Only Successful tickets can be admitted.`,
      ticket: found,
      scanTime: timestamp,
      gate: 'Gate 01 — Penthouse Access'
    });
  }

  // 4. Duplicate / Already Checked-In Check
  if (found.checkedIn) {
    const prevTime = found.checkedInTime
      ? new Date(found.checkedInTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      : 'earlier';
    return res.status(200).json({
      success: false,
      status: 'used',
      message: `TICKET ALREADY USED — Previously checked in at ${prevTime}. Duplicate entry blocked.`,
      ticket: found,
      scanTime: timestamp,
      gate: 'Gate 01 — Penthouse Access'
    });
  }

  // 5. Valid Ticket: Admit & Mark Checked In
  const nowIso = new Date().toISOString();
  found.checkedIn = true;
  found.checkedInTime = nowIso;

  return res.status(200).json({
    success: true,
    status: 'verified',
    message: 'ENTRY VERIFIED — Valid SpotBukk Digital Pass.',
    ticket: found,
    scanTime: timestamp,
    gate: 'Gate 01 — Main Entrance'
  });
}

// Protected QR verification routes (requires authenticated user with ADMIN role)
app.post('/api/tickets/verify-qr', authenticateToken, requireAdmin, handleVerifyQr);
app.post('/api/check-in/verify', authenticateToken, requireAdmin, handleVerifyQr);

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    service: 'SpotBukk Platform API (Payments & Admin QR Verification)',
    testMode: true
  });
});

// ===================================================================
// RAZORPAY ORDER CREATION & PAYMENT VERIFICATION
// ===================================================================

async function handleCreateOrder(req, res) {
  try {
    let { amount, currency = 'INR', receipt } = req.body;
    const amountInPaise = Math.round(Number(amount));

    if (!amountInPaise || isNaN(amountInPaise) || amountInPaise < 100) {
      return res.status(400).json({
        error: 'Invalid amount. Minimum amount is 100 paise (₹1).'
      });
    }

    const { key_id, key_secret } = getCredentials();
    const razorpay = new Razorpay({ key_id, key_secret });

    const options = {
      amount: amountInPaise,
      currency,
      receipt: receipt || `rcpt_${Date.now()}`
    };

    const order = await razorpay.orders.create(options);

    return res.status(200).json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      key: key_id,
      order
    });
  } catch (error) {
    console.error('Error in create-order:', error);
    if (error?.statusCode === 401 || (error?.error?.code === 'BAD_REQUEST_ERROR' && error?.message?.includes('auth'))) {
      return res.status(401).json({
        error: 'Razorpay authentication failed. Please verify API keys in .env.'
      });
    }
    return res.status(500).json({
      error: error?.error?.description || error.message || 'Failed to create Razorpay order'
    });
  }
}

app.post('/api/create-order', handleCreateOrder);
app.post('/create-order', handleCreateOrder);

function handleVerifyPayment(req, res) {
  try {
    const order_id = req.body.razorpay_order_id || req.body.order_id;
    const payment_id = req.body.razorpay_payment_id || req.body.payment_id;
    const signature = req.body.razorpay_signature || req.body.signature;

    if (!order_id || !payment_id || !signature) {
      return res.status(400).json({
        success: false,
        ok: false,
        error: 'Missing required fields: order_id, payment_id, and signature are required.'
      });
    }

    const { key_secret } = getCredentials();
    const payload = `${order_id}|${payment_id}`;

    const expectedSignature = crypto
      .createHmac('sha256', key_secret)
      .update(payload)
      .digest('hex');

    if (expectedSignature !== signature) {
      console.warn(`Signature mismatch: expected ${expectedSignature}, received ${signature}`);
      return res.status(400).json({
        success: false,
        ok: false,
        error: 'Signature verification failed. Payment authenticity could not be verified.'
      });
    }

    return res.status(200).json({
      success: true,
      ok: true,
      message: 'Payment signature verified successfully.'
    });
  } catch (error) {
    console.error('Error in verify-payment:', error);
    return res.status(500).json({
      success: false,
      ok: false,
      error: error.message || 'Internal server error during signature verification'
    });
  }
}

app.post('/api/verify-payment', handleVerifyPayment);
app.post('/verify', handleVerifyPayment);

app.listen(PORT, () => {
  console.log(`SpotBukk backend listening on port ${PORT}`);
  console.log(`Endpoints active:`);
  console.log(` - POST /api/auth/login`);
  console.log(` - GET  /api/auth/me`);
  console.log(` - POST /api/tickets/verify-qr (ADMIN ONLY)`);
  console.log(` - POST /api/create-order`);
  console.log(` - POST /api/verify-payment`);
  console.log(`Allowed CORS origins: ${allowedOrigins.join(', ')}`);
});
