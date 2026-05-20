import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { getUnitPrice, hasPricingTiers, getOversizeSurcharge, hasOversizeSurcharge } from '../utils/pricing'

export default function Configure({ product, onBack, onDone }) {
  const [size, setSize]               = useState('')
  const [color, setColor]             = useState(product.colors[0])
  const [qty, setQty]                 = useState(1)
  const [screeningData, setScreening] = useState({})
  const [showSizeChart, setShowSizeChart] = useState(false)
  const { qtyByProduct, dispatch }    = useCart()

  const hasColor     = product.colors.length > 1
  const hasScreening = product.screeningFields?.length > 0
  const sizeStep     = hasColor ? 2 : 1
  const screenStep   = sizeStep + 1
  const qtyStep      = hasScreening ? screenStep + 1 : screenStep

  // ── Tiered pricing ────────────────────────────────────────────────────────
  const showTiers       = hasPricingTiers(product)
  const showOversize    = hasOversizeSurcharge(product)
  const existingQty     = qtyByProduct[product.id] || 0
  const previewTotalQty = existingQty + qty
  // Base tiered price (before oversize)
  const basePrice       = getUnitPrice(product, previewTotalQty, null)
  // Full price including oversize surcharge for selected size
  const currentPrice    = getUnitPrice(product, previewTotalQty, size || null)
  const surchargeSingle = size ? getOversizeSurcharge(product, size) : 0

  // ── Per-color image ───────────────────────────────────────────────────────
  const colorImage = product.colorImages?.[color] ?? null

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
        unitPrice:     currentPrice,
        screeningData: Object.keys(screeningData).length > 0 ? screeningData : undefined,
      },
    })
    onDone()
  }

  function tierLabel(tier, idx, tiers) {
    const next = tiers[idx + 1]
    if (!next) return `${tier.minQty}+`
    return `${tier.minQty} – ${next.minQty - 1}`
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

      {/* ── Product image (changes with selected color) ── */}
      <div
        className="w-full aspect-[4/5] rounded-2xl overflow-hidden mb-6 flex items-center justify-center font-black italic text-sm uppercase tracking-wider"
        style={{ background: 'var(--color-border)', color: 'var(--color-muted)' }}
      >
        {colorImage
          ? <img src={colorImage} alt={`${product.name} — ${color}`} className="w-full h-full object-cover transition-opacity duration-300" />
          : 'PHOTO'}
      </div>

      <h2 className="text-3xl font-black italic uppercase leading-none">{product.name}</h2>

      {/* ── Price display ── */}
      {showTiers ? (
        <div className="mb-8">
          <p className="text-xl font-bold mt-1" style={{ color: 'var(--color-primary)' }}>
            {currentPrice.toLocaleString()} THB / pc
            {currentPrice < (showTiers ? product.pricingTiers[0].price : product.price) + surchargeSingle && (
              <span className="text-sm line-through text-muted ml-2 font-semibold">
                {(product.price + surchargeSingle).toLocaleString()}
              </span>
            )}
          </p>

          {/* Pricing tiers table */}
          <div className="card mt-4 p-4 shadow-sm">
            <p className="text-[11px] font-black uppercase tracking-wider text-muted mb-3">
              🏷 Bulk Pricing — Buy More, Save More
            </p>
            <div className="space-y-2">
              {product.pricingTiers.map((tier, idx) => {
                const isActive =
                  idx === product.pricingTiers.length - 1
                    ? previewTotalQty >= tier.minQty
                    : previewTotalQty >= tier.minQty && previewTotalQty < (product.pricingTiers[idx + 1]?.minQty ?? Infinity)
                return (
                  <div
                    key={tier.minQty}
                    className={`flex justify-between items-center text-sm px-3 py-2 rounded-lg transition-all ${isActive ? 'font-black' : 'text-muted'}`}
                    style={isActive ? { background: 'var(--color-primary)', color: 'var(--color-primary-fg)' } : {}}
                  >
                    <span>{tierLabel(tier, idx, product.pricingTiers)} pcs</span>
                    <span className="font-black">
                      {tier.price.toLocaleString()} THB / pc
                      {surchargeSingle > 0 && (
                        <span className="ml-1 opacity-70">+{surchargeSingle}</span>
                      )}
                    </span>
                  </div>
                )
              })}
            </div>

            {/* Oversize surcharge note */}
            {showOversize && (
              <p className="text-[11px] font-bold mt-3 px-1" style={{ color: 'var(--color-primary)' }}>
                📐 {product.oversizeFrom} and above +{product.oversizeSurcharge} THB / pc
              </p>
            )}

            {existingQty > 0 && (
              <p className="text-[11px] font-bold text-muted mt-2 px-1">
                Already in cart: {existingQty} pcs · Adding {qty} more = {previewTotalQty} total
              </p>
            )}
          </div>
        </div>
      ) : (
        <p className="text-xl mb-8 font-bold text-muted mt-1">{product.price.toLocaleString()} THB</p>
      )}

      {/* ── Color ── */}
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

      {/* ── Size ── */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <p className="step-label !mb-0">{sizeStep}. Size</p>
          {product.sizeChartImage && (
            <button
              id="size-chart-btn"
              onClick={() => setShowSizeChart(true)}
              className="flex items-center gap-1 text-xs font-black uppercase tracking-widest text-muted hover:opacity-70 transition-opacity"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Size Guide
            </button>
          )}
        </div>
        <div className="grid grid-cols-4 gap-2">
          {product.sizes.map((s) => {
            const surcharge = getOversizeSurcharge(product, s)
            const isOversize = surcharge > 0
            return (
              <button
                key={s}
                id={`size-btn-${s}`}
                onClick={() => setSize(s)}
                className={`option-btn py-3 text-sm relative ${size === s ? 'selected' : ''}`}
              >
                <span>{s}</span>
                {isOversize && (
                  <span
                    className="absolute -top-1.5 -right-1.5 text-[9px] font-black px-1 py-0.5 rounded-full leading-none"
                    style={{
                      background: size === s ? 'rgba(255,255,255,0.25)' : 'var(--color-primary)',
                      color: size === s ? 'inherit' : 'var(--color-primary-fg)',
                    }}
                  >
                    +{surcharge}
                  </span>
                )}
              </button>
            )
          })}
        </div>
        {showOversize && (
          <p className="text-[11px] font-bold text-muted mt-2 ml-1">
            📐 {product.oversizeFrom}+ sizes include +{product.oversizeSurcharge} THB surcharge per piece
          </p>
        )}
      </div>

      {/* ── Screening / Personalisation ── */}
      {hasScreening && (
        <div className="mb-8">
          <p className="step-label">{screenStep}. Personalization</p>
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

      {/* ── Qty ── */}
      {!hasScreening && (
        <div className="mb-12">
          <p className="step-label">{qtyStep}. Quantity</p>
          <div
            className="flex items-center border-2 rounded-2xl w-max"
            style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface)' }}
          >
            <button
              id="qty-dec-btn"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="px-6 py-3 font-bold text-xl rounded-l-2xl transition hover:opacity-70"
            >−</button>
            <span
              className="px-8 py-3 font-black border-x-2 text-lg"
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

      {/* ── Add to order CTA ── */}
      <button
        id="add-to-order-btn"
        onClick={handleAdd}
        className="btn-primary w-full py-5 font-black text-lg shadow-2xl uppercase italic tracking-wider"
      >
        Add to Order — {(qty * currentPrice).toLocaleString()} THB
      </button>

      {/* ── Size Chart Modal ── */}
      {showSizeChart && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
          onClick={() => setShowSizeChart(false)}
        >
          <div
            className="card w-full max-w-lg shadow-2xl overflow-hidden"
            style={{ background: 'var(--color-surface)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="flex justify-between items-center px-5 py-4 border-b"
              style={{ borderColor: 'var(--color-border)' }}
            >
              <h3 className="text-xl font-black italic uppercase" style={{ color: 'var(--color-primary)' }}>
                Size Guide
              </h3>
              <button onClick={() => setShowSizeChart(false)} className="text-muted hover:opacity-70 transition-opacity">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="overflow-y-auto max-h-[70vh]">
              <img src={product.sizeChartImage} alt="Size Chart" className="w-full h-auto" />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
