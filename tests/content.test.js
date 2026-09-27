import { describe, it, expect } from 'vitest'
import CASES from '../src/content/cases.js'
import { QUESTIONS, CATEGORIES } from '../src/content/fit.js'
import { coveredIdeas, averageScore } from '../src/lib/cases.js'
import fr from '../src/locales/fr.js'
import en from '../src/locales/en.js'

const bilingual = (v) => v && typeof v.fr === 'string' && typeof v.en === 'string' && v.fr && v.en

describe('locales', () => {
  it('have the same keys in FR and EN', () => {
    expect(Object.keys(en).sort()).toEqual(Object.keys(fr).sort())
  })
})

describe('case bank', () => {
  it('has unique ids and complete bilingual content', () => {
    expect(new Set(CASES.map((c) => c.id)).size).toBe(CASES.length)
    for (const c of CASES) {
      for (const field of [c.title, c.type, c.brief, c.math.question, c.math.explanation, c.brainstorm.prompt, c.reco.prompt, c.reco.model]) {
        expect(bilingual(field)).toBeTruthy()
      }
      c.clarifications.forEach((q) => { expect(bilingual(q.q)).toBeTruthy(); expect(bilingual(q.a)).toBeTruthy() })
      expect(c.structure.fr.length).toBe(c.structure.en.length)
      expect(c.math.table.headers.fr.length).toBe(c.math.table.headers.en.length)
      c.math.table.rows.forEach((r) => expect(r.length).toBe(c.math.table.headers.fr.length))
      c.brainstorm.ideas.forEach((idea) => { expect(bilingual(idea.label)).toBeTruthy(); expect(idea.keywords.length).toBeGreaterThan(0) })
    }
  })
  it('has math answers consistent with the exhibits', () => {
    const bakery = CASES.find((c) => c.id === 'bakery-profit')
    const [before, after] = [1, 2].map((col) => bakery.math.table.rows.reduce((s, r) => s + r[col], 0))
    const profitDrop = (48 - before) - (48 - after)
    const rawDelta = bakery.math.table.rows[0][2] - bakery.math.table.rows[0][1]
    expect(48 - before).toBeCloseTo(4.0)
    expect(48 - after).toBeCloseTo(2.2)
    expect((rawDelta / profitDrop) * 100).toBeCloseTo(bakery.math.answer, 0)
    expect(300000 * 0.6 * 0.5 * 0.1 * 50 * 12 / 1e6).toBeCloseTo(CASES.find((c) => c.id === 'ebike-market').math.answer)
    expect((20 * 4000) / 15).toBeCloseTo(CASES.find((c) => c.id === 'gym-premium').math.answer, 1)
  })
})

describe('fit bank', () => {
  it('uses known categories and bilingual text', () => {
    const ids = new Set(CATEGORIES.map((c) => c.id))
    QUESTIONS.forEach((q) => {
      expect(ids.has(q.category)).toBe(true)
      expect(bilingual(q.q)).toBeTruthy()
      expect(bilingual(q.tips)).toBeTruthy()
    })
  })
})

describe('case helpers', () => {
  it('matches brainstorm ideas across languages and accents', () => {
    const ideas = [{ keywords: ['négoci'] }, { keywords: ['waste'] }, { keywords: ['prix'] }]
    expect(coveredIdeas(ideas, 'Renegocier les contrats\nReduce WASTE')).toEqual([0, 1])
    expect(coveredIdeas(ideas, '')).toEqual([])
  })
  it('averages step scores', () => {
    expect(averageScore({ a: 4, b: 5 })).toBe(4.5)
    expect(averageScore({})).toBe(0)
  })
})
