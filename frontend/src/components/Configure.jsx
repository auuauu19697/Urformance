import { useState } from 'react'
import { useCart } from '../context/CartContext'

export default function Configure({ product, onBack, onDone }) {
  const [size, setSize] = useState('')
  const [color, setColor] = useState(product.colors[0])
  const [qty, setQty] = useState(1)
  const { dispatch } = useCart()

  function handleAdd() {
    if (!size) {
      alert('Please select a size.')
      return
    }
    dispatch({
      type: 'ADD_ITEM',
      item: {
        id: product.id,
        sku: `${product.id.toUpperCase()}-${color.toUpperCase().slice(0, 3)}-${size}`,
        model: product.name,
        color,
        size,
        qty,
        unitPrice: product.price,
      },
    })
    onDone()
  }

  return (
    <div>
      {/* Back */}
      <button
        onClick={onBack}
        className="text-xs font-black text-slate-400 mb-6 flex items-center uppercase tracking-widest"
      >
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeWidth="3" d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>

      <h2 className="text-3xl font-black italic uppercase leading-none">{product.name}</h2>
      <p className="text-xl text-slate-400 mb-8 font-bold">{product.price.toLocaleString()} THB</p>

      {/* Color */}
      {product.colors.length > 1 && (
        <div className="mb-8">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">1. Color</p>
          <div className="flex gap-2 flex-wrap">
            {product.colors.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={`px-5 py-2 rounded-xl border-2 font-bold text-sm transition
                  ${color === c ? 'bg-black text-white border-black' : 'border-slate-200 hover:border-black'}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Size */}
      <div className="mb-8">
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">
          {product.colors.length > 1 ? '2.' : '1.'} Size
        </p>
        <div className="grid grid-cols-4 gap-2">
          {product.sizes.map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className={`py-4 rounded-2xl border-2 font-bold transition
                ${size === s ? 'bg-black text-white border-black' : 'border-slate-200 hover:border-black'}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Qty */}
      <div className="mb-12">
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">
          {product.colors.length > 1 ? '3.' : '2.'} Quantity
        </p>
        <div className="flex items-center border-2 border-slate-200 rounded-2xl w-max bg-white">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="px-6 py-3 font-bold text-xl hover:bg-slate-50 rounded-l-2xl transition"
          >−</button>
          <span className="px-8 py-3 font-black border-x-2 text-lg">{qty}</span>
          <button
            onClick={() => setQty((q) => q + 1)}
            className="px-6 py-3 font-bold text-xl hover:bg-slate-50 rounded-r-2xl transition"
          >+</button>
        </div>
      </div>

      <button
        onClick={handleAdd}
        className="w-full bg-black text-white py-5 rounded-3xl font-black text-lg shadow-2xl active:scale-95 transition-transform uppercase italic tracking-wider"
      >
        Add to Order
      </button>
    </div>
  )
}
