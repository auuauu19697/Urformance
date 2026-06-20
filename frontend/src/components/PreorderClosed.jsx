import { useTheme } from '../context/ThemeContext'

// ─── Instagram Icon ───────────────────────────────────────────────────────────
function InstagramIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  )
}

// ─── Pre-order Closed Screen ──────────────────────────────────────────────────
export default function PreorderClosed() {
  const { brandName, icon, closedText } = useTheme()

  const isImagePath = typeof icon === 'string' && (icon.startsWith('/') || icon.startsWith('http'))

  // Split newlines in body text into paragraphs
  const bodyParagraphs = (closedText?.body ?? '').split('\n').filter(Boolean)

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-5"
      style={{ background: 'var(--color-bg)' }}
    >
      <div className="max-w-sm w-full text-center">

        {/* Brand Icon / Logo */}
        <div className="flex justify-center mb-6">
          {isImagePath ? (
            <img src={icon} alt={brandName} className="h-24 w-auto object-contain" />
          ) : (
            <span className="text-7xl">{icon}</span>
          )}
        </div>

        {/* Brand Name */}
        <h1 className="font-black italic text-2xl uppercase tracking-tighter mb-2">
          {brandName}
        </h1>

        {/* Closed Badge */}
        <div className="flex justify-center mb-8">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest"
            style={{
              background: 'var(--color-border)',
              color: 'var(--color-muted)',
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: 'var(--color-muted)' }}
            />
            Order Closed
          </span>
        </div>

        {/* Card */}
        <div className="card p-8 shadow-sm mb-6 text-left">
          <h2
            className="text-xl font-black italic uppercase leading-tight mb-4"
            style={{
              fontSize: 'var(--section-h-size, 1.25rem)',
              fontWeight: 'var(--section-h-weight, 900)',
              textTransform: 'var(--section-h-transform, uppercase)',
              letterSpacing: 'var(--section-h-tracking, -0.02em)',
              color: 'var(--section-h-color, inherit)',
            }}
          >
            {closedText?.heading ?? 'Pre-order Has Closed'}
          </h2>

          <div className="space-y-3">
            {bodyParagraphs.map((para, i) => (
              <p key={i} className="text-base font-medium leading-relaxed text-muted font-secondary">
                {para}
              </p>
            ))}
          </div>
        </div>

        {/* Instagram CTA */}
        {closedText?.instagram && (
          <a
            id="closed-instagram-btn"
            href={closedText.instagramUrl ?? `https://www.instagram.com/${closedText.instagram.replace('@', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full py-5 font-black text-base shadow-2xl uppercase italic tracking-wider flex items-center justify-center gap-3"
          >
            <InstagramIcon className="w-5 h-5 shrink-0" />
            Follow {closedText.instagram}
          </a>
        )}

        <p className="text-center text-xs font-bold uppercase tracking-widest mt-6 text-muted font-secondary">
          Stay tuned for the next collection
        </p>

      </div>
    </div>
  )
}
