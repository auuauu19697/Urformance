import { PRODUCTS } from '../config'

function ProductCard({ product, onSelect }) {
  return (
    <div
      className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 active:scale-[0.98] transition-transform cursor-pointer"
      onClick={() => onSelect(product)}
    >
      {/* Image */}
      <div className="bg-slate-100 aspect-[4/5] flex items-center justify-center text-slate-300 font-black italic text-sm uppercase tracking-wider">
        {product.image
          ? <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          : 'PHOTO'}
      </div>

      {/* Info */}
      <div className="p-5 flex justify-between items-center">
        <div>
          <h3 className="font-black text-lg leading-none">{product.name}</h3>
          <p className="text-slate-400 text-xs mt-1 font-semibold">{product.tagline}</p>
        </div>
        <p className="font-black text-lg">{product.price.toLocaleString()}.-</p>
      </div>
    </div>
  )
}

export default function Catalog({ onSelect }) {
  return (
    <div>
      <h2 className="text-3xl font-black italic uppercase leading-none mb-8">Collection</h2>
      <div className="grid grid-cols-2 gap-4">
        {PRODUCTS.map((p) => (
          <ProductCard key={p.id} product={p} onSelect={onSelect} />
        ))}
      </div>
    </div>
  )
}
