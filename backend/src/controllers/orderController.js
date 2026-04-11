'use strict';

const { appendOrder } = require('../services/sheetsService');
const { sendSuccess, sendError } = require('../utils/response');

/**
 * POST /api/orders
 *
 * Expects multipart/form-data with:
 *   - slip   (File)   — payment slip image
 *   - order  (JSON string) — order payload
 *
 * Order payload shape:
 * {
 *   customer: { name: string, phone: string, address: string },
 *   items: [{ id, model, size, qty, price }],
 *   total: number
 * }
 */
async function createOrder(req, res, next) {
  try {
    // ── Parse order JSON ─────────────────────────────────────────────────────
    let order;
    try {
      order = JSON.parse(req.body.order);
    } catch {
      return sendError(res, 'Invalid order JSON.', 400);
    }

    // ── Validate required fields ─────────────────────────────────────────────
    const { customer, items, total } = order;

    if (!customer?.name || !customer?.phone || !customer?.address) {
      return sendError(res, 'Missing customer information (name, phone, address).', 400);
    }

    if (!Array.isArray(items) || items.length === 0) {
      return sendError(res, 'Order must contain at least one item.', 400);
    }

    if (typeof total !== 'number' || total <= 0) {
      return sendError(res, 'Invalid order total.', 400);
    }

    // ── Validate slip upload ─────────────────────────────────────────────────
    if (!req.file) {
      return sendError(res, 'Payment slip image is required.', 400);
    }

    const slipFilename = req.file.originalname;

    // ── Save to Google Sheets ────────────────────────────────────────────────
    await appendOrder(order, slipFilename);

    return sendSuccess(res, { message: 'Order saved successfully.' }, 201);
  } catch (err) {
    next(err);
  }
}

module.exports = { createOrder };
