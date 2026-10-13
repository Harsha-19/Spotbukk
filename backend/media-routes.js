const express = require('express');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const {
  UPLOADS_DIR,
  LIMITS,
  upload,
  mediaStore,
  saveMediaStore
} = require('./media-service');

function createMediaRouter({ authenticateToken, requireAdmin }) {
  const router = express.Router();

  // Helper middleware for Host/Staff/Admin check
  function requireHostOrAdmin(req, res, next) {
    if (!req.user) {
      return res.status(401).json({ success: false, error: 'Unauthorized: Authentication required.' });
    }
    const role = (req.user.role || '').toUpperCase();
    if (role !== 'ADMIN' && role !== 'STAFF' && role !== 'HOST') {
      return res.status(403).json({
        success: false,
        error: 'Forbidden: Host or Staff credentials required to manage media.',
        role
      });
    }
    next();
  }

  // 1. Get media limits (Public configuration)
  router.get('/limits', (req, res) => {
    res.json({
      success: true,
      limits: {
        maxImageSizeBytes: LIMITS.IMAGE_MAX_SIZE_BYTES,
        maxImageSizeFormatted: '10 MB',
        maxVideoSizeBytes: LIMITS.VIDEO_MAX_SIZE_BYTES,
        maxVideoSizeFormatted: '50 MB',
        maxFilesPerUpload: LIMITS.MAX_FILES_PER_UPLOAD,
        allowedImageExtensions: LIMITS.ALLOWED_IMAGE_EXTS,
        allowedVideoExtensions: LIMITS.ALLOWED_VIDEO_EXTS,
        allowedImageMimes: LIMITS.ALLOWED_IMAGE_MIMES,
        allowedVideoMimes: LIMITS.ALLOWED_VIDEO_MIMES
      }
    });
  });

  // 2. Get media list (Public / Admin)
  router.get('/', (req, res) => {
    const { eventId, mediaType, includeRemoved } = req.query;

    let results = [...mediaStore];

    // Filter by event if provided
    if (eventId) {
      results = results.filter(m => m.eventId && m.eventId.toLowerCase() === eventId.toLowerCase());
    }

    // Filter by mediaType if provided
    if (mediaType) {
      results = results.filter(m => m.mediaType === mediaType);
    }

    // Check optional token header to see if requester is Admin
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    let isAdmin = false;
    if (token) {
      try {
        const decoded = require('jsonwebtoken').decode(token);
        if (decoded && decoded.role === 'ADMIN') {
          isAdmin = true;
        }
      } catch (e) {
        // Not admin
      }
    }

    // If not admin or includeRemoved is not set, exclude removed and unpublished
    if (!isAdmin || includeRemoved !== 'true') {
      results = results.filter(m => !m.isRemovedByAdmin && m.isPublished);
    }

    // Sort newest first
    results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    res.json({
      success: true,
      count: results.length,
      media: results
    });
  });

  // 3. Get media for a specific event (Public)
  router.get('/event/:eventId', (req, res) => {
    const { eventId } = req.params;
    if (!eventId) {
      return res.status(400).json({ success: false, error: 'Event ID parameter is required' });
    }

    const eventMedia = mediaStore.filter(
      m => m.eventId &&
           m.eventId.toLowerCase() === eventId.toLowerCase() &&
           !m.isRemovedByAdmin &&
           m.isPublished
    );

    eventMedia.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    res.json({
      success: true,
      eventId,
      count: eventMedia.length,
      media: eventMedia
    });
  });

  // 4. Get currently authenticated host's uploads
  router.get('/my', authenticateToken, (req, res) => {
    const userId = req.user.id;
    const userRole = req.user.role;

    // Admin can view all or filtered; staff/host sees own
    let userMedia;
    if (userRole === 'ADMIN') {
      userMedia = [...mediaStore];
    } else {
      userMedia = mediaStore.filter(m => m.userId === userId);
    }

    userMedia.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    res.json({
      success: true,
      count: userMedia.length,
      media: userMedia
    });
  });

  // 5. Upload Media (Protected: Host/Staff/Admin)
  router.post('/upload', authenticateToken, requireHostOrAdmin, (req, res) => {
    upload.array('media', LIMITS.MAX_FILES_PER_UPLOAD)(req, res, (err) => {
      if (err) {
        if (err instanceof multer.MulterError) {
          if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
              success: false,
              error: `File size exceeds the permitted limit (Max ${LIMITS.VIDEO_MAX_SIZE_BYTES / (1024 * 1024)}MB).`
            });
          }
          if (err.code === 'LIMIT_FILE_COUNT') {
            return res.status(400).json({
              success: false,
              error: `You cannot upload more than ${LIMITS.MAX_FILES_PER_UPLOAD} files at once.`
            });
          }
          return res.status(400).json({ success: false, error: `Upload error: ${err.message}` });
        }
        return res.status(400).json({ success: false, error: err.message });
      }

      const files = req.files;
      if (!files || files.length === 0) {
        return res.status(400).json({
          success: false,
          error: 'No files provided. Please select photos or videos to upload.'
        });
      }

      const { eventId, eventTitle, caption } = req.body;
      const createdItems = [];
      const validationErrors = [];

      for (const file of files) {
        const ext = path.extname(file.originalname).toLowerCase();
        const isVideo = LIMITS.ALLOWED_VIDEO_EXTS.includes(ext);
        const isImage = LIMITS.ALLOWED_IMAGE_EXTS.includes(ext);

        // Check image specific limit (10MB)
        if (isImage && file.size > LIMITS.IMAGE_MAX_SIZE_BYTES) {
          try {
            fs.unlinkSync(file.path);
          } catch (e) {}
          validationErrors.push(`Image "${file.originalname}" is too large (${(file.size / (1024 * 1024)).toFixed(1)}MB). Maximum allowed is 10MB.`);
          continue;
        }

        const mediaItem = {
          id: `med_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`,
          userId: req.user.id,
          userName: req.user.name || req.user.fullName || 'SpotBukk Host',
          userEmail: req.user.email || '',
          userRole: req.user.role,
          eventId: eventId || null,
          eventTitle: eventTitle || '',
          originalFilename: file.originalname,
          storedFilename: file.filename,
          url: `/uploads/${file.filename}`,
          mediaType: isVideo ? 'video' : 'image',
          mimeType: file.mimetype,
          sizeBytes: file.size,
          caption: caption || '',
          createdAt: new Date().toISOString(),
          status: 'completed',
          isPublished: true,
          isRemovedByAdmin: false,
          removalReason: null,
          removedAt: null,
          removedBy: null
        };

        mediaStore.push(mediaItem);
        createdItems.push(mediaItem);
      }

      if (createdItems.length > 0) {
        saveMediaStore();
      }

      if (createdItems.length === 0 && validationErrors.length > 0) {
        return res.status(400).json({
          success: false,
          error: validationErrors.join(' ')
        });
      }

      return res.status(201).json({
        success: true,
        message: `Successfully uploaded ${createdItems.length} media file(s).`,
        uploadedCount: createdItems.length,
        media: createdItems,
        warnings: validationErrors.length > 0 ? validationErrors : undefined
      });
    });
  });

  // 6. Delete Media (Owner Host or Admin)
  router.delete('/:id', authenticateToken, (req, res) => {
    const { id } = req.params;
    const itemIndex = mediaStore.findIndex(m => m.id === id);

    if (itemIndex === -1) {
      return res.status(404).json({ success: false, error: 'Media item not found.' });
    }

    const item = mediaStore[itemIndex];
    const isOwner = item.userId === req.user.id;
    const isAdmin = req.user.role === 'ADMIN';

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        success: false,
        error: 'Forbidden: You do not have permission to delete this media item.'
      });
    }

    // Remove physical file from disk if exists
    try {
      const filePath = path.join(UPLOADS_DIR, item.storedFilename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (err) {
      console.warn(`[MEDIA SERVICE] Could not delete physical file ${item.storedFilename}:`, err.message);
    }

    // Remove from store
    mediaStore.splice(itemIndex, 1);
    saveMediaStore();

    return res.status(200).json({
      success: true,
      message: 'Media file has been permanently deleted.',
      deletedId: id
    });
  });

  // 7. Admin Moderation: Remove or Restore Media (Admin strictly)
  router.patch('/:id/moderate', authenticateToken, requireAdmin, (req, res) => {
    const { id } = req.params;
    const { action, reason } = req.body; // action: 'remove' | 'restore'

    const item = mediaStore.find(m => m.id === id);
    if (!item) {
      return res.status(404).json({ success: false, error: 'Media item not found.' });
    }

    if (action === 'remove') {
      item.isRemovedByAdmin = true;
      item.isPublished = false;
      item.removalReason = reason || 'Content violates community standards or event guidelines.';
      item.removedAt = new Date().toISOString();
      item.removedBy = req.user.email || req.user.id;
      saveMediaStore();

      return res.status(200).json({
        success: true,
        message: 'Media has been removed by administrator.',
        media: item
      });
    } else if (action === 'restore') {
      item.isRemovedByAdmin = false;
      item.isPublished = true;
      item.removalReason = null;
      item.removedAt = null;
      item.removedBy = null;
      saveMediaStore();

      return res.status(200).json({
        success: true,
        message: 'Media visibility has been restored.',
        media: item
      });
    }

    return res.status(400).json({
      success: false,
      error: 'Invalid moderation action. Must be "remove" or "restore".'
    });
  });

  return router;
}

module.exports = { createMediaRouter };
