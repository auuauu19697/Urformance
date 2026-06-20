import { createContext, useContext, useEffect } from 'react'
import { activeTheme } from '../themes/index.js'

const ThemeContext = createContext(activeTheme)

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Convert camelCase token key → CSS custom property name.
 *  e.g.  colorPrimary → --color-primary
 *        radiusCard   → --radius-card
 *        fontBrand    → --font-brand
 */
function tokenToCssVar(key) {
  return '--' + key.replace(/([A-Z])/g, (c) => '-' + c.toLowerCase())
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function ThemeProvider({ children }) {
  useEffect(() => {
    const { tokens, googleFont, googleFontWeights, pageTitle, metaDescription } = activeTheme
    const root = document.documentElement

    // 1. Inject design tokens as CSS custom properties on :root
    Object.entries(tokens).forEach(([key, value]) => {
      root.style.setProperty(tokenToCssVar(key), value)
    })

    // 2. Dynamically load the brand Google Font (skip if font is loaded via other CDN)
    if (googleFont) {
      const fontSlug = googleFont.replace(/\s+/g, '+')
      const fontUrl  = `https://fonts.googleapis.com/css2?family=${fontSlug}:wght@${googleFontWeights}&display=swap`
      if (!document.getElementById('brand-font')) {
        const link  = document.createElement('link')
        link.id     = 'brand-font'
        link.rel    = 'stylesheet'
        link.href   = fontUrl
        document.head.appendChild(link)
      }
    }

    // 3. Update page title & meta description & favicon
    document.title = pageTitle
    const metaEl = document.querySelector('meta[name="description"]')
    if (metaEl) metaEl.setAttribute('content', metaDescription)
    
    if (activeTheme.icon) {
      let iconEl = document.querySelector("link[rel~='icon']")
      if (!iconEl) {
        iconEl = document.createElement('link')
        iconEl.rel = 'icon'
        document.head.appendChild(iconEl)
      }
      iconEl.href = activeTheme.icon
      if (activeTheme.icon.endsWith('.svg')) {
        iconEl.type = 'image/svg+xml'
      } else if (activeTheme.icon.endsWith('.png')) {
        iconEl.type = 'image/png'
      } else {
        iconEl.removeAttribute('type')
      }
    }

    // 4. Set input style variant (drives CSS [data-input-style] selector)
    root.setAttribute('data-input-style', activeTheme.inputVariant || 'box')
  }, [])

  return (
    <ThemeContext.Provider value={activeTheme}>
      {children}
    </ThemeContext.Provider>
  )
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useTheme() {
  return useContext(ThemeContext)
}
