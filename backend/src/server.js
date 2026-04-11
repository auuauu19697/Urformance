'use strict';

const app = require('./app');
const config = require('./config/env');

const server = app.listen(config.port, () => {
  console.log(`✅  Server running on http://localhost:${config.port}`);
  console.log(`    Environment : ${process.env.NODE_ENV || 'development'}`);
  console.log(`    Health check: http://localhost:${config.port}/health`);
});

// ── Graceful shutdown ─────────────────────────────────────────────────────────
process.on('SIGTERM', () => {
  console.log('SIGTERM received — shutting down gracefully…');
  server.close(() => {
    console.log('Server closed.');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('\nSIGINT received — shutting down gracefully…');
  server.close(() => {
    console.log('Server closed.');
    process.exit(0);
  });
});
