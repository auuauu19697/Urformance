import { InstagramIcon } from './shared'

export default function Footer({ brandName, closedText }) {
  return (
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
  )
}
