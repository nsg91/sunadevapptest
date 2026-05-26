/* Variation A — "Atmospheric"
   Full-bleed dreamy photo backdrops per time of day.
   Editorial serif greeting. Photo-forward practice tiles.
*/

function HomeA({ sky, onOpenPractice }) {
  const [chipIdx, setChipIdx] = React.useState(null);
  const [tab, setTab] = React.useState('morning');

  const chip = chipIdx != null ? STATE_CHIPS[chipIdx] : null;
  const header = chip ? CHIP_HEADER[chip.label] : null;
  const recs = chip ? EXERCISES.filter(e => e.goals.some(g => chip.goals.includes(g))).slice(0, 3) : [];
  const forecast = EXERCISES.filter(e => e.phases.includes(tab)).slice(0, 5);

  const cardStyle = {
    background: sky.card,
    border: `0.5px solid ${sky.border}`,
    backdropFilter: 'blur(18px) saturate(130%)',
    WebkitBackdropFilter: 'blur(18px) saturate(130%)',
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', fontFamily: "'Outfit', sans-serif" }}>
      <DreamyBackdrop sky={sky} />

      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', overflowX: 'hidden' }}>

        {/* Top rail */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '60px 24px 0' }}>
          <Serif size={22} color={sky.txt} style={{ letterSpacing: '0.28em' }}>suna</Serif>
          <div style={{
            width: 32, height: 32, borderRadius: '50%',
            background: sky.dark ? 'rgba(255,255,255,0.08)' : 'rgba(80,60,40,0.08)',
            border: `0.5px solid ${sky.border}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 12, color: sky.txt, fontWeight: 400,
          }}>E</div>
        </div>

        {/* Editorial greeting */}
        <div style={{ padding: '40px 28px 0' }}>
          <Eyebrow color={sky.sub} style={{ marginBottom: 14 }}>{sky.phase} · 9:41</Eyebrow>
          <div style={{ marginBottom: 6 }}>
            <Serif size={36} italic color={sky.txt} style={{ lineHeight: 1.15 }}>
              {sky.greeting('Eva')}
            </Serif>
          </div>
          <p style={{ fontSize: 12.5, fontWeight: 300, color: sky.sub, lineHeight: 1.7, marginTop: 12, maxWidth: 280 }}>
            Take a reading — or begin where you are. The day will meet you.
          </p>
        </div>

        {/* Fingerprint — embedded in photo well */}
        <div style={{ padding: '36px 28px 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <button style={{
            position: 'relative', width: 168, height: 168, borderRadius: '50%',
            background: 'transparent', border: 'none', cursor: 'pointer', padding: 0,
          }}>
            {/* photo well behind the print */}
            <div style={{
              position: 'absolute', inset: 16, borderRadius: '50%', overflow: 'hidden',
              boxShadow: `0 20px 60px ${sky.fpSoft}, inset 0 0 0 0.5px ${sky.border}`,
            }}>
              <div style={{
                position: 'absolute', inset: -10,
                backgroundImage: `url(${sky.photo})`, backgroundSize: 'cover', backgroundPosition: 'center',
                filter: 'blur(6px) saturate(120%)', transform: 'scale(1.3)',
              }}/>
              <div style={{ position: 'absolute', inset: 0, background: sky.tint, mixBlendMode: 'soft-light' }}/>
              <div style={{
                position: 'absolute', inset: 0,
                background: `radial-gradient(circle, transparent 20%, ${sky.dark ? 'rgba(0,0,0,0.25)' : 'rgba(255,255,255,0.3)'} 80%)`,
              }}/>
            </div>
            {/* rings */}
            <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: `0.5px solid ${sky.border}` }} />
            <div style={{ position: 'absolute', inset: 8, borderRadius: '50%', border: `0.5px solid ${sky.border}`, opacity: 0.6 }} />
            {/* pulsing aura */}
            <div style={{
              position: 'absolute', inset: 16, borderRadius: '50%',
              animation: 'varaPulse 3.2s ease-out infinite',
              boxShadow: `0 0 0 0 ${sky.fpSoft}`,
            }}/>
            {/* glyph */}
            <div style={{
              position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <FpGlyph color={sky.fp} size={52} opacity={0.9} />
            </div>
          </button>
          <Eyebrow color={sky.sub} style={{ marginTop: 18, opacity: 0.7 }}>place finger here</Eyebrow>
        </div>

        {/* How are you feeling */}
        <div style={{ paddingTop: 44 }}>
          <div style={{ padding: '0 28px 12px' }}>
            <Eyebrow color={sky.sub}>How are you feeling</Eyebrow>
          </div>
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '0 28px 4px', scrollbarWidth: 'none' }}>
            {STATE_CHIPS.map((c, i) => {
              const active = chipIdx === i;
              const dim = chipIdx !== null && chipIdx !== i;
              return (
                <button key={c.label}
                  onClick={() => setChipIdx(active ? null : i)}
                  style={{
                    flexShrink: 0, minWidth: 108, borderRadius: 14, padding: '12px 14px 11px',
                    background: active ? `${c.color}34` : `${c.color}1A`,
                    border: `0.5px solid ${active ? c.color + '80' : c.color + '38'}`,
                    cursor: 'pointer', textAlign: 'left', opacity: dim ? 0.4 : 1,
                    transition: 'all 0.22s',
                    boxShadow: active ? `0 6px 20px ${c.color}2A` : 'none',
                  }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: c.color, marginBottom: 8 }}/>
                  <div style={{ fontSize: 14, fontWeight: 300, color: sky.txt }}>{c.label}</div>
                  <div style={{ fontSize: 9.5, fontWeight: 300, color: sky.sub, marginTop: 2 }}>{c.micro}</div>
                </button>
              );
            })}
          </div>

          {/* reveal */}
          {chip && (
            <div style={{ padding: '18px 28px 0', animation: 'varaFadeUp 0.5s ease' }}>
              <div style={{ marginBottom: 12 }}>
                <Serif italic size={22} color={chip.color} style={{ lineHeight: 1.2 }}>
                  {header.title}
                </Serif>
                <p style={{ fontSize: 12, fontWeight: 300, color: sky.sub, lineHeight: 1.6, marginTop: 6 }}>
                  {header.sub}
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {recs.map(ex => (
                  <button key={ex.id} onClick={() => onOpenPractice(ex)}
                    style={{
                      ...cardStyle, borderRadius: 14, padding: '12px 12px',
                      display: 'flex', alignItems: 'center', gap: 12,
                      cursor: 'pointer', textAlign: 'left',
                    }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: 10, flexShrink: 0, overflow: 'hidden', position: 'relative',
                    }}>
                      <div style={{
                        position: 'absolute', inset: 0,
                        backgroundImage: `url(${PRACTICE_PHOTO[ex.id]})`,
                        backgroundSize: 'cover', backgroundPosition: 'center',
                      }}/>
                      <div style={{ position: 'absolute', inset: 0, background: `${chip.color}55`, mixBlendMode: 'soft-light' }}/>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 14, fontWeight: 300, color: sky.txt }}>{ex.name}</div>
                      <div style={{ fontSize: 9.5, fontWeight: 300, color: sky.sub, letterSpacing: '0.04em', marginTop: 2 }}>
                        {ex.minutes} min · {ex.pattern}
                      </div>
                    </div>
                    <span style={{ fontSize: 11, color: chip.color, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Begin</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Baseline meter */}
        <div style={{ padding: '28px 28px 0' }}>
          <div style={{
            ...cardStyle, borderRadius: 16, padding: '14px 16px',
            display: 'flex', alignItems: 'center', gap: 14,
          }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 400, color: sky.txt, marginBottom: 3 }}>Establish your baseline</div>
              <div style={{ fontSize: 10, fontWeight: 300, color: sky.sub, marginBottom: 8 }}>1 of 7 readings · 6 days to go</div>
              <div style={{ height: 2, background: sky.border, borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ width: '14%', height: '100%', background: sky.fp, borderRadius: 2 }}/>
              </div>
            </div>
            <button style={{
              padding: '7px 14px', borderRadius: 100, border: 'none',
              background: sky.dark ? sky.fp : sky.txt,
              color: sky.dark ? '#0a0a18' : '#fcf9f3',
              fontSize: 9.5, fontWeight: 400, letterSpacing: '0.14em', textTransform: 'uppercase', cursor: 'pointer',
            }}>Start</button>
          </div>
        </div>

        {/* Forecast */}
        <div style={{ padding: '28px 0 0' }}>
          <div style={{ padding: '0 28px 14px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <Eyebrow color={sky.sub}>Forecast</Eyebrow>
            <div style={{ display: 'flex', border: `0.5px solid ${sky.border}`, borderRadius: 100, overflow: 'hidden' }}>
              {['morning','midday','evening'].map(t => {
                const active = tab === t;
                return (
                  <button key={t} onClick={() => setTab(t)}
                    style={{
                      fontSize: 9, padding: '4px 12px', border: 'none', cursor: 'pointer',
                      fontFamily: 'inherit', letterSpacing: '0.08em',
                      fontWeight: active ? 400 : 300,
                      color: active ? (sky.dark ? '#0a0a18' : '#fcf9f3') : sky.sub,
                      background: active ? sky.fp : 'transparent',
                      transition: 'all 0.2s',
                    }}>{t === 'midday' ? 'noon' : t}</button>
                );
              })}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, overflowX: 'auto', padding: '0 28px 8px', scrollbarWidth: 'none' }}>
            {forecast.map(ex => (
              <button key={ex.id} onClick={() => onOpenPractice(ex)}
                style={{
                  flexShrink: 0, width: 170, height: 210, borderRadius: 18, overflow: 'hidden',
                  position: 'relative', cursor: 'pointer', border: 'none', padding: 0, textAlign: 'left',
                  boxShadow: '0 18px 40px rgba(0,0,0,0.18)',
                }}>
                {/* photo */}
                <div style={{
                  position: 'absolute', inset: 0,
                  backgroundImage: `url(${PRACTICE_PHOTO[ex.id]})`,
                  backgroundSize: 'cover', backgroundPosition: 'center',
                }}/>
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 100%)',
                }}/>
                <div style={{
                  position: 'absolute', top: 12, left: 14,
                  fontSize: 9, fontWeight: 300, letterSpacing: '0.22em', textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.78)',
                }}>{ex.minutes} min</div>
                <div style={{
                  position: 'absolute', top: 12, right: 14,
                  fontSize: 16, color: 'rgba(255,255,255,0.88)',
                }}>{TYPE_GLYPH[ex.type]}</div>
                <div style={{ position: 'absolute', left: 14, right: 14, bottom: 14 }}>
                  <Serif italic size={11} color="rgba(255,255,255,0.62)" style={{ display: 'block', marginBottom: 6, letterSpacing: '0.02em' }}>
                    {ex.ritualLine}
                  </Serif>
                  <div style={{ fontSize: 15, fontWeight: 400, color: 'rgba(255,255,255,0.95)', letterSpacing: '-0.01em' }}>
                    {ex.name}
                  </div>
                  <div style={{ fontSize: 10, fontWeight: 300, color: 'rgba(255,255,255,0.65)', marginTop: 3 }}>
                    {ex.subtitle}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Quote */}
        <div style={{ padding: '30px 28px 0' }}>
          <div style={{ ...cardStyle, borderRadius: 20, padding: '20px 22px 22px' }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 42, color: sky.fp, opacity: 0.45, lineHeight: 0.7, marginBottom: 10 }}>"</div>
            <Serif italic size={17} color={sky.txt} style={{ lineHeight: 1.65, display: 'block', marginBottom: 12 }}>
              The body keeps the score. But it also holds the path back.
            </Serif>
            <Eyebrow color={sky.sub} style={{ opacity: 0.55 }}>Bessel van der Kolk</Eyebrow>
          </div>
        </div>

        <div style={{ height: 120 }}/>
      </div>

      {/* floating bottom nav */}
      <BottomNav sky={sky} />
    </div>
  );
}

function BottomNav({ sky }) {
  return (
    <div style={{
      position: 'absolute', left: 20, right: 20, bottom: 40,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '10px 16px',
      borderRadius: 100,
      background: sky.navBg,
      backdropFilter: 'blur(26px) saturate(160%)',
      WebkitBackdropFilter: 'blur(26px) saturate(160%)',
      border: `0.5px solid ${sky.border}`,
      boxShadow: '0 18px 40px rgba(0,0,0,0.18)',
    }}>
      <button style={{ border: 'none', background: 'transparent', padding: '8px 14px', cursor: 'pointer', color: sky.txt,
          fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 400 }}>
        Home
      </button>
      <button style={{
        width: 46, height: 46, borderRadius: '50%', border: `0.5px solid ${sky.fp}`,
        background: sky.fpSoft, cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <FpGlyph color={sky.fp} size={22} opacity={0.85}/>
      </button>
      <button style={{ border: 'none', background: 'transparent', padding: '8px 14px', cursor: 'pointer', color: sky.sub,
          fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 300 }}>
        Balance
      </button>
    </div>
  );
}

Object.assign(window, { HomeA, BottomNav });
