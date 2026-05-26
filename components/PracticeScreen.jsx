/* PracticeScreen v2 — unique vis per practice, all instructions visible,
   timer ring, photo backdrop, step-by-step with active highlight */

function PracticeScreen({ sky, practice, onComplete, onCancel }) {
  var isDark = sky.dark;
  var [timeLeft, setTimeLeft] = React.useState(practice.minutes * 60);
  var [stepIdx, setStepIdx] = React.useState(0);
  var [started, setStarted] = React.useState(false);
  var line = isDark ? 'rgba(255,255,255,0.14)' : 'rgba(50,40,30,0.12)';
  var total = practice.minutes * 60;
  var progress = started ? 1 - timeLeft / total : 0;
  var gc = practice.glowColor || sky.fp;

  // Timer
  React.useEffect(function() {
    if (!started) return;
    var t = setInterval(function() {
      setTimeLeft(function(prev) {
        if (prev <= 1) { clearInterval(t); return 0; }
        return prev - 1;
      });
    }, 1000);
    return function() { clearInterval(t); };
  }, [started]);

  // Step progression
  React.useEffect(function() {
    if (!started || !practice.instructions) return;
    var stepDuration = total / practice.instructions.length;
    var elapsed = total - timeLeft;
    var newIdx = Math.min(practice.instructions.length - 1, Math.floor(elapsed / stepDuration));
    setStepIdx(newIdx);
  }, [timeLeft, started]);

  // Auto-complete
  React.useEffect(function() {
    if (started && timeLeft <= 0) {
      setTimeout(function() { onComplete(); }, 1500);
    }
  }, [timeLeft, started]);

  function formatTime(s) {
    var m = Math.floor(s / 60);
    var sec = s % 60;
    return m + ':' + (sec < 10 ? '0' : '') + sec;
  }

  var catLabel = practice.category === 'spark' ? 'Spark' : practice.category === 'flow' ? 'Flow' : 'Anchor';
  var catColor = practice.category === 'spark' ? '#E8A572' : practice.category === 'flow' ? '#7AC4B0' : '#8A7EB0';

  return (
    <div className="vara-scroll" data-dc-passthrough style={{
      position: 'relative', width: '100%', height: '100%',
      overflowY: 'auto', overflowX: 'hidden',
      WebkitOverflowScrolling: 'touch',
      fontFamily: 'var(--vara-sans)',
      background: isDark ? '#0c0a16' : '#faf6ef',
    }}>
      {/* photo bg */}
      <div style={{
        position: 'fixed', inset: -40, pointerEvents: 'none',
        backgroundImage: 'url(' + practice.photo + ')',
        backgroundSize: 'cover', backgroundPosition: 'center',
        filter: 'blur(50px) saturate(130%)', transform: 'scale(1.4)',
        opacity: 0.25,
      }} />
      <div style={{ position: 'fixed', inset: 0, background: sky.tint, opacity: 0.45, pointerEvents: 'none' }} />

      <div style={{ position: 'relative', padding: '60px 24px 120px' }}>

        {/* header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
              <div style={{
                padding: '3px 10px', borderRadius: 100,
                background: catColor + '1A', border: '0.5px solid ' + catColor + '40',
                fontSize: 9, fontWeight: 500, letterSpacing: '0.2em',
                textTransform: 'uppercase', color: catColor,
              }}>{catLabel}</div>
              <span style={{ fontSize: 9, color: sky.sub, letterSpacing: '0.08em' }}>{practice.minutes} min</span>
            </div>
            <div style={{
              fontSize: 24, fontWeight: 300, color: sky.txt, letterSpacing: '-0.01em', lineHeight: 1.2,
            }}>{practice.name}</div>
            <div style={{
              fontSize: 12, fontWeight: 300, color: sky.sub, marginTop: 4,
            }}>{practice.subtitle}</div>
          </div>
          <button onClick={onCancel} style={{
            width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
            background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(60,50,40,0.06)',
            border: '0.5px solid ' + line, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14, color: sky.sub, marginTop: 4,
          }}>{'\u00D7'}</button>
        </div>

        {/* description */}
        <p style={{
          fontSize: 13, fontWeight: 300, color: sky.sub, lineHeight: 1.6,
          margin: '16px 0 0', maxWidth: 320,
        }}>{practice.description}</p>

        {/* timer + visualization area */}
        <div style={{ marginTop: 32, textAlign: 'center' }}>
          {/* timer ring */}
          <div style={{ position: 'relative', width: 200, height: 200, margin: '0 auto' }}>
            <svg width="200" height="200" viewBox="0 0 200 200" style={{
              position: 'absolute', inset: 0, transform: 'rotate(-90deg)',
            }}>
              <circle cx="100" cy="100" r="94" fill="none" stroke={line} strokeWidth="0.8" />
              {started && <circle cx="100" cy="100" r="94" fill="none"
                stroke={timeLeft <= 0 ? '#68DCA0' : gc} strokeWidth="2" strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 94}
                strokeDashoffset={2 * Math.PI * 94 * (1 - progress)}
                style={{ transition: 'stroke-dashoffset 0.8s ease' }}
              />}
            </svg>

            {/* visualization inside ring */}
            <div style={{ position: 'absolute', inset: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {!started ? (
                <button onClick={function() { setStarted(true); }} style={{
                  background: 'transparent', border: 'none', cursor: 'pointer',
                  fontFamily: 'var(--vara-sans)', padding: 0, textAlign: 'center',
                }}>
                  <div style={{
                    width: 80, height: 80, borderRadius: '50%', margin: '0 auto 12px',
                    background: gc + '18', border: '0.5px solid ' + gc + '40',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 24, color: gc,
                  }}>{'\u25B6'}</div>
                  <div style={{
                    fontSize: 10, fontWeight: 500, letterSpacing: '0.28em',
                    textTransform: 'uppercase', color: gc,
                  }}>Begin</div>
                </button>
              ) : timeLeft <= 0 ? (
                <div style={{ textAlign: 'center' }}>
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                    <path d="M5 13l4 4L19 7" stroke="#68DCA0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div style={{
                    fontSize: 10, fontWeight: 500, letterSpacing: '0.24em',
                    textTransform: 'uppercase', color: '#68DCA0', marginTop: 8,
                  }}>Complete</div>
                </div>
              ) : (
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    fontSize: 36, fontWeight: 300, color: sky.txt,
                    fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.02em',
                  }}>{formatTime(timeLeft)}</div>
                  <div style={{
                    fontSize: 9, fontWeight: 400, letterSpacing: '0.2em',
                    textTransform: 'uppercase', color: sky.sub, marginTop: 4,
                  }}>remaining</div>
                </div>
              )}
            </div>
          </div>

          {/* unique practice visualization */}
          <div style={{ marginTop: 24 }}>
            <PracticeVis id={practice.id} gc={gc} sky={sky} active={started && timeLeft > 0} stepIdx={stepIdx} progress={progress} />
          </div>
        </div>

        {/* ALL INSTRUCTIONS — visible list with active highlight */}
        <div style={{ marginTop: 36 }}>
          <SansEyebrow color={sky.sub} style={{ marginBottom: 14 }}>Instructions</SansEyebrow>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {(practice.instructions || []).map(function(inst, i) {
              var isActive = started && i === stepIdx;
              var isPast = started && i < stepIdx;
              return (
                <button key={i} onClick={function() { if (started) setStepIdx(i); }}
                  style={{
                    display: 'flex', gap: 12, padding: '14px 14px',
                    borderRadius: 14, textAlign: 'left', cursor: started ? 'pointer' : 'default',
                    background: isActive
                      ? (isDark ? gc + '18' : gc + '12')
                      : (isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.35)'),
                    border: '0.5px solid ' + (isActive ? gc + '50' : line),
                    borderLeft: isActive ? '2.5px solid ' + gc : '0.5px solid ' + line,
                    fontFamily: 'var(--vara-sans)',
                    transition: 'all 0.3s ease',
                    opacity: isPast ? 0.5 : 1,
                  }}>
                  {/* step number */}
                  <div style={{
                    width: 24, height: 24, borderRadius: '50%', flexShrink: 0,
                    background: isActive ? gc + '28' : (isPast ? gc + '15' : 'transparent'),
                    border: '0.5px solid ' + (isActive ? gc + '60' : line),
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11, fontWeight: 500,
                    color: isActive ? gc : (isPast ? gc : sky.sub),
                  }}>
                    {isPast ? '\u2713' : (i + 1)}
                  </div>
                  {/* instruction text */}
                  <div style={{
                    fontSize: 13, fontWeight: isActive ? 400 : 300,
                    color: isActive ? sky.txt : sky.sub,
                    lineHeight: 1.55, flex: 1,
                  }}>{inst}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* science card */}
        <div style={{
          marginTop: 28, padding: '16px 16px', borderRadius: 16,
          background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.35)',
          border: '0.5px solid ' + line,
        }}>
          <SansEyebrow color={catColor} style={{ marginBottom: 8 }}>The Data</SansEyebrow>
          <p style={{ fontSize: 12, fontWeight: 300, color: sky.sub, lineHeight: 1.6, margin: '0 0 8px' }}>
            {practice.mars}
          </p>
          <div style={{ fontSize: 9, fontWeight: 400, color: sky.sub, opacity: 0.6 }}>{practice.source}</div>
        </div>

        {/* performance flex */}
        <div style={{
          marginTop: 12, padding: '16px 16px', borderRadius: 16,
          background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.35)',
          border: '0.5px solid ' + line,
        }}>
          <SansEyebrow color={gc} style={{ marginBottom: 8 }}>Performance</SansEyebrow>
          <p style={{ fontSize: 12, fontWeight: 300, color: sky.txt, lineHeight: 1.6, margin: 0 }}>
            {practice.perfFlex}
          </p>
        </div>

        {/* end early button */}
        {started && timeLeft > 0 && (
          <div style={{ marginTop: 24, display: 'flex', justifyContent: 'center' }}>
            <button onClick={function() { onComplete(); }} style={{
              padding: '10px 24px', borderRadius: 100,
              background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(60,50,40,0.06)',
              border: '0.5px solid ' + line, cursor: 'pointer',
              fontFamily: 'var(--vara-sans)',
              fontSize: 11, fontWeight: 400, letterSpacing: '0.08em', color: sky.sub,
            }}>End Early</button>
          </div>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { PracticeScreen });
