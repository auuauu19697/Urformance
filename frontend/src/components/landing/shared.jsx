// ─── Shared UI Elements for Landing Page ──────────────────────────────────────

export function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  )
}

export const COLOR_HEX = {
  Black: '#111',
  White: '#f0f0f0',
  Navy: '#1e2d4a',
  Olive: '#6b6b3a',
  Cream: '#f5f0e8',
  Green: '#4C6A4A',
}

export function ColorDot({ color }) {
  return (
    <span
      title={color}
      style={{
        display: 'inline-block',
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        background: COLOR_HEX[color] || '#ccc',
        border: (color === 'White' || color === 'Cream') ? '1.5px solid #ccc' : 'none',
        flexShrink: 0,
      }}
    />
  )
}

export function Section({ children, dark = false, style = {} }) {
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

export function Eyebrow({ children, light = false }) {
  return (
    <p style={{
      fontSize: '0.65rem',
      fontWeight: 900,
      letterSpacing: '0.25em',
      textTransform: 'uppercase',
      marginBottom: '1rem',
      color: light ? 'rgba(255,255,255,0.45)' : 'var(--color-muted)',
    }}>
      {children}
    </p>
  )
}
