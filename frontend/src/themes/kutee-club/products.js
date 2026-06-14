// ─── Kutee Club Products Config ──────────────────────────────────────────────

const products = [
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
    collectionImage: null,
    colorImages: {
      White: null,
      Cream: null,
      Green: null,
    },
    colors: ['White', 'Cream', 'Green'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL', '6XL', '7XL'],
    oversizeSurcharge: 30,
    oversizeFrom: '4XL',
    sizeChartImage: '/size-chart-default.png',
    screeningFields: [],
    orderWindow: {
      startTime: '2026-07-13T23:59:59+07:00',
      endTime: '2026-07-31T23:59:59+07:00',
    },
  }
]

export default products
