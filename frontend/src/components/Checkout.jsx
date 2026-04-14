import { useState, useRef } from 'react'
import { useCart } from '../context/CartContext'
import { submitOrder } from '../services/orderApi'

export default function Checkout({ onBack, onSuccess }) {
  const { cart, total } = useCart()

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

  const [paymentDateTime, setPaymentDateTime] = useState('')
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

    if (!fullName.trim() || !email.trim() || !phone.trim() || !addressLine1.trim() || !subdistrict.trim() || !district.trim() || !city.trim() || !province.trim() || !postalCode.trim()) {
      setError('Please complete all required shipping information.')
      return
    }
    if (!paymentDateTime) {
      setError('Please provide the date and time of payment.')
      return
    }
    if (!slip) {
      setError('Please upload your payment slip.')
      return
    }

    setLoading(true)
    try {
      const result = await submitOrder({
        customer: {
          fullName: fullName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          instagram: instagram.trim(),
          addressLine1: addressLine1.trim(),
          subdistrict: subdistrict.trim(),
          district: district.trim(),
          city: city.trim(),
          province: province.trim(),
          postalCode: postalCode.trim(),
        },
        items: cart.map((item) => ({
          sku: item.sku,
          model: item.model,
          color: item.color,
          size: item.size,
          qty: item.qty,
          unitPrice: item.unitPrice,
          screeningData: item.screeningData,
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

  return (
    <div>
      {/* Back */}
      <button
        onClick={onBack}
        className="text-xs font-black text-slate-400 mb-6 flex items-center uppercase tracking-widest"
      >
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeWidth="3" d="M15 19l-7-7 7-7" />
        </svg>
        Back to Cart
      </button>

      <h2 className="text-3xl font-black italic uppercase leading-none mb-8">Checkout</h2>

      {/* Shipping Info */}
      <div className="space-y-4 mb-10">
        <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest border-b pb-2">
          Contact Information
        </h3>

        {[
          { label: 'Full Name *', value: fullName, set: setFullName, type: 'text' },
          { label: 'Email *', value: email, set: setEmail, type: 'email' },
          { label: 'Phone Number *', value: phone, set: setPhone, type: 'tel' },
          { label: 'Instagram (optional)', value: instagram, set: setInstagram, type: 'text' },
        ].map(({ label, value, set, type }) => (
          <div key={label}>
            <label className="block text-[10px] font-black uppercase text-slate-500 mb-1 ml-1">{label}</label>
            <input
              type={type}
              value={value}
              onChange={(e) => set(e.target.value)}
              className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-black outline-none transition bg-white"
            />
          </div>
        ))}

        <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest border-b pb-2 mt-6">
          Shipping Address
        </h3>

        <div>
          <label className="block text-[10px] font-black uppercase text-slate-500 mb-1 ml-1">Address Line 1 *</label>
          <textarea
            rows={2}
            value={addressLine1}
            onChange={(e) => setAddressLine1(e.target.value)}
            placeholder="House No., Building, Street..."
            className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-black outline-none transition bg-white resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[
            { label: 'Subdistrict *', value: subdistrict, set: setSubdistrict },
            { label: 'District *', value: district, set: setDistrict },
            { label: 'City *', value: city, set: setCity },
            { label: 'Province *', value: province, set: setProvince },
            { label: 'Postal Code *', value: postalCode, set: setPostalCode },
          ].map(({ label, value, set }) => (
            <div key={label}>
              <label className="block text-[10px] font-black uppercase text-slate-500 mb-1 ml-1">{label}</label>
              <input
                type="text"
                value={value}
                onChange={(e) => set(e.target.value)}
                className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-black outline-none transition bg-white"
              />
            </div>
          ))}
        </div>

        <div>
          <label className="block text-[10px] font-black uppercase text-slate-500 mb-1 ml-1">Note (optional)</label>
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Special requests, gift wrapping…"
            className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-black outline-none transition bg-white"
          />
        </div>
      </div>

      {/* Payment */}
      <div className="space-y-4 mb-8">
        <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest border-b pb-2">
          Payment (QR PromptPay)
        </h3>

        {/* Payment Date Time */}
        <div>
          <label className="block text-[10px] font-black uppercase text-slate-500 mb-1 ml-1">
            Payment Date & Time *
          </label>
          <input
            type="datetime-local"
            value={paymentDateTime}
            onChange={(e) => setPaymentDateTime(e.target.value)}
            className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-black outline-none transition bg-white"
          />
        </div>

        {/* QR placeholder */}
        <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 text-center">
          <p className="text-[10px] font-black text-slate-400 uppercase mb-4 tracking-tighter">
            Scan to pay:{' '}
            <span className="text-black">{total.toLocaleString()} THB</span>
          </p>
          <div className="w-48 h-48 bg-slate-100 mx-auto rounded-2xl flex items-center justify-center font-bold text-slate-300 text-sm">
            QR CODE HERE
          </div>
        </div>

        {/* Slip upload */}
        <div>
          <label className="block text-[10px] font-black uppercase text-slate-500 mb-1 ml-1">
            Upload Payment Slip
          </label>
          <label
            onClick={() => fileRef.current?.click()}
            className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-slate-300 rounded-3xl bg-white cursor-pointer hover:border-black transition-all overflow-hidden"
          >
            {slipPreview ? (
              <img src={slipPreview} alt="slip preview" className="w-full h-full object-cover" />
            ) : (
              <div className="flex flex-col items-center justify-center gap-2 text-slate-400">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                <span className="text-xs font-bold uppercase tracking-wide">Tap to upload</span>
              </div>
            )}
          </label>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleSlip}
          />
        </div>
      </div>

      {/* Error */}
      {error && (
        <p className="text-red-500 text-sm font-bold mb-4 text-center">{error}</p>
      )}

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-black text-white py-5 rounded-3xl font-black text-lg shadow-2xl disabled:bg-slate-400 uppercase italic tracking-wider transition active:scale-95"
      >
        {loading ? 'Submitting…' : 'Submit Order'}
      </button>
    </div>
  )
}
