import { t, tr } from '../lib/i18n.js'
import { load, recentActivity } from '../lib/store.js'
import { esc } from '../lib/dom.js'
import CASES from '../content/cases.js'
import { QUESTIONS } from '../content/fit.js'
import ROADMAP, { currentWeek } from '../content/roadmap.js'
import { TESTS } from '../content/tests.js'

export default function dashboard(root, { user }) {
  root.innerHTML = `<p class="muted">…</p>`

  ;(async () => {
    const [drillBest, caseState, fitAnswers, activity, plan, testBest] = await Promise.all([
      load('drill', 'best', 0),
      load('cases', 'state', {}),
      load('fit', 'answers', {}),
      recentActivity(6),
      load('roadmap', 'state', { start: null, done: {} }),
      load('tests', 'best', {}),
    ])
    const week = ROADMAP[currentWeek(plan.start) - 1]
    const weekDone = week.tasks.filter((task) => plan.done[task.id]).length
    const nextTask = plan.start && week.tasks.find((task) => !plan.done[task.id])
    const casesDone = CASES.filter((c) => caseState[c.id]?.done).length
    const fitDone = QUESTIONS.filter((q) => fitAnswers[q.id]?.action).length

    const next = nextTask
      ? { href: nextTask.href || '#/roadmap', label: tr(nextTask.label) }
      : !drillBest
      ? { href: '#/drill', label: t('drill.title') }
      : casesDone < CASES.length
        ? { href: `#/cases/${CASES.find((c) => !caseState[c.id]?.done).id}`, label: tr(CASES.find((c) => !caseState[c.id]?.done).title) }
        : { href: '#/fit', label: t('fit.title') }

    root.innerHTML = `
      <header class="page-head">
        <h1 class="display">${esc(t('dash.hello', { name: user.name }))}</h1>
        <p class="muted">${esc(t('dash.sub'))}</p>
      </header>
      <section class="stats">
        ${stat(t('dash.drillBest'), drillBest, '#/drill')}
        ${stat(t('dash.casesDone'), `${casesDone} / ${CASES.length}`, '#/cases')}
        ${stat(t('dash.fitDone'), `${fitDone} / ${QUESTIONS.length}`, '#/fit')}
        ${stat(t('dash.testsBest'), `${testBest.numerical ?? '–'} / ${TESTS.numerical.questions.length}`, '#/tests')}
      </section>
      <a class="panel roadmap-banner" href="#/roadmap">
        ${plan.start ? `
          <span class="eyebrow">${esc(t('dash.roadmap', { n: week.week }))}</span>
          <span class="next-label">${esc(tr(week.title))}</span>
          <span class="bar"><span style="width:${(weekDone / week.tasks.length) * 100}%"></span></span>
          <span class="muted mono">${esc(t('dash.roadmapTasks', { done: weekDone, total: week.tasks.length }))}</span>`
        : `<span class="eyebrow">${esc(t('roadmap.title'))}</span><span>${esc(t('dash.roadmapStart'))}</span>`}
      </a>
      <section class="grid-2">
        <article class="panel accent">
          <h2 class="eyebrow">${esc(t('dash.next'))}</h2>
          <p class="next-label">${esc(next.label)}</p>
          <a class="btn" href="${next.href}">${esc(t('dash.go'))}</a>
        </article>
        <article class="panel">
          <h2 class="eyebrow">${esc(t('dash.recent'))}</h2>
          ${activity.length ? `<ul class="activity">${activity.map((a) => `
            <li><span>${esc(a.label)}</span><span class="mono">${a.score ?? ''}</span><time>${new Date(a.at).toLocaleDateString()}</time></li>`).join('')}</ul>`
            : `<p class="muted">${esc(t('dash.none'))}</p>`}
        </article>
      </section>`
  })()
}

function stat(label, value, href) {
  return `<a class="stat" href="${href}"><span class="stat-value mono">${esc(value)}</span><span class="stat-label">${esc(label)}</span></a>`
}
