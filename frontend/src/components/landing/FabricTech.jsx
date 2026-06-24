import { useState, useEffect } from 'react'

// ─── Icon components ──────────────────────────────────────────────────────────
function IconDroplet({ color = '#fff', size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C12 2 5 10.4 5 15a7 7 0 0014 0C19 10.4 12 2 12 2z"/>
    </svg>
  )
}

function IconLeaf({ color = '#fff', size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z"/>
    </svg>
  )
}

function IconShield({ color = '#fff', size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5L12 1zm-1 14l-3-3 1.41-1.41L11 12.17l4.59-4.58L17 9l-6 6z"/>
    </svg>
  )
}

function IconCamera({ color = '#fff', size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="3.2"/>
      <path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/>
    </svg>
  )
}

function FeatureIcon({ icon, iconColor, size = 'normal' }) {
  const bg = iconColor || '#2B2521'
  const isLight = iconColor === '#FF885F' || iconColor === '#FFF87B'
  const svgSize = size === 'large' ? 28 : 20
  const iconEl = (() => {
    switch (icon) {
      case 'droplet': return <IconDroplet color="#fff" size={svgSize} />
      case 'leaf':    return <IconLeaf    color="#fff" size={svgSize} />
      case 'shield':  return <IconShield  color="#fff" size={svgSize} />
      case 'camera':
      case 'fashion': return <IconCamera  color="#fff" size={svgSize} />
      default:        return <IconDroplet color="#fff" size={svgSize} />
    }
  })()
  const circleSize = size === 'large' ? '56px' : '40px'
  return (
    <div style={{
      width: circleSize, height: circleSize, borderRadius: '50%',
      background: bg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
    }}>
      {iconEl}
    </div>
  )
}

// ─── Default features ─────────────────────────────────────────────────────────
const DEFAULT_FEATURES = [
  { icon: 'droplet', iconColor: '#2B2521', title: 'Dual-Layer Push-Pull Moisture System',  body: 'โครงสร้างผ้า 2 ชั้น ดึงความชื้นจากผิวระเบายสู่อากาศอย่างรวดเร็ว' },
  { icon: 'leaf',    iconColor: '#2B2521', title: 'Scent-Release Micro-Encapsulation',      body: 'แคปซูลกลิ่นหอมขนาดเล็ก ปล่อยกลิ่นเมื่อมีการเสียดสีจากการเคลื่อนไหว หายกังวลกลิ่นเหงื่อ' },
  { icon: 'shield',  iconColor: '#FF885F', title: 'UV Protection + Anti-Bacteria Finish',   body: 'ป้องกันรังสี UV และยับยั้งกลิ่นไม่พึงประสงค์ตลอดวัน' },
  { icon: 'camera',  iconColor: '#FF885F', title: 'Fashionable Texture and Design',         body: 'ดีไซน์เก๋ เริ่ม ตามสไตล์ Gen Z ใส่เที่ยว ใส่ทำงาน ใส่ออกกำลังกายที่ยืนในทุกกตตามกาศน์' },
]

// ─── Main component ───────────────────────────────────────────────────────────
export default function FabricTech({ landing }) {
  const data     = landing?.fabricTech
  const heading  = data?.heading  || 'Our Fabric\nTechnology'
  const body     = data?.body     || 'We own our fabric that engineered for all-day activities.'
  const image    = data?.image    || '/urformance/fabric.png'
  const features = data?.features || DEFAULT_FEATURES

  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    setIsMobile(mq.matches)
    const handler = (e) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // ─── Photo ────────────────────────────────────────────────────────────────
  const Photo = ({ style = {} }) => image ? (
    <img
      src={image}
      alt="Fabric Technology"
      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', ...style }}
    />
  ) : (
    <div style={{
      width: '100%', height: '100%',
      background: '#e0ddd8',
      ...style,
    }} />
  )

  // ─── Text column ─────────────────────────────────────────────────────────
  const TextContent = () => (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

      {/* Heading */}
      <h2 style={{
        fontWeight: 900, fontStyle: 'italic',
        fontSize: isMobile ? 'clamp(2.4rem, 10vw, 3.5rem)' : 'clamp(2.8rem, 4.5vw, 4.5rem)',
        textTransform: 'uppercase',
        letterSpacing: '-0.02em', lineHeight: 0.95,
        margin: 0,
        marginBottom: '1.5rem',
        color: '#fff',
      }}>
        {heading.split('\n').map((line, idx, arr) => (
          <span key={idx}>{line}{idx < arr.length - 1 && <br />}</span>
        ))}
      </h2>

      {/* Body */}
      <p style={{
        fontSize: '0.9rem', fontWeight: 500, lineHeight: 1.75,
        fontFamily: 'var(--font-secondary)',
        color: 'rgba(255,255,255,0.6)',
        maxWidth: '46ch',
        marginBottom: '2.5rem',
        margin: '0 0 2.5rem',
      }}>
        {body}
      </p>

      {/* Features list — single column, icon left */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
        {features.map((feat, idx) => {
          const isLarge = idx < 2
          return (
            <div key={idx} style={{
              display: 'grid',
              gridTemplateColumns: isLarge ? '56px 1fr' : '40px 1fr',
              gap: '1.25rem',
              alignItems: 'flex-start',
            }}>
              <FeatureIcon icon={feat.icon} iconColor={feat.iconColor} size={isLarge ? 'large' : 'normal'} />
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: isLarge ? '56px' : '40px' }}>
                <h3 style={{
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  letterSpacing: '0.01em',
                  lineHeight: 1.3,
                  margin: '0 0 0.3rem',
                  color: '#fff',
                  fontFamily: 'var(--font-secondary)',
                }}>
                  {feat.title}
                </h3>
                <p style={{
                  fontSize: '0.8rem', fontWeight: 500, lineHeight: 1.6,
                  fontFamily: 'var(--font-thai, var(--font-secondary))',
                  color: 'rgba(255,255,255,0.5)',
                  margin: 0,
                }}>
                  {feat.body}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )

  // ─── Mobile layout ────────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <section style={{
        background: 'var(--color-primary)',
        color: '#fff',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'relative',
          clipPath: 'polygon(0 0, 100% 0, 100% 90%, 0 100%)',
          marginBottom: '-2.5rem',
        }}>
          <Photo style={{ aspectRatio: '4 / 3', minHeight: '260px' }} />
        </div>
        <div style={{ padding: '5rem 1.75rem 4rem' }}>
          <TextContent />
        </div>
      </section>
    )
  }

  // ─── Desktop layout ───────────────────────────────────────────────────────
  return (
    <section style={{
      background: 'var(--color-primary)',
      color: '#fff',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.1fr 1fr',
        minHeight: '85vh',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Left: photo with diagonal slash */}
        <div style={{
          position: 'relative',
          clipPath: 'polygon(0% 0%, 100% 0%, 82% 100%, 0% 100%)',
          marginRight: '-4rem',
        }}>
          <Photo />
        </div>

        {/* Right: text content */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          padding: '5rem 5rem 5rem 5rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
          <TextContent />
        </div>
      </div>
    </section>
  )
}
