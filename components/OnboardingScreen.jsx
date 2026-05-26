/* OnboardingScreen v2 — 6 steps, lite & guided
   00 Welcome (full bleed)
   01 SignUp (name + email — only thing we ask)
   02 Frame  · The Metric
   03 Instrument · The Instrument (pulsing red lens)
   04 TryIt · 15s mini-scan (with iOS-style permission priming)
   05 Practice · The Practice (researcher chips → tap for citation)
   Skip link · back chevron · tappable dots · all where it should be. */

function OnboardingScreen({ sky, onComplete }) {
  var [step, setStep] = React.useState(0);
  var [name, setName] = React.useState('');
  var [email, setEmail] = React.useState('');
  var isDark = sky.dark;
  var line = isDark ? 'rgba(255,255,255,0.14)' : 'rgba(50,40,30,0.14)';
  var lineSoft = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(50,40,30,0.08)';
  var calmBg = isDark ? '#0c0a16' : '#faf6ef';
  var isWelcome = step === 0;
  var isSignUp = step === 1;
  var TOTAL_EDU = 4; // Frame, Instrument, TryIt, Practice
  var eduIdx = step - 2; // -1 if not edu

  function next() {
    if (step < 5) setStep(step + 1);
    else finish();
  }
  function back() {
    if (step > 0) setStep(step - 1);
  }
  function finish() {
    try {
      if (name) localStorage.setItem('suna.userName', name.trim().split(' ')[0]);
      if (email) localStorage.setItem('suna.userEmail', email);
    } catch (e) {}
    onComplete();
  }
  function skip() { finish(); }
  function jumpTo(i) { if (i <= step) setStep(i); }

  var canSignUp = name.trim().length >= 2 && /.+@.+\..+/.test(email);

  return (
    <div style={{
      position: 'relative', width: '100%', height: '100%', overflow: 'hidden',
      fontFamily: 'var(--vara-sans)', background: calmBg,
      display: 'flex', flexDirection: 'column'
    }}>
      {/* photo backdrop */}
      <div style={{
        position: 'absolute', inset: isWelcome ? 0 : -40, pointerEvents: 'none',
        backgroundImage: 'url(' + sky.photo + ')',
        backgroundSize: 'cover', backgroundPosition: 'center',
        filter: isWelcome ? 'saturate(115%) contrast(102%)' : 'blur(60px) saturate(120%)',
        transform: isWelcome ? 'scale(1.02)' : 'scale(1.4)',
        opacity: isWelcome ? 1 : 0.18,
        transition: 'all 0.8s ease'
      }} />
      <div style={{ position: 'absolute', inset: 0, background: sky.tint, opacity: isWelcome ? 0.32 : 0.4, pointerEvents: 'none' }} />
      {isWelcome && <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'linear-gradient(180deg, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0) 28%, rgba(0,0,0,0) 62%, rgba(0,0,0,0.28) 100%)'
      }} />}

      {/* TOP CHROME: back · time · skip — hidden on welcome */}
      {!isWelcome && (
        <div style={{
          position: 'relative', height: 56, flexShrink: 0,
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
          padding: '0 18px 8px', zIndex: 3
        }}>
          <button onClick={back} aria-label="back" style={{
            background: 'transparent', border: 'none', cursor: 'pointer', padding: '8px 10px',
            color: sky.txt, opacity: 0.7, lineHeight: 0
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div style={{ fontSize: 11, fontWeight: 500, color: sky.txt, letterSpacing: '-0.01em' }}>9:41</div>
          {!isSignUp ? (
            <button onClick={skip} style={{
              background: 'transparent', border: 'none', cursor: 'pointer',
              fontFamily: 'var(--vara-sans)', padding: '8px 10px',
              fontSize: 10.5, fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase',
              color: sky.sub, opacity: 0.85
            }}>Skip</button>
          ) : <div style={{ width: 38 }} />}
        </div>
      )}

      {/* PROGRESS DOTS — only on educational steps */}
      {eduIdx >= 0 && (
        <div style={{
          position: 'relative', display: 'flex', justifyContent: 'center',
          gap: 6, padding: '4px 0 8px', zIndex: 3
        }}>
          {[0, 1, 2, 3].map(function (i) {
            var done = i < eduIdx;
            var current = i === eduIdx;
            var stepIndex = i + 2;
            return (
              <button key={i} onClick={function () { jumpTo(stepIndex); }} aria-label={'go to step ' + (i + 1)} style={{
                background: 'transparent', border: 'none', cursor: stepIndex <= step ? 'pointer' : 'default',
                padding: '6px 4px'
              }}>
                <div style={{
                  width: current ? 18 : 5, height: 5, borderRadius: 100,
                  background: current ? sky.fp : done ? sky.fp + '60' : sky.sub + '30',
                  transition: 'all 0.4s ease'
                }} />
              </button>
            );
          })}
        </div>
      )}

      {/* CONTENT */}
      <div style={{
        position: 'relative', flex: 1, minHeight: 0, padding: isWelcome ? 0 : '0 28px',
        display: 'flex', flexDirection: 'column', zIndex: 2
      }}>
        {step === 0 && <OnbWelcome sky={sky} onBegin={next} onMember={skip} />}
        {step === 1 && <OnbSignUp sky={sky} line={line} lineSoft={lineSoft} name={name} setName={setName} email={email} setEmail={setEmail} />}
        {step === 2 && <OnbFrame sky={sky} line={line} lineSoft={lineSoft} />}
        {step === 3 && <OnbInstrument sky={sky} line={line} lineSoft={lineSoft} />}
        {step === 4 && <OnbTryIt sky={sky} line={line} lineSoft={lineSoft} name={name || 'you'} onContinue={next} />}
        {step === 5 && <OnbPractice sky={sky} line={line} lineSoft={lineSoft} />}
      </div>

      {/* CTA bar — hidden on welcome and on TryIt (TryIt drives its own continue) */}
      {!isWelcome && step !== 4 && (
        <div style={{
          position: 'relative', flexShrink: 0,
          padding: '14px 28px 36px',
          display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center', zIndex: 3
        }}>
          <button onClick={next} disabled={isSignUp && !canSignUp} style={{
            width: '100%', maxWidth: 340, padding: '17px 0',
            borderRadius: 100, border: 'none',
            cursor: (isSignUp && !canSignUp) ? 'default' : 'pointer',
            background: isDark ? 'rgba(255,255,255,0.94)' : 'rgba(40,30,22,0.92)',
            color: isDark ? 'rgba(20,18,28,1)' : 'rgba(248,244,236,1)',
            fontFamily: 'var(--vara-sans)',
            fontSize: 13, fontWeight: 500, letterSpacing: '0.18em',
            textTransform: 'uppercase',
            opacity: (isSignUp && !canSignUp) ? 0.4 : 1,
            transition: 'opacity 0.3s ease'
          }}>
            {step === 1 ? 'Create Account' : step === 2 ? 'Continue' : step === 3 ? 'Continue' : 'Jump In'}
          </button>
        </div>
      )}
    </div>
  );
}

// ─── 00 Welcome — full bleed ────────────────────
function OnbWelcome({ sky, onBegin, onMember }) {
  return (
    <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column', padding: '64px 32px 44px' }}>
      <div style={{
        fontFamily: 'var(--vara-mono), var(--vara-sans)',
        fontSize: 17, letterSpacing: '0.6em', textTransform: 'lowercase',
        color: 'rgba(255,255,255,0.95)', fontWeight: 400, textAlign: 'center',
        textShadow: '0 1px 24px rgba(0,0,0,0.35)'
      }}>suna</div>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{
          fontFamily: 'var(--vara-serif, var(--vara-sans))',
          fontSize: 32, fontWeight: 300, color: 'rgba(255,255,255,0.96)',
          letterSpacing: '-0.015em', lineHeight: 1.22,
          textAlign: 'center', maxWidth: 320,
          textShadow: '0 1px 30px rgba(0,0,0,0.40)', textWrap: 'pretty'
        }}>widening the window of<br />what{'\u2019'}s possible</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
        <button onClick={onBegin} style={{
          width: '100%', maxWidth: 340, padding: '17px 0',
          borderRadius: 100, border: '0.5px solid rgba(255,255,255,0.4)', cursor: 'pointer',
          background: 'rgba(255,255,255,0.96)', color: 'rgba(20,18,24,0.96)',
          fontFamily: 'var(--vara-sans)', fontSize: 13, fontWeight: 500,
          letterSpacing: '0.22em', textTransform: 'uppercase',
          backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
          boxShadow: '0 12px 40px rgba(0,0,0,0.18)'
        }}>Begin</button>
        <button onClick={onMember} style={{
          background: 'transparent', border: 'none', cursor: 'pointer',
          fontFamily: 'var(--vara-sans)', padding: '6px 12px',
          fontSize: 12, fontWeight: 400, letterSpacing: '0.02em',
          color: 'rgba(255,255,255,0.72)', textShadow: '0 1px 18px rgba(0,0,0,0.35)'
        }}>i{'\u2019'}m already a member</button>
      </div>
    </div>
  );
}

// ─── 01 SignUp — only ask we make ───────────────
function OnbSignUp({ sky, line, lineSoft, name, setName, email, setEmail }) {
  var inputBg = sky.dark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.55)';
  var inputStyle = {
    width: '100%', padding: '15px 16px', borderRadius: 14,
    border: '0.5px solid ' + line, background: inputBg,
    fontFamily: 'var(--vara-sans)', fontSize: 14, fontWeight: 400,
    color: sky.txt, letterSpacing: '-0.005em', outline: 'none',
    boxSizing: 'border-box'
  };
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', paddingTop: 24 }}>
      <SansEyebrow color={sky.sub} style={{ marginBottom: 14 }}>Create Account</SansEyebrow>
      <div style={{
        fontSize: 28, fontWeight: 300, color: sky.txt,
        letterSpacing: '-0.01em', lineHeight: 1.22, marginBottom: 8
      }}>let{'\u2019'}s start with hello.</div>
      <p style={{ fontSize: 13, fontWeight: 300, color: sky.sub, lineHeight: 1.55, margin: '0 0 28px' }}>
        Two quick fields. Your nervous system data stays on your device.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div>
          <label style={{ fontSize: 9.5, fontWeight: 500, color: sky.sub, letterSpacing: '0.22em',
            textTransform: 'uppercase', marginLeft: 4, display: 'block', marginBottom: 6 }}>First name</label>
          <input type="text" value={name} onChange={function (e) { setName(e.target.value); }}
            placeholder="What should we call you?" autoFocus
            style={inputStyle} />
        </div>
        <div>
          <label style={{ fontSize: 9.5, fontWeight: 500, color: sky.sub, letterSpacing: '0.22em',
            textTransform: 'uppercase', marginLeft: 4, display: 'block', marginBottom: 6 }}>Email</label>
          <input type="email" value={email} onChange={function (e) { setEmail(e.target.value); }}
            placeholder="you@where-you-are.com"
            style={inputStyle} />
        </div>
      </div>

      <div style={{ flex: 1 }} />

      <p style={{ fontSize: 11, fontWeight: 300, color: sky.sub, lineHeight: 1.55,
        margin: '24px 0 0', textAlign: 'center', opacity: 0.75 }}>
        By continuing you agree to suna{'\u2019'}s terms. Cycle tracking, wake time, and<br/>preferences live in Settings — adjust anytime.
      </p>
    </div>
  );
}

// ─── 02 Frame ───────────────────────────────────
function OnbFrame({ sky, line, lineSoft }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', paddingTop: 28 }}>
      <SansEyebrow color={sky.sub} style={{ marginBottom: 14 }}>The Metric</SansEyebrow>
      <div style={{
        fontSize: 28, fontWeight: 300, color: sky.txt,
        letterSpacing: '-0.01em', lineHeight: 1.22
      }}>your nervous system has a window.<br />we{'\u2019'}ll show you how to widen it.</div>

      <div style={{ height: 0.5, background: lineSoft, margin: '32px 0' }} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
            <SansEyebrow color={sky.sub}>Narrow · Reactive</SansEyebrow>
            <div style={{ fontSize: 10, fontWeight: 400, color: sky.sub, letterSpacing: '0.08em' }}>wired · stuck</div>
          </div>
          <div style={{ position: 'relative', height: 38 }}>
            <div style={{
              position: 'absolute', top: 18, left: 0, right: 0, height: 2,
              background: 'linear-gradient(90deg, transparent 0%, ' + sky.sub + '50 30%, ' + sky.sub + '50 70%, transparent 100%)'
            }} />
            <div style={{
              position: 'absolute', top: 6, left: '38%', right: '38%', height: 26,
              borderRadius: 100, background: sky.fp + '20', border: '0.5px solid ' + sky.fp + '40',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 9, fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: sky.fp
            }}>window</div>
          </div>
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
            <SansEyebrow color={sky.fp}>Wide · Open</SansEyebrow>
            <div style={{ fontSize: 10, fontWeight: 400, color: sky.sub, letterSpacing: '0.08em' }}>steady · flowing</div>
          </div>
          <div style={{ position: 'relative', height: 38 }}>
            <div style={{
              position: 'absolute', top: 18, left: 0, right: 0, height: 2,
              background: 'linear-gradient(90deg, transparent 0%, ' + sky.fp + '70 12%, ' + sky.fp + '70 88%, transparent 100%)'
            }} />
            <div style={{
              position: 'absolute', top: 6, left: '12%', right: '12%', height: 26,
              borderRadius: 100, background: sky.fp + '30', border: '0.5px solid ' + sky.fp + '60',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 9, fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: sky.fp,
              boxShadow: '0 0 20px ' + sky.fpSoft
            }}>window</div>
          </div>
        </div>
      </div>

      <div style={{ height: 0.5, background: lineSoft, margin: '28px 0 20px' }} />

      <p style={{ fontSize: 14, fontWeight: 300, color: sky.txt, lineHeight: 1.55, margin: '0 0 10px', letterSpacing: '-0.005em' }}>
        A narrow window is reactive. Wired. Stuck.<br />A wide one is open. Steady. Flow.
      </p>
      <p style={{ fontSize: 13, fontWeight: 300, color: sky.sub, lineHeight: 1.6, margin: 0 }}>
        suna shows you which one you{'\u2019'}re in — and how to widen it.
      </p>
    </div>
  );
}

// ─── 03 Instrument — pulsing red lens ───────────
function OnbInstrument({ sky, line, lineSoft }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', paddingTop: 28, overflow: 'auto' }} className="vara-scroll" data-dc-passthrough>
      <SansEyebrow color={sky.sub} style={{ marginBottom: 14 }}>The Instrument</SansEyebrow>
      <div style={{ fontSize: 28, fontWeight: 300, color: sky.txt, letterSpacing: '-0.01em', lineHeight: 1.22 }}>
        your phone is the instrument.
      </div>

      <div style={{ height: 0.5, background: lineSoft, margin: '28px 0 20px' }} />

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
        <svg width="220" height="150" viewBox="0 0 220 150" fill="none">
          <defs>
            <linearGradient id="onbPhoneBody" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={sky.txt} stopOpacity="0.10" />
              <stop offset="100%" stopColor={sky.txt} stopOpacity="0.04" />
            </linearGradient>
            <radialGradient id="onbLensGlass" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor={sky.fp} stopOpacity="0.55" />
              <stop offset="60%" stopColor={sky.fp} stopOpacity="0.18" />
              <stop offset="100%" stopColor={sky.txt} stopOpacity="0.05" />
            </radialGradient>
            <linearGradient id="onbFingerSkin" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={sky.txt} stopOpacity="0.20" />
              <stop offset="60%" stopColor={sky.txt} stopOpacity="0.32" />
              <stop offset="100%" stopColor={sky.txt} stopOpacity="0.18" />
            </linearGradient>
          </defs>
          <rect x="20" y="20" width="180" height="110" rx="22" fill="url(#onbPhoneBody)" stroke={sky.txt} strokeOpacity="0.45" strokeWidth="0.8" />
          <rect x="22.5" y="22.5" width="175" height="105" rx="20" fill="none" stroke={sky.txt} strokeOpacity="0.12" strokeWidth="0.5" />
          <rect x="138" y="32" width="50" height="50" rx="14" fill={sky.txt} fillOpacity="0.06" stroke={sky.txt} strokeOpacity="0.32" strokeWidth="0.7" />
          <circle cx="153" cy="47" r="9" fill={sky.txt} fillOpacity="0.55" />
          <circle cx="153" cy="47" r="7" fill="url(#onbLensGlass)" stroke={sky.txt} strokeOpacity="0.6" strokeWidth="0.6" />
          {/* PULSING RED DOT — the lens is "alive" */}
          <circle cx="153" cy="47" r="2.4" fill="#FF3A2E" style={{ animation: 'onbPulseDot 1.1s ease-in-out infinite' }} />
          <circle cx="153" cy="47" r="6" fill="#FF3A2E" opacity="0.0" style={{ animation: 'onbPulseRing 1.1s ease-out infinite' }} />
          <circle cx="173" cy="67" r="7" fill={sky.txt} fillOpacity="0.5" />
          <circle cx="173" cy="67" r="5.4" fill="url(#onbLensGlass)" stroke={sky.txt} strokeOpacity="0.55" strokeWidth="0.5" />
          <circle cx="173" cy="47" r="3" fill={sky.fp} opacity="0.5" stroke={sky.fp} strokeOpacity="0.8" strokeWidth="0.5" />
          <circle cx="153" cy="67" r="1.5" fill={sky.txt} fillOpacity="0.4" />
          <g>
            <path d="M 200 145 C 188 138, 175 122, 168 102 C 164 90, 158 72, 152 60 C 148 52, 144 46, 146 42 C 148 39, 152 38, 156 40 C 161 43, 166 50, 170 60 C 174 70, 178 82, 184 96 C 192 112, 204 130, 212 142 Z"
              fill="url(#onbFingerSkin)" stroke={sky.txt} strokeOpacity="0.55" strokeWidth="0.9" strokeLinejoin="round" />
            <g stroke={sky.txt} strokeOpacity="0.32" strokeWidth="0.5" fill="none" strokeLinecap="round">
              <path d="M150 48 C 153 47, 157 47, 160 49" />
              <path d="M152 53 C 155 52, 159 52, 162 54" />
              <path d="M154 58 C 157 57, 161 57, 164 59" />
              <path d="M157 63 C 159 62, 163 62, 166 64" />
            </g>
            <path d="M195 132 C 200 130, 206 132, 209 136" stroke={sky.txt} strokeOpacity="0.4" strokeWidth="0.5" fill="none" />
            <circle cx="173" cy="55" r="11" fill={sky.fp} opacity="0.18" />
          </g>
          <style>{
            '@keyframes onbPulseDot { 0%,100% { opacity: 0.55; r: 2; } 30% { opacity: 1; r: 3; } }' +
            '@keyframes onbPulseRing { 0% { opacity: 0.5; r: 2; } 100% { opacity: 0; r: 11; } }'
          }</style>
        </svg>
      </div>

      <p style={{ fontSize: 14, fontWeight: 300, color: sky.txt, lineHeight: 1.6, margin: '0 0 16px', letterSpacing: '-0.005em' }}>
        Your finger on the lens. The flash as light source. The camera as detector. In 60 seconds, suna captures heart rate, HRV, breath rate, and the Baevsky Stress Index.
      </p>

      <div style={{
        borderRadius: 12, padding: '12px 14px', border: '0.5px solid ' + line,
        background: 'rgba(255,255,255,0.04)', marginBottom: 14
      }}>
        <div style={{ fontSize: 9, fontWeight: 500, letterSpacing: '0.24em', textTransform: 'uppercase', color: sky.sub, marginBottom: 6 }}>Validated Against</div>
        <div style={{ fontSize: 12, fontWeight: 400, color: sky.txt, fontFamily: 'var(--vara-mono), var(--vara-sans)' }}>medical-grade ECG · r = 0.997</div>
      </div>

      <p style={{ fontSize: 12, fontWeight: 300, color: sky.sub, lineHeight: 1.6, margin: '0 0 14px' }}>
        <span style={{ fontFamily: 'var(--vara-mono)', fontSize: 11, letterSpacing: '0.08em', color: sky.txt, fontWeight: 400 }}>PPG</span> — photoplethysmography. The same optical tech inside every hospital in the world.
      </p>

      <div style={{ fontSize: 11, fontWeight: 400, color: sky.sub, opacity: 0.75, display: 'flex', alignItems: 'center', gap: 6 }}>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
          <rect x="4" y="10" width="16" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
          <path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="1.4" />
        </svg>
        Nothing leaves your device. No video stored.
      </div>
    </div>
  );
}

// ─── 04 TryIt — permission sheet → 15s mini-scan → reveal ───
function OnbTryIt({ sky, line, lineSoft, name, onContinue }) {
  // phases: permission · prompt · scanning · reveal
  var [phase, setPhase] = React.useState('permission');
  var [progress, setProgress] = React.useState(0); // 0..1
  var [bpm, setBpm] = React.useState(0);
  var rafRef = React.useRef(null);
  var startRef = React.useRef(0);
  var DURATION = 15000;

  function startScan() {
    setPhase('scanning');
    startRef.current = performance.now();
    function tick(t) {
      var p = Math.min(1, (t - startRef.current) / DURATION);
      setProgress(p);
      // BPM rises and settles around 72
      var target = 72 + Math.sin(p * Math.PI * 2) * 4;
      setBpm(Math.round(58 + (target - 58) * Math.min(1, p * 1.4)));
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
      else setTimeout(function () { setPhase('reveal'); }, 600);
    }
    rafRef.current = requestAnimationFrame(tick);
  }
  React.useEffect(function () { return function () { if (rafRef.current) cancelAnimationFrame(rafRef.current); }; }, []);

  // Permission sheet (iOS-style modal)
  if (phase === 'permission') {
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', paddingTop: 28, position: 'relative' }}>
        <SansEyebrow color={sky.sub} style={{ marginBottom: 14 }}>Try It</SansEyebrow>
        <div style={{ fontSize: 28, fontWeight: 300, color: sky.txt, letterSpacing: '-0.01em', lineHeight: 1.22 }}>
          let{'\u2019'}s feel your pulse.
        </div>
        <p style={{ fontSize: 13, fontWeight: 300, color: sky.sub, lineHeight: 1.6, margin: '14px 0 0' }}>
          A 15-second mini-scan, just so you know what it feels like. Allow camera to begin.
        </p>

        {/* dimmer */}
        <div style={{
          position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.32)',
          backdropFilter: 'blur(2px)', WebkitBackdropFilter: 'blur(2px)'
        }} />

        {/* iOS-style permission sheet */}
        <div style={{
          position: 'absolute', left: '50%', top: '52%',
          transform: 'translate(-50%, -50%)', width: 270,
          borderRadius: 14, overflow: 'hidden',
          background: sky.dark ? 'rgba(48,46,58,0.96)' : 'rgba(245,242,238,0.96)',
          backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.45)',
          fontFamily: '-apple-system, "SF Pro Text", system-ui, sans-serif'
        }}>
          <div style={{ padding: '20px 18px 16px', textAlign: 'center' }}>
            <div style={{
              fontSize: 16, fontWeight: 600, color: sky.dark ? 'rgba(255,255,255,0.96)' : 'rgba(0,0,0,0.92)',
              letterSpacing: '-0.01em', marginBottom: 6
            }}>{'\u201C'}Suna{'\u201D'} Would Like to Access the Camera</div>
            <div style={{
              fontSize: 12.5, fontWeight: 400,
              color: sky.dark ? 'rgba(255,255,255,0.78)' : 'rgba(0,0,0,0.7)',
              lineHeight: 1.4, letterSpacing: '-0.005em'
            }}>The flash and lens act as your pulse sensor. Nothing leaves the device.</div>
          </div>
          <div style={{ height: 0.5, background: sky.dark ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.18)' }} />
          <div style={{ display: 'flex' }}>
            <button onClick={onContinue} style={{
              flex: 1, padding: '12px 0', background: 'transparent', border: 'none',
              borderRight: '0.5px solid ' + (sky.dark ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.18)'),
              cursor: 'pointer',
              fontFamily: 'inherit', fontSize: 15, fontWeight: 400,
              color: sky.dark ? '#5AB1FF' : '#0A84FF'
            }}>Don{'\u2019'}t Allow</button>
            <button onClick={function () { setPhase('prompt'); }} style={{
              flex: 1, padding: '12px 0', background: 'transparent', border: 'none', cursor: 'pointer',
              fontFamily: 'inherit', fontSize: 15, fontWeight: 600,
              color: sky.dark ? '#5AB1FF' : '#0A84FF'
            }}>Allow</button>
          </div>
        </div>
      </div>
    );
  }

  // Prompt: place finger on lens
  if (phase === 'prompt') {
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', paddingTop: 28 }}>
        <SansEyebrow color={sky.sub} style={{ marginBottom: 14 }}>Try It</SansEyebrow>
        <div style={{ fontSize: 26, fontWeight: 300, color: sky.txt, letterSpacing: '-0.01em', lineHeight: 1.22 }}>
          place your finger,<br />lightly, over the lens.
        </div>
        <p style={{ fontSize: 13, fontWeight: 300, color: sky.sub, lineHeight: 1.6, margin: '12px 0 28px' }}>
          Cover both the lens and the flash. Be still. 15 seconds.
        </p>

        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 22 }}>
          {/* glowing ring placeholder for fingertip */}
          <div style={{ position: 'relative', width: 132, height: 132 }}>
            <div style={{
              position: 'absolute', inset: 0, borderRadius: '50%',
              background: 'radial-gradient(circle, ' + sky.fp + '60 0%, ' + sky.fp + '20 40%, transparent 70%)',
              animation: 'onbPulseGlow 2s ease-in-out infinite'
            }} />
            <div style={{
              position: 'absolute', inset: 18, borderRadius: '50%',
              border: '0.5px solid ' + sky.fp + '50',
              background: sky.fp + '15'
            }} />
            <div style={{
              position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 9, fontWeight: 500, letterSpacing: '0.32em', textTransform: 'uppercase',
              color: sky.fp, opacity: 0.85
            }}>place finger</div>
          </div>
          <button onClick={startScan} style={{
            padding: '13px 32px', borderRadius: 100, border: '0.5px solid ' + sky.fp + '60',
            background: sky.fp + '20', color: sky.fp, cursor: 'pointer',
            fontFamily: 'var(--vara-sans)', fontSize: 11, fontWeight: 500,
            letterSpacing: '0.18em', textTransform: 'uppercase'
          }}>I{'\u2019'}m ready</button>
        </div>
        <style>{'@keyframes onbPulseGlow { 0%,100% { transform: scale(1); opacity: 0.85; } 50% { transform: scale(1.06); opacity: 1; } }'}</style>
      </div>
    );
  }

  // Scanning: PPG line + countdown ring
  if (phase === 'scanning') {
    var pct = Math.round(progress * 100);
    var sec = Math.max(0, Math.ceil(15 * (1 - progress)));
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', paddingTop: 28 }}>
        <SansEyebrow color={sky.sub} style={{ marginBottom: 14 }}>Listening</SansEyebrow>
        <div style={{ fontSize: 26, fontWeight: 300, color: sky.txt, letterSpacing: '-0.01em', lineHeight: 1.22 }}>
          stay still.<br />i{'\u2019'}m finding you.
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
          {/* ring countdown */}
          <div style={{ position: 'relative', width: 140, height: 140 }}>
            <svg width="140" height="140" viewBox="0 0 140 140">
              <circle cx="70" cy="70" r="62" fill="none" stroke={sky.sub + '30'} strokeWidth="2" />
              <circle cx="70" cy="70" r="62" fill="none" stroke={sky.fp} strokeWidth="2"
                strokeLinecap="round" strokeDasharray={2 * Math.PI * 62}
                strokeDashoffset={2 * Math.PI * 62 * (1 - progress)}
                transform="rotate(-90 70 70)"
                style={{ transition: 'stroke-dashoffset 0.1s linear' }} />
            </svg>
            <div style={{
              position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center'
            }}>
              <div style={{ fontSize: 32, fontWeight: 300, color: sky.txt, letterSpacing: '-0.02em',
                fontVariantNumeric: 'tabular-nums', lineHeight: 1 }}>{bpm || '—'}</div>
              <div style={{ fontSize: 9, fontWeight: 500, color: sky.sub, letterSpacing: '0.22em',
                textTransform: 'uppercase', marginTop: 4 }}>bpm</div>
            </div>
          </div>

          {/* PPG waveform */}
          <PPGLine sky={sky} progress={progress} />

          <div style={{ fontSize: 11, fontWeight: 400, color: sky.sub, letterSpacing: '0.18em',
            textTransform: 'uppercase', fontVariantNumeric: 'tabular-nums' }}>
            {sec}s · {pct}%
          </div>
        </div>
      </div>
    );
  }

  // Reveal: warm payoff
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', paddingTop: 28, animation: 'onbFadeIn 0.6s ease' }}>
      <SansEyebrow color={sky.sub} style={{ marginBottom: 14 }}>I felt you.</SansEyebrow>
      <div style={{ fontSize: 28, fontWeight: 300, color: sky.txt, letterSpacing: '-0.01em', lineHeight: 1.22 }}>
        there you are, {name.toLowerCase()}.
      </div>
      <p style={{ fontSize: 14, fontWeight: 300, color: sky.txt, lineHeight: 1.6, margin: '14px 0 0', letterSpacing: '-0.005em' }}>
        That little wave? Your heart, talking. Your real check-ins are 60 seconds and pull HRV, breath rate, and the Baevsky Stress Index — but the feeling is the same.
      </p>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <div style={{ fontSize: 60, fontWeight: 200, color: sky.fp, letterSpacing: '-0.03em',
            fontVariantNumeric: 'tabular-nums', lineHeight: 1, textShadow: '0 0 30px ' + sky.fpSoft }}>{bpm}</div>
          <div style={{ fontSize: 10, fontWeight: 500, color: sky.sub, letterSpacing: '0.32em', textTransform: 'uppercase' }}>bpm · resting</div>
        </div>
      </div>

      <button onClick={onContinue} style={{
        width: '100%', maxWidth: 340, padding: '17px 0', alignSelf: 'center',
        borderRadius: 100, border: 'none', cursor: 'pointer',
        background: sky.dark ? 'rgba(255,255,255,0.94)' : 'rgba(40,30,22,0.92)',
        color: sky.dark ? 'rgba(20,18,28,1)' : 'rgba(248,244,236,1)',
        fontFamily: 'var(--vara-sans)', fontSize: 13, fontWeight: 500,
        letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 12
      }}>Continue</button>
      <style>{'@keyframes onbFadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }'}</style>
    </div>
  );
}

// PPG sketch — the user's "live" pulse trace
function PPGLine({ sky, progress }) {
  // Build a path that lengthens as progress advances. ~6 cycles.
  var W = 280, H = 60;
  var pts = [];
  var cycles = 6;
  var samples = 120;
  var visible = Math.floor(samples * progress);
  for (var i = 0; i < samples; i++) {
    var t = i / samples;
    // Synthetic PPG: fast upstroke + slower downstroke
    var phase = (t * cycles) % 1;
    var y;
    if (phase < 0.18) y = phase / 0.18; // upstroke
    else y = Math.exp(-(phase - 0.18) * 4.5); // decay
    var x = t * W;
    var yy = H * 0.85 - y * (H * 0.65);
    pts.push([x, yy]);
  }
  var pathVisible = pts.slice(0, Math.max(2, visible)).map(function (p, i) {
    return (i === 0 ? 'M' : 'L') + p[0].toFixed(1) + ' ' + p[1].toFixed(1);
  }).join(' ');
  var headX = pts[Math.max(0, visible - 1)][0];
  var headY = pts[Math.max(0, visible - 1)][1];
  return (
    <svg width="100%" height={H} viewBox={'0 0 ' + W + ' ' + H} preserveAspectRatio="none" style={{ maxWidth: 320 }}>
      <line x1="0" y1={H * 0.85} x2={W} y2={H * 0.85} stroke={sky.sub + '30'} strokeWidth="0.5" />
      <path d={pathVisible} fill="none" stroke={sky.fp} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      {visible > 0 && (
        <>
          <circle cx={headX} cy={headY} r="3.2" fill={sky.fp} />
          <circle cx={headX} cy={headY} r="7" fill={sky.fp} opacity="0.25" />
        </>
      )}
    </svg>
  );
}

// ─── 05 Practice — researcher chips with citation popovers ───
function OnbPractice({ sky, line, lineSoft }) {
  var researchers = [
    { name: 'Huberman', cite: 'Stanford neuroscientist · physiological sigh, light protocols' },
    { name: 'Porges', cite: 'Polyvagal theory · the vagal brake (1994)' },
    { name: 'Levine', cite: 'Somatic Experiencing · trauma + nervous system completion' },
    { name: 'Lehrer', cite: 'HRV biofeedback · resonant breathing at 6 bpm' },
    { name: 'Uvn\u00E4s-Moberg', cite: 'Oxytocin physiology · the calm-and-connect system' }
  ];
  var [open, setOpen] = React.useState(null);

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', paddingTop: 28, overflow: 'auto' }} className="vara-scroll" data-dc-passthrough>
      <SansEyebrow color={sky.sub} style={{ marginBottom: 14 }}>The Practice</SansEyebrow>
      <div style={{ fontSize: 28, fontWeight: 300, color: sky.txt, letterSpacing: '-0.012em', lineHeight: 1.18, textWrap: 'pretty' }}>
        balancing your nervous system isn{'\u2019'}t calming down.
      </div>

      <div style={{ height: 0.5, background: lineSoft, margin: '28px 0 22px' }} />

      <p style={{ fontSize: 14, fontWeight: 300, color: sky.txt, lineHeight: 1.6, margin: '0 0 18px', letterSpacing: '-0.005em' }}>
        It{'\u2019'}s training your body to move between states — and to come back when something throws you off.
      </p>

      <p style={{ fontSize: 13, fontWeight: 300, color: sky.sub, lineHeight: 1.65, margin: '0 0 16px' }}>
        Short practices, drawn from the research of the names below. Tap any to see who they are.
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 18 }}>
        {researchers.map(function (r, i) {
          var active = open === i;
          return (
            <button key={i} onClick={function () { setOpen(active ? null : i); }} style={{
              padding: '6px 12px', borderRadius: 100,
              border: '0.5px solid ' + (active ? sky.fp + '60' : line),
              fontSize: 10, fontWeight: 400, letterSpacing: '0.06em',
              color: active ? sky.fp : sky.sub, fontFamily: 'var(--vara-mono), var(--vara-sans)',
              background: active ? sky.fp + '15' : 'rgba(255,255,255,0.03)',
              cursor: 'pointer', transition: 'all 0.2s ease'
            }}>{r.name}</button>
          );
        })}
      </div>

      {/* citation card — shows when a chip is open */}
      <div style={{
        minHeight: 56,
        borderRadius: 12, padding: open !== null ? '12px 14px' : '0 14px',
        border: '0.5px solid ' + (open !== null ? line : 'transparent'),
        background: open !== null ? (sky.dark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.42)') : 'transparent',
        marginBottom: 22, transition: 'all 0.3s ease',
        display: 'flex', flexDirection: 'column', justifyContent: 'center'
      }}>
        {open !== null && (
          <>
            <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase',
              color: sky.fp, marginBottom: 4 }}>{researchers[open].name}</div>
            <div style={{ fontSize: 12, fontWeight: 300, color: sky.txt, lineHeight: 1.5, fontStyle: 'italic' }}>
              {researchers[open].cite}
            </div>
          </>
        )}
      </div>

      <div style={{ height: 0.5, background: lineSoft, margin: '0 0 20px' }} />

      <p style={{ fontSize: 13, fontWeight: 300, color: sky.txt, lineHeight: 1.55, margin: 0, letterSpacing: '-0.005em' }}>
        Each one matched to <span style={{ color: sky.fp, fontStyle: 'italic' }}>the state you{'\u2019'}re actually in.</span>
      </p>
    </div>
  );
}

Object.assign(window, { OnboardingScreen });
