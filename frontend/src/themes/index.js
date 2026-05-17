// ─── Brand Registry ───────────────────────────────────────────────────────────
// Reads VITE_BRAND at build time and exports the active theme.
// To add a new brand: import its theme below and add it to `themes`.

import urformance from './urformance.js'
import muJersey   from './mu-jersey.js'
import kuOutfit   from './ku-outfit.js'

const themes = {
  'urformance': urformance,
  'mu-jersey':  muJersey,
  'ku-outfit':  kuOutfit,
}

const brandKey = import.meta.env.VITE_BRAND || 'urformance'

export const activeTheme = themes[brandKey] ?? urformance
