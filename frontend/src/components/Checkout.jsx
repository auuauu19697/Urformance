import { useState, useRef } from 'react'
import { useCart } from '../context/CartContext'
import { submitOrder } from '../services/orderApi'

export default function Checkout({ onBack, onSuccess }) {
  const { cart, total } = useCart()

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
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

    if (!name.trim() || !phone.trim() || !address.trim()) {
      setError('Please complete all shipping information.')
      return
    }
    if (!slip) {
      setError('Please upload your payment slip.')
      return
    }

    setLoading(true)
    try {
      const result = await submitOrder({
        customer: { name: name.trim(), phone: phone.trim(), address: address.trim() },
        items: cart.map((item) => ({
          sku: item.sku,
          model: item.model,
          color: item.color,
          size: item.size,
          qty: item.qty,
          unitPrice: item.unitPrice,
        })),
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
          Shipping Information
        </h3>

        {[
          { label: 'Full Name', value: name, set: setName, type: 'text' },
          { label: 'Phone Number', value: phone, set: setPhone, type: 'tel' },
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

        <div>
          <label className="block text-[10px] font-black uppercase text-slate-500 mb-1 ml-1">Full Address</label>
          <textarea
            rows={3}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-black outline-none transition bg-white resize-none"
          />
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
