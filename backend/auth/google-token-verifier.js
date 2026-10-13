'use strict';

const GOOGLE_TOKENINFO_URL = 'https://oauth2.googleapis.com/tokeninfo';

async function verifyGoogleIdToken(credential, clientId, fetchImpl = globalThis.fetch) {
  if (typeof credential !== 'string' || !credential.trim()) {
    throw new Error('Google ID token is required');
  }
  if (typeof clientId !== 'string' || !clientId.trim()) {
    throw new Error('GOOGLE_CLIENT_ID is required');
  }
  if (typeof fetchImpl !== 'function') {
    throw new Error('A fetch implementation is required to verify Google credentials');
  }

  const url = new URL(GOOGLE_TOKENINFO_URL);
  url.searchParams.set('id_token', credential);

  const response = await fetchImpl(url.toString(), {
    method: 'GET',
    headers: { Accept: 'application/json' },
    signal: AbortSignal.timeout(5000)
  });

  if (!response.ok) {
    throw new Error('Google rejected the ID token');
  }

  const claims = await response.json();
  const issuer = claims.iss;
  const expiresAt = Number(claims.exp);
  const emailVerified = claims.email_verified === true || claims.email_verified === 'true';

  if (claims.aud !== clientId) {
    throw new Error('Google ID token audience does not match this application');
  }
  if (issuer !== 'accounts.google.com' && issuer !== 'https://accounts.google.com') {
    throw new Error('Google ID token issuer is invalid');
  }
  if (!Number.isFinite(expiresAt) || expiresAt <= Math.floor(Date.now() / 1000)) {
    throw new Error('Google ID token is expired or has an invalid expiry');
  }
  if (!emailVerified || typeof claims.email !== 'string' || !claims.email.trim()) {
    throw new Error('Google account email is not verified');
  }

  return claims;
}

module.exports = { verifyGoogleIdToken };
