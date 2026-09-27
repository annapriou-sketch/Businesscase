// Pure helpers for the case player.

export const STEPS = ['brief', 'clarify', 'structure', 'math', 'brainstorm', 'reco', 'debrief']

const normalise = (s) => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')

/** Returns the indexes of expected ideas whose keywords appear in the text. */
export function coveredIdeas(ideas, text) {
  const haystack = normalise(text || '')
  return ideas
    .map((idea, i) => (idea.keywords.some((k) => haystack.includes(normalise(k))) ? i : -1))
    .filter((i) => i >= 0)
}

export function averageScore(scores) {
  const values = Object.values(scores || {}).filter((v) => typeof v === 'number')
  if (!values.length) return 0
  return Math.round((values.reduce((a, b) => a + b, 0) / values.length) * 10) / 10
}
