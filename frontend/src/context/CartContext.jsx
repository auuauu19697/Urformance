import { createContext, useContext, useReducer } from 'react'
import { calculateShippingFee } from '../utils/shipping'

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

  const subtotal = state.cart.reduce((sum, item) => sum + item.qty * item.unitPrice, 0)
  const itemCount = state.cart.reduce((sum, item) => sum + item.qty, 0)
  const shippingFee = calculateShippingFee(itemCount)
  const total = subtotal + shippingFee

  return (
    <CartContext.Provider value={{ cart: state.cart, subtotal, shippingFee, total, itemCount, dispatch }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
