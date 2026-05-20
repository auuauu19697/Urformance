/**
 * Resolve the unit price for a product based on total quantity and its pricing tiers.
 *
 * pricingTiers format:
 *   [ { minQty: 1, price: 390 }, { minQty: 6, price: 380 }, ... ]
 *
 * Tiers MUST be sorted by minQty ascending.
 * Falls back to the product's flat `price` if no tiers are defined.
 */
export function getUnitPrice(product, totalQty) {
  const tiers = product.pricingTiers
  if (!tiers || tiers.length === 0) return product.price

  // Walk tiers in reverse to find the highest tier the qty qualifies for
  for (let i = tiers.length - 1; i >= 0; i--) {
    if (totalQty >= tiers[i].minQty) return tiers[i].price
  }

  // Shouldn't happen if tier 1 starts at minQty: 1, but just in case
  return tiers[0].price
}

/**
 * Returns true if the product has quantity-based pricing tiers.
 */
export function hasPricingTiers(product) {
  return Array.isArray(product.pricingTiers) && product.pricingTiers.length > 1
}
