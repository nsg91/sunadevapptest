/* Practice Visualizations — unique interactive element per practice ID */

// 1. Saccadic Reset — moving dot to follow with eyes
function VisSaccadic({ gc, sky, active }) {
  var [pos, setPos] = React.useState(0);
  React.useEffect(function() {
    if (!active) return;
    var t = setInterval(function() { setPos(function(p) { return (p + 1) % 100; }); }, 30);
    return function() { clearInterval(t); };
  }, [active]);
  var x = 50 + Math.sin(pos * 0.063) * 42;
  var y = 50 + Math.cos(pos * 0.04) * 15;
  return (
    <div style={{ width: 220, height: 120, position: 'relative', margin: '0 auto' }}>
      {/* track line */}
      <svg width="220" height="120" viewBox="0 0 100 100" style={{ position: 'absolute', inset: 0 }}>
        <path d="M8 50 Q50 20 92 50 Q50 80 8 50" fill="none" stroke={gc + '30'} strokeWidth="0.5" />
      </svg>
      {/* moving dot */}
      <div style={{
        position: 'absolute',
        left: (x * 2.2) + 'px', top: (y * 1.2) + 'px',
        width: 16, height: 16, borderRadius: '50%',
        background: gc, boxShadow: '0 0 20px ' + gc + ', 0 0 40px ' + gc + '60',
        transform: 'translate(-50%, -50%)',
        transition: 'left 0.03s linear, top 0.03s linear',
      }} />
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, textAlign: 'center',
        fontSize: 9, fontWeight: 500, letterSpacing: '0.28em', textTransform: 'uppercase',
        color: sky.sub, opacity: 0.7,
      }}>Follow with your eyes</div>
    </div>
  );
}

// 2. Auricular Reset — ear diagram with tap points
function VisAuricular({ gc, sky, active, stepIdx }) {
  // anatomically-inspired ear with named landmarks — recognizable side-view ear
  var points = [
    { cx: 56, cy: 22, label: 'Helix' },         // upper outer rim
    { cx: 68, cy: 50, label: 'Outer rim' },     // mid outer
    { cx: 50, cy: 82, label: 'Lobe' },          // earlobe
    { cx: 36, cy: 50, label: 'Tragus' },        // small flap by face
  ];
  return (
    <div style={{ width: 180, height: 180, position: 'relative', margin: '0 auto' }}>
      <svg width="180" height="180" viewBox="0 0 100 100">
        <defs>
          <radialGradient id="earSkin" cx="55%" cy="50%" r="60%">
            <stop offset="0%" stopColor={gc} stopOpacity="0.14" />
            <stop offset="100%" stopColor={gc} stopOpacity="0.03" />
          </radialGradient>
          <radialGradient id="earCanal" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor={gc} stopOpacity="0.32" />
            <stop offset="100%" stopColor={gc} stopOpacity="0.05" />
          </radialGradient>
        </defs>

        {/* faint head/cheek behind ear for context */}
        <path d="M22 40 C 22 28, 28 18, 42 14 L 42 90 C 28 88, 22 78, 22 70 Z"
          fill={gc + '08'} stroke={gc + '20'} strokeWidth="0.5" />

        {/* outer auricle — helix curve, classic ear silhouette */}
        <path d="M54 10
                 C 70 10, 80 22, 80 38
                 C 80 52, 72 64, 64 76
                 C 58 84, 52 90, 46 88
                 C 40 86, 38 78, 42 72
                 C 46 66, 42 60, 36 58
                 C 30 56, 28 48, 30 40
                 C 32 26, 40 12, 54 10 Z"
          fill="url(#earSkin)" stroke={gc + '85'} strokeWidth="1.3" strokeLinejoin="round" />

        {/* antihelix — Y-shaped inner ridge */}
        <path d="M54 22 C 64 26, 66 40, 60 54 C 56 64, 50 70, 46 74"
          fill="none" stroke={gc + '70'} strokeWidth="1.1" strokeLinecap="round" />
        <path d="M54 22 C 50 30, 48 38, 48 46"
          fill="none" stroke={gc + '55'} strokeWidth="0.7" strokeLinecap="round" />

        {/* concha bowl — central depression */}
        <path d="M48 42 C 58 44, 62 52, 58 62 C 54 70, 46 68, 42 60 C 40 54, 42 44, 48 42 Z"
          fill="url(#earCanal)" stroke={gc + '55'} strokeWidth="0.7" />

        {/* ear canal opening */}
        <ellipse cx="46" cy="54" rx="3" ry="2.5" fill={gc + '70'} />

        {/* tragus flap — small protrusion in front of canal */}
        <path d="M36 48 C 32 50, 32 58, 36 60 C 40 58, 40 50, 36 48 Z"
          fill={gc + '28'} stroke={gc + '70'} strokeWidth="0.8" />

        {/* antitragus — small bump below */}
        <path d="M44 70 C 42 74, 44 78, 48 76 C 50 74, 48 70, 44 70 Z"
          fill={gc + '22'} stroke={gc + '60'} strokeWidth="0.6" />

        {/* lobe — soft hanging earlobe */}
        <path d="M44 78 C 42 84, 46 90, 52 90 C 58 90, 60 84, 56 78"
          fill={gc + '15'} stroke={gc + '70'} strokeWidth="1" strokeLinecap="round" />
        {points.map(function(p, i) {
          var isActive = stepIdx === i;
          return (
            <React.Fragment key={i}>
              <circle cx={p.cx} cy={p.cy} r={isActive ? 5 : 2.4}
                fill={isActive ? gc : gc + '50'}
                stroke={isActive ? '#fff' : 'none'} strokeWidth="0.6" />
              {isActive && <circle cx={p.cx} cy={p.cy} r={10}
                fill="none" stroke={gc} strokeWidth="0.4" opacity="0.6">
                <animate attributeName="r" from="6" to="16" dur="1.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.7" to="0" dur="1.5s" repeatCount="indefinite" />
              </circle>}
            </React.Fragment>
          );
        })}
      </svg>
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, textAlign: 'center',
        fontSize: 10, fontWeight: 400, color: gc, letterSpacing: '0.08em',
      }}>{points[stepIdx] ? points[stepIdx].label : ''}</div>
    </div>
  );
}

// 3. Somatic Shake — particles that scatter on tap
function VisSomatic({ gc, sky, active }) {
  var [intensity, setIntensity] = React.useState(0);
  React.useEffect(function() {
    if (!active) return;
    var t = setInterval(function() {
      setIntensity(function(p) { return Math.min(1, p + 0.008); });
    }, 50);
    return function() { clearInterval(t); };
  }, [active]);
  return (
    <div style={{ width: 200, height: 160, position: 'relative', margin: '0 auto' }}>
      {Array.from({ length: 12 }).map(function(_, i) {
        var angle = (i / 12) * Math.PI * 2;
        var r = 30 + intensity * 35 + Math.sin(Date.now() * 0.003 + i) * 8;
        return <div key={i} style={{
          position: 'absolute',
          left: 100 + Math.cos(angle) * r, top: 80 + Math.sin(angle) * r,
          width: 4 + intensity * 3, height: 4 + intensity * 3, borderRadius: '50%',
          background: gc, opacity: 0.4 + intensity * 0.4,
          boxShadow: '0 0 ' + (6 + intensity * 10) + 'px ' + gc + '60',
          transform: 'translate(-50%, -50%)',
          animation: 'varaBreathe ' + (0.3 + Math.random() * 0.4) + 's ease-in-out infinite',
        }} />;
      })}
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: 40, height: 40, borderRadius: '50%',
        background: 'radial-gradient(circle, ' + gc + '30 0%, transparent 70%)',
        animation: 'varaPulse 0.8s ease-in-out infinite',
      }} />
    </div>
  );
}

// 4. Cold Point — temperature gauge
function VisColdPoint({ gc, sky, active, progress }) {
  var temp = active ? Math.max(0, 1 - progress * 1.2) : 1;
  var color = 'oklch(' + (0.65 + temp * 0.1) + ' ' + (0.12 + (1 - temp) * 0.08) + ' ' + (220 + temp * 30) + ')';
  return (
    <div style={{ width: 160, height: 160, position: 'relative', margin: '0 auto' }}>
      <svg width="160" height="160" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="44" fill="none" stroke={gc + '20'} strokeWidth="1" />
        <circle cx="50" cy="50" r="44" fill="none"
          stroke={gc} strokeWidth="2" strokeLinecap="round"
          strokeDasharray={2 * Math.PI * 44}
          strokeDashoffset={2 * Math.PI * 44 * temp}
          transform="rotate(-90 50 50)"
          style={{ transition: 'stroke-dashoffset 1s ease' }} />
        <circle cx="50" cy="50" r="28" fill={gc + '12'} />
      </svg>
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{ fontSize: 9, fontWeight: 500, letterSpacing: '0.28em',
          textTransform: 'uppercase', color: gc }}>
          {active ? 'Cooling' : 'Ready'}
        </div>
      </div>
    </div>
  );
}

// 5. 0.1Hz Coherent Wave — sine wave breathing guide
function VisWave({ gc, sky, active }) {
  var [phase, setPhase] = React.useState(0);
  React.useEffect(function() {
    if (!active) return;
    var t = setInterval(function() { setPhase(function(p) { return p + 0.02; }); }, 30);
    return function() { clearInterval(t); };
  }, [active]);
  var isInhale = Math.sin(phase) > 0;
  var size = 60 + Math.sin(phase) * 40;
  return (
    <div style={{ width: 200, height: 180, position: 'relative', margin: '0 auto' }}>
      <div style={{
        position: 'absolute', top: '45%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: size, height: size, borderRadius: '50%',
        background: 'radial-gradient(circle, ' + gc + '40 0%, ' + gc + '08 70%)',
        border: '0.5px solid ' + gc + '50',
        transition: 'width 0.5s ease, height 0.5s ease',
        boxShadow: '0 0 ' + (20 + size * 0.3) + 'px ' + gc + '30',
      }} />
      <div style={{
        position: 'absolute', bottom: 10, left: 0, right: 0, textAlign: 'center',
        fontSize: 12, fontWeight: 400, color: gc, letterSpacing: '0.12em',
      }}>{active ? (isInhale ? 'Inhale' : 'Exhale') : 'Ready'}</div>
    </div>
  );
}

// 6. Soft Gaze — expanding awareness field
function VisSoftGaze({ gc, sky, active }) {
  var [expand, setExpand] = React.useState(0);
  React.useEffect(function() {
    if (!active) return;
    var t = setInterval(function() {
      setExpand(function(p) { return Math.min(1, p + 0.004); });
    }, 50);
    return function() { clearInterval(t); };
  }, [active]);
  return (
    <div style={{ width: 200, height: 160, position: 'relative', margin: '0 auto' }}>
      {[0, 1, 2, 3].map(function(i) {
        var r = 20 + i * 18 + expand * 20;
        return <div key={i} style={{
          position: 'absolute', top: '50%', left: '50%',
          width: r * 2, height: r * 2, borderRadius: '50%',
          border: '0.5px solid ' + gc + (30 - i * 6).toString(16),
          transform: 'translate(-50%, -50%)',
          transition: 'all 1s ease',
          opacity: 0.8 - i * 0.15,
        }} />;
      })}
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: 8, height: 8, borderRadius: '50%', background: gc,
        boxShadow: '0 0 16px ' + gc,
      }} />
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, textAlign: 'center',
        fontSize: 9, fontWeight: 500, letterSpacing: '0.28em', textTransform: 'uppercase',
        color: sky.sub, opacity: 0.7,
      }}>Soften your gaze</div>
    </div>
  );
}

// 7. Butterfly Hug — alternating left/right pulses
function VisButterfly({ gc, sky, active }) {
  var [side, setSide] = React.useState('left');
  React.useEffect(function() {
    if (!active) return;
    var t = setInterval(function() {
      setSide(function(s) { return s === 'left' ? 'right' : 'left'; });
    }, 1200);
    return function() { clearInterval(t); };
  }, [active]);
  return (
    <div style={{ width: 200, height: 140, position: 'relative', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24 }}>
      {['left', 'right'].map(function(s) {
        var isActive = active && side === s;
        return <div key={s} style={{
          width: 60, height: 80, borderRadius: 30,
          background: isActive ? gc + '35' : gc + '10',
          border: '0.5px solid ' + (isActive ? gc + '80' : gc + '30'),
          boxShadow: isActive ? '0 0 30px ' + gc + '40' : 'none',
          transition: 'all 0.3s ease',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            fontSize: 9, fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase',
            color: isActive ? gc : sky.sub, opacity: isActive ? 1 : 0.5,
          }}>{s === 'left' ? 'L' : 'R'}</div>
        </div>;
      })}
    </div>
  );
}

// 8. Heart Hold — warm glow emanating from center
function VisHeartHold({ gc, sky, active }) {
  return (
    <div style={{ width: 180, height: 160, position: 'relative', margin: '0 auto' }}>
      <div style={{
        position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)',
        width: 80, height: 80, borderRadius: '50%',
        background: 'radial-gradient(circle, ' + gc + '50 0%, ' + gc + '10 60%, transparent 80%)',
        animation: active ? 'varaPulse 2.5s ease-in-out infinite' : 'none',
        boxShadow: '0 0 50px ' + gc + '30',
      }} />
      {active && [0, 1, 2].map(function(i) {
        return <div key={i} style={{
          position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)',
          width: 80 + i * 30, height: 80 + i * 30, borderRadius: '50%',
          border: '0.5px solid ' + gc + '20',
          animation: 'varaBreathe ' + (3 + i) + 's ease-in-out infinite ' + (i * 0.5) + 's',
        }} />;
      })}
      <div style={{
        position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)',
        fontSize: 28, color: gc, opacity: 0.7,
      }}>{'\u2661'}</div>
    </div>
  );
}

// 9. Physiological Sigh — double-inhale exhale guide with smooth breath-like exhale
function VisPhysioSigh({ gc, sky, active }) {
  // Drive size with rAF so the long exhale has continuous, breath-like deflation
  var [size, setSize] = React.useState(50);
  var [label, setLabel] = React.useState('Ready');
  React.useEffect(function() {
    if (!active) { setSize(50); setLabel('Ready'); return; }
    var cancelled = false;
    var rafId = null;
    function ease(t) {
      // ease-in-out sinusoid — feels like a real breath
      return 0.5 - 0.5 * Math.cos(Math.PI * Math.max(0, Math.min(1, t)));
    }
    function animate(from, to, durMs, lbl, done) {
      var start = performance.now();
      setLabel(lbl);
      function step(now) {
        if (cancelled) return;
        var t = (now - start) / durMs;
        if (t >= 1) { setSize(to); done(); return; }
        var v = from + (to - from) * ease(t);
        setSize(v);
        rafId = requestAnimationFrame(step);
      }
      rafId = requestAnimationFrame(step);
    }
    function cycle() {
      // Sniff 1: small inhale
      animate(50, 70, 1400, 'Sniff 1', function() {
        // Sniff 2: top-up to full
        animate(70, 96, 900, 'Sniff 2', function() {
          // Long exhale: slow, smooth deflation back to small (~7s)
          animate(96, 38, 7000, 'Long exhale', function() {
            // brief settle
            setTimeout(function() { if (!cancelled) cycle(); }, 400);
          });
        });
      });
    }
    cycle();
    return function() { cancelled = true; if (rafId) cancelAnimationFrame(rafId); };
  }, [active]);
  var diameter = size * 2;
  return (
    <div style={{ width: 200, height: 160, position: 'relative', margin: '0 auto' }}>
      <div style={{
        position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)',
        width: diameter, height: diameter, borderRadius: '50%',
        background: 'radial-gradient(circle, ' + gc + '38 0%, ' + gc + '14 55%, transparent 75%)',
        border: '0.5px solid ' + gc + '55',
        boxShadow: '0 0 30px ' + gc + '28',
      }} />
      {/* faint outer ring follows the same curve */}
      <div style={{
        position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)',
        width: diameter + 16, height: diameter + 16, borderRadius: '50%',
        border: '0.5px solid ' + gc + '22', opacity: 0.7,
      }} />
      <div style={{
        position: 'absolute', bottom: 10, left: 0, right: 0, textAlign: 'center',
        fontSize: 12, fontWeight: 400, color: gc, letterSpacing: '0.1em',
        transition: 'opacity 0.4s ease',
      }}>{active ? label : 'Ready'}</div>
    </div>
  );
}

// Bird Song — listen-only visualization, no breathing prompt
function VisBirdSong({ gc, sky, active }) {
  // Gentle floating sound-particles + a soft "ear waiting to listen" cue.
  // Deliberately no inhale/exhale labels.
  var bars = 14;
  return (
    <div style={{ width: 220, height: 160, position: 'relative', margin: '0 auto' }}>
      {/* central calm orb — represents the closed-eye field of awareness */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: 90, height: 90, borderRadius: '50%',
        background: 'radial-gradient(circle, ' + gc + '28 0%, ' + gc + '0a 60%, transparent 80%)',
        border: '0.5px solid ' + gc + '40',
        animation: active ? 'varaBreathe 6s ease-in-out infinite' : 'none',
      }} />
      {/* concentric listening rings */}
      {[0, 1, 2].map(function(i) {
        return <div key={i} style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: 110 + i * 24, height: 110 + i * 24, borderRadius: '50%',
          border: '0.5px solid ' + gc + (i === 0 ? '35' : i === 1 ? '20' : '10'),
          animation: active ? 'varaPulse ' + (4 + i * 0.8) + 's ease-in-out infinite ' + (i * 0.5) + 's' : 'none',
        }} />;
      })}
      {/* drifting bird-song particles — sit at varied frequencies (heights) */}
      {Array.from({ length: bars }).map(function(_, i) {
        var seed = (i * 137.5) % 360;
        var x = 12 + (i / (bars - 1)) * 196;
        var y = 30 + Math.sin(seed) * 38 + 50;
        var delay = (i * 0.32) % 4;
        return <div key={i} style={{
          position: 'absolute', left: x, top: y, width: 3, height: 3, borderRadius: '50%',
          background: gc, opacity: active ? 0.55 : 0.18,
          boxShadow: active ? '0 0 6px ' + gc + '90' : 'none',
          animation: active ? 'varaBreathe ' + (2.4 + (i % 5) * 0.4) + 's ease-in-out infinite ' + delay + 's' : 'none',
        }} />;
      })}
      {/* "listening" caption — never says inhale/exhale */}
      <div style={{
        position: 'absolute', bottom: 8, left: 0, right: 0, textAlign: 'center',
        fontSize: 10, fontWeight: 500, color: gc, letterSpacing: '0.24em', textTransform: 'uppercase',
        opacity: 0.75,
      }}>{active ? 'Listening' : 'Eyes closed'}</div>
    </div>
  );
}

// 10. Orientation Scan — rotating compass
function VisOrientation({ gc, sky, active }) {
  var [angle, setAngle] = React.useState(0);
  React.useEffect(function() {
    if (!active) return;
    var t = setInterval(function() {
      setAngle(function(a) { return a + 0.8; });
    }, 50);
    return function() { clearInterval(t); };
  }, [active]);
  return (
    <div style={{ width: 180, height: 180, position: 'relative', margin: '0 auto' }}>
      <svg width="180" height="180" viewBox="0 0 100 100" style={{
        transform: 'rotate(' + angle + 'deg)', transition: 'transform 0.05s linear',
      }}>
        <circle cx="50" cy="50" r="44" fill="none" stroke={gc + '25'} strokeWidth="0.5" />
        <circle cx="50" cy="50" r="34" fill="none" stroke={gc + '15'} strokeWidth="0.3" />
        {[0, 90, 180, 270].map(function(a) {
          var rad = a * Math.PI / 180;
          return <line key={a} x1={50 + Math.cos(rad) * 36} y1={50 + Math.sin(rad) * 36}
            x2={50 + Math.cos(rad) * 44} y2={50 + Math.sin(rad) * 44}
            stroke={gc + '60'} strokeWidth="0.8" />;
        })}
      </svg>
      {/* fixed pointer */}
      <div style={{
        position: 'absolute', top: 6, left: '50%', transform: 'translateX(-50%)',
        width: 0, height: 0, borderLeft: '5px solid transparent', borderRight: '5px solid transparent',
        borderTop: '8px solid ' + gc,
      }} />
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 9, fontWeight: 500, letterSpacing: '0.28em', textTransform: 'uppercase', color: sky.sub,
      }}>360°</div>
    </div>
  );
}

// 11. Frontal Bridge — front-facing head with one hand on forehead, one on back of head
function VisFrontalBridge({ gc, sky, active }) {
  return (
    <div style={{ width: 200, height: 170, position: 'relative', margin: '0 auto' }}>
      <svg width="200" height="170" viewBox="0 0 120 100">
        <defs>
          <radialGradient id="fobHead" cx="50%" cy="48%" r="55%">
            <stop offset="0%" stopColor={gc} stopOpacity="0.14" />
            <stop offset="100%" stopColor={gc} stopOpacity="0.03" />
          </radialGradient>
          <linearGradient id="fobHandFront" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={gc} stopOpacity="0.32" />
            <stop offset="100%" stopColor={gc} stopOpacity="0.18" />
          </linearGradient>
          <linearGradient id="fobHandBack" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={gc} stopOpacity="0.18" />
            <stop offset="100%" stopColor={gc} stopOpacity="0.10" />
          </linearGradient>
        </defs>

        {/* BACK HAND — behind the head, cradling the occiput. Drawn first so head sits on top */}
        <g>
          {/* palm visible behind, peeking around either side of the skull */}
          <ellipse cx="60" cy="58" rx="28" ry="14" fill="url(#fobHandBack)" stroke={gc + '70'} strokeWidth="0.8" />
          {/* fingertips poking up above the skull from behind */}
          <path d="M44 36 C 44 30, 46 26, 48 26 C 50 26, 51 30, 51 36 Z" fill="url(#fobHandBack)" stroke={gc + '70'} strokeWidth="0.7" />
          <path d="M53 32 C 53 26, 55 22, 57 22 C 59 22, 60 26, 60 32 Z" fill="url(#fobHandBack)" stroke={gc + '70'} strokeWidth="0.7" />
          <path d="M62 32 C 62 26, 64 22, 66 22 C 68 22, 69 26, 69 32 Z" fill="url(#fobHandBack)" stroke={gc + '70'} strokeWidth="0.7" />
          <path d="M71 36 C 71 30, 73 26, 75 26 C 77 26, 78 30, 78 36 Z" fill="url(#fobHandBack)" stroke={gc + '70'} strokeWidth="0.7" />
          {active && <circle cx="60" cy="58" r="3" fill="none" stroke={gc} strokeWidth="0.6" opacity="0.6">
            <animate attributeName="r" from="3" to="14" dur="2.6s" repeatCount="indefinite" begin="1.3s" />
            <animate attributeName="opacity" from="0.55" to="0" dur="2.6s" repeatCount="indefinite" begin="1.3s" />
          </circle>}
        </g>

        {/* HEAD — front-facing oval */}
        <ellipse cx="60" cy="50" rx="22" ry="28"
          fill="url(#fobHead)" stroke={gc + '85'} strokeWidth="1.2" />
        {/* hairline */}
        <path d="M40 38 C 48 32, 72 32, 80 38"
          fill="none" stroke={gc + '50'} strokeWidth="0.7" strokeLinecap="round" />
        {/* closed eyes */}
        <path d="M50 50 C 52 48, 56 48, 58 50" stroke={gc + '85'} strokeWidth="0.9" fill="none" strokeLinecap="round" />
        <path d="M62 50 C 64 48, 68 48, 70 50" stroke={gc + '85'} strokeWidth="0.9" fill="none" strokeLinecap="round" />
        {/* lashes hint */}
        <path d="M51 51 L 50 53 M 54 52 L 54 54 M 57 51 L 58 53" stroke={gc + '60'} strokeWidth="0.4" fill="none" strokeLinecap="round" />
        <path d="M63 51 L 62 53 M 66 52 L 66 54 M 69 51 L 70 53" stroke={gc + '60'} strokeWidth="0.4" fill="none" strokeLinecap="round" />
        {/* nose */}
        <path d="M60 54 L 58 60 C 58 62, 60 63, 62 62" stroke={gc + '70'} strokeWidth="0.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        {/* mouth — soft line */}
        <path d="M55 68 C 58 69, 62 69, 65 68" stroke={gc + '65'} strokeWidth="0.8" fill="none" strokeLinecap="round" />

        {/* FRONT HAND — palm flat across the forehead */}
        <g>
          {/* palm */}
          <path d="M40 40 C 40 36, 48 33, 60 33 C 72 33, 80 36, 80 40 C 80 45, 72 47, 60 47 C 48 47, 40 45, 40 40 Z"
            fill="url(#fobHandFront)" stroke={gc + '85'} strokeWidth="1" strokeLinejoin="round" />
          {/* knuckles / finger separation lines */}
          <path d="M48 38 L 48 42 M 54 37 L 54 43 M 60 37 L 60 43 M 66 37 L 66 43 M 72 38 L 72 42"
            stroke={gc + '55'} strokeWidth="0.5" fill="none" strokeLinecap="round" />
          {/* thumb on the side */}
          <path d="M40 40 C 36 40, 34 44, 36 48 C 38 50, 40 48, 40 44 Z"
            fill="url(#fobHandFront)" stroke={gc + '80'} strokeWidth="0.8" strokeLinejoin="round" />
          {/* wrist tapering off-screen */}
          <path d="M76 40 C 84 38, 92 38, 100 40" stroke={gc + '60'} strokeWidth="0.8" fill="none" strokeLinecap="round" />
          {active && <circle cx="60" cy="40" r="3" fill="none" stroke={gc} strokeWidth="0.6" opacity="0.7">
            <animate attributeName="r" from="3" to="14" dur="2.6s" repeatCount="indefinite" />
            <animate attributeName="opacity" from="0.65" to="0" dur="2.6s" repeatCount="indefinite" />
          </circle>}
        </g>

        {/* bridge of attention — front to back through the head */}
        {active && <path d="M60 40 C 60 48, 60 54, 60 58"
          fill="none" stroke={gc + '60'} strokeWidth="0.7" strokeDasharray="2 3">
          <animate attributeName="stroke-dashoffset" from="0" to="-10" dur="3s" repeatCount="indefinite" />
        </path>}
      </svg>
      <div style={{
        position: 'absolute', top: 6, left: 0, right: 0, textAlign: 'center',
        fontSize: 8, color: gc, opacity: 0.7, letterSpacing: '0.18em',
      }}>FOREHEAD</div>
      <div style={{
        position: 'absolute', bottom: 6, left: 0, right: 0, textAlign: 'center',
        fontSize: 8, color: gc, opacity: 0.7, letterSpacing: '0.18em',
      }}>OCCIPUT</div>
    </div>
  );
}

// 12. Vagal Hum — vibration frequency bars
function VisVagalHum({ gc, sky, active }) {
  return (
    <div style={{
      width: 200, height: 120, position: 'relative', margin: '0 auto',
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
    }}>
      {Array.from({ length: 11 }).map(function(_, i) {
        var h = 12 + Math.sin(i * 0.7) * 20 + 15;
        return <div key={i} style={{
          width: 4, borderRadius: 4, background: gc,
          height: h,
          opacity: active ? 0.5 + Math.sin(i * 0.5) * 0.3 : 0.2,
          animation: active ? 'varaBreathe ' + (1.8 + i * 0.15) + 's ease-in-out infinite ' + (i * 0.12) + 's' : 'none',
          filter: active ? 'blur(0.3px)' : 'none',
        }} />;
      })}
    </div>
  );
}

// Router
function PracticeVis({ id, gc, sky, active, stepIdx, progress }) {
  switch (id) {
    case 'saccadicReset': return React.createElement(VisSaccadic, { gc: gc, sky: sky, active: active });
    case 'auricularReset': return React.createElement(VisAuricular, { gc: gc, sky: sky, active: active, stepIdx: stepIdx });
    case 'somaticShake': return React.createElement(VisSomatic, { gc: gc, sky: sky, active: active });
    case 'coldPoint': return React.createElement(VisColdPoint, { gc: gc, sky: sky, active: active, progress: progress });
    case 'coherentWave': return React.createElement(VisWave, { gc: gc, sky: sky, active: active });
    case 'softGaze': return React.createElement(VisSoftGaze, { gc: gc, sky: sky, active: active });
    case 'butterflyHug': return React.createElement(VisButterfly, { gc: gc, sky: sky, active: active });
    case 'heartHold': return React.createElement(VisHeartHold, { gc: gc, sky: sky, active: active });
    case 'physioSigh': return React.createElement(VisPhysioSigh, { gc: gc, sky: sky, active: active });
    case 'orientationScan': return React.createElement(VisOrientation, { gc: gc, sky: sky, active: active });
    case 'frontalBridge': return React.createElement(VisFrontalBridge, { gc: gc, sky: sky, active: active });
    case 'vagalHum': return React.createElement(VisVagalHum, { gc: gc, sky: sky, active: active });
    case 'birdSong': return React.createElement(VisBirdSong, { gc: gc, sky: sky, active: active });
    default: return React.createElement(VisBirdSong, { gc: gc, sky: sky, active: active });
  }
}

Object.assign(window, { PracticeVis });
