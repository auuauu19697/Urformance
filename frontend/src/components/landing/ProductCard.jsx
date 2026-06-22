import { ColorDot } from './shared'

export default function ProductCard({ product, index }) {
  const isEven = index % 2 === 0
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '3rem',
      alignItems: 'center',
      borderTop: '1px solid var(--color-border)',
      paddingTop: '3.5rem',
      paddingBottom: '3.5rem',
    }}>
      {/* Image — order flips on odd cards for visual rhythm */}
      <div style={{ order: isEven ? 0 : 1 }}>
        <div style={{
          aspectRatio: '4 / 5',
          background: 'linear-gradient(160deg, #141414 0%, #252525 60%, #0d0d0d 100%)',
          borderRadius: '4px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.75rem',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Subtle grid lines — athletic print feel */}
          {[...Array(6)].map((_, i) => (
            <div key={i} style={{
              position: 'absolute', left: 0, right: 0,
              height: '1px', background: 'rgba(255,255,255,0.04)',
              top: `${14 * (i + 1)}%`,
            }} />
          ))}
          <span style={{ fontSize: '3rem' }}>👕</span>
          <span style={{
            color: 'rgba(255,255,255,0.3)', fontWeight: 900,
            fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase',
          }}>
            Photo Coming Soon
          </span>
        </div>
      </div>

      {/* Text info */}
      <div style={{ order: isEven ? 1 : 0 }}>
        <p style={{
          fontSize: '0.6rem', fontWeight: 900, letterSpacing: '0.2em',
          textTransform: 'uppercase', color: 'var(--color-muted)', marginBottom: '0.75rem',
        }}>
          Collection / SS2026
        </p>
        <h3 style={{
          fontWeight: 900, fontStyle: 'italic',
          fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
          textTransform: 'uppercase', letterSpacing: '-0.03em',
          lineHeight: 1, marginBottom: '1rem',
        }}>
          {product.name}
        </h3>
        <p style={{
          fontSize: '1rem', fontWeight: 600, lineHeight: 1.65,
          fontFamily: 'var(--font-secondary)',
          color: 'var(--color-muted)', marginBottom: '1.5rem', maxWidth: '36ch',
        }}>
          {product.tagline}. Engineered for those who push every rep, every set, every km further than yesterday.
        </p>

        {/* Specs row */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '1.5rem', alignItems: 'center' }}>
          <div>
            <p style={{ fontSize: '0.55rem', fontWeight: 900, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-muted)', marginBottom: '0.4rem' }}>Colours</p>
            <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>
              {product.colors.map(c => <ColorDot key={c} color={c} />)}
              <span style={{ fontSize: '0.7rem', fontWeight: 700, fontFamily: 'var(--font-secondary)', color: 'var(--color-muted)', marginLeft: '0.25rem' }}>{product.colors.join(', ')}</span>
            </div>
          </div>
          <div>
            <p style={{ fontSize: '0.55rem', fontWeight: 900, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-muted)', marginBottom: '0.4rem' }}>From</p>
            <p style={{ fontWeight: 900, fontSize: '1.1rem' }}>฿{product.price.toLocaleString()}</p>
          </div>
        </div>

        <p style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
          fontSize: '0.7rem', fontWeight: 900, letterSpacing: '0.12em',
          textTransform: 'uppercase', color: 'var(--color-muted)',
          borderBottom: '1.5px solid var(--color-border)', paddingBottom: '2px',
        }}>
          Notify me when available →
        </p>
      </div>
    </div>
  )
}
