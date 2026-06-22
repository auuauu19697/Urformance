import { useState, useEffect } from 'react'
import { Eyebrow } from './shared'

// ─── Vision Section ───────────────────────────────────────────────────────────
// Desktop : text (left, narrow) | photo (right, wide) with diagonal "/" slash
// Mobile  : photo (top, full-width) with diagonal bottom slash | text (below)
export default function Vision({ landing }) {
  const image = landing?.vision?.image

  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    setIsMobile(mq.matches)
    const handler = (e) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const heading = landing?.vision?.heading || "Form Follows\nFunction"
  const body = landing?.vision?.body || "Built for athletes who refuse to compromise — performance and aesthetics, together."

  // ─── Photo / placeholder ────────────────────────────────────────────────────
  const Photo = ({ style = {} }) => image ? (
    <img
      src={image}
      alt="Brand vision"
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

  // ─── Text block (concise) ───────────────────────────────────────────────────
  const TextContent = ({ padStyle = {} }) => (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', ...padStyle }}>
      <Eyebrow>Our Vision</Eyebrow>
      <h2 style={{
        fontWeight: 900, fontStyle: 'italic',
        fontSize: 'clamp(2.6rem, 5vw, 4.5rem)',
        textTransform: 'uppercase',
        letterSpacing: '-0.04em', lineHeight: 0.92,
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
        color: 'var(--color-muted)', maxWidth: '28ch',
      }}>
        {body}
      </p>
    </div>
  )

  // ─── Mobile layout ──────────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <section style={{ background: 'var(--color-bg)', overflow: 'hidden' }}>
        <div style={{
          position: 'relative',
          background: 'var(--color-primary)',
          clipPath: 'polygon(0 0, 100% 0, 100% 90%, 0 100%)',
          marginBottom: '-2.5rem',
        }}>
          <Photo style={{ aspectRatio: '1 / 1', minHeight: '320px' }} />
        </div>
        <TextContent padStyle={{ padding: '5rem 1.75rem 4rem' }} />
      </section>
    )
  }

  // ─── Desktop layout: narrow text left | wide photo right ───────────────────
  return (
    <section style={{ background: 'var(--color-bg)', overflow: 'hidden' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 2fr',   /* photo gets 2× the text column */
        minHeight: '88vh',
      }}>
        <TextContent padStyle={{
          padding: '6rem 2rem 6rem 5rem',
        }} />

        {/* Photo with steeper "/" slash (20% angle) */}
        <div style={{
          position: 'relative',
          clipPath: 'polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%)',
          marginLeft: '-5rem',
          background: 'var(--color-primary)',
        }}>
          <Photo />
        </div>
      </div>
    </section>
  )
}
