'use strict';

const express = require('express');
const cors = require('cors');
const config = require('./config/env');
const ordersRouter = require('./routes/orders');
const errorHandler = require('./middleware/errorHandler');
const { sendSuccess, sendError } = require('./utils/response');

const app = express();

// ── CORS ─────────────────────────────────────────────────────────────────────
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. curl, Postman, same-origin)
      if (!origin || config.allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS: origin ${origin} not allowed`));
      }
    },
    methods: ['GET', 'POST'],
  })
);

// ── Body parsing ──────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Health check ──────────────────────────────────────────────────────────────
app.get('/health', (_req, res) => sendSuccess(res, { status: 'ok' }));

// ── API Routes ────────────────────────────────────────────────────────────────
app.use('/api/orders', ordersRouter);

// ── 404 Handler ───────────────────────────────────────────────────────────────
app.use((_req, res) => sendError(res, 'Route not found.', 404));

// ── Global Error Handler (must be last) ──────────────────────────────────────
app.use(errorHandler);

module.exports = app;
