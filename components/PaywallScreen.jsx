/* PaywallScreen — 3-day free trial · annual ($99) or monthly ($12.99)
   Dark, full-bleed, structured like the reference: title · two pricing cards · featured-in · CTA.
   Brand-true to suna: serif title, mono eyebrows, sky.fp accent. */

function PaywallScreen({ sky, onClose, onStart, onRestore }) {
  var [plan, setPlan] = React.useState('annual'); // 'annual' | 'monthly'
  var [promoOpen, setPromoOpen] = React.useState(false);
  var [promo, setPromo] = React.useState('');
  var [restoreState, setRestoreState] = React.useState('idle'); // idle | restoring | restored | none

  function doRestore() {
    setRestoreState('restoring');
    setTimeout(function () {
      var ok = Math.random() < 0.5;
      setRestoreState(ok ? 'restored' : 'none');
      if (ok) {
        try { localStorage.setItem('suna.subscribed', '1'); } catch(e) {}
        setTimeout(function () { onRestore ? onRestore() : (onClose && onClose()); }, 1200);
      }
    }, 1400);
  }

  // Math
  var monthlyPrice = 12.99;
  var annualPrice = 99;
  var annualPerMonth = (annualPrice / 12).toFixed(2); // 8.25
  var savings = Math.round(monthlyPrice * 12 - annualPrice); // 56

  // Dates — "auto-renews on …" disclosure
  var today = new Date();
  var trialEnd = new Date(today);trialEnd.setDate(today.getDate() + 3);
  function fmt(d) {
    var m = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][d.getMonth()];
    return m + ' ' + d.getDate() + ', ' + d.getFullYear();
  }
  var annualRenew = fmt(trialEnd) + ' at $' + annualPrice + '/yr unless canceled';
  var monthlyRenew = fmt(trialEnd) + ' at $' + monthlyPrice + '/mo unless canceled';

  // Sky-aware palette — paywall is always dark-mode regardless of time
  var bg = '#0a0810';
  var card = 'rgba(255,255,255,0.04)';
  var line = 'rgba(255,255,255,0.14)';
  var lineActive = sky.fp + 'CC';
  var lineSoft = 'rgba(255,255,255,0.08)';
  var txt = 'rgba(255,255,255,0.95)';
  var sub = 'rgba(255,255,255,0.55)';
  var accent = sky.fp || '#E8A572';
  var accentSoft = sky.fpSoft || 'rgba(232,165,114,0.18)';

  function PlanCard({ id, eyebrow, price, sub2, badge, foot, isActive, onClick }) {
    return (
      <button onClick={onClick} style={{
        width: '100%', textAlign: 'left', cursor: 'pointer',
        padding: '22px 22px 18px', borderRadius: 22,
        background: isActive ? 'rgba(255,255,255,0.05)' : 'transparent',
        border: '1px solid ' + (isActive ? lineActive : line),
        boxShadow: isActive ? '0 0 0 0.5px ' + accent + '40, 0 20px 60px ' + accentSoft : 'none',
        fontFamily: 'var(--vara-sans)', color: txt, position: 'relative',
        transition: 'all 0.24s ease',
        display: 'block'
      }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 14
        }}>
          <div>
            <div style={{ fontSize: 19, fontWeight: 400, letterSpacing: '-0.005em', color: txt }}>{eyebrow}</div>
            <div style={{ fontSize: 14, fontWeight: 300, color: sub, marginTop: 6, letterSpacing: '0.02em' }}>{sub2}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{
              fontFamily: 'var(--vara-serif, var(--vara-sans))',
              fontSize: 24, fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 1, color: txt
            }}>{price}</div>
          </div>
        </div>
        {badge &&
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          marginTop: 14, padding: '7px 14px 7px 14px', borderRadius: 100,
          background: accent + '15',
          border: '0.5px solid ' + accent + '70',
          color: accent
        }}>
            <span style={{
            fontSize: 12.5, fontWeight: 500, letterSpacing: '0.04em'
          }}>{badge}</span>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
              <path d="M5 13l4 4L19 7" stroke={accent} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        }
        {foot &&
        <div style={{
          fontFamily: 'var(--vara-mono), var(--vara-sans)',
          fontSize: 9, fontWeight: 400, color: sub, opacity: 0.75,
          marginTop: 18, letterSpacing: '0.12em', textTransform: 'uppercase'
        }}>{foot}</div>
        }
      </button>);

  }

  return (
    <div className="vara-scroll" data-dc-passthrough style={{
      position: 'relative', width: '100%', height: '100%',
      overflowY: 'auto', overflowX: 'hidden',
      WebkitOverflowScrolling: 'touch',
      fontFamily: 'var(--vara-sans)', background: bg, color: txt
    }}>
      {/* atmospheric backdrop */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background:
        'radial-gradient(ellipse 80% 50% at 50% 18%, ' + accent + '14 0%, transparent 60%),' +
        'radial-gradient(ellipse 70% 50% at 50% 90%, ' + accent + '10 0%, transparent 65%)'
      }} />
      {/* faint photo wash */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'url(' + sky.photo + ')',
        backgroundSize: 'cover', backgroundPosition: 'center',
        opacity: 0.08, filter: 'blur(40px) saturate(140%)'
      }} />
      {/* grain */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        opacity: 0.06, mixBlendMode: 'overlay',
        backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")"
      }} />

      <div style={{ position: 'relative', padding: '54px 22px 0', minHeight: '100%', display: 'flex', flexDirection: 'column' }}>

        {/* CLOSE */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={onClose} aria-label="close" style={{
            width: 36, height: 36, borderRadius: '50%',
            background: 'transparent', border: '0.5px solid ' + line, color: txt,
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* WORDMARK / TITLE — paywall headline */}
        <div style={{ textAlign: 'center', marginTop: 28, marginBottom: 12 }}>
          <div style={{
            fontFamily: 'var(--vara-mono), var(--vara-sans)',
            fontSize: 12.5, fontWeight: 500, letterSpacing: '0.5em',
            textTransform: 'lowercase', color: 'rgba(255,255,255,0.72)'
          }}>suna</div>
        </div>
        <div style={{
          fontFamily: 'var(--vara-serif, var(--vara-sans))',
          fontSize: 38, fontWeight: 300, letterSpacing: '-0.02em',
          lineHeight: 1.08, textAlign: 'center',
          maxWidth: 320, margin: '12px auto 6px',
          textWrap: 'pretty'
        }}>Widen<br />your window.</div>
        <p style={{
          fontSize: 15, fontWeight: 300, color: sub, textAlign: 'center',
          lineHeight: 1.55, maxWidth: 300, margin: '14px auto 28px'
        }}>Three days on us. Then a price your nervous system can afford.</p>

        {/* FREE TRIAL CALLOUT — the headline above pricing */}
        <div style={{
          margin: '0 auto 18px', maxWidth: 360, padding: '20px 22px',
          borderRadius: 22, position: 'relative', overflow: 'hidden',
          background: 'linear-gradient(135deg, ' + accent + '28 0%, ' + accent + '10 60%, transparent 100%)',
          border: '0.5px solid ' + accent + '70',
          boxShadow: '0 18px 50px ' + accentSoft + ', inset 0 0 0 0.5px rgba(255,255,255,0.04)'
        }}>
          {/* soft glow accent */}
          <div style={{
            position: 'absolute', top: -40, right: -40, width: 140, height: 140, borderRadius: '50%',
            background: 'radial-gradient(circle, ' + accent + '55 0%, transparent 70%)',
            filter: 'blur(20px)', pointerEvents: 'none'
          }} />
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 46, height: 46, borderRadius: '50%', flexShrink: 0,
              background: accent + '22', border: '0.5px solid ' + accent + '90',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 24px ' + accentSoft
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l2.5 2.5M16.5 16.5L19 19M5 19l2.5-2.5M16.5 7.5L19 5"
                stroke={accent} strokeWidth="1.4" strokeLinecap="round" />
                <circle cx="12" cy="12" r="3" stroke={accent} strokeWidth="1.6" />
              </svg>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{

                fontSize: 11.5, fontWeight: 500, letterSpacing: '0.28em',
                textTransform: 'uppercase', color: accent, marginBottom: 4,
                fontFamily: 'var(--vara-mono), var(--vara-sans)'
              }}>3 days · on the house</div>
              <div style={{
                fontFamily: 'var(--vara-serif, var(--vara-sans))',
                fontSize: 22, fontWeight: 400, letterSpacing: '-0.015em',
                lineHeight: 1.15, color: txt
              }}>Start a free trial.</div>
            </div>
          </div>
          <div style={{
            marginTop: 12, fontSize: 14, fontWeight: 300, color: sub,
            lineHeight: 1.5, letterSpacing: '0.005em'
          }}>No charge until {fmt(trialEnd)}. Cancel anytime in Settings.</div>
        </div>

        {/* PLAN CARDS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 22 }}>
          <PlanCard
            id="annual"
            eyebrow="Annual"
            sub2="3 days free, then billed yearly"
            price={'$' + annualPerMonth + '/mo'}
            badge={'Save $' + savings + '/yr'}
            foot={'Auto-renews ' + annualRenew}
            isActive={plan === 'annual'}
            onClick={function () {setPlan('annual');}} />
          
          <PlanCard
            id="monthly"
            eyebrow="Monthly"
            sub2="3 days free, then billed monthly"
            price={'$' + monthlyPrice + '/mo'}
            foot={'Auto-renews ' + monthlyRenew}
            isActive={plan === 'monthly'}
            onClick={function () {setPlan('monthly');}} />
          
        </div>

        {/* WHAT YOU GET — small, brand-flavored */}
        <div style={{
          padding: '18px 4px 0', display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28
        }}>
          {[
          { k: 'unlimited check-ins', v: '60-second luminous scans, anytime' },
          { k: 'all 15 practices', v: 'rise · flow · land · play — fully unlocked' },
          { k: 'your garden', v: 'the long arc of your nervous system, in bloom' },
          { k: 'cycle-aware insights', v: 'patterns suna learns over weeks, not days' }].
          map(function (item, i) {
            return (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: 12, padding: '4px 0'
              }}>
                <div style={{
                  width: 18, height: 18, borderRadius: '50%', flexShrink: 0,
                  border: '0.5px solid ' + accent + '70',
                  background: accent + '15',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginTop: 1
                }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                    <path d="M5 13l4 4L19 7" stroke={accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: 15.5, fontWeight: 400, color: txt, letterSpacing: '-0.005em' }}>{item.k}</div>
                  <div style={{ fontSize: 14, fontWeight: 300, color: sub, marginTop: 2, lineHeight: 1.4 }}>{item.v}</div>
                </div>
              </div>);

          })}
        </div>

        {/* FEATURED IN — quiet press strip */}
        <div style={{ marginBottom: 20 }}>
          <div style={{
            fontFamily: 'var(--vara-mono), var(--vara-sans)',
            fontSize: 9.5, fontWeight: 500, letterSpacing: '0.32em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)',
            marginBottom: 14, marginLeft: 2
          }}>Grounded in</div>
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: 18, alignItems: 'center',
            opacity: 0.65, paddingLeft: 2
          }}>
            {[
            'Huberman Lab',
            'Stanford',
            'MIT',
            'Wharton',
            'Polyvagal Inst.'].
            map(function (name, i) {
              return (
                <span key={i} style={{
                  fontFamily: 'var(--vara-serif, Georgia, serif)',
                  fontSize: 16, fontWeight: 400, letterSpacing: '0.02em',
                  color: 'rgba(255,255,255,0.78)',
                  fontStyle: i === 2 ? 'italic' : 'normal'
                }}>{name}</span>);

            })}
          </div>
        </div>

        <div style={{ height: 0.5, background: lineSoft, margin: '12px 0 16px' }} />

        {/* PROMO CODE */}
        <div style={{ marginBottom: 16 }}>
          {!promoOpen ?
          <button onClick={function () {setPromoOpen(true);}} style={{
            background: 'transparent', border: 'none', cursor: 'pointer',
            fontFamily: 'var(--vara-mono), var(--vara-sans)',
            fontSize: 11.5, fontWeight: 500, letterSpacing: '0.32em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)',
            padding: '6px 4px'
          }}>Promo Code</button> :

          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <input
              type="text"
              value={promo}
              onChange={function (e) {setPromo(e.target.value.toUpperCase());}}
              placeholder="ENTER CODE"
              autoFocus
              style={{
                flex: 1, padding: '12px 14px', borderRadius: 100,
                background: 'rgba(255,255,255,0.04)', border: '0.5px solid ' + line,
                color: txt, fontFamily: 'var(--vara-mono), var(--vara-sans)',
                fontSize: 14, letterSpacing: '0.16em', outline: 'none'
              }} />
            
              <button onClick={function () {setPromoOpen(false);}} style={{
              background: 'transparent', border: 'none', color: sub, cursor: 'pointer',
              fontSize: 11.5, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 500
            }}>Cancel</button>
            </div>
          }
        </div>

        <div style={{ flex: 1 }} />

        {/* CTA */}
        <button onClick={function () {if (onStart) onStart(plan);else if (onClose) onClose();}} style={{
          width: '100%', padding: '17px 0', borderRadius: 100,
          background: 'rgba(255,255,255,0.96)',
          color: '#0a0810',
          border: 'none', cursor: 'pointer',
          fontFamily: 'var(--vara-sans)',
          fontSize: 16, fontWeight: 500, letterSpacing: '0.14em',
          textTransform: 'uppercase',
          marginTop: 8,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          boxShadow: '0 10px 40px rgba(255,255,255,0.18)'
        }}>
          <span>Start free trial</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* fine print */}
        <div style={{
          textAlign: 'center', marginTop: 14, marginBottom: 16,
          fontSize: 12.5, fontWeight: 300, color: 'rgba(255,255,255,0.45)',
          lineHeight: 1.5, letterSpacing: '0.01em'
        }}>
          Cancel anytime in Settings. No charge until {fmt(trialEnd)}.
        </div>

        {/* footer links — functional restore */}
        <div style={{
          display: 'flex', justifyContent: 'center', gap: 18, alignItems: 'center', marginBottom: 32,
          fontSize: 12, fontWeight: 500, letterSpacing: '0.16em', textTransform: 'uppercase'
        }}>
          <button onClick={doRestore} disabled={restoreState === 'restoring'} style={{
            background: 'transparent', border: 'none', cursor: restoreState === 'restoring' ? 'default' : 'pointer',
            color: restoreState === 'restored' ? '#88E0B2' : restoreState === 'none' ? sub : 'rgba(255,255,255,0.7)',
            fontFamily: 'inherit', fontSize: 'inherit', fontWeight: 'inherit',
            letterSpacing: 'inherit', textTransform: 'inherit', padding: 0
          }}>{restoreState === 'restoring' ? 'Restoring…' : restoreState === 'restored' ? 'Restored ✓' : restoreState === 'none' ? 'No purchase found' : 'Restore Purchase'}</button>
          <span style={{ color: 'rgba(255,255,255,0.25)' }}>{'\u00B7'}</span>
          <button style={{
            background: 'transparent', border: 'none', cursor: 'pointer',
            color: 'rgba(255,255,255,0.7)',
            fontFamily: 'inherit', fontSize: 'inherit', fontWeight: 'inherit',
            letterSpacing: 'inherit', textTransform: 'inherit', padding: 0
          }}>Terms</button>
          <span style={{ color: 'rgba(255,255,255,0.25)' }}>{'\u00B7'}</span>
          <button style={{
            background: 'transparent', border: 'none', cursor: 'pointer',
            color: 'rgba(255,255,255,0.7)',
            fontFamily: 'inherit', fontSize: 'inherit', fontWeight: 'inherit',
            letterSpacing: 'inherit', textTransform: 'inherit', padding: 0
          }}>Privacy</button>
        </div>
      </div>
    </div>);

}

Object.assign(window, { PaywallScreen });