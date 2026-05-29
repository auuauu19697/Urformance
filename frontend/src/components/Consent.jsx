import { useState, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'

// ─── Countdown Hook ───────────────────────────────────────────────────────────
function useCountdown(isoDeadline) {
  function getRemaining() {
    if (!isoDeadline) return null
    const diff = new Date(isoDeadline) - new Date()
    if (diff <= 0) return null
    const totalSec = Math.floor(diff / 1000)
    return {
      days: Math.floor(totalSec / 86400),
      hours: Math.floor((totalSec % 86400) / 3600),
      minutes: Math.floor((totalSec % 3600) / 60),
      seconds: totalSec % 60,
    }
  }

  const [remaining, setRemaining] = useState(getRemaining)

  useEffect(() => {
    if (!isoDeadline) return
    const id = setInterval(() => setRemaining(getRemaining()), 1000)
    return () => clearInterval(id)
  }, [isoDeadline])

  return remaining
}

// ─── Countdown Display ────────────────────────────────────────────────────────
function CountdownTimer({ deadline }) {
  const r = useCountdown(deadline)
  if (!r) return null   // null means expired or no deadline set

  return (
    <div
      className="mt-5 pt-5 border-t flex flex-col items-center gap-2"
      style={{ borderColor: 'var(--color-border)' }}
    >
      <p className="text-[10px] font-black uppercase tracking-widest text-muted">
        ⏳ Order closes in
      </p>
      <div className="flex items-end gap-3">
        {[
          { value: r.days,    label: 'd' },
          { value: r.hours,   label: 'h' },
          { value: r.minutes, label: 'm' },
          { value: r.seconds, label: 's' },
        ].map(({ value, label }) => (
          <div key={label} className="flex flex-col items-center leading-none">
            <span
              className="text-2xl font-black tabular-nums"
              style={{ color: 'var(--color-primary)' }}
            >
              {String(value).padStart(2, '0')}
            </span>
            <span className="text-[9px] font-bold uppercase tracking-widest text-muted mt-0.5">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Consent Screen ───────────────────────────────────────────────────────────
export default function Consent({ onAccept }) {
  const { brandName, icon, consentText, preorderDeadline } = useTheme()

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
          <p className="text-base font-medium leading-relaxed text-muted">
            {consentText.body}
          </p>

          {/* Countdown — only shown when a deadline is configured and still in the future */}
          <CountdownTimer deadline={preorderDeadline} />
        </div>

        {/* CTA */}
        <button
          id="consent-accept-btn"
          onClick={onAccept}
          className="btn-primary w-full py-5 font-black text-base shadow-2xl uppercase italic tracking-wider"
        >
          {consentText.cta}
        </button>

        <p className="text-center text-xs font-bold uppercase tracking-widest mt-6 text-muted">
          Tap to continue and start shopping
        </p>
      </div>
    </div>
  )
}
