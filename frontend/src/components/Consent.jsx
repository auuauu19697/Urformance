import { useTheme } from '../context/ThemeContext'

export default function Consent({ onAccept }) {
  const { brandName, icon, consentText } = useTheme()

  const isImagePath = typeof icon === 'string' && (icon.startsWith('/') || icon.startsWith('http'))

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5"
      style={{ background: 'var(--color-bg)' }}
    >
      <div className="max-w-sm w-full">

        {/* Icon / Logo */}
        <div className="flex justify-center mb-6">
          {isImagePath ? (
            <img src={icon} alt={brandName} className="h-16 w-auto object-contain" />
          ) : (
            <span className="text-5xl">{icon}</span>
          )}
        </div>

        {/* Brand */}
        <h1 className="font-black italic text-2xl uppercase tracking-tighter text-center mb-8">
          {brandName}
        </h1>

        {/* Card */}
        <div className="card p-8 shadow-sm mb-6">
          <h2 className="text-xl font-black italic uppercase leading-tight mb-4">
            {consentText.title}
          </h2>
          <p className="text-sm font-medium leading-relaxed text-muted">
            {consentText.body}
          </p>
        </div>

        {/* CTA */}
        <button
          id="consent-accept-btn"
          onClick={onAccept}
          className="btn-primary w-full py-5 font-black text-base shadow-2xl uppercase italic tracking-wider"
        >
          {consentText.cta}
        </button>

        <p className="text-center text-[10px] font-bold uppercase tracking-widest mt-6 text-muted">
          Tap to continue and start shopping
        </p>
      </div>
    </div>
  )
}
