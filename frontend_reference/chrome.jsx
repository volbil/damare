// Chrome — sidebar, topbar, and shared layout
const { useState, useEffect, useRef, useMemo } = React;

function Sidebar({ active = 'home', onNav }) {
  const items = [
    { id: 'home', icon: 'home', label: 'Стрічка' },
    { id: 'discover', icon: 'compass', label: 'Огляд' },
    { id: 'library', icon: 'book', label: 'Бібліотека' },
    { id: 'bookmarks', icon: 'bookmark', label: 'Закладки' },
    { id: 'write', icon: 'pen', label: 'Писати' },
  ];
  const community = [
    { id: 'forums', icon: 'message', label: 'Громада' },
    { id: 'articles', icon: 'quote', label: 'Записник' },
    { id: 'feed', icon: 'rss', label: 'Автори' },
  ];
  const lists = [
    { name: 'Зимове читання', count: 12 },
    { name: 'Перечитати', count: 8 },
    { name: 'Українське фентезі', count: 24 },
  ];
  return (
    <aside style={{
      width: 220, flexShrink: 0, background: 'var(--bg-0)',
      borderRight: '1px solid var(--line-soft)',
      display: 'flex', flexDirection: 'column',
      padding: '20px 12px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 8px 24px' }}>
        <Logomark size={24} />
        <span style={{ fontWeight: 600, fontSize: 17, color: 'var(--fg-0)', letterSpacing: '-0.02em' }}>damare</span>
      </div>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {items.map(it => (
          <button key={it.id} onClick={() => onNav && onNav(it.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '8px 10px', borderRadius: 'var(--r-md)',
              color: active === it.id ? 'var(--fg-0)' : 'var(--fg-2)',
              background: active === it.id ? 'var(--bg-2)' : 'transparent',
              fontSize: 13, fontWeight: 500, textAlign: 'left',
            }}>
            <Icon name={it.icon} size={16} />
            <span>{it.label}</span>
          </button>
        ))}
      </nav>
      <div style={{ marginTop: 18, padding: '0 10px 6px', fontSize: 10, fontWeight: 600,
                    letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-3)' }}>
        Спільнота
      </div>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {community.map(it => (
          <button key={it.id} onClick={() => onNav && onNav(it.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '7px 10px', borderRadius: 'var(--r-md)',
              color: active === it.id ? 'var(--fg-0)' : 'var(--fg-2)',
              background: active === it.id ? 'var(--bg-2)' : 'transparent',
              fontSize: 12.5, textAlign: 'left',
            }}>
            <Icon name={it.icon} size={15} />
            <span>{it.label}</span>
          </button>
        ))}
      </nav>
      <div style={{ marginTop: 24, padding: '0 10px 6px', fontSize: 10, fontWeight: 600,
                    letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-3)' }}>
        Колекції
      </div>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {lists.map(l => (
          <button key={l.name}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                     padding: '6px 10px', borderRadius: 'var(--r-sm)', fontSize: 12.5,
                     color: 'var(--fg-2)', textAlign: 'left' }}>
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{l.name}</span>
            <span style={{ color: 'var(--fg-4)', fontVariantNumeric: 'tabular-nums', fontSize: 11 }}>{l.count}</span>
          </button>
        ))}
        <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 10px',
                          color: 'var(--fg-3)', fontSize: 12.5, textAlign: 'left' }}>
          <Icon name="plus" size={12} /> Нова колекція
        </button>
      </nav>
      <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 10,
                     padding: '8px 10px', borderTop: '1px solid var(--line-soft)',
                     paddingTop: 14 }}>
        <div className="avatar" style={{ width: 28, height: 28 }}>МК</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ color: 'var(--fg-0)', fontSize: 12.5, fontWeight: 500 }}>Маринка К.</div>
          <div style={{ color: 'var(--fg-3)', fontSize: 11 }}>@marynka_k</div>
        </div>
        <button style={{ color: 'var(--fg-3)', padding: 4 }}><Icon name="settings" size={14} /></button>
      </div>
    </aside>
  );
}

function Logomark({ size = 24 }) {
  // "D" for Damare — geometric, minimal
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="8" fill="var(--accent)"/>
      <path d="M9 8h7c4 0 7 3.5 7 8s-3 8-7 8H9V8Z M14 13v6h2c1.5 0 3-1.2 3-3s-1.5-3-3-3h-2Z"
            fill="var(--bg-0)" fillRule="evenodd"/>
    </svg>
  );
}

function Topbar({ q = '', onSearch, page = 'Стрічка' }) {
  return (
    <header style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '12px 24px', borderBottom: '1px solid var(--line-soft)',
      background: 'var(--bg-0)', position: 'sticky', top: 0, zIndex: 10,
    }}>
      <div style={{ fontSize: 13, color: 'var(--fg-2)', minWidth: 80 }}>{page}</div>
      <div style={{ flex: 1, maxWidth: 480, position: 'relative' }}>
        <div style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)',
                       color: 'var(--fg-3)' }}>
          <Icon name="search" size={14} />
        </div>
        <input
          value={q}
          onChange={(e) => onSearch && onSearch(e.target.value)}
          placeholder="Пошук творів, авторів, тегів…"
          style={{
            width: '100%', height: 32, padding: '0 10px 0 32px',
            background: 'var(--bg-1)', border: '1px solid var(--line-soft)',
            borderRadius: 'var(--r-md)', color: 'var(--fg-0)', fontSize: 12.5, outline: 'none',
          }}
        />
        <kbd style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)',
                       fontSize: 10, color: 'var(--fg-3)', fontFamily: 'var(--font-mono)',
                       background: 'var(--bg-2)', padding: '1px 5px', borderRadius: 4 }}>⌘K</kbd>
      </div>
      <div style={{ flex: 1 }} />
      <button className="btn ghost icon sm" title="Сповіщення"
              style={{ position: 'relative' }}>
        <Icon name="bell" size={15} />
        <span style={{ position: 'absolute', top: 5, right: 5, width: 6, height: 6,
                        borderRadius: 999, background: 'var(--accent)' }} />
      </button>
      <button className="btn primary sm">
        <Icon name="pen" size={13} /> Написати
      </button>
    </header>
  );
}

window.Sidebar = Sidebar;
window.Topbar = Topbar;
window.Logomark = Logomark;
