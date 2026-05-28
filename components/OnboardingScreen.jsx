/* OnboardingScreen v3 — 5 steps, lite & guided
   00 Welcome (full bleed)
   01 SignUp (social: Apple / Google / Email)
   02 Frame  · The Metric
   03 Instrument · The Instrument (pulsing red lens)
   04 Practice · The Practice (researcher chips → tap for citation)
   Skip link · back chevron · tappable dots. */

function OnboardingScreen({ sky, onComplete, onLogin }) {
  var [step, setStep] = React.useState(0);
  var [name, setName] = React.useState('');
  var [email, setEmail] = React.useState('');
  var isDark = sky.dark;
  var line = isDark ? 'rgba(255,255,255,0.14)' : 'rgba(50,40,30,0.14)';
  var lineSoft = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(50,40,30,0.08)';
  var calmBg = isDark ? '#0c0a16' : '#faf6ef';
  var isWelcome = step === 0;
  var isSignUp = step === 1;
  var TOTAL_EDU = 3; // Frame, Instrument, Practice
  var eduIdx = step - 2; // -1 if not edu

  function next() {
    if (step < 4) setStep(step + 1);else
    finish();
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
  function skip() {finish();}
  function jumpTo(i) {if (i <= step) setStep(i);}

  var canSignUp = name.length > 0 && email.length > 0;

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
      {!isWelcome &&
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
          <div style={{ fontSize: 12.5, fontWeight: 500, color: sky.txt, letterSpacing: '-0.01em' }}>9:41</div>
          {!isSignUp ?
        <button onClick={skip} style={{
          background: 'transparent', border: 'none', cursor: 'pointer',
          fontFamily: 'var(--vara-sans)', padding: '8px 10px',
          fontSize: 12, fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase',
          color: sky.sub, opacity: 0.85
        }}>Skip</button> :
        <div style={{ width: 38 }} />}
        </div>
      }

      {/* PROGRESS DOTS — only on educational steps */}
      {eduIdx >= 0 &&
      <div style={{
        position: 'relative', display: 'flex', justifyContent: 'center',
        gap: 6, padding: '4px 0 8px', zIndex: 3
      }}>
          {[0, 1, 2].map(function (i) {
          var done = i < eduIdx;
          var current = i === eduIdx;
          var stepIndex = i + 2;
          return (
            <button key={i} onClick={function () {jumpTo(stepIndex);}} aria-label={'go to step ' + (i + 1)} style={{
              background: 'transparent', border: 'none', cursor: stepIndex <= step ? 'pointer' : 'default',
              padding: '6px 4px'
            }}>
                <div style={{
                width: current ? 18 : 5, height: 5, borderRadius: 100,
                background: current ? sky.fp : done ? sky.fp + '60' : sky.sub + '30',
                transition: 'all 0.4s ease'
              }} />
              </button>);

        })}
        </div>
      }

      {/* CONTENT */}
      <div style={{
        position: 'relative', flex: 1, minHeight: 0, padding: isWelcome ? 0 : '0 28px',
        display: 'flex', flexDirection: 'column', zIndex: 2
      }}>
        {step === 0 && <OnbWelcome sky={sky} onBegin={next} onMember={function () { onLogin ? onLogin() : skip(); }} />}
        {step === 1 && <OnbSignUp sky={sky} line={line} lineSoft={lineSoft} name={name} setName={setName} email={email} setEmail={setEmail} />}
        {step === 2 && <OnbFrame sky={sky} line={line} lineSoft={lineSoft} />}
        {step === 3 && <OnbInstrument sky={sky} line={line} lineSoft={lineSoft} />}
        {step === 4 && <OnbPractice sky={sky} line={line} lineSoft={lineSoft} />}
      </div>

      {/* CTA bar — hidden on welcome */}
      {!isWelcome &&
      <div style={{
        position: 'relative', flexShrink: 0,
        padding: '14px 28px 36px',
        display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center', zIndex: 3
      }}>
          <button onClick={next} disabled={isSignUp && !canSignUp} style={{
          width: '100%', maxWidth: 340, padding: '17px 0',
          borderRadius: 100, border: 'none',
          cursor: isSignUp && !canSignUp ? 'default' : 'pointer',
          background: isDark ? 'rgba(255,255,255,0.94)' : 'rgba(40,30,22,0.92)',
          color: isDark ? 'rgba(20,18,28,1)' : 'rgba(248,244,236,1)',
          fontFamily: 'var(--vara-sans)',
          fontSize: 15, fontWeight: 500, letterSpacing: '0.18em',
          textTransform: 'uppercase',
          opacity: isSignUp && !canSignUp ? 0.4 : 1,
          transition: 'opacity 0.3s ease'
        }}>
            {step === 1 ? (canSignUp ? 'Continue' : 'Pick a sign-in') : step === 2 ? 'Continue' : step === 3 ? 'Continue' : 'Jump In'}
            {/* step 4 is Practice → Jump In */}
          </button>
        </div>
      }
    </div>);

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
        }}>Widening the window of<br />what{'\u2019'}s possible</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
        <button onClick={onBegin} style={{
          width: '100%', maxWidth: 340, padding: '17px 0',
          borderRadius: 100, border: '0.5px solid rgba(255,255,255,0.4)', cursor: 'pointer',
          background: 'rgba(255,255,255,0.96)', color: 'rgba(20,18,24,0.96)',
          fontFamily: 'var(--vara-sans)', fontSize: 15, fontWeight: 500,
          letterSpacing: '0.22em', textTransform: 'uppercase',
          backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
          boxShadow: '0 12px 40px rgba(0,0,0,0.18)'
        }}>Begin</button>
        <button onClick={onMember} style={{
          background: 'transparent', border: 'none', cursor: 'pointer',
          fontFamily: 'var(--vara-sans)', padding: '6px 12px',
          fontSize: 14, fontWeight: 400, letterSpacing: '0.02em',
          color: 'rgba(255,255,255,0.72)', textShadow: '0 1px 18px rgba(0,0,0,0.35)'
        }}>I{'\u2019'}m already a member</button>
      </div>
    </div>);

}

// ─── 01 SignUp — social only (Apple / Google / Email) ───
function OnbSignUp({ sky, line, lineSoft, name, setName, email, setEmail }) {
  function pick(provider, mockName, mockEmail) {
    setName(mockName);
    setEmail(mockEmail);
    try { localStorage.setItem('suna.signInProvider', provider); } catch (e) {}
  }

  var providers = [
    { id: 'apple', label: 'Continue with Apple', mockName: 'Eva', mockEmail: 'eva@privaterelay.appleid.com',
      bg: sky.dark ? '#fff' : '#000', fg: sky.dark ? '#000' : '#fff', border: 'transparent',
      icon: (
        <svg width="15" height="18" viewBox="0 0 384 512" fill="currentColor" aria-hidden="true">
          <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
        </svg>) },
    { id: 'google', label: 'Continue with Google', mockName: 'Eva', mockEmail: 'eva@gmail.com',
      bg: '#fff', fg: 'rgba(0,0,0,0.85)', border: 'transparent',
      icon: (
        <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden="true">
          <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.6-.4-3.9z"/>
          <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.8 1.2 7.9 3l5.7-5.7C34.1 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
          <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2c-2 1.4-4.5 2.4-7.2 2.4-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"/>
          <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.1 5.7l6.2 5.2c-.4.4 6.6-4.8 6.6-14.9 0-1.3-.1-2.6-.4-3.9z"/>
        </svg>) },
    { id: 'email', label: 'Continue with Email', mockName: 'Eva', mockEmail: 'eva@suna.app',
      bg: 'transparent', fg: sky.txt, border: '0.5px solid ' + line,
      icon: (
        <svg width="16" height="13" viewBox="0 0 24 18" fill="none" aria-hidden="true">
          <rect x="1" y="1" width="22" height="16" rx="2" stroke="currentColor" strokeWidth="1.4"/>
          <path d="M2 3l10 7 10-7" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
        </svg>) }
  ];

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', paddingTop: 24 }}>
      <SansEyebrow color={sky.sub} style={{ marginBottom: 14 }}>Welcome</SansEyebrow>
      <div style={{
        fontSize: 28, fontWeight: 300, color: sky.txt,
        letterSpacing: '-0.01em', lineHeight: 1.22, marginBottom: 8
      }}>Let{'\u2019'}s start with hello.</div>
      <p style={{ fontSize: 15, fontWeight: 300, color: sky.sub, lineHeight: 1.55, margin: '0 0 32px' }}>
        Sign in once. Your nervous system data stays on your device.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {providers.map(function (p) {
          var selected = email === p.mockEmail;
          return (
            <button key={p.id} onClick={function () { pick(p.id, p.mockName, p.mockEmail); }} style={{
              width: '100%', padding: '15px 18px',
              borderRadius: 14,
              border: selected ? '0.5px solid ' + sky.fp + '70' : p.border,
              background: selected ? sky.fp + '15' : p.bg,
              color: selected ? sky.fp : p.fg,
              cursor: 'pointer', fontFamily: 'var(--vara-sans)',
              fontSize: 16, fontWeight: 500, letterSpacing: '-0.005em',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              transition: 'all 0.2s ease',
              boxShadow: p.id === 'email' ? 'none' : '0 1px 2px rgba(0,0,0,0.08)'
            }}>
              <span style={{ display: 'inline-flex', alignItems: 'center' }}>{p.icon}</span>
              <span>{p.label}</span>
              {selected && <span style={{ marginLeft: 6, fontSize: 15 }}>{'\u2713'}</span>}
            </button>
          );
        })}
      </div>

      <div style={{ flex: 1 }} />

      <p style={{ fontSize: 12.5, fontWeight: 300, color: sky.sub, lineHeight: 1.55,
        margin: '24px 0 0', textAlign: 'center', opacity: 0.75 }}>
        By continuing you agree to suna{'\u2019'}s terms. Cycle tracking, wake time,<br />and preferences live in Settings — adjust anytime.
      </p>
    </div>);

}

// ─── 02 Frame ───────────────────────────────────
function OnbFrame({ sky, line, lineSoft }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', paddingTop: 28 }}>
      <SansEyebrow color={sky.sub} style={{ marginBottom: 14 }}>The Metric</SansEyebrow>
      <div style={{
        fontSize: 28, fontWeight: 300, color: sky.txt,
        letterSpacing: '-0.01em', lineHeight: 1.22
      }}>Your nervous system has a window.<br />We{'\u2019'}ll show you how to widen it.</div>

      <div style={{ height: 0.5, background: lineSoft, margin: '32px 0' }} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
            <SansEyebrow color={sky.sub}>Narrow · Reactive</SansEyebrow>
            <div style={{ fontSize: 11.5, fontWeight: 400, color: sky.sub, letterSpacing: '0.08em' }}>Wired · stuck</div>
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
            <div style={{ fontSize: 11.5, fontWeight: 400, color: sky.sub, letterSpacing: '0.08em' }}>Steady · flowing</div>
          </div>
          <div style={{ position: 'relative', height: 38 }}>
            <div style={{
              position: 'absolute', top: 18, left: 0, right: 0, height: 1,
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

      <p style={{ fontSize: 16, fontWeight: 300, color: sky.txt, lineHeight: 1.55, margin: '0 0 10px', letterSpacing: '-0.005em' }}>
        A narrow window is reactive. Wired. Stuck.<br />A wide one is open. Steady. Flow.
      </p>
      <p style={{ fontSize: 15, fontWeight: 300, color: sky.sub, lineHeight: 1.6, margin: 0 }}>
        suna shows you which one you{'\u2019'}re in — and how to widen it.
      </p>
    </div>);

}

// ─── 03 Instrument — pulsing red lens ───────────
function OnbInstrument({ sky, line, lineSoft }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', paddingTop: 28, overflow: 'auto' }} className="vara-scroll" data-dc-passthrough>
      <SansEyebrow color={sky.sub} style={{ marginBottom: 14 }}>The Instrument</SansEyebrow>
      <div style={{ fontSize: 28, fontWeight: 300, color: sky.txt, letterSpacing: '-0.01em', lineHeight: 1.22 }}>
        Your phone is the instrument.
      </div>

      <div style={{ height: 0.5, background: lineSoft, margin: '28px 0 20px' }} />

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
        <svg width="220" height="150" viewBox="0 0 220 150" fill="none" data-comment-anchor="fbd229f194-svg-254-9">
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
          {/* lens stack (rendered first so finger overlays it) */}
          <circle cx="153" cy="47" r="9" fill={sky.txt} fillOpacity="0.55" />
          <circle cx="153" cy="47" r="7" fill="url(#onbLensGlass)" stroke={sky.txt} strokeOpacity="0.6" strokeWidth="0.6" />
          <circle cx="173" cy="67" r="7" fill={sky.txt} fillOpacity="0.5" />
          <circle cx="173" cy="67" r="5.4" fill="url(#onbLensGlass)" stroke={sky.txt} strokeOpacity="0.55" strokeWidth="0.5" />
          <circle cx="173" cy="47" r="3" fill={sky.fp} opacity="0.5" stroke={sky.fp} strokeOpacity="0.8" strokeWidth="0.5" />
          <circle cx="153" cy="67" r="1.5" fill={sky.txt} fillOpacity="0.4" />
          {/* finger — short, proportional, pressing pad onto lens from above */}
          <g>
            {/* warm red glow under the pad (light bleeding through skin) */}
            <ellipse cx="153" cy="50" rx="20" ry="14" fill={sky.fp} opacity="0.32" />
            {/* finger silhouette: enters top, fingertip pad covers lens */}
            <path d="M 132 0
                     C 131 12, 130 24, 132 36
                     C 134 48, 140 58, 152 61
                     C 165 62, 174 56, 177 46
                     C 179 34, 178 18, 178 0 Z"
              fill="url(#onbFingerSkin)" fillOpacity="0.92"
              stroke={sky.txt} strokeOpacity="0.55" strokeWidth="0.9" strokeLinejoin="round" />
            {/* knuckle crease */}
            <path d="M133 28 C 145 24, 167 24, 177 28" stroke={sky.txt} strokeOpacity="0.28" strokeWidth="0.5" fill="none" strokeLinecap="round" />
            {/* fingertip print ridges */}
            <path d="M141 48 C 148 45, 165 45, 172 48" stroke={sky.txt} strokeOpacity="0.22" strokeWidth="0.4" fill="none" strokeLinecap="round" />
            <path d="M142 53 C 149 51, 165 51, 172 53" stroke={sky.txt} strokeOpacity="0.20" strokeWidth="0.4" fill="none" strokeLinecap="round" />
          </g>
          {/* PULSING RED DOT — drawn LAST so the light shines through the finger */}
          <circle cx="153" cy="47" r="2.4" fill="#FF3A2E" opacity="0.85" style={{ animation: 'onbPulseDot 1.1s ease-in-out infinite' }} />
          <circle cx="153" cy="47" r="6" fill="#FF3A2E" opacity="0.0" style={{ animation: 'onbPulseRing 1.1s ease-out infinite' }} />
          <style>{
            '@keyframes onbPulseDot { 0%,100% { opacity: 0.55; r: 2; } 30% { opacity: 1; r: 3; } }' +
            '@keyframes onbPulseRing { 0% { opacity: 0.5; r: 2; } 100% { opacity: 0; r: 11; } }'
            }</style>
        </svg>
      </div>

      <p style={{ fontSize: 16, fontWeight: 300, color: sky.txt, lineHeight: 1.6, margin: '0 0 16px', letterSpacing: '-0.005em' }}>
        Your finger on the lens. The flash as light source. The camera as detector. In 60 seconds, suna captures heart rate, HRV, breath rate, and the Baevsky Stress Index.
      </p>

      <div style={{
        borderRadius: 12, padding: '12px 14px', border: '0.5px solid ' + line,
        background: 'rgba(255,255,255,0.04)', marginBottom: 14
      }}>
        <div style={{ fontSize: 9, fontWeight: 500, letterSpacing: '0.24em', textTransform: 'uppercase', color: sky.sub, marginBottom: 6 }}>Validated Against</div>
        <div style={{ fontSize: 14, fontWeight: 400, color: sky.txt, fontFamily: 'var(--vara-mono), var(--vara-sans)' }}>medical-grade ECG · r = 0.997</div>
      </div>

      <p style={{ fontSize: 14, fontWeight: 300, color: sky.sub, lineHeight: 1.6, margin: '0 0 14px' }}>
        <span style={{ fontFamily: 'var(--vara-mono)', fontSize: 12.5, letterSpacing: '0.08em', color: sky.txt, fontWeight: 400 }}>PPG</span> — photoplethysmography. The same optical tech inside every hospital in the world.
      </p>

      <div style={{ fontSize: 12.5, fontWeight: 400, color: sky.sub, opacity: 0.75, display: 'flex', alignItems: 'center', gap: 6 }}>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
          <rect x="4" y="10" width="16" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
          <path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="1.4" />
        </svg>
        Nothing leaves your device. No video stored.
      </div>
    </div>);

}


// ─── 04 Practice — researcher chips with citation popovers ───
function OnbPractice({ sky, line, lineSoft }) {
  var researchers = [
  { name: 'Huberman', cite: 'Stanford neuroscientist · physiological sigh, light protocols' },
  { name: 'Porges', cite: 'Polyvagal theory · the vagal brake (1994)' },
  { name: 'Levine', cite: 'Somatic Experiencing · trauma + nervous system completion' },
  { name: 'Lehrer', cite: 'HRV biofeedback · resonant breathing at 6 bpm' },
  { name: 'Uvn\u00E4s-Moberg', cite: 'Oxytocin physiology · the calm-and-connect system' }];

  var [open, setOpen] = React.useState(null);

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', paddingTop: 28, overflow: 'auto' }} className="vara-scroll" data-dc-passthrough>
      <SansEyebrow color={sky.sub} style={{ marginBottom: 14 }}>The Practice</SansEyebrow>
      <div style={{ fontSize: 28, fontWeight: 300, color: sky.txt, letterSpacing: '-0.012em', lineHeight: 1.18, textWrap: 'pretty' }}>
        Balancing your nervous system isn{'\u2019'}t calming down.
      </div>

      <div style={{ height: 0.5, background: lineSoft, margin: '28px 0 22px' }} />

      <p style={{ fontSize: 16, fontWeight: 300, color: sky.txt, lineHeight: 1.6, margin: '0 0 18px', letterSpacing: '-0.005em' }}>
        It{'\u2019'}s training your body to move between states — and to come back when something throws you off.
      </p>

      <p style={{ fontSize: 15, fontWeight: 300, color: sky.sub, lineHeight: 1.65, margin: '0 0 16px' }}>
        Short practices, drawn from the research of the names below. Tap any to see who they are.
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 18 }}>
        {researchers.map(function (r, i) {
          var active = open === i;
          return (
            <button key={i} onClick={function () {setOpen(active ? null : i);}} style={{
              padding: '6px 12px', borderRadius: 100,
              border: '0.5px solid ' + (active ? sky.fp + '60' : line),
              fontSize: 11.5, fontWeight: 400, letterSpacing: '0.06em',
              color: active ? sky.fp : sky.sub, fontFamily: 'var(--vara-mono), var(--vara-sans)',
              background: active ? sky.fp + '15' : 'rgba(255,255,255,0.03)',
              cursor: 'pointer', transition: 'all 0.2s ease'
            }}>{r.name}</button>);

        })}
      </div>

      {/* citation card — shows when a chip is open */}
      <div style={{
        minHeight: 56,
        borderRadius: 12, padding: open !== null ? '12px 14px' : '0 14px',
        border: '0.5px solid ' + (open !== null ? line : 'transparent'),
        background: open !== null ? sky.dark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.42)' : 'transparent',
        marginBottom: 22, transition: 'all 0.3s ease',
        display: 'flex', flexDirection: 'column', justifyContent: 'center'
      }}>
        {open !== null &&
        <>
            <div style={{ fontSize: 12.5, fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase',
            color: sky.fp, marginBottom: 4 }}>{researchers[open].name}</div>
            <div style={{ fontSize: 14, fontWeight: 300, color: sky.txt, lineHeight: 1.5, fontStyle: 'italic' }}>
              {researchers[open].cite}
            </div>
          </>
        }
      </div>

      <div style={{ height: 0.5, background: lineSoft, margin: '0 0 20px' }} />

      <p style={{ fontSize: 15, fontWeight: 300, color: sky.txt, lineHeight: 1.55, margin: 0, letterSpacing: '-0.005em' }}>
        Each one matched to <span style={{ color: sky.fp, fontStyle: 'italic' }}>the state you{'\u2019'}re actually in.</span>
      </p>
    </div>);

}

Object.assign(window, { OnboardingScreen });