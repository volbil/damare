// Screen H4 — Hikka-style community / activity feed
function HkCommunityScreen() {
  const activity = [
    { kind: 'review', user: 'архіваріус', avatar: 'АР', time: '12 хв',
      novel: NOVELS[0],
      score: 9,
      title: 'Епістолярна форма використана геніально',
      body: 'Кожен лист — окремий жанр: то інтимний щоденниковий запис, то майже діловий протокол. І все це від однієї людини. Я ще не зустрічав, щоб така структура працювала так природно. Калина Левчук просто майстерно тасує тон, не втрачаючи героїню.',
      kudos: 47, comments: 12 },
    { kind: 'list', user: 'оля_читає', avatar: 'ОЧ', time: '34 хв',
      action: 'оновила список Читаю',
      changes: [
        { type: 'started', novel: NOVELS[1] },
        { type: 'completed', novel: NOVELS[5], score: 10 },
      ],
      kudos: 8, comments: 2 },
    { kind: 'collection', user: 'Damare', avatar: 'DM', official: true, time: '2 год',
      action: 'опублікувала колекцію',
      collection: { name: 'Зима 2026: 12 затишних історій', count: 12, novels: NOVELS.slice(0, 5) },
      kudos: 312, comments: 47 },
    { kind: 'comment', user: 'тарасбук', avatar: 'ТБ', time: '4 год',
      novel: NOVELS[2],
      body: 'Хто ще читав у трамваї і пропустив свою зупинку через цю главу? Підпишіть, будь ласка, що це нормально 😅',
      kudos: 21, comments: 8 },
    { kind: 'follow', user: 'мокроволос', avatar: 'МВ', time: '6 год',
      action: 'почав стежити за',
      target: 'Калина Левчук', targetKind: 'author' },
  ];

  return (
    <div style={{ flex: 1, overflow: 'auto', background: 'var(--hk-bg-0)' }}>
      <div style={{ padding: '20px 32px', borderBottom: '1px solid var(--hk-line)',
                      display: 'flex', alignItems: 'center', gap: 14 }}>
        <h1 style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em' }}>Спільнота</h1>
        <div className="hk-tabs" style={{ borderBottom: 0 }}>
          <div className="hk-tab active">Стрічка</div>
          <div className="hk-tab">Усі</div>
          <div className="hk-tab">Друзі</div>
          <div className="hk-tab">Огляди</div>
          <div className="hk-tab">Колекції</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 32, padding: '24px 32px' }}>
        {/* Feed */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Composer */}
          <div className="hk-card" style={{ padding: 14, display: 'flex', gap: 12 }}>
            <div className="hk-av" style={{ width: 32, height: 32, flexShrink: 0 }}>МК</div>
            <input className="hk-input" placeholder="Поділіться думкою або порекомендуйте твір…"
                    style={{ flex: 1, height: 36 }} />
            <button className="hk-btn primary sm">Опублікувати</button>
          </div>

          {activity.map((a, i) => <FeedItem key={i} item={a} />)}
        </div>

        {/* Right rail */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div className="hk-card" style={{ padding: 16 }}>
            <h4 style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: '0.08em',
                           color: 'var(--hk-fg-3)', marginBottom: 12 }}>ПОПУЛЯРНІ ТЕГИ</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
              {[
                ['зима', 1240], ['магреалізм', 890], ['повільно-горить', 712],
                ['щоденник', 540], ['провінція', 480], ['листи', 412],
                ['самотність', 380], ['передвоєнне', 290], ['жіноча проза', 240],
              ].map(([t, c]) => (
                <span key={t} className="hk-badge outline" style={{ cursor: 'pointer' }}>
                  #{t} <span style={{ color: 'var(--hk-fg-4)' }}>{c}</span>
                </span>
              ))}
            </div>
          </div>

          <div className="hk-card" style={{ padding: 16 }}>
            <h4 style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: '0.08em',
                           color: 'var(--hk-fg-3)', marginBottom: 12 }}>АКТИВНІ ЧИТАЧІ</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { user: 'архіваріус', avatar: 'АР', stat: '47 оглядів цього тижня' },
                { user: 'оля_читає', avatar: 'ОЧ', stat: '184k слів цього місяця' },
                { user: 'тарасбук', avatar: 'ТБ', stat: '12 нових в обраному' },
                { user: 'мокроволос', avatar: 'МВ', stat: '8 завершено' },
              ].map(u => (
                <div key={u.user} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div className="hk-av" style={{ width: 28, height: 28 }}>{u.avatar}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12.5, color: 'var(--hk-fg-0)', fontWeight: 500 }}>{u.user}</div>
                    <div style={{ fontSize: 10.5, color: 'var(--hk-fg-3)' }}>{u.stat}</div>
                  </div>
                  <button className="hk-btn ghost icon sm"><Icon name="plus" size={11} /></button>
                </div>
              ))}
            </div>
          </div>

          <div className="hk-card" style={{ padding: 16 }}>
            <h4 style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: '0.08em',
                           color: 'var(--hk-fg-3)', marginBottom: 12 }}>ОГОЛОШЕННЯ</h4>
            <div style={{ fontSize: 12.5, lineHeight: 1.5, color: 'var(--hk-fg-1)' }}>
              <strong style={{ color: 'var(--hk-fg-0)' }}>Зимовий конкурс</strong> — приймаємо
              новели до 24 лют. Переможців обирає редакція + читачі.
              <a style={{ display: 'block', marginTop: 8, color: 'var(--hk-accent)' }}>Деталі →</a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function FeedItem({ item }) {
  return (
    <article className="hk-card" style={{ padding: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
        <div className="hk-av" style={{ width: 32, height: 32 }}>{item.avatar}</div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 13, color: 'var(--hk-fg-0)', fontWeight: 500 }}>{item.user}</span>
            {item.official && <span className="hk-badge accent" style={{ fontSize: 9.5 }}>офіційне</span>}
            <span style={{ fontSize: 11.5, color: 'var(--hk-fg-3)' }}>
              {item.kind === 'review' && 'опублікував огляд'}
              {item.kind === 'list' && item.action}
              {item.kind === 'collection' && item.action}
              {item.kind === 'comment' && 'прокоментував'}
              {item.kind === 'follow' && item.action}
            </span>
            {item.kind === 'review' && item.novel && (
              <a style={{ fontSize: 11.5, color: 'var(--hk-fg-0)' }}>{item.novel.title}</a>
            )}
            {item.kind === 'comment' && item.novel && (
              <a style={{ fontSize: 11.5, color: 'var(--hk-fg-0)' }}>{item.novel.title}</a>
            )}
            {item.kind === 'follow' && (
              <a style={{ fontSize: 11.5, color: 'var(--hk-fg-0)' }}>{item.target}</a>
            )}
          </div>
        </div>
        <span className="num" style={{ fontSize: 11, color: 'var(--hk-fg-3)' }}>{item.time}</span>
        <button className="hk-btn ghost icon sm"><Icon name="more" size={12} /></button>
      </div>

      {item.kind === 'review' && (
        <>
          <div style={{ display: 'flex', gap: 14, marginBottom: 10 }}>
            <div className="hk-cover" style={{ width: 64, height: 96, flexShrink: 0 }}>
              <GeneratedCover title={item.novel.title} author={item.novel.author} seed={item.novel.id} showText={false} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <HkScore value={item.score} />
                <span style={{ fontSize: 11, color: 'var(--hk-fg-3)' }}>оцінка автора огляду</span>
              </div>
              <h4 style={{ fontSize: 14.5, fontWeight: 600, marginBottom: 6, lineHeight: 1.3 }}>
                {item.title}
              </h4>
              <p style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--hk-fg-1)', margin: 0,
                           textWrap: 'pretty' }}>
                {item.body}
              </p>
            </div>
          </div>
        </>
      )}

      {item.kind === 'list' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {item.changes.map((c, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12,
                                    padding: 10, background: 'var(--hk-bg-0)',
                                    border: '1px solid var(--hk-line)', borderRadius: 'var(--hk-r-md)' }}>
              <div className="hk-cover" style={{ width: 32, height: 48 }}>
                <GeneratedCover title={c.novel.title} author={c.novel.author} seed={c.novel.id} showText={false} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, color: 'var(--hk-fg-0)', fontWeight: 500 }}>{c.novel.title}</div>
                <div style={{ fontSize: 11, color: 'var(--hk-fg-3)', marginTop: 2 }}>{c.novel.author}</div>
              </div>
              {c.type === 'started' && <HkStatus kind="reading" label="Розпочала" />}
              {c.type === 'completed' && (
                <>
                  <HkScore value={c.score} />
                  <HkStatus kind="completed" label="Завершила" />
                </>
              )}
            </div>
          ))}
        </div>
      )}

      {item.kind === 'collection' && (
        <div style={{ padding: 14, background: 'var(--hk-bg-0)',
                        border: '1px solid var(--hk-line)', borderRadius: 'var(--hk-r-md)' }}>
          <div style={{ fontSize: 14.5, fontWeight: 600, marginBottom: 10 }}>{item.collection.name}</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {item.collection.novels.map(n => (
              <div key={n.id} className="hk-cover" style={{ width: 60, height: 90 }}>
                <GeneratedCover title={n.title} author={n.author} seed={n.id} showText={false} />
              </div>
            ))}
            <div style={{ width: 60, height: 90, display: 'flex', alignItems: 'center', justifyContent: 'center',
                            background: 'var(--hk-bg-2)', border: '1px solid var(--hk-line)',
                            borderRadius: 'var(--hk-r-md)', flexDirection: 'column' }}>
              <div className="num" style={{ fontSize: 16, fontWeight: 700, color: 'var(--hk-fg-0)' }}>
                +{item.collection.count - item.collection.novels.length}
              </div>
              <div style={{ fontSize: 9.5, color: 'var(--hk-fg-3)' }}>творів</div>
            </div>
          </div>
        </div>
      )}

      {item.kind === 'comment' && (
        <p style={{ fontSize: 13.5, lineHeight: 1.6, color: 'var(--hk-fg-1)', margin: 0,
                     textWrap: 'pretty' }}>
          {item.body}
        </p>
      )}

      {/* Footer actions */}
      {item.kudos !== undefined && (
        <div style={{ display: 'flex', gap: 16, marginTop: 12, paddingTop: 12,
                        borderTop: '1px solid var(--hk-line)', fontSize: 12, color: 'var(--hk-fg-3)' }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: 5, color: 'inherit' }}>
            <Icon name="heart" size={13} /> <span className="num">{item.kudos}</span>
          </button>
          <button style={{ display: 'flex', alignItems: 'center', gap: 5, color: 'inherit' }}>
            <Icon name="message" size={13} /> <span className="num">{item.comments}</span>
          </button>
          <button style={{ display: 'flex', alignItems: 'center', gap: 5, color: 'inherit' }}>
            <Icon name="bookmark" size={13} />
          </button>
          <div style={{ flex: 1 }} />
          <button style={{ display: 'flex', alignItems: 'center', gap: 5, color: 'inherit' }}>
            <Icon name="share" size={13} />
          </button>
        </div>
      )}
    </article>
  );
}

window.HkCommunityScreen = HkCommunityScreen;
