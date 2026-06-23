import { useState } from 'react'
import { submitWaitlist } from '../services/waitlistApi'
import { useTheme } from '../context/ThemeContext'

export default function WaitlistForm({ onSuccess }) {
  const { waitlistText } = useTheme()
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    email: '',
    phone: '',
    instagram: '',
    note: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [consentGiven, setConsentGiven] = useState(false)

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!consentGiven) {
      setError('You must consent to data usage to join the waitlist.')
      return
    }
    setIsSubmitting(true)
    setError(null)

    // Age must be a number
    const payload = {
      ...formData,
      age: formData.age ? parseInt(formData.age, 10) : null,
      consentGiven
    }

    try {
      await submitWaitlist(payload)
      if (waitlistText?.lineOaUrl) {
        window.location.href = waitlistText.lineOaUrl
      } else {
        onSuccess()
      }
    } catch (err) {
      // Clean up class-validator nested errors for display if needed
      let msg = err.message
      if (Array.isArray(err.message)) {
         msg = err.message.join(', ')
      }
      setError(msg)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="pt-2">
      <div className="mb-6">
        <h2 className="text-3xl font-black italic uppercase leading-none">
          {waitlistText?.heading || 'Join Waitlist'}
        </h2>
        <p className="text-muted font-bold text-sm mt-2 font-secondary">
          {waitlistText?.body || 'Sign up to be notified for the next collection.'}
        </p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded-xl text-sm font-bold mb-6 border border-red-100 font-secondary">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1">
          <label className="step-label">Full Name *</label>
          <input
            name="fullName"
            required
            value={formData.fullName}
            onChange={handleChange}
            className="input-field font-bold"
            placeholder="John Doe"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="step-label">Age *</label>
            <input
              name="age"
              type="number"
              min="1"
              max="150"
              required
              value={formData.age}
              onChange={handleChange}
              className="input-field font-bold"
              placeholder="25"
            />
          </div>
          
          <div className="space-y-1">
            <label className="step-label">Phone *</label>
            <input
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="input-field font-bold"
              placeholder="0812345678"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="step-label">Email *</label>
          <input
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="input-field font-bold"
            placeholder="john@example.com"
          />
        </div>

        <div className="space-y-1">
          <label className="step-label">Instagram *</label>
          <input
            name="instagram"
            required
            value={formData.instagram}
            onChange={handleChange}
            className="input-field font-bold"
            placeholder="@johndoe"
          />
        </div>

        <div className="space-y-1">
          <label className="step-label">Note (Optional)</label>
          <textarea
            name="note"
            rows="3"
            value={formData.note}
            onChange={handleChange}
            className="input-field font-bold resize-none"
            placeholder="Anything you'd like to tell us?"
          />
        </div>

        <div className="pt-2">
          <label className="flex items-start gap-3 cursor-pointer group select-none">
            <span
              className="w-5 h-5 border-2 rounded flex items-center justify-center transition-colors mt-0.5 flex-shrink-0"
              style={{
                borderColor: consentGiven ? 'var(--color-primary)' : 'var(--color-border)',
                background: consentGiven ? 'var(--color-primary)' : 'transparent',
              }}
            >
              {consentGiven && (
                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </span>
            <input
              name="consentGiven"
              type="checkbox"
              checked={consentGiven}
              onChange={(e) => setConsentGiven(e.target.checked)}
              className="hidden"
            />
            <span className="text-xs leading-relaxed text-muted group-hover:opacity-80 transition-opacity font-secondary">
              {waitlistText?.consentText || "I agree to store and use my personal data for notifications."}
            </span>
          </label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !consentGiven}
          className="btn-primary w-full py-5 font-black text-lg shadow-2xl uppercase italic tracking-wider disabled:opacity-50 mt-4"
        >
          {isSubmitting ? 'Submitting...' : (waitlistText?.heading || 'Join Waitlist')}
        </button>
      </form>
    </div>
  )
}
