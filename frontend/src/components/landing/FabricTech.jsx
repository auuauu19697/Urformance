import { Eyebrow } from './shared'

// ─── Fabric Tech Section ──────────────────────────────────────────────────────
// Dark full-bleed section showcasing proprietary fabric technology features
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
  const features = data?.features || DEFAULT_FEATURES

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

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '6rem 2rem', position: 'relative', zIndex: 1 }}>

        {/* ── Top: header row ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '3rem',
          alignItems: 'end',
          marginBottom: '5rem',
        }}>
          {/* Left: heading */}
          <div>
            {/* IP badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: 'var(--color-accent)', color: 'var(--color-accent-fg)',
              padding: '0.3rem 0.85rem', borderRadius: '2px',
              fontWeight: 900, fontStyle: 'italic',
              fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase',
              marginBottom: '1.5rem',
            }}>
              ⚡ Proprietary IP
            </div>

            <h2 style={{
              fontWeight: 900, fontStyle: 'italic',
              fontSize: 'clamp(2.6rem, 5vw, 4.5rem)',
              textTransform: 'uppercase',
              letterSpacing: '-0.04em', lineHeight: 0.92,
              margin: 0,
            }}>
              {heading.split('\n').map((line, idx, arr) => (
                <span key={idx}>
                  {line}{idx < arr.length - 1 && <br />}
                </span>
              ))}
            </h2>
          </div>

          {/* Right: body text */}
          <p style={{
            fontSize: '1rem', fontWeight: 600, lineHeight: 1.75,
            fontFamily: 'var(--font-secondary)',
            color: 'rgba(255,255,255,0.5)',
            maxWidth: '42ch',
          }}>
            {body}
          </p>
        </div>

        {/* ── Divider ── */}
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', marginBottom: '4rem' }} />

        {/* ── Feature grid ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '0',
        }}>
          {features.map((feat, idx) => (
            <div key={feat.id || idx} style={{
              borderLeft: idx === 0 ? '1px solid rgba(255,255,255,0.1)' : 'none',
              borderRight: '1px solid rgba(255,255,255,0.1)',
              padding: '2.5rem 2rem',
              position: 'relative',
            }}>
              {/* Number */}
              <span style={{
                display: 'block',
                fontWeight: 900, fontStyle: 'italic',
                fontSize: '0.6rem', letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--color-accent)',
                marginBottom: '1.5rem',
              }}>
                {feat.id || String(idx + 1).padStart(2, '0')}
              </span>

              {/* Title */}
              <h3 style={{
                fontWeight: 900,
                fontSize: '0.9rem', textTransform: 'uppercase',
                letterSpacing: '0.05em', lineHeight: 1.2,
                marginBottom: '1rem', color: '#fff',
              }}>
                {feat.title}
              </h3>

              {/* Body */}
              <p style={{
                fontSize: '0.83rem', fontWeight: 600, lineHeight: 1.65,
                fontFamily: 'var(--font-secondary)',
                color: 'rgba(255,255,255,0.45)',
              }}>
                {feat.body}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
