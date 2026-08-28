// ─────────────────────────────────────────────────────────────
// Auth design tokens — the dark "galaxy" palette for the sign-in flow.
// Ported 1:1 from the LostLink Auth design component. The rest of the
// app runs on the light theme in ./tokens.js; the auth screens are a
// self-contained dark surface, so their colors + shared field/button
// styles live separately here. Focus / hover / placeholder states that
// inline styles can't express live in ./auth.css.
// ─────────────────────────────────────────────────────────────

export const a = {
  ink: '#EAF1FB',
  bgTop: '#050B16',
  bgDeep: '#0B1727',

  accent: '#6EA8FF', // focus ring + active tab underline
  link: '#8FBBFF',
  linkHover: '#C8DEFF',
  star: '#A9CCFF',

  // Translucent glass surfaces over the starfield.
  panel: 'rgba(255,255,255,.075)',
  panelLine: 'rgba(255,255,255,.16)',
  fieldBg: 'rgba(255,255,255,.06)',
  fieldLine: 'rgba(255,255,255,.16)',
  hair: 'rgba(255,255,255,.14)',

  // Text tints over the dark panel.
  dim: 'rgba(234,241,251,.62)',
  dim2: 'rgba(234,241,251,.6)',
  dim3: 'rgba(234,241,251,.55)',
  dim4: 'rgba(234,241,251,.5)',
  faint: 'rgba(234,241,251,.45)',
}
