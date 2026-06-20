import { useState, useEffect } from 'react'
import { CartProvider, useCart } from './context/CartContext'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import { activeTheme } from './themes/index.js'
import Catalog from './components/Catalog'
import Configure from './components/Configure'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import Success from './components/Success'
import Consent from './components/Consent'
import PreorderClosed from './components/PreorderClosed'
import LandingPage from './components/LandingPage'
import WaitlistForm from './components/WaitlistForm'
import WaitlistSuccess from './components/WaitlistSuccess'

// ─── Steps ──────────────────────────────────────────────────────────────────
const STEP = {
  LANDING: 'landing',
  CONSENT: 'consent',
  CATALOG: 'catalog',
  CONFIGURE: 'configure',
  CART: 'cart',
  CHECKOUT: 'checkout',
  SUCCESS: 'success',
  WAITLIST: 'waitlist',
  WAITLIST_SUCCESS: 'waitlist_success',
}

// ─── Header ─────────────────────────────────────────────────────────────────
function Header({ step, onCartClick, onLogoClick }) {
  const { itemCount } = useCart()
  const { brandName, brandSlogan } = useTheme()
  const hideCart = step === STEP.SUCCESS || step === STEP.LANDING || step === STEP.WAITLIST || step === STEP.WAITLIST_SUCCESS

  return (
    <header className="sticky top-0 z-50 border-b px-5 py-4 flex justify-between items-center"
      style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
    >
      <div>
        <h1
          className="font-black italic text-xl uppercase tracking-tighter cursor-pointer select-none hover:opacity-80 transition-opacity"
          onClick={onLogoClick}
        >
          {brandName}
        </h1>
        {step === STEP.LANDING && brandSlogan && (
          <p className="text-[10px] font-bold text-muted uppercase tracking-tight font-secondary">{brandSlogan}</p>
        )}
      </div>
      {!hideCart && (
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
      {(step === STEP.WAITLIST || step === STEP.WAITLIST_SUCCESS) && (
        <div>
          <span className="text-xs font-black italic uppercase px-2 py-1 bg-black text-white rounded-full">Waitlist</span>
        </div>
      )}
    </header>
  )
}

// ─── Step progress bar ───────────────────────────────────────────────────────
const STEP_ORDER = [STEP.CATALOG, STEP.CONFIGURE, STEP.CART, STEP.CHECKOUT, STEP.SUCCESS]

function Steps({ current }) {
  if (current === STEP.SUCCESS || current === STEP.CONSENT || current === STEP.LANDING || current === STEP.WAITLIST || current === STEP.WAITLIST_SUCCESS) return null
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
  const { features } = useTheme()
  const initialStep = features?.landingPage ? STEP.LANDING : STEP.CONSENT
  const [step, setStep] = useState(initialStep)
  const [selectedProduct, setSelected] = useState(null)
  const [successData, setSuccessData] = useState(null)
  const { dispatch } = useCart()

  // Initialize history state on mount
  useEffect(() => {
    if (!window.history.state || window.history.state.step === undefined) {
      window.history.replaceState({ step: initialStep }, '')
    }
  }, [initialStep])

  // Sync state to history when step changes
  useEffect(() => {
    if (window.history.state && window.history.state.step !== step) {
      window.history.pushState({ step }, '')
    }
  }, [step])

  // Listen to popstate (browser back/forward)
  useEffect(() => {
    const handlePopState = (event) => {
      if (event.state && event.state.step !== undefined) {
        setStep(event.state.step)
      } else {
        setStep(initialStep)
      }
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [initialStep])

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
      <Header
        step={step}
        onCartClick={() => { setStep(STEP.CART); window.scrollTo(0, 0) }}
        onLogoClick={() => {
          if (features?.landingPage) {
            setStep(STEP.LANDING)
          } else if (step !== STEP.CONSENT) {
            setStep(STEP.CATALOG)
          }
          window.scrollTo(0, 0)
        }}
      />
      <Steps current={step} />

      <main className={(step === STEP.LANDING || step === STEP.CONSENT) ? '' : 'max-w-sm mx-auto px-5 pb-16'}>
        {step === STEP.LANDING && (
          <LandingPage
            onWaitlistClick={() => { setStep(STEP.WAITLIST); window.scrollTo(0, 0) }}
            onPreorderClick={() => { setStep(STEP.CONSENT); window.scrollTo(0, 0) }}
          />
        )}
        {step === STEP.WAITLIST && (
          <WaitlistForm onSuccess={() => { setStep(STEP.WAITLIST_SUCCESS); window.scrollTo(0, 0) }} />
        )}
        {step === STEP.WAITLIST_SUCCESS && (
          <WaitlistSuccess />
        )}
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
function getNextTransitionTime(products, now) {
  let nextTime = null
  for (const p of products) {
    const start = p.orderWindow?.startTime ? new Date(p.orderWindow.startTime) : null
    const end = p.orderWindow?.endTime ? new Date(p.orderWindow.endTime) : null

    if (start && start > now) {
      if (!nextTime || start < nextTime) nextTime = start
    }
    if (end && end > now) {
      if (!nextTime || end < nextTime) nextTime = end
    }
  }
  return nextTime
}

function checkIsClosed(products, now) {
  return !products.some((p) => {
    const start = p.orderWindow?.startTime ? new Date(p.orderWindow.startTime) : null
    const end = p.orderWindow?.endTime ? new Date(p.orderWindow.endTime) : null
    const isIncoming = start && now < start
    const isClosed = end && now >= end
    return !isIncoming && !isClosed
  })
}

export default function App() {
  const products = activeTheme.products || []
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const now = new Date()
    const nextTransition = getNextTransitionTime(products, now)
    if (!nextTransition) return

    const delay = nextTransition - now
    const timer = setTimeout(() => {
      setTick((t) => t + 1)
    }, delay)

    return () => clearTimeout(timer)
  }, [products, tick])

  const now = new Date()
  const isClosed = checkIsClosed(products, now)

  return (
    <ThemeProvider>
      <CartProvider>
        {isClosed ? <PreorderClosed /> : <OrderApp />}
      </CartProvider>
    </ThemeProvider>
  )
}
