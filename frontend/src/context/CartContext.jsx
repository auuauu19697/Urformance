import { createContext, useContext, useReducer, useMemo } from 'react'
import { calculateShippingFee } from '../utils/shipping'
import { getUnitPrice } from '../utils/pricing'
import { useTheme } from './ThemeContext'

const CartContext = createContext(null)

const initialState = {
  cart: [],        // [{ id, sku, model, color, size, qty, unitPrice }]
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { item } = action
      // Screened shirts are unique per-shirt — never merge them
      const isScreened = item.screeningData && Object.keys(item.screeningData).length > 0
      if (!isScreened) {
        const existing = state.cart.find(
          (c) => c.id === item.id && c.color === item.color && c.size === item.size && !c.screeningData,
        )
        if (existing) {
          return {
            ...state,
            cart: state.cart.map((c) =>
              c === existing ? { ...c, qty: c.qty + item.qty } : c,
            ),
          }
        }
      }
      return { ...state, cart: [...state.cart, item] }
    }
    case 'REMOVE_ITEM':
      return { ...state, cart: state.cart.filter((_, i) => i !== action.index) }
    case 'CLEAR_CART':
      return { ...state, cart: [] }
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)
  const { products } = useTheme()

  // Build a lookup map: productId → product config (with pricingTiers)
  const productMap = useMemo(
    () => Object.fromEntries((products || []).map((p) => [p.id, p])),
    [products],
  )

  // ── Compute total qty per product (for tiered pricing) ───────────────────
  const qtyByProduct = useMemo(() => {
    const map = {}
    for (const item of state.cart) {
      map[item.id] = (map[item.id] || 0) + item.qty
    }
    return map
  }, [state.cart])

  // ── Enrich cart items with the correct tiered + oversize unitPrice ────────
  const cart = useMemo(() =>
    state.cart.map((item) => {
      const product = productMap[item.id]
      if (!product) return item
      const totalQty = qtyByProduct[item.id] || item.qty
      const tieredPrice = getUnitPrice(product, totalQty, item.size)
      return { ...item, unitPrice: tieredPrice }
    }),
    [state.cart, productMap, qtyByProduct],
  )

  const subtotal = cart.reduce((sum, item) => sum + item.qty * item.unitPrice, 0)
  const itemCount = cart.reduce((sum, item) => sum + item.qty, 0)
  const shippingFee = calculateShippingFee(itemCount)
  const total = subtotal + shippingFee

  return (
    <CartContext.Provider value={{ cart, subtotal, shippingFee, total, itemCount, qtyByProduct, dispatch }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
