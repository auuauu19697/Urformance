import { useState } from 'react'
import { useCart } from '../context/CartContext'

export default function Configure({ product, onBack, onDone }) {
  const [size, setSize]               = useState('')
  const [color, setColor]             = useState(product.colors[0])
  const [qty, setQty]                 = useState(1)
  const [screeningData, setScreening] = useState({})
  const { dispatch }                  = useCart()

  const hasColor    = product.colors.length > 1
  const hasScreening = product.screeningFields?.length > 0
  const sizeStep    = hasColor ? 2 : 1
  const screenStep  = sizeStep + 1
  const qtyStep     = hasScreening ? screenStep + 1 : screenStep

  function handleAdd() {
    if (!size) { alert('Please select a size.'); return }
    dispatch({
      type: 'ADD_ITEM',
      item: {
        id:            product.id,
        sku:           `${product.id.toUpperCase()}-${color.toUpperCase().slice(0, 3)}-${size}`,
        model:         product.name,
        color,
        size,
        qty,
        unitPrice:     product.price,
        screeningData: Object.keys(screeningData).length > 0 ? screeningData : undefined,
      },
    })
    onDone()
  }

  return (
    <div>
      {/* Back */}
      <button id="configure-back-btn"
        onClick={onBack}
        className="text-sm font-black mb-6 flex items-center uppercase tracking-widest text-muted"
      >
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeWidth="3" d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>

      <h2 className="text-3xl font-black italic uppercase leading-none">{product.name}</h2>
      <p className="text-xl mb-8 font-bold text-muted">{product.price.toLocaleString()} THB</p>

      {/* Color */}
      {hasColor && (
        <div className="mb-8">
          <p className="step-label">1. Color</p>
          <div className="flex gap-2 flex-wrap">
            {product.colors.map((c) => (
              <button
                key={c}
                id={`color-btn-${c}`}
                onClick={() => setColor(c)}
                className={`option-btn px-5 py-2 text-sm ${color === c ? 'selected' : ''}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Size */}
      <div className="mb-8">
        <p className="step-label">
          {sizeStep}. Size
        </p>
        <div className="grid grid-cols-4 gap-2">
          {product.sizes.map((s) => (
            <button
              key={s}
              id={`size-btn-${s}`}
              onClick={() => setSize(s)}
              className={`option-btn py-4 ${size === s ? 'selected' : ''}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Screening / Personalisation */}
      {hasScreening && (
        <div className="mb-8">
          <p className="step-label">
            {screenStep}. Personalization
          </p>
          <div className="space-y-4">
            {product.screeningFields.map((field) => (
              <div key={field.key}>
                <label className="block text-xs font-black uppercase mb-1.5 ml-1 text-muted">
                  {field.label}
                </label>
                <input
                  type={field.type || 'text'}
                  value={screeningData[field.key] || ''}
                  onChange={(e) => setScreening(prev => ({ ...prev, [field.key]: e.target.value }))}
                  placeholder={field.placeholder}
                  maxLength={field.maxLength}
                  className="input-field"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Qty — only for non-screened products */}
      {!hasScreening && (
        <div className="mb-12">
          <p className="step-label">
            {qtyStep}. Quantity
          </p>
          <div className="flex items-center border-2 rounded-2xl w-max"
            style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface)' }}
          >
            <button
              id="qty-dec-btn"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="px-6 py-3 font-bold text-xl rounded-l-2xl transition hover:opacity-70"
            >−</button>
            <span className="px-8 py-3 font-black border-x-2 text-lg"
              style={{ borderColor: 'var(--color-border)' }}
            >{qty}</span>
            <button
              id="qty-inc-btn"
              onClick={() => setQty((q) => q + 1)}
              className="px-6 py-3 font-bold text-xl rounded-r-2xl transition hover:opacity-70"
            >+</button>
          </div>
        </div>
      )}

      <button
        id="add-to-order-btn"
        onClick={handleAdd}
        className="btn-primary w-full py-5 font-black text-lg shadow-2xl uppercase italic tracking-wider"
      >
        Add to Order
      </button>
    </div>
  )
}
