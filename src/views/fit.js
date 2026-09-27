import { t, tr } from '../lib/i18n.js'
import { CATEGORIES, QUESTIONS } from '../content/fit.js'
import { load, save, logActivity } from '../lib/store.js'
import { esc } from '../lib/dom.js'

const STAR = ['situation', 'task', 'action', 'result']

export default function fit(root) {
  let category = 'all'

  ;(async () => {
    const answers = await load('fit', 'answers', {})

    function draw() {
      const list = QUESTIONS.filter((q) => category === 'all' || q.category === category)
      root.innerHTML = `
        <header class="page-head">
          <h1 class="display">${esc(t('fit.title'))}</h1>
          <p class="muted">${esc(t('fit.intro'))}</p>
        </header>
        <div class="chips" role="tablist" aria-label="${esc(t('fit.category'))}">
          <button class="chip${category === 'all' ? ' is-active' : ''}" data-cat="all">∗</button>
          ${CATEGORIES.map((c) => `<button class="chip${category === c.id ? ' is-active' : ''}" data-cat="${c.id}">${esc(tr(c.label))}</button>`).join('')}
        </div>
        <div class="stack">
          ${list.map((q) => {
            const a = answers[q.id] || {}
            return `
            <details class="panel fit-item">
              <summary>
                <span>${esc(tr(q.q))}</span>
                ${a.action ? `<span class="badge">${'●'.repeat(a.rating || 0)}${'○'.repeat(5 - (a.rating || 0))}</span>` : ''}
              </summary>
              <p class="tip"><strong>${esc(t('fit.tips'))} :</strong> ${esc(tr(q.tips))}</p>
              <form class="stack" data-q="${q.id}">
                ${STAR.map((f) => `<label>${esc(t(`fit.${f}`))}<textarea name="${f}" rows="2">${esc(a[f] || '')}</textarea></label>`).join('')}
                <label>${esc(t('fit.rating'))}
                  <input type="range" name="rating" min="1" max="5" value="${a.rating || 3}">
                </label>
                <button class="btn" type="submit">${esc(t('fit.save'))}</button>
              </form>
            </details>`
          }).join('')}
        </div>`

      root.querySelectorAll('[data-cat]').forEach((b) => b.addEventListener('click', () => { category = b.dataset.cat; draw() }))
      root.querySelectorAll('form[data-q]').forEach((form) => form.addEventListener('submit', async (e) => {
        e.preventDefault()
        const data = Object.fromEntries(new FormData(form))
        data.rating = Number(data.rating)
        answers[form.dataset.q] = data
        await save('fit', 'answers', answers)
        await logActivity('fit', tr(QUESTIONS.find((q) => q.id === form.dataset.q).q), data.rating)
        const btn = form.querySelector('button')
        btn.textContent = t('fit.saved')
        setTimeout(() => { btn.textContent = t('fit.save') }, 1500)
      }))
    }

    draw()
  })()
}
