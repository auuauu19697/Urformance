/**
 * Canonical size order — used to determine if a size qualifies for oversize surcharge.
 */
export const SIZE_ORDER = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL', '6XL', '7XL']

/**
 * Returns the oversize surcharge for a given size, or 0 if it doesn't apply.
 *
 * Product schema:
 *   oversizeSurcharge: 30       — THB added per piece
 *   oversizeFrom: '4XL'         — sizes at this index and above get the surcharge
 *                                  defaults to '4XL' if oversizeSurcharge is set but oversizeFrom is omitted
 */
export function getOversizeSurcharge(product, size) {
  if (!product?.oversizeSurcharge || !size) return 0
  const threshold = product.oversizeFrom ?? '4XL'
  const thresholdIdx = SIZE_ORDER.indexOf(threshold)
  const sizeIdx = SIZE_ORDER.indexOf(size)
  if (thresholdIdx === -1 || sizeIdx === -1) return 0
  return sizeIdx >= thresholdIdx ? product.oversizeSurcharge : 0
}

/**
 * Returns true if the product has an oversize surcharge configured.
 */
export function hasOversizeSurcharge(product) {
  return typeof product?.oversizeSurcharge === 'number' && product.oversizeSurcharge > 0
}

/**
 * Resolve the full unit price for a product:
 *   tiered base price (by totalQty) + oversize surcharge (by size)
 *
 * pricingTiers format:
 *   [ { minQty: 1, price: 390 }, { minQty: 6, price: 380 }, ... ]
 *
 * Tiers MUST be sorted by minQty ascending.
 * Falls back to the product's flat `price` if no tiers are defined.
 */
export function getUnitPrice(product, totalQty, size = null) {
  const tiers = product.pricingTiers
  let basePrice = product.price

  if (tiers && tiers.length > 0) {
    // Walk tiers in reverse to find the highest tier the qty qualifies for
    for (let i = tiers.length - 1; i >= 0; i--) {
      if (totalQty >= tiers[i].minQty) {
        basePrice = tiers[i].price
        break
      }
    }
  }

  return basePrice + getOversizeSurcharge(product, size)
}

/**
 * Returns true if the product has quantity-based pricing tiers.
 */
export function hasPricingTiers(product) {
  return Array.isArray(product.pricingTiers) && product.pricingTiers.length > 1
}
