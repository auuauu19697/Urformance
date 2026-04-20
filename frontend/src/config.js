// ─── Products ─────────────────────────────────────────────────────────────────
// screeningFields: extra per-item fields shown in checkout (e.g. for jersey printing)
export const PRODUCTS = [
  {
    id: 'performance-pro',
    name: 'Performance Pro',
    tagline: 'DryTech™ Wicking Fabric',
    price: 890,
    image: null,
    colors: ['Black', 'White', 'Navy'],
    sizes: ['S', 'M', 'L', 'XL'],
    screeningFields: [], // no printing needed
  },
  {
    id: 'daily-runner',
    name: 'Daily Runner',
    tagline: 'Soft-touch Cotton Blend',
    price: 790,
    image: null,
    colors: ['Black', 'White', 'Olive'],
    sizes: ['S', 'M', 'L', 'XL'],
    screeningFields: [], // no printing needed
  },
  // ── Example: jersey with screening data ──────────────────────────────────
  {
    id: 'mu-jersey',
    name: 'MU Jersey',
    tagline: 'Sublimation Print Performance',
    price: 1190,
    image: null,
    colors: ['Home', 'Away'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    screeningFields: [
      { key: 'jerseyNumber', label: 'Jersey Number', placeholder: '10', maxLength: 3 },
      { key: 'printName', label: 'Name on Jersey', placeholder: 'SOMCHAI', maxLength: 20 },
    ],
  },
]

// ─── Preorder consent copy ────────────────────────────────────────────────────
export const CONSENT_TEXT = {
  title: 'Before You Order',
  body: 'This is a pre-order. Production begins after the order period closes and takes approximately 4–6 weeks. By continuing you acknowledge and agree to wait for the production timeline.',
  cta: "I Understand — Let's Order",
}

// ─── API ──────────────────────────────────────────────────────────────────────
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'
export const API_KEY = import.meta.env.VITE_API_KEY || ''
