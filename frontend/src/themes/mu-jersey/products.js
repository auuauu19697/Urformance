// ─── MU Jersey Products Config ──────────────────────────────────────────────

const preorderPeriod = {
  startTime: '2026-06-18T16:00:00+07:00',
  endTime: '2026-07-03T23:59:59+07:00',
}

const products = [
  // {
  //   id: '1',
  //   name: 'Autotech',
  //   tagline: 'This collection no customize name&number',
  //   price: 390,
  //   pricingTiers: [
  //     { minQty: 1, price: 390 },
  //     { minQty: 6, price: 380 },
  //     { minQty: 16, price: 370 },
  //     { minQty: 30, price: 350 },
  //   ],
  //   collectionImage: '/mu-jersey/products/autotech-collection.jpg',
  //   colorImages: {
  //     Navy: '/mu-jersey/products/autotech-navy.jpg',
  //     Black: '/mu-jersey/products/autotech-black.jpg',
  //   },
  //   colors: ['Navy', 'Black'],
  //   sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL', '6XL', '7XL'],
  //   oversizeSurcharge: 20,
  //   oversizeFrom: '4XL',
  //   sizeChartImage: '/size-chart-default.png',
  //   screeningFields: [],
  //   orderWindow: {
  //     startTime: '2026-05-13T23:59:59+07:00',
  //     endTime: '2026-05-29T23:59:59+07:00',
  //   },
  // },
  {
    id: '2',
    name: 'Mahidol Running - Track Tee',
    tagline: 'Mahidol Running',
    price: 390,
    pricingTiers: [
      { minQty: 1, price: 390 },
      { minQty: 6, price: 380 },
      { minQty: 16, price: 370 },
      { minQty: 31, price: 360 },
      { minQty: 51, price: 350 },
    ],
    collectionImage: '/mu-jersey/products/mr1-col.png',
    colorImages: {
      Charcoal: '/mu-jersey/products/mr1-charcoal.png',
      Ivory: '/mu-jersey/products/mr1-ivory.png',
      Navy: '/mu-jersey/products/mr1-navy.png',
      Pink: '/mu-jersey/products/mr1-pink.png',
    },
    colors: ['Charcoal', 'Ivory', 'Navy', 'Pink'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'],
    oversizeSurcharge: 20,
    oversizeFrom: '3XL',
    sizeChartImage: '/mu-jersey/products/mr1-sizechart.png',
    screeningFields: [],
    orderWindow: preorderPeriod,
  },
  {
    id: '3',
    name: 'Mahidol Running - Ringer Tee',
    tagline: 'Mahidol Running',
    price: 390,
    pricingTiers: [
      { minQty: 1, price: 390 },
      { minQty: 6, price: 380 },
      { minQty: 16, price: 370 },
      { minQty: 31, price: 360 },
      { minQty: 51, price: 350 },
    ],
    collectionImage: '/mu-jersey/products/mr2-col.png',
    colorImages: {
      Navy: '/mu-jersey/products/mr2-navy.png',
      Pink: '/mu-jersey/products/mr2-pink.png',
    },
    colors: ['Navy', 'Pink'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'],
    oversizeSurcharge: 20,
    oversizeFrom: '3XL',
    sizeChartImage: '/mu-jersey/products/mr2-sizechart.png',
    screeningFields: [],
    orderWindow: preorderPeriod,
  },
]

export default products
