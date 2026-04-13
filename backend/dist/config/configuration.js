"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    port: parseInt(process.env.PORT ?? '3000', 10),
    allowedOrigins: (process.env.ALLOWED_ORIGINS ?? '').split(',').map((s) => s.trim()).filter(Boolean),
    apiKey: process.env.API_KEY,
    google: {
        serviceAccountEmail: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        privateKey: (process.env.GOOGLE_PRIVATE_KEY ?? '').replace(/\\n/g, '\n'),
        sheetId: process.env.GOOGLE_SHEET_ID,
        ordersSheet: process.env.GOOGLE_ORDERS_SHEET ?? 'Orders',
        itemsSheet: process.env.GOOGLE_ITEMS_SHEET ?? 'OrderItems',
    },
});
//# sourceMappingURL=configuration.js.map