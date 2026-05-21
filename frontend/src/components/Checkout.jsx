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
  const [shippingName, setShippingName] = useState('')
  const [shippingPhone, setShippingPhone] = useState('')
  const [sameAsContact, setSameAsContact] = useState(false)
  const [addressLine1, setAddressLine1] = useState('')
  const [subdistrict, setSubdistrict] = useState('')
  const [district, setDistrict] = useState('')
  const [province, setProvince] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [note, setNote] = useState('')
  const [slip, setSlip] = useState(null)
  const [slipPreview, setSlipPreview] = useState(null)
  const [confirmed, setConfirmed] = useState(false)
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
    const finalShippingName = sameAsContact ? fullName : shippingName
    const finalShippingPhone = sameAsContact ? phone : shippingPhone
    if (!fullName.trim() || !email.trim() || !phone.trim() || !instagram.trim() ||
      !finalShippingName.trim() || !finalShippingPhone.trim() ||
      !addressLine1.trim() || !subdistrict.trim() || !district.trim() ||
      !province.trim() || !postalCode.trim()) {
      setError('กรุณากรอกข้อมูลให้ครบถ้วน')
      return
    }
    if (!slip) { setError('กรุณาอัปโหลดสลิปการชำระเงิน'); return }

    setLoading(true)
    try {
      const result = await submitOrder({
        customer: {
          fullName: fullName.trim(), email: email.trim(), phone: phone.trim(),
          instagram: instagram.trim(),
          shippingName: finalShippingName.trim(),
          shippingPhone: finalShippingPhone.trim(),
          addressLine1: addressLine1.trim(),
          subdistrict: subdistrict.trim(), district: district.trim(),
          province: province.trim(), postalCode: postalCode.trim(),
        },
        items: cart.map((item) => ({
          sku: item.sku, model: item.model, color: item.color, size: item.size,
          qty: item.qty, unitPrice: item.unitPrice, screeningData: item.screeningData,
        })),
        slip,
        note: note.trim(),
      })
      onSuccess(result)
    } catch (err) {
      setError(err.message || 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง')
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
          { id: 'input-full-name', label: 'ชื่อ-นามสกุล *', value: fullName, set: setFullName, type: 'text' },
          { id: 'input-email', label: 'อีเมล *', value: email, set: setEmail, type: 'email' },
          { id: 'input-phone', label: 'เบอร์โทรศัพท์ *', value: phone, set: setPhone, type: 'tel' },
          { id: 'input-instagram', label: 'Instagram *', value: instagram, set: setInstagram, type: 'text' },
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

        {/* Same as contact checkbox */}
        <label
          id="same-as-contact-label"
          className="flex items-center gap-2.5 cursor-pointer select-none group"
          style={{ marginBottom: '0.25rem' }}
        >
          <span
            className="inline-flex items-center justify-center w-5 h-5 rounded-md border-2 transition-all shrink-0"
            style={{
              borderColor: sameAsContact ? 'var(--color-primary)' : 'var(--color-border)',
              background: sameAsContact ? 'var(--color-primary)' : 'transparent',
            }}
          >
            {sameAsContact && (
              <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </span>
          <input
            id="same-as-contact-checkbox"
            type="checkbox"
            checked={sameAsContact}
            onChange={(e) => {
              const checked = e.target.checked
              setSameAsContact(checked)
              if (checked) {
                setShippingName(fullName)
                setShippingPhone(phone)
              }
            }}
            className="hidden"
          />
          <span className="text-xs font-black uppercase tracking-wide text-muted group-hover:opacity-80 transition-opacity">
            ใช้ชื่อและเบอร์เดียวกับผู้สั่ง
          </span>
        </label>

        {/* Shipping Name & Phone */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>ชื่อผู้รับ *</label>
            <input
              id="input-shipping-name"
              type="text"
              value={sameAsContact ? fullName : shippingName}
              onChange={(e) => setShippingName(e.target.value)}
              disabled={sameAsContact}
              className="input-field"
              style={sameAsContact ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
            />
          </div>
          <div>
            <label className={labelCls}>เบอร์โทรผู้รับ *</label>
            <input
              id="input-shipping-phone"
              type="tel"
              value={sameAsContact ? phone : shippingPhone}
              onChange={(e) => setShippingPhone(e.target.value)}
              disabled={sameAsContact}
              className="input-field"
              style={sameAsContact ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
            />
          </div>
        </div>

        <div>
          <label className={labelCls}>ที่อยู่ *</label>
          <textarea
            id="input-address"
            rows={2}
            value={addressLine1}
            onChange={(e) => setAddressLine1(e.target.value)}
            placeholder="บ้านเลขที่ อาคาร ถนน..."
            className="input-field resize-none"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { id: 'input-subdistrict', label: 'ตำบล / แขวง *', value: subdistrict, set: setSubdistrict },
            { id: 'input-district', label: 'อำเภอ / เขต *', value: district, set: setDistrict },
            { id: 'input-province', label: 'จังหวัด *', value: province, set: setProvince },
            { id: 'input-postal', label: 'รหัสไปรษณีย์ *', value: postalCode, set: setPostalCode },
          ].map(({ id, label, value, set }) => (
            <div key={label}>
              <label className={labelCls}>{label}</label>
              <input id={id} type="text" value={value} onChange={(e) => set(e.target.value)} className="input-field" />
            </div>
          ))}
        </div>
        <div>
          <label className={labelCls}>หมายเหตุ (ถ้ามี)</label>
          <input
            id="input-note"
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="คำขอพิเศษ หรือข้อมูลเพิ่มเติม…"
            className="input-field"
          />
        </div>
      </div>

      {/* Payment */}
      <div className="space-y-4 mb-8">
        <h3 className="section-heading mt-2">
          Payment ({paymentMethod})
        </h3>

        {/* QR Code — dynamic per brand */}
        <div className="card p-6 text-center">
          <p className="text-xs font-black uppercase mb-4 tracking-tighter text-muted">
            สแกนจ่าย:{' '}
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
          <label className={labelCls}>Upload Payment Slip *</label>
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

      {/* Confirmation checkbox */}
      <label
        id="confirm-order-label"
        className="flex items-start gap-3 cursor-pointer select-none group mb-4"
      >
        <span
          className="inline-flex items-center justify-center w-5 h-5 rounded-md border-2 transition-all shrink-0 mt-0.5"
          style={{
            borderColor: confirmed ? 'var(--color-primary)' : 'var(--color-border)',
            background: confirmed ? 'var(--color-primary)' : 'transparent',
          }}
        >
          {confirmed && (
            <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </span>
        <input
          id="confirm-order-checkbox"
          type="checkbox"
          checked={confirmed}
          onChange={(e) => setConfirmed(e.target.checked)}
          className="hidden"
        />
        <span className="text-xs leading-relaxed text-muted group-hover:opacity-80 transition-opacity">
          <span className="block font-bold" style={{ color: 'var(--color-muted)' }}>
            กรุณาตรวจสอบรายละเอียดให้ครบถ้วน หลังส่งออเดอร์แล้วจะไม่สามารถแก้ไขได้ทุกกรณี
          </span>
          <span className="block mt-0.5">
            Please double-check your information. Once your order is placed, it cannot be edited under any circumstances.
          </span>
        </span>
      </label>

      {/* Error */}
      {error && <p className="text-red-500 text-sm font-bold mb-4 text-center">{error}</p>}

      {/* Submit */}
      <button
        id="submit-order-btn"
        onClick={handleSubmit}
        disabled={loading || !confirmed}
        className="btn-primary w-full py-5 font-black text-lg shadow-2xl uppercase italic tracking-wider"
      >
        {loading ? 'Submitting…' : 'Submit Order'}
      </button>
    </div>
  )
}
