// ─── Urformance Brand Theme ───────────────────────────────────────────────────
// Black & white minimalist performance wear

const urformance = {
  // ── Identity ────────────────────────────────────────────────────────────────
  brandName: 'URFORMANCE',
  brandSlogan: 'Performance Wear',
  icon: '🏃',
  pageTitle: 'Urformance — Order',
  metaDescription: 'Order Urformance performance wear online.',

  // ── Typography ──────────────────────────────────────────────────────────────
  googleFont: 'Inter',
  googleFontWeights: '400;700;900',

  // ── Design tokens (injected as CSS custom properties) ───────────────────────
  tokens: {
    colorPrimary: '#000000',
    colorPrimaryFg: '#ffffff',
    colorAccent: '#000000',
    colorBg: '#f8fafc',
    colorSurface: '#ffffff',
    colorBorder: '#e2e8f0',
    colorMuted: '#94a3b8',
    radiusCard: '1.5rem',
    radiusButton: '1.5rem',
    radiusInput: '1rem',
    fontBrand: "'Inter', system-ui, sans-serif",
    fontSizeBase: '1.1rem',
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

  // ── Products ─────────────────────────────────────────────────────────────────
  products: [
    {
      id: 'performance-pro',
      name: 'Performance Pro',
      tagline: 'DryTech™ Wicking Fabric',
      price: 890,
      pricingTiers: [
        { minQty: 1, price: 890 },
        { minQty: 6, price: 850 },
        { minQty: 16, price: 820 },
        { minQty: 30, price: 790 },
      ],
      image: null,
      colors: ['Black', 'White', 'Navy'],
      sizes: ['S', 'M', 'L', 'XL'],
      screeningFields: [],
    },
    {
      id: 'daily-runner',
      name: 'Daily Runner',
      tagline: 'Soft-touch Cotton Blend',
      price: 790,
      pricingTiers: [
        { minQty: 1, price: 790 },
        { minQty: 6, price: 760 },
        { minQty: 16, price: 730 },
        { minQty: 30, price: 690 },
      ],
      image: null,
      colors: ['Black', 'White', 'Olive'],
      sizes: ['S', 'M', 'L', 'XL'],
      screeningFields: [],
    },
  ],
}

export default urformance
