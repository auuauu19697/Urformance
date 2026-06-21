import { useState, useEffect } from 'react'

// ─── Fabric Tech Section ──────────────────────────────────────────────────────
// Dark full-bleed section showcasing proprietary fabric technology features
// Desktop : photo (left, wide) with diagonal "/" slash | text & features (right, narrow)
// Mobile  : photo (top, full-width) with diagonal bottom slash | text & features (below)
const DEFAULT_FEATURES = [
  { id: '01', title: 'Moisture Control',    body: 'Wicks sweat away in seconds. Stay dry through every rep, sprint, and commute.' },
  { id: '02', title: '4-Way Stretch',       body: 'Full range of motion in every direction. Your movement defines the fabric — not the other way around.' },
  { id: '03', title: 'Thermal Regulation',  body: 'Adaptive comfort for every environment. Light enough for a run, structured enough for the street.' },
  { id: '04', title: 'Lasting Form',        body: 'Premium weave that holds its shape and softness across hundreds of washes. Built to outlast seasons.' },
]

export default function FabricTech({ landing }) {
  const data     = landing?.fabricTech
  const heading  = data?.heading  || "IP Fabric\nTechnology"
  const body     = data?.body     || "We own our fabric. Engineered from the ground up — not sourced, not borrowed."
  const image    = data?.image    || "/urformance/fabric.png"
  const features = data?.features || DEFAULT_FEATURES

  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    setIsMobile(mq.matches)
    const handler = (e) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // ─── Photo / placeholder ────────────────────────────────────────────────────
  const Photo = ({ style = {} }) => image ? (
    <img
      src={image}
      alt="Fabric Technology"
      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', ...style }}
    />
  ) : (
    <div style={{
      width: '100%', height: '100%',
      background: 'linear-gradient(160deg, var(--color-primary) 0%, #3d3530 55%, #1a1512 100%)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      gap: '0.75rem', position: 'relative', overflow: 'hidden',
      ...style,
    }}>
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,248,123,0.04) 0px, rgba(255,255,255,0.015) 1px, transparent 1px, transparent 36px)',
      }} />
      <span style={{ fontSize: '4rem', opacity: 0.1 }}>📸</span>
      <span style={{
        color: 'rgba(255,255,255,0.18)', fontWeight: 900,
        fontSize: '0.55rem', letterSpacing: '0.25em',
        textTransform: 'uppercase', zIndex: 1,
      }}>
        Photo Coming Soon
      </span>
    </div>
  )

  // ─── Text / features column ──────────────────────────────────────────────────
  const TextContent = () => (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      {/* IP badge */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
        background: 'var(--color-accent)', color: 'var(--color-accent-fg)',
        padding: '0.3rem 0.85rem', borderRadius: '2px',
        fontWeight: 900, fontStyle: 'italic',
        fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase',
        marginBottom: '1.5rem',
        alignSelf: 'flex-start',
      }}>
        ⚡ Proprietary IP
      </div>

      <h2 style={{
        fontWeight: 900, fontStyle: 'italic',
        fontSize: 'clamp(2.6rem, 5vw, 4.5rem)',
        textTransform: 'uppercase',
        letterSpacing: '-0.04em', lineHeight: 0.92,
        margin: 0,
        marginBottom: '1.5rem',
      }}>
        {heading.split('\n').map((line, idx, arr) => (
          <span key={idx}>
            {line}{idx < arr.length - 1 && <br />}
          </span>
        ))}
      </h2>

      <p style={{
        fontSize: '0.95rem', fontWeight: 600, lineHeight: 1.7,
        fontFamily: 'var(--font-secondary)',
        color: 'rgba(255,255,255,0.5)',
        maxWidth: '42ch',
        marginBottom: '3rem',
      }}>
        {body}
      </p>

      {/* Features list */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        gap: '2rem 1.5rem',
      }}>
        {features.map((feat, idx) => (
          <div key={feat.id || idx} style={{
            borderTop: '1px solid rgba(255,255,255,0.1)',
            paddingTop: '1.25rem',
            display: 'grid',
            gridTemplateColumns: 'auto 1fr',
            gap: '1.25rem',
          }}>
            {/* Number */}
            <span style={{
              fontWeight: 900, fontStyle: 'italic',
              fontSize: '0.65rem', letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--color-accent)',
              marginTop: '0.2rem',
            }}>
              {feat.id || String(idx + 1).padStart(2, '0')}
            </span>

            <div>
              {/* Title */}
              <h3 style={{
                fontWeight: 900,
                fontSize: '0.9rem', textTransform: 'uppercase',
                letterSpacing: '0.05em', lineHeight: 1.2,
                marginBottom: '0.5rem', color: '#fff',
              }}>
                {feat.title}
              </h3>

              {/* Body */}
              <p style={{
                fontSize: '0.83rem', fontWeight: 600, lineHeight: 1.65,
                fontFamily: 'var(--font-secondary)',
                color: 'rgba(255,255,255,0.45)',
                margin: 0,
              }}>
                {feat.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  // ─── Mobile layout ──────────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <section style={{
        background: 'var(--color-primary)',
        color: '#fff',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'relative',
          clipPath: 'polygon(0 0, 100% 0, 100% 90%, 0 100%)',
          marginBottom: '-2.5rem',
        }}>
          <Photo style={{ aspectRatio: '1 / 1', minHeight: '320px' }} />
        </div>
        <div style={{ padding: '5rem 1.75rem 4rem' }}>
          <TextContent />
        </div>
      </section>
    )
  }

  // ─── Desktop layout: wide photo left | narrow text right ───────────────────
  return (
    <section style={{
      background: 'var(--color-primary)',
      color: '#fff',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Subtle diagonal texture */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'repeating-linear-gradient(135deg, rgba(255,248,123,0.025) 0px, transparent 1px, transparent 48px)',
      }} />

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.2fr 1fr',
        minHeight: '90vh',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Left column: Photo with matching slanted "/" slash */}
        <div style={{
          position: 'relative',
          clipPath: 'polygon(0% 0%, 100% 0%, 80% 100%, 0% 100%)',
          marginRight: '-5rem',
          background: '#1d1916',
        }}>
          <Photo />
        </div>

        {/* Right column: TextContent */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          padding: '6rem 6rem 6rem 4rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
          <TextContent />
        </div>
      </div>
    </section>
  )
}
