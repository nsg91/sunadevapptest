/* ScanScreen — 60s luminous aura check-in
   Pulsing orb, rotating wisdom, live BPM/SI counters, progress ring.
   Simulates camera-based HRV scan. */

function ScanScreen({ sky, onComplete, onCancel, mode }) {
  var isDark = sky.dark;
  var isVerify = mode === 'verify';
  var [elapsed, setElapsed] = React.useState(0);
  var [bpm, setBpm] = React.useState(isVerify ? 66 : 72);
  var [si, setSi] = React.useState(null);
  var [wisdomIdx, setWisdomIdx] = React.useState(0);
  // Verify pass skips the mindful-moment intro — they just finished a practice
  var [phase, setPhase] = React.useState(isVerify ? 'waiting' : 'moment');

  // Mindful moment prompts
  var MOMENT_PROMPTS = [
    { headline: 'A quiet minute.', sub: '60 seconds is enough to be heard.', cta: 'I\u2019m ready' },
    { headline: 'A mindful moment.', sub: 'Your nervous system is about to be heard.', cta: 'Let\u2019s begin' },
    { headline: 'One minute of honesty.', sub: 'Before you move, let the body speak first.', cta: 'I\u2019m here' },
  ];
  // Rotating library (v2.2): pick 4 sensor+breath lines per scan, locked closer for last 15s
  var [scanLines] = React.useState(function() {
    var pool = (window.SCAN_SENSOR || []).concat(window.SCAN_BREATH || []);
    var arr = pool.slice().sort(function() { return Math.random() - 0.5; });
    return arr.slice(0, 4);
  });
  var [closer] = React.useState(function() {
    var c = window.SCAN_CLOSERS || [];
    return c[Math.floor(Math.random() * c.length)] || 'One last breath. Your system is being heard.';
  });
  var [momentIdx] = React.useState(function() { return Math.floor(Math.random() * 3); });
  var DURATION = isVerify ? 30 : 60;

  // Simulate scan
  React.useEffect(function() {
    if (phase !== 'scanning') return;
    var t = setInterval(function() {
      setElapsed(function(e) {
        if (e >= DURATION) { clearInterval(t); setPhase('done'); return DURATION; }
        return e + 1;
      });
      // Simulate BPM drift (verify pass settles lower)
      setBpm(function(b) {
        var target = isVerify ? 64 : 72;
        return Math.round(b + (b > target ? -1 : 0) + (Math.random() - 0.5) * 2);
      });
      // SI emerges after 10s — verify pass converges toward post-practice range
      setSi(function(prev) {
        if (elapsed < 10) return null;
        var target = isVerify ? 90 : 160;
        var base = prev || target;
        var pull = (target - base) * 0.08;
        return Math.max(40, Math.round(base + pull + (Math.random() - 0.5) * 6));
      });
    }, 1000);
    return function() { clearInterval(t); };
  }, [phase, elapsed]);

  // Rotate wisdom every 5s through library; lock closer last 15s
  React.useEffect(function() {
    if (phase !== 'scanning') return;
    var w = setInterval(function() {
      setWisdomIdx(function(i) { return (i + 1) % scanLines.length; });
    }, 5000);
    return function() { clearInterval(w); };
  }, [phase]);

  // Auto-complete
  React.useEffect(function() {
    if (phase === 'done') {
      var finalSI = si || 140;
      var finalBPM = bpm;
      setTimeout(function() { onComplete({ si: finalSI, bpm: finalBPM }); }, 1800);
    }
  }, [phase]);

  var progress = elapsed / DURATION;
  var line = isDark ? 'rgba(255,255,255,0.14)' : 'rgba(50,40,30,0.12)';

  // Aura colors based on scan progress
  var auraInner = phase === 'done' ? 'rgba(120,200,160,0.5)' : 'rgba(230,170,100,0.45)';
  var auraOuter = phase === 'done' ? 'rgba(120,200,160,0.1)' : 'rgba(230,170,100,0.08)';

  return (
    <div style={{
      position: 'relative', width: '100%', height: '100%', overflow: 'hidden',
      fontFamily: 'var(--vara-sans)',
      background: isDark ? '#0c0a16' : '#faf6ef',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* bg photo — very subtle */}
      <div style={{
        position: 'absolute', inset: -40,
        backgroundImage: 'url(' + sky.photo + ')',
        backgroundSize: 'cover', backgroundPosition: 'center',
        filter: 'blur(60px) saturate(120%)', transform: 'scale(1.4)',
        opacity: 0.25,
      }} />
      <div style={{ position: 'absolute', inset: 0, background: sky.tint, opacity: 0.4 }} />

      {/* header */}
      <div style={{ position: 'relative', padding: '60px 24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <SansEyebrow color={sky.sub}>{phase === 'moment' ? 'Before We Begin' : (isVerify ? 'Re-Scan' : 'Check In')}</SansEyebrow>
          <div style={{ fontSize: 22, fontWeight: 300, color: sky.txt, marginTop: 6, letterSpacing: '-0.01em' }}>
            {phase === 'moment' ? 'Settle' : (isVerify ? 'Verify' : 'Attune')}
          </div>
        </div>
        <button onClick={onCancel} style={{
          width: 36, height: 36, borderRadius: '50%',
          background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(60,50,40,0.06)',
          border: '0.5px solid ' + line, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 14, color: sky.sub,
        }}>{'\u00D7'}</button>
      </div>

      {/* center */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>

        {/* ═══ MINDFUL MOMENT — single centered circle CTA ═══ */}
        {phase === 'moment' && (
          <div style={{ textAlign: 'center', padding: '0 32px', animation: 'varaFadeUp 0.8s ease', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{
              fontSize: 26, fontWeight: 300, color: sky.txt,
              letterSpacing: '-0.01em', lineHeight: 1.2, marginBottom: 12,
            }}>{MOMENT_PROMPTS[momentIdx].headline}</div>
            <p style={{
              fontSize: 14, fontWeight: 300, color: sky.sub,
              lineHeight: 1.6, maxWidth: 280, margin: '0 auto 48px',
            }}>{MOMENT_PROMPTS[momentIdx].sub}</p>

            {/* Single circle CTA — the breathing orb IS the button */}
            <button onClick={function() { setPhase('waiting'); }} style={{
              position: 'relative',
              width: 220, height: 220, borderRadius: '50%',
              background: 'radial-gradient(circle, ' + sky.fpSoft + ' 0%, ' + sky.fp + '14 60%, transparent 85%)',
              border: '0.5px solid ' + sky.fp + '50',
              cursor: 'pointer', padding: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              animation: 'varaBreathe 4s ease-in-out infinite',
              boxShadow: '0 0 60px ' + sky.fp + '20',
            }}>
              <div style={{
                position: 'absolute', inset: 24, borderRadius: '50%',
                background: 'radial-gradient(circle, ' + sky.fp + '22 0%, transparent 70%)',
                animation: 'varaPulse 4s ease-in-out infinite 0.5s',
              }} />
              <div style={{
                position: 'relative', zIndex: 1,
                fontFamily: 'var(--vara-sans)',
                fontSize: 11, fontWeight: 500, letterSpacing: '0.28em',
                textTransform: 'uppercase', color: sky.fp,
              }}>{MOMENT_PROMPTS[momentIdx].cta}</div>
            </button>
          </div>
        )}

        {/* progress ring (hidden during the moment screen) */}
        {phase !== 'moment' && <div style={{ position: 'relative', width: 260, height: 260 }}>
          <svg width="260" height="260" viewBox="0 0 260 260" style={{ position: 'absolute', inset: 0, transform: 'rotate(-90deg)' }}>
            <circle cx="130" cy="130" r="124" fill="none" stroke={line} strokeWidth="1" />
            <circle cx="130" cy="130" r="124" fill="none"
              stroke={phase === 'done' ? 'rgba(120,200,160,0.7)' : sky.fp}
              strokeWidth="2" strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 124}
              strokeDashoffset={2 * Math.PI * 124 * (1 - progress)}
              style={{ transition: 'stroke-dashoffset 0.8s ease' }}
            />
          </svg>

          {/* aura orb */}
          <div style={{
            position: 'absolute', inset: 30,
            borderRadius: '50%', overflow: 'hidden',
          }}>
            {/* pulsing glow layers */}
            <div style={{
              position: 'absolute', inset: 0, borderRadius: '50%',
              background: 'radial-gradient(circle, ' + auraInner + ' 0%, ' + auraOuter + ' 60%, transparent 80%)',
              animation: phase === 'scanning' ? 'varaPulse 1.2s ease-in-out infinite' : 'none',
              transform: phase === 'done' ? 'scale(1.3)' : 'scale(1)',
              transition: 'transform 1.5s ease, background 1.5s ease',
            }} />
            <div style={{
              position: 'absolute', inset: 20, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,200,120,0.35) 0%, transparent 70%)',
              animation: phase === 'scanning' ? 'varaBreathe 2s ease-in-out infinite 0.3s' : 'none',
            }} />
            {/* inner warm core */}
            <div style={{
              position: 'absolute', inset: 50, borderRadius: '50%',
              background: phase === 'scanning'
                ? 'radial-gradient(circle, rgba(255,180,100,0.6) 0%, rgba(255,150,80,0.2) 70%)'
                : phase === 'done'
                  ? 'radial-gradient(circle, rgba(120,220,160,0.6) 0%, rgba(100,200,140,0.2) 70%)'
                  : 'radial-gradient(circle, rgba(200,180,160,0.3) 0%, transparent 70%)',
              animation: phase === 'scanning' ? 'varaPulse 0.9s ease-in-out infinite' : 'none',
              transition: 'background 1.5s ease',
            }} />
          </div>

          {/* center content */}
          <div style={{
            position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
          }}>
            {phase === 'waiting' && (
              <button onClick={function() { setPhase('scanning'); }} style={{
                background: 'transparent', border: 'none', cursor: 'pointer',
                fontFamily: 'var(--vara-sans)', padding: 0,
              }}>
                <FpGlyph color={sky.fp} size={52} opacity={0.9} />
                <div style={{
                  marginTop: 12, fontSize: 10, fontWeight: 500, letterSpacing: '0.28em',
                  textTransform: 'uppercase', color: sky.sub,
                }}>Begin scan</div>
              </button>
            )}
            {phase === 'scanning' && (
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: 42, fontWeight: 300, color: sky.txt, letterSpacing: '-0.02em',
                  fontVariantNumeric: 'tabular-nums',
                }}>{DURATION - elapsed}</div>
                <div style={{
                  fontSize: 9, fontWeight: 500, letterSpacing: '0.28em',
                  textTransform: 'uppercase', color: sky.sub, marginTop: 4,
                }}>seconds</div>
              </div>
            )}
            {phase === 'done' && (
              <div style={{ textAlign: 'center' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M5 13l4 4L19 7" stroke={isDark ? '#68DCA0' : '#3CA064'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div style={{
                  fontSize: 11, fontWeight: 500, letterSpacing: '0.24em',
                  textTransform: 'uppercase', color: isDark ? '#68DCA0' : '#3CA064', marginTop: 8,
                }}>Complete</div>
              </div>
            )}
          </div>
        </div>}

        {/* live metrics */}
        {phase === 'scanning' && (
          <div style={{
            display: 'flex', gap: 32, marginTop: 36,
            animation: 'varaFadeUp 0.6s ease',
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: 26, fontWeight: 300, color: sky.txt,
                fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.02em',
              }}>{bpm}</div>
              <SansEyebrow color={sky.sub} style={{ marginTop: 4 }}>BPM</SansEyebrow>
            </div>
            {si !== null && (
              <div style={{ textAlign: 'center', animation: 'varaFadeUp 0.5s ease' }}>
                <div style={{
                  fontSize: 26, fontWeight: 300, letterSpacing: '-0.02em',
                  fontVariantNumeric: 'tabular-nums',
                  color: si > 150 ? '#C46A5A' : si > 100 ? '#C49A3A' : '#5A8A7A',
                }}>{si}</div>
                <SansEyebrow color={sky.sub} style={{ marginTop: 4 }}>SI</SansEyebrow>
              </div>
            )}
          </div>
        )}
      </div>

      {/* wisdom strip */}
      <div style={{
        position: 'relative', padding: '0 32px 28px', minHeight: 80,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {phase === 'moment' && (
          <div style={{
            fontSize: 12, fontWeight: 300, color: sky.sub, textAlign: 'center',
            lineHeight: 1.6, maxWidth: 280, fontStyle: 'italic',
          }}>Take a breath. Let your shoulders drop. We{'\u2019'}ll begin when you{'\u2019'}re ready.</div>
        )}
        {phase === 'waiting' && (
          <div style={{
            fontSize: 13, fontWeight: 300, color: sky.sub, textAlign: 'center',
            lineHeight: 1.6, maxWidth: 280,
          }}>Place your finger lightly over the lens and flash.</div>
        )}
        {phase === 'scanning' && (
          <div key={wisdomIdx} style={{
            fontSize: 13, fontWeight: 300, color: sky.sub, textAlign: 'center',
            lineHeight: 1.6, maxWidth: 280, fontStyle: 'italic',
            animation: 'varaFadeUp 0.8s ease',
          }}>{(DURATION - elapsed) <= 15 ? closer : scanLines[wisdomIdx % scanLines.length]}</div>
        )}
        {phase === 'done' && (
          <div style={{
            fontSize: 14, fontWeight: 400, color: sky.txt, textAlign: 'center',
            lineHeight: 1.5, animation: 'varaFadeUp 0.6s ease',
          }}>Your system has been heard.</div>
        )}
      </div>

      {/* safe area */}
      <div style={{ height: 34, flexShrink: 0 }} />
    </div>
  );
}

Object.assign(window, { ScanScreen });
