// Screen 7 — Login / signup
function LoginScreen() {
  const [mode, setMode] = useState('signup');

  return (
    <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', background: 'var(--bg-0)' }}>
      {/* Left — visual */}
      <div style={{ position: 'relative', overflow: 'hidden',
                     background: 'linear-gradient(180deg, oklch(0.20 0.02 70) 0%, oklch(0.16 0.02 60) 100%)',
                     borderRight: '1px solid var(--line-soft)' }}>
        {/* Floating cover collage */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.85 }}>
          {NOVELS.slice(0, 6).map((n, i) => {
            const positions = [
              { left: '8%',  top: '12%', w: 110, r: -8 },
              { left: '52%', top: '8%',  w: 130, r: 5 },
              { left: '20%', top: '42%', w: 150, r: 3 },
              { left: '64%', top: '40%', w: 120, r: -6 },
              { left: '4%',  top: '70%', w: 100, r: 7 },
              { left: '54%', top: '70%', w: 140, r: -4 },
            ][i];
            return (
              <div key={n.id} className="cover" style={{
                position: 'absolute', left: positions.left, top: positions.top,
                width: positions.w, transform: `rotate(${positions.r}deg)`,
                boxShadow: '0 16px 50px rgba(0,0,0,0.5)',
              }}>
                <GeneratedCover title={n.title} author={n.author} seed={n.id} />
              </div>
            );
          })}
          <div style={{ position: 'absolute', inset: 0,
                         background: 'radial-gradient(ellipse at center, transparent 30%, var(--bg-0) 90%)' }} />
        </div>

        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column',
                        height: '100%', padding: 40 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Logomark size={28} />
            <span style={{ fontSize: 19, fontWeight: 600, color: 'var(--fg-0)', letterSpacing: '-0.02em' }}>
              damare
            </span>
          </div>
          <div style={{ marginTop: 'auto' }}>
            <div style={{ fontSize: 11, color: 'var(--accent)', letterSpacing: '0.1em',
                            textTransform: 'uppercase', marginBottom: 10 }}>
              Українська платформа для літератури
            </div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 34, fontWeight: 500,
                          lineHeight: 1.1, marginBottom: 14, maxWidth: 420 }}>
              Місце, де живуть історії — твої та чужі.
            </h2>
            <p style={{ fontSize: 13, color: 'var(--fg-2)', maxWidth: 380, lineHeight: 1.6, margin: 0 }}>
              Читайте романи й фанфіки українською. Публікуйте розділ за розділом.
              Знаходьте читачів, які чекають саме на вашу історію.
            </p>
            <div style={{ display: 'flex', gap: 24, marginTop: 24, fontSize: 12, color: 'var(--fg-3)' }}>
              <span><b style={{ color: 'var(--fg-0)' }}>14 200</b> творів</span>
              <span><b style={{ color: 'var(--fg-0)' }}>5 800</b> авторів</span>
              <span><b style={{ color: 'var(--fg-0)' }}>—</b> цілодобово</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right — form */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
        <div style={{ width: '100%', maxWidth: 360 }}>
          <div style={{ display: 'flex', background: 'var(--bg-1)', borderRadius: 'var(--r-md)',
                          padding: 3, border: '1px solid var(--line-soft)', marginBottom: 28,
                          width: 'fit-content' }}>
            {[['signup', 'Реєстрація'], ['login', 'Увійти']].map(([id, label]) => (
              <button key={id} onClick={() => setMode(id)}
                      style={{ height: 30, padding: '0 14px', fontSize: 12,
                                borderRadius: 6, color: mode === id ? 'var(--fg-0)' : 'var(--fg-3)',
                                background: mode === id ? 'var(--bg-3)' : 'transparent',
                                fontWeight: mode === id ? 500 : 400 }}>
                {label}
              </button>
            ))}
          </div>

          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 500,
                        marginBottom: 6, lineHeight: 1.15 }}>
            {mode === 'signup' ? 'Створіть акаунт' : 'З поверненням'}
          </h1>
          <p style={{ fontSize: 13, color: 'var(--fg-3)', marginBottom: 28 }}>
            {mode === 'signup'
              ? 'Безкоштовно. Без реклами. Без алгоритмів, що тиснуть.'
              : 'Раді бачити вас знову.'}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {mode === 'signup' && (
              <Field label="Ім'я користувача" placeholder="@marynka_k" prefix="@" />
            )}
            <Field label="Електронна пошта" placeholder="ви@приклад.ua" type="email" icon="mail" />
            <Field label="Пароль" placeholder="мінімум 8 символів" type="password" icon="lock" />

            {mode === 'signup' && (
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 12,
                                color: 'var(--fg-2)', lineHeight: 1.5, marginTop: 4 }}>
                <input type="checkbox" defaultChecked
                        style={{ marginTop: 2, accentColor: 'var(--accent)' }} />
                <span>
                  Я погоджуюсь із{' '}
                  <a style={{ color: 'var(--accent)', textDecoration: 'underline', textUnderlineOffset: 2 }}>
                    умовами користування
                  </a>{' '}
                  та{' '}
                  <a style={{ color: 'var(--accent)', textDecoration: 'underline', textUnderlineOffset: 2 }}>
                    політикою приватності
                  </a>.
                </span>
              </label>
            )}

            <button className="btn primary" style={{ height: 40, marginTop: 8 }}>
              {mode === 'signup' ? 'Створити акаунт' : 'Увійти'} <Icon name="arrow-r" size={13} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '4px 0',
                            color: 'var(--fg-3)', fontSize: 11 }}>
              <div style={{ flex: 1, height: 1, background: 'var(--line-soft)' }} />
              <span>або</span>
              <div style={{ flex: 1, height: 1, background: 'var(--line-soft)' }} />
            </div>

            <button className="btn" style={{ height: 38, justifyContent: 'center' }}>
              <Icon name="globe" size={14} /> Продовжити з Google
            </button>

            {mode === 'login' && (
              <a style={{ textAlign: 'center', fontSize: 12, color: 'var(--fg-3)',
                            textDecoration: 'underline', textUnderlineOffset: 3, marginTop: 6 }}>
                Забули пароль?
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, placeholder, type = 'text', icon, prefix }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      <span style={{ fontSize: 11.5, color: 'var(--fg-2)', fontWeight: 500 }}>{label}</span>
      <div style={{ position: 'relative' }}>
        {icon && (
          <div style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
                          color: 'var(--fg-3)' }}>
            <Icon name={icon} size={14} />
          </div>
        )}
        {prefix && (
          <div style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
                          color: 'var(--fg-3)', fontSize: 13 }}>
            {prefix}
          </div>
        )}
        <input type={type} placeholder={placeholder}
                style={{ width: '100%', height: 38,
                          padding: icon || prefix ? '0 12px 0 34px' : '0 12px',
                          background: 'var(--bg-1)', border: '1px solid var(--line)',
                          borderRadius: 'var(--r-md)', color: 'var(--fg-0)', fontSize: 13, outline: 'none' }} />
      </div>
    </label>
  );
}

window.LoginScreen = LoginScreen;
