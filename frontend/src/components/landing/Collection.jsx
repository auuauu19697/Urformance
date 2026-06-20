import { Eyebrow } from './shared'
import ProductCard from './ProductCard'

export default function Collection({ landing, products }) {
  return (
    <section style={{ background: 'var(--color-surface)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '5rem 2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', marginBottom: '0.5rem' }}>
          <div>
            <Eyebrow>The Collection</Eyebrow>
            <h2 style={{
              fontWeight: 900, fontStyle: 'italic',
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              textTransform: 'uppercase', letterSpacing: '-0.04em',
              lineHeight: 1,
            }}>
              SS2026
            </h2>
          </div>
          <p style={{
            fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-muted)',
            maxWidth: '30ch', lineHeight: 1.6, textAlign: 'right',
          }}>
            {landing?.collection?.description || "First drop launching soon. Join the waitlist to be notified before anyone else."}
          </p>
        </div>

        {products && products.length > 0 ? (
          products.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)
        ) : (
          <p style={{ textAlign: 'center', color: 'var(--color-muted)', fontWeight: 700, paddingTop: '3rem' }}>
            Products coming soon.
          </p>
        )}
      </div>
    </section>
  )
}
