import { t, tr, getLang } from '../lib/i18n.js'
import { STEPS, coveredIdeas, averageScore } from '../lib/cases.js'
import { isCorrect, fmt } from '../lib/drill.js'
import { load, save, logActivity } from '../lib/store.js'
import { esc } from '../lib/dom.js'
import { renderChart } from '../lib/chart.js'
import CASES from '../content/cases.js'

const RECO_SECONDS = 60
// Kept across navigations within the session.
const filters = { search: '', type: 'all', difficulty: 'all', status: 'all' }
let searchDebounce = null

export default function cases(root, { params }) {
  let timer = null
  const stopTimer = () => { if (timer) { clearInterval(timer); timer = null } }

  ;(async () => {
    const state = await load('cases', 'state', {})
    const persist = () => save('cases', 'state', state)
    const current = CASES.find((c) => c.id === params[0])
    current ? player(current) : list()

    function list() {
      const types = [...new Map(CASES.map((c) => [tr(c.type), c.type])).keys()]
      const q = filters.search.trim().toLowerCase()
      const visible = CASES.filter((c) => {
        const s = state[c.id] || {}
        if (filters.type !== 'all' && tr(c.type) !== filters.type) return false
        if (filters.difficulty !== 'all' && c.difficulty !== Number(filters.difficulty)) return false
        if (filters.status === 'todo' && s.done) return false
        if (filters.status === 'done' && !s.done) return false
        if (q && ![c.title, c.sector, c.type].some((f) => tr(f).toLowerCase().includes(q))) return false
        return true
      })
      const option = (value, label, current) => `<option value="${esc(value)}"${value === current ? ' selected' : ''}>${esc(label)}</option>`

      root.innerHTML = `
        <header class="page-head">
          <h1 class="display">${esc(t('cases.title'))}</h1>
          <p class="muted">${esc(t('cases.intro'))}</p>
        </header>
        <form class="filters" data-filters>
          <input type="search" name="search" value="${esc(filters.search)}" placeholder="${esc(t('cases.search'))}" aria-label="${esc(t('cases.search'))}">
          <select name="type" aria-label="${esc(t('cases.filterType'))}">
            ${option('all', t('cases.allTypes'), filters.type)}
            ${types.map((ty) => option(ty, ty, filters.type)).join('')}
          </select>
          <select name="difficulty" aria-label="${esc(t('cases.filterDifficulty'))}">
            ${option('all', t('cases.allLevels'), filters.difficulty)}
            ${[1, 2, 3].map((d) => option(String(d), t(`cases.level.${d}`), filters.difficulty)).join('')}
          </select>
          <select name="status" aria-label="${esc(t('cases.filterStatus'))}">
            ${['all', 'todo', 'done'].map((st) => option(st, t(`cases.status.${st}`), filters.status)).join('')}
          </select>
        </form>
        <p class="muted mono">${esc(t('cases.count', { n: visible.length, total: CASES.length }))}</p>
        <section class="case-grid">
          ${visible.map((c) => {
            const s = state[c.id] || {}
            const label = s.done ? t('cases.done') : s.step ? t('cases.resume') : t('cases.start')
            return `
            <article class="panel case-card${s.done ? ' is-done' : ''}">
              <span class="eyebrow">${esc(tr(c.type))} · ${esc(t('cases.minutes', { n: c.minutes }))}</span>
              <h2 class="case-title"><a href="#/cases/${c.id}">${esc(tr(c.title))}</a></h2>
              <div class="case-meta">
                <span class="tag">${esc(tr(c.sector))}</span>
                <span class="level" title="${esc(t(`cases.level.${c.difficulty}`))}">${'●'.repeat(c.difficulty)}${'○'.repeat(3 - c.difficulty)}</span>
                ${s.done ? `<span class="mono">${averageScore(s.scores)} / 5</span>` : ''}
              </div>
              <div class="case-actions">
                <a class="case-cta" href="#/cases/${c.id}">${esc(label)} →</a>
                ${s.done ? `<button class="link" data-redo="${c.id}">${esc(t('cases.redo'))}</button>` : ''}
              </div>
            </article>`
          }).join('')}
        </section>`

      const form = root.querySelector('[data-filters]')
      form.addEventListener('submit', (e) => e.preventDefault())
      form.addEventListener('change', () => { Object.assign(filters, Object.fromEntries(new FormData(form))); list() })
      form.search.addEventListener('input', () => {
        filters.search = form.search.value
        clearTimeout(searchDebounce)
        searchDebounce = setTimeout(() => {
          list()
          const input = root.querySelector('[name=search]')
          input.focus()
          input.setSelectionRange(input.value.length, input.value.length)
        }, 200)
      })
      root.querySelectorAll('[data-redo]').forEach((b) => b.addEventListener('click', async () => {
        delete state[b.dataset.redo]
        await persist()
        location.hash = `#/cases/${b.dataset.redo}`
      }))
    }

    function player(c) {
      const s = (state[c.id] ||= { step: 0, scores: {}, answers: {} })

      function draw() {
        stopTimer()
        const stepName = STEPS[s.step]
        root.innerHTML = `
          <a class="link" href="#/cases">← ${esc(t('cases.back'))}</a>
          <header class="page-head">
            <span class="eyebrow">${esc(tr(c.type))}</span>
            <h1 class="display">${esc(tr(c.title))}</h1>
          </header>
          <ol class="stepper">
            ${STEPS.map((n, i) => `<li class="${i < s.step ? 'is-done' : i === s.step ? 'is-current' : ''}">${esc(t(`cases.step.${n}`))}</li>`).join('')}
          </ol>
          <section class="panel stack" data-step>${STEP_VIEWS[stepName]()}</section>`
        bind(stepName)
      }

      const selfScore = (name) => name === 'debrief' ? '' : `
        <label class="self-score">${esc(t('cases.selfScore'))}
          <input type="range" min="1" max="5" value="${s.scores[name] || 3}" data-score>
        </label>
        <button class="btn" data-next>${esc(t(name === 'reco' ? 'cases.finish' : 'cases.next'))}</button>`

      const STEP_VIEWS = {
        brief: () => `<p class="lead">${esc(tr(c.brief))}</p>${selfScore('brief')}`,
        clarify: () => `
          <ul class="qa">${c.clarifications.map((q, i) => `
            <li>
              <button class="btn-ghost" data-ask="${i}"${s.answers[`q${i}`] ? ' disabled' : ''}>${esc(tr(q.q))}</button>
              <p class="answer${s.answers[`q${i}`] ? '' : ' hidden'}" data-answer="${i}">${esc(tr(q.a))}</p>
            </li>`).join('')}
          </ul>${selfScore('clarify')}`,
        structure: () => `
          <label>${esc(t('cases.yourStructure'))}<textarea rows="6" data-text="structure">${esc(s.answers.structure || '')}</textarea></label>
          <details><summary>${esc(t('cases.showReference'))}</summary>
            <ul class="reference">${tr(c.structure).map((b) => `<li>${esc(b)}</li>`).join('')}</ul>
          </details>${selfScore('structure')}`,
        math: () => `
          <p class="lead">${esc(tr(c.math.question))}</p>
          ${c.math.table ? `<div class="table-wrap"><table class="exhibit">
            <thead><tr>${tr(c.math.table.headers).map((h) => `<th>${esc(h)}</th>`).join('')}</tr></thead>
            <tbody>${c.math.table.rows.map((r) => `<tr>${r.map((cell) => `<td>${esc(typeof cell === 'number' ? fmt(cell, getLang()) : tr(cell))}</td>`).join('')}</tr>`).join('')}</tbody>
          </table></div>` : ''}
          ${c.math.chart ? renderChart(c.math.chart, tr, (v) => fmt(v, getLang())) : ''}
          <form class="inline-form" data-math>
            <input inputmode="decimal" autocomplete="off" value="${esc(s.answers.math || '')}" aria-label="${esc(t('drill.answer'))}">
            <span class="mono">${esc(c.math.unit)}</span>
            <button class="btn-ghost" type="submit">${esc(t('cases.check'))}</button>
          </form>
          <div data-feedback></div>${selfScore('math')}`,
        brainstorm: () => `
          <p class="lead">${esc(tr(c.brainstorm.prompt))}</p>
          <label>${esc(t('cases.yourIdeas'))}<textarea rows="6" data-text="brainstorm">${esc(s.answers.brainstorm || '')}</textarea></label>
          <button class="btn-ghost" data-cover>${esc(t('cases.check'))}</button>
          <div data-feedback></div>${selfScore('brainstorm')}`,
        reco: () => `
          <p class="lead">${esc(tr(c.reco.prompt))}</p>
          <p class="mono timer" data-timer>${esc(t('cases.timer', { s: RECO_SECONDS }))}</p>
          <label>${esc(t('cases.yourReco'))}<textarea rows="6" data-text="reco">${esc(s.answers.reco || '')}</textarea></label>
          <details><summary>${esc(t('cases.modelAnswer'))}</summary><p>${esc(tr(c.reco.model))}</p></details>
          ${selfScore('reco')}`,
        debrief: () => `
          <h2 class="eyebrow">${esc(t('cases.debriefSub'))}</h2>
          <ul class="score-list">${STEPS.slice(0, -1).map((n) => `
            <li><span>${esc(t(`cases.step.${n}`))}</span><span class="bar"><span style="width:${(s.scores[n] || 0) * 20}%"></span></span><span class="mono">${s.scores[n] || '–'}/5</span></li>`).join('')}
          </ul>
          <p class="display mono">${averageScore(s.scores)} / 5</p>
          <a class="btn" href="#/cases">${esc(t('cases.back'))}</a>`,
      }

      function bind(name) {
        const q = (sel) => root.querySelector(sel)
        root.querySelectorAll('[data-text]').forEach((el) => el.addEventListener('input', () => {
          s.answers[el.dataset.text] = el.value
        }))
        root.querySelectorAll('[data-ask]').forEach((b) => b.addEventListener('click', () => {
          s.answers[`q${b.dataset.ask}`] = true
          q(`[data-answer="${b.dataset.ask}"]`).classList.remove('hidden')
          b.disabled = true
        }))
        q('[data-math]')?.addEventListener('submit', (e) => {
          e.preventDefault()
          const raw = e.currentTarget.querySelector('input').value
          s.answers.math = raw
          const ok = isCorrect({ answer: c.math.answer, tolerance: c.math.tolerance }, raw)
          q('[data-feedback]').innerHTML = `
            <p class="${ok ? 'ok' : 'ko'}">${esc(ok ? t('cases.correct') : t('cases.incorrect', { answer: `${fmt(c.math.answer, getLang())} ${c.math.unit}` }))}</p>
            <p class="muted">${esc(tr(c.math.explanation))}</p>`
        })
        q('[data-cover]')?.addEventListener('click', () => {
          const hits = coveredIdeas(c.brainstorm.ideas, s.answers.brainstorm)
          q('[data-feedback]').innerHTML = `
            <p class="mono">${esc(t('cases.covered', { n: hits.length, total: c.brainstorm.ideas.length }))}</p>
            <ul class="ideas">${c.brainstorm.ideas.map((idea, i) => `<li class="${hits.includes(i) ? 'ok' : 'ko'}">${esc(tr(idea.label))}</li>`).join('')}</ul>`
        })
        if (name === 'reco') {
          let left = RECO_SECONDS
          timer = setInterval(() => {
            left -= 1
            const el = q('[data-timer]')
            if (el) el.textContent = t('cases.timer', { s: Math.max(left, 0) })
            if (left <= 0) stopTimer()
          }, 1000)
        }
        q('[data-next]')?.addEventListener('click', async () => {
          s.scores[name] = Number(q('[data-score]').value)
          s.step += 1
          if (STEPS[s.step] === 'debrief' && !s.done) {
            s.done = true
            await logActivity('cases', tr(c.title), averageScore(s.scores))
          }
          await persist()
          draw()
          window.scrollTo(0, 0)
        })
      }

      draw()
    }
  })()

  return stopTimer
}
