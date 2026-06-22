import { useState } from 'react'
import { useCart } from '../context/CartContext'

export default function Cart({ onBack, onCheckout }) {
  const { cart, subtotal, shippingFee, total, dispatch } = useCart()
  const isEmpty = cart.length === 0
  const [showShippingInfo, setShowShippingInfo] = useState(false)

  return (
    <div className="pt-2">
      <div className="mb-6">
        <h2 className="text-3xl font-black italic uppercase leading-none">Cart</h2>
      </div>

      {/* Items */}
      {isEmpty ? (
        <div className="flex flex-col items-center justify-center py-16 space-y-2">
          <p className="font-bold uppercase italic tracking-widest text-muted text-center">
            Your cart is empty
          </p>
          <button
            onClick={onBack}
            className="font-black uppercase italic tracking-wider underline hover:opacity-80 transition-opacity"
            style={{ color: 'var(--color-primary)' }}
          >
            Browse Collection
          </button>
        </div>
      ) : (
        <div className="space-y-3 mb-8">
          {cart.map((item, index) => (
            <div key={index} className="card flex justify-between items-start p-5 shadow-sm">
              <div className="flex-1">
                <p className="font-black text-sm uppercase italic tracking-tight">{item.model}</p>
                <p className="text-xs font-bold mt-1 uppercase text-muted font-secondary">
                  {item.unitPrice.toLocaleString()}.- / unit · {item.color} · {item.size}
                </p>
                <p className="text-xs font-black mt-1.5 uppercase italic tracking-widest">Qty: {item.qty}</p>
                {item.screeningData && Object.keys(item.screeningData).length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {Object.entries(item.screeningData).map(([k, v]) => (
                      <span
                        key={k}
                        className="btn-primary text-[14px] font-black uppercase px-2 py-0.5 rounded-full"
                      >
                        {k}: {v}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="text-right pl-4">
                <p className="font-black text-base mb-1 whitespace-nowrap">
                  {(item.qty * item.unitPrice).toLocaleString()}.-
                </p>
                <button
                  id={`remove-item-${index}`}
                  onClick={() => dispatch({ type: 'REMOVE_ITEM', index })}
                  className="text-xs uppercase font-black text-red-500 tracking-tight"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <button
            id="add-more-btn"
            onClick={onBack}
            className="w-full py-4 border-2 border-dashed rounded-xl font-black uppercase italic tracking-wider text-sm transition-opacity hover:opacity-80"
            style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}
          >
            + Add More Items
          </button>
        </div>
      )}
      {/* Summary */}
      {!isEmpty && (
        <>
          <div className="card p-6 space-y-3 shadow-sm mb-8">
            <div className="flex justify-between font-bold text-base text-muted font-secondary">
              <span>Subtotal</span><span>{subtotal.toLocaleString()}.-</span>
            </div>
            <div className="flex justify-between font-bold text-base font-secondary">
              <span className="text-muted flex items-center gap-1">
                Shipping
                <button
                  onClick={() => setShowShippingInfo(true)}
                  className="hover:text-black transition-colors"
                  title="View Shipping Rates"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              </span>
              <span className="font-black text-sm">{shippingFee.toLocaleString()}.-</span>
            </div>
            <hr style={{ borderColor: 'var(--color-border)' }} />
            <div className="flex justify-between text-2xl font-black italic">
              <span>TOTAL</span><span>{total.toLocaleString()}.-</span>
            </div>
          </div>
        </>
      )}

      <button
        id="checkout-btn"
        onClick={onCheckout}
        disabled={isEmpty}
        className="btn-primary w-full py-5 font-black text-lg shadow-2xl uppercase italic tracking-wider disabled:cursor-not-allowed"
      >
        Continue to Payment
      </button>

      {/* Shipping Info Modal */}
      {showShippingInfo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 transition-opacity"
          onClick={() => setShowShippingInfo(false)}
        >
          <div
            className="card w-full max-w-sm p-6 shadow-2xl"
            style={{ background: 'var(--color-surface)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-2xl font-black italic uppercase leading-none" style={{ color: 'var(--color-primary)' }}>Shipping Rates</h3>
              <button onClick={() => setShowShippingInfo(false)} className="text-muted hover:text-black">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-3 text-sm font-bold text-muted mb-6 font-secondary">
              <div className="flex justify-between items-center border-b pb-2 border-gray-100">
                <span>1 - 5 pieces</span>
                <span className="font-black text-base" style={{ color: 'var(--color-primary)' }}>30 THB</span>
              </div>
              <div className="flex justify-between items-center border-b pb-2 border-gray-100">
                <span>6 - 15 pieces</span>
                <span className="font-black text-base" style={{ color: 'var(--color-primary)' }}>50 THB</span>
              </div>
              <div className="flex justify-between items-center border-b pb-2 border-gray-100">
                <span>16 - 29 pieces</span>
                <span className="font-black text-base" style={{ color: 'var(--color-primary)' }}>75 THB</span>
              </div>
              <div className="flex justify-between items-center pb-2">
                <span>30+ pieces</span>
                <span className="font-black text-base" style={{ color: 'var(--color-primary)' }}>100 THB</span>
              </div>
            </div>

            <button
              onClick={() => setShowShippingInfo(false)}
              className="btn-primary w-full py-4 font-black uppercase italic tracking-wider text-sm shadow-lg"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
