// Screen 5 — Search & browse with filters
function SearchScreen({ density, withCovers, onOpenNovel }) {
  const [q, setQ] = useState('зимові');
  const [active, setActive] = useState({ rating: 'T', status: 'all', sort: 'kudos' });
  const [tags, setTags] = useState(['містика', 'повільне горіння']);

  const results = NOVELS.slice(0, 5);

  return (
    <div style={{ flex: 1, overflow: 'auto', background: 'var(--bg-0)' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '24px 32px 80px',
                      display: 'grid', gridTemplateColumns: '260px 1fr', gap: 32 }}>
        {/* Filters */}
        <aside style={{ position: 'sticky', top: 80, alignSelf: 'flex-start',
                          maxHeight: 'calc(100vh - 100px)', overflow: 'auto' }}>
          <FilterSection title="Рейтинг">
            <Segmented options={['Усі', 'G', 'T', 'M']}
                        value={active.rating === 'all' ? 'Усі' : active.rating}
                        onChange={(v) => setActive({ ...active, rating: v === 'Усі' ? 'all' : v })} />
          </FilterSection>

          <FilterSection title="Статус">
            <Segmented options={['Усі', 'У процесі', 'Завершено']}
                        value={active.status === 'all' ? 'Усі' : active.status === 'inprog' ? 'У процесі' : 'Завершено'}
                        onChange={(v) => setActive({ ...active, status: v === 'Усі' ? 'all' : v === 'У процесі' ? 'inprog' : 'done' })} />
          </FilterSection>

          <FilterSection title="Кількість слів">
            <RangeRow lo="< 5k" hi="> 100k" />
            <input type="range" defaultValue={50} style={{ width: '100%', accentColor: 'var(--accent)' }} />
          </FilterSection>

          <FilterSection title="Теги — увімкнено">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
              {tags.map(t => (
                <button key={t} className="tag fandom"
                        onClick={() => setTags(tags.filter(x => x !== t))}
                        style={{ cursor: 'pointer' }}>
                  {t} <Icon name="x" size={10} />
                </button>
              ))}
            </div>
          </FilterSection>

          <FilterSection title="Теги — вимкнено">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
              {['насильство', 'смерть персонажа'].map(t => (
                <button key={t} className="tag warn" style={{ cursor: 'pointer' }}>
                  {t} <Icon name="x" size={10} />
                </button>
              ))}
              <button style={{ fontSize: 11, color: 'var(--fg-3)', padding: '3px 6px' }}>
                + додати
              </button>
            </div>
          </FilterSection>

          <FilterSection title="Мова">
            <Segmented options={['Укр', 'Усі']} value="Укр" />
          </FilterSection>

          <FilterSection title="Популярні теги">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
              {TAGS.slice(0, 9).map(t => (
                <button key={t.name} onClick={() => !tags.includes(t.name) && setTags([...tags, t.name])}
                        className="tag" style={{ cursor: 'pointer' }}>
                  {t.name}
                  <span style={{ color: 'var(--fg-3)', marginLeft: 3 }}>{(t.count/1000).toFixed(1)}k</span>
                </button>
              ))}
            </div>
          </FilterSection>
        </aside>

        {/* Results */}
        <div>
          {/* Search bar */}
          <div style={{ position: 'relative', marginBottom: 16 }}>
            <div style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
                            color: 'var(--fg-3)' }}>
              <Icon name="search" size={16} />
            </div>
            <input value={q} onChange={(e) => setQ(e.target.value)}
                    style={{ width: '100%', height: 44, padding: '0 14px 0 40px',
                              background: 'var(--bg-1)', border: '1px solid var(--line)',
                              borderRadius: 'var(--r-md)', color: 'var(--fg-0)', fontSize: 14, outline: 'none' }} />
          </div>

          {/* Result header */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 14, gap: 12 }}>
            <div style={{ fontSize: 13, color: 'var(--fg-2)' }}>
              <span style={{ color: 'var(--fg-0)', fontWeight: 600 }}>1 284</span> результатів
            </div>
            <div style={{ flex: 1 }} />
            <Segmented options={['Kudos', 'Дата', 'Слова', 'Хіти']} value="Kudos" small />
          </div>

          {/* Results list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {results.map(n => <NovelCardList key={n.id} novel={n} density={density}
                                                onClick={() => onOpenNovel(n)} showCover={withCovers} />)}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 24 }}>
            <button className="btn">Більше результатів ↓</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterSection({ title, children }) {
  return (
    <section style={{ marginBottom: 22 }}>
      <h4 style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.08em',
                    textTransform: 'uppercase', color: 'var(--fg-3)', marginBottom: 8 }}>{title}</h4>
      <div>{children}</div>
    </section>
  );
}
function Segmented({ options, value, onChange, small }) {
  return (
    <div style={{ display: 'flex', background: 'var(--bg-1)', borderRadius: 'var(--r-md)',
                    padding: 2, border: '1px solid var(--line-soft)', width: 'fit-content' }}>
      {options.map(o => (
        <button key={o} onClick={() => onChange && onChange(o)}
                style={{ height: small ? 24 : 28, padding: '0 10px', fontSize: small ? 11 : 12,
                          borderRadius: 6, color: value === o ? 'var(--fg-0)' : 'var(--fg-3)',
                          background: value === o ? 'var(--bg-3)' : 'transparent',
                          fontWeight: value === o ? 500 : 400 }}>
          {o}
        </button>
      ))}
    </div>
  );
}
function RangeRow({ lo, hi }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--fg-3)', marginBottom: 4 }}>
      <span>{lo}</span><span>{hi}</span>
    </div>
  );
}

window.SearchScreen = SearchScreen;
