'use strict';

/**
 * Standard JSON response helpers.
 */

/**
 * Send a successful response.
 * @param {import('express').Response} res
 * @param {object|string} data
 * @param {number} [statusCode=200]
 */
function sendSuccess(res, data, statusCode = 200) {
  return res.status(statusCode).json({ success: true, data });
}

/**
 * Send an error response.
 * @param {import('express').Response} res
 * @param {string} message
 * @param {number} [statusCode=500]
 */
function sendError(res, message, statusCode = 500) {
  return res.status(statusCode).json({ success: false, message });
}

module.exports = { sendSuccess, sendError };
