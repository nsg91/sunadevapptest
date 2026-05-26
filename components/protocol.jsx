/* Suna Master Protocol — 12-practice set + data layer */

// ─── SKY SYSTEM (unchanged, re-exported) ─────
// imported from shared.jsx via window globals

// ─── 12-PRACTICE MASTER PROTOCOL ─────────────
const PRACTICES = {
  // Phase 1: Morning — The Sparks (Ignite) 06:00–11:00
  sparks: [
    { id: 'saccadicReset', name: 'Saccadic Reset', subtitle: 'Lateral eye movement',
      category: 'spark', phase: 'morning',
      description: 'Triggers optic flow, suppressing the amygdala and releasing the behavioral brake.',
      perfFlex: 'Negotiation: 20% more likely to initiate high-stakes asks.',
      mars: 'Triggers Optic Flow, suppressing the Amygdala.',
      source: 'Huberman Lab / Stanford (2021)',
      minutes: 3, type: 'somatic',
      photo: 'assets/photos/leaves-sun.jpg',
      instructions: ['Fix gaze on a point ahead', 'Move eyes smoothly left to right', 'Follow with gentle head turns', 'Let the horizon expand'],
      glowColor: '#E8A572' },
    { id: 'auricularReset', name: 'Auricular Reset', subtitle: 'Vagal ear activation',
      category: 'spark', phase: 'morning',
      description: 'Stimulates the concha — the only place the vagus nerve reaches the skin surface.',
      perfFlex: 'Improves gut motility. Increases blood flow for a natural morning glow.',
      mars: 'Stimulates the Concha for vagal activation.',
      source: 'He, W., et al. (2012)',
      minutes: 3, type: 'somatic',
      photo: 'assets/photos/ripple-flower.jpg',
      instructions: ['Gently pull outer ear upward, hold 5s', 'Pull outward, hold 5s', 'Pull earlobe down, hold 5s', 'Circular pressure on the tragus'],
      glowColor: '#D4B896' },
    { id: 'somaticShake', name: 'Somatic Shake', subtitle: 'Micro-movement discharge',
      category: 'spark', phase: 'morning',
      description: 'Resets muscle spindle fibers, discharging trapped sympathetic energy.',
      perfFlex: 'Discharges pre-meeting adrenaline. Clears sleep stiffness.',
      mars: 'Resets Muscle Spindle Fibers.',
      source: 'Levine, P.A. (1997)',
      minutes: 3, type: 'somatic',
      photo: 'assets/photos/sunset-gradient.jpg',
      instructions: ['Stand with feet hip-width apart', 'Begin shaking hands gently', 'Let the shake travel through arms and shoulders', 'Allow micro-tremors to release naturally'],
      glowColor: '#C4896A' },
    { id: 'coldPoint', name: 'Cold Point', subtitle: 'Mammalian dive reflex',
      category: 'spark', phase: 'morning',
      description: 'Triggers the mammalian dive reflex, spiking norepinephrine for alertness.',
      perfFlex: '3 hours of sharp focus. Depuffs and tightens pores.',
      mars: 'Spikes Norepinephrine via Mammalian Dive Reflex.',
      source: 'Alboni, P., et al. (2011)',
      minutes: 3, type: 'somatic',
      photo: 'assets/photos/ocean-sparkle.jpg',
      instructions: ['Apply cold water or cold object to face', 'Focus on the temples and forehead', 'Breathe slowly through the sensation', 'Notice the alertness arriving'],
      glowColor: '#7AB0C4' },
  ],
  // Phase 2: Afternoon — The Flow (Sustain) 11:00–16:00
  flow: [
    { id: 'coherentWave', name: '0.1Hz Wave', subtitle: '6 breaths per minute',
      category: 'flow', phase: 'afternoon',
      description: 'Creates autonomic coherence at 6 breaths per minute (0.1 Hz).',
      perfFlex: 'Peak emotional control. 15% less biological effort to work.',
      mars: 'Creates Autonomic Coherence at 0.1 Hz.',
      source: 'Lehrer, P.M., et al. (2003)',
      minutes: 3, type: 'breathing',
      breathPattern: { inhale: 5, exhale: 5 },
      photo: 'assets/photos/ocean-sparkle.jpg',
      instructions: ['Inhale for 5 seconds', 'Exhale for 5 seconds', 'Find the wave rhythm', 'Let coherence build naturally'],
      glowColor: '#7AC4B0' },
    { id: 'softGaze', name: 'Soft Gaze', subtitle: 'Panoramic vision shift',
      category: 'flow', phase: 'afternoon',
      description: 'Shifts from focal to panoramic vision, instantly disengaging high-alert.',
      perfFlex: 'See the big-picture strategy. Prevents brow furrows.',
      mars: 'Shifts from Focal to Panoramic Vision.',
      source: 'Vision Research Journal',
      minutes: 3, type: 'somatic',
      photo: 'assets/photos/green-bokeh.jpg',
      instructions: ['Soften your gaze — let focus blur', 'Expand awareness to peripheral vision', 'Notice space above and below sight line', 'Hold the panoramic field for 30s'],
      glowColor: '#96C4A0' },
    { id: 'butterflyHug', name: 'Butterfly Hug', subtitle: 'Bilateral stimulation',
      category: 'flow', phase: 'afternoon',
      description: 'Uses bilateral stimulation to integrate logic and creative brain hemispheres.',
      perfFlex: 'Breakthrough problem-solving. Mops up mid-day stress.',
      mars: 'Bilateral Stimulation integrates left/right brain.',
      source: 'Artigas, L. (1998) / EMDR',
      minutes: 3, type: 'somatic',
      photo: 'assets/photos/pastel-blur.jpg',
      instructions: ['Cross arms over chest, hands on shoulders', 'Alternate tapping left and right', 'Keep rhythm slow and steady', 'Close eyes and let the mind settle'],
      glowColor: '#B096C4' },
    { id: 'heartHold', name: 'Heart-Centered Hold', subtitle: 'Oxytocin activation',
      category: 'flow', phase: 'afternoon',
      description: 'Triggers oxytocin release, a biological buffer against mid-day cortisol.',
      perfFlex: 'Presence feels magnetic and trustworthy. Evens complexion.',
      mars: 'Triggers Oxytocin as a Cortisol buffer.',
      source: 'Uvnas-Moberg, K. (2003)',
      minutes: 3, type: 'somatic',
      photo: 'assets/photos/pastel-ocean.jpg',
      instructions: ['Place both hands over your heart', 'Feel the warmth build beneath your palms', 'Breathe slowly into the contact point', 'Notice the settling that follows'],
      glowColor: '#C49696' },
  ],
  // Phase 3: Evening — The Anchors (Recover) 16:00–00:00
  anchors: [
    { id: 'physioSigh', name: 'Physiological Sigh', subtitle: 'Double inhale · long exhale',
      category: 'anchor', phase: 'evening',
      description: 'Pops the alveoli to maximize CO₂ offload and lower heart rate.',
      perfFlex: 'The emergency exit for a bad day. Relaxes jaw and neck.',
      mars: 'Pops Alveoli for maximum CO₂ offload.',
      source: 'Vlemincx, E., et al. (2010)',
      minutes: 3, type: 'breathing',
      breathPattern: { inhale: 3, exhale: 8 },
      photo: 'assets/photos/dusk-gradient.jpg',
      instructions: ['Double inhale through the nose — two sniffs', 'One long exhale through the mouth', 'Let the second sniff re-inflate the lungs', 'Repeat 3–5 cycles'],
      glowColor: '#8A7EB0' },
    { id: 'birdSong', name: 'Bird Song', subtitle: 'Listen, with your eyes closed',
      category: 'anchor', phase: 'evening',
      description: 'Birdsong sits in a frequency band that promotes alpha brain waves and signals safety to the nervous system.',
      perfFlex: 'Lowers cortisol within minutes. The body reads it as: no predators here.',
      mars: 'Activates Alpha Waves via 1\u20138 kHz acoustic range.',
      source: 'Stuhlmann et al. (2022) \u00b7 Ratcliffe et al. (2013)',
      minutes: 3, type: 'soundscape',
      photo: 'assets/photos/leaves-sun.jpg',
      instructions: ['Close your eyes', 'Let the sound fill the room', 'Notice nearer and farther voices', 'That\u2019s the practice'],
      glowColor: '#7A8AB0' },
    { id: 'frontalBridge', name: 'Frontal-Occipital Bridge', subtitle: 'Prefrontal blood flow',
      category: 'anchor', phase: 'evening',
      description: 'Forces blood flow from the survival brain back to the prefrontal cortex.',
      perfFlex: 'Induces deep sleep cycles. Natural botox for the forehead.',
      mars: 'Redirects blood to Prefrontal Cortex.',
      source: 'Siegel, D.J. (2012)',
      minutes: 3, type: 'somatic',
      photo: 'assets/photos/pastel-blur.jpg',
      instructions: ['Place one hand on forehead', 'Place other hand on back of head', 'Hold gently with light pressure', 'Breathe and feel the warmth equalize'],
      glowColor: '#96A0C4' },
    { id: 'vagalHum', name: 'Vagal Hum', subtitle: 'Nitric oxide resonance',
      category: 'anchor', phase: 'evening',
      description: 'Increases nitric oxide by 15x, dilating vessels for deep recovery.',
      perfFlex: 'Clears vocal fatigue. Vibrational lymphatic drainage.',
      mars: 'Increases Nitric Oxide 15x via humming resonance.',
      source: 'Weitzberg & Lundberg (2002)',
      minutes: 3, type: 'humming',
      photo: 'assets/photos/moon-dusk.jpg',
      instructions: ['Inhale deeply through the nose', 'Hum on the exhale at a low pitch', 'Feel vibration travel throat to chest', 'Let each hum deepen naturally'],
      glowColor: '#7A6EB0' },
  ],
};

// PLAY bucket — three unmeasured practices (v2.2)
PRACTICES.play = [
  { id: 'curiosityScan', name: 'The Curiosity Scan', subtitle: 'Five things you never noticed',
    category: 'play', phase: 'play',
    description: 'Find five things in the room you\u2019ve never noticed before. Not things you haven\u2019t looked at — things that weren\u2019t there, to you, until now.',
    perfFlex: 'Norepinephrine release without the alarm. Hippocampal encoding ramps up — time slows.',
    mars: 'Activates the Locus Coeruleus via novelty detection.',
    source: 'Panksepp (1998) · Eichenbaum (2017) · Aston-Jones & Cohen (2005)',
    minutes: 3, type: 'somatic',
    photo: 'assets/photos/green-bokeh.jpg',
    instructions: ['Look around the room', 'Find one thing you\u2019ve never noticed', 'Then another. And another.', 'Stop when you find the fifth'],
    glowColor: '#C49696' },
  { id: 'foundObject', name: 'The Found Object', subtitle: 'Use it as something else',
    category: 'play', phase: 'play',
    description: 'Pick up something within arm\u2019s reach. Use it as something else. A spoon becomes a microphone. A phone becomes a bird.',
    perfFlex: 'Engages the default mode network — where spontaneous insight lives.',
    mars: 'Recruits the DMN, quiets the central executive.',
    source: 'Beaty (2016) · Christoff et al. (2016)',
    minutes: 2, type: 'somatic',
    photo: 'assets/photos/pastel-blur.jpg',
    instructions: ['Pick up something within arm\u2019s reach', 'Make it into something else', 'Speak to it. Use it. Play with it.', 'Stop when you surprise yourself'],
    glowColor: '#B096C4' },
  { id: 'danceLikeNoOne', name: 'Dance Like No One\u2019s Watching', subtitle: 'One song. No plan.',
    category: 'play', phase: 'play',
    description: 'Put on one song. Move however you want. No mirror. No phone. No plan.',
    perfFlex: '20 minutes of elevated divergent thinking afterward. Cortisol drops measurably.',
    mars: 'Recruits motor cortex + cerebellum + limbic simultaneously.',
    source: 'Koelsch (2014) · Karageorghis & Priest (2012) · Lewis & Lovatt (2013)',
    minutes: 2, type: 'soundscape',
    photo: 'assets/photos/sunset-gradient.jpg',
    instructions: ['Pick one song, don\u2019t overthink it', 'Move however you want', 'No mirror. No phone. No plan.', 'Stop when the song stops'],
    glowColor: '#E8A572' },
];

const ALL_PRACTICES = [...PRACTICES.sparks, ...PRACTICES.flow, ...PRACTICES.anchors, ...PRACTICES.play];

// Phase mapping
function getPhaseForHour(h) {
  if (h >= 6 && h < 11) return 'morning';
  if (h >= 11 && h < 16) return 'afternoon';
  return 'evening';
}
function getCategoryForPhase(phase) {
  if (phase === 'morning') return 'sparks';
  if (phase === 'afternoon') return 'flow';
  return 'anchors';
}
function getPracticesForPhase(phase) {
  return PRACTICES[getCategoryForPhase(phase)] || PRACTICES.anchors;
}
function getCategoryLabel(cat) {
  if (cat === 'sparks') return { name: 'rise', verb: 'Ignite', desc: 'Clear sleep inertia and build morning momentum.' };
  if (cat === 'flow') return { name: 'flow', verb: 'Sustain', desc: 'Lock in coherence and widen your window.' };
  if (cat === 'play') return { name: 'play', verb: 'Unmeasured', desc: 'Three practices, by design uncounted. The unmeasured minute.' };
  return { name: 'land', verb: 'Recover', desc: 'Deep parasympathetic activation for recovery.' };
}

// Priority Override Logic
function getOverridePractices(si, subjective, phase) {
  // Priority 1: Objective scan overrides
  if (si !== null && si > 150) return { practices: PRACTICES.anchors, reason: 'override_si_high',
    voice: "Your system is red-lining. Let\u2019s anchor first." };
  if (si !== null && si < 50) return { practices: PRACTICES.sparks, reason: 'override_si_low',
    voice: "Your system is running quiet. Let\u2019s spark some momentum." };
  // Priority 2: Subjective override
  if (subjective === 'brittle' || subjective === 'activated' || subjective === 'anxious')
    return { practices: PRACTICES.anchors, reason: 'override_subjective',
      voice: "I hear you. Let\u2019s steady the pulse first." };
  if (subjective === 'depleted' || subjective === 'static')
    return { practices: PRACTICES.sparks, reason: 'override_subjective',
      voice: "Let\u2019s wake the system gently." };
  // Priority 3: Default forecast
  var cat = getCategoryForPhase(phase);
  var label = getCategoryLabel(cat);
  return { practices: PRACTICES[cat], reason: 'forecast',
    voice: label.desc };
}

// SI / State mapping
function getStateFromSI(si) {
  if (si > 150) return { state: 'brittle', label: 'Brittle', color: '#C46A5A' };
  if (si > 100) return { state: 'reactive', label: 'Reactive', color: '#C49A3A' };
  if (si > 50) return { state: 'elastic', label: 'Elastic', color: '#5A8A7A' };
  return { state: 'static', label: 'Static', color: '#7A8AAA' };
}

// Capacity calculation
function calcCapacity(siBefore, siAfter) {
  if (siBefore <= 0) return 0;
  return Math.round((1 - siAfter / siBefore) * 100);
}

// Scan wisdom — sensor + breath + closer library (v2.2)
const SCAN_SENSOR = [
  "Your camera is reading 30 frames a second of light through your fingertip.",
  "The flash is the same wavelength used in hospital pulse oximeters.",
  "Each beat moves the blood in your finger. The sensor sees every one.",
  "PPG — photoplethysmography. The same tech in your Oura ring is in your phone.",
  "Your finger is bright red right now. That\u2019s how the sensor knows it\u2019s a finger.",
  "60 seconds is enough for the Baevsky Index. Astronauts used the same math in orbit.",
];
const SCAN_BREATH = [
  "Breathe like normal. The sensor is calibrating to you.",
  "Soften your jaw. Drop your shoulders. The data will show it.",
  "Lengthen the exhale. Twice as long as the inhale, if you can.",
  "Unclench your hand. Your fingertip should feel warm, not pressed.",
  "Slow it down. The sensor reads slowness as truth.",
  "Notice your feet on the floor.",
];
const SCAN_CLOSERS = [
  "One last breath. Your system is being heard.",
  "Almost there. Your nervous system has been seen.",
  "Reading you now. Hold steady.",
];
const SCAN_WISDOM = [...SCAN_SENSOR, ...SCAN_BREATH];

// Money & Performance fun facts (v2.2)
const MONEY_FACTS = [
  { id: 'negotiation', tag: 'THE NEGOTIATION GAP',
    headline: 'Anxious negotiators walk away with 30% less.',
    pull: 'the fastest ROI in your workday.',
    body: 'Wharton: anxious participants made lower first offers, accepted worse counters, exited earlier. 90 seconds of physiological sighing flips the profile.',
    source: 'Brooks & Schweitzer, 2011' },
  { id: 'trader', tag: 'THE TRADER DATA',
    headline: 'High-HRV traders outperform over months of real P&L.',
    pull: 'your heart rhythm is a market edge.',
    body: 'MIT tracked working traders. HRV predicted risk-adjusted returns better than years of experience. Regulation compounds.',
    source: 'Lo & Repin, 2002' },
  { id: 'raise', tag: 'THE RAISE',
    headline: 'Vocal prosody predicts compensation.',
    pull: 'the voice in the room is the number on the contract.',
    body: 'Speakers with flat or unregulated tone get lower offers — even when the words are identical. Hum before the call.',
    source: 'Porges, 2011' },
  { id: 'ask', tag: 'THE ASK',
    headline: '20% more likely to initiate a high-stakes ask after a Saccadic Reset.',
    pull: 'the most valuable 60 seconds of your morning.',
    body: 'Optic flow reduces amygdala activation and increases willingness to initiate. The practice most directly tied to income.',
    source: 'Huberman Lab, 2021' },
  { id: 'cortisol', tag: 'THE CORTISOL TAX',
    headline: 'Every 10% rise in cortisol drops risk-taking.',
    pull: 'the hormone that talks you out of the deal.',
    body: 'Coates and Herbert studied London traders in live markets. High-cortisol days produced conservative calls. A physiological sigh drops cortisol within minutes.',
    source: 'Coates & Herbert, 2008' },
  { id: 'recovery', tag: 'THE RECOVERY GAP',
    headline: 'Top performers come back faster after a no.',
    pull: 'not whether it happens. how fast you recover.',
    body: 'Top-percentile athletes, traders, and negotiators show shorter HRV-drop durations after a loss. Recovery speed is trainable.',
    source: 'Thayer & Lane, 2000' },
];

// State reveal girlfriend voice
const REVEAL_VOICE = {
  brittle: { headline: 'Your system is sitting a little brittle.',
    insight: 'Your tension index is high. It feels like your engine is idling at 5,000 RPMs while you\u2019re just trying to sit at your desk.',
    cta: 'Widen my window' },
  reactive: { headline: 'You\u2019re running reactive.',
    insight: 'Your system is on alert — not quite red-lining, but the dial is leaning hot. You\u2019ve got energy, but it\u2019s scattered.',
    cta: 'Steady the pulse' },
  elastic: { headline: 'You\u2019re sitting elastic.',
    insight: 'Your system has bounce. This is the sweet spot — flexible, responsive, ready. Let\u2019s lock it in.',
    cta: 'Deepen the state' },
  static: { headline: 'Your system is running quiet.',
    insight: 'Low tension, but also low momentum. Like a car in neutral — nothing wrong, just not moving yet.',
    cta: 'Spark some momentum' },
};

Object.assign(window, {
  PRACTICES, ALL_PRACTICES,
  getPhaseForHour, getCategoryForPhase, getPracticesForPhase, getCategoryLabel,
  getOverridePractices, getStateFromSI, calcCapacity,
  SCAN_WISDOM, SCAN_SENSOR, SCAN_BREATH, SCAN_CLOSERS, REVEAL_VOICE, MONEY_FACTS,
});
