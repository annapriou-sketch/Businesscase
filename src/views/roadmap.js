import { t, tr } from '../lib/i18n.js'
import ROADMAP, { currentWeek } from '../content/roadmap.js'
import { load, save, logActivity } from '../lib/store.js'
import { esc } from '../lib/dom.js'

export default function roadmap(root) {
  ;(async () => {
    const state = await load('roadmap', 'state', { start: null, done: {} })

    function draw() {
      const week = currentWeek(state.start)
      const total = ROADMAP.reduce((n, w) => n + w.tasks.length, 0)
      const doneCount = Object.values(state.done).filter(Boolean).length

      root.innerHTML = `
        <header class="page-head">
          <h1 class="display">${esc(t('roadmap.title'))}</h1>
          <p class="muted">${esc(t('roadmap.intro'))}</p>
        </header>
        ${state.start ? `
          <section class="panel roadmap-summary">
            <div><span class="eyebrow">${esc(t('roadmap.currentWeek'))}</span><p class="stat-value mono">${week} / 8</p></div>
            <div><span class="eyebrow">${esc(t('roadmap.tasksDone'))}</span><p class="stat-value mono">${doneCount} / ${total}</p></div>
            <button class="btn-ghost" data-restart>${esc(t('roadmap.restart'))}</button>
          </section>` : `
          <section class="panel accent">
            <p>${esc(t('roadmap.notStarted'))}</p>
            <button class="btn" data-start>${esc(t('roadmap.start'))}</button>
          </section>`}
        <ol class="weeks">
          ${ROADMAP.map((w) => {
            const n = w.tasks.filter((task) => state.done[task.id]).length
            const status = !state.start ? '' : w.week < week ? 'is-past' : w.week === week ? 'is-current' : ''
            return `
            <li class="panel week ${status}">
              <details${state.start && w.week === week ? ' open' : ''}>
                <summary>
                  <span class="week-num mono">${esc(t('roadmap.week', { n: w.week }))}</span>
                  <span class="week-title">${esc(tr(w.title))}</span>
                  <span class="mono muted">${n}/${w.tasks.length}</span>
                </summary>
                <p class="muted">${esc(tr(w.goal))}</p>
                <ul class="tasks">
                  ${w.tasks.map((task) => `
                    <li>
                      <label class="check">
                        <input type="checkbox" data-task="${task.id}"${state.done[task.id] ? ' checked' : ''}>
                        <span>${esc(tr(task.label))}</span>
                      </label>
                      ${task.href ? `<a class="link" href="${task.href}">${esc(t('dash.go'))}</a>` : ''}
                    </li>`).join('')}
                </ul>
              </details>
            </li>`
          }).join('')}
        </ol>`

      root.querySelector('[data-start]')?.addEventListener('click', async () => {
        state.start = new Date().toISOString()
        await save('roadmap', 'state', state)
        draw()
      })
      root.querySelector('[data-restart]')?.addEventListener('click', async () => {
        if (!confirm(t('roadmap.restartConfirm'))) return
        state.start = new Date().toISOString()
        state.done = {}
        await save('roadmap', 'state', state)
        draw()
      })
      root.querySelectorAll('[data-task]').forEach((box) => box.addEventListener('change', async () => {
        state.done[box.dataset.task] = box.checked
        await save('roadmap', 'state', state)
        if (box.checked) {
          const task = ROADMAP.flatMap((w) => w.tasks).find((x) => x.id === box.dataset.task)
          await logActivity('roadmap', tr(task.label))
        }
        draw()
      }))
    }

    draw()
  })()
}
