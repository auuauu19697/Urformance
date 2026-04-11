'use strict';

const { google } = require('googleapis');
const config = require('../config/env');

/**
 * Returns an authorised Google Sheets client.
 */
function getSheetsClient() {
  const auth = new google.auth.JWT({
    email: config.google.serviceAccountEmail,
    key: config.google.privateKey,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  return google.sheets({ version: 'v4', auth });
}

/**
 * Appends a new order row to the Google Sheet.
 *
 * Expected sheet columns (Row 1 = headers):
 * Timestamp | Name | Phone | Address | Items Summary | Total (THB) | Slip Filename
 *
 * @param {object} order  - { customer, items, total }
 * @param {string} slipFilename - original filename of the uploaded payment slip
 */
async function appendOrder(order, slipFilename) {
  const sheets = getSheetsClient();

  const { customer, items, total } = order;

  // Build a human-readable summary of items, e.g. "Performance Pro (M) x2, Daily Runner (L) x1"
  const itemsSummary = items
    .map((item) => `${item.model} (${item.size}) x${item.qty}`)
    .join(', ');

  const row = [
    new Date().toISOString(),      // Timestamp
    customer.name,                 // Name
    customer.phone,                // Phone
    customer.address,              // Address
    itemsSummary,                  // Items Summary
    total,                         // Total (THB)
    slipFilename || 'N/A',         // Slip Filename
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId: config.google.sheetId,
    range: 'Sheet1!A:G',           // Adjust tab name if needed
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'INSERT_ROWS',
    requestBody: {
      values: [row],
    },
  });
}

module.exports = { appendOrder };
