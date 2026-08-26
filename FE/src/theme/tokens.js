// ─────────────────────────────────────────────────────────────
// Design tokens — ported 1:1 from the LostLink design component.
// Colors, image helpers and the small style helpers that repeat
// across every screen live here so pages stay declarative.
// ─────────────────────────────────────────────────────────────

export const c = {
  bg: '#F4F6FA',
  bgOuter: '#E7ECF3',

  ink: '#16233A',
  ink2: '#3C4A61',
  muted: '#5A6980',
  muted2: '#8494A8',
  muted3: '#9AA7B8',

  line: '#DFE5EE',
  line2: '#EDF1F7',
  soft: '#F8FAFC',
  chip: '#EDF1F7',

  blue: '#2E6DB4',
  blueDark: '#1B3358',
  blueHover: '#1E4E86',
  blueInk: '#1B4A7E',
  blueSoft: '#E7F0FB',
  blueLine: '#C6DCF3',
  blueText: '#3B5B80',

  red: '#B5455C',
  redSoft: '#FCEAEC',
  redLine: '#F0CBD2',
  redInk: '#9A3348',

  amber: '#A67B12',
  amberSoft: '#FCF4E6',
  amberLine: '#F2E4C6',
  amberInk: '#7A5A14',
  star: '#E0A33C',

  green: '#2F7D5B',
  greenSoft: '#E6F2EC',
};

// Placeholder imagery — deterministic per seed so a post keeps its photo.
export const IMG = (seed, n = 400) => `https://picsum.photos/seed/${seed}/${n}/${n}`;

// A fixed-size cover-photo box.
export const PHOTO = (url, w, h, r) => ({
  width: w,
  height: h,
  borderRadius: r,
  flexShrink: 0,
  background: `#EDF1F7 url(${url}) center/cover no-repeat`,
});

export const BADGE_LABEL = { lost: 'MẤT ĐỒ', found: 'NHẶT ĐƯỢC' };

// Lost / found pill.
export const badgeStyle = (type) => ({
  height: 24,
  padding: '0 11px',
  borderRadius: 99,
  background: type === 'lost' ? c.redSoft : c.blueSoft,
  color: type === 'lost' ? c.red : c.blue,
  fontSize: 10.5,
  fontWeight: 700,
  display: 'flex',
  alignItems: 'center',
  letterSpacing: '.02em',
  whiteSpace: 'nowrap',
  flexShrink: 0,
});

// Lifecycle status pill — tone: 'ok' | 'warn' | 'idle'.
export const statusStyle = (tone) => ({
  height: 24,
  padding: '0 11px',
  borderRadius: 99,
  fontSize: 10.5,
  fontWeight: 600,
  display: 'flex',
  alignItems: 'center',
  ...(tone === 'ok'
    ? { background: c.blueSoft, color: c.blue }
    : tone === 'warn'
      ? { background: c.amberSoft, color: c.amber }
      : { background: c.chip, color: c.muted }),
});

// Filter / selection chip.
export const chipStyle = (on) => ({
  height: 32,
  padding: '0 14px',
  borderRadius: 99,
  fontSize: 11.5,
  fontWeight: 500,
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  ...(on ? { background: c.blue, color: '#fff' } : { background: c.chip, color: c.ink2 }),
});

// Small section label (uppercase eyebrow).
export const eyebrow = {
  fontSize: 10.5,
  fontWeight: 600,
  color: c.muted2,
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
  marginBottom: 10,
};

// White surface card.
export const card = {
  background: '#fff',
  border: `1px solid ${c.line}`,
  borderRadius: 12,
};
