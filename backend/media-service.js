const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const multer = require('multer');

// Directory paths
const UPLOADS_DIR = path.join(__dirname, 'uploads');
const DATA_DIR = path.join(__dirname, 'data');
const REGISTRY_FILE = path.join(DATA_DIR, 'media-registry.json');

// Ensure directories exist
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize registry file if not present — strictly NO seed data
if (!fs.existsSync(REGISTRY_FILE)) {
  fs.writeFileSync(REGISTRY_FILE, JSON.stringify([], null, 2), 'utf8');
}

// In-memory cache synced with disk
let mediaStore = [];
try {
  const content = fs.readFileSync(REGISTRY_FILE, 'utf8');
  mediaStore = JSON.parse(content);
} catch (err) {
  console.error('[MEDIA SERVICE] Failed to load media registry, defaulting to empty array:', err);
  mediaStore = [];
}

// Persist helper
function saveMediaStore() {
  try {
    fs.writeFileSync(REGISTRY_FILE, JSON.stringify(mediaStore, null, 2), 'utf8');
  } catch (err) {
    console.error('[MEDIA SERVICE] Failed to persist media registry:', err);
  }
}

// Configuration limits
const LIMITS = {
  IMAGE_MAX_SIZE_BYTES: 10 * 1024 * 1024, // 10MB
  VIDEO_MAX_SIZE_BYTES: 50 * 1024 * 1024, // 50MB
  MAX_FILES_PER_UPLOAD: 10,
  ALLOWED_IMAGE_EXTS: ['.jpg', '.jpeg', '.png', '.webp'],
  ALLOWED_VIDEO_EXTS: ['.mp4', '.webm'],
  ALLOWED_IMAGE_MIMES: ['image/jpeg', 'image/png', 'image/webp'],
  ALLOWED_VIDEO_MIMES: ['video/mp4', 'video/webm']
};

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const safeBaseName = path.basename(file.originalname, ext)
      .replace(/[^a-zA-Z0-9_-]/g, '_')
      .slice(0, 30);
    const uniqueSuffix = `${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
    cb(null, `${safeBaseName}_${uniqueSuffix}${ext}`);
  }
});

// File filter with format verification
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  const mime = (file.mimetype || '').toLowerCase();

  const isImage = LIMITS.ALLOWED_IMAGE_EXTS.includes(ext) && LIMITS.ALLOWED_IMAGE_MIMES.includes(mime);
  const isVideo = LIMITS.ALLOWED_VIDEO_EXTS.includes(ext) && LIMITS.ALLOWED_VIDEO_MIMES.includes(mime);

  if (!isImage && !isVideo) {
    const error = new Error(`Unsupported media format (${ext || 'unknown'}). Supported formats: JPG, JPEG, PNG, WebP, MP4, WebM.`);
    error.code = 'UNSUPPORTED_MEDIA_TYPE';
    return cb(error, false);
  }

  cb(null, true);
};

// Multer upload middleware instance
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: LIMITS.VIDEO_MAX_SIZE_BYTES, // 50MB global cap
    files: LIMITS.MAX_FILES_PER_UPLOAD
  }
});

module.exports = {
  UPLOADS_DIR,
  REGISTRY_FILE,
  LIMITS,
  upload,
  mediaStore,
  saveMediaStore
};
