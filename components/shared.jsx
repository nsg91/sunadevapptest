/* Suna — shared utilities, sky system, photography mapping */

// ────────────────────────────────────────────────────────────────
// SKY — time-of-day palette (tuned for dreamy photo overlays)
// ────────────────────────────────────────────────────────────────
const SKY = {
  deepNight: {
    id: 'deepNight', phase: 'Deep Night',
    greeting: (n) => `Rest holds you, ${n}.`,
    photo: 'assets/photos/moon-dusk.jpg',
    tint: 'linear-gradient(180deg, rgba(10,16,36,0.55) 0%, rgba(14,10,28,0.82) 100%)',
    txt: 'rgba(248,244,255,0.92)', sub: 'rgba(200,200,230,0.62)',
    fp: '#C7B9E8', fpSoft: 'rgba(199,185,232,0.22)',
    accent: '#B8A6E0',
    navBg: 'rgba(12,10,26,0.55)', card: 'rgba(255,255,255,0.07)', border: 'rgba(255,255,255,0.12)',
    dark: true,
  },
  sunrise: {
    id: 'sunrise', phase: 'Sunrise',
    greeting: (n) => `The light is arriving, ${n}.`,
    photo: 'assets/photos/sunset-gradient.jpg',
    tint: 'linear-gradient(180deg, rgba(180,200,232,0.15) 0%, rgba(232,180,150,0.22) 60%, rgba(212,130,90,0.35) 100%)',
    txt: 'rgba(60,40,30,0.92)', sub: 'rgba(110,80,60,0.72)',
    fp: '#B85A2E', fpSoft: 'rgba(184,90,46,0.14)',
    accent: '#D18263',
    navBg: 'rgba(255,240,222,0.58)', card: 'rgba(255,252,246,0.45)', border: 'rgba(120,80,50,0.14)',
    dark: false,
  },
  morning: {
    id: 'morning', phase: 'Morning',
    greeting: (n) => `How are you meeting this morning, ${n}?`,
    photo: 'assets/photos/leaves-sun.jpg',
    tint: 'linear-gradient(180deg, rgba(248,240,220,0.34) 0%, rgba(230,222,198,0.48) 100%)',
    txt: 'rgba(38,30,22,0.92)', sub: 'rgba(86,72,56,0.72)',
    fp: '#5A4A30', fpSoft: 'rgba(90,74,48,0.12)',
    accent: '#8B7348',
    navBg: 'rgba(238,228,210,0.62)', card: 'rgba(255,252,244,0.52)', border: 'rgba(90,74,48,0.14)',
    dark: false,
  },
  goldenNoon: {
    id: 'goldenNoon', phase: 'Golden Noon',
    greeting: (n) => `The day is bright, ${n}.`,
    photo: 'assets/photos/ocean-sparkle.jpg',
    tint: 'linear-gradient(180deg, rgba(210,228,228,0.25) 0%, rgba(180,208,208,0.48) 100%)',
    txt: 'rgba(30,40,46,0.92)', sub: 'rgba(70,92,102,0.72)',
    fp: '#35626B', fpSoft: 'rgba(53,98,107,0.14)',
    accent: '#5A8A92',
    navBg: 'rgba(216,230,230,0.62)', card: 'rgba(245,250,250,0.52)', border: 'rgba(53,98,107,0.16)',
    dark: false,
  },
  afternoon: {
    id: 'afternoon', phase: 'Afternoon',
    greeting: (n) => `The day holds you, ${n}.`,
    photo: 'assets/photos/green-bokeh.jpg',
    tint: 'linear-gradient(180deg, rgba(230,238,220,0.45) 0%, rgba(218,228,206,0.6) 100%)',
    txt: 'rgba(32,40,28,0.92)', sub: 'rgba(68,82,58,0.72)',
    fp: '#4A6A3E', fpSoft: 'rgba(74,106,62,0.12)',
    accent: '#5A8A4A',
    navBg: 'rgba(228,236,218,0.65)', card: 'rgba(255,255,255,0.48)', border: 'rgba(74,106,62,0.14)',
    dark: false,
  },
  goldenHour: {
    id: 'goldenHour', phase: 'Golden Hour',
    greeting: (n) => `The day is turning, ${n}.`,
    photo: 'assets/photos/dusk-gradient.jpg',
    tint: 'linear-gradient(180deg, rgba(250,238,220,0.35) 0%, rgba(245,225,200,0.55) 100%)',
    txt: 'rgba(60,38,22,0.92)', sub: 'rgba(110,75,50,0.72)',
    fp: '#A06830', fpSoft: 'rgba(160,104,48,0.14)',
    accent: '#C48850',
    navBg: 'rgba(248,234,216,0.65)', card: 'rgba(255,252,244,0.5)', border: 'rgba(160,104,48,0.14)',
    dark: false,
  },
  dusk: {
    id: 'dusk', phase: 'Dusk',
    greeting: (n) => `The evening opens, ${n}.`,
    photo: 'assets/photos/moon-dusk.jpg',
    tint: 'linear-gradient(180deg, rgba(240,230,238,0.4) 0%, rgba(228,216,226,0.58) 100%)',
    txt: 'rgba(48,32,46,0.92)', sub: 'rgba(98,72,90,0.72)',
    fp: '#7A4A6A', fpSoft: 'rgba(122,74,106,0.14)',
    accent: '#A06888',
    navBg: 'rgba(238,226,234,0.65)', card: 'rgba(255,250,252,0.48)', border: 'rgba(122,74,106,0.14)',
    dark: false,
  },
  night: {
    id: 'night', phase: 'Night',
    greeting: (n) => `Rest is near, ${n}.`,
    photo: 'assets/photos/moon-dusk.jpg',
    tint: 'linear-gradient(180deg, rgba(10,14,32,0.62) 0%, rgba(8,10,22,0.88) 100%)',
    txt: 'rgba(244,244,255,0.88)', sub: 'rgba(190,196,220,0.6)',
    fp: '#9EA9D4', fpSoft: 'rgba(158,169,212,0.16)',
    accent: '#8B97C8',
    navBg: 'rgba(8,10,24,0.62)', card: 'rgba(255,255,255,0.06)', border: 'rgba(180,192,232,0.12)',
    dark: true,
  },
};

const SKY_ORDER = ['deepNight', 'sunrise', 'morning', 'goldenNoon', 'afternoon', 'goldenHour', 'dusk', 'night'];

// Practice cover imagery, mapped by exercise id
const PRACTICE_PHOTO = {
  physiologicalSigh: 'assets/photos/ocean-sparkle.jpg',
  vagalRelease:      'assets/photos/ripple-flower.jpg',
  groundingSoundscape:'assets/photos/pastel-blur.jpg',
  solarBreath:       'assets/photos/sunset-gradient.jpg',
  horizonView:       'assets/photos/leaves-sun.jpg',
  vagalWakeup:       'assets/photos/pastel-ocean.jpg',
  boxBreath:         'assets/photos/ocean-sparkle.jpg',
  spatialSoundscape: 'assets/photos/green-bokeh.jpg',
  leftNostrilBreath: 'assets/photos/moon-dusk.jpg',
  extendedExhale:    'assets/photos/dusk-gradient.jpg',
  deepDeltaHum:      'assets/photos/moon-dusk.jpg',
};

// ────────────────────────────────────────────────────────────────
// DATA — exercises (pared from exercises.ts)
// ────────────────────────────────────────────────────────────────
const EXERCISES = [
  { id: 'physiologicalSigh', name: 'Physiological Sigh', subtitle: 'Double inhale · Long exhale',
    description: 'Offload CO₂ and lower heart rate in under sixty seconds.',
    type: 'breathing', goals: ['land'], phases: ['morning','midday'],
    minutes: 2, pattern: '3 · 8', ritualLine: 'a sigh is the body\u2019s own release' },
  { id: 'vagalRelease', name: 'Vagal Release', subtitle: 'Somatic ear massage',
    description: 'Calm the system without breathwork \u2014 for when you\u2019re too wired to breathe.',
    type: 'somatic', goals: ['land'], phases: ['morning','midday'],
    minutes: 3, pattern: 'hands · skin · nerve', ritualLine: 'the nerve runs just behind the ear' },
  { id: 'groundingSoundscape', name: 'Grounding Soundscape', subtitle: 'Heavy rain · brown noise',
    description: 'Low-frequency weight to anchor an overstimulated system.',
    type: 'soundscape', goals: ['land'], phases: ['morning','midday'],
    minutes: 5, pattern: 'low end', ritualLine: 'let the rain carry the noise' },
  { id: 'solarBreath', name: 'Solar Breath', subtitle: 'Inhale 6 · Hold 2 · Exhale 4',
    description: 'Clear sleep inertia without triggering the alarm.',
    type: 'breathing', goals: ['rise'], phases: ['morning'],
    minutes: 3, pattern: '6 · 2 · 4', ritualLine: 'your morning ignition' },
  { id: 'horizonView', name: 'Horizon View', subtitle: 'Dawn forest soundscape',
    description: 'An auditory signal that the day has safely begun.',
    type: 'soundscape', goals: ['rise'], phases: ['morning'],
    minutes: 5, pattern: 'far \u2192 near', ritualLine: 'notice the farthest birds' },
  { id: 'vagalWakeup', name: 'Vagal Wake-Up', subtitle: 'Vocal humming slide',
    description: 'Gently wake the gut\u2010brain axis through vibration.',
    type: 'humming', goals: ['rise'], phases: ['morning'],
    minutes: 2, pattern: 'slide up · slide down', ritualLine: 'hum through the chest' },
  { id: 'boxBreath', name: 'Box Breath', subtitle: 'Inhale 4 · Hold 4 · Exhale 4 · Hold 4',
    description: 'Calm alertness for mid-day transitions and decisions.',
    type: 'breathing', goals: ['hold'], phases: ['midday'],
    minutes: 4, pattern: '4 · 4 · 4 · 4', ritualLine: 'find the still point' },
  { id: 'spatialSoundscape', name: '3D Soundscape', subtitle: 'Spatial birdsong',
    description: 'Break the inward loop of decision fatigue.',
    type: 'soundscape', goals: ['hold','land'], phases: ['midday'],
    minutes: 4, pattern: '360\u00b0 field', ritualLine: 'seek the farthest sounds' },
  { id: 'leftNostrilBreath', name: 'Left-Nostril Breath', subtitle: 'Parasympathetic activation',
    description: 'A somatic tool that directly engages the rest circuit.',
    type: 'breathing', goals: ['land'], phases: ['evening'],
    minutes: 5, pattern: '5 · 2 · 7', ritualLine: 'the body\u2019s rest circuit' },
  { id: 'extendedExhale', name: 'Extended Exhale', subtitle: 'Inhale 4 · Exhale 8',
    description: 'Signal the heart that it is safe to slow down.',
    type: 'breathing', goals: ['land'], phases: ['evening'],
    minutes: 5, pattern: '4 · 8', ritualLine: 'release what the day carried' },
  { id: 'deepDeltaHum', name: 'Deep Delta Hum', subtitle: 'Low-frequency chest resonance',
    description: 'Profound vagal stimulation for sleep preparation.',
    type: 'humming', goals: ['land'], phases: ['evening'],
    minutes: 5, pattern: 'lowest pitch', ritualLine: 'feel the resonance in your chest' },
];

const STATE_CHIPS = [
  { label: 'Reactive', micro: 'fight · flight',  color: '#c4725a', goals: ['land'] },
  { label: 'Anxious',  micro: 'mind racing',      color: '#a87a9a', goals: ['land'] },
  { label: 'Wired',    micro: 'wired · tired',    color: '#c49a3a', goals: ['land'] },
  { label: 'Open',     micro: 'calm · present',   color: '#5a8a7a', goals: ['hold','rise'] },
  { label: 'Dimmed',   micro: 'flat · foggy',     color: '#7a8aaa', goals: ['rise','hold'] },
  { label: 'Stuck',    micro: 'shutdown',         color: '#8a7a6a', goals: ['rise'] },
];

const CHIP_HEADER = {
  Reactive: { title: 'Soften the Charge', sub: 'Slow the system and let the static dissolve.' },
  Anxious:  { title: 'Clear the Static',  sub: 'Gentle regulation to untangle the overload, one breath at a time.' },
  Wired:    { title: 'Land the Alarm',    sub: 'The body is bracing. Let it know the moment is safe.' },
  Open:     { title: 'Deepen the State',  sub: 'You\u2019re open. Sustain it, or raise the ceiling.' },
  Dimmed:   { title: 'Lift Your Current', sub: 'Wake the biology gently, without triggering the alarm.' },
  Stuck:    { title: 'Invite Movement',   sub: 'A small somatic door back into the body.' },
};

const GOAL_META = {
  land: { label: 'Land',  micro: 'down-regulate', accent: '#7a8aaa' },
  rise: { label: 'Rise',  micro: 'up-regulate',   accent: '#c49a3a' },
  hold: { label: 'Hold',  micro: 'sustain',       accent: '#5a8a7a' },
};

const TYPE_GLYPH = { breathing: '◎', somatic: '◐', soundscape: '✦', humming: '♫' };

// ────────────────────────────────────────────────────────────────
// Small display pieces
// ────────────────────────────────────────────────────────────────
const Eyebrow = ({ children, color, style = {} }) => (
  <div style={{
    fontSize: 9, fontWeight: 300, letterSpacing: '0.28em', textTransform: 'uppercase',
    color, opacity: 0.82, ...style,
  }}>{children}</div>
);

const Serif = ({ children, size = 26, italic = false, weight = 300, color, style = {} }) => (
  <span style={{
    fontFamily: "'Cormorant Garamond', serif",
    fontStyle: italic ? 'italic' : 'normal',
    fontWeight: weight, fontSize: size, color,
    letterSpacing: '-0.005em', lineHeight: 1.18, ...style,
  }}>{children}</span>
);

// Fingerprint concentric arcs
const FpGlyph = ({ color = 'currentColor', size = 48, opacity = 0.65 }) => (
  <svg width={size} height={size} viewBox="0 0 72 72" fill="none" style={{ opacity }}>
    <path d="M36 10C20 10 8 22 8 38C8 52 18 64 36 64C54 64 64 52 64 38C64 22 52 10 36 10" stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
    <path d="M36 18C24 18 15 27 15 38C15 49 23 57 36 57C49 57 57 49 57 38C57 27 48 18 36 18" stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
    <path d="M36 26C28 26 22 32 22 38C22 45 28 50 36 50C44 50 50 45 50 38C50 32 44 26 36 26" stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
    <path d="M36 34C33 34 30 36 30 38C30 41 32 43 36 43C40 43 42 41 42 38C42 36 39 34 36 34" stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
    <circle cx="36" cy="38" r="2" fill={color} />
  </svg>
);

// Soft photo backdrop with dreamy bokeh layering + color tint
function DreamyBackdrop({ sky, intensity = 1, photoOverride, children }) {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      {/* base photo */}
      <div style={{
        position: 'absolute', inset: -30,
        backgroundImage: `url(${photoOverride || sky.photo})`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        filter: `blur(${24 / intensity}px) saturate(115%)`,
        transform: 'scale(1.15)',
      }} />
      {/* tint */}
      <div style={{ position: 'absolute', inset: 0, background: sky.tint, mixBlendMode: 'soft-light' }} />
      <div style={{ position: 'absolute', inset: 0, background: sky.tint, opacity: 0.58 }} />
      {/* specular bloom */}
      <div style={{
        position: 'absolute', top: '-10%', left: '-10%', right: '-10%', height: '55%',
        background: 'radial-gradient(ellipse at 50% 20%, rgba(255,255,255,0.22), transparent 62%)',
        mixBlendMode: 'screen', pointerEvents: 'none',
      }} />
      {/* grain */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.09, mixBlendMode: 'overlay',
        backgroundImage: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'160\' height=\'160\'><filter id=\'n\'><feTurbulence baseFrequency=\'0.9\' numOctaves=\'2\' stitchTiles=\'stitch\'/></filter><rect width=\'100%\' height=\'100%\' filter=\'url(%23n)\'/></svg>")',
      }} />
      {children}
    </div>
  );
}

Object.assign(window, {
  SKY, SKY_ORDER, PRACTICE_PHOTO, EXERCISES, STATE_CHIPS, CHIP_HEADER, GOAL_META, TYPE_GLYPH,
  Eyebrow, Serif, FpGlyph, DreamyBackdrop,
});
