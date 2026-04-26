// Screen 6 — Profile / library
function ProfileScreen({ density, withCovers, onOpenNovel }) {
  const [tab, setTab] = useState('works');
  const own = NOVELS.slice(0, 3);
  const reading = NOVELS.slice(0, 4);
  const finished = [NOVELS[1], NOVELS[4], NOVELS[6]];

  return (
    <div style={{ flex: 1, overflow: 'auto', background: 'var(--bg-0)' }}>
      {/* Banner */}
      <div style={{ height: 140, background:
          'linear-gradient(120deg, oklch(0.28 0.04 80) 0%, oklch(0.22 0.02 60) 50%, oklch(0.20 0.03 40) 100%)',
          borderBottom: '1px solid var(--line-soft)' }} />

      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '0 32px 80px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 20, marginTop: -52, marginBottom: 28 }}>
          <div className="avatar" style={{ width: 104, height: 104, fontSize: 36,
                  border: '4px solid var(--bg-0)', background: 'var(--accent)', color: 'var(--accent-fg)' }}>
            КЛ
          </div>
          <div style={{ flex: 1, paddingBottom: 8 }}>
            <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 2 }}>Калина Левчук</h1>
            <div style={{ fontSize: 13, color: 'var(--fg-3)' }}>@kalyna_l · Київ · з березня 2024</div>
          </div>
          <div style={{ display: 'flex', gap: 8, paddingBottom: 8 }}>
            <button className="btn"><Icon name="mail" size={14} /> Повідомлення</button>
            <button className="btn primary"><Icon name="plus" size={13} /> Стежити</button>
          </div>
        </div>

        {/* Bio */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 32, marginBottom: 28 }}>
          <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--fg-1)', maxWidth: 600, margin: 0 }}>
            Пишу про маленькі міста, листи, які не дійшли, і людей, що повертаються.
            Магічний реалізм, повільне горіння, зимові настрої. Інколи борщ.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1,
                          background: 'var(--line-soft)', border: '1px solid var(--line-soft)',
                          borderRadius: 'var(--r-md)', overflow: 'hidden' }}>
            {[
              ['12', 'творів'],
              ['4.2k', 'читачів'],
              ['38k', 'kudos'],
            ].map(([v, l]) => (
              <div key={l} style={{ background: 'var(--bg-1)', padding: '12px 10px', textAlign: 'center' }}>
                <div style={{ fontSize: 17, fontWeight: 600, color: 'var(--fg-0)',
                                fontVariantNumeric: 'tabular-nums' }}>{v}</div>
                <div style={{ fontSize: 10.5, color: 'var(--fg-3)', textTransform: 'uppercase',
                                letterSpacing: '0.06em', marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--line-soft)', marginBottom: 24 }}>
          {[
            ['works', 'Твори', own.length],
            ['reading', 'Зараз читає', reading.length],
            ['finished', 'Прочитано', finished.length],
            ['lists', 'Колекції', 4],
            ['activity', 'Активність', null],
          ].map(([id, label, count]) => (
            <button key={id} onClick={() => setTab(id)}
                    style={{ padding: '12px 16px', fontSize: 13,
                              color: tab === id ? 'var(--fg-0)' : 'var(--fg-3)',
                              fontWeight: tab === id ? 500 : 400,
                              borderBottom: tab === id ? '2px solid var(--accent)' : '2px solid transparent',
                              marginBottom: -1, display: 'flex', alignItems: 'center', gap: 6 }}>
              {label}
              {count != null && (
                <span style={{ fontSize: 11, color: 'var(--fg-4)', fontVariantNumeric: 'tabular-nums' }}>
                  {count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tab body */}
        {tab === 'works' && (
          <div style={{ display: 'grid',
                          gridTemplateColumns: withCovers ? 'repeat(4, 1fr)' : '1fr',
                          gap: withCovers ? 18 : 10 }}>
            {own.map(n => <NovelCard key={n.id} novel={n} density={density} withCovers={withCovers}
                                       onClick={() => onOpenNovel(n)} />)}
          </div>
        )}

        {tab === 'reading' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {reading.map(n => (
              <div key={n.id} onClick={() => onOpenNovel(n)}
                    style={{ display: 'flex', gap: 16, padding: 14,
                              background: 'var(--bg-1)', border: '1px solid var(--line-soft)',
                              borderRadius: 'var(--r-lg)', cursor: 'pointer' }}>
                <div className="cover" style={{ width: 56, flexShrink: 0 }}>
                  <GeneratedCover title={n.title} author={n.author} seed={n.id} showText={false} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: 15, marginBottom: 2 }}>{n.title}</div>
                  <div style={{ fontSize: 12, color: 'var(--fg-3)', marginBottom: 8 }}>
                    {n.author} · Розділ {n.chapters} з {n.chapter_count}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ flex: 1, height: 2, background: 'var(--bg-3)', borderRadius: 999 }}>
                      <div style={{ width: (n.progress || 35) + '%', height: '100%',
                                      background: 'var(--accent)', borderRadius: 999 }} />
                    </div>
                    <span style={{ fontSize: 11, color: 'var(--fg-3)', fontVariantNumeric: 'tabular-nums' }}>
                      {n.progress || 35}%
                    </span>
                  </div>
                </div>
                <button className="btn sm">Продовжити</button>
              </div>
            ))}
          </div>
        )}

        {tab === 'finished' && (
          <div style={{ display: 'grid',
                          gridTemplateColumns: withCovers ? 'repeat(4, 1fr)' : '1fr',
                          gap: withCovers ? 18 : 10 }}>
            {finished.map(n => <NovelCard key={n.id} novel={n} density={density} withCovers={withCovers}
                                            onClick={() => onOpenNovel(n)} />)}
          </div>
        )}

        {tab === 'lists' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
            {[
              ['Зимове читання', 12, NOVELS.slice(0, 4)],
              ['Перечитати', 8, NOVELS.slice(2, 6)],
              ['Українське фентезі', 24, NOVELS.slice(4, 8)],
              ['Ще не торкалась', 6, NOVELS.slice(1, 5)],
            ].map(([name, count, list]) => (
              <div key={name} style={{ padding: 16, background: 'var(--bg-1)',
                                        border: '1px solid var(--line-soft)',
                                        borderRadius: 'var(--r-lg)', cursor: 'pointer' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4, marginBottom: 12 }}>
                  {list.map(n => (
                    <div key={n.id} className="cover" style={{ aspectRatio: '2/3' }}>
                      <GeneratedCover title={n.title} author={n.author} seed={n.id} showText={false} />
                    </div>
                  ))}
                </div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: 15, marginBottom: 2 }}>{name}</div>
                <div style={{ fontSize: 11, color: 'var(--fg-3)' }}>{count} творів</div>
              </div>
            ))}
          </div>
        )}

        {tab === 'activity' && <ActivityFeed />}
      </div>
    </div>
  );
}

function ActivityFeed() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0,
                    background: 'var(--bg-1)', border: '1px solid var(--line-soft)',
                    borderRadius: 'var(--r-lg)', overflow: 'hidden' }}>
      {NOTIFICATIONS.map((n, i) => (
        <div key={i} style={{ display: 'flex', gap: 12, padding: '14px 18px',
                                borderBottom: i === NOTIFICATIONS.length - 1 ? 0 : '1px solid var(--line-soft)',
                                background: !n.read ? 'rgba(232,197,71,0.04)' : 'transparent' }}>
          <div style={{ width: 28, height: 28, flexShrink: 0, borderRadius: 999,
                          background: 'var(--bg-2)', display: 'flex', alignItems: 'center',
                          justifyContent: 'center', color: n.type === 'kudos' ? 'var(--love)' :
                                                          n.type === 'comment' ? 'var(--info)' :
                                                          n.type === 'follow' ? 'var(--accent)' :
                                                          n.type === 'update' ? 'var(--fg-1)' : 'var(--fg-2)' }}>
            <Icon name={n.type === 'kudos' ? 'heart-fill' :
                         n.type === 'comment' ? 'message' :
                         n.type === 'follow' ? 'plus' :
                         n.type === 'update' ? 'rss' : 'bookmark'} size={13} />
          </div>
          <div style={{ flex: 1, fontSize: 13, color: 'var(--fg-1)' }}>
            <span style={{ color: 'var(--fg-0)', fontWeight: 500 }}>{n.user}</span>
            {' '}{n.text}{n.target && ' '}
            {n.target && <span style={{ color: 'var(--accent)' }}>«{n.target}»</span>}
            <div style={{ fontSize: 11, color: 'var(--fg-3)', marginTop: 2 }}>{n.time}</div>
          </div>
          {!n.read && <span style={{ width: 6, height: 6, borderRadius: 999,
                                       background: 'var(--accent)', alignSelf: 'center' }} />}
        </div>
      ))}
    </div>
  );
}

window.ProfileScreen = ProfileScreen;
window.ActivityFeed = ActivityFeed;
