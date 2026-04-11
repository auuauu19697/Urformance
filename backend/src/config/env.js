'use strict';

require('dotenv').config();

/**
 * Centralised env config.
 * Throws at startup if any required variable is missing,
 * so the app fails fast rather than silently misbehaving.
 */

const required = [
  'GOOGLE_SERVICE_ACCOUNT_EMAIL',
  'GOOGLE_PRIVATE_KEY',
  'GOOGLE_SHEET_ID',
];

for (const key of required) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

module.exports = {
  port: parseInt(process.env.PORT || '3000', 10),
  allowedOrigins: (process.env.ALLOWED_ORIGIN || 'http://localhost:5500').split(','),
  google: {
    serviceAccountEmail: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    // Replace escaped newlines so the PEM key works correctly
    privateKey: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    sheetId: process.env.GOOGLE_SHEET_ID,
  },
};
