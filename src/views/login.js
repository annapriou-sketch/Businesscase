import { t, getLang, setLang } from '../lib/i18n.js'
import { signIn, signUp, startLocal } from '../lib/auth.js'
import { getClient } from '../lib/supabase.js'
import { esc } from '../lib/dom.js'

export default function login(root, { onDone }) {
  let mode = 'signin'

  function draw(message = '') {
    const cloud = !!getClient()
    root.innerHTML = `
      <section class="auth-card">
        <div class="auth-head">
          <span class="brand-mark big">CC</span>
          <button class="lang-switch" data-lang="${getLang() === 'fr' ? 'en' : 'fr'}">${getLang() === 'fr' ? 'EN' : 'FR'}</button>
        </div>
        <h1 class="display">${esc(t('app.name'))}</h1>
        <p class="muted">${esc(t('app.tagline'))}</p>
        ${cloud ? `
          <form class="stack" data-form>
            ${mode === 'signup' ? `<label>${esc(t('auth.name'))}<input name="name" required autocomplete="given-name"></label>` : ''}
            <label>${esc(t('auth.email'))}<input name="email" type="email" required autocomplete="email"></label>
            <label>${esc(t('auth.password'))}<input name="password" type="password" required minlength="8" autocomplete="${mode === 'signup' ? 'new-password' : 'current-password'}"></label>
            <button class="btn" type="submit">${esc(t(mode === 'signup' ? 'auth.signup' : 'auth.signin'))}</button>
            <button class="link" type="button" data-toggle>${esc(t(mode === 'signup' ? 'auth.toggleSignin' : 'auth.toggleSignup'))}</button>
          </form>` : `
          <p class="notice">${esc(t('auth.localMode'))}</p>
          <form class="stack" data-form>
            <label>${esc(t('auth.name'))}<input name="name" required autocomplete="given-name"></label>
            <button class="btn" type="submit">${esc(t('auth.start'))}</button>
          </form>`}
        ${message ? `<p class="form-message" role="status">${esc(message)}</p>` : ''}
      </section>`

    root.querySelector('.lang-switch').addEventListener('click', (e) => {
      setLang(e.currentTarget.dataset.lang)
      draw()
    })
    root.querySelector('[data-toggle]')?.addEventListener('click', () => {
      mode = mode === 'signin' ? 'signup' : 'signin'
      draw()
    })
    root.querySelector('[data-form]').addEventListener('submit', async (e) => {
      e.preventDefault()
      const data = Object.fromEntries(new FormData(e.currentTarget))
      try {
        if (!cloud) {
          startLocal(data.name)
          return onDone()
        }
        if (mode === 'signup') {
          const { needsConfirmation } = await signUp(data.email, data.password, data.name)
          if (needsConfirmation) return draw(t('auth.checkEmail'))
        } else {
          await signIn(data.email, data.password)
        }
        onDone()
      } catch (err) {
        draw(err.message)
      }
    })
  }

  draw()
}
