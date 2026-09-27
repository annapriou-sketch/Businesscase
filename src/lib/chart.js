// Minimal SVG charts for case exhibits: grouped bars or lines.
// chart = { type: 'bar' | 'line', unit, labels: [..], series: [{ name, values }],
//           reference?: { value, label } }  — text fields may be { fr, en }.

import { esc } from './dom.js'

const W = 640
const H = 280
const PAD = { top: 24, right: 16, bottom: 44, left: 64 }

function niceStep(range) {
  const raw = range / 4
  const exp = 10 ** Math.floor(Math.log10(raw))
  const f = raw / exp
  return (f <= 1 ? 1 : f <= 2 ? 2 : f <= 2.5 ? 2.5 : f <= 5 ? 5 : 10) * exp
}

export function renderChart(chart, tr, fmt) {
  const all = chart.series.flatMap((s) => s.values).concat(chart.reference ? [chart.reference.value] : [])
  // Bars always start at zero; lines zoom on the data range to show the trend.
  const hi = Math.max(...all)
  const lo = chart.type === 'line' ? Math.min(...all) : 0
  const step = niceStep((hi - lo) * 1.1 || hi)
  const min = chart.type === 'line' ? Math.max(0, Math.floor((lo - step / 2) / step) * step) : 0
  const max = Math.ceil((hi + step / 4) / step) * step
  const plotW = W - PAD.left - PAD.right
  const plotH = H - PAD.top - PAD.bottom
  const y = (v) => PAD.top + plotH - ((v - min) / (max - min)) * plotH
  const n = chart.labels.length
  const band = plotW / n
  const x = (i) => PAD.left + band * i + band / 2
  const unit = chart.unit ? ` ${chart.unit}` : ''

  const tickValues = []
  for (let v = min; v <= max + step / 1000; v += step) tickValues.push(v)
  const ticks = tickValues.map((v) => {
    return `<g class="chart-tick"><line x1="${PAD.left}" x2="${W - PAD.right}" y1="${y(v)}" y2="${y(v)}"/>
      <text x="${PAD.left - 8}" y="${y(v) + 4}" text-anchor="end">${esc(fmt(v))}</text></g>`
  }).join('')

  const labels = chart.labels.map((l, i) =>
    `<text class="chart-label" x="${x(i)}" y="${H - PAD.bottom + 18}" text-anchor="middle">${esc(tr(l))}</text>`).join('')

  let marks = ''
  if (chart.type === 'line') {
    marks = chart.series.map((s, si) => {
      const pts = s.values.map((v, i) => `${x(i)},${y(v)}`).join(' ')
      return `<g class="chart-series s${si}"><polyline points="${pts}" fill="none"/>
        ${s.values.map((v, i) => `<circle cx="${x(i)}" cy="${y(v)}" r="4"><title>${esc(fmt(v) + unit)}</title></circle>
        <text class="chart-value" x="${x(i)}" y="${y(v) - 10}" text-anchor="middle">${esc(fmt(v))}</text>`).join('')}</g>`
    }).join('')
  } else {
    const k = chart.series.length
    const barW = Math.min(36, (band * 0.7) / k)
    marks = chart.series.map((s, si) => `<g class="chart-series s${si}">
      ${s.values.map((v, i) => {
        const bx = x(i) - (barW * k) / 2 + barW * si
        return `<rect x="${bx}" y="${y(v)}" width="${barW - 2}" height="${y(min) - y(v)}" rx="2"><title>${esc(fmt(v) + unit)}</title></rect>
          <text class="chart-value" x="${bx + (barW - 2) / 2}" y="${y(v) - 6}" text-anchor="middle">${esc(fmt(v))}</text>`
      }).join('')}</g>`).join('')
  }

  const ref = chart.reference ? `<g class="chart-ref">
      <line x1="${PAD.left}" x2="${W - PAD.right}" y1="${y(chart.reference.value)}" y2="${y(chart.reference.value)}"/>
      <text x="${PAD.left + 6}" y="${y(chart.reference.value) - 6}" text-anchor="start">${esc(tr(chart.reference.label))}</text></g>` : ''

  const legend = chart.series.length > 1 ? `<ul class="chart-legend">
      ${chart.series.map((s, si) => `<li><span class="swatch s${si}"></span>${esc(tr(s.name))}</li>`).join('')}
    </ul>` : ''

  return `<figure class="chart">
    ${chart.title ? `<figcaption class="eyebrow">${esc(tr(chart.title))}${unit ? ` (${esc(chart.unit)})` : ''}</figcaption>` : ''}
    <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(tr(chart.title || ''))}">${ticks}${ref}${marks}${labels}</svg>
    ${legend}
  </figure>`
}
