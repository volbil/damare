// Hikka-style chrome — left rail icon-only nav, top header with search & user
const _useState_hk = React.useState;

function HkSidebar({ active = 'home', onNav }) {
  const items = [
    { id: 'home', icon: 'home', label: 'Головна' },
    { id: 'discover', icon: 'compass', label: 'Огляд' },
    { id: 'schedule', icon: 'calendar', label: 'Розклад' },
    { id: 'list', icon: 'list', label: 'Мій список' },
    { id: 'collections', icon: 'grid', label: 'Колекції' },
    { id: 'articles', icon: 'quote', label: 'Статті' },
    { id: 'forums', icon: 'message', label: 'Обговорення' },
  ];
  return (
    <aside style={{ width: 56, flexShrink: 0,
                      borderRight: '1px solid var(--hk-line)',
                      background: 'var(--hk-bg-0)',
                      display: 'flex', flexDirection: 'column', alignItems: 'center',
                      padding: '14px 0' }}>
      <div style={{ marginBottom: 18 }}>
        <HkLogo size={28} />
      </div>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
        {items.map(it => (
          <button key={it.id} onClick={() => onNav && onNav(it.id)}
                  title={it.label}
                  style={{ width: 38, height: 38, borderRadius: 'var(--hk-r-md)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: active === it.id ? 'var(--hk-fg-0)' : 'var(--hk-fg-3)',
                            background: active === it.id ? 'var(--hk-bg-2)' : 'transparent',
                            position: 'relative' }}>
            <Icon name={it.icon} size={17} />
            {active === it.id && (
              <span style={{ position: 'absolute', left: -7, top: 8, bottom: 8, width: 2,
                              borderRadius: 2, background: 'var(--hk-accent)' }} />
            )}
          </button>
        ))}
      </nav>
      <button title="Налаштування" style={{ width: 38, height: 38, borderRadius: 'var(--hk-r-md)',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                color: 'var(--hk-fg-3)' }}>
        <Icon name="settings" size={17} />
      </button>
    </aside>
  );
}

function HkLogo({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <rect x="2" y="2" width="28" height="28" rx="7" fill="var(--hk-accent)"/>
      <path d="M10 9v14M22 9v14M10 16h12" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  );
}

function HkTopbar({ page, q = '' }) {
  return (
    <header style={{ display: 'flex', alignItems: 'center', gap: 14,
                      padding: '10px 22px', borderBottom: '1px solid var(--hk-line)',
                      background: 'var(--hk-bg-0)', position: 'sticky', top: 0, zIndex: 10 }}>
      {page && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}>
          <span style={{ color: 'var(--hk-fg-3)' }}>damare</span>
          <Icon name="chevron-r" size={11} style={{ color: 'var(--hk-fg-4)' }} />
          <span style={{ color: 'var(--hk-fg-0)', fontWeight: 500 }}>{page}</span>
        </div>
      )}
      <div style={{ flex: 1, maxWidth: 460, position: 'relative', marginLeft: page ? 12 : 0 }}>
        <Icon name="search" size={14} style={{ position: 'absolute', left: 10, top: '50%',
                                                  transform: 'translateY(-50%)', color: 'var(--hk-fg-3)' }} />
        <input className="hk-input" defaultValue={q}
                placeholder="Шукати твори, авторів, теги…"
                style={{ width: '100%', paddingLeft: 32, paddingRight: 60 }} />
        <kbd style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)',
                       fontSize: 10, color: 'var(--hk-fg-3)', fontFamily: 'var(--hk-font-mono)',
                       background: 'var(--hk-bg-2)', padding: '2px 6px', borderRadius: 4,
                       border: '1px solid var(--hk-line)' }}>⌘K</kbd>
      </div>
      <div style={{ flex: 1 }} />
      <button className="hk-btn ghost icon"><Icon name="bell" size={15} /></button>
      <button className="hk-btn ghost icon"><Icon name="bookmark" size={15} /></button>
      <button className="hk-btn primary sm">
        <Icon name="plus" size={12} /> Додати твір
      </button>
      <div className="hk-av" style={{ width: 30, height: 30, marginLeft: 4 }}>МК</div>
    </header>
  );
}

/* Reusable status pill that maps to Hikka's watch-list states */
function HkStatus({ kind, label }) {
  const map = {
    reading:   { c: 'var(--hk-st-reading)',   l: 'Читаю' },
    planning:  { c: 'var(--hk-st-planning)',  l: 'Заплановано' },
    completed: { c: 'var(--hk-st-completed)', l: 'Завершено' },
    onhold:    { c: 'var(--hk-st-onhold)',    l: 'Відкладено' },
    dropped:   { c: 'var(--hk-st-dropped)',   l: 'Кинуто' },
    publishing: { c: 'var(--hk-st-reading)',  l: 'Виходить' },
    finished:   { c: 'var(--hk-fg-3)',         l: 'Завершено' },
  };
  const m = map[kind] || { c: 'var(--hk-fg-3)', l: kind };
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5,
                    fontSize: 11, color: 'var(--hk-fg-1)' }}>
      <span className="hk-dot" style={{ background: m.c }} />
      {label || m.l}
    </span>
  );
}

/* Score color mapping: 1-3 red, 4-6 amber, 7-8 lime, 9-10 green */
function scoreColor(s) {
  if (!s) return 'var(--hk-fg-3)';
  if (s >= 9) return 'oklch(0.74 0.18 145)';
  if (s >= 7) return 'oklch(0.78 0.16 130)';
  if (s >= 5) return 'oklch(0.78 0.13 80)';
  if (s >= 3) return 'oklch(0.72 0.16 50)';
  return 'oklch(0.65 0.18 25)';
}

function HkScore({ value, size = 12 }) {
  return (
    <span className="hk-score num" style={{ fontSize: size, color: scoreColor(value),
                                                background: 'transparent',
                                                border: '1px solid currentColor', padding: '1px 6px' }}>
      <Icon name="star" size={size - 1} />
      {value ? value.toFixed(1) : '—'}
    </span>
  );
}

window.HkSidebar = HkSidebar;
window.HkTopbar = HkTopbar;
window.HkLogo = HkLogo;
window.HkStatus = HkStatus;
window.HkScore = HkScore;
window.scoreColor = scoreColor;
