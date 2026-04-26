// Screen 4 — Writer / editor view
function WriterScreen() {
  const [title, setTitle] = useState('Лист, який ніхто не писав');
  const [body, setBody] = useState(
    'Сніг падав так, як падає тільки на Поліссі — повільно, з тією важкою терплячістю, з якою старі люди розповідають довгі історії.\n\nМаринка стояла біля воріт батьківської хати і дивилася, як сніжинки одна за одною лягають на дерев\'яну поштову скриньку, прибиту до паркана ще її дідом.\n\nСім років. Сім років вона не приїжджала сюди. За цей час вона встигла переїхати до Львова, потім до Кракова, потім назад до Києва.'
  );
  const wordCount = body.trim().split(/\s+/).filter(Boolean).length;
  const charCount = body.length;

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--bg-0)' }}>
      {/* Editor topbar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 24px',
                     borderBottom: '1px solid var(--line-soft)', background: 'var(--bg-0)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--fg-2)' }}>
          <span>Сім зимових ночей</span>
          <Icon name="chevron-r" size={11} style={{ color: 'var(--fg-3)' }} />
          <span>Розділ 3</span>
        </div>
        <div style={{ flex: 1 }} />
        <span style={{ fontSize: 11, color: 'var(--fg-3)', display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 6, height: 6, borderRadius: 999, background: '#7cb98a' }} />
          Збережено · щойно
        </span>
        <button className="btn sm ghost"><Icon name="eye" size={12} /> Перегляд</button>
        <button className="btn sm">Зберегти чернетку</button>
        <button className="btn sm primary">Опублікувати</button>
      </div>

      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 280px', overflow: 'hidden' }}>
        {/* Editor */}
        <div style={{ overflow: 'auto', padding: '32px 0' }}>
          <div style={{ maxWidth: 680, margin: '0 auto', padding: '0 32px' }}>
            {/* Toolbar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 2, padding: '4px 6px',
                            background: 'var(--bg-1)', border: '1px solid var(--line-soft)',
                            borderRadius: 'var(--r-md)', marginBottom: 32, width: 'fit-content' }}>
              {[
                ['type', 'H'], ['bold', 'B'], ['italic', 'I'], null,
                ['quote', null], ['list', null], null,
                ['image', null], ['minus', null],
              ].map((it, i) =>
                it === null
                  ? <div key={i} style={{ width: 1, height: 16, background: 'var(--line-soft)', margin: '0 4px' }} />
                  : <button key={i} className="btn ghost icon sm"
                            style={{ width: 28, height: 28, color: 'var(--fg-2)' }}>
                      <Icon name={it[0]} size={14} />
                    </button>
              )}
            </div>

            <input value={title} onChange={(e) => setTitle(e.target.value)}
                    placeholder="Назва розділу"
                    style={{ width: '100%', padding: 0, marginBottom: 24,
                              background: 'transparent', border: 0, outline: 'none',
                              fontFamily: 'var(--font-serif)', fontSize: 36, fontWeight: 500,
                              color: 'var(--fg-0)', letterSpacing: '-0.02em' }} />

            <textarea value={body} onChange={(e) => setBody(e.target.value)}
                      placeholder="Почніть писати…"
                      style={{ width: '100%', minHeight: 480, padding: 0,
                                background: 'transparent', border: 0, outline: 'none', resize: 'none',
                                fontFamily: 'var(--font-serif)', fontSize: 17, lineHeight: 1.7,
                                color: 'var(--fg-0)' }} />
          </div>
        </div>

        {/* Right rail */}
        <aside style={{ borderLeft: '1px solid var(--line-soft)', background: 'var(--bg-0)',
                          overflow: 'auto', padding: 20 }}>
          <SidebarSection title="Статистика">
            <StatLine label="Слів" value={wordCount.toLocaleString('uk-UA')} />
            <StatLine label="Символів" value={charCount.toLocaleString('uk-UA')} />
            <StatLine label="Час читання" value="~2 хв" />
            <StatLine label="Сесія" value="34 хв" />
          </SidebarSection>

          <SidebarSection title="Розділ">
            <FieldRow label="Видимість">
              <select className="twk-field" style={{ background: 'var(--bg-1)', borderColor: 'var(--line)',
                                                       color: 'var(--fg-1)' }}>
                <option>Чернетка</option>
                <option>Тільки за посиланням</option>
                <option>Опубліковано</option>
              </select>
            </FieldRow>
            <FieldRow label="Заплановано на">
              <input type="text" defaultValue="не заплановано"
                      className="twk-field" style={{ background: 'var(--bg-1)', borderColor: 'var(--line)',
                                                       color: 'var(--fg-1)' }} />
            </FieldRow>
          </SidebarSection>

          <SidebarSection title="Примітки автора">
            <textarea defaultValue="Цей розділ — серцевина першої частини. Перечитати на тиждень."
                      style={{ width: '100%', minHeight: 80, padding: 10,
                                background: 'var(--bg-1)', border: '1px solid var(--line-soft)',
                                borderRadius: 'var(--r-md)', color: 'var(--fg-1)',
                                fontSize: 12, lineHeight: 1.5, resize: 'vertical', outline: 'none' }} />
          </SidebarSection>

          <SidebarSection title="Активність">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 12 }}>
              <div style={{ color: 'var(--fg-2)' }}>
                <span style={{ color: 'var(--accent)' }}>+412</span> слів сьогодні
              </div>
              <div style={{ display: 'flex', gap: 3, alignItems: 'flex-end', height: 32 }}>
                {[18, 24, 12, 30, 22, 28, 34, 14, 26, 32, 30, 22, 28, 24].map((v, i) => (
                  <div key={i} style={{ flex: 1, height: v + '%', background: i === 13 ? 'var(--accent)' : 'var(--bg-3)',
                                          borderRadius: 1 }} />
                ))}
              </div>
              <div style={{ color: 'var(--fg-3)', fontSize: 11 }}>14 днів поспіль 🔥</div>
            </div>
          </SidebarSection>
        </aside>
      </div>
    </div>
  );
}

function SidebarSection({ title, children }) {
  return (
    <section style={{ marginBottom: 24 }}>
      <h4 style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.08em',
                    textTransform: 'uppercase', color: 'var(--fg-3)', marginBottom: 10 }}>{title}</h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>{children}</div>
    </section>
  );
}
function StatLine({ label, value }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
      <span style={{ color: 'var(--fg-3)' }}>{label}</span>
      <span style={{ color: 'var(--fg-0)', fontVariantNumeric: 'tabular-nums', fontWeight: 500 }}>{value}</span>
    </div>
  );
}
function FieldRow({ label, children }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 12 }}>
      <span style={{ color: 'var(--fg-3)' }}>{label}</span>
      {children}
    </label>
  );
}

window.WriterScreen = WriterScreen;
