// Pure question generator and checker for the mental maths drill.

const pick = (rng, arr) => arr[Math.floor(rng() * arr.length)]
const int = (rng, min, max) => min + Math.floor(rng() * (max - min + 1))

const GENERATORS = {
  pct(rng, fmt) {
    const p = pick(rng, [5, 10, 12, 15, 20, 25, 30, 35, 40, 45, 60, 75])
    const base = int(rng, 2, 90) * pick(rng, [10, 100, 1000])
    return { text: `${p} % × ${fmt(base)}`, answer: (p / 100) * base, tolerance: 0.02 }
  },
  mult(rng, fmt) {
    const a = int(rng, 12, 99)
    const b = int(rng, 3, 19) * pick(rng, [1, 10, 100])
    return { text: `${fmt(a)} × ${fmt(b)}`, answer: a * b, tolerance: 0 }
  },
  div(rng, fmt) {
    const b = int(rng, 3, 25)
    const a = b * int(rng, 5, 400) + int(rng, 0, b - 1)
    return { text: `${fmt(a)} ÷ ${b}`, answer: a / b, tolerance: 0.02 }
  },
  growth(rng, fmt) {
    const from = int(rng, 20, 200) * 10
    const g = pick(rng, [-20, -10, -5, 5, 8, 10, 15, 20, 25, 50])
    const to = Math.round(from * (1 + g / 100))
    return { text: `${fmt(from)} → ${fmt(to)} : % ?`, answer: ((to - from) / from) * 100, tolerance: 0.02, absTolerance: 0.5 }
  },
}

export const MODES = ['mixed', 'pct', 'mult', 'div', 'growth']

export function generateQuestion(mode = 'mixed', rng = Math.random, lang = 'fr') {
  const key = mode === 'mixed' ? pick(rng, Object.keys(GENERATORS)) : mode
  const gen = GENERATORS[key]
  if (!gen) throw new Error(`Unknown drill mode: ${mode}`)
  return { type: key, ...gen(rng, (n) => fmt(n, lang)) }
}

/** Accepts "1 250", "1,250", "1,5", "12.5%", "-5". */
export function parseAnswer(raw) {
  if (raw == null) return NaN
  let cleaned = String(raw).trim().replace(/[\s\u00a0\u202f%]/g, '')
  // "1,250" or "12,500.5": commas are thousands separators (English format).
  if (/^-?\d{1,3}(,\d{3})+(\.\d+)?$/.test(cleaned)) cleaned = cleaned.replace(/,/g, '')
  else cleaned = cleaned.replace(',', '.')
  if (cleaned === '' || !/^-?\d*\.?\d+$/.test(cleaned)) return NaN
  return Number(cleaned)
}

export function isCorrect(question, raw) {
  const value = parseAnswer(raw)
  if (Number.isNaN(value)) return false
  const diff = Math.abs(value - question.answer)
  if (question.absTolerance && diff <= question.absTolerance) return true
  if (!question.tolerance) return diff < 1e-9
  return diff <= Math.abs(question.answer) * question.tolerance
}

export function fmt(n, lang = 'fr') {
  const rounded = Math.round(n * 100) / 100
  return rounded.toLocaleString(lang === 'en' ? 'en-GB' : 'fr-FR').replace(/[\u202f\u00a0]/g, ' ')
}
