import { useTheme } from '../context/ThemeContext'
import Hero from './landing/Hero'
import Vision from './landing/Vision'
import FabricTech from './landing/FabricTech'
import Collection from './landing/Collection'
import JoinUs from './landing/JoinUs'
import Footer from './landing/Footer'

export default function LandingPage({ onWaitlistClick, onPreorderClick }) {
  const { brandName, icon, brandSlogan, closedText, features, products, landing } = useTheme()

  return (
    <div style={{ background: 'var(--color-bg)' }}>
      <Hero
        brandName={brandName}
        icon={icon}
        brandSlogan={brandSlogan}
        landing={landing}
        features={features}
        onWaitlistClick={onWaitlistClick}
        onPreorderClick={onPreorderClick}
      />
      <Vision landing={landing} />
      <FabricTech landing={landing} />
      {/* <Collection landing={landing} products={products} /> */}
      <JoinUs
        landing={landing}
        features={features}
        closedText={closedText}
        onWaitlistClick={onWaitlistClick}
      />
      <Footer brandName={brandName} closedText={closedText} />
    </div>
  )
}
