// ─── Urformance Products Config ──────────────────────────────────────────────

const products = [
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
    collectionImage: null,
    colorImages: {
      Black: null,
      White: null,
      Navy: null,
    },
    colors: ['Black', 'White', 'Navy'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL', '6XL', '7XL'],
    oversizeSurcharge: 30,
    oversizeFrom: '4XL',
    sizeChartImage: '/size-chart-default.png',
    screeningFields: [],
    orderWindow: {
      startTime: null,
      endTime: '2029-12-31T23:59:59+07:00',
    },
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
    collectionImage: null,
    colorImages: {
      Black: null,
      White: null,
      Olive: null,
    },
    colors: ['Black', 'White', 'Olive'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL', '6XL', '7XL'],
    oversizeSurcharge: 30,
    oversizeFrom: '4XL',
    sizeChartImage: '/size-chart-default.png',
    screeningFields: [],
    orderWindow: {
      startTime: '2026-07-13T23:59:59+07:00',
      endTime: '2029-12-31T23:59:59+07:00',
    },
  },
]

export default products
