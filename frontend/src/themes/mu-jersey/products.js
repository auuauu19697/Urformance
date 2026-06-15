// ─── MU Jersey Products Config ──────────────────────────────────────────────

const products = [
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
    collectionImage: '/mu-jersey/products/autotech-collection.jpg',
    colorImages: {
      Navy: '/mu-jersey/products/autotech-navy.jpg',
      Black: '/mu-jersey/products/autotech-black.jpg',
    },
    colors: ['Navy', 'Black'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL', '6XL', '7XL'],
    oversizeSurcharge: 20,
    oversizeFrom: '4XL',
    sizeChartImage: '/size-chart-default.png',
    screeningFields: [],
    orderWindow: {
      startTime: '2026-05-13T23:59:59+07:00',
      endTime: '2026-05-29T23:59:59+07:00',
    },
  },
]

export default products
