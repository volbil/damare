// Screen H3 — Hikka-style watch list / library
const _useState_hkw = React.useState;

function HkWatchlistScreen() {
  const [tab, setTab] = _useState_hkw('reading');
  const [view, setView] = _useState_hkw('table');

  const buckets = {
    reading:   { label: 'Читаю',          count: 12, kind: 'reading' },
    planning:  { label: 'У планах',       count: 47, kind: 'planning' },
    completed: { label: 'Завершено',      count: 89, kind: 'completed' },
    onhold:    { label: 'Відкладено',     count: 6,  kind: 'onhold' },
    dropped:   { label: 'Кинуто',          count: 3,  kind: 'dropped' },
    favorites: { label: 'Улюблене',        count: 24, kind: null },
  };

  // Generate list rows from NOVELS
  const rows = NOVELS.slice(0, 8).map((n, i) => ({
    id: n.id,
    novel: n,
    progress: [3, 12, 7, 28, 1, 19, 5, 8][i] || 0,
    score: [9, 10, 8, 7, 9, 8, 10, 7][i],
    note: ['', 'Один з найкращих за рік', '', 'Читаю повільно', '', '', 'Reread #2', ''][i],
    updated: ['12 хв тому', 'вчора', '3 дні тому', 'тиждень', '12 хв тому', '2 тижні', 'місяць', '4 дні'][i],
    started: ['11 гру 2025', '04 лис', '02 січ', '15 жов', '10 лют', '01 вер', '05 чер 2024', '20 лис'][i],
  }));

  return (
    <div style={{ flex: 1, overflow: 'auto', background: 'var(--hk-bg-0)' }}>
      {/* User card header */}
      <div style={{ padding: '24px 32px', borderBottom: '1px solid var(--hk-line)',
                      display: 'flex', alignItems: 'center', gap: 18 }}>
        <div className="hk-av" style={{ width: 64, height: 64, fontSize: 22 }}>МК</div>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em' }}>Мирослав Куліш</h1>
          <div style={{ display: 'flex', gap: 14, marginTop: 6, fontSize: 12.5, color: 'var(--hk-fg-3)' }}>
            <span><span className="num" style={{ color: 'var(--hk-fg-1)', fontWeight: 600 }}>181</span> творів у списку</span>
            <span><span className="num" style={{ color: 'var(--hk-fg-1)', fontWeight: 600 }}>2.4M</span> прочитаних слів</span>
            <span>середня оцінка: <span className="num" style={{ color: scoreColor(8.2), fontWeight: 600 }}>8.2</span></span>
            <span>стрік: <span className="num" style={{ color: 'var(--hk-fg-1)', fontWeight: 600 }}>34 дні</span> 🔥</span>
          </div>
        </div>
        <button className="hk-btn outline sm">
          <Icon name="share" size={12} /> Поділитися списком
        </button>
        <button className="hk-btn outline sm">
          <Icon name="download" size={12} /> Експорт
        </button>
      </div>

      {/* Status tabs */}
      <div style={{ padding: '0 32px', display: 'flex', alignItems: 'center', gap: 4,
                      borderBottom: '1px solid var(--hk-line)' }}>
        {Object.entries(buckets).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)}
                  style={{ display: 'flex', alignItems: 'center', gap: 8,
                            padding: '14px 16px', borderBottom: '2px solid ' + (tab === k ? 'var(--hk-fg-0)' : 'transparent'),
                            marginBottom: -1, fontSize: 13,
                            color: tab === k ? 'var(--hk-fg-0)' : 'var(--hk-fg-2)',
                            fontWeight: tab === k ? 500 : 400 }}>
            {v.kind && <span className="hk-dot" style={{
              background: v.kind === 'reading' ? 'var(--hk-st-reading)' :
                            v.kind === 'planning' ? 'var(--hk-st-planning)' :
                            v.kind === 'completed' ? 'var(--hk-st-completed)' :
                            v.kind === 'onhold' ? 'var(--hk-st-onhold)' :
                            'var(--hk-st-dropped)' }} />}
            {!v.kind && <Icon name="heart" size={12} />}
            {v.label}
            <span className="num" style={{ fontSize: 11, color: 'var(--hk-fg-4)' }}>{v.count}</span>
          </button>
        ))}
        <div style={{ flex: 1 }} />
        <button className="hk-btn ghost sm" style={{ marginRight: 4 }}>
          <Icon name="filter" size={12} /> Фільтри
        </button>
        <div style={{ display: 'flex', background: 'var(--hk-bg-1)', border: '1px solid var(--hk-line)',
                        borderRadius: 'var(--hk-r-sm)', padding: 2 }}>
          {[['table', 'list'], ['grid', 'grid']].map(([id, ic]) => (
            <button key={id} onClick={() => setView(id)}
                    style={{ width: 24, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center',
                              borderRadius: 3, background: view === id ? 'var(--hk-bg-3)' : 'transparent',
                              color: view === id ? 'var(--hk-fg-0)' : 'var(--hk-fg-3)' }}>
              <Icon name={ic} size={12} />
            </button>
          ))}
        </div>
      </div>

      {/* Stats strip */}
      <div style={{ padding: '14px 32px', display: 'flex', gap: 0,
                      borderBottom: '1px solid var(--hk-line)' }}>
        {[
          { l: 'Активних', v: '12' },
          { l: 'Цього місяця', v: '5' },
          { l: 'Прочитано слів', v: '184k' },
          { l: 'Розділів', v: '127' },
          { l: 'Найдовше читаю', v: '8 міс.' },
        ].map((s, i) => (
          <div key={s.l} style={{ flex: 1, paddingLeft: i === 0 ? 0 : 18,
                                     borderLeft: i === 0 ? 0 : '1px solid var(--hk-line)' }}>
            <div className="num" style={{ fontSize: 18, fontWeight: 600, letterSpacing: '-0.02em',
                                              color: 'var(--hk-fg-0)' }}>{s.v}</div>
            <div style={{ fontSize: 10.5, color: 'var(--hk-fg-3)', textTransform: 'uppercase',
                            letterSpacing: '0.06em', marginTop: 2 }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      {view === 'table' && (
        <div style={{ padding: '0 32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '36px 1fr 130px 90px 110px 1fr 100px 30px',
                          padding: '10px 0', gap: 16,
                          borderBottom: '1px solid var(--hk-line)',
                          fontSize: 10.5, fontWeight: 600, letterSpacing: '0.08em',
                          color: 'var(--hk-fg-3)', textTransform: 'uppercase' }}>
            <span></span><span>Назва</span><span>Прогрес</span><span>Оцінка</span>
            <span>Розпочато</span><span>Нотатки</span><span>Оновлено</span><span></span>
          </div>
          {rows.map(r => (
            <div key={r.id} style={{ display: 'grid',
                                        gridTemplateColumns: '36px 1fr 130px 90px 110px 1fr 100px 30px',
                                        padding: '12px 0', gap: 16, alignItems: 'center',
                                        borderBottom: '1px solid var(--hk-line)',
                                        fontSize: 13, color: 'var(--hk-fg-1)' }}>
              <div className="hk-cover" style={{ width: 28, height: 42 }}>
                <GeneratedCover title={r.novel.title} author={r.novel.author} seed={r.novel.id} showText={false} />
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ color: 'var(--hk-fg-0)', fontWeight: 500,
                                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {r.novel.title}
                </div>
                <div style={{ fontSize: 11, color: 'var(--hk-fg-3)', marginTop: 2 }}>
                  {r.novel.author}
                </div>
              </div>
              <div>
                <div className="num" style={{ fontSize: 12, fontFamily: 'var(--hk-font-mono)', marginBottom: 4 }}>
                  {r.progress} / {r.novel.chapters_total}
                </div>
                <div style={{ height: 3, background: 'var(--hk-bg-3)', borderRadius: 999, overflow: 'hidden' }}>
                  <div style={{ width: `${r.progress / r.novel.chapters_total * 100}%`,
                                  height: '100%', background: 'var(--hk-fg-1)' }} />
                </div>
              </div>
              <span className="num" style={{ color: scoreColor(r.score), fontWeight: 600,
                                                   fontFamily: 'var(--hk-font-mono)' }}>
                {r.score}
              </span>
              <span style={{ fontSize: 12, color: 'var(--hk-fg-3)' }}>{r.started}</span>
              <span style={{ fontSize: 12.5, color: r.note ? 'var(--hk-fg-1)' : 'var(--hk-fg-4)',
                              fontStyle: r.note ? 'normal' : 'italic',
                              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {r.note || '— нотаток нема —'}
              </span>
              <span className="num" style={{ fontSize: 11, color: 'var(--hk-fg-3)' }}>{r.updated}</span>
              <button style={{ color: 'var(--hk-fg-3)' }}><Icon name="more" size={13} /></button>
            </div>
          ))}
        </div>
      )}

      {view === 'grid' && (
        <div style={{ padding: 32, display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 14 }}>
          {[...rows, ...rows].slice(0, 16).map((r, i) => (
            <div key={i}>
              <HkCover novel={r.novel} />
              <div style={{ marginTop: 6, fontSize: 11.5, color: 'var(--hk-fg-1)',
                              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {r.novel.title}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between',
                              fontSize: 10.5, color: 'var(--hk-fg-3)', marginTop: 2 }}>
                <span className="num">{r.progress}/{r.novel.chapters_total}</span>
                <span className="num" style={{ color: scoreColor(r.score) }}>{r.score}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

window.HkWatchlistScreen = HkWatchlistScreen;
