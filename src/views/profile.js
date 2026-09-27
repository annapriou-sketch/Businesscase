import { t, getLang, setLang } from '../lib/i18n.js'
import { updateProfile } from '../lib/auth.js'
import { storageMode, clearLocal } from '../lib/store.js'
import { esc } from '../lib/dom.js'

export default function profile(root, { user, refresh }) {
  const mode = storageMode()
  root.innerHTML = `
    <header class="page-head"><h1 class="display">${esc(t('profile.title'))}</h1></header>
    <section class="panel narrow">
      <form class="stack" data-form>
        <label>${esc(t('profile.name'))}<input name="name" value="${esc(user.name)}" required></label>
        <label>${esc(t('profile.target'))}<input name="targets" value="${esc(user.targets || '')}" placeholder="McKinsey, BCG, Bain…"></label>
        <label>${esc(t('profile.lang'))}
          <select name="lang">
            <option value="fr"${getLang() === 'fr' ? ' selected' : ''}>Français</option>
            <option value="en"${getLang() === 'en' ? ' selected' : ''}>English</option>
          </select>
        </label>
        <button class="btn" type="submit">${esc(t('profile.save'))}</button>
      </form>
      <p class="muted">${esc(t('profile.storage', { mode: t(`profile.storage.${mode}`) }))}</p>
      ${mode === 'local' ? `<button class="btn-danger" data-reset>${esc(t('profile.reset'))}</button>` : ''}
    </section>`

  root.querySelector('[data-form]').addEventListener('submit', async (e) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.currentTarget))
    setLang(data.lang)
    await updateProfile(user, { name: data.name, targets: data.targets })
    refresh()
  })
  root.querySelector('[data-reset]')?.addEventListener('click', () => {
    if (confirm(t('profile.resetConfirm'))) {
      clearLocal()
      refresh()
    }
  })
}
