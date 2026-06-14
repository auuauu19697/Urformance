// ─── Kutee Club Products Config ──────────────────────────────────────────────

const products = [
  {
    id: '1',
    name: 'Ku Running Society',
    tagline: 'Kasetsart 1943 Running Society',
    price: 389,
    pricingTiers: [
      { minQty: 1, price: 389 },
    ],
    collectionImage: '/kutee-club/products/rs1-col.png',
    colorImages: {
      Green: '/kutee-club/products/rs1-green.jpg',
      Cream: '/kutee-club/products/rs1-cream.jpg',
      'Baby blue': '/kutee-club/products/rs1-blue.jpg',
    },
    colors: ['Green', 'Cream', 'Baby blue'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'],
    oversizeSurcharge: 20,
    oversizeFrom: '3XL',
    sizeChartImage: '/size-chart-default.png',
    screeningFields: [],
    orderWindow: {
      startTime: '2026-06-13T23:59:59+07:00',
      endTime: '2026-06-31T23:59:59+07:00',
    },
  },
  {
    id: '2',
    name: 'Ku Running Society 2',
    tagline: 'Kasetsart 1943 Running Society 2',
    price: 389,
    pricingTiers: [
      { minQty: 1, price: 389 },
    ],
    collectionImage: null,
    colorImages: {
      Black: null,
      Cream: null,
    },
    colors: ['Black', 'Cream'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'],
    oversizeSurcharge: 20,
    oversizeFrom: '3XL',
    sizeChartImage: '/size-chart-default.png',
    screeningFields: [],
    orderWindow: {
      startTime: '2026-06-13T23:59:59+07:00',
      endTime: '2026-06-31T23:59:59+07:00',
    },
  },
  {
    id: '3',
    name: 'Ku Polo',
    tagline: 'Kasetsart 1943 Polo Shirt',
    price: 389,
    pricingTiers: [
      { minQty: 1, price: 389 },
    ],
    collectionImage: null,
    colorImages: {
      Cream: null,
      Pink: null,
    },
    colors: ['Cream', 'Pink'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'],
    oversizeSurcharge: 20,
    oversizeFrom: '3XL',
    sizeChartImage: '/size-chart-default.png',
    screeningFields: [],
    orderWindow: {
      startTime: '2026-06-13T23:59:59+07:00',
      endTime: '2026-06-31T23:59:59+07:00',
    },
  },
]

export default products
