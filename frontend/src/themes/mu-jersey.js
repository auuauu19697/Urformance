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
    body: `Before You Order
This is a pre-order for MU Jersey. Production begins after the order period closes. Please allow 4–6 weeks for production and delivery.
Any question please feel free to contact ig: @mu.jersey`,
    cta: "Got It — Let's Order",
  },

  products: [
    {
      id: '1',
      name: 'Autotech',
      tagline: 'This collection no customize name&number',
      price: 390,
      pricingTiers: [
        { minQty: 1, price: 390 },
        { minQty: 6, price: 380 },
        { minQty: 16, price: 370 },
        { minQty: 30, price: 350 },
      ],
      // Per-color images — set to null until real photos are ready
      collectionImage: '/product/autotech-collection.jpg',
      colorImages: {
        Navy: '/product/autotech-navy.jpg',
        Black: '/product/autotech-black.jpg',
      },
      colors: ['Navy', 'Black'],
      sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL', '6XL', '7XL'],
      oversizeSurcharge: 20,  // THB extra per piece for 4XL and above
      oversizeFrom: '4XL',
      sizeChartImage: '/size-chart-default.png',
      screeningFields: [],
    },
  ],
}

export default muJersey
