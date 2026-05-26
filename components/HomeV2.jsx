/* Suna Home v2 — production iOS layout
   flex-col: status-bar-scrim (absolute) + scroll area (flex:1) + tab bar (fixed)
*/

// ─── Helpers ─────────────────────────────────
function SansEyebrow({ children, color, style }) {
  return React.createElement('div', { style: Object.assign({
      fontFamily: 'var(--vara-sans)', fontSize: 10, fontWeight: 400,
      letterSpacing: '0.24em', textTransform: 'uppercase', color: color, opacity: 0.82
    }, style || {}) }, children);
}

function SunaMono({ children, color, style }) {
  return React.createElement('span', { style: Object.assign({
      fontFamily: 'var(--vara-mono), var(--vara-sans)', fontSize: 11, fontWeight: 500, color: color
    }, style || {}) }, children);
}

function SectionHead({ eyebrow, title, sky }) {
  return (
    <div>
      <SansEyebrow color={sky.sub}>{eyebrow}</SansEyebrow>
      <div style={{
        marginTop: 10, fontSize: 22, fontWeight: 300, color: sky.txt,
        letterSpacing: '-0.015em', lineHeight: 1.2
      }}>{title}</div>
    </div>);

}

function SunaTabBar({ sky, isDark, onNavigate }) {
  const ln = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(60,50,40,0.08)';
  const ts = { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
    background: 'transparent', border: 'none', cursor: 'pointer',
    fontFamily: 'var(--vara-sans)', padding: 0 };
  const tl = (a) => ({ fontSize: 10, fontWeight: a ? 500 : 400,
    letterSpacing: '0.08em', textTransform: 'uppercase',
    color: a ? sky.txt : sky.sub, opacity: a ? 1 : 0.6 });

  return (
    <div style={{
      flexShrink: 0,
      background: isDark ? 'rgba(16,14,23,0.82)' : 'rgba(250,246,239,0.82)',
      backdropFilter: 'blur(28px) saturate(160%)',
      WebkitBackdropFilter: 'blur(28px) saturate(160%)',
      borderTop: '0.5px solid ' + ln,
      padding: '10px 28px 24px'
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-around' }}>
        <button style={ts}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M3 10.5L12 3l9 7.5V20a1 1 0 01-1 1h-5v-5a1 1 0 00-1-1h-4a1 1 0 00-1 1v5H4a1 1 0 01-1-1z"
            stroke={sky.txt} strokeWidth="1.2" strokeLinejoin="round" strokeLinecap="round" fill="none" />
          </svg>
          <span style={tl(true)}>Home</span>
        </button>
        <button style={Object.assign({}, ts, { marginTop: -24, position: 'relative' })}>
          <div style={{
            width: 52, height: 52, borderRadius: '50%',
            background: sky.fpSoft, border: '0.5px solid ' + sky.fp,
            backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 20px ' + sky.fpSoft
          }}>
            <FpGlyph color={sky.fp} size={24} opacity={0.9} />
          </div>
          <span style={Object.assign({}, tl(false), { marginTop: 2 })}>Scan</span>
        </button>
        <button onClick={function () {if (onNavigate) onNavigate('library');}} style={ts}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <g stroke={sky.sub} strokeWidth="1.1" strokeLinecap="round" fill="none">
              {/* fingerprint oval — concentric ovals open at the bottom */}
              <path d="M12 3.5 C 16 3.5, 19 7.4, 19 12 C 19 14.4, 18.5 16.6, 17.5 18.5" />
              <path d="M12 6 C 14.8 6, 17 9, 17 12 C 17 13.8, 16.7 15.4, 16 17" />
              <path d="M12 8.5 C 13.8 8.5, 15 10.6, 15 12 C 15 13.4, 14.7 14.7, 14.2 16" />
              <path d="M12 11 C 12.7 11, 13 11.5, 13 12.4 C 13 13.4, 12.5 14.4, 12 15.5" />
              {/* mirrored left side */}
              <path d="M12 3.5 C 8 3.5, 5 7.4, 5 12 C 5 14.4, 5.5 16.6, 6.5 18.5" />
              <path d="M12 6 C 9.2 6, 7 9, 7 12 C 7 13.8, 7.3 15.4, 8 17" />
              <path d="M12 8.5 C 10.2 8.5, 9 10.6, 9 12 C 9 13.4, 9.3 14.7, 9.8 16" />
            </g>
          </svg>
          <span style={tl(false)}>Library</span>
        </button>
      </div>
    </div>);

}

function QuoteCard({ sky, isDark }) {
  var [shareOpen, setShareOpen] = React.useState(false);
  var line = isDark ? 'rgba(255,255,255,0.14)' : 'rgba(50,40,30,0.12)';

  function handleShare() {setShareOpen(true);}

  return (
    <div style={{
      position: 'relative', borderRadius: 22, overflow: 'hidden',
      background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.5)',
      border: '0.5px solid ' + line,
      backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
      boxShadow: isDark ?
      '0 24px 48px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.2)' :
      '0 20px 40px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.04)'
    }}>
      {/* photo strip at top */}
      <div style={{
        height: 100, position: 'relative', overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', inset: -20,
          backgroundImage: 'url(' + sky.photo + ')',
          backgroundSize: 'cover', backgroundPosition: 'center',
          filter: 'blur(8px) saturate(120%)', transform: 'scale(1.2)'
        }} />
        <div style={{ position: 'absolute', inset: 0, background: sky.tint, opacity: 0.6 }} />
        {/* suna mark */}
        <div style={{
          position: 'absolute', top: 14, left: 18,
          fontSize: 10, fontWeight: 500, letterSpacing: '0.42em',
          textTransform: 'uppercase',
          color: isDark ? 'rgba(255,255,255,0.55)' : 'rgba(60,50,40,0.55)'
        }}>suna</div>
        {/* large quotation mark */}
        <div style={{
          position: 'absolute', bottom: -8, right: 20,
          fontSize: 72, fontWeight: 300, lineHeight: 1,
          color: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(60,50,40,0.12)',
          fontFamily: 'Georgia, serif'
        }}>{'\u201C'}</div>
      </div>

      {/* quote body */}
      <div style={{ padding: '24px 22px 20px' }}>
        <div style={{
          fontSize: 19, fontWeight: 300, color: sky.txt,
          lineHeight: 1.55, letterSpacing: '-0.005em'
        }}>
          The body keeps the score.
          <br />
          But it also holds the path back.
        </div>
        <div style={{
          marginTop: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between'
        }}>
          <SansEyebrow color={sky.sub} style={{ opacity: 0.6 }}>Bessel van der Kolk</SansEyebrow>

          {/* share button */}
          <button onClick={handleShare} style={{
            display: 'flex', alignItems: 'center', gap: 7,
            padding: '8px 14px', borderRadius: 100,
            background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(60,50,40,0.06)',
            border: '0.5px solid ' + line,
            cursor: 'pointer', fontFamily: 'var(--vara-sans)'
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M4 12v7a2 2 0 002 2h12a2 2 0 002-2v-7" stroke={sky.sub} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M16 6l-4-4-4 4M12 2v13" stroke={sky.sub} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{
              fontSize: 10, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: sky.sub
            }}>Share</span>
          </button>
        </div>
      </div>
      {shareOpen && <QuoteShareModal sky={sky} onClose={function () {setShareOpen(false);}} />}
    </div>);

}

// 9:16 wallpaper modal for the quote — matches the Shift share treatment
function QuoteShareModal({ sky, onClose }) {
  var w = 320,h = Math.round(w * 16 / 9);
  var line = 'rgba(255,255,255,0.18)';
  var lineSoft = 'rgba(255,255,255,0.10)';
  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.72)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      zIndex: 100, padding: '20px 0', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)'
    }}>
      <div style={{
        width: w, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: 14
      }}>
        <div style={{
          fontFamily: 'var(--vara-mono), var(--vara-sans)', fontSize: 10, fontWeight: 500,
          letterSpacing: '0.24em', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase'
        }}>Wallpaper · 9 : 16</div>
        <button onClick={onClose} style={{
          width: 30, height: 30, borderRadius: '50%',
          background: 'rgba(255,255,255,0.1)', border: '0.5px solid ' + line,
          color: 'rgba(255,255,255,0.85)', cursor: 'pointer', fontSize: 14, lineHeight: 1
        }}>{'\u00D7'}</button>
      </div>

      {/* the wallpaper card */}
      <div style={{
        width: w, height: h, borderRadius: 24, overflow: 'hidden', position: 'relative',
        boxShadow: '0 30px 60px rgba(0,0,0,0.5), 0 6px 18px rgba(0,0,0,0.35)'
      }}>
        {/* photo backdrop */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(' + sky.photo + ')',
          backgroundSize: 'cover', backgroundPosition: 'center',
          filter: 'saturate(118%) contrast(102%)'
        }} />
        <div style={{ position: 'absolute', inset: 0, background: sky.tint, opacity: 0.45 }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(0,0,0,0.32) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.55) 100%)'
        }} />

        {/* top — wordmark */}
        <div style={{
          position: 'absolute', top: 36, left: 0, right: 0, textAlign: 'center',
          fontFamily: 'var(--vara-mono), var(--vara-sans)',
          fontSize: 14, fontWeight: 400, letterSpacing: '0.6em', textTransform: 'lowercase',
          color: 'rgba(255,255,255,0.92)', textShadow: '0 1px 18px rgba(0,0,0,0.4)'
        }}>suna</div>

        {/* center — pull quote */}
        <div style={{
          position: 'absolute', top: '38%', left: 32, right: 32,
          transform: 'translateY(-50%)'
        }}>
          <div style={{
            fontSize: 86, fontWeight: 300, lineHeight: 0.6,
            color: 'rgba(255,255,255,0.45)', fontFamily: 'Georgia, serif',
            marginBottom: 18
          }}>{'\u201C'}</div>
          <div style={{
            fontFamily: 'var(--vara-serif, var(--vara-sans))',
            fontSize: 32, fontWeight: 300, lineHeight: 1.22,
            letterSpacing: '-0.012em', color: 'rgba(255,255,255,0.96)',
            textShadow: '0 1px 24px rgba(0,0,0,0.4)', textWrap: 'pretty'
          }}>The body keeps the score.<br />But it also holds the path back.</div>
          <div style={{
            marginTop: 22, fontSize: 11, fontWeight: 500,
            letterSpacing: '0.32em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.72)'
          }}>Bessel van der Kolk</div>
        </div>

        {/* bottom — attribution */}
        <div style={{
          position: 'absolute', bottom: 32, left: 0, right: 0, textAlign: 'center'
        }}>
          <div style={{
            fontFamily: 'var(--vara-mono), var(--vara-sans)',
            fontSize: 9, fontWeight: 500, letterSpacing: '0.36em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.6)'
          }}>widening the window</div>
          <div style={{
            marginTop: 8, height: 0.5, width: 80, margin: '8px auto 0',
            background: 'rgba(255,255,255,0.4)'
          }} />
        </div>
      </div>

      {/* CTA row */}
      <div style={{
        width: w, display: 'flex', flexDirection: 'column', gap: 10, marginTop: 18
      }}>
        <button style={{
          padding: '14px 0', borderRadius: 999,
          background: 'rgba(255,255,255,0.96)', border: 'none', cursor: 'pointer',
          fontFamily: 'var(--vara-sans)', fontSize: 11, fontWeight: 500,
          letterSpacing: '0.18em', textTransform: 'uppercase', color: '#1a1426'
        }}>Save to Phone</button>
        <button style={{
          padding: '14px 0', borderRadius: 999,
          background: 'rgba(255,255,255,0.08)', border: '0.5px solid ' + lineSoft, cursor: 'pointer',
          fontFamily: 'var(--vara-sans)', fontSize: 11, fontWeight: 500,
          letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.92)'
        }}>Share</button>
      </div>
    </div>);

}

// ─── Money & Performance fun-fact card with shuffle ─────────────
function MoneyFactCard({ sky, isDark }) {
  var line = isDark ? 'rgba(255,255,255,0.14)' : 'rgba(50,40,30,0.12)';
  var facts = typeof MONEY_FACTS !== 'undefined' && MONEY_FACTS ? MONEY_FACTS : [];
  var [idx, setIdx] = React.useState(0);
  var [spin, setSpin] = React.useState(false);
  function shuffle() {
    if (!facts.length) return;
    setSpin(true);
    setTimeout(function () {
      var n = idx;
      while (n === idx && facts.length > 1) n = Math.floor(Math.random() * facts.length);
      setIdx(n);
      setSpin(false);
    }, 240);
  }
  if (!facts.length) return null;
  var f = facts[idx];
  return (
    <div style={{ marginTop: 24 }}>
      <div style={{
        borderRadius: 18, padding: '26px 22px 22px',
        background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.55)',
        border: '0.5px solid ' + line, position: 'relative',
        boxShadow: isDark ? '0 8px 30px rgba(0,0,0,0.25)' : '0 8px 30px rgba(60,50,40,0.06)',
        opacity: spin ? 0.35 : 1,
        transform: spin ? 'translateY(4px) scale(0.99)' : 'translateY(0) scale(1)',
        transition: 'opacity 220ms ease, transform 240ms ease'
      }}>
        <div style={{
          fontFamily: 'var(--vara-mono), var(--vara-sans)',
          fontSize: 10, fontWeight: 500, color: sky.fp, letterSpacing: '0.18em'
        }}>{f.tag}</div>
        <div style={{
          fontFamily: 'var(--vara-serif)',
          fontSize: 24, fontWeight: 300, color: sky.txt, marginTop: 14,
          lineHeight: 1.2, letterSpacing: '-0.015em', textWrap: 'pretty'
        }}>{f.headline}</div>
        <div style={{
          fontFamily: 'var(--vara-sans)',
          fontStyle: 'italic', fontSize: 13, fontWeight: 300, color: sky.fp,
          marginTop: 12, letterSpacing: '0.005em', lineHeight: 1.45
        }}>{f.pull}</div>
        <div style={{
          fontFamily: 'var(--vara-sans)',
          fontSize: 12, fontWeight: 300, color: sky.sub, marginTop: 16, lineHeight: 1.55
        }}>{f.body}</div>
        <div style={{
          fontFamily: 'var(--vara-mono), var(--vara-sans)',
          fontSize: 9, fontWeight: 400, color: sky.sub, opacity: 0.65,
          marginTop: 18, letterSpacing: '0.1em'
        }}>{f.source}</div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 14 }}>
        <div style={{
          fontFamily: 'var(--vara-mono), var(--vara-sans)',
          fontSize: 9, fontWeight: 400, color: sky.sub, letterSpacing: '0.16em'
        }}>{String(idx + 1).padStart(2, '0')} / {String(facts.length).padStart(2, '0')}</div>
        <button onClick={shuffle} style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '10px 16px', borderRadius: 999,
          background: 'transparent', border: '0.5px solid ' + line,
          cursor: 'pointer', color: sky.txt,
          fontFamily: 'var(--vara-sans)',
          fontSize: 11, fontWeight: 400, letterSpacing: '0.08em'
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 3h5v5" />
            <path d="M4 20l17-17" />
            <path d="M21 16v5h-5" />
            <path d="M15 15l6 6" />
            <path d="M4 4l5 5" />
          </svg>
          Shuffle
        </button>
      </div>
    </div>);

}

// ─── Main ────────────────────────────────────
function HomeV2({ sky, onOpenPractice, onNavigate }) {
  const scrollRef = React.useRef(null);
  const heroPhotoRef = React.useRef(null);
  const orbRef1 = React.useRef(null);
  const orbRef2 = React.useRef(null);
  const hintRef = React.useRef(null);
  const statusBarRef = React.useRef(null);

  const [chipIdx, setChipIdx] = React.useState(null);
  const [rhythmTab, setRhythmTab] = React.useState(function () {
    return getCategoryForPhase(getPhaseForHour(new Date().getHours()));
  });
  const chip = chipIdx != null ? STATE_CHIPS[chipIdx] : null;
  const header = chip ? CHIP_HEADER[chip.label] : null;
  const recs = chip ?
  EXERCISES.filter(function (e) {return e.goals.some(function (g) {return chip.goals.includes(g);});}).slice(0, 3) :
  [];

  const isDark = sky.dark;
  const line = isDark ? 'rgba(255,255,255,0.16)' : 'rgba(50,40,30,0.14)';
  const lineSoft = isDark ? 'rgba(255,255,255,0.10)' : 'rgba(50,40,30,0.08)';

  const arc = [
  { id: 'sunrise', label: 'Sunrise', h: '6a' },
  { id: 'morning', label: 'Morning', h: '9a' },
  { id: 'goldenNoon', label: 'Noon', h: '12p' },
  { id: 'afternoon', label: 'Afternoon', h: '3p' },
  { id: 'goldenHour', label: 'Golden', h: '6p' },
  { id: 'dusk', label: 'Dusk', h: '8p' },
  { id: 'night', label: 'Night', h: '10p' }];

  const arcIdx = arc.findIndex(function (a) {return a.id === sky.id;});

  const calmBg = isDark ?
  'linear-gradient(180deg, #17151e 0%, #100e17 100%)' :
  'linear-gradient(180deg, #faf6ef 0%, #f2ede3 100%)';

  // Parallax scroll handler
  React.useEffect(function () {
    var el = scrollRef.current;
    if (!el) return;
    function onScroll() {
      var y = el.scrollTop;
      if (heroPhotoRef.current) {
        heroPhotoRef.current.style.transform = 'translate3d(0,' + y * 0.35 + 'px,0) scale(1.08)';
      }
      if (statusBarRef.current) {
        var t = Math.min(1, Math.max(0, (y - 60) / 80));
        statusBarRef.current.style.opacity = t;
      }
      if (orbRef1.current) {
        orbRef1.current.style.transform = 'translate3d(' + Math.sin(y * 0.008) * 14 + 'px,' + y * 0.18 + 'px,0)';
      }
      if (orbRef2.current) {
        orbRef2.current.style.transform = 'translate3d(' + Math.cos(y * 0.008) * 10 + 'px,' + y * 0.22 + 'px,0)';
      }
      if (hintRef.current) {
        hintRef.current.style.opacity = Math.max(0, 1 - y / 120);
      }
    }
    el.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return function () {el.removeEventListener('scroll', onScroll);};
  }, [sky.id]);

  return (
    <div style={{
      position: 'relative', width: '100%', height: '100%', overflow: 'hidden',
      fontFamily: 'var(--vara-sans)', background: calmBg,
      display: 'flex', flexDirection: 'column'
    }}>
      {/* Status bar scrim */}
      <div ref={statusBarRef} style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 54, zIndex: 10,
        background: isDark ? 'rgba(20,18,26,0.72)' : 'rgba(250,246,239,0.72)',
        backdropFilter: 'blur(22px) saturate(160%)',
        WebkitBackdropFilter: 'blur(22px) saturate(160%)',
        borderBottom: '0.5px solid ' + (isDark ? 'rgba(255,255,255,0.08)' : 'rgba(60,50,40,0.08)'),
        opacity: 0, pointerEvents: 'none', transition: 'opacity 0.12s linear'
      }} />

      {/* Scroll area */}
      <div ref={scrollRef} className="vara-scroll" data-dc-passthrough style={{
        position: 'relative', flex: 1, minHeight: 0,
        overflowY: 'auto', overflowX: 'hidden',
        WebkitOverflowScrolling: 'touch', color: sky.txt
      }}>

        {/* ═══ HERO ═══ */}
        <div style={{ position: 'relative', height: 780, overflow: 'hidden' }}>
          {/* photo */}
          <div ref={heroPhotoRef} style={{
            position: 'absolute', top: -120, left: 0, right: 0, bottom: -120,
            backgroundImage: 'url(' + sky.photo + ')',
            backgroundSize: 'cover', backgroundPosition: 'center',
            willChange: 'transform', transform: 'scale(1.08)'
          }} />
          {/* tint */}
          <div style={{ position: 'absolute', inset: 0, background: sky.tint }} />
          {/* specular bloom */}
          <div style={{
            position: 'absolute', top: 0, left: '-20%', right: '-20%', height: '60%',
            background: isDark ?
            'radial-gradient(ellipse at 50% 10%, rgba(255,255,255,0.12), transparent 60%)' :
            'radial-gradient(ellipse at 50% 20%, rgba(255,255,255,0.32), transparent 62%)',
            mixBlendMode: 'screen', pointerEvents: 'none'
          }} />
          {/* bottom fade */}
          <div style={{
            position: 'absolute', left: 0, right: 0, bottom: 0, height: 260,
            background: isDark ?
            'linear-gradient(180deg, rgba(23,21,30,0) 0%, rgba(23,21,30,0.7) 55%, rgba(23,21,30,1) 100%)' :
            'linear-gradient(180deg, rgba(250,246,239,0) 0%, rgba(250,246,239,0.7) 55%, rgba(250,246,239,1) 100%)'
          }} />
          {/* grain */}
          <div style={{
            position: 'absolute', inset: 0, opacity: 0.06, mixBlendMode: 'overlay', pointerEvents: 'none',
            backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")"
          }} />

          {/* breathing orbs */}
          <div ref={orbRef1} style={{
            position: 'absolute', top: 120, left: -40,
            width: 220, height: 220, borderRadius: '50%',
            background: 'radial-gradient(circle, ' + sky.fpSoft + ' 0%, transparent 70%)',
            filter: 'blur(20px)', animation: 'varaBreathe 7s ease-in-out infinite',
            willChange: 'transform', pointerEvents: 'none'
          }} />
          <div ref={orbRef2} style={{
            position: 'absolute', top: 320, right: -60,
            width: 260, height: 260, borderRadius: '50%',
            background: 'radial-gradient(circle, ' + sky.fpSoft + ' 0%, transparent 70%)',
            filter: 'blur(26px)', animation: 'varaBreathe 9s ease-in-out infinite 1s',
            willChange: 'transform', pointerEvents: 'none'
          }} />

          {/* content over hero */}
          <div style={{ position: 'relative', padding: '60px 28px 0' }}>
            {/* top rail */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <SunaMono color={sky.txt} style={{ letterSpacing: '0.42em', fontSize: 12 }}>suna</SunaMono>
              <button onClick={function () {if (onNavigate) onNavigate('profile');}} style={{
                width: 34, height: 34, borderRadius: '50%',
                background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(80,60,40,0.08)',
                border: '0.5px solid ' + line, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 400, color: sky.txt,
                fontFamily: 'var(--vara-sans)'
              }}>E</button>
            </div>

            {/* greeting */}
            <div style={{ marginTop: 72, textAlign: 'center' }}>
              <SansEyebrow color={sky.sub} style={{ marginBottom: 14 }}>{sky.phase} · {(function(){ try { return localStorage.getItem('suna.userName') || 'Eva'; } catch(e) { return 'Eva'; } })()}</SansEyebrow>
              <div style={{
                fontFamily: 'var(--vara-sans)', fontWeight: 300, letterSpacing: '-0.01em',
                fontSize: 30, lineHeight: 1.18, color: sky.txt,
                maxWidth: 300, margin: '0 auto'
              }}>
                {sky.greeting((function(){ try { return localStorage.getItem('suna.userName') || 'Eva'; } catch(e) { return 'Eva'; } })())}
              </div>
            </div>

            {/* scan button */}
            <div style={{ marginTop: 64, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ position: 'relative', width: 240, height: 240 }}>
                {[0, 1, 2].map(function (i) {
                  return <div key={i} style={{
                    position: 'absolute', inset: i * 14, borderRadius: '50%',
                    border: '0.5px solid ' + line, opacity: 1 - i * 0.25,
                    animation: 'varaBreathe ' + (6 + i) + 's ease-in-out infinite ' + i * 0.4 + 's'
                  }} />;
                })}
                <button style={{
                  position: 'absolute', inset: 50, borderRadius: '50%',
                  border: '0.5px solid ' + sky.fp, background: sky.fpSoft,
                  backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
                  cursor: 'pointer', display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 0 50px ' + sky.fpSoft + ', inset 0 0 30px ' + sky.fpSoft,
                  animation: 'varaPulse 4s ease-out infinite', padding: 0
                }}>
                  <FpGlyph color={sky.fp} size={46} opacity={0.9} />
                  <div style={{
                    marginTop: 10, fontSize: 9, fontWeight: 400, letterSpacing: '0.32em',
                    textTransform: 'uppercase', color: sky.sub
                  }}>Tap to scan</div>
                </button>
              </div>
              <div style={{
                marginTop: 26, textAlign: 'center', fontSize: 13, fontWeight: 300,
                color: sky.sub, letterSpacing: '0.01em', maxWidth: 260, lineHeight: 1.5
              }}>a moment of honesty with the body</div>
            </div>
          </div>

          {/* scroll hint */}
          <div ref={hintRef} style={{
            position: 'absolute', bottom: 96, left: 0, right: 0,
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            gap: 8, pointerEvents: 'none', animation: 'varaDrift 3.2s ease-in-out infinite'
          }}>
            <div style={{
              fontSize: 9, fontWeight: 500, letterSpacing: '0.32em',
              textTransform: 'uppercase', color: sky.sub, opacity: 0.7
            }}>scroll</div>
            <svg width="12" height="14" viewBox="0 0 12 14" style={{ opacity: 0.6 }}>
              <path d="M6 2 L6 12 M2 8 L6 12 L10 8" stroke={sky.sub} strokeWidth="0.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* ═══ BODY (calm bg) ═══ */}
        <div style={{ position: 'relative', padding: '0 0 40px', marginTop: -40 }}>

          {/* STATE CHIPS */}
          <div style={{ padding: '0 24px' }}>
            <SectionHead eyebrow="How are you meeting this moment" title="Where are you, right now?" sky={sky} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginTop: 20 }}>
              {STATE_CHIPS.map(function (c, i) {
                var active = chipIdx === i;
                var dim = chipIdx !== null && chipIdx !== i;
                return (
                  <button key={c.label} onClick={function () {setChipIdx(active ? null : i);}} style={{
                    borderRadius: 14, padding: '16px 10px',
                    background: active ? c.color + '22' : 'transparent',
                    border: '0.5px solid ' + (active ? c.color + '66' : line),
                    cursor: 'pointer', textAlign: 'center',
                    opacity: dim ? 0.4 : 1, transition: 'all 0.24s ease',
                    fontFamily: 'var(--vara-sans)'
                  }}>
                    <div style={{
                      width: 7, height: 7, borderRadius: '50%', background: c.color,
                      margin: '0 auto 10px', boxShadow: '0 0 10px ' + c.color + '80'
                    }} />
                    <div style={{ fontSize: 13, fontWeight: 400, color: sky.txt, letterSpacing: '-0.005em' }}>{c.label}</div>
                    <div style={{ fontSize: 9.5, fontWeight: 300, color: sky.sub, marginTop: 4, letterSpacing: '0.02em' }}>{c.micro}</div>
                  </button>);

              })}
            </div>

            {/* chip reveal */}
            {chip &&
            <div style={{ marginTop: 20, animation: 'varaFadeUp 0.5s ease' }}>
                <div style={{
                borderRadius: 18, padding: '20px 20px 8px',
                background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.55)',
                border: '0.5px solid ' + line, borderLeft: '2px solid ' + chip.color
              }}>
                  <SansEyebrow color={chip.color} style={{ marginBottom: 10 }}>For you, now</SansEyebrow>
                  <div style={{
                  fontSize: 20, fontWeight: 400, letterSpacing: '-0.01em',
                  color: sky.txt, lineHeight: 1.25, marginBottom: 6
                }}>{header.title}</div>
                  <p style={{
                  fontSize: 12.5, fontWeight: 300, color: sky.sub,
                  lineHeight: 1.6, margin: '0 0 14px'
                }}>{header.sub}</p>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {recs.map(function (ex, idx) {
                    return (
                      <button key={ex.id} onClick={function () {onOpenPractice(ex);}} style={{
                        display: 'flex', alignItems: 'center', gap: 14,
                        padding: '14px 0', background: 'transparent', border: 'none',
                        borderTop: idx > 0 ? '0.5px solid ' + lineSoft : 'none',
                        cursor: 'pointer', textAlign: 'left', fontFamily: 'var(--vara-sans)'
                      }}>
                          <div style={{
                          width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
                          background: chip.color + '22', border: '0.5px solid ' + chip.color + '44',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 14, color: chip.color
                        }}>{TYPE_GLYPH[ex.type]}</div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: 14, fontWeight: 400, color: sky.txt, letterSpacing: '-0.005em' }}>{ex.name}</div>
                            <div style={{ fontSize: 10, fontWeight: 300, color: sky.sub, marginTop: 3, letterSpacing: '0.04em' }}>{ex.minutes} min · {ex.pattern}</div>
                          </div>
                          <span style={{ fontSize: 16, color: chip.color, opacity: 0.7 }}>{'\u2192'}</span>
                        </button>);

                  })}
                  </div>
                </div>
              </div>
            }
          </div>

          {/* DAY RHYTHM — practices per phase */}
          <div style={{ padding: '64px 24px 0' }}>
            <SectionHead eyebrow="Today's rhythm" title="The day has a shape." sky={sky} />

            {/* phase tabs */}
            <div style={{ display: 'flex', gap: 8, marginTop: 22 }}>
              {[
              { id: 'sparks', label: 'rise', time: '6a\u201311a', color: '#E8A572' },
              { id: 'flow', label: 'flow', time: '11a\u20134p', color: '#7AC4B0' },
              { id: 'anchors', label: 'land', time: '4p\u201312a', color: '#8A7EB0' }].
              map(function (t) {
                var currentPhase = getPhaseForHour(new Date().getHours());
                var currentCat = getCategoryForPhase(currentPhase);
                var active = rhythmTab === t.id;
                var isCurrent = currentCat === t.id;
                return (
                  <button key={t.id} onClick={function () {setRhythmTab(t.id);}} style={{
                    flex: 1, padding: '10px 6px', borderRadius: 12,
                    background: active ? t.color + '1A' : 'transparent',
                    border: '0.5px solid ' + (active ? t.color + '50' : line),
                    cursor: 'pointer', textAlign: 'center',
                    fontFamily: 'var(--vara-sans)', transition: 'all 0.22s'
                  }}>
                    <div style={{
                      fontSize: 12, fontWeight: active ? 500 : 400,
                      color: active ? t.color : sky.txt, letterSpacing: '-0.005em'
                    }}>{t.label}</div>
                    <div style={{
                      fontSize: 8.5, fontWeight: 300, color: active ? t.color : sky.sub,
                      marginTop: 2, letterSpacing: '0.04em', opacity: 0.75
                    }}>{t.time}{isCurrent ? ' \u00B7 now' : ''}</div>
                  </button>);

              })}
            </div>

            {/* practice cards for active tab */}
            <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {(PRACTICES[rhythmTab] || []).map(function (p) {
                var tabColor = rhythmTab === 'sparks' ? '#E8A572' : rhythmTab === 'flow' ? '#7AC4B0' : rhythmTab === 'play' ? '#C49696' : '#8A7EB0';
                return (
                  <button key={p.id} onClick={function () {onOpenPractice(p);}} style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '12px 12px', borderRadius: 14,
                    background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.45)',
                    border: '0.5px solid ' + line,
                    cursor: 'pointer', textAlign: 'left',
                    fontFamily: 'var(--vara-sans)'
                  }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: 10, flexShrink: 0,
                      overflow: 'hidden', position: 'relative'
                    }}>
                      <div style={{
                        position: 'absolute', inset: 0,
                        backgroundImage: 'url(' + p.photo + ')',
                        backgroundSize: 'cover', backgroundPosition: 'center'
                      }} />
                      <div style={{
                        position: 'absolute', inset: 0,
                        background: tabColor + '40', mixBlendMode: 'soft-light'
                      }} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 14, fontWeight: 400, color: sky.txt, letterSpacing: '-0.005em' }}>{p.name}</div>
                      <div style={{ fontSize: 9.5, fontWeight: 300, color: sky.sub, marginTop: 2, letterSpacing: '0.04em' }}>{p.minutes} min \u00B7 {p.subtitle}</div>
                    </div>
                    <span style={{ fontSize: 14, color: tabColor, opacity: 0.7, flexShrink: 0 }}>{'\u2192'}</span>
                  </button>);

              })}
            </div>

            {/* see all link */}
            {onNavigate &&
            <button onClick={function () {onNavigate('library');}} style={{
              width: '100%', marginTop: 10, padding: '10px 0',
              background: 'transparent', border: 'none', cursor: 'pointer',
              fontFamily: 'var(--vara-sans)',
              fontSize: 11, fontWeight: 400, letterSpacing: '0.06em', color: sky.sub,
              textAlign: 'center'
            }}>View all 15 practices {'\u2192'}</button>
            }
          </div>

          {/* BASELINE */}
          <div style={{ padding: '70px 28px 0' }}>
            <SectionHead eyebrow="Baseline forming" title="Six mornings to go." sky={sky} />
            <div style={{
              marginTop: 22, padding: '18px 0',
              borderTop: '0.5px solid ' + line, borderBottom: '0.5px solid ' + line,
              display: 'flex', alignItems: 'center', gap: 14
            }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 400, color: sky.txt, letterSpacing: '-0.005em' }}>Day 1 of 7</div>
                <div style={{ fontSize: 11, fontWeight: 300, color: sky.sub, marginTop: 4, letterSpacing: '0.02em', lineHeight: 1.5 }}>Each morning scan sharpens your baseline.</div>
              </div>
              <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
                {[0, 1, 2, 3, 4, 5, 6].map(function (i) {
                  return <div key={i} style={{
                    width: i === 0 ? 7 : 4, height: i === 0 ? 7 : 4, borderRadius: '50%',
                    background: i === 0 ? sky.fp : sky.sub, opacity: i === 0 ? 1 : 0.35,
                    boxShadow: i === 0 ? '0 0 10px ' + sky.fp : 'none'
                  }} />;
                })}
              </div>
            </div>
          </div>

          {/* WHY — single card with shuffle, pulls from MONEY_FACTS */}
          <div style={{ padding: '70px 24px 0' }}>
            <SectionHead eyebrow="Why we do the work" title="Small moments, measurable change." sky={sky} />
            <MoneyFactCard sky={sky} isDark={isDark} />
          </div>

          {/* SHAREABLE QUOTE CARD */}
          <div style={{ padding: '80px 24px 40px' }}>
            <QuoteCard sky={sky} isDark={isDark} />
          </div>

          {/* clearance for tab bar */}
          <div style={{ height: 80 }} />

        </div>
      </div>

      {/* Tab bar */}
      <SunaTabBar sky={sky} isDark={isDark} onNavigate={onNavigate} />
    </div>);

}

Object.assign(window, { HomeV2, SunaTabBar, SansEyebrow, SunaMono });