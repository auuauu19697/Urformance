// ─── MU Jersey Brand Config ──────────────────────────────────────────────────
// Deep navy & cream — premium football jersey, fashion-checkout aesthetic

const brandConfig = {
  // ── Identity ────────────────────────────────────────────────────────────────
  brandName: 'MU JERSEY',
  brandSlogan: 'Premium Football Jerseys',
  icon: '/icons/mu-jersey.jpg',
  pageTitle: 'MU Jersey — Order',
  metaDescription: 'Order premium MU football jerseys online.',

  // ── Typography ──────────────────────────────────────────────────────────────
  googleFont: null,          // Satoshi is loaded via Fontshare in index.html
  googleFontWeights: null,

  // ── Features ────────────────────────────────────────────────────────────────
  features: {
    landingPage: false,
    ordering: true,
    wishlist: false,
  },

  // ── Design tokens ───────────────────────────────────────────────────────────
  tokens: {
    colorPrimary: '#1e2d4a',   // deep navy
    colorPrimaryFg: '#ffffff',
    colorAccent: '#1e2d4a',
    colorBg: '#f8f5f0',   // warm cream
    colorSurface: '#ffffff',
    colorBorder: '#ddd9d3',   // warm subtle
    colorMuted: '#908c86',   // warm gray

    radiusCard: '0.5rem',
    radiusButton: '0.25rem',   // nearly square
    radiusInput: '0',

    fontBrand: "'Satoshi', 'LINE Seed Sans TH', system-ui, sans-serif",

    // Section heading tokens (override Urformance tiny-label defaults)
    sectionHSize: '1.5rem',
    sectionHWeight: '600',
    sectionHTransform: 'none',
    sectionHTracking: '-0.01em',
    sectionHColor: 'var(--color-primary)',
  },

  // input underline style — picked up by ThemeContext → data-input-style attr
  inputVariant: 'underline',

  closedText: {
    heading: 'Pre-order Has Closed',
    body: 'Thank you for your interest in MU Jersey!\nThe pre-order period has ended. Follow us on Instagram for news about the next collection.',
    instagram: '@mu.jerseys',
    instagramUrl: 'https://www.instagram.com/mu.jerseys',
  },

  // ── Payment ─────────────────────────────────────────────────────────────────
  paymentMethod: 'QR PromptPay',
  paymentNote: null,
  qrImage: null,

  // ── Content ─────────────────────────────────────────────────────────────────
  consentText: {
    title: 'Before You Order',
    body: `Before You Order\nThis is a pre-order for MU Jersey. Production begins after the order period closes. Please allow 4–6 weeks for production and delivery.\nAny question please feel free to contact ig: @mu.jersey`,
    cta: "Got It — Let's Order",
  },
}

export default brandConfig
