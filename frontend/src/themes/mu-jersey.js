// ─── MU Jersey Brand Theme ────────────────────────────────────────────────────
// Deep navy & cream — premium football jersey, fashion-checkout aesthetic

const muJersey = {
  brandName: 'MU JERSEY',
  brandSlogan: 'Premium Football Jerseys',
  icon: '/icons/mu-jersey.jpg',
  pageTitle: 'MU Jersey — Order',
  metaDescription: 'Order premium MU football jerseys online.',

  googleFont: 'Cormorant Garamond',
  googleFontWeights: '400;500;600;700',

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

    fontBrand: "'Cormorant Garamond', Georgia, serif",

    // Section heading tokens (override Urformance tiny-label defaults)
    sectionHSize: '1.5rem',
    sectionHWeight: '600',
    sectionHTransform: 'none',
    sectionHTracking: '-0.01em',
    sectionHColor: 'var(--color-primary)',
  },

  // input underline style — picked up by ThemeContext → data-input-style attr
  inputVariant: 'underline',

  paymentMethod: 'QR PromptPay',
  paymentNote: null,
  qrImage: null,

  consentText: {
    title: 'Before You Order',
    body: 'This is a pre-order for MU Jersey. Production begins after the order period closes. Please allow 4–6 weeks for production and delivery.',
    cta: "Got It — Let's Order",
  },

  products: [
    {
      id: 'mu-training',
      name: 'MU Training Top',
      tagline: 'DryFit Training Kit',
      price: 790,
      image: null,
      colors: ['Navy', 'Black'],
      sizes: ['S', 'M', 'L', 'XL'],
      screeningFields: [],
    },
  ],
}

export default muJersey
