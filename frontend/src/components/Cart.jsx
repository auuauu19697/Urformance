import { useCart } from '../context/CartContext'

export default function Cart({ onBack, onCheckout }) {
  const { cart, total, dispatch } = useCart()
  const isEmpty = cart.length === 0

  return (
    <div>
      <div className="flex justify-between items-end mb-6">
        <h2 className="text-3xl font-black italic uppercase leading-none">Cart</h2>
        <button
          id="add-more-btn"
          onClick={onBack}
          className="text-xs font-black uppercase border-b-2 pb-1 text-accent border-accent"
        >
          + Add More
        </button>
      </div>

      {/* Items */}
      {isEmpty ? (
        <p className="text-center py-16 font-bold uppercase italic tracking-widest text-muted">
          Cart is empty
        </p>
      ) : (
        <div className="space-y-3 mb-8">
          {cart.map((item, index) => (
            <div key={index} className="card flex justify-between items-start p-5 shadow-sm">
              <div className="flex-1">
                <p className="font-black text-sm uppercase italic tracking-tight">{item.model}</p>
                <p className="text-xs font-bold mt-1 uppercase text-muted">
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
        </div>
      )}

      {/* Summary */}
      {!isEmpty && (
        <div className="card p-6 space-y-3 shadow-sm mb-8">
          <div className="flex justify-between font-bold text-base text-muted">
            <span>Subtotal</span><span>{total.toLocaleString()}.-</span>
          </div>
          <div className="flex justify-between font-bold text-base">
            <span className="text-muted">Shipping</span>
            <span className="text-green-600 font-black uppercase text-sm">Free</span>
          </div>
          <hr style={{ borderColor: 'var(--color-border)' }} />
          <div className="flex justify-between text-2xl font-black italic">
            <span>TOTAL</span><span>{total.toLocaleString()}.-</span>
          </div>
        </div>
      )}

      <button
        id="checkout-btn"
        onClick={onCheckout}
        disabled={isEmpty}
        className="btn-primary w-full py-5 font-black text-lg shadow-2xl uppercase italic tracking-wider disabled:cursor-not-allowed"
      >
        Continue to Payment
      </button>
    </div>
  )
}
