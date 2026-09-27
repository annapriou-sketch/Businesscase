import fr from '../locales/fr.js'
import en from '../locales/en.js'

export const LOCALES = { fr, en }
const LANG_KEY = 'cc_lang'

let current = detect()

function detect() {
  try {
    const saved = localStorage.getItem(LANG_KEY)
    if (saved && LOCALES[saved]) return saved
  } catch {}
  const nav = typeof navigator !== 'undefined' ? navigator.language : 'fr'
  return nav && nav.toLowerCase().startsWith('en') ? 'en' : 'fr'
}

export function getLang() {
  return current
}

export function setLang(lang) {
  if (!LOCALES[lang]) return
  current = lang
  try { localStorage.setItem(LANG_KEY, lang) } catch {}
  if (typeof document !== 'undefined') document.documentElement.lang = lang
}

export function t(key, params = {}) {
  const str = LOCALES[current][key] ?? LOCALES.fr[key] ?? key
  return str.replace(/\{(\w+)\}/g, (_, k) => (k in params ? params[k] : `{${k}}`))
}

/** Pick the current-language value from a {fr, en} object (content files). */
export function tr(value) {
  if (value == null || typeof value !== 'object') return value
  return value[current] ?? value.fr
}
