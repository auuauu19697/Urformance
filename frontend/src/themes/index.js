// ─── Brand Registry ───────────────────────────────────────────────────────────
// Reads VITE_BRAND at build time and exports the active theme.
// To add a new brand: import its theme and products below and add it to `themes`.

import urformanceTheme    from './urformance/theme.js'
import urformanceProducts from './urformance/products.js'
import muJerseyTheme      from './mu-jersey/theme.js'
import muJerseyProducts   from './mu-jersey/products.js'
import kuteeClubTheme     from './kutee-club/theme.js'
import kuteeClubProducts  from './kutee-club/products.js'

const themes = {
  'urformance': { ...urformanceTheme, products: urformanceProducts },
  'mu-jersey':  { ...muJerseyTheme,   products: muJerseyProducts   },
  'kutee-club': { ...kuteeClubTheme,  products: kuteeClubProducts  },
}

const brandKey = import.meta.env.VITE_BRAND || 'urformance'

export const activeTheme = themes[brandKey] ?? { ...urformanceTheme, products: urformanceProducts }
