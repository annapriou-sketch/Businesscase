// Minimal helpers: HTML escaping and element creation from templates.

export function esc(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export function html(strings, ...values) {
  return strings.reduce((out, s, i) => out + s + (i < values.length ? values[i] : ''), '')
}

export function $(selector, root = document) {
  return root.querySelector(selector)
}

export function $$(selector, root = document) {
  return [...root.querySelectorAll(selector)]
}
