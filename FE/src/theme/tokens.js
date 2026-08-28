// ─────────────────────────────────────────────────────────────
// Design tokens. The full palette now lives as Tailwind @theme
// variables in ./global.css (utilities like `bg-blue`, `text-ink`),
// and the repeated surface/pill helpers became component classes
// (`card`, `badge`, `chip`, `eyebrow`) there too. What remains here
// is the runtime bits Tailwind classes can't express: the `c` color
// map (still handy for computed inline colors) plus the dynamic
// image helpers.
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
