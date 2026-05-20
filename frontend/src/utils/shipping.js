/**
 * Calculate shipping fee based on total item quantity.
 *
 * Tiers:
 *   1–5  pieces →  30 THB
 *   6–15 pieces →  50 THB
 *  16–29 pieces →  75 THB
 *  30+   pieces → 100 THB
 */
export function calculateShippingFee(totalQty) {
  if (totalQty <= 0) return 0
  if (totalQty <= 5) return 30
  if (totalQty <= 15) return 50
  if (totalQty <= 29) return 75
  return 100
}
