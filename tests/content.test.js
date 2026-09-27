import { describe, it, expect } from 'vitest'
import CASES from '../src/content/cases.js'
import { QUESTIONS, CATEGORIES } from '../src/content/fit.js'
import { coveredIdeas, averageScore } from '../src/lib/cases.js'
import fr from '../src/locales/fr.js'
import en from '../src/locales/en.js'
import ROADMAP, { currentWeek } from '../src/content/roadmap.js'
import { TESTS, VERBAL_OPTIONS, scoreTest } from '../src/content/tests.js'

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

describe('roadmap', () => {
  it('has 8 weeks, unique task ids and valid links', () => {
    expect(ROADMAP.map((w) => w.week)).toEqual([1, 2, 3, 4, 5, 6, 7, 8])
    const ids = ROADMAP.flatMap((w) => w.tasks.map((task) => task.id))
    expect(new Set(ids).size).toBe(ids.length)
    const caseIds = new Set(CASES.map((c) => c.id))
    ROADMAP.flatMap((w) => w.tasks).forEach((task) => {
      expect(bilingual(task.label)).toBeTruthy()
      const m = task.href && task.href.match(/^#\/cases\/(.+)$/)
      if (m) expect(caseIds.has(m[1])).toBe(true)
      const tm = task.href && task.href.match(/^#\/tests\/(.+)$/)
      if (tm) expect(TESTS[tm[1]]).toBeDefined()
    })
  })
  it('computes the current week and clamps it', () => {
    const start = new Date('2026-01-01T00:00:00Z')
    expect(currentWeek(null)).toBe(1)
    expect(currentWeek(start.toISOString(), new Date('2026-01-03T00:00:00Z'))).toBe(1)
    expect(currentWeek(start.toISOString(), new Date('2026-01-08T00:00:00Z'))).toBe(2)
    expect(currentWeek(start.toISOString(), new Date('2026-06-01T00:00:00Z'))).toBe(8)
  })
})

describe('reasoning tests', () => {
  it('have valid answer indexes and bilingual text', () => {
    for (const test of Object.values(TESTS)) {
      test.questions.forEach((q) => {
        const opts = test.id === 'verbal' ? VERBAL_OPTIONS : q.options
        expect(q.answer).toBeGreaterThanOrEqual(0)
        expect(q.answer).toBeLessThan(opts.length)
        expect(bilingual(q.q)).toBeTruthy()
        expect(bilingual(q.why)).toBeTruthy()
      })
    }
  })
  it('numerical answers match the data', () => {
    const rows = TESTS.numerical.questions[0].data.rows
    const total25 = rows.reduce((s, r) => s + r[2], 0)
    expect(total25).toBe(4267)
    expect((rows[0][2] - rows[0][1]) / rows[0][1]).toBeCloseTo(0.10)
    expect(rows[2][2] / rows[2][3]).toBeCloseTo(143)
    expect((rows[3][2] / total25) * 100).toBeCloseTo(27.6, 1)
    expect(rows[1][1] + 1.1 * (rows[0][2] + rows[2][2] + rows[3][2])).toBeCloseTo(4640.5)
    expect(26450 * 1.15).toBeCloseTo(30417.5)
  })
  it('scores answers', () => {
    const answers = Object.fromEntries(TESTS.verbal.questions.map((q, i) => [i, q.answer]))
    expect(scoreTest(TESTS.verbal, answers)).toBe(TESTS.verbal.questions.length)
    expect(scoreTest(TESTS.verbal, {})).toBe(0)
  })
})
