import { useState } from 'react'
import { CartProvider, useCart } from './context/CartContext'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import Catalog from './components/Catalog'
import Configure from './components/Configure'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import Success from './components/Success'
import Consent from './components/Consent'

// ─── Steps ──────────────────────────────────────────────────────────────────
const STEP = {
  CONSENT: 'consent',
  CATALOG: 'catalog',
  CONFIGURE: 'configure',
  CART: 'cart',
  CHECKOUT: 'checkout',
  SUCCESS: 'success',
}

// ─── Header ─────────────────────────────────────────────────────────────────
function Header({ step, onCartClick }) {
  const { itemCount } = useCart()
  const { brandName } = useTheme()
  console.log(`brandName: ${brandName}`);
  return (
    <header className="sticky top-0 z-50 border-b px-5 py-4 flex justify-between items-center"
      style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
    >
      <h1 className="font-black italic text-xl uppercase tracking-tighter">{brandName}</h1>
      {step !== STEP.SUCCESS && (
        <button id="cart-icon-btn" onClick={onCartClick} className="relative">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v4a2 2 0 01-2 2H9a2 2 0 01-2-2v-4" />
          </svg>
          {itemCount > 0 && (
            <span className="btn-primary absolute -top-1.5 -right-1.5 text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </button>
      )}
    </header>
  )
}

// ─── Step progress bar ───────────────────────────────────────────────────────
const STEP_ORDER = [STEP.CATALOG, STEP.CONFIGURE, STEP.CART, STEP.CHECKOUT, STEP.SUCCESS]

function Steps({ current }) {
  if (current === STEP.SUCCESS || current === STEP.CONSENT) return null
  const labels = ['Browse', 'Select', 'Cart', 'Pay']
  const idx = STEP_ORDER.indexOf(current)
  return (
    <div className="flex justify-center gap-1 px-5 pb-4 pt-2">
      {labels.map((label, i) => (
        <div key={label} className="flex items-center gap-1">
          <div
            className={`h-1 rounded-full transition-all ${i === 0 ? 'w-5' : 'w-8'}`}
            style={{ background: i <= idx ? 'var(--color-primary)' : 'var(--color-border)' }}
          />
        </div>
      ))}
    </div>
  )
}

// ─── Inner app (needs CartProvider + ThemeProvider) ──────────────────────────
function OrderApp() {
  const [step, setStep] = useState(STEP.CONSENT)
  const [selectedProduct, setSelected] = useState(null)
  const [successData, setSuccessData] = useState(null)
  const { dispatch } = useCart()

  function handleProductSelect(product) {
    setSelected(product)
    setStep(STEP.CONFIGURE)
    window.scrollTo(0, 0)
  }

  function handleAddedToCart() {
    setStep(STEP.CART)
    window.scrollTo(0, 0)
  }

  function handleSuccess(data) {
    setSuccessData(data)
    dispatch({ type: 'CLEAR_CART' })
    setStep(STEP.SUCCESS)
    window.scrollTo(0, 0)
  }

  function handleReset() {
    setSuccessData(null)
    setStep(STEP.CATALOG)
    window.scrollTo(0, 0)
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-bg)' }}>
      <Header step={step} onCartClick={() => { setStep(STEP.CART); window.scrollTo(0, 0) }} />
      <Steps current={step} />

      <main className="max-w-sm mx-auto px-5 pb-16">
        {step === STEP.CONSENT && (
          <Consent onAccept={() => { setStep(STEP.CATALOG); window.scrollTo(0, 0) }} />
        )}
        {step === STEP.CATALOG && (
          <Catalog onSelect={handleProductSelect} />
        )}
        {step === STEP.CONFIGURE && selectedProduct && (
          <Configure
            product={selectedProduct}
            onBack={() => setStep(STEP.CATALOG)}
            onDone={handleAddedToCart}
          />
        )}
        {step === STEP.CART && (
          <Cart
            onBack={() => setStep(STEP.CATALOG)}
            onCheckout={() => { setStep(STEP.CHECKOUT); window.scrollTo(0, 0) }}
          />
        )}
        {step === STEP.CHECKOUT && (
          <Checkout onBack={() => setStep(STEP.CART)} onSuccess={handleSuccess} />
        )}
        {step === STEP.SUCCESS && (
          <Success
            orderId={successData?.orderId}
            total={successData?.total}
            onReset={handleReset}
          />
        )}
      </main>
    </div>
  )
}

// ─── Root ────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <OrderApp />
      </CartProvider>
    </ThemeProvider>
  )
}
