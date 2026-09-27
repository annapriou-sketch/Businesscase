import { describe, it, expect } from 'vitest'
import { MODES, generateQuestion, parseAnswer, isCorrect } from '../src/lib/drill.js'

function seeded(seed) {
  return () => {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }
}

describe('parseAnswer', () => {
  it('accepts French and English number formats', () => {
    expect(parseAnswer('1 250')).toBe(1250)
    expect(parseAnswer('12,5')).toBe(12.5)
    expect(parseAnswer('12.5%')).toBe(12.5)
    expect(parseAnswer('-5')).toBe(-5)
    expect(parseAnswer('1,250')).toBe(1250)
    expect(parseAnswer('12,500.5')).toBe(12500.5)
    expect(parseAnswer('\u22124')).toBe(-4)
  })
  it('rejects garbage', () => {
    expect(parseAnswer('')).toBeNaN()
    expect(parseAnswer('abc')).toBeNaN()
    expect(parseAnswer('1.2.3')).toBeNaN()
  })
})

describe('isCorrect', () => {
  it('requires exact answers when there is no tolerance', () => {
    expect(isCorrect({ answer: 1200, tolerance: 0 }, '1200')).toBe(true)
    expect(isCorrect({ answer: 1200, tolerance: 0 }, '1201')).toBe(false)
  })
  it('applies a relative tolerance', () => {
    const q = { answer: 83.3, tolerance: 0.02 }
    expect(isCorrect(q, '83')).toBe(true)
    expect(isCorrect(q, '80')).toBe(false)
  })
  it('applies an absolute tolerance for small growth rates', () => {
    expect(isCorrect({ answer: 4.8, tolerance: 0.02, absTolerance: 0.5 }, '5')).toBe(true)
  })
})

describe('generateQuestion', () => {
  it('produces self-consistent questions in every mode', () => {
    const rng = seeded(42)
    for (const mode of MODES) {
      for (let i = 0; i < 200; i++) {
        const q = generateQuestion(mode, rng, i % 2 ? 'en' : 'fr')
        expect(Number.isFinite(q.answer)).toBe(true)
        expect(q.text.length).toBeGreaterThan(0)
        expect(isCorrect(q, String(q.answer))).toBe(true)
      }
    }
  })
  it('throws on an unknown mode', () => {
    expect(() => generateQuestion('nope')).toThrow()
  })
})
