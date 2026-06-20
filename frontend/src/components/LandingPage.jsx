import { useTheme } from '../context/ThemeContext'

// ─── Instagram icon ───────────────────────────────────────────────────────────
function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  )
}

// ─── Color swatch dot ─────────────────────────────────────────────────────────
const COLOR_HEX = {
  Black: '#111', White: '#f0f0f0', Navy: '#1e2d4a',
  Olive: '#6b6b3a', Cream: '#f5f0e8', Green: '#4C6A4A',
}
function ColorDot({ color }) {
  return (
    <span
      title={color}
      style={{
        display: 'inline-block', width: '10px', height: '10px',
        borderRadius: '50%', background: COLOR_HEX[color] || '#ccc',
        border: (color === 'White' || color === 'Cream') ? '1.5px solid #ccc' : 'none',
        flexShrink: 0,
      }}
    />
  )
}

// ─── Section wrapper ──────────────────────────────────────────────────────────
function Section({ children, dark = false, style = {} }) {
  return (
    <section
      style={{
        background: dark ? '#0a0a0a' : 'var(--color-bg)',
        color: dark ? '#ffffff' : 'inherit',
        ...style,
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '5rem 2rem' }}>
        {children}
      </div>
    </section>
  )
}

// ─── Section eyebrow label ────────────────────────────────────────────────────
function Eyebrow({ children, light = false }) {
  return (
    <p style={{
      fontSize: '0.65rem', fontWeight: 900, letterSpacing: '0.25em',
      textTransform: 'uppercase', marginBottom: '1rem',
      color: light ? 'rgba(255,255,255,0.45)' : 'var(--color-muted)',
    }}>
      {children}
    </p>
  )
}

// ─── Product card ─────────────────────────────────────────────────────────────
function ProductCard({ product, index }) {
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
              <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--color-muted)', marginLeft: '0.25rem' }}>{product.colors.join(', ')}</span>
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

// ─── Main LandingPage ─────────────────────────────────────────────────────────
export default function LandingPage({ onWaitlistClick, onPreorderClick }) {
  const { brandName, icon, brandSlogan, closedText, features, products } = useTheme()
  const isImagePath = typeof icon === 'string' && (icon.startsWith('/') || icon.startsWith('http'))

  return (
    <div style={{ background: 'var(--color-bg)' }}>

      {/* ── 1. HERO ─────────────────────────────────────────────────────────── */}
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
            Apparel engineered for athletes who refuse to compromise. Every piece built to move with you, not against you.
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

      {/* ── 2. VISION ───────────────────────────────────────────────────────── */}
      <Section>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '4rem', alignItems: 'start' }}>
          {/* Left — big statement */}
          <div>
            <Eyebrow>Our Vision</Eyebrow>
            <h2 style={{
              fontWeight: 900, fontStyle: 'italic',
              fontSize: 'clamp(2rem, 5vw, 3.2rem)',
              textTransform: 'uppercase',
              letterSpacing: '-0.04em', lineHeight: 1,
              marginBottom: '1.5rem',
            }}>
              Form Follows<br />Function
            </h2>
            <p style={{
              fontSize: '1rem', fontWeight: 600, lineHeight: 1.7,
              color: 'var(--color-muted)', maxWidth: '40ch',
            }}>
              We started URFORMANCE because we couldn't find performance wear that actually performed — without sacrificing how it looked. So we built it ourselves.
            </p>
          </div>

          {/* Right — three pillars */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {[
              { num: '01', title: 'Built for Movement', body: 'Four-way stretch, moisture-wicking fabric engineered for full range of motion. No restrictions, no excuses.' },
              { num: '02', title: 'Minimal by Design', body: 'No logos, no noise. Clean lines that work as hard in the gym as they do on the street.' },
              { num: '03', title: 'Intentional Drops', body: 'We don\'t mass-produce. Each collection is limited, considered, and crafted to last beyond the season.' },
            ].map(({ num, title, body }) => (
              <div key={num} style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1.75rem', paddingBottom: '1.75rem' }}>
                <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                  <span style={{
                    fontWeight: 900, fontStyle: 'italic',
                    fontSize: '0.65rem', letterSpacing: '0.15em',
                    color: 'var(--color-muted)', paddingTop: '0.2rem',
                    flexShrink: 0,
                  }}>
                    {num}
                  </span>
                  <div>
                    <p style={{ fontWeight: 900, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.5rem' }}>
                      {title}
                    </p>
                    <p style={{ fontSize: '0.875rem', fontWeight: 600, lineHeight: 1.65, color: 'var(--color-muted)' }}>
                      {body}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── 3. COLLECTION ───────────────────────────────────────────────────── */}
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
              First drop launching soon. Join the waitlist to be notified before anyone else.
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

      {/* ── 4. JOIN US ──────────────────────────────────────────────────────── */}
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
              Be the First<br />to Know.
            </h2>
            <p style={{
              fontSize: '1rem', fontWeight: 600, lineHeight: 1.65,
              color: 'rgba(255,255,255,0.5)', marginBottom: '2.5rem',
            }}>
              Join our waitlist and get early access to drops, behind-the-scenes updates, and exclusive pre-order windows before we go public.
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

      {/* ── 5. FOOTER ───────────────────────────────────────────────────────── */}
      <footer style={{
        background: 'var(--color-primary)', borderTop: '1px solid rgba(252,252,252,0.08)',
        color: 'rgba(255,255,255,0.3)',
      }}>
        <div style={{
          maxWidth: '1100px', margin: '0 auto',
          padding: '2rem',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: '1rem',
        }}>
          <span style={{ fontWeight: 900, fontStyle: 'italic', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '-0.02em' }}>
            {brandName}
          </span>
          <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            © {new Date().getFullYear()} {brandName}. All rights reserved.
          </span>
          {closedText?.instagram && (
            <a
              href={closedText.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', gap: '0.4rem',
                color: 'rgba(255,255,255,0.3)', textDecoration: 'none',
                fontSize: '0.65rem', fontWeight: 900, letterSpacing: '0.1em',
                textTransform: 'uppercase', transition: 'color 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#fff'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.3)'}
            >
              <InstagramIcon />
              Instagram
            </a>
          )}
        </div>
      </footer>

    </div>
  )
}
