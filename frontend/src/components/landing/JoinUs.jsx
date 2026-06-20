import { Eyebrow, InstagramIcon } from './shared'

export default function JoinUs({ landing, features, closedText, onWaitlistClick }) {
  return (
    <section style={{
      background: 'var(--color-primary)', color: 'var(--color-primary-fg)',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'repeating-linear-gradient(135deg, rgba(255,248,123,0.03) 0px, rgba(255,255,255,0.012) 1px, transparent 1px, transparent 50px)',
      }} />
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '6rem 2rem', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '56ch' }}>
          <Eyebrow light>Don't Miss Out</Eyebrow>
          <h2 style={{
            fontWeight: 900, fontStyle: 'italic',
            fontSize: 'clamp(2.2rem, 6vw, 4rem)',
            textTransform: 'uppercase', letterSpacing: '-0.04em',
            lineHeight: 0.95, marginBottom: '1.25rem',
          }}>
            {(landing?.joinUs?.heading || "Be the First\nto Know.").split('\n').map((line, idx) => (
              <span key={idx}>
                {line}
                {idx < (landing?.joinUs?.heading || "Be the First\nto Know.").split('\n').length - 1 && <br />}
              </span>
            ))}
          </h2>
          <p style={{
            fontSize: '1rem', fontWeight: 600, lineHeight: 1.65,
            color: 'rgba(255,255,255,0.5)', marginBottom: '2.5rem',
          }}>
            {landing?.joinUs?.body || "Join our waitlist and get early access to drops, behind-the-scenes updates, and exclusive pre-order windows before we go public."}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
            {features?.waitlist && (
              <button
                onClick={onWaitlistClick}
                style={{
                  background: 'var(--color-accent)', color: 'var(--color-accent-fg)',
                  border: 'none', borderRadius: 'var(--radius-button)',
                  padding: '1rem 2.5rem',
                  fontWeight: 900, fontSize: '0.8rem',
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                  cursor: 'pointer', transition: 'opacity 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                Join the Waitlist →
              </button>
            )}
            {closedText?.instagram && (
              <a
                href={closedText.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                  color: 'rgba(255,255,255,0.5)',
                  fontWeight: 900, fontSize: '0.75rem',
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                  textDecoration: 'none', transition: 'color 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
              >
                <InstagramIcon />
                {closedText.instagram}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
