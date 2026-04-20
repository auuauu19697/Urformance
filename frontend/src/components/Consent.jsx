import { CONSENT_TEXT } from '../config'

export default function Consent({ onAccept }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-5">
      <div className="max-w-sm w-full">

        {/* Icon */}
        <div className="text-5xl text-center mb-6">📦</div>

        {/* Brand */}
        <h1 className="font-black italic text-2xl uppercase tracking-tighter text-center mb-8">
          URFORMANCE
        </h1>

        {/* Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm mb-6">
          <h2 className="text-xl font-black italic uppercase leading-tight mb-4">
            {CONSENT_TEXT.title}
          </h2>
          <p className="text-sm text-slate-500 font-medium leading-relaxed">
            {CONSENT_TEXT.body}
          </p>
        </div>

        {/* CTA */}
        <button
          onClick={onAccept}
          className="w-full bg-black text-white py-5 rounded-3xl font-black text-base shadow-2xl uppercase italic tracking-wider active:scale-95 transition-transform"
        >
          {CONSENT_TEXT.cta}
        </button>

        <p className="text-center text-[10px] font-bold text-slate-300 uppercase tracking-widest mt-6">
          Tap to continue and start shopping
        </p>
      </div>
    </div>
  )
}
