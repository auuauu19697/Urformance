import { useCart } from '../context/CartContext'

export default function Cart({ onBack, onCheckout }) {
  const { cart, total, dispatch } = useCart()
  const isEmpty = cart.length === 0

  return (
    <div>
      <div className="flex justify-between items-end mb-6">
        <h2 className="text-3xl font-black italic uppercase leading-none">Cart</h2>
        <button
          onClick={onBack}
          className="text-xs font-black text-blue-600 uppercase border-b-2 border-blue-600 pb-1"
        >
          + Add More
        </button>
      </div>

      {/* Items */}
      {isEmpty ? (
        <p className="text-center py-16 text-slate-400 font-bold uppercase italic tracking-widest">
          Cart is empty
        </p>
      ) : (
        <div className="space-y-3 mb-8">
          {cart.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-white border border-slate-200 p-5 rounded-3xl shadow-sm"
            >
              <div className="flex-1">
                <p className="font-black text-[10px] uppercase italic tracking-tight">{item.model}</p>
                <p className="text-[10px] font-black text-slate-400 mt-0.5 uppercase">
                  {item.unitPrice.toLocaleString()}.- / unit · {item.color} · {item.size}
                </p>
                <p className="text-xs font-black mt-1 uppercase italic tracking-widest">Qty: {item.qty}</p>
              </div>
              <div className="text-right pl-4">
                <p className="font-black text-sm mb-1 whitespace-nowrap">
                  {(item.qty * item.unitPrice).toLocaleString()}.-
                </p>
                <button
                  onClick={() => dispatch({ type: 'REMOVE_ITEM', index })}
                  className="text-[9px] uppercase font-black text-red-500 tracking-tighter"
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
        <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-3 shadow-sm mb-8">
          <div className="flex justify-between text-slate-500 font-bold text-sm">
            <span>Subtotal</span><span>{total.toLocaleString()}.-</span>
          </div>
          <div className="flex justify-between text-slate-500 font-bold text-sm">
            <span>Shipping</span>
            <span className="text-green-600 font-black uppercase text-xs">Free</span>
          </div>
          <hr className="border-slate-100" />
          <div className="flex justify-between text-2xl font-black italic">
            <span>TOTAL</span><span>{total.toLocaleString()}.-</span>
          </div>
        </div>
      )}

      <button
        onClick={onCheckout}
        disabled={isEmpty}
        className="w-full bg-black text-white py-5 rounded-3xl font-black text-lg shadow-2xl disabled:bg-slate-300 disabled:cursor-not-allowed uppercase italic tracking-wider transition"
      >
        Continue to Payment
      </button>
    </div>
  )
}
