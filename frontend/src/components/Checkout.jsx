import { useState, useRef } from 'react'
import { useCart } from '../context/CartContext'
import { useTheme } from '../context/ThemeContext'
import { submitOrder } from '../services/orderApi'

export default function Checkout({ onBack, onSuccess }) {
  const { cart, total } = useCart()
  const { paymentMethod, paymentNote } = useTheme()

  const promptPayNumber = import.meta.env.VITE_PROMPTPAY_NUMBER
  const dynamicQrUrl = `https://promptpay.io/${promptPayNumber}/${total}`

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [instagram, setInstagram] = useState('')
  const [addressLine1, setAddressLine1] = useState('')
  const [subdistrict, setSubdistrict] = useState('')
  const [district, setDistrict] = useState('')
  const [city, setCity] = useState('')
  const [province, setProvince] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [paymentDateTime, setPaymentDT] = useState('')
  const [note, setNote] = useState('')
  const [slip, setSlip] = useState(null)
  const [slipPreview, setSlipPreview] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const fileRef = useRef(null)

  function handleSlip(e) {
    const file = e.target.files[0]
    if (!file) return
    setSlip(file)
    const reader = new FileReader()
    reader.onload = (ev) => setSlipPreview(ev.target.result)
    reader.readAsDataURL(file)
  }

  async function handleSubmit() {
    setError('')
    if (!fullName.trim() || !email.trim() || !phone.trim() ||
      !addressLine1.trim() || !subdistrict.trim() || !district.trim() ||
      !city.trim() || !province.trim() || !postalCode.trim()) {
      setError('Please complete all required shipping information.')
      return
    }
    if (!paymentDateTime) { setError('Please provide the date and time of payment.'); return }
    if (!slip) { setError('Please upload your payment slip.'); return }

    setLoading(true)
    try {
      const result = await submitOrder({
        customer: {
          fullName: fullName.trim(), email: email.trim(), phone: phone.trim(),
          instagram: instagram.trim(), addressLine1: addressLine1.trim(),
          subdistrict: subdistrict.trim(), district: district.trim(),
          city: city.trim(), province: province.trim(), postalCode: postalCode.trim(),
        },
        items: cart.map((item) => ({
          sku: item.sku, model: item.model, color: item.color, size: item.size,
          qty: item.qty, unitPrice: item.unitPrice, screeningData: item.screeningData,
        })),
        paymentDateTime,
        slip,
        note: note.trim(),
      })
      onSuccess(result)
    } catch (err) {
      setError(err.message || 'Failed to submit order. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // ── Shared label class ────────────────────────────────────────────────────
  const labelCls = 'block text-xs font-black uppercase mb-1.5 ml-1 text-muted'

  return (
    <div>
      {/* Back */}
      <button id="checkout-back-btn"
        onClick={onBack}
        className="text-sm font-black mb-6 flex items-center uppercase tracking-widest text-muted"
      >
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeWidth="3" d="M15 19l-7-7 7-7" />
        </svg>
        Back to Cart
      </button>

      <h2 className="text-3xl font-black italic uppercase leading-none mb-8">Checkout</h2>

      {/* Contact */}
      <div className="space-y-4 mb-10">
        <h3 className="section-heading mt-2">
          Contact Information
        </h3>
        {[
          { id: 'input-full-name', label: 'Full Name *', value: fullName, set: setFullName, type: 'text' },
          { id: 'input-email', label: 'Email *', value: email, set: setEmail, type: 'email' },
          { id: 'input-phone', label: 'Phone Number *', value: phone, set: setPhone, type: 'tel' },
          { id: 'input-instagram', label: 'Instagram (optional)', value: instagram, set: setInstagram, type: 'text' },
        ].map(({ id, label, value, set, type }) => (
          <div key={label}>
            <label className={labelCls}>{label}</label>
            <input id={id} type={type} value={value} onChange={(e) => set(e.target.value)} className="input-field" />
          </div>
        ))}

        {/* Shipping Address */}
        <h3 className="section-heading mt-8">
          Shipping Address
        </h3>
        <div>
          <label className={labelCls}>Address Line 1 *</label>
          <textarea
            id="input-address"
            rows={2}
            value={addressLine1}
            onChange={(e) => setAddressLine1(e.target.value)}
            placeholder="House No., Building, Street..."
            className="input-field resize-none"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { id: 'input-subdistrict', label: 'Subdistrict *', value: subdistrict, set: setSubdistrict },
            { id: 'input-district', label: 'District *', value: district, set: setDistrict },
            { id: 'input-city', label: 'City *', value: city, set: setCity },
            { id: 'input-province', label: 'Province *', value: province, set: setProvince },
            { id: 'input-postal', label: 'Postal Code *', value: postalCode, set: setPostalCode },
          ].map(({ id, label, value, set }) => (
            <div key={label}>
              <label className={labelCls}>{label}</label>
              <input id={id} type="text" value={value} onChange={(e) => set(e.target.value)} className="input-field" />
            </div>
          ))}
        </div>
        <div>
          <label className={labelCls}>Note (optional)</label>
          <input
            id="input-note"
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Special requests, gift wrapping…"
            className="input-field"
          />
        </div>
      </div>

      {/* Payment */}
      <div className="space-y-4 mb-8">
        <h3 className="section-heading mt-2">
          Payment ({paymentMethod})
        </h3>

        {/* Payment Date & Time */}
        <div>
          <label className={labelCls}>Payment Date &amp; Time *</label>
          <input
            id="input-payment-datetime"
            type="datetime-local"
            value={paymentDateTime}
            onChange={(e) => setPaymentDT(e.target.value)}
            onKeyDown={(e) => e.preventDefault()}
            onClick={(e) => e.target.showPicker?.()}
            className="input-field"
          />
        </div>

        {/* QR Code — dynamic per brand */}
        <div className="card p-6 text-center">
          <p className="text-xs font-black uppercase mb-4 tracking-tighter text-muted">
            Scan to pay:{' '}
            <span className="font-black" style={{ color: 'var(--color-primary)' }}>
              {total.toLocaleString()} THB
            </span>
          </p>
          <img
            src={dynamicQrUrl}
            alt="Payment QR Code"
            className="w-48 h-48 object-contain mx-auto rounded-2xl"
          />
          {paymentNote && (
            <p className="text-sm font-semibold mt-3 text-muted">{paymentNote}</p>
          )}
        </div>

        {/* Slip upload */}
        <div>
          <label className={labelCls}>Upload Payment Slip</label>
          <label
            id="slip-upload-label"
            onClick={() => fileRef.current?.click()}
            className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-3xl cursor-pointer transition-all overflow-hidden"
            style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface)' }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--color-primary)')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--color-border)')}
          >
            {slipPreview ? (
              <img src={slipPreview} alt="slip preview" className="w-full h-full object-cover" />
            ) : (
              <div className="flex flex-col items-center justify-center gap-2 text-muted">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                <span className="text-xs font-bold uppercase tracking-wide">Tap to upload</span>
              </div>
            )}
          </label>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleSlip} />
        </div>
      </div>

      {/* Error */}
      {error && <p className="text-red-500 text-sm font-bold mb-4 text-center">{error}</p>}

      {/* Submit */}
      <button
        id="submit-order-btn"
        onClick={handleSubmit}
        disabled={loading}
        className="btn-primary w-full py-5 font-black text-lg shadow-2xl uppercase italic tracking-wider"
      >
        {loading ? 'Submitting…' : 'Submit Order'}
      </button>
    </div>
  )
}
