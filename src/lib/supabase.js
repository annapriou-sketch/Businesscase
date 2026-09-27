import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

let client = null

export function getClient() {
  if (!url || !anonKey) return null
  if (!client) client = createClient(url, anonKey)
  return client
}

export async function currentUserId() {
  const sb = getClient()
  if (!sb) return null
  const { data } = await sb.auth.getSession()
  return data.session?.user?.id ?? null
}
