'use strict';

const multer = require('multer');

/**
 * Memory storage — file buffer is available at req.file.buffer.
 * Max file size: 5 MB.
 * Only image/* MIME types accepted.
 */
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed for the payment slip.'));
    }
  },
});

module.exports = upload;
