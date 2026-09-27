import './styles.css'
import { t, getLang, setLang } from './lib/i18n.js'
import { getUser, signOut } from './lib/auth.js'
import { getClient } from './lib/supabase.js'
import { esc } from './lib/dom.js'
import login from './views/login.js'
import dashboard from './views/dashboard.js'
import drill from './views/drill.js'
import cases from './views/cases.js'
import fit from './views/fit.js'
import profile from './views/profile.js'

const ROUTES = { dashboard, drill, cases, fit, profile }
const NAV = ['dashboard', 'drill', 'cases', 'fit', 'profile']

const app = document.getElementById('app')
let cleanup = null
let user = null

function parseHash() {
  const [name = 'dashboard', ...rest] = location.hash.replace(/^#\/?/, '').split('/')
  return { name: ROUTES[name] ? name : 'dashboard', params: rest }
}

export function navigate(path) {
  location.hash = `#/${path}`
}

async function render() {
  if (cleanup) { cleanup(); cleanup = null }
  setLang(getLang())
  user = await getUser()

  if (!user) {
    app.innerHTML = '<main class="auth-shell"></main>'
    cleanup = login(app.firstElementChild, { onDone: render }) || null
    return
  }

  const { name, params } = parseHash()
  app.innerHTML = `
    <div class="shell">
      <header class="topbar">
        <a class="brand" href="#/dashboard"><span class="brand-mark">CC</span>${esc(t('app.name'))}</a>
        <nav class="nav" aria-label="Navigation">
          ${NAV.map((n) => `<a href="#/${n}" class="nav-link${n === name ? ' is-active' : ''}">${esc(t(`nav.${n}`))}</a>`).join('')}
        </nav>
        <div class="topbar-actions">
          <button class="lang-switch" data-lang="${getLang() === 'fr' ? 'en' : 'fr'}">${getLang() === 'fr' ? 'EN' : 'FR'}</button>
          <button class="btn-ghost" data-logout>${esc(t('nav.logout'))}</button>
        </div>
      </header>
      <main class="content" id="view"></main>
    </div>`

  app.querySelector('.lang-switch').addEventListener('click', (e) => {
    setLang(e.currentTarget.dataset.lang)
    render()
  })
  app.querySelector('[data-logout]').addEventListener('click', async () => {
    await signOut()
    location.hash = ''
    render()
  })

  cleanup = ROUTES[name](app.querySelector('#view'), { user, params, navigate, refresh: render }) || null
}

window.addEventListener('hashchange', render)
getClient()?.auth.onAuthStateChange((event) => {
  if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') render()
})
render()
