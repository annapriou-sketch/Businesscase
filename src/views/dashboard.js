import { t, tr } from '../lib/i18n.js'
import { load, recentActivity } from '../lib/store.js'
import { esc } from '../lib/dom.js'
import CASES from '../content/cases.js'
import { QUESTIONS } from '../content/fit.js'

export default function dashboard(root, { user }) {
  root.innerHTML = `<p class="muted">…</p>`

  ;(async () => {
    const [drillBest, caseState, fitAnswers, activity] = await Promise.all([
      load('drill', 'best', 0),
      load('cases', 'state', {}),
      load('fit', 'answers', {}),
      recentActivity(6),
    ])
    const casesDone = CASES.filter((c) => caseState[c.id]?.done).length
    const fitDone = QUESTIONS.filter((q) => fitAnswers[q.id]?.action).length

    const next = !drillBest
      ? { href: '#/drill', label: t('nav.drill') }
      : casesDone < CASES.length
        ? { href: `#/cases/${CASES.find((c) => !caseState[c.id]?.done).id}`, label: tr(CASES.find((c) => !caseState[c.id]?.done).title) }
        : { href: '#/fit', label: t('nav.fit') }

    root.innerHTML = `
      <header class="page-head">
        <h1 class="display">${esc(t('dash.hello', { name: user.name }))}</h1>
        <p class="muted">${esc(t('dash.sub'))}</p>
      </header>
      <section class="stats">
        ${stat(t('dash.drillBest'), drillBest, '#/drill')}
        ${stat(t('dash.casesDone'), `${casesDone} / ${CASES.length}`, '#/cases')}
        ${stat(t('dash.fitDone'), `${fitDone} / ${QUESTIONS.length}`, '#/fit')}
      </section>
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
