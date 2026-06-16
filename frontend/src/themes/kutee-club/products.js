// ─── Kutee Club Products Config ──────────────────────────────────────────────
const firstPreorderPeriod = {
  startTime: '2026-06-13T23:59:59+07:00',
  endTime: '2026-06-25T23:59:59+07:00',
}

const products = [
  {
    id: '1',
    name: 'KU Running - Ringer Tee',
    tagline: 'KU Running Society',
    price: 389,
    pricingTiers: [
      { minQty: 1, price: 389 },
      { minQty: 6, price: 379 },
      { minQty: 16, price: 369 },
      { minQty: 31, price: 359 },
      { minQty: 51, price: 349 },
    ],
    collectionImage: '/kutee-club/products/rs1-col.jpg',
    colorImages: {
      Green: '/kutee-club/products/rs1-green.png',
      Cream: '/kutee-club/products/rs1-cream.png',
      'Baby blue': '/kutee-club/products/rs1-blue.png',
    },
    colors: ['Green', 'Cream', 'Baby blue'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'],
    oversizeSurcharge: 20,
    oversizeFrom: '3XL',
    sizeChartImage: '/kutee-club/products/rs1-sizechart.png',
    screeningFields: [],
    orderWindow: firstPreorderPeriod,
  },
  {
    id: '2',
    name: 'KU Running - Oversized',
    tagline: 'KU Running Society',
    price: 389,
    pricingTiers: [
      { minQty: 1, price: 389 },
      { minQty: 6, price: 379 },
      { minQty: 16, price: 369 },
      { minQty: 31, price: 359 },
      { minQty: 51, price: 349 },
    ],
    collectionImage: '/kutee-club/products/rs2-col.jpg',
    colorImages: {
      Black: '/kutee-club/products/rs2-black.png',
      White: '/kutee-club/products/rs2-cream.png',
    },
    colors: ['Black', 'White'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'],
    oversizeSurcharge: 20,
    oversizeFrom: '3XL',
    sizeChartImage: '/kutee-club/products/rs2-sizechart.png',
    screeningFields: [],
    orderWindow: firstPreorderPeriod,
  },
  {
    id: '3',
    name: 'Ku Classic Polo',
    tagline: 'Kasetsart 1943 Polo Shirt',
    price: 429,
    pricingTiers: [
      { minQty: 1, price: 429 },
      { minQty: 6, price: 419 },
      { minQty: 16, price: 409 },
      { minQty: 31, price: 399 },
      { minQty: 51, price: 379 },
    ],
    collectionImage: '/kutee-club/products/polo-col.jpg',
    colorImages: {
      Cream: '/kutee-club/products/polo-cream.png',
      Pink: '/kutee-club/products/polo-pink.png',
    },
    colors: ['Cream', 'Pink'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL', '6XL', '7XL'],
    oversizeSurcharge: 20,
    oversizeFrom: '3XL',
    sizeChartImage: '/kutee-club/products/polo-sizechart.png',
    screeningFields: [],
    orderWindow: firstPreorderPeriod,
  },
]

export default products
