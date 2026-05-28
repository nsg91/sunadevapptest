/* AuthScreens — all auth-adjacent screens in one file.
   Modes: 'login' · 'forgot' · 'magicVerify' · 'deleteConfirm' · 'export'
   All driven by props from the router. */

function AuthScreen({ sky, mode, onBack, onSuccess, onComplete }) {
  if (mode === 'login') return <LoginScreen sky={sky} onBack={onBack} onSuccess={onSuccess} />;
  if (mode === 'forgot') return <ForgotScreen sky={sky} onBack={onBack} onSuccess={onSuccess} />;
  if (mode === 'magicVerify') return <MagicVerifyScreen sky={sky} onBack={onBack} onSuccess={onSuccess} />;
  if (mode === 'deleteConfirm') return <DeleteConfirmScreen sky={sky} onBack={onBack} onComplete={onComplete} />;
  if (mode === 'export') return <ExportScreen sky={sky} onBack={onBack} />;
  return null;
}

// ───── shared chrome ─────
function AuthShell({ sky, eyebrow, title, sub, onBack, children, footer }) {
  var isDark = sky.dark;
  var line = isDark ? 'rgba(255,255,255,0.14)' : 'rgba(50,40,30,0.14)';
  return (
    <div style={{
      position: 'relative', width: '100%', height: '100%', overflow: 'hidden',
      fontFamily: 'var(--vara-sans)', background: isDark ? '#0c0a16' : '#faf6ef',
      display: 'flex', flexDirection: 'column'
    }}>
      <div style={{
        position: 'absolute', inset: -40, pointerEvents: 'none',
        backgroundImage: 'url(' + sky.photo + ')',
        backgroundSize: 'cover', backgroundPosition: 'center',
        filter: 'blur(60px) saturate(120%)', transform: 'scale(1.4)', opacity: 0.16
      }} />
      <div style={{ position: 'absolute', inset: 0, background: sky.tint, opacity: 0.3, pointerEvents: 'none' }} />

      <div style={{
        position: 'relative', height: 56, flexShrink: 0,
        display: 'flex', alignItems: 'flex-end', padding: '0 14px 8px'
      }}>
        <button onClick={onBack} aria-label="back" style={{
          background: 'transparent', border: 'none', cursor: 'pointer', padding: '8px 10px',
          color: sky.txt, opacity: 0.7, lineHeight: 0
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="vara-scroll" data-dc-passthrough style={{
        position: 'relative', flex: 1, minHeight: 0, padding: '20px 28px 0',
        display: 'flex', flexDirection: 'column', overflowY: 'auto'
      }}>
        <SansEyebrow color={sky.sub} style={{ marginBottom: 14 }}>{eyebrow}</SansEyebrow>
        <div style={{ fontSize: 28, fontWeight: 300, color: sky.txt, letterSpacing: '-0.01em', lineHeight: 1.22, marginBottom: 10 }}>{title}</div>
        {sub && <p style={{ fontSize: 15, fontWeight: 300, color: sky.sub, lineHeight: 1.55, margin: '0 0 28px' }}>{sub}</p>}
        {children}
      </div>

      <div style={{ position: 'relative', flexShrink: 0, padding: '14px 28px 36px' }}>
        {footer}
      </div>
    </div>
  );
}

function PrimaryButton({ sky, label, onClick, disabled }) {
  var isDark = sky.dark;
  return (
    <button onClick={onClick} disabled={disabled} style={{
      width: '100%', padding: '17px 0', borderRadius: 100, border: 'none',
      cursor: disabled ? 'default' : 'pointer',
      background: isDark ? 'rgba(255,255,255,0.94)' : 'rgba(40,30,22,0.92)',
      color: isDark ? 'rgba(20,18,28,1)' : 'rgba(248,244,236,1)',
      fontFamily: 'var(--vara-sans)', fontSize: 15, fontWeight: 500,
      letterSpacing: '0.18em', textTransform: 'uppercase',
      opacity: disabled ? 0.4 : 1, transition: 'opacity 0.2s ease'
    }}>{label}</button>
  );
}

function GhostButton({ sky, label, onClick }) {
  return (
    <button onClick={onClick} style={{
      width: '100%', padding: '14px 0', background: 'transparent', border: 'none', cursor: 'pointer',
      fontFamily: 'var(--vara-sans)', fontSize: 14, fontWeight: 400,
      letterSpacing: '0.08em', color: sky.sub
    }}>{label}</button>
  );
}

function AuthInput({ sky, type, label, value, onChange, placeholder, autoFocus }) {
  var isDark = sky.dark;
  var line = isDark ? 'rgba(255,255,255,0.14)' : 'rgba(50,40,30,0.14)';
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{
        fontSize: 9.5, fontWeight: 500, color: sky.sub, letterSpacing: '0.22em',
        textTransform: 'uppercase', marginLeft: 4, display: 'block', marginBottom: 6
      }}>{label}</label>
      <input type={type} value={value} onChange={onChange} placeholder={placeholder} autoFocus={autoFocus} style={{
        width: '100%', padding: '15px 16px', borderRadius: 14,
        border: '0.5px solid ' + line,
        background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.55)',
        fontFamily: 'var(--vara-sans)', fontSize: 16, fontWeight: 400,
        color: sky.txt, letterSpacing: '-0.005em', outline: 'none', boxSizing: 'border-box'
      }} />
    </div>
  );
}

// ───── 1. Login ─────
function LoginScreen({ sky, onBack, onSuccess }) {
  var [email, setEmail] = React.useState('');
  var [password, setPassword] = React.useState('');
  var [busy, setBusy] = React.useState(false);
  var canSubmit = /.+@.+\..+/.test(email) && password.length >= 6;

  function submit() {
    if (!canSubmit) return;
    setBusy(true);
    setTimeout(function () {
      try {
        var name = email.split('@')[0];
        localStorage.setItem('suna.userName', name.charAt(0).toUpperCase() + name.slice(1));
        localStorage.setItem('suna.userEmail', email);
        localStorage.setItem('suna.onboarded', '1');
      } catch (e) {}
      onSuccess && onSuccess();
    }, 700);
  }

  return (
    <AuthShell
      sky={sky}
      eyebrow="Welcome back"
      title="Sign in."
      sub="Pick up where you left off."
      onBack={onBack}
      footer={
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <PrimaryButton sky={sky} label={busy ? 'Signing in…' : 'Sign in'} onClick={submit} disabled={!canSubmit || busy} />
          <GhostButton sky={sky} label="Forgot password?" onClick={function () { onBack && onBack('forgot'); }} />
        </div>
      }>
      <AuthInput sky={sky} type="email" label="Email" value={email} onChange={function (e) { setEmail(e.target.value); }} placeholder="you@where-you-are.com" autoFocus />
      <AuthInput sky={sky} type="password" label="Password" value={password} onChange={function (e) { setPassword(e.target.value); }} placeholder="••••••••" />
      <div style={{ fontSize: 12.5, fontWeight: 300, color: sky.sub, lineHeight: 1.55, margin: '8px 0 0', opacity: 0.75 }}>
        Or use Apple / Google from the start screen. Your nervous system data stays on your device.
      </div>
    </AuthShell>
  );
}

// ───── 2. Forgot password ─────
function ForgotScreen({ sky, onBack, onSuccess }) {
  var [email, setEmail] = React.useState('');
  var [sent, setSent] = React.useState(false);
  var canSubmit = /.+@.+\..+/.test(email);

  if (sent) {
    return (
      <AuthShell
        sky={sky}
        eyebrow="Check your email"
        title="A link is on its way."
        sub={'We sent a reset link to ' + email + '. Open it on this device to set a new password.'}
        onBack={onBack}
        footer={
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <PrimaryButton sky={sky} label="Done" onClick={function () { onSuccess && onSuccess(); }} />
            <GhostButton sky={sky} label="Re-send link" onClick={function () { setSent(false); setTimeout(function () { setSent(true); }, 200); }} />
          </div>
        }>
        <div style={{
          padding: '20px 18px', borderRadius: 18,
          background: sky.dark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.48)',
          border: '0.5px solid ' + (sky.dark ? 'rgba(255,255,255,0.12)' : 'rgba(50,40,30,0.12)'),
          fontSize: 15, fontWeight: 300, color: sky.txt, lineHeight: 1.55, fontStyle: 'italic'
        }}>Didn{'\u2019'}t get it? Check spam, or wait a minute and re-send.</div>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      sky={sky}
      eyebrow="Reset password"
      title="Forgot it. It happens."
      sub="We'll send you a link to set a new one."
      onBack={onBack}
      footer={<PrimaryButton sky={sky} label="Send reset link" onClick={function () { setSent(true); }} disabled={!canSubmit} />}>
      <AuthInput sky={sky} type="email" label="Email" value={email} onChange={function (e) { setEmail(e.target.value); }} placeholder="you@where-you-are.com" autoFocus />
    </AuthShell>
  );
}

// ───── 3. Magic-link verify ─────
function MagicVerifyScreen({ sky, onBack, onSuccess }) {
  var [code, setCode] = React.useState(['', '', '', '', '', '']);
  var [busy, setBusy] = React.useState(false);
  var refs = [React.useRef(), React.useRef(), React.useRef(), React.useRef(), React.useRef(), React.useRef()];

  function setDigit(i, v) {
    var clean = v.replace(/\D/g, '').slice(0, 1);
    var next = code.slice();
    next[i] = clean;
    setCode(next);
    if (clean && i < 5 && refs[i + 1].current) refs[i + 1].current.focus();
    if (next.every(function (d) { return d.length === 1; })) {
      setBusy(true);
      setTimeout(function () { onSuccess && onSuccess(); }, 700);
    }
  }

  return (
    <AuthShell
      sky={sky}
      eyebrow="Verify"
      title="Enter your 6-digit code."
      sub="We sent it to your email. It expires in 10 minutes."
      onBack={onBack}
      footer={
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <GhostButton sky={sky} label={busy ? 'Verifying…' : 'Re-send code'} onClick={function () { setCode(['', '', '', '', '', '']); }} />
        </div>
      }>
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 14 }}>
        {code.map(function (d, i) {
          return (
            <input key={i} ref={refs[i]} type="text" inputMode="numeric" value={d}
              onChange={function (e) { setDigit(i, e.target.value); }}
              onKeyDown={function (e) { if (e.key === 'Backspace' && !d && i > 0) refs[i - 1].current.focus(); }}
              style={{
                width: 44, height: 56, borderRadius: 12, textAlign: 'center',
                background: sky.dark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.6)',
                border: '0.5px solid ' + (sky.dark ? 'rgba(255,255,255,0.14)' : 'rgba(50,40,30,0.14)'),
                color: sky.txt, fontFamily: 'var(--vara-mono), var(--vara-sans)',
                fontSize: 22, fontWeight: 400, outline: 'none'
              }} />
          );
        })}
      </div>
      {busy && (
        <div style={{
          marginTop: 24, fontSize: 14, fontWeight: 400, textAlign: 'center',
          letterSpacing: '0.24em', textTransform: 'uppercase', color: sky.fp, opacity: 0.85
        }}>Signing you in…</div>
      )}
    </AuthShell>
  );
}

// ───── 4. Delete account confirm ─────
function DeleteConfirmScreen({ sky, onBack, onComplete }) {
  var [phrase, setPhrase] = React.useState('');
  var isDark = sky.dark;
  var danger = '#C46A5A';
  var canDelete = phrase.trim().toLowerCase() === 'delete my garden';

  function doDelete() {
    if (!canDelete) return;
    try {
      ['suna.screen','suna.sky','suna.onboarded','suna.userName','suna.userEmail',
       'suna.firstScanDone','suna.firstShiftDone','suna.signInProvider'].forEach(function (k) {
        localStorage.removeItem(k);
      });
    } catch (e) {}
    onComplete && onComplete();
  }

  return (
    <AuthShell
      sky={sky}
      eyebrow="Permanent"
      title="Delete your account."
      sub="This wipes your garden, your sessions, and everything suna knows about your rhythms. It cannot be undone."
      onBack={onBack}
      footer={
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <button onClick={doDelete} disabled={!canDelete} style={{
            width: '100%', padding: '17px 0', borderRadius: 100, border: 'none',
            cursor: canDelete ? 'pointer' : 'default',
            background: canDelete ? danger : (isDark ? 'rgba(196,106,90,0.25)' : 'rgba(196,106,90,0.18)'),
            color: '#fff',
            fontFamily: 'var(--vara-sans)', fontSize: 15, fontWeight: 500,
            letterSpacing: '0.18em', textTransform: 'uppercase',
            opacity: canDelete ? 1 : 0.7
          }}>Delete forever</button>
          <GhostButton sky={sky} label="Cancel" onClick={onBack} />
        </div>
      }>
      <div style={{
        padding: '14px 16px', borderRadius: 14, marginBottom: 18,
        background: 'rgba(196,106,90,0.10)', border: '0.5px solid rgba(196,106,90,0.35)',
        fontSize: 14.5, fontWeight: 300, color: sky.txt, lineHeight: 1.55
      }}>
        <div style={{ fontSize: 11.5, fontWeight: 500, letterSpacing: '0.24em', textTransform: 'uppercase', color: danger, marginBottom: 8 }}>What gets deleted</div>
        <ul style={{ margin: 0, paddingLeft: 16, color: sky.sub }}>
          <li style={{ marginBottom: 4 }}>All check-ins, scans, and HRV readings</li>
          <li style={{ marginBottom: 4 }}>Your entire garden and session history</li>
          <li style={{ marginBottom: 4 }}>Cycle data, wake time, and reminders</li>
          <li>Your active subscription (cancel separately in Apple/Google)</li>
        </ul>
      </div>
      <AuthInput sky={sky} type="text" label="Type to confirm" value={phrase}
        onChange={function (e) { setPhrase(e.target.value); }}
        placeholder='Type "delete my garden"' autoFocus />
    </AuthShell>
  );
}

// ───── 5. Export data ─────
function ExportScreen({ sky, onBack }) {
  var [stage, setStage] = React.useState('idle'); // idle | preparing | ready
  React.useEffect(function () {
    if (stage === 'preparing') {
      var t = setTimeout(function () { setStage('ready'); }, 1800);
      return function () { clearTimeout(t); };
    }
  }, [stage]);

  return (
    <AuthShell
      sky={sky}
      eyebrow="Your data"
      title="Export everything."
      sub="A single .json file with every reading, every practice, every flower in your garden. Yours forever."
      onBack={onBack}
      footer={
        stage === 'idle' ? <PrimaryButton sky={sky} label="Prepare my data" onClick={function () { setStage('preparing'); }} /> :
        stage === 'preparing' ? <PrimaryButton sky={sky} label="Preparing…" disabled /> :
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <PrimaryButton sky={sky} label="Download (.json)" onClick={function () {
            try {
              var blob = new Blob([JSON.stringify({
                version: 1,
                exportedAt: new Date().toISOString(),
                name: localStorage.getItem('suna.userName') || 'Eva',
                email: localStorage.getItem('suna.userEmail') || '',
                sessions: [],
                garden: { flowers: 0 }
              }, null, 2)], { type: 'application/json' });
              var a = document.createElement('a');
              a.href = URL.createObjectURL(blob);
              a.download = 'suna-export-' + new Date().toISOString().slice(0,10) + '.json';
              a.click();
            } catch (e) {}
          }} />
          <GhostButton sky={sky} label="Email it to me instead" onClick={onBack} />
        </div>
      }>
      {stage === 'ready' && (
        <div style={{
          padding: '14px 16px', borderRadius: 14, marginTop: 4,
          background: sky.dark ? 'rgba(120,200,160,0.08)' : 'rgba(120,180,140,0.10)',
          border: '0.5px solid ' + (sky.dark ? 'rgba(120,200,160,0.22)' : 'rgba(120,180,140,0.28)'),
          fontSize: 15, fontWeight: 400, color: sky.txt
        }}>Ready. 2.4 KB · suna-export.json</div>
      )}
    </AuthShell>
  );
}

Object.assign(window, { AuthScreen, LoginScreen, ForgotScreen, MagicVerifyScreen, DeleteConfirmScreen, ExportScreen });
