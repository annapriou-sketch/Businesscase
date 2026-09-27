import { t, getLang } from '../lib/i18n.js'
import { MODES, generateQuestion, isCorrect, fmt } from '../lib/drill.js'
import { load, save, logActivity } from '../lib/store.js'
import { esc } from '../lib/dom.js'

const DURATION = 120

export default function drill(root) {
  let timer = null
  let mode = 'mixed'

  async function intro() {
    const best = await load('drill', 'best', 0)
    root.innerHTML = `
      <header class="page-head">
        <h1 class="display">${esc(t('drill.title'))}</h1>
        <p class="muted">${esc(t('drill.intro'))}</p>
      </header>
      <section class="panel narrow stack">
        <label>${esc(t('drill.mode'))}
          <select data-mode>${MODES.map((m) => `<option value="${m}"${m === mode ? ' selected' : ''}>${esc(t(`drill.mode.${m}`))}</option>`).join('')}</select>
        </label>
        <p class="muted mono">${esc(t('drill.best', { best }))}</p>
        <button class="btn" data-start>${esc(t('drill.start'))}</button>
      </section>`
    root.querySelector('[data-mode]').addEventListener('change', (e) => { mode = e.target.value })
    root.querySelector('[data-start]').addEventListener('click', run)
  }

  function run() {
    const history = []
    let remaining = DURATION
    let question = generateQuestion(mode, Math.random, getLang())

    root.innerHTML = `
      <section class="panel narrow drill-live">
        <div class="drill-bar">
          <span class="mono" data-time></span>
          <span class="mono">${esc(t('drill.score'))} <strong data-score>0</strong></span>
        </div>
        <div class="progress"><div class="progress-fill" data-progress></div></div>
        <p class="drill-question mono" data-question></p>
        <form data-form class="drill-form">
          <input data-input inputmode="decimal" autocomplete="off" aria-label="${esc(t('drill.answer'))}" placeholder="${esc(t('drill.answer'))}">
          <button class="btn" type="submit">OK</button>
          <button class="btn-ghost" type="button" data-skip>${esc(t('drill.skip'))}</button>
        </form>
      </section>`

    const $ = (s) => root.querySelector(s)
    const input = $('[data-input]')

    const show = () => {
      $('[data-question]').textContent = question.text
      $('[data-score]').textContent = history.filter((h) => h.ok).length
      input.value = ''
      input.focus()
    }
    const tick = () => {
      $('[data-time]').textContent = `${Math.floor(remaining / 60)}:${String(remaining % 60).padStart(2, '0')}`
      $('[data-progress]').style.width = `${(remaining / DURATION) * 100}%`
    }
    const answer = (raw) => {
      history.push({ question, raw, ok: isCorrect(question, raw) })
      question = generateQuestion(mode, Math.random, getLang())
      show()
    }

    $('[data-form]').addEventListener('submit', (e) => { e.preventDefault(); if (input.value.trim()) answer(input.value) })
    $('[data-skip]').addEventListener('click', () => answer(''))

    show()
    tick()
    timer = setInterval(() => {
      remaining -= 1
      tick()
      if (remaining <= 0) {
        clearInterval(timer)
        timer = null
        finish(history)
      }
    }, 1000)
  }

  async function finish(history) {
    const correct = history.filter((h) => h.ok).length
    const best = Math.max(correct, await load('drill', 'best', 0))
    await save('drill', 'best', best)
    await logActivity('drill', `${t('drill.title')} · ${t(`drill.mode.${mode}`)}`, correct)

    root.innerHTML = `
      <section class="panel narrow stack">
        <p class="eyebrow">${esc(t('drill.done'))}</p>
        <h1 class="display">${esc(t('drill.result', { correct, total: history.length }))}</h1>
        <p class="muted mono">${esc(t('drill.best', { best }))}</p>
        <button class="btn" data-again>${esc(t('drill.again'))}</button>
        ${history.length ? `
          <h2 class="eyebrow">${esc(t('drill.review'))}</h2>
          <ul class="review">${history.map((h) => `
            <li class="${h.ok ? 'ok' : 'ko'}">
              <span class="mono">${esc(h.question.text)}</span>
              <span class="mono">${esc(h.raw || '—')}</span>
              <span class="mono">${esc(fmt(h.question.answer, getLang()))}</span>
            </li>`).join('')}</ul>` : ''}
      </section>`
    root.querySelector('[data-again]').addEventListener('click', intro)
  }

  intro()
  return () => { if (timer) clearInterval(timer) }
}
