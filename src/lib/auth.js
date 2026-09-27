// Authentication: Supabase email/password when configured; otherwise a
// local profile (first name only) so the app runs without a backend.

import { getClient } from './supabase.js'

const LOCAL_USER_KEY = 'cc_local_user'

export async function getUser() {
  const sb = getClient()
  if (sb) {
    const { data } = await sb.auth.getSession()
    const user = data.session?.user
    if (!user) return null
    const { data: profile } = await sb.from('profiles').select('*').eq('id', user.id).maybeSingle()
    return { id: user.id, email: user.email, name: profile?.first_name || user.email.split('@')[0], targets: profile?.target_firms || '' }
  }
  try {
    return JSON.parse(localStorage.getItem(LOCAL_USER_KEY))
  } catch {
    return null
  }
}

export async function signIn(email, password) {
  const { error } = await getClient().auth.signInWithPassword({ email, password })
  if (error) throw error
}

export async function signUp(email, password, firstName) {
  const { data, error } = await getClient().auth.signUp({
    email,
    password,
    options: { data: { first_name: firstName } },
  })
  if (error) throw error
  return { needsConfirmation: !data.session }
}

export function startLocal(name) {
  const user = { id: 'local', name: name.trim() || 'Candidat', targets: '' }
  localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(user))
  return user
}

export async function updateProfile(user, fields) {
  const sb = getClient()
  if (sb) {
    const { error } = await sb
      .from('profiles')
      .update({ first_name: fields.name, target_firms: fields.targets })
      .eq('id', user.id)
    if (error) throw error
  } else {
    localStorage.setItem(LOCAL_USER_KEY, JSON.stringify({ ...user, ...fields }))
  }
}

export async function signOut() {
  const sb = getClient()
  if (sb) await sb.auth.signOut()
  else localStorage.removeItem(LOCAL_USER_KEY)
}
