/* RevealScreen — post-scan state reveal with girlfriend voice
   Shows: state label, SI gauge, girlfriend insight, recommended practice category */

function RevealScreen({ sky, scanData, isFirst, onStartPractice, onNavigate }) {
  var isDark = sky.dark;
  var si = scanData.si || 140;
  var bpm = scanData.bpm || 68;
  var stateInfo = getStateFromSI(si);
  var voice = REVEAL_VOICE[stateInfo.state];
  var line = isDark ? 'rgba(255,255,255,0.14)' : 'rgba(50,40,30,0.12)';

  var phase = getPhaseForHour(new Date().getHours());
  var rec = getOverridePractices(si, null, phase);
  var topPractice = rec.practices[0];

  // Animate SI counter
  var [displaySI, setDisplaySI] = React.useState(0);
  React.useEffect(function() {
    var start = 0;
    var end = si;
    var duration = 1800;
    var startTime = Date.now();
    var frame = function() {
      var t = Math.min(1, (Date.now() - startTime) / duration);
      var ease = 1 - Math.pow(1 - t, 3);
      setDisplaySI(Math.round(start + (end - start) * ease));
      if (t < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }, [si]);

  return (
    <div className="vara-scroll" data-dc-passthrough style={{
      position: 'relative', width: '100%', height: '100%',
      overflowY: 'auto', overflowX: 'hidden',
      WebkitOverflowScrolling: 'touch',
      fontFamily: 'var(--vara-sans)',
      background: isDark ? '#0c0a16' : '#faf6ef',
    }}>
      {/* subtle bg */}
      <div style={{
        position: 'fixed', inset: -40,
        backgroundImage: 'url(' + sky.photo + ')',
        backgroundSize: 'cover', backgroundPosition: 'center',
        filter: 'blur(60px) saturate(120%)', transform: 'scale(1.4)',
        opacity: 0.2, pointerEvents: 'none',
      }} />
      <div style={{ position: 'fixed', inset: 0, background: sky.tint, opacity: 0.35, pointerEvents: 'none' }} />

      <div style={{ position: 'relative', padding: '60px 24px 120px' }}>

        {/* header */}
        {isFirst && (
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '6px 12px 6px 10px', borderRadius: 100, marginBottom: 14,
            background: sky.fp + '18', border: '0.5px solid ' + sky.fp + '50',
            animation: 'sunaFirstGlow 3s ease-in-out infinite'
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: '50%', background: sky.fp,
              boxShadow: '0 0 8px ' + sky.fp
            }} />
            <span style={{
              fontSize: 9.5, fontWeight: 500, letterSpacing: '0.24em', textTransform: 'uppercase',
              color: sky.fp
            }}>Your first reading</span>
          </div>
        )}
        <SansEyebrow color={sky.sub}>{isFirst ? 'Hello, you' : 'Your Reading'}</SansEyebrow>
        <div style={{
          fontSize: 26, fontWeight: 300, color: sky.txt, marginTop: 8,
          letterSpacing: '-0.01em', lineHeight: 1.2,
        }}>{isFirst ? 'Nice to meet your nervous system.' : 'The Reveal'}</div>
        {isFirst && (
          <p style={{
            fontSize: 12, fontWeight: 300, fontStyle: 'italic', color: sky.sub,
            lineHeight: 1.6, margin: '8px 0 0', maxWidth: 320
          }}>This is what your morning looks like, today. We{'\u2019'}ll get to know its rhythms over the next week.</p>
        )}
        <style>{'@keyframes sunaFirstGlow { 0%,100% { box-shadow: 0 0 0 0 ' + sky.fpSoft + '; } 50% { box-shadow: 0 0 0 6px transparent; } }'}</style>

        {/* state orb + label */}
        <div style={{
          marginTop: 44, display: 'flex', flexDirection: 'column', alignItems: 'center',
        }}>
          {/* state orb */}
          <div style={{
            width: 140, height: 140, borderRadius: '50%', position: 'relative',
            background: 'radial-gradient(circle, ' + stateInfo.color + '30 0%, transparent 70%)',
            border: '0.5px solid ' + stateInfo.color + '40',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 60px ' + stateInfo.color + '20',
            animation: 'varaFadeUp 0.8s ease',
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: 38, fontWeight: 300, color: stateInfo.color,
                fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.02em',
              }}>{displaySI}</div>
              <SansEyebrow color={stateInfo.color} style={{ marginTop: 2 }}>SI</SansEyebrow>
            </div>
          </div>

          {/* state label */}
          <div style={{
            marginTop: 22, textAlign: 'center',
            animation: 'varaFadeUp 1s ease',
          }}>
            <div style={{
              display: 'inline-block', padding: '6px 18px', borderRadius: 100,
              background: stateInfo.color + '1A',
              border: '0.5px solid ' + stateInfo.color + '40',
            }}>
              <span style={{
                fontSize: 13, fontWeight: 500, letterSpacing: '0.14em',
                textTransform: 'uppercase', color: stateInfo.color,
              }}>{stateInfo.label}</span>
            </div>
          </div>
        </div>

        {/* girlfriend voice card */}
        <div style={{
          marginTop: 36,
          borderRadius: 20, padding: '22px 20px',
          background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.5)',
          border: '0.5px solid ' + line,
          backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
          animation: 'varaFadeUp 1.2s ease',
        }}>
          <div style={{
            fontSize: 20, fontWeight: 400, color: sky.txt,
            letterSpacing: '-0.01em', lineHeight: 1.3, marginBottom: 12,
          }}>{voice.headline}</div>
          <p style={{
            fontSize: 13, fontWeight: 300, color: sky.sub,
            lineHeight: 1.65, margin: 0,
          }}>{voice.insight}</p>
        </div>

        {/* metrics row */}
        <div style={{
          marginTop: 20, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10,
          animation: 'varaFadeUp 1.4s ease',
        }}>
          {[
            { label: 'Heart Rate', value: bpm, unit: 'bpm' },
            { label: 'Tension', value: si, unit: 'SI' },
            { label: 'State', value: stateInfo.label, unit: '' },
          ].map(function(m, i) {
            return (
              <div key={i} style={{
                borderRadius: 14, padding: '14px 10px', textAlign: 'center',
                background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.42)',
                border: '0.5px solid ' + line,
              }}>
                <div style={{
                  fontSize: 22, fontWeight: 300, color: sky.txt,
                  fontVariantNumeric: 'tabular-nums',
                }}>{m.value}</div>
                <div style={{
                  fontSize: 9, fontWeight: 500, letterSpacing: '0.2em',
                  textTransform: 'uppercase', color: sky.sub, marginTop: 4,
                }}>{m.unit || m.label}</div>
              </div>
            );
          })}
        </div>

        {/* recommendation */}
        <div style={{
          marginTop: 32, animation: 'varaFadeUp 1.6s ease',
        }}>
          <SansEyebrow color={sky.sub} style={{ marginBottom: 10 }}>Recommended</SansEyebrow>
          <div style={{
            fontSize: 13, fontWeight: 300, color: sky.sub, fontStyle: 'italic',
            lineHeight: 1.5, marginBottom: 16,
          }}>{rec.voice}</div>

          {/* practice card */}
          <button onClick={function() { onStartPractice(topPractice); }} style={{
            width: '100%', borderRadius: 18, overflow: 'hidden', cursor: 'pointer',
            border: '0.5px solid ' + line, textAlign: 'left',
            background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.5)',
            fontFamily: 'var(--vara-sans)', padding: 0,
          }}>
            {/* photo strip */}
            <div style={{ height: 80, position: 'relative', overflow: 'hidden' }}>
              <div style={{
                position: 'absolute', inset: -10,
                backgroundImage: 'url(' + topPractice.photo + ')',
                backgroundSize: 'cover', backgroundPosition: 'center',
                filter: 'blur(4px)', transform: 'scale(1.15)',
              }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent, rgba(0,0,0,0.3))' }} />
              <div style={{ position: 'absolute', top: 10, right: 12, fontSize: 9, fontWeight: 500,
                letterSpacing: '0.2em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.8)', background: 'rgba(0,0,0,0.25)',
                padding: '3px 10px', borderRadius: 100, backdropFilter: 'blur(8px)',
              }}>3 min</div>
            </div>
            <div style={{ padding: '16px 18px' }}>
              <div style={{ fontSize: 17, fontWeight: 400, color: sky.txt, letterSpacing: '-0.005em' }}>{topPractice.name}</div>
              <div style={{ fontSize: 11, fontWeight: 300, color: sky.sub, marginTop: 3 }}>{topPractice.subtitle}</div>
              <div style={{
                marginTop: 14, display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '8px 16px', borderRadius: 100,
                background: stateInfo.color + '18', border: '0.5px solid ' + stateInfo.color + '40',
              }}>
                <span style={{
                  fontSize: 11, fontWeight: 500, letterSpacing: '0.12em',
                  textTransform: 'uppercase', color: stateInfo.color,
                }}>{voice.cta}</span>
                <span style={{ fontSize: 14, color: stateInfo.color }}>{'\u2192'}</span>
              </div>
            </div>
          </button>

          {/* see all */}
          <button onClick={function() { onNavigate('library'); }} style={{
            width: '100%', marginTop: 14, padding: '14px 0',
            background: 'transparent', border: 'none', cursor: 'pointer',
            fontSize: 12, fontWeight: 400, color: sky.sub, textAlign: 'center',
            fontFamily: 'var(--vara-sans)', letterSpacing: '0.04em',
          }}>View all practices {'\u2192'}</button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { RevealScreen });
