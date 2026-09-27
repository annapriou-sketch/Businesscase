// Progress storage: Supabase when configured, browser localStorage otherwise.
// Every record is a JSON value keyed by (module, key), mirroring the
// `progress` table in supabase/migrations.

import { getClient, currentUserId } from './supabase.js'

const LOCAL_PREFIX = 'cc_progress::'

export function storageMode() {
  return getClient() ? 'cloud' : 'local'
}

function localKey(module, key) {
  return `${LOCAL_PREFIX}${module}::${key}`
}

function readLocal(module, key) {
  try {
    const raw = localStorage.getItem(localKey(module, key))
    return raw ? JSON.parse(raw) : undefined
  } catch {
    return undefined
  }
}

function writeLocal(module, key, value) {
  try { localStorage.setItem(localKey(module, key), JSON.stringify(value)) } catch {}
}

export async function load(module, key, fallback) {
  const sb = getClient()
  const userId = sb && (await currentUserId())
  if (userId) {
    const { data, error } = await sb
      .from('progress')
      .select('value')
      .eq('user_id', userId)
      .eq('module', module)
      .eq('key', key)
      .maybeSingle()
    if (!error && data) {
      writeLocal(module, key, data.value)
      return data.value
    }
  }
  const local = readLocal(module, key)
  return local === undefined ? fallback : local
}

export async function save(module, key, value) {
  writeLocal(module, key, value)
  const sb = getClient()
  const userId = sb && (await currentUserId())
  if (!userId) return
  const { error } = await sb
    .from('progress')
    .upsert({ user_id: userId, module, key, value, updated_at: new Date().toISOString() })
  if (error) console.warn('Progress not synced:', error.message)
}

export async function logActivity(module, label, score = null) {
  const entry = { module, label, score, at: new Date().toISOString() }
  const log = readLocal('activity', 'log') || []
  log.unshift(entry)
  writeLocal('activity', 'log', log.slice(0, 50))
  const sb = getClient()
  const userId = sb && (await currentUserId())
  if (userId) await sb.from('activity').insert({ user_id: userId, module, label, score })
}

export async function recentActivity(limit = 5) {
  const sb = getClient()
  const userId = sb && (await currentUserId())
  if (userId) {
    const { data } = await sb
      .from('activity')
      .select('module,label,score,created_at')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit)
    if (data) return data.map((d) => ({ ...d, at: d.created_at }))
  }
  return (readLocal('activity', 'log') || []).slice(0, limit)
}

export function clearLocal() {
  try {
    Object.keys(localStorage)
      .filter((k) => k.startsWith(LOCAL_PREFIX) || k === 'cc_local_user')
      .forEach((k) => localStorage.removeItem(k))
  } catch {}
}
