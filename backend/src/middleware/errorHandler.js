'use strict';

const { sendError } = require('../utils/response');

/**
 * Global error handler middleware.
 * Must be registered AFTER all routes in app.js.
 *
 * @param {Error} err
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {Function} next
 */
// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  // console.log(err);
  console.error(`[Error] ${err.message}`);

  // Multer file size error
  if (err.code === 'LIMIT_FILE_SIZE') {
    return sendError(res, 'File too large. Maximum size is 5 MB.', 413);
  }

  // Multer file type error (thrown in fileFilter)
  if (err.message && err.message.includes('Only image files')) {
    return sendError(res, err.message, 415);
  }

  return sendError(res, err.message || 'Internal server error', err.status || 500);
}

module.exports = errorHandler;
