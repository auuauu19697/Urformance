// ─── KU Outfit Brand Theme ────────────────────────────────────────────────────
// Forest green & warm cream — elegant university club apparel
// Brand palette: #FFFCF4 (cream) · #4C6A4A (green) · #8D6A5A (brown)

const kuOutfit = {
  // ── Identity ────────────────────────────────────────────────────────────────
  brandName: 'KU OUTFIT',
  brandSlogan: 'Outfit of Ku Club',
  icon: '/icons/ku-outfit-logo.svg',
  pageTitle: 'Ku Outfit — Order',
  metaDescription: 'Order Ku Club official apparel online.',

  // ── Typography ──────────────────────────────────────────────────────────────
  googleFont: 'Cormorant Garamond',
  googleFontWeights: '400;500;600;700',

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

    fontBrand: "'Cormorant Garamond', Georgia, serif",

    // Section heading tokens — elegant larger labels
    sectionHSize: '1.25rem',
    sectionHWeight: '600',
    sectionHTransform: 'none',
    sectionHTracking: '-0.01em',
    sectionHColor: 'var(--color-primary)',
  },

  // inputs use underline style to match the minimalist premium feel
  inputVariant: 'underline',

  // ── Payment ─────────────────────────────────────────────────────────────────
  paymentMethod: 'QR PromptPay',
  paymentNote: null,
  qrImage: null,

  // ── Content ─────────────────────────────────────────────────────────────────
  consentText: {
    title: 'Before You Order',
    body: 'This is a pre-order for Ku Club official apparel. Production begins after the order period closes. Please allow 4–6 weeks for production and delivery.',
    cta: 'Continue to Order',
  },

  // ── Products ─────────────────────────────────────────────────────────────────
  products: [
    {
      id: 'ku-club-sweatshirt',
      name: 'Ku Club Sweatshirt',
      tagline: 'Embroidered Script Logo',
      price: 990,
      pricingTiers: [
        { minQty: 1, price: 990 },
        { minQty: 6, price: 950 },
        { minQty: 16, price: 920 },
        { minQty: 30, price: 890 },
      ],
      colorImages: {
        White: null,
        Cream: null,
        Green: null,
      },
      colors: ['White', 'Cream', 'Green'],
      sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL', '6XL', '7XL'],
      sizeChartImage: '/size-chart-default.png',
      screeningFields: [],
    }
  ],
}

export default kuOutfit
