export default function Hero({ brandName, icon, brandSlogan, landing, features, onWaitlistClick, onPreorderClick }) {
  const isImagePath = typeof icon === 'string' && (icon.startsWith('/') || icon.startsWith('http'))
  return (
    <section style={{
      minHeight: '92vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      background: 'var(--color-primary)',
      color: '#fff',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background texture — repeated diagonal lines */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,248,123,0.04) 0px, rgba(255,255,255,0.015) 1px, transparent 1px, transparent 40px)',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '6rem 2rem 4rem', position: 'relative', zIndex: 1 }}>
        {/* Pre-title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
          {isImagePath
            ? <img src={icon} alt={brandName} style={{ height: '2rem', objectFit: 'contain' }} />
            : <span style={{ fontSize: '1.5rem' }}>{icon}</span>
          }
          <span style={{
            fontSize: '0.6rem', fontWeight: 900, letterSpacing: '0.3em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)',
          }}>
            {brandSlogan}
          </span>
        </div>

        {/* Giant wordmark */}
        <h1 style={{
          fontWeight: 900, fontStyle: 'italic',
          fontSize: 'clamp(3.5rem, 14vw, 9rem)',
          textTransform: 'uppercase',
          letterSpacing: '-0.05em',
          lineHeight: 0.88,
          marginBottom: '2.5rem',
        }}>
          {brandName}
        </h1>

        {/* Tagline */}
        <p style={{
          fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
          fontWeight: 600,
          color: 'rgba(255,255,255,0.5)',
          maxWidth: '44ch',
          lineHeight: 1.65,
          marginBottom: '3rem',
        }}>
          {landing?.hero?.tagline || "Apparel engineered for athletes who refuse to compromise. Every piece built to move with you, not against you."}
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
          {features?.waitlist && (
            <button
              onClick={onWaitlistClick}
              style={{
                background: '#fff', color: '#000',
                border: 'none', borderRadius: '3px',
                padding: '0.9rem 2rem',
                fontWeight: 900, fontSize: '0.75rem',
                letterSpacing: '0.12em', textTransform: 'uppercase',
                cursor: 'pointer', transition: 'opacity 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              Join Waitlist →
            </button>
          )}
          {features?.ordering
            ? (
              <button
                onClick={onPreorderClick}
                style={{
                  background: 'transparent', color: '#fff',
                  border: '1.5px solid rgba(252,252,252,0.25)',
                  borderRadius: '3px', padding: '0.9rem 2rem',
                  fontWeight: 900, fontSize: '0.75rem',
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                  cursor: 'pointer', transition: 'border-color 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#fff'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'}
              >
                Pre-order Now
              </button>
            )
            : (
              <span style={{
                fontSize: '0.65rem', fontWeight: 900,
                letterSpacing: '0.15em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.25)',
              }}>
                Pre-order — Coming Soon
              </span>
            )
          }
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
        <span style={{ fontSize: '0.5rem', fontWeight: 900, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)' }}>Scroll</span>
        <div style={{ width: '1px', height: '2.5rem', background: 'linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)' }} />
      </div>
    </section>
  )
}
