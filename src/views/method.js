import { t, tr } from '../lib/i18n.js'
import { SECTIONS, FIRST_QUESTIONS, SELF_CHECK } from '../content/method.js'
import { esc } from '../lib/dom.js'

export default function method(root) {
  root.innerHTML = `
    <header class="page-head">
      <h1 class="display">${esc(t('method.title'))}</h1>
      <p class="muted">${esc(t('method.intro'))}</p>
    </header>
    <nav class="toc" aria-label="${esc(t('method.title'))}">
      ${SECTIONS.map((s) => `<a href="#/method" data-jump="${s.id}">${esc(tr(s.title))}</a>`).join('')}
      <a href="#/method" data-jump="first-questions">${esc(t('method.firstQuestions'))}</a>
      <a href="#/method" data-jump="self-check">${esc(t('method.selfCheck'))}</a>
    </nav>
    ${SECTIONS.map((s) => `
      <section class="panel stack method-section" id="m-${s.id}">
        <h2 class="case-title">${esc(tr(s.title))}</h2>
        ${s.intro ? `<p>${esc(tr(s.intro))}</p>` : ''}
        <ul class="method-list">${s.items.map((i) => `<li>${esc(tr(i))}</li>`).join('')}</ul>
      </section>`).join('')}
    <section class="panel stack method-section" id="m-first-questions">
      <h2 class="case-title">${esc(t('method.firstQuestions'))}</h2>
      <p class="muted">${esc(t('method.firstQuestionsIntro'))}</p>
      <div class="table-wrap"><table class="exhibit plain">
        <tbody>${FIRST_QUESTIONS.map((f) => `<tr><th scope="row">${esc(tr(f.type))}</th><td>${esc(tr(f.q))}</td></tr>`).join('')}</tbody>
      </table></div>
    </section>
    <section class="panel stack method-section" id="m-self-check">
      <h2 class="case-title">${esc(t('method.selfCheck'))}</h2>
      <p class="muted">${esc(t('method.selfCheckIntro'))}</p>
      <ul class="tasks">${SELF_CHECK.map((c, i) => `
        <li><label class="check"><input type="checkbox" id="sc-${i}"><span>${esc(tr(c))}</span></label></li>`).join('')}
      </ul>
      <a class="btn" href="#/cases">${esc(t('method.practice'))}</a>
    </section>
    <p class="muted source">${esc(t('method.source'))}</p>`

  root.querySelectorAll('[data-jump]').forEach((a) => a.addEventListener('click', (e) => {
    e.preventDefault()
    document.getElementById(`m-${a.dataset.jump}`).scrollIntoView({ behavior: 'smooth', block: 'start' })
  }))
}
