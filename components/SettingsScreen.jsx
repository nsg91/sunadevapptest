/* SettingsScreen — preferences page reached from Profile.
   Houses cycle tracking, wake time, name, morning reminder, theme.
   The bits we deliberately did NOT ask during onboarding. */

function SettingsScreen({ sky, onBack }) {
  var isDark = sky.dark;
  var line = isDark ? 'rgba(255,255,255,0.14)' : 'rgba(50,40,30,0.12)';
  var lineSoft = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(50,40,30,0.06)';

  var initialName = '';
  var initialEmail = '';
  try {
    initialName = localStorage.getItem('suna.userName') || 'Eva';
    initialEmail = localStorage.getItem('suna.userEmail') || 'eva@suna.app';
  } catch (e) { initialName = 'Eva'; initialEmail = 'eva@suna.app'; }

  var [name, setName] = React.useState(initialName);
  var [email] = React.useState(initialEmail);
  var [cycleOn, setCycleOn] = React.useState(true);
  var [cycleStart, setCycleStart] = React.useState('2026-04-29');
  var [cycleLength, setCycleLength] = React.useState(28);
  var [wake, setWake] = React.useState('07:30');
  var [reminderOn, setReminderOn] = React.useState(true);
  var [reminderTime, setReminderTime] = React.useState('08:30');
  var [theme, setTheme] = React.useState(isDark ? 'dark' : 'light');
  var [hapticsOn, setHapticsOn] = React.useState(true);

  function persist() {
    try { if (name) localStorage.setItem('suna.userName', name.trim().split(' ')[0]); } catch (e) {}
  }
  React.useEffect(persist, [name]);

  function Section({ title, children }) {
    return (
      <div style={{ marginBottom: 26 }}>
        <div style={{
          fontSize: 9, fontWeight: 500, letterSpacing: '0.24em', textTransform: 'uppercase',
          color: sky.sub, marginBottom: 10, marginLeft: 4, opacity: 0.85
        }}>{title}</div>
        <div style={{
          borderRadius: 16, overflow: 'hidden',
          background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.5)',
          border: '0.5px solid ' + line
        }}>{children}</div>
      </div>
    );
  }
  function Row({ label, children, last }) {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '14px 16px', minHeight: 48,
        borderBottom: last ? 'none' : '0.5px solid ' + lineSoft
      }}>
        <div style={{ fontSize: 13, fontWeight: 400, color: sky.txt, letterSpacing: '-0.005em' }}>{label}</div>
        <div style={{ fontSize: 13, fontWeight: 300, color: sky.sub }}>{children}</div>
      </div>
    );
  }
  function Toggle({ on, onChange }) {
    return (
      <button onClick={function () { onChange(!on); }} style={{
        width: 42, height: 24, borderRadius: 100, padding: 2, border: 'none', cursor: 'pointer',
        background: on ? sky.fp : (isDark ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.18)'),
        transition: 'background 0.2s ease',
        display: 'flex', alignItems: 'center'
      }}>
        <div style={{
          width: 20, height: 20, borderRadius: '50%', background: '#fff',
          transform: on ? 'translateX(18px)' : 'translateX(0)',
          transition: 'transform 0.2s ease', boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
        }} />
      </button>
    );
  }
  function TimeInput({ value, onChange }) {
    return (
      <input type="time" value={value} onChange={function (e) { onChange(e.target.value); }} style={{
        background: 'transparent', border: 'none', color: sky.txt, fontSize: 13, fontWeight: 400,
        fontFamily: 'var(--vara-mono), var(--vara-sans)', outline: 'none', textAlign: 'right',
        cursor: 'pointer'
      }} />
    );
  }

  return (
    <div className="vara-scroll" data-dc-passthrough style={{
      position: 'relative', width: '100%', height: '100%',
      overflowY: 'auto', overflowX: 'hidden', WebkitOverflowScrolling: 'touch',
      fontFamily: 'var(--vara-sans)', background: isDark ? '#0c0a16' : '#faf6ef'
    }}>
      <div style={{
        position: 'fixed', inset: -40, pointerEvents: 'none',
        backgroundImage: 'url(' + sky.photo + ')',
        backgroundSize: 'cover', backgroundPosition: 'center',
        filter: 'blur(60px) saturate(120%)', transform: 'scale(1.4)',
        opacity: 0.13
      }} />
      <div style={{ position: 'relative', padding: '60px 24px 120px' }}>
        {/* header */}
        <button onClick={onBack} style={{
          background: 'transparent', border: 'none', cursor: 'pointer',
          fontSize: 11, fontWeight: 400, letterSpacing: '0.14em', textTransform: 'uppercase',
          color: sky.sub, fontFamily: 'var(--vara-sans)', padding: 0, marginBottom: 22
        }}>{'\u2190'} Back</button>
        <div style={{
          fontSize: 28, fontWeight: 300, color: sky.txt,
          letterSpacing: '-0.015em', lineHeight: 1.2, marginBottom: 6
        }}>Settings</div>
        <div style={{ fontSize: 12, fontWeight: 300, fontStyle: 'italic', color: sky.sub,
          lineHeight: 1.5, marginBottom: 28 }}>
          The things suna uses to know you better.
        </div>

        {/* Account */}
        <Section title="Account">
          <div style={{ padding: '14px 16px', borderBottom: '0.5px solid ' + lineSoft }}>
            <div style={{ fontSize: 9.5, fontWeight: 500, color: sky.sub, letterSpacing: '0.2em',
              textTransform: 'uppercase', marginBottom: 6 }}>First name</div>
            <input type="text" value={name} onChange={function (e) { setName(e.target.value); }} style={{
              width: '100%', background: 'transparent', border: 'none', outline: 'none',
              fontFamily: 'var(--vara-sans)', fontSize: 15, fontWeight: 400, color: sky.txt,
              letterSpacing: '-0.005em', padding: 0
            }} />
          </div>
          <Row label="Email" last>
            <span style={{ fontFamily: 'var(--vara-mono), var(--vara-sans)', fontSize: 12 }}>{email}</span>
          </Row>
        </Section>

        {/* Cycle Sync */}
        <Section title="Cycle Sync">
          <Row label="Track my cycle">
            <Toggle on={cycleOn} onChange={setCycleOn} />
          </Row>
          {cycleOn && (
            <>
              <Row label="Last period started">
                <input type="date" value={cycleStart} onChange={function (e) { setCycleStart(e.target.value); }} style={{
                  background: 'transparent', border: 'none', color: sky.txt, fontSize: 13,
                  fontFamily: 'var(--vara-mono), var(--vara-sans)', outline: 'none', textAlign: 'right', cursor: 'pointer'
                }} />
              </Row>
              <Row label="Average cycle length">
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  <button onClick={function () { setCycleLength(Math.max(21, cycleLength - 1)); }} style={miniBtn(sky)}>{'\u2212'}</button>
                  <span style={{ fontVariantNumeric: 'tabular-nums', minWidth: 44, textAlign: 'center', color: sky.txt }}>{cycleLength} days</span>
                  <button onClick={function () { setCycleLength(Math.min(40, cycleLength + 1)); }} style={miniBtn(sky)}>+</button>
                </span>
              </Row>
            </>
          )}
          <div style={{ padding: '12px 16px', borderTop: '0.5px solid ' + lineSoft }}>
            <p style={{ fontSize: 11, fontWeight: 300, fontStyle: 'italic', color: sky.sub,
              lineHeight: 1.5, margin: 0 }}>
              suna adjusts what it expects from your nervous system across the four phases. Late luteal looks different than ovulation — and that{'\u2019'}s okay.
            </p>
          </div>
        </Section>

        {/* Rhythm */}
        <Section title="Rhythm">
          <Row label="Wake time">
            <TimeInput value={wake} onChange={setWake} />
          </Row>
          <Row label="Morning check-in reminder">
            <Toggle on={reminderOn} onChange={setReminderOn} />
          </Row>
          {reminderOn && (
            <Row label="Reminder time" last>
              <TimeInput value={reminderTime} onChange={setReminderTime} />
            </Row>
          )}
          {!reminderOn && <div style={{ display: 'none' }} />}
        </Section>

        {/* App */}
        <Section title="App">
          <Row label="Theme">
            <span style={{ display: 'inline-flex', gap: 4, padding: 2, borderRadius: 100,
              background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)' }}>
              {['light', 'dark', 'auto'].map(function (t) {
                var active = theme === t;
                return (
                  <button key={t} onClick={function () { setTheme(t); }} style={{
                    padding: '5px 12px', borderRadius: 100, border: 'none', cursor: 'pointer',
                    background: active ? (isDark ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.9)') : 'transparent',
                    fontFamily: 'var(--vara-sans)', fontSize: 11, fontWeight: 500,
                    letterSpacing: '0.08em', textTransform: 'uppercase',
                    color: active ? sky.txt : sky.sub
                  }}>{t}</button>
                );
              })}
            </span>
          </Row>
          <Row label="Subtle haptics" last>
            <Toggle on={hapticsOn} onChange={setHapticsOn} />
          </Row>
        </Section>

        {/* Privacy */}
        <Section title="Privacy">
          <Row label="On-device only">
            <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.16em', textTransform: 'uppercase',
              color: sky.fp }}>Always</span>
          </Row>
          <Row label="Export my data">
            <span style={{ color: sky.fp }}>{'\u203A'}</span>
          </Row>
          <Row label="Delete account" last>
            <span style={{ color: sky.sub, opacity: 0.8 }}>{'\u203A'}</span>
          </Row>
        </Section>

        {/* version */}
        <div style={{ textAlign: 'center', fontSize: 10, fontWeight: 400, color: sky.sub,
          letterSpacing: '0.16em', textTransform: 'uppercase', opacity: 0.6, marginTop: 14 }}>
          suna · v 0.6 · spring 2026
        </div>
      </div>
    </div>
  );
}

function miniBtn(sky) {
  return {
    width: 24, height: 24, borderRadius: '50%', border: '0.5px solid ' + (sky.dark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.18)'),
    background: 'transparent', color: sky.txt, fontSize: 14, lineHeight: 1, cursor: 'pointer',
    fontFamily: 'var(--vara-sans)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center'
  };
}

Object.assign(window, { SettingsScreen });
