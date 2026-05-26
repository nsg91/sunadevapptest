/* ShiftScreen — before/after capacity reveal
   Expanding windows, counting capacity number, pop-out metric pills. */

function ShiftScreen({ sky, scanBefore, scanAfter, isFirst, onNavigate }) {
  var isDark = sky.dark;
  var siBefore = scanBefore.si || 180;
  var siAfter = scanAfter.si || 120;
  var bpmBefore = scanBefore.bpm || 76;
  var bpmAfter = scanAfter.bpm || 68;
  var stateBefore = getStateFromSI(siBefore);
  var stateAfter = getStateFromSI(siAfter);
  var capacity = calcCapacity(siBefore, siAfter);
  var coherence = Math.min(98, Math.round(70 + Math.random() * 25));
  var line = isDark ? 'rgba(255,255,255,0.14)' : 'rgba(50,40,30,0.12)';
  var [shareOpen, setShareOpen] = React.useState(false);

  // Animated counter
  var [displayCap, setDisplayCap] = React.useState(0);
  var [expanded, setExpanded] = React.useState(false);
  var [pillOpen, setPillOpen] = React.useState(null);

  React.useEffect(function() {
    setTimeout(function() { setExpanded(true); }, 600);
    var start = Date.now();
    var dur = 2200;
    var frame = function() {
      var t = Math.min(1, (Date.now() - start) / dur);
      var ease = 1 - Math.pow(1 - t, 3);
      setDisplayCap(Math.round(capacity * ease));
      if (t < 1) requestAnimationFrame(frame);
    };
    setTimeout(frame, 800);
  }, []);

  function togglePill(idx) {
    setPillOpen(function(p) { return p === idx ? null : idx; });
  }

  // ── PLAY CUE (v2.2) — fires when post-state is regulated
  var [showPlayCue, setShowPlayCue] = React.useState(false);
  var [cueDismissed, setCueDismissed] = React.useState(false);
  var canPlay = (stateAfter.state === 'elastic') && !cueDismissed;
  React.useEffect(function() {
    if (!canPlay) return;
    var t = setTimeout(function() { setShowPlayCue(true); }, 1200);
    var auto = setTimeout(function() { setShowPlayCue(false); }, 16200);
    return function() { clearTimeout(t); clearTimeout(auto); };
  }, [canPlay]);

  var pills = [
    { label: 'System Tension', value: '-' + (siBefore - siAfter), unit: 'SI',
      detail: 'The Baevsky Index measures the rigidity of your rhythm. A lower score means you\u2019ve moved from Brittle to Fluid.' },
    { label: 'Engine Idle', value: '-' + (bpmBefore - bpmAfter), unit: 'BPM',
      detail: 'Your heart rate has slowed, signaling to your brain that the hunt is over. You\u2019ve engaged the Vagal Brake.' },
    { label: 'Rhythm Wave', value: coherence + '%', unit: 'Coherence',
      detail: 'Your heart and lungs are now dancing to the same beat. This is the peak state for high-stakes decision making.' },
  ];

  return (
    <div className="vara-scroll" data-dc-passthrough style={{
      position: 'relative', width: '100%', height: '100%',
      overflowY: 'auto', overflowX: 'hidden',
      WebkitOverflowScrolling: 'touch',
      fontFamily: 'var(--vara-sans)',
      background: isDark ? '#0c0a16' : '#faf6ef',
    }}>
      <div style={{
        position: 'fixed', inset: -40,
        backgroundImage: 'url(' + sky.photo + ')',
        backgroundSize: 'cover', backgroundPosition: 'center',
        filter: 'blur(60px) saturate(120%)', transform: 'scale(1.4)',
        opacity: 0.18, pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', padding: '60px 24px 120px' }}>
        {/* header */}
        {isFirst && (
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '6px 12px 6px 10px', borderRadius: 100, marginBottom: 14,
            background: sky.fp + '18', border: '0.5px solid ' + sky.fp + '50'
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: sky.fp,
              boxShadow: '0 0 8px ' + sky.fp }} />
            <span style={{ fontSize: 9.5, fontWeight: 500, letterSpacing: '0.24em',
              textTransform: 'uppercase', color: sky.fp }}>Your first shift</span>
          </div>
        )}
        <SansEyebrow color={sky.sub}>Post-Practice</SansEyebrow>
        <div style={{
          fontSize: 30, fontWeight: 300, color: sky.txt, marginTop: 8,
          letterSpacing: '-0.015em', lineHeight: 1.15,
        }}>{isFirst ? 'You did the thing.' : 'The Shift'}</div>
        <div style={{
          fontSize: 13, fontWeight: 300, color: sky.sub, marginTop: 8, lineHeight: 1.5,
        }}>{isFirst ? 'This is what widening feels like.' : 'Internal clearance achieved.'}</div>

        {/* hero capacity number */}
        <div style={{
          marginTop: 40, textAlign: 'center',
          animation: 'varaFadeUp 1s ease',
        }}>
          <div style={{
            fontSize: 72, fontWeight: 200, letterSpacing: '-0.03em',
            color: stateAfter.color, lineHeight: 1,
            fontVariantNumeric: 'tabular-nums',
          }}>+{displayCap}%</div>
          <div style={{
            fontSize: 13, fontWeight: 500, letterSpacing: '0.2em',
            textTransform: 'uppercase', color: sky.sub, marginTop: 10,
          }}>Capacity Gained</div>
        </div>

        {/* expanding windows comparison */}
        <div style={{
          marginTop: 36, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12,
        }}>
          {/* before */}
          <div style={{
            borderRadius: 18, padding: '20px 14px', textAlign: 'center',
            background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.35)',
            border: '0.5px solid ' + line,
            animation: 'varaFadeUp 1.2s ease',
          }}>
            <SansEyebrow color={sky.sub} style={{ marginBottom: 12 }}>3 Mins Ago</SansEyebrow>
            {/* narrow window */}
            <div style={{
              width: expanded ? 40 : 60, height: 80, margin: '0 auto',
              borderRadius: 10, position: 'relative', overflow: 'hidden',
              border: '1px solid ' + stateBefore.color + '60',
              transition: 'width 1.8s cubic-bezier(0.22, 1, 0.36, 1)',
            }}>
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(180deg, ' + stateBefore.color + '20 0%, ' + stateBefore.color + '08 100%)',
              }} />
              <div style={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 6, height: 6, borderRadius: '50%',
                background: stateBefore.color, boxShadow: '0 0 10px ' + stateBefore.color,
              }} />
            </div>
            <div style={{
              marginTop: 12, fontSize: 11, fontWeight: 500,
              color: stateBefore.color, letterSpacing: '0.1em', textTransform: 'uppercase',
            }}>{stateBefore.label}</div>
            <div style={{
              fontSize: 20, fontWeight: 300, color: sky.txt, marginTop: 4,
              fontVariantNumeric: 'tabular-nums',
            }}>SI {siBefore}</div>
          </div>

          {/* after */}
          <div style={{
            borderRadius: 18, padding: '20px 14px', textAlign: 'center',
            background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.5)',
            border: '0.5px solid ' + stateAfter.color + '30',
            boxShadow: '0 8px 30px ' + stateAfter.color + '12',
            animation: 'varaFadeUp 1.4s ease',
          }}>
            <SansEyebrow color={sky.sub} style={{ marginBottom: 12 }}>Now</SansEyebrow>
            {/* wide window */}
            <div style={{
              width: expanded ? 90 : 40, height: 80, margin: '0 auto',
              borderRadius: 10, position: 'relative', overflow: 'hidden',
              border: '1px solid ' + stateAfter.color + '60',
              transition: 'width 1.8s cubic-bezier(0.22, 1, 0.36, 1)',
            }}>
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(180deg, ' + stateAfter.color + '25 0%, ' + stateAfter.color + '08 100%)',
              }} />
              <div style={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 6, height: 6, borderRadius: '50%',
                background: stateAfter.color, boxShadow: '0 0 14px ' + stateAfter.color,
              }} />
            </div>
            <div style={{
              marginTop: 12, fontSize: 11, fontWeight: 500,
              color: stateAfter.color, letterSpacing: '0.1em', textTransform: 'uppercase',
            }}>{stateAfter.label}</div>
            <div style={{
              fontSize: 20, fontWeight: 300, color: sky.txt, marginTop: 4,
              fontVariantNumeric: 'tabular-nums',
            }}>SI {siAfter}</div>
          </div>
        </div>

        {/* narrative — moved above metrics */}
        <div style={{
          marginTop: 28, padding: '20px 18px', borderRadius: 18,
          background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.45)',
          border: '0.5px solid ' + line,
          animation: 'varaFadeUp 1.6s ease',
        }}>
          <p style={{
            fontSize: 13, fontWeight: 300, color: sky.txt, lineHeight: 1.65, margin: 0,
          }}>
            You just cleared the static and reclaimed {capacity}% of your biological capacity. You didn{'\u2019'}t need a nap {'\u2014'} you just needed to shift your gear.
          </p>
        </div>

        {/* pop-out metric pills */}
        <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {pills.map(function(p, i) {
            var open = pillOpen === i;
            return (
              <div key={i}>
                <button onClick={function() { togglePill(i); }} style={{
                  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '14px 16px', borderRadius: open ? '14px 14px 0 0' : 14,
                  background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.42)',
                  border: '0.5px solid ' + line, cursor: 'pointer',
                  fontFamily: 'var(--vara-sans)', textAlign: 'left',
                  borderBottom: open ? 'none' : '0.5px solid ' + line,
                  animation: 'varaFadeUp ' + (1.6 + i * 0.15) + 's ease',
                }}>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: sky.sub }}>{p.label}</div>
                    <div style={{ fontSize: 20, fontWeight: 300, color: stateAfter.color, marginTop: 2, fontVariantNumeric: 'tabular-nums' }}>
                      {p.value} <span style={{ fontSize: 11, color: sky.sub, fontWeight: 400 }}>{p.unit}</span>
                    </div>
                  </div>
                  <span style={{
                    fontSize: 16, color: sky.sub, transform: open ? 'rotate(180deg)' : 'rotate(0)',
                    transition: 'transform 0.3s ease',
                  }}>{'\u25BE'}</span>
                </button>
                {open && (
                  <div style={{
                    padding: '12px 16px 14px',
                    borderRadius: '0 0 14px 14px',
                    background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.35)',
                    border: '0.5px solid ' + line, borderTop: 'none',
                    animation: 'varaFadeUp 0.3s ease',
                  }}>
                    <p style={{ fontSize: 12, fontWeight: 300, color: sky.sub, lineHeight: 1.6, margin: 0 }}>{p.detail}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* PLAY CUE — v2.2: post-practice cue when regulated */}
        {showPlayCue && (
          <div style={{
            marginTop: 24, padding: '18px 18px 14px', borderRadius: 18,
            background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,250,248,0.55)',
            border: '0.5px solid ' + (isDark ? 'rgba(196,150,150,0.35)' : 'rgba(196,118,118,0.28)'),
            backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
            boxShadow: '0 12px 40px rgba(196,118,118,0.12)',
            animation: 'varaFadeUp 0.6s ease',
          }}>
            <div style={{ fontSize: 9.5, fontWeight: 500, letterSpacing: '0.28em',
              textTransform: 'uppercase', color: '#C47676', marginBottom: 10 }}>Play \u00b7 unmeasured</div>
            <div style={{ fontSize: 16, fontWeight: 400, color: sky.txt, lineHeight: 1.35,
              letterSpacing: '-0.005em', marginBottom: 14 }}>
              A minute of play? You have the bandwidth now.
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={function() { onNavigate('library'); }} style={{
                flex: 1, padding: '11px 0', borderRadius: 100,
                background: 'rgba(196,118,118,0.18)',
                border: '0.5px solid rgba(196,118,118,0.45)',
                cursor: 'pointer', fontFamily: 'var(--vara-sans)',
                fontSize: 11, fontWeight: 500, letterSpacing: '0.14em',
                textTransform: 'uppercase', color: '#C47676',
              }}>browse play</button>
              <button onClick={function() { setShowPlayCue(false); setCueDismissed(true); }} style={{
                flex: 1, padding: '11px 0', borderRadius: 100,
                background: 'transparent',
                border: '0.5px solid ' + line,
                cursor: 'pointer', fontFamily: 'var(--vara-sans)',
                fontSize: 11, fontWeight: 400, letterSpacing: '0.14em',
                textTransform: 'uppercase', color: sky.sub,
              }}>not today</button>
            </div>
          </div>
        )}

        {/* CTAs */}
        <div style={{
          marginTop: 28, display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center',
        }}>
          <button onClick={function() { onNavigate('home'); }} style={{
            width: '100%', padding: '14px 0', borderRadius: 100,
            background: stateAfter.color + '20', border: '0.5px solid ' + stateAfter.color + '50',
            cursor: 'pointer', fontFamily: 'var(--vara-sans)',
            fontSize: 12, fontWeight: 500, letterSpacing: '0.14em',
            textTransform: 'uppercase', color: stateAfter.color,
          }}>Back to Home</button>
          <button onClick={function() { setShareOpen(true); }} style={{
            background: 'transparent', border: 'none', cursor: 'pointer',
            fontFamily: 'var(--vara-sans)',
            fontSize: 11, fontWeight: 400, letterSpacing: '0.08em', color: sky.sub,
          }}>Share your Shift {'\u2192'}</button>
        </div>
      </div>
      {shareOpen && <ShiftShareModal
        sky={sky} stateAfter={stateAfter} stateBefore={stateBefore}
        capacity={capacity} coherence={coherence}
        siBefore={siBefore} siAfter={siAfter}
        onClose={function() { setShareOpen(false); }}
      />}
    </div>
  );
}

// ─── 9:16 share-card modal — wallpaper for social/save to phone ─────────
function ShiftShareModal({ sky, stateAfter, stateBefore, capacity, coherence, siBefore, siAfter, onClose }) {
  var isDark = sky.dark;
  var line = 'rgba(255,255,255,0.18)';
  var lineSoft = 'rgba(255,255,255,0.10)';
  // 9:16 wallpaper, sized to fit phone preview width
  var w = 320, h = Math.round(w * 16 / 9);
  return (
    <div onClick={onClose} style={{
      position: 'absolute', inset: 0, zIndex: 200,
      background: 'rgba(8,6,14,0.78)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start',
      padding: '60px 16px 24px', overflow: 'auto',
      animation: 'varaFadeUp 0.4s ease',
    }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        width: '100%', maxWidth: w, marginBottom: 18,
      }}>
        <div style={{
          fontFamily: 'var(--vara-mono), var(--vara-sans)', fontSize: 10, fontWeight: 500,
          letterSpacing: '0.24em', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase',
        }}>Wallpaper · 9 : 16</div>
        <button onClick={onClose} style={{
          width: 30, height: 30, borderRadius: '50%',
          background: 'rgba(255,255,255,0.08)', border: '0.5px solid ' + line,
          color: 'rgba(255,255,255,0.85)', fontSize: 14, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>{'\u00D7'}</button>
      </div>

      {/* the card */}
      <div onClick={function(e) { e.stopPropagation(); }} style={{
        width: w, height: h, borderRadius: 30, overflow: 'hidden',
        position: 'relative', flexShrink: 0,
        background: 'linear-gradient(170deg, ' + (stateAfter.color || sky.fp) + ' 0%, ' + sky.fp + ' 38%, #1a1426 100%)',
        boxShadow: '0 30px 80px rgba(0,0,0,0.55), 0 0 0 0.5px rgba(255,255,255,0.18) inset',
        fontFamily: 'var(--vara-sans)', color: '#fff',
        animation: 'varaFadeUp 0.6s cubic-bezier(0.22, 0.61, 0.36, 1)',
      }}>
        {/* atmospheric texture */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 20% 12%, rgba(255,255,255,0.20) 0%, transparent 55%), radial-gradient(ellipse at 80% 90%, rgba(255,200,150,0.18) 0%, transparent 60%)',
          mixBlendMode: 'screen',
        }} />
        {/* grain */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.25,
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)',
          backgroundSize: '3px 3px', mixBlendMode: 'overlay',
        }} />

        {/* TOP — wordmark */}
        <div style={{
          position: 'absolute', top: 28, left: 0, right: 0, textAlign: 'center',
          fontFamily: 'var(--vara-mono), var(--vara-sans)',
          fontSize: 10, fontWeight: 500, letterSpacing: '0.5em',
          textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)',
        }}>suna</div>

        {/* MIDDLE — capacity hero */}
        <div style={{
          position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', padding: '0 28px',
        }}>
          <div style={{
            fontFamily: 'var(--vara-mono), var(--vara-sans)',
            fontSize: 9, fontWeight: 500, letterSpacing: '0.32em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)',
            marginBottom: 18,
          }}>Capacity unlocked</div>
          <div style={{
            fontFamily: 'var(--vara-serif)', fontSize: 96, fontWeight: 200,
            letterSpacing: '-0.04em', lineHeight: 1, color: '#fff',
            textShadow: '0 6px 30px rgba(0,0,0,0.25)',
          }}>+{capacity}<span style={{ fontSize: 40, fontWeight: 200, marginLeft: 4 }}>%</span></div>

          <div style={{
            marginTop: 28, display: 'flex', alignItems: 'center', gap: 14,
            fontFamily: 'var(--vara-sans)', fontSize: 14, fontWeight: 300,
            letterSpacing: '0.02em', color: 'rgba(255,255,255,0.92)',
          }}>
            <span style={{ opacity: 0.65 }}>{stateBefore.label}</span>
            <span style={{
              width: 18, height: 1, background: 'rgba(255,255,255,0.45)',
            }} />
            <span style={{ fontWeight: 500 }}>{stateAfter.label}</span>
          </div>

          <div style={{
            marginTop: 36, fontFamily: 'var(--vara-serif)', fontSize: 17, fontWeight: 300,
            fontStyle: 'italic', textAlign: 'center', maxWidth: 240, lineHeight: 1.4,
            color: 'rgba(255,255,255,0.88)', textWrap: 'pretty',
          }}>{(REVEAL_VOICE && REVEAL_VOICE[Math.floor(Math.random() * REVEAL_VOICE.length)]) || 'Internal clearance achieved.'}</div>
        </div>

        {/* BOTTOM — metric strip */}
        <div style={{
          position: 'absolute', bottom: 28, left: 24, right: 24,
          display: 'flex', justifyContent: 'space-between',
          paddingTop: 16, borderTop: '0.5px solid ' + lineSoft,
        }}>
          <Stat label="System Tension" value={Math.round(((siBefore - siAfter) / siBefore) * 100) + '% \u2193'} />
          <Stat label="Coherence" value={coherence + '%'} />
          <Stat label="Heart" value={'\u2665'} mono />
        </div>
      </div>

      {/* actions */}
      <div style={{
        marginTop: 18, width: '100%', maxWidth: w,
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10,
      }}>
        <button onClick={function() { /* save handler */ }} style={{
          padding: '14px 0', borderRadius: 999,
          background: 'rgba(255,255,255,0.92)', border: 'none', cursor: 'pointer',
          fontFamily: 'var(--vara-sans)', fontSize: 11, fontWeight: 600,
          letterSpacing: '0.18em', textTransform: 'uppercase', color: '#1a1426',
        }}>Save to Phone</button>
        <button onClick={function() { /* share handler */ }} style={{
          padding: '14px 0', borderRadius: 999,
          background: 'rgba(255,255,255,0.08)', border: '0.5px solid ' + line, cursor: 'pointer',
          fontFamily: 'var(--vara-sans)', fontSize: 11, fontWeight: 500,
          letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.92)',
        }}>Share</button>
      </div>
      <div style={{
        marginTop: 12, fontFamily: 'var(--vara-sans)', fontSize: 11, fontWeight: 300,
        color: 'rgba(255,255,255,0.55)', letterSpacing: '0.02em',
      }}>tap outside to dismiss</div>
    </div>
  );
}

function Stat({ label, value, mono }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4 }}>
      <div style={{
        fontFamily: 'var(--vara-mono), var(--vara-sans)',
        fontSize: 8, fontWeight: 500, letterSpacing: '0.18em',
        textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)',
      }}>{label}</div>
      <div style={{
        fontFamily: mono ? 'var(--vara-sans)' : 'var(--vara-serif)',
        fontSize: 16, fontWeight: 300, letterSpacing: '-0.01em',
        color: 'rgba(255,255,255,0.95)',
      }}>{value}</div>
    </div>
  );
}

Object.assign(window, { ShiftScreen });
