import { t, tr, getLang } from '../lib/i18n.js'
import { TESTS, VERBAL_OPTIONS, scoreTest } from '../content/tests.js'
import { fmt } from '../lib/drill.js'
import { load, save, logActivity } from '../lib/store.js'
import { esc } from '../lib/dom.js'

export default function tests(root, { params }) {
  let timer = null
  const stopTimer = () => { if (timer) { clearInterval(timer); timer = null } }

  ;(async () => {
    const best = await load('tests', 'best', {})
    const test = TESTS[params[0]]
    test ? intro(test) : list()

    function list() {
      root.innerHTML = `
        <header class="page-head">
          <h1 class="display">${esc(t('tests.title'))}</h1>
          <p class="muted">${esc(t('tests.intro'))}</p>
        </header>
        <section class="case-grid">
          ${Object.values(TESTS).map((x) => `
            <a class="panel case-card" href="#/tests/${x.id}">
              <span class="eyebrow">${esc(t('tests.meta', { n: x.questions.length, m: x.minutes }))}</span>
              <h2 class="case-title">${esc(tr(x.title))}</h2>
              <span class="muted mono">${esc(t('tests.best', { score: best[x.id] ?? '–', total: x.questions.length }))}</span>
              <span class="case-cta">${esc(t('cases.start'))} →</span>
            </a>`).join('')}
        </section>`
    }

    function intro(x) {
      root.innerHTML = `
        <a class="link" href="#/tests">← ${esc(t('tests.back'))}</a>
        <section class="panel narrow stack">
          <h1 class="display">${esc(tr(x.title))}</h1>
          <p>${esc(tr(x.intro))}</p>
          <button class="btn" data-go>${esc(t('cases.start'))}</button>
        </section>`
      root.querySelector('[data-go]').addEventListener('click', () => run(x))
    }

    function run(x) {
      const answers = {}
      let index = 0
      let left = x.minutes * 60
      const options = (q) => (x.id === 'verbal' ? VERBAL_OPTIONS : q.options)

      function draw() {
        const q = x.questions[index]
        root.innerHTML = `
          <section class="panel stack test-live">
            <div class="drill-bar">
              <span class="mono">${esc(t('tests.question', { i: index + 1, n: x.questions.length }))}</span>
              <span class="mono timer" data-time></span>
            </div>
            ${x.passage ? `<blockquote class="passage">${esc(tr(x.passage))}</blockquote>` : ''}
            ${q.data ? `
              <p class="eyebrow">${esc(tr(q.dataTitle))}</p>
              <div class="table-wrap"><table class="exhibit">
                <thead><tr>${tr(q.data.headers).map((h) => `<th>${esc(h)}</th>`).join('')}</tr></thead>
                <tbody>${q.data.rows.map((r) => `<tr>${r.map((c) => `<td>${esc(typeof c === 'number' ? fmt(c, getLang()) : tr(c))}</td>`).join('')}</tr>`).join('')}</tbody>
              </table></div>` : ''}
            <p class="lead">${esc(tr(q.q))}</p>
            <div class="options" role="radiogroup">
              ${options(q).map((o, i) => `
                <label class="option${answers[index] === i ? ' is-selected' : ''}">
                  <input type="radio" name="opt" value="${i}"${answers[index] === i ? ' checked' : ''}>
                  <span>${esc(tr(o))}</span>
                </label>`).join('')}
            </div>
            <div class="test-nav">
              <button class="btn-ghost" data-prev${index === 0 ? ' disabled' : ''}>←</button>
              ${index < x.questions.length - 1
                ? `<button class="btn" data-next>${esc(t('cases.next'))}</button>`
                : `<button class="btn" data-submit>${esc(t('tests.submit'))}</button>`}
            </div>
          </section>`
        tick()
        root.querySelectorAll('input[name=opt]').forEach((r) => r.addEventListener('change', () => {
          answers[index] = Number(r.value)
          draw()
        }))
        root.querySelector('[data-prev]').addEventListener('click', () => { index -= 1; draw() })
        root.querySelector('[data-next]')?.addEventListener('click', () => { index += 1; draw() })
        root.querySelector('[data-submit]')?.addEventListener('click', () => finish(x, answers))
      }

      function tick() {
        const el = root.querySelector('[data-time]')
        if (el) el.textContent = `${Math.floor(left / 60)}:${String(left % 60).padStart(2, '0')}`
      }

      draw()
      timer = setInterval(() => {
        left -= 1
        tick()
        if (left <= 0) finish(x, answers)
      }, 1000)
    }

    async function finish(x, answers) {
      stopTimer()
      const score = scoreTest(x, answers)
      best[x.id] = Math.max(score, best[x.id] ?? 0)
      await save('tests', 'best', best)
      await logActivity('tests', tr(x.title), score)
      const options = (q) => (x.id === 'verbal' ? VERBAL_OPTIONS : q.options)

      root.innerHTML = `
        <a class="link" href="#/tests">← ${esc(t('tests.back'))}</a>
        <section class="panel stack">
          <p class="eyebrow">${esc(tr(x.title))}</p>
          <h1 class="display mono">${score} / ${x.questions.length}</h1>
          <ol class="test-review">
            ${x.questions.map((q, i) => {
              const ok = answers[i] === q.answer
              return `
              <li class="${ok ? 'ok' : 'ko'}">
                <p>${esc(tr(q.q))}</p>
                <p class="mono">${esc(t('tests.yours'))} : ${answers[i] == null ? '—' : esc(tr(options(q)[answers[i]]))} · ${esc(t('tests.expected'))} : ${esc(tr(options(q)[q.answer]))}</p>
                <p class="muted">${esc(tr(q.why))}</p>
              </li>`
            }).join('')}
          </ol>
          <button class="btn" data-again>${esc(t('drill.again'))}</button>
        </section>`
      root.querySelector('[data-again]').addEventListener('click', () => intro(x))
    }
  })()

  return stopTimer
}
