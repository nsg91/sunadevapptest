/* LibraryScreen — 12-practice somatic library organized by category
   Sparks / Flow / Anchors tabs, photo cards, mars stats on tap */

function LibraryScreen({ sky, onStartPractice, onBack }) {
  var isDark = sky.dark;
  var [activeTab, setActiveTab] = React.useState('sparks');
  var line = isDark ? 'rgba(255,255,255,0.14)' : 'rgba(50,40,30,0.12)';

  var tabs = [
    { id: 'sparks', label: 'rise', verb: 'Ignite', color: '#E8A572' },
    { id: 'flow', label: 'flow', verb: 'Sustain', color: '#7AC4B0' },
    { id: 'anchors', label: 'land', verb: 'Recover', color: '#8A7EB0' },
    { id: 'play', label: 'play', verb: 'Ignite', color: '#C49696' },
  ];
  var activeTabMeta = tabs.find(function(t) { return t.id === activeTab; });
  var practices = PRACTICES[activeTab] || [];
  var catLabel = getCategoryLabel(activeTab);

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
        opacity: 0.15, pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', padding: '60px 24px 120px' }}>
        {/* back + header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <button onClick={onBack} style={{
            background: 'transparent', border: 'none', cursor: 'pointer',
            fontSize: 11, fontWeight: 400, letterSpacing: '0.14em', textTransform: 'uppercase',
            color: sky.sub, fontFamily: 'var(--vara-sans)', padding: 0,
          }}>{'\u2190'} Back</button>
        </div>
        <div style={{
          fontSize: 28, fontWeight: 300, color: sky.txt,
          letterSpacing: '-0.015em', lineHeight: 1.2, marginBottom: 6,
        }}>Practice Library</div>
        <div style={{
          fontSize: 13, fontWeight: 300, color: sky.sub, lineHeight: 1.5,
        }}>What does your nervous system need right now?</div>

        {/* category tabs */}
        <div style={{
          marginTop: 24, display: 'flex', gap: 8,
        }}>
          {tabs.map(function(t) {
            var active = activeTab === t.id;
            return (
              <button key={t.id} onClick={function() { setActiveTab(t.id); }}
                style={{
                  flex: 1, padding: '14px 8px', borderRadius: 14,
                  background: active ? t.color + '1A' : 'transparent',
                  border: '0.5px solid ' + (active ? t.color + '50' : line),
                  cursor: 'pointer', textAlign: 'center',
                  fontFamily: 'var(--vara-sans)',
                  transition: 'all 0.24s ease',
                }}>
                <div style={{
                  fontSize: 13, fontWeight: active ? 500 : 400,
                  color: active ? t.color : sky.txt,
                  letterSpacing: '-0.005em',
                }}>{t.label}</div>
                <div style={{
                  fontSize: 9, fontWeight: 300, color: active ? t.color : sky.sub,
                  marginTop: 3, letterSpacing: '0.06em', opacity: 0.8,
                }}>{t.verb}</div>
              </button>
            );
          })}
        </div>

        {/* category description */}
        <div style={{
          marginTop: 20, fontSize: 12, fontWeight: 300, fontStyle: 'italic',
          color: sky.sub, lineHeight: 1.5,
        }}>{catLabel.desc}</div>

        {/* practice cards */}
        <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {practices.map(function(p, i) {
            return <LibraryCard key={p.id} practice={p} sky={sky} isDark={isDark} line={line}
              accentColor={activeTabMeta.color} idx={i}
              onStart={function() { onStartPractice(p); }} />;
          })}
        </div>
      </div>
    </div>
  );
}

function LibraryCard({ practice, sky, isDark, line, accentColor, idx, onStart }) {
  var [showMars, setShowMars] = React.useState(false);

  return (
    <div style={{
      borderRadius: 18, overflow: 'hidden',
      background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.5)',
      border: '0.5px solid ' + line,
      animation: 'varaFadeUp ' + (0.3 + idx * 0.1) + 's ease',
    }}>
      {/* photo header */}
      <div style={{ height: 90, position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: -10,
          backgroundImage: 'url(' + practice.photo + ')',
          backgroundSize: 'cover', backgroundPosition: 'center',
          filter: 'blur(2px)', transform: 'scale(1.1)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, ' + accentColor + '20 0%, rgba(0,0,0,0.35) 100%)',
        }} />
        <div style={{
          position: 'absolute', top: 10, left: 14,
          fontSize: 18, color: 'rgba(255,255,255,0.85)',
        }}>{practice.type === 'breathing' ? '\u25CE' : practice.type === 'humming' ? '\u266B' : '\u25D0'}</div>
        <div style={{
          position: 'absolute', top: 10, right: 12, fontSize: 9, fontWeight: 500,
          letterSpacing: '0.2em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.8)', background: 'rgba(0,0,0,0.25)',
          padding: '3px 10px', borderRadius: 100, backdropFilter: 'blur(8px)',
        }}>{practice.minutes} min</div>
      </div>

      {/* body */}
      <div style={{ padding: '16px 16px 14px' }}>
        <div style={{ fontSize: 17, fontWeight: 400, color: sky.txt, letterSpacing: '-0.005em' }}>{practice.name}</div>
        <div style={{ fontSize: 11, fontWeight: 300, color: sky.sub, marginTop: 3 }}>{practice.subtitle}</div>
        <p style={{ fontSize: 12, fontWeight: 300, color: sky.sub, lineHeight: 1.6, margin: '10px 0 0' }}>{practice.description}</p>

        {/* perf flex + mars toggle */}
        <button onClick={function() { setShowMars(!showMars); }} style={{
          marginTop: 12, background: 'transparent', border: 'none', cursor: 'pointer',
          fontFamily: 'var(--vara-sans)', padding: 0,
          fontSize: 10, fontWeight: 500, letterSpacing: '0.14em',
          textTransform: 'uppercase', color: accentColor,
        }}>{showMars ? 'Hide data' : 'The data'} {showMars ? '\u25B4' : '\u25BE'}</button>

        {showMars && (
          <div style={{
            marginTop: 10, padding: '12px 14px', borderRadius: 10,
            background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.4)',
            border: '0.5px solid ' + line,
            animation: 'varaFadeUp 0.3s ease',
          }}>
            <div style={{ fontSize: 11, fontWeight: 400, color: sky.txt, marginBottom: 6 }}>{practice.perfFlex}</div>
            <div style={{ fontSize: 11, fontWeight: 300, color: sky.sub, fontStyle: 'italic', marginBottom: 6 }}>{practice.mars}</div>
            <div style={{ fontSize: 9, fontWeight: 400, color: sky.sub, opacity: 0.6 }}>{practice.source}</div>
          </div>
        )}

        {/* start button */}
        <button onClick={onStart} style={{
          marginTop: 14, width: '100%', padding: '11px 0', borderRadius: 100,
          background: accentColor + '18', border: '0.5px solid ' + accentColor + '40',
          cursor: 'pointer', fontFamily: 'var(--vara-sans)',
          fontSize: 11, fontWeight: 500, letterSpacing: '0.14em',
          textTransform: 'uppercase', color: accentColor,
        }}>Begin Practice</button>
      </div>
    </div>
  );
}

Object.assign(window, { LibraryScreen, LibraryCard });
