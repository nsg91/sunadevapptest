/* ProfileScreen v2.2 — state-driven profile with one-flower-per-day Garden.
   Three states: Baseline Forming (Days 1–7) → Recently Established (8–~30) → Garden State (~30+).
   No streaks. No counters on the Garden. The Garden waits. */

function ProfileScreen({ sky, onBack, onOpenSettings }) {
  var isDark = sky.dark;
  var line = isDark ? 'rgba(255,255,255,0.14)' : 'rgba(50,40,30,0.12)';
  var lineSoft = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(50,40,30,0.06)';

  // Tweakable: which state to render
  var [profileState, setProfileState] = React.useState('baseline'); // baseline | recent | garden
  var [baselineDay, setBaselineDay] = React.useState(3); // 1..7

  // ── FLOWER LIBRARY ─────────────────────────
  // Vivid, tropical, distinct. Each rendered as a small SVG portrait.
  function Flower({ kind, size, dim }) {
    var s = size || 44;
    var op = dim ? 0.55 : 1;
    if (kind === 'hibiscus') return (
      <svg width={s} height={s} viewBox="0 0 60 60" style={{ opacity: op }}>
        <defs>
          <radialGradient id={'h'+s} cx="50%" cy="50%"><stop offset="0%" stopColor="#FFE4DC"/><stop offset="60%" stopColor="#FF4F8B"/><stop offset="100%" stopColor="#C32466"/></radialGradient>
        </defs>
        {[0,72,144,216,288].map(function(a,i){return <ellipse key={i} cx="30" cy="18" rx="9" ry="14" fill={'url(#h'+s+')'} transform={'rotate('+a+' 30 30)'} />;})}
        <circle cx="30" cy="30" r="4.5" fill="#FFD24A"/>
        <circle cx="30" cy="30" r="1.6" fill="#9C2A57"/>
      </svg>
    );
    if (kind === 'pinkLily') return (
      <svg width={s} height={s} viewBox="0 0 60 60" style={{ opacity: op }}>
        <defs><radialGradient id={'pl'+s} cx="50%" cy="40%"><stop offset="0%" stopColor="#FFC4DD"/><stop offset="70%" stopColor="#E64A92"/><stop offset="100%" stopColor="#A4276A"/></radialGradient></defs>
        {[0,60,120,180,240,300].map(function(a,i){return <path key={i} d="M30 30 Q22 12 30 4 Q38 12 30 30 Z" fill={'url(#pl'+s+')'} transform={'rotate('+a+' 30 30)'} stroke="#9C2A57" strokeWidth="0.3"/>;})}
        <circle cx="30" cy="30" r="3" fill="#FFE26E"/>
        {[0,60,120,180,240,300].map(function(a,i){return <line key={i} x1="30" y1="30" x2="30" y2="22" stroke="#C32466" strokeWidth="0.6" transform={'rotate('+a+' 30 30)'}/>;})}
      </svg>
    );
    if (kind === 'orchid') return (
      <svg width={s} height={s} viewBox="0 0 60 60" style={{ opacity: op }}>
        <defs><radialGradient id={'or'+s} cx="50%" cy="50%"><stop offset="0%" stopColor="#FFFFFF"/><stop offset="80%" stopColor="#F4D5E8"/></radialGradient></defs>
        <ellipse cx="14" cy="22" rx="11" ry="8" fill={'url(#or'+s+')'} transform="rotate(-30 14 22)" stroke="#D86AB0" strokeWidth="0.4"/>
        <ellipse cx="46" cy="22" rx="11" ry="8" fill={'url(#or'+s+')'} transform="rotate(30 46 22)" stroke="#D86AB0" strokeWidth="0.4"/>
        <ellipse cx="30" cy="14" rx="9" ry="11" fill={'url(#or'+s+')'} stroke="#D86AB0" strokeWidth="0.4"/>
        <path d="M30 30 Q22 38 26 50 Q30 44 34 50 Q38 38 30 30" fill="#B83C90" stroke="#7A1F60" strokeWidth="0.4"/>
        <circle cx="30" cy="30" r="2" fill="#FFD24A"/>
      </svg>
    );
    if (kind === 'redAnthurium') return (
      <svg width={s} height={s} viewBox="0 0 60 60" style={{ opacity: op }}>
        <defs><linearGradient id={'ra'+s} x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#FF5A4A"/><stop offset="100%" stopColor="#9B1820"/></linearGradient></defs>
        <path d="M30 6 L48 38 Q30 52 12 38 Z" fill={'url(#ra'+s+')'} stroke="#7A0F18" strokeWidth="0.5"/>
        <path d="M30 12 Q34 28 30 46" stroke="#FFEC8B" strokeWidth="2.4" fill="none" strokeLinecap="round"/>
        <circle cx="30" cy="32" r="0.8" fill="#FFE26E"/>
      </svg>
    );
    if (kind === 'coralAnthurium') return (
      <svg width={s} height={s} viewBox="0 0 60 60" style={{ opacity: op }}>
        <defs><linearGradient id={'ca'+s} x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#FFB89B"/><stop offset="100%" stopColor="#E26A4A"/></linearGradient></defs>
        <path d="M30 6 L48 38 Q30 52 12 38 Z" fill={'url(#ca'+s+')'} stroke="#A04428" strokeWidth="0.5"/>
        <path d="M30 12 Q34 28 30 46" stroke="#FFE8C8" strokeWidth="2.4" fill="none" strokeLinecap="round"/>
      </svg>
    );
    if (kind === 'callaLily') return (
      <svg width={s} height={s} viewBox="0 0 60 60" style={{ opacity: op }}>
        <defs><linearGradient id={'cl'+s} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#FFFFFF"/><stop offset="100%" stopColor="#F2E6F0"/></linearGradient></defs>
        <path d="M30 8 Q14 18 22 44 Q30 30 38 44 Q46 18 30 8 Z" fill={'url(#cl'+s+')'} stroke="#C8A0BC" strokeWidth="0.5"/>
        <path d="M30 14 L30 38" stroke="#E2C26A" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    );
    if (kind === 'cymbidium') return (
      <svg width={s} height={s} viewBox="0 0 60 60" style={{ opacity: op }}>
        <defs><radialGradient id={'cy'+s} cx="50%" cy="50%"><stop offset="0%" stopColor="#F4FFC4"/><stop offset="80%" stopColor="#BDE05A"/></radialGradient></defs>
        {[0,72,144,216,288].map(function(a,i){return <ellipse key={i} cx="30" cy="20" rx="6" ry="11" fill={'url(#cy'+s+')'} transform={'rotate('+a+' 30 30)'} stroke="#7CA022" strokeWidth="0.4"/>;})}
        <circle cx="30" cy="30" r="3.5" fill="#A8412E"/>
        <circle cx="30" cy="30" r="1.5" fill="#FFE26E"/>
      </svg>
    );
    if (kind === 'plumeria') return (
      <svg width={s} height={s} viewBox="0 0 60 60" style={{ opacity: op }}>
        <defs><radialGradient id={'pm'+s} cx="50%" cy="50%"><stop offset="0%" stopColor="#FFE26E"/><stop offset="40%" stopColor="#FFFAF0"/><stop offset="100%" stopColor="#FFC0D2"/></radialGradient></defs>
        {[0,72,144,216,288].map(function(a,i){return <path key={i} d="M30 30 Q22 16 30 8 Q38 16 30 30 Z" fill={'url(#pm'+s+')'} transform={'rotate('+a+' 30 30)'}/>;})}
        <circle cx="30" cy="30" r="3" fill="#FFC840"/>
      </svg>
    );
    if (kind === 'larkspur') return (
      <svg width={s} height={s} viewBox="0 0 60 60" style={{ opacity: op }}>
        <defs><radialGradient id={'lk'+s} cx="50%" cy="50%"><stop offset="0%" stopColor="#C8B6FF"/><stop offset="100%" stopColor="#5A3BB0"/></radialGradient></defs>
        <line x1="30" y1="56" x2="30" y2="14" stroke="#7B6AB8" strokeWidth="1"/>
        {[[30,12,5,7],[24,20,4.5,6],[36,20,4.5,6],[26,28,4,5],[34,28,4,5],[28,38,3.5,4.5]].map(function(c,i){
          return <ellipse key={i} cx={c[0]} cy={c[1]} rx={c[2]} ry={c[3]} fill={'url(#lk'+s+')'} stroke="#3A1F80" strokeWidth="0.3"/>;
        })}
      </svg>
    );
    if (kind === 'daylily') return (
      <svg width={s} height={s} viewBox="0 0 60 60" style={{ opacity: op }}>
        <defs><radialGradient id={'dl'+s} cx="50%" cy="50%"><stop offset="0%" stopColor="#FFE0D2"/><stop offset="80%" stopColor="#F08AA8"/></radialGradient></defs>
        {[0,60,120,180,240,300].map(function(a,i){return <path key={i} d="M30 30 Q24 18 30 6 Q36 18 30 30 Z" fill={'url(#dl'+s+')'} transform={'rotate('+a+' 30 30)'} stroke="#C44E78" strokeWidth="0.3"/>;})}
        <circle cx="30" cy="30" r="3" fill="#9E2E54"/>
        <circle cx="30" cy="30" r="1" fill="#FFE26E"/>
      </svg>
    );
    if (kind === 'caladium') return (
      <svg width={s} height={s} viewBox="0 0 60 60" style={{ opacity: op }}>
        <defs><radialGradient id={'cd'+s} cx="50%" cy="60%"><stop offset="0%" stopColor="#FFB8D8"/><stop offset="60%" stopColor="#E27AAA"/><stop offset="100%" stopColor="#3A6A2E"/></radialGradient></defs>
        <path d="M30 6 Q14 22 18 46 Q30 38 42 46 Q46 22 30 6 Z" fill={'url(#cd'+s+')'} stroke="#2A4E20" strokeWidth="0.5"/>
        <path d="M30 10 L30 42 M22 18 Q26 26 30 28 M38 18 Q34 26 30 28" stroke="#2A4E20" strokeWidth="0.4" fill="none"/>
      </svg>
    );
    // seed (empty cell)
    return (
      <svg width={s} height={s} viewBox="0 0 60 60" style={{ opacity: 0.32 }}>
        <circle cx="30" cy="30" r="2.5" fill={sky.sub} opacity="0.4"/>
      </svg>
    );
  }

  var FLOWERS = ['hibiscus','pinkLily','orchid','redAnthurium','coralAnthurium','callaLily','cymbidium','plumeria','daylily','caladium'];

  // Pseudo-random but deterministic flower for a given day index
  function flowerFor(seed) {
    return FLOWERS[seed % FLOWERS.length];
  }

  // ─── HEADER ─────
  function Header() {
    return (
      <div style={{ marginBottom: 28 }}>
        <button onClick={onBack} style={{
          background: 'transparent', border: 'none', cursor: 'pointer',
          fontSize: 11, fontWeight: 400, letterSpacing: '0.14em', textTransform: 'uppercase',
          color: sky.sub, fontFamily: 'var(--vara-sans)', padding: 0, marginBottom: 22,
        }}>{'\u2190'} Back</button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{
              width: 56, height: 56, borderRadius: '50%',
              background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(80,60,40,0.08)',
              border: '0.5px solid ' + line,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 22, fontWeight: 300, color: sky.txt,
            }}>{(function(){ try { return (localStorage.getItem('suna.userName') || 'Eva').charAt(0).toUpperCase(); } catch(e) { return 'E'; } })()}</div>
            <div>
              <div style={{ fontSize: 24, fontWeight: 300, color: sky.txt, letterSpacing: '-0.01em' }}>{(function(){ try { return localStorage.getItem('suna.userName') || 'Eva'; } catch(e) { return 'Eva'; } })()}</div>
              <div style={{ fontSize: 11, fontWeight: 300, color: sky.sub, marginTop: 3, letterSpacing: '0.04em' }}>
                {profileState === 'baseline' ? 'baseline forming' : profileState === 'recent' ? 'baseline established' : 'garden, season three'}
              </div>
            </div>
          </div>
          {onOpenSettings && (
            <button onClick={onOpenSettings} aria-label="settings" style={{
              width: 38, height: 38, borderRadius: '50%',
              background: 'transparent', border: '0.5px solid ' + line,
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: sky.sub
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.4" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </button>
          )}
        </div>
      </div>
    );
  }

  // ─── DROPPED ─────

  // ─── STATE A: BASELINE FORMING ─────
  function StateA() {
    var dotRow = [];
    for (var i = 0; i < 7; i++) dotRow.push(i);
    var why = baselineDay <= 1 ? "We\u2019re comparing you to the average right now. By Day 7, we\u2019ll know what your normal looks like."
           : baselineDay <= 3 ? "Your nervous system has a signature. A few more mornings and we\u2019ll find it."
           : baselineDay <= 5 ? "Halfway there. Your baseline is taking shape."
           : baselineDay === 6 ? "Tomorrow, suna stops guessing."
           : "Today\u2019s the day. Your baseline locks in.";

    return (
      <div>
        {/* Hero — Baseline Counter */}
        <div style={{ marginBottom: 12 }}>
          <SansEyebrow color={sky.sub}>Baseline forming</SansEyebrow>
          <div style={{
            fontSize: 30, fontWeight: 300, color: sky.txt, marginTop: 10,
            letterSpacing: '-0.015em', lineHeight: 1.18,
          }}>{(7 - baselineDay)} mornings to go.</div>
        </div>

        {/* progress dots */}
        <div style={{
          padding: '20px 0 24px', borderTop: '0.5px solid ' + line, borderBottom: '0.5px solid ' + line,
          marginTop: 16,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <div style={{ fontSize: 13, fontWeight: 400, color: sky.txt }}>Day {baselineDay} of 7</div>
            <div style={{ fontSize: 11, fontWeight: 300, color: sky.sub, letterSpacing: '0.04em' }}>each morning sharpens it</div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {dotRow.map(function(i) {
              var done = i < baselineDay;
              var current = i === baselineDay - 1;
              return (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
                  <div style={{
                    width: current ? 11 : 8, height: current ? 11 : 8, borderRadius: '50%',
                    background: done ? sky.fp : 'transparent',
                    border: '0.5px solid ' + (done ? sky.fp : sky.sub),
                    boxShadow: current ? '0 0 14px ' + sky.fp : 'none',
                    transition: 'all 0.4s ease',
                  }} />
                  <div style={{ fontSize: 8, fontWeight: 400, color: done ? sky.txt : sky.sub, opacity: done ? 0.7 : 0.5,
                    letterSpacing: '0.06em' }}>{i + 1}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Today's status */}
        <div style={{
          marginTop: 22, padding: '16px 18px', borderRadius: 14,
          background: isDark ? 'rgba(120,200,160,0.08)' : 'rgba(120,180,140,0.10)',
          border: '0.5px solid ' + (isDark ? 'rgba(120,200,160,0.22)' : 'rgba(120,180,140,0.28)'),
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M5 13l4 4L19 7" stroke={isDark ? '#88E0B2' : '#3CA064'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div style={{ fontSize: 13, fontWeight: 400, color: sky.txt }}>You{'\u2019'}ve checked in this morning.</div>
        </div>

        {/* Why it matters — rotates per day */}
        <div style={{ marginTop: 28 }}>
          <SansEyebrow color={sky.sub} style={{ marginBottom: 10 }}>Why it matters</SansEyebrow>
          <p style={{ fontSize: 14, fontWeight: 300, fontStyle: 'italic', color: sky.txt,
            lineHeight: 1.6, margin: 0, letterSpacing: '-0.005em' }}>{why}</p>
        </div>

        {/* The first sprout — quiet, almost-empty Garden */}
        <div style={{ marginTop: 36 }}>
          <SansEyebrow color={sky.sub} style={{ marginBottom: 14 }}>Your Garden, beginning</SansEyebrow>
          <div style={{
            borderRadius: 22, padding: '34px 16px 28px',
            background: isDark ? 'rgba(255,255,255,0.025)' : 'rgba(255,255,255,0.32)',
            border: '0.5px solid ' + lineSoft,
            textAlign: 'center', position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 10, alignItems: 'flex-end' }}>
              {dotRow.map(function(i) {
                var bloomed = i < baselineDay - 1;
                var today = i === baselineDay - 1;
                return (
                  <div key={i} style={{ width: 36, height: 44, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                    {bloomed ? <Flower kind={flowerFor(i + 1)} size={32} dim={true} />
                      : today ? (
                        <div style={{ width: 12, height: 28, position: 'relative' }}>
                          <div style={{ position: 'absolute', bottom: 0, left: '50%', width: 1, height: 18,
                            background: sky.fp, opacity: 0.7, transform: 'translateX(-50%)' }} />
                          <div style={{ position: 'absolute', top: 0, left: '50%', width: 6, height: 6, borderRadius: '50%',
                            background: sky.fp, transform: 'translateX(-50%)', boxShadow: '0 0 12px ' + sky.fp }} />
                        </div>
                      ) : <Flower kind="seed" size={20} />}
                  </div>
                );
              })}
            </div>
            <div style={{ fontSize: 11, fontWeight: 300, fontStyle: 'italic', color: sky.sub,
              marginTop: 22, lineHeight: 1.5, letterSpacing: '0.02em' }}>
              The first bloom arrives on Day 7. Your garden fills as you practice.
            </div>
          </div>
        </div>

        {/* Profile basics */}
        <div style={{ marginTop: 40 }}>
          <SansEyebrow color={sky.sub} style={{ marginBottom: 14 }}>Profile</SansEyebrow>
          {[
            { k: 'Age', v: '34' },
            { k: 'Cycle tracking', v: 'on' },
            { k: 'Morning reminder', v: '8:30am' },
          ].map(function(r, i) {
            return (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between',
                padding: '13px 0', borderBottom: '0.5px solid ' + lineSoft }}>
                <span style={{ fontSize: 13, fontWeight: 300, color: sky.sub }}>{r.k}</span>
                <span style={{ fontSize: 13, fontWeight: 400, color: sky.txt }}>{r.v}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ─── STATE B: RECENTLY ESTABLISHED ─────
  function StateB() {
    // 3 weeks of flowers, ~14 days populated
    var weeks = [];
    var dayCount = 18;
    for (var w = 0; w < 3; w++) {
      var row = [];
      for (var d = 0; d < 7; d++) {
        var idx = w * 7 + d;
        if (idx < dayCount) row.push({ has: true, kind: flowerFor(idx + 2), baseline: idx === 0 });
        else row.push({ has: false });
      }
      weeks.push(row);
    }

    return (
      <div>
        {/* Hero — Garden, beginning */}
        <SansEyebrow color={sky.sub}>Your garden</SansEyebrow>
        <div style={{
          fontSize: 26, fontWeight: 300, color: sky.txt, marginTop: 10,
          letterSpacing: '-0.015em', lineHeight: 1.2, marginBottom: 4,
        }}>Three weeks in.</div>
        <div style={{ fontSize: 12, fontWeight: 300, fontStyle: 'italic', color: sky.sub,
          lineHeight: 1.5, marginBottom: 22 }}>Tap any flower to see what bloomed it.</div>

        {/* This week */}
        <div style={{
          padding: '18px 16px 16px', borderRadius: 18,
          background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.45)',
          border: '0.5px solid ' + line, marginBottom: 12,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
            <SansEyebrow color={sky.sub}>This week</SansEyebrow>
            <div style={{ fontSize: 9.5, fontWeight: 400, color: sky.sub, letterSpacing: '0.16em',
              textTransform: 'uppercase', opacity: 0.7 }}>today {'\u2192'}</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 4 }}>
            {weeks[2].map(function(d, i) {
              return (
                <div key={i} style={{ aspectRatio: '1/1.1', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: d.has ? 'transparent' : (isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.015)'),
                  borderRadius: 8 }}>
                  {d.has ? <Flower kind={d.kind} size={36} /> : null}
                </div>
              );
            })}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 4, marginTop: 6 }}>
            {['M','T','W','T','F','S','S'].map(function(l, i) {
              return <div key={i} style={{ textAlign: 'center', fontSize: 9, fontWeight: 400,
                color: sky.sub, opacity: 0.5, letterSpacing: '0.1em' }}>{l}</div>;
            })}
          </div>
        </div>

        {/* Past weeks */}
        {[1, 0].map(function(wi) {
          return (
            <div key={wi} style={{
              padding: '14px 16px 12px', borderRadius: 18,
              background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.28)',
              border: '0.5px solid ' + lineSoft, marginBottom: 8,
            }}>
              <div style={{ fontSize: 9, fontWeight: 400, color: sky.sub, letterSpacing: '0.18em',
                textTransform: 'uppercase', opacity: 0.7, marginBottom: 8 }}>
                {wi === 1 ? 'last week' : 'two weeks ago'}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 4 }}>
                {weeks[wi].map(function(d, i) {
                  return (
                    <div key={i} style={{ aspectRatio: '1/1.1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {d.has ? <Flower kind={d.kind} size={28} dim={true} /> : null}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* What suna has noticed */}
        <div style={{ marginTop: 30 }}>
          <SansEyebrow color={sky.sub} style={{ marginBottom: 14 }}>What suna has noticed</SansEyebrow>
          <div style={{
            padding: '18px 18px', borderRadius: 18,
            background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.48)',
            border: '0.5px solid ' + line, borderLeft: '2px solid ' + sky.fp,
          }}>
            <p style={{ fontSize: 14, fontWeight: 300, color: sky.txt, lineHeight: 1.55,
              margin: 0, letterSpacing: '-0.005em' }}>
              You{'\u2019'}re most often Brittle in the late afternoon.
            </p>
          </div>
        </div>

        {/* Average capacity — single number */}
        <div style={{ marginTop: 22 }}>
          <SansEyebrow color={sky.sub} style={{ marginBottom: 14 }}>Average capacity</SansEyebrow>
          <div style={{
            padding: '20px 22px', borderRadius: 18,
            background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.48)',
            border: '0.5px solid ' + line,
            display: 'flex', alignItems: 'baseline', gap: 14,
          }}>
            <div style={{ fontSize: 36, fontWeight: 300, color: sky.fp, letterSpacing: '-0.02em',
              lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>+24%</div>
            <div style={{ fontSize: 12, fontWeight: 300, color: sky.sub, lineHeight: 1.45 }}>
              per session, since you started.
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── STATE C: GARDEN STATE ─────
  function StateC() {
    // 8 weeks visible, mostly populated
    var weeks = [];
    for (var w = 0; w < 8; w++) {
      var row = [];
      for (var d = 0; d < 7; d++) {
        var idx = w * 7 + d;
        var has = (idx % 9) !== 5 && idx < 53;
        row.push({ has: has, kind: flowerFor(idx), play: idx % 17 === 4 });
      }
      weeks.push(row);
    }
    var observations = [
      "Your nervous system recovers fastest from Reactive states. It takes longer when you\u2019re Dimmed.",
      "Your late luteal phase shows up in your data \u2014 average SI rises 22% in those weeks.",
      "You\u2019ve spent more time Open this month than last.",
    ];

    return (
      <div>
        <SansEyebrow color={sky.sub}>Your garden</SansEyebrow>
        <div style={{
          fontSize: 26, fontWeight: 300, color: sky.txt, marginTop: 10,
          letterSpacing: '-0.015em', lineHeight: 1.2, marginBottom: 4,
        }}>In bloom.</div>
        <div style={{ fontSize: 12, fontWeight: 300, fontStyle: 'italic', color: sky.sub,
          lineHeight: 1.5, marginBottom: 24 }}>Pinch to zoom. Tap any bloom to remember.</div>

        {/* Garden grid — 8 weeks */}
        <div style={{
          padding: '18px 14px 14px', borderRadius: 22,
          background: isDark
            ? 'linear-gradient(180deg, rgba(255,255,255,0.045), rgba(255,255,255,0.02))'
            : 'linear-gradient(180deg, rgba(255,250,247,0.6), rgba(255,255,255,0.32))',
          border: '0.5px solid ' + line, marginBottom: 24,
          boxShadow: isDark ? 'none' : '0 8px 28px rgba(180,80,120,0.06)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, padding: '0 4px' }}>
            <div style={{ fontSize: 9.5, fontWeight: 400, color: sky.sub, letterSpacing: '0.18em', textTransform: 'uppercase' }}>winter \u2192 now</div>
            <div style={{ fontSize: 9.5, fontWeight: 400, color: sky.sub, letterSpacing: '0.16em', textTransform: 'uppercase', opacity: 0.7 }}>tender season</div>
          </div>
          {weeks.map(function(week, wi) {
            var current = wi === weeks.length - 1;
            return (
              <div key={wi} style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 2,
                marginBottom: 2, opacity: current ? 1 : 0.92 }}>
                {week.map(function(d, di) {
                  return (
                    <div key={di} style={{ aspectRatio: '1/1.05', display: 'flex',
                      alignItems: 'center', justifyContent: 'center',
                      background: d.has && d.play
                        ? (isDark ? 'rgba(196,118,118,0.08)' : 'rgba(232,165,114,0.08)')
                        : 'transparent',
                      borderRadius: 6 }}>
                      {d.has ? <Flower kind={d.play ? 'larkspur' : d.kind} size={current ? 30 : 22} dim={!current} /> : null}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Patterns */}
        <SansEyebrow color={sky.sub} style={{ marginBottom: 14 }}>What suna has noticed</SansEyebrow>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 28 }}>
          {observations.map(function(obs, i) {
            return (
              <div key={i} style={{
                padding: '14px 16px', borderRadius: 14,
                background: isDark ? 'rgba(255,255,255,0.035)' : 'rgba(255,255,255,0.42)',
                border: '0.5px solid ' + line,
                borderLeft: '2px solid ' + sky.fp + (i === 0 ? '' : (i === 1 ? '99' : '66')),
              }}>
                <p style={{ fontSize: 13, fontWeight: 300, color: sky.txt, lineHeight: 1.55,
                  margin: 0, letterSpacing: '-0.005em' }}>{obs}</p>
              </div>
            );
          })}
        </div>

        {/* Capacity line */}
        <SansEyebrow color={sky.sub} style={{ marginBottom: 14 }}>Capacity, last 60 days</SansEyebrow>
        <div style={{
          padding: '18px 18px 14px', borderRadius: 18, marginBottom: 28,
          background: isDark ? 'rgba(255,255,255,0.035)' : 'rgba(255,255,255,0.42)',
          border: '0.5px solid ' + line,
        }}>
          <svg width="100%" height="80" viewBox="0 0 320 80" preserveAspectRatio="none">
            <path d="M0 60 C 30 55, 60 50, 90 48 S 150 44, 180 36 S 240 28, 270 22 S 310 16, 320 14"
              fill="none" stroke={sky.fp} strokeWidth="1.6" strokeLinecap="round" />
            <circle cx="320" cy="14" r="3.5" fill={sky.fp} />
            <circle cx="320" cy="14" r="7" fill={sky.fp} opacity="0.18" />
          </svg>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 4 }}>
            <span style={{ fontSize: 14, fontWeight: 400, color: sky.fp, letterSpacing: '-0.01em' }}>+31%</span>
          </div>
        </div>

        {/* Your practices */}
        <SansEyebrow color={sky.sub} style={{ marginBottom: 14 }}>Your practices</SansEyebrow>
        {[
          { name: 'Heart-Centered Hold', count: '23 sessions', note: 'oxytocin, your buffer.' },
          { name: 'Physiological Sigh', count: '17 sessions', note: 'the emergency exit.' },
          { name: 'Bird Song', count: '12 sessions', note: '1\u20138 kHz. alpha waves.' },
        ].map(function(p, i) {
          return (
            <div key={i} style={{
              padding: '14px 0',
              borderBottom: '0.5px solid ' + lineSoft,
              display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 14,
            }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 400, color: sky.txt, letterSpacing: '-0.005em' }}>{p.name}</div>
                <div style={{ fontSize: 11, fontWeight: 300, fontStyle: 'italic', color: sky.sub, marginTop: 3 }}>{p.note}</div>
              </div>
              <div style={{ fontSize: 11, fontWeight: 400, color: sky.sub, letterSpacing: '0.04em',
                whiteSpace: 'nowrap' }}>{p.count}</div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="vara-scroll" data-dc-passthrough style={{
      position: 'relative', width: '100%', height: '100%',
      overflowY: 'auto', overflowX: 'hidden',
      WebkitOverflowScrolling: 'touch',
      fontFamily: 'var(--vara-sans)',
      background: isDark ? '#0c0a16' : '#faf6ef',
    }}>
      <div style={{
        position: 'fixed', inset: -40, pointerEvents: 'none',
        backgroundImage: 'url(' + sky.photo + ')',
        backgroundSize: 'cover', backgroundPosition: 'center',
        filter: 'blur(60px) saturate(120%)', transform: 'scale(1.4)',
        opacity: 0.13,
      }} />

      <div style={{ position: 'relative', padding: '60px 24px 120px' }}>
        <Header />

        {/* State switcher (in-product simulation) */}
        <div style={{ marginBottom: 28, padding: '12px 12px', borderRadius: 14,
          background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.4)',
          border: '0.5px dashed ' + line,
        }}>
          <div style={{ fontSize: 8.5, fontWeight: 500, color: sky.sub, letterSpacing: '0.24em',
            textTransform: 'uppercase', marginBottom: 8 }}>preview state</div>
          <div style={{ display: 'flex', gap: 4 }}>
            {[
              { id: 'baseline', label: 'Forming' },
              { id: 'recent', label: 'Recent' },
              { id: 'garden', label: 'Garden' },
            ].map(function(opt) {
              var active = profileState === opt.id;
              return (
                <button key={opt.id} onClick={function() { setProfileState(opt.id); }} style={{
                  flex: 1, padding: '8px 0', borderRadius: 10,
                  background: active ? sky.fp + '22' : 'transparent',
                  border: '0.5px solid ' + (active ? sky.fp + '50' : line),
                  cursor: 'pointer', fontFamily: 'var(--vara-sans)',
                  fontSize: 10.5, fontWeight: active ? 500 : 400,
                  color: active ? sky.fp : sky.sub, letterSpacing: '0.04em',
                }}>{opt.label}</button>
              );
            })}
          </div>
          {profileState === 'baseline' && (
            <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ fontSize: 9, fontWeight: 500, color: sky.sub, letterSpacing: '0.18em',
                textTransform: 'uppercase' }}>day</div>
              <input type="range" min="1" max="7" value={baselineDay}
                onChange={function(e) { setBaselineDay(+e.target.value); }}
                style={{ flex: 1, accentColor: sky.fp }} />
              <div style={{ fontSize: 11, fontWeight: 500, color: sky.txt,
                fontVariantNumeric: 'tabular-nums', minWidth: 16, textAlign: 'right' }}>{baselineDay}</div>
            </div>
          )}
        </div>

        {profileState === 'baseline' && <StateA />}
        {profileState === 'recent' && <StateB />}
        {profileState === 'garden' && <StateC />}
      </div>
    </div>
  );
}

Object.assign(window, { ProfileScreen });
