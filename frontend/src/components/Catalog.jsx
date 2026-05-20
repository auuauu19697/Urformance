import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { hasPricingTiers } from '../utils/pricing'

function ProductCard({ product, onSelect }) {
  const showTiers = hasPricingTiers(product)
  const lowestPrice = showTiers
    ? product.pricingTiers[product.pricingTiers.length - 1].price
    : product.price

  // Preview the first color image on the catalog card
  const firstColor = product.colors[0]
  const previewImage = product.colorImages?.[firstColor] ?? null

  return (
    <div
      id={`product-card-${product.id}`}
      className="card overflow-hidden shadow-sm active:scale-[0.98] transition-transform cursor-pointer"
      onClick={() => onSelect(product)}
    >
      {/* Image */}
      <div
        className="aspect-[4/5] flex items-center justify-center font-black italic text-sm uppercase tracking-wider"
        style={{ background: 'var(--color-border)', color: 'var(--color-muted)' }}
      >
        {previewImage
          ? <img src={previewImage} alt={product.name} className="w-full h-full object-cover" />
          : 'PHOTO'}
      </div>

      {/* Info */}
      <div className="p-5 flex justify-between items-center">
        <div>
          <h3 className="font-black text-lg leading-none">{product.name}</h3>
          <p className="text-xs mt-1 font-semibold text-muted">{product.tagline}</p>
        </div>
        <div className="text-right">
          {showTiers ? (
            <>
              <p className="font-black text-lg">{product.price.toLocaleString()}.-</p>
              <p className="text-[10px] font-bold text-muted uppercase tracking-tight">
                from {lowestPrice.toLocaleString()}.-
              </p>
            </>
          ) : (
            <p className="font-black text-lg">{product.price.toLocaleString()}.-</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Catalog({ onSelect }) {
  const { products } = useTheme()

  return (
    <div>
      <h2 className="text-3xl font-black italic uppercase leading-none mb-8">Collection</h2>
      <div className="grid grid-cols-1 gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} onSelect={onSelect} />
        ))}
      </div>
    </div>
  )
}
