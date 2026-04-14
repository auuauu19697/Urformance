// Products catalog — update this list to change what's available
export const PRODUCTS = [
  {
    id: 'performance-pro',
    name: 'Performance Pro',
    tagline: 'DryTech™ Wicking Fabric',
    price: 890,
    // Place images in /public/images/ and reference like '/images/performance-pro.jpg'
    image: null,
    colors: ['Black', 'White', 'Navy'],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'daily-runner',
    name: 'Daily Runner',
    tagline: 'Soft-touch Cotton Blend',
    price: 790,
    image: null,
    colors: ['Black', 'White', 'Olive'],
    sizes: ['S', 'M', 'L', 'XL'],
  },
]

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'
export const API_KEY = import.meta.env.VITE_API_KEY || ''
