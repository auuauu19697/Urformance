export default () => ({
  port: parseInt(process.env.PORT ?? '3000', 10),
  allowedOrigins: (process.env.ALLOWED_ORIGINS ?? '').split(',').map((s) => s.trim()).filter(Boolean),

  // API key — clients must send this in X-API-Key header
  apiKey: process.env.API_KEY,

  google: {
    serviceAccountEmail: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    // Replace escaped newlines so the PEM block is valid
    privateKey: (process.env.GOOGLE_PRIVATE_KEY ?? '').replace(/\\n/g, '\n'),
    sheetId: process.env.GOOGLE_SHEET_ID,
    ordersSheet: process.env.GOOGLE_ORDERS_SHEET ?? 'Orders',
    itemsSheet: process.env.GOOGLE_ITEMS_SHEET ?? 'OrderItems',
    waitlistSheet: process.env.GOOGLE_WAITLIST_SHEET ?? process.env.GOOGLE_WISHLIST_SHEET ?? 'Waitlist',
    driveFolderId: process.env.GOOGLE_DRIVE_FOLDER_ID ?? '',

    // OAuth2 Credentials for Drive
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
  },

  mail: {
    host: process.env.SMTP_HOST ?? 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT ?? '465', 10),
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
    from: process.env.SMTP_FROM ?? process.env.SMTP_USER,
    brandName: process.env.BRAND_NAME ?? 'URFORMANCE',
  },
});

