// ─── Kutee Club Brand Config ─────────────────────────────────────────────────
// Forest green & warm cream — elegant university club apparel
// Brand palette: #FFFCF4 (cream) · #4C6A4A (green) · #8D6A5A (brown)

const brandConfig = {
  // ── Identity ────────────────────────────────────────────────────────────────
  brandName: 'KUTEE CLUB',
  brandSlogan: 'Outfit of Ku Club',
  icon: '/icons/ku-outfit-logo.svg',
  pageTitle: 'Kutee Club — Order',
  metaDescription: 'Order Ku Club official apparel online.',

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
    colorPrimary: '#4C6A4A',   // forest green — CTAs, selected states
    colorPrimaryFg: '#FFFCF4',   // warm cream — text on green
    colorAccent: '#8D6A5A',   // warm brown — accent links
    colorBg: '#FFFCF4',   // warm cream — page background
    colorSurface: '#FFFFFF',   // white — card surfaces
    colorBorder: '#DDD8CC',   // warm subtle border
    colorMuted: '#9A8F7E',   // warm muted text

    radiusCard: '0.75rem',
    radiusButton: '0.375rem',  // slightly rounded
    radiusInput: '0.375rem',

    fontBrand: "'Satoshi', 'LINE Seed Sans TH', system-ui, sans-serif",

    // Section heading tokens — elegant larger labels
    sectionHSize: '1.25rem',
    sectionHWeight: '600',
    sectionHTransform: 'none',
    sectionHTracking: '-0.01em',
    sectionHColor: 'var(--color-primary)',
  },

  // inputs use underline style to match the minimalist premium feel
  inputVariant: 'underline',

  closedText: {
    heading: 'Pre-order Has Closed',
    body: 'Thank you for your interest in Kutee Club!\nThe pre-order period has ended. Follow us on Instagram to stay updated on the next collection.',
    instagram: '@ku.outfit',   // ← update to your real IG handle
    instagramUrl: 'https://www.instagram.com/ku.outfit',
  },

  // ── Payment ─────────────────────────────────────────────────────────────────
  paymentMethod: 'QR PromptPay',
  paymentNote: null,
  qrImage: null,

  // ── Content ─────────────────────────────────────────────────────────────────
  consentText: {
    title: 'Before You Order',
    body: 'This is a pre-order for Kutee Club official apparel. Production begins after the order period closes. Please allow 4–6 weeks for production and delivery.',
    cta: 'Continue to Order',
  },
}

export default brandConfig
