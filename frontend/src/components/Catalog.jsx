import { useState, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'
import { hasPricingTiers } from '../utils/pricing'

// ─── Countdown Hook ───────────────────────────────────────────────────────────
function useCountdown(endTimeIso) {
  function getRemaining() {
    if (!endTimeIso) return null
    const diff = new Date(endTimeIso) - new Date()
    if (diff <= 0) return null
    const totalSec = Math.floor(diff / 1000)
    return {
      days: Math.floor(totalSec / 86400),
      hours: Math.floor((totalSec % 86400) / 3600),
      minutes: Math.floor((totalSec % 3600) / 60),
      seconds: totalSec % 60,
    }
  }

  const [remaining, setRemaining] = useState(getRemaining)

  useEffect(() => {
    if (!endTimeIso) return
    setRemaining(getRemaining()) // Set initially
    const id = setInterval(() => {
      setRemaining(getRemaining())
    }, 1000)
    return () => clearInterval(id)
  }, [endTimeIso])

  return remaining
}

// ─── Product Card ─────────────────────────────────────────────────────────────
function ProductCard({ product, onSelect }) {
  const showTiers = hasPricingTiers(product)
  const lowestPrice = showTiers
    ? product.pricingTiers[product.pricingTiers.length - 1].price
    : product.price

  const firstColor = product.colors[0]
  const previewImage = product.collectionImage || product.colorImages?.[firstColor] || null

  const now = new Date()
  const end = product.orderWindow?.endTime ? new Date(product.orderWindow.endTime) : null
  const isClosed = end && now >= end

  const remaining = useCountdown(product.orderWindow?.endTime)

  return (
    <div
      id={`product-card-${product.id}`}
      className={`card overflow-hidden shadow-sm transition-all ${isClosed ? 'opacity-60 cursor-not-allowed' : 'active:scale-[0.98] cursor-pointer'
        }`}
      onClick={isClosed ? undefined : () => onSelect(product)}
    >
      {/* Image */}
      <div
        className="aspect-[4/5] flex items-center justify-center font-black italic text-sm uppercase tracking-wider"
        style={{ background: 'var(--color-border)', color: 'var(--color-muted)' }}
      >
        {previewImage ? (
          <img src={previewImage} alt={product.name} className="w-full h-full object-cover" />
        ) : (
          'PHOTO'
        )}
      </div>

      {/* Info */}
      <div className="p-5">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-black text-lg leading-none">{product.name}</h3>
            <p className="text-xs mt-1 font-semibold text-muted">{product.tagline}</p>
          </div>
          <div className="text-right">
            {showTiers ? (
              <>
                <p className="font-black text-lg">{product.price.toLocaleString()}.-</p>
              </>
            ) : (
              <p className="font-black text-lg">{product.price.toLocaleString()}.-</p>
            )}
          </div>
        </div>

        {/* Live Countdown or Closed Badge */}
        {product.orderWindow?.endTime && (
          <div
            className="mt-3 pt-3 border-t border-dashed flex items-center justify-between text-[11px] font-bold text-muted uppercase tracking-wider"
            style={{ borderColor: 'var(--color-border)' }}
          >
            <span>Pre-order</span>
            {isClosed ? (
              <span
                className="px-2 py-0.5 rounded font-black text-[9px] text-white"
                style={{ background: 'var(--color-primary)' }}
              >
                Closed
              </span>
            ) : remaining ? (
              <span className="font-black tabular-nums" style={{ color: 'var(--color-primary)' }}>
                {remaining.days > 0 ? `${remaining.days}d ` : ''}
                {String(remaining.hours).padStart(2, '0')}h{' '}
                {String(remaining.minutes).padStart(2, '0')}m{' '}
                {String(remaining.seconds).padStart(2, '0')}s
              </span>
            ) : (
              <span
                className="px-2 py-0.5 rounded font-black text-[9px] text-white"
                style={{ background: 'var(--color-primary)' }}
              >
                Closed
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Catalog Component ────────────────────────────────────────────────────────
export default function Catalog({ onSelect }) {
  const { products } = useTheme()
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const id = setInterval(() => {
      setNow(new Date())
    }, 1000)
    return () => clearInterval(id)
  }, [])

  // Filter out products whose startTime is in the future
  const visibleProducts = products.filter((p) => {
    const start = p.orderWindow?.startTime ? new Date(p.orderWindow.startTime) : null
    return !start || now >= start
  })

  return (
    <div>
      <h2 className="text-3xl font-black italic uppercase leading-none mb-8">Collection</h2>
      <div className="grid grid-cols-1 gap-6">
        {visibleProducts.map((p) => (
          <ProductCard key={p.id} product={p} onSelect={onSelect} />
        ))}
      </div>
    </div>
  )
}
