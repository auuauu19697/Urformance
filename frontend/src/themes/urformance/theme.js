// ─── Urformance Brand Config ─────────────────────────────────────────────────
// Palette: Cloud / Brick / Sunbeam / Tan + Sky / Mint / Apricot / Forest

const brandConfig = {
  // ── Identity ────────────────────────────────────────────────────────────────
  brandName: 'URFORMANCE',
  brandSlogan: 'Urban + Performance',
  icon: '/urformance/icons/urformance-synbol.svg',
  wordmark: '/urformance/icons/urformance-word.svg',
  pageTitle: 'URFORMANCE — Urban + Performance',
  metaDescription: 'Order Urformance performance wear online.',

  // ── Features ────────────────────────────────────────────────────────────────
  features: {
    landingPage: true,
    ordering: false,
    waitlist: true,
  },

  waitlistText: {
    heading: 'Join Waitlist',
    body: 'Sign up to get a 20% discount and be notified when the next collection drops.',
    successHeading: "You're on the list",
    successBody: "Thank you for joining the URFORMANCE waitlist. We'll send your 20% discount and notify you when the new collection drops!",
    consentText: "I agree that URFORMANCE may store and use the information I provided — including my name, age, email, phone, and Instagram handle — to notify me about pre-orders, new collection drops, and exclusive updates. My information will not be sold or shared with third parties.",
    lineOaUrl: 'https://lin.ee/t9Gaev8',  // ← redirect here after signup
  },

  // ── Design tokens (injected as CSS custom properties) ───────────────────────
  tokens: {
    // Primary palette
    colorPrimary: '#2B2521',   // Brick — CTAs, dark hero, headings
    colorPrimaryFg: '#FCFCFC',   // Cloud — text on Brick
    colorAccent: '#FFF87B',   // Sunbeam — highlights & tags
    colorAccentFg: '#2B2521',   // Brick — text on Sunbeam
    colorBg: '#FCFCFC',   // Cloud — page background
    colorSurface: '#FFFFFF',   // White — card surfaces
    colorBorder: '#E0D9D0',   // Warm light border
    colorMuted: '#8E8172',   // Tan — muted text

    // Secondary palette (accessible as CSS vars e.g. var(--color-sky))
    colorSky: '#C8E0E8',
    colorMint: '#C9FFB0',
    colorApricot: '#FF885F',
    colorForest: '#456344',

    // Shape & typography
    radiusCard: '4px',
    radiusButton: '3px',
    radiusInput: '3px',
    fontBrand: "'Catalogue'",
    fontSecondary: "'Manrope'",
    fontThai: "'Akiv Grotesk Thai'",
    fontDecorative: "'Apple Garamond'",
    fontScript: "'Brush Script MT'",
    fontSizeBase: '1.1rem',
  },

  closedText: {
    heading: 'Pre-order Has Closed',
    body: 'Thank you for your interest! The pre-order period has ended.\nStay tuned for the next collection and follow us on Instagram for updates.',
    instagram: '@urformance.studio',   // ← your actual IG handle
    instagramUrl: 'https://www.instagram.com/urformance.studio',
  },

  // ── Payment ─────────────────────────────────────────────────────────────────
  paymentMethod: 'QR PromptPay',
  paymentNote: null,    // e.g. 'PromptPay: 0812345678'
  qrImage: null,    // set to a public image path or URL

  // ── Content ─────────────────────────────────────────────────────────────────
  consentText: {
    title: 'Before You Order',
    body: 'This is a pre-order. Production begins after the order period closes and takes approximately 4–6 weeks. By continuing you acknowledge and agree to wait for the production timeline.',
    cta: "I Understand — Let's Order",
  },
}

export default brandConfig
