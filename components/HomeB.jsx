/* Variation B — "Luminous"
   Gradient-driven (photo as blurred color source only). Editorial, typographic.
   Horizon timeline replacing forecast tabs. Practice cards as soft glass tiles.
*/

function HomeB({ sky, onOpenPractice }) {
  const [chipIdx, setChipIdx] = React.useState(null);

  const chip = chipIdx != null ? STATE_CHIPS[chipIdx] : null;
  const header = chip ? CHIP_HEADER[chip.label] : null;
  const recs = chip ? EXERCISES.filter(e => e.goals.some(g => chip.goals.includes(g))).slice(0, 3) : [];

  // 24h horizon: a typographic strip showing day's arc
  const arc = [
    { h: 6, label: 'Sunrise',      sky: SKY.sunrise    },
    { h: 9, label: 'Morning',      sky: SKY.morning    },
    { h: 12,label: 'Noon',         sky: SKY.goldenNoon },
    { h: 15,label: 'Afternoon',    sky: SKY.afternoon  },
    { h: 18,label: 'Golden Hour',  sky: SKY.goldenHour },
    { h: 20,label: 'Dusk',         sky: SKY.dusk       },
    { h: 22,label: 'Night',        sky: SKY.night      },
  ];
  const currentArcIdx = arc.findIndex(a => a.sky.id === sky.id);

  const glass = {
    background: sky.dark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.42)',
    border: `0.5px solid ${sky.border}`,
    backdropFilter: 'blur(22px) saturate(140%)',
    WebkitBackdropFilter: 'blur(22px) saturate(140%)',
  };

  // Blurred gradient-only background, softer than A
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', fontFamily: "'Outfit', sans-serif" }}>
      {/* heavily blurred photo → gradient feel */}
      <div style={{ position: 'absolute', inset: -80 }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${sky.photo})`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          filter: 'blur(70px) saturate(150%)', transform: 'scale(1.6)',
        }}/>
      </div>
      <div style={{ position: 'absolute', inset: 0, background: sky.tint }}/>
      <div style={{ position: 'absolute', inset: 0,
        background: sky.dark
          ? 'radial-gradient(ellipse at 50% 10%, rgba(255,255,255,0.10), transparent 60%)'
          : 'radial-gradient(ellipse at 50% 90%, rgba(255,255,255,0.28), transparent 60%)',
      }}/>

      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', overflowX: 'hidden' }}>

        {/* Top rail */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '60px 24px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 28, height: 28, borderRadius: '50%', overflow: 'hidden', position: 'relative',
              border: `0.5px solid ${sky.border}`,
            }}>
              <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: `url(${sky.photo})`, backgroundSize: 'cover', backgroundPosition: 'center',
                filter: 'blur(4px) saturate(130%)', transform: 'scale(1.4)',
              }}/>
            </div>
            <Serif size={20} color={sky.txt} style={{ letterSpacing: '0.28em' }}>suna</Serif>
          </div>
          <Eyebrow color={sky.sub}>{sky.phase}</Eyebrow>
        </div>

        {/* Greeting — large centered serif */}
        <div style={{ padding: '46px 32px 0', textAlign: 'center' }}>
          <Serif italic size={32} color={sky.txt} style={{ lineHeight: 1.2, display: 'block', maxWidth: 320, margin: '0 auto' }}>
            {sky.greeting('Eva')}
          </Serif>
        </div>

        {/* Horizon — typographic day arc with a light marker */}
        <div style={{ padding: '30px 28px 0' }}>
          <div style={{ position: 'relative', height: 60, padding: '0 4px' }}>
            {/* thin line */}
            <div style={{
              position: 'absolute', left: 0, right: 0, top: 28, height: 0.5,
              background: `linear-gradient(90deg, transparent, ${sky.border}, transparent)`,
            }}/>
            {/* markers */}
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%' }}>
              {arc.map((a, i) => {
                const active = i === currentArcIdx;
                return (
                  <div key={a.label} style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative',
                  }}>
                    <div style={{
                      width: active ? 9 : 3, height: active ? 9 : 3, borderRadius: '50%',
                      background: active ? sky.fp : sky.border,
                      boxShadow: active ? `0 0 18px ${sky.fp}` : 'none',
                      marginTop: active ? 22 : 25,
                    }}/>
                    <div style={{
                      position: 'absolute', top: active ? -6 : 40,
                      fontSize: active ? 9.5 : 8,
                      fontWeight: 300, letterSpacing: '0.2em', textTransform: 'uppercase',
                      color: active ? sky.txt : sky.sub,
                      opacity: active ? 1 : 0.5,
                      whiteSpace: 'nowrap',
                    }}>{a.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Central scan button — more of a ritual object */}
        <div style={{ padding: '30px 0 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ position: 'relative', width: 220, height: 220 }}>
            {/* outer breathing ring */}
            {[0, 1, 2, 3].map(i => (
              <div key={i} style={{
                position: 'absolute', inset: i * 12, borderRadius: '50%',
                border: `0.5px solid ${sky.border}`,
                opacity: 1 - i * 0.18,
              }}/>
            ))}
            {/* inner disc */}
            <button style={{
              position: 'absolute', inset: 54,
              borderRadius: '50%', border: `0.5px solid ${sky.fp}`,
              background: sky.fpSoft,
              backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
              cursor: 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 0 40px ${sky.fpSoft}`,
              animation: 'varaPulse 3.2s ease-out infinite',
            }}>
              <FpGlyph color={sky.fp} size={42} opacity={0.85} />
              <Eyebrow color={sky.sub} style={{ marginTop: 10, fontSize: 8, opacity: 0.8 }}>Tap to scan</Eyebrow>
            </button>
          </div>
          <div style={{ marginTop: 18, textAlign: 'center' }}>
            <Serif italic size={13} color={sky.sub} style={{ letterSpacing: '0.04em' }}>
              a moment of honesty with the body
            </Serif>
          </div>
        </div>

        {/* State chips — larger, softer */}
        <div style={{ padding: '42px 0 0' }}>
          <div style={{ padding: '0 28px 12px', textAlign: 'center' }}>
            <Eyebrow color={sky.sub}>Or tell me where you are</Eyebrow>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, padding: '0 24px' }}>
            {STATE_CHIPS.map((c, i) => {
              const active = chipIdx === i;
              const dim = chipIdx !== null && chipIdx !== i;
              return (
                <button key={c.label} onClick={() => setChipIdx(active ? null : i)}
                  style={{
                    borderRadius: 14, padding: '14px 10px',
                    background: active ? `${c.color}30` : `${c.color}14`,
                    border: `0.5px solid ${active ? c.color + '80' : c.color + '30'}`,
                    cursor: 'pointer', textAlign: 'center', opacity: dim ? 0.38 : 1,
                    transition: 'all 0.22s',
                    boxShadow: active ? `0 8px 24px ${c.color}28` : 'none',
                  }}>
                  <div style={{
                    width: 8, height: 8, borderRadius: '50%', background: c.color,
                    margin: '0 auto 8px', boxShadow: `0 0 12px ${c.color}80`,
                  }}/>
                  <Serif italic size={15} color={sky.txt} style={{ display: 'block' }}>{c.label}</Serif>
                  <div style={{ fontSize: 9, fontWeight: 300, color: sky.sub, marginTop: 3, letterSpacing: '0.02em' }}>{c.micro}</div>
                </button>
              );
            })}
          </div>

          {chip && (
            <div style={{ padding: '20px 28px 0', animation: 'varaFadeUp 0.5s ease' }}>
              <div style={{
                ...glass, borderRadius: 20, padding: '18px 18px 14px',
                borderLeft: `2px solid ${chip.color}`,
              }}>
                <Eyebrow color={chip.color} style={{ marginBottom: 8, letterSpacing: '0.32em' }}>for you, now</Eyebrow>
                <Serif italic size={22} color={sky.txt} style={{ display: 'block', lineHeight: 1.2, marginBottom: 6 }}>
                  {header.title}
                </Serif>
                <p style={{ fontSize: 12, fontWeight: 300, color: sky.sub, lineHeight: 1.65, marginBottom: 14 }}>
                  {header.sub}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {recs.map((ex, idx) => (
                    <button key={ex.id} onClick={() => onOpenPractice(ex)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 14,
                        padding: '12px 4px',
                        background: 'transparent',
                        border: 'none',
                        borderTop: idx > 0 ? `0.5px solid ${sky.border}` : 'none',
                        cursor: 'pointer', textAlign: 'left',
                      }}>
                      <div style={{
                        width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                        background: `${chip.color}28`, border: `0.5px solid ${chip.color}50`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 14, color: chip.color,
                      }}>{TYPE_GLYPH[ex.type]}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 14, fontWeight: 300, color: sky.txt }}>{ex.name}</div>
                        <div style={{ fontSize: 9.5, fontWeight: 300, color: sky.sub, marginTop: 2, letterSpacing: '0.04em' }}>
                          {ex.minutes} min · {ex.pattern}
                        </div>
                      </div>
                      <span style={{ fontSize: 16, color: chip.color, opacity: 0.7 }}>→</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Baseline — minimal strip */}
        <div style={{ padding: '30px 28px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 4px 14px 4px',
              borderTop: `0.5px solid ${sky.border}`, borderBottom: `0.5px solid ${sky.border}` }}>
            <div style={{ flex: 1 }}>
              <Serif italic size={15} color={sky.txt} style={{ display: 'block' }}>
                Your baseline is forming
              </Serif>
              <div style={{ fontSize: 10, fontWeight: 300, color: sky.sub, marginTop: 3 }}>Day 1 of 7 · six mornings to go</div>
            </div>
            {/* dot progression */}
            <div style={{ display: 'flex', gap: 4 }}>
              {[0,1,2,3,4,5,6].map(i => (
                <div key={i} style={{
                  width: i === 0 ? 6 : 3, height: i === 0 ? 6 : 3, borderRadius: '50%',
                  background: i === 0 ? sky.fp : sky.border, alignSelf: 'center',
                }}/>
              ))}
            </div>
          </div>
        </div>

        {/* Why we do the work — single line poem of stats */}
        <div style={{ padding: '28px 28px 0' }}>
          <Eyebrow color={sky.sub} style={{ marginBottom: 16, textAlign: 'center' }}>Why we do the work</Eyebrow>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
            {[
              { stat: '+23%',  head: 'cognition at work' },
              { stat: '3 min', head: 'to shift state' },
              { stat: '18%',   head: 'cortisol drop' },
            ].map((s, i) => (
              <div key={i} style={{
                ...glass, borderRadius: 14, padding: '14px 10px', textAlign: 'center',
              }}>
                <Serif italic size={24} weight={400} color={sky.fp} style={{ display: 'block', lineHeight: 1 }}>{s.stat}</Serif>
                <div style={{ fontSize: 9, fontWeight: 300, color: sky.sub, marginTop: 8, lineHeight: 1.4 }}>{s.head}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Closing invocation */}
        <div style={{ padding: '34px 32px 140px', textAlign: 'center' }}>
          <Serif italic size={18} color={sky.txt} style={{ display: 'block', lineHeight: 1.55, opacity: 0.82 }}>
            the body keeps the score.<br/>it also holds the path back.
          </Serif>
          <Eyebrow color={sky.sub} style={{ marginTop: 14, opacity: 0.55 }}>Bessel van der Kolk</Eyebrow>
        </div>
      </div>

      <BottomNav sky={sky} />
    </div>
  );
}

Object.assign(window, { HomeB });
