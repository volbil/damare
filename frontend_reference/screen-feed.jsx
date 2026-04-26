// Screen 11 — Author updates feed (microposts, like a writers-only timeline)
function FeedScreen() {
  const posts = [
    {
      user: 'Калина Левчук', handle: 'kalyna_l', avatar: 'КЛ', time: '2 год тому',
      type: 'note',
      text: 'Дописала четвертий розділ. Він на 600 слів довший за заплановане, і я не шкодую. Завтра — редагування. Сподіваюсь, опублікую в неділю 🤍',
      kudos: 142, comments: 23, reposts: 8,
      isFollowing: true,
    },
    {
      user: 'архіваріус', handle: 'arkhivarius', avatar: 'АР', time: '4 год тому',
      type: 'rec', // recommendation
      text: 'Хто ще не читав «Карта втрачених міст» Тараса Вовка — займіться. Перші три розділи здавалися повільними, потім я не міг відірватись. Це найкраща дистопія, написана українською за останні три роки.',
      attached: NOVELS[5],
      kudos: 89, comments: 12, reposts: 24,
    },
    {
      user: 'Тарас Вовк', handle: 'taras_v', avatar: 'ТВ', time: '6 год тому',
      type: 'milestone',
      text: 'Новий розділ «Карти втрачених міст» опубліковано. Це 31-й. Я почав цей роман у березні 2024, і ось ми тут.',
      milestone: { label: 'Новий розділ', target: 'Карта втрачених міст · Розділ 31' },
      kudos: 248, comments: 41, reposts: 32,
    },
    {
      user: 'оля_читає', handle: 'olya_chyt', avatar: 'ОЧ', time: 'вчора',
      type: 'poll',
      text: 'Питання до читачів: ви слухаєте музику під час читання?',
      poll: [
        { label: 'Так, інструментал', pct: 42 },
        { label: 'Так, що завгодно', pct: 14 },
        { label: 'Тільки тишу', pct: 38 },
        { label: 'Залежить', pct: 6 },
      ],
      kudos: 78, comments: 56, reposts: 4,
    },
    {
      user: 'Мирослава Дід', handle: 'myroslava_d', avatar: 'МД', time: 'вчора',
      type: 'quote',
      text: 'Цитата, яка не йде з голови з ранку:',
      quote: '«Ми пишемо не для того, щоб бути зрозумілими, а щоб залишитись.»',
      quoteSource: '— Олена Гуцалюк, есей «Тиша між рядками»',
      kudos: 312, comments: 28, reposts: 47,
    },
  ];

  return (
    <div style={{ flex: 1, overflow: 'auto', background: 'var(--bg-0)' }}>
      <div style={{ maxWidth: 940, margin: '0 auto', padding: '24px 32px 80px',
                      display: 'grid', gridTemplateColumns: '1fr 240px', gap: 32 }}>
        <div>
          {/* Composer */}
          <div style={{ display: 'flex', gap: 12, padding: 16,
                          background: 'var(--bg-1)', border: '1px solid var(--line-soft)',
                          borderRadius: 'var(--r-lg)', marginBottom: 24 }}>
            <div className="avatar" style={{ width: 36, height: 36 }}>МК</div>
            <div style={{ flex: 1 }}>
              <textarea placeholder="Поділіться чимось — нотаткою, цитатою, посиланням на розділ…"
                        style={{ width: '100%', minHeight: 50, padding: 8,
                                  background: 'transparent', border: 0, outline: 'none', resize: 'none',
                                  color: 'var(--fg-1)', fontSize: 14, lineHeight: 1.5 }} />
              <div style={{ display: 'flex', alignItems: 'center', marginTop: 6,
                              paddingTop: 8, borderTop: '1px solid var(--line-soft)' }}>
                <div style={{ display: 'flex', gap: 4 }}>
                  <button className="btn ghost icon sm" title="Прикріпити твір"><Icon name="book" size={14} /></button>
                  <button className="btn ghost icon sm" title="Зображення"><Icon name="image" size={14} /></button>
                  <button className="btn ghost icon sm" title="Цитата"><Icon name="quote" size={14} /></button>
                  <button className="btn ghost icon sm" title="Опитування"><Icon name="list" size={14} /></button>
                </div>
                <span style={{ flex: 1 }} />
                <button className="btn primary sm">Опублікувати</button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
            {[['За підпискою', true], ['Усе', false], ['Цитати', false], ['Тільки мої', false]].map(([l, a]) => (
              <button key={l} style={{ padding: '8px 14px', fontSize: 13, borderRadius: 'var(--r-md)',
                                        color: a ? 'var(--fg-0)' : 'var(--fg-3)',
                                        background: a ? 'var(--bg-2)' : 'transparent',
                                        fontWeight: a ? 500 : 400 }}>
                {l}
              </button>
            ))}
          </div>

          {/* Feed */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {posts.map((p, i) => <FeedPost key={i} post={p} />)}
          </div>
        </div>

        <aside style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <SidePanel title="Хто пише зараз">
            {[
              ['Калина Левчук', 'kalyna_l', 'дописує розд. 4'],
              ['Тарас Вовк', 'taras_v', 'редагує розд. 32'],
              ['Богдана Шум', 'bohdana_sh', '+412 слів сьогодні'],
            ].map(([n, h, status]) => (
              <div key={h} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12 }}>
                <div style={{ position: 'relative' }}>
                  <div className="avatar" style={{ width: 28, height: 28 }}>{n.split(' ').map(w => w[0]).join('')}</div>
                  <span style={{ position: 'absolute', right: -1, bottom: -1, width: 9, height: 9,
                                  borderRadius: 999, background: '#7cb98a',
                                  border: '2px solid var(--bg-0)' }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12.5, color: 'var(--fg-0)', fontWeight: 500 }}>{n}</div>
                  <div style={{ fontSize: 11, color: 'var(--fg-3)' }}>{status}</div>
                </div>
              </div>
            ))}
          </SidePanel>

          <SidePanel title="Рекомендації">
            {NOVELS.slice(2, 5).map(n => (
              <div key={n.id} style={{ display: 'flex', gap: 10 }}>
                <div className="cover" style={{ width: 36, flexShrink: 0 }}>
                  <GeneratedCover title={n.title} author={n.author} seed={n.id} showText={false} />
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: 12.5, lineHeight: 1.25,
                                  color: 'var(--fg-0)' }}>{n.title}</div>
                  <div style={{ fontSize: 10.5, color: 'var(--fg-3)' }}>{n.author}</div>
                </div>
              </div>
            ))}
          </SidePanel>

          <SidePanel title="Популярні теги">
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
              {TAGS.slice(0, 8).map(t => (
                <span key={t.name} className="tag" style={{ fontSize: 11 }}>#{t.name}</span>
              ))}
            </div>
          </SidePanel>
        </aside>
      </div>
    </div>
  );
}

function SidePanel({ title, children }) {
  return (
    <section>
      <h4 style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.08em',
                    textTransform: 'uppercase', color: 'var(--fg-3)', marginBottom: 12 }}>
        {title}
      </h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>{children}</div>
    </section>
  );
}

function FeedPost({ post }) {
  return (
    <article style={{ padding: 18, background: 'var(--bg-1)',
                        border: '1px solid var(--line-soft)', borderRadius: 'var(--r-lg)' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
        <div className="avatar" style={{ width: 36, height: 36 }}>{post.avatar}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13.5, color: 'var(--fg-0)', fontWeight: 500 }}>
            {post.user}
            {post.isFollowing && (
              <span style={{ fontSize: 10, fontWeight: 500, padding: '1px 6px',
                              background: 'var(--bg-2)', color: 'var(--fg-3)',
                              borderRadius: 999, marginLeft: 8, letterSpacing: '0.02em' }}>
                ви стежите
              </span>
            )}
          </div>
          <div style={{ fontSize: 11.5, color: 'var(--fg-3)' }}>@{post.handle} · {post.time}</div>
        </div>
        <button style={{ color: 'var(--fg-3)', padding: 4 }}><Icon name="more" size={14} /></button>
      </div>

      {/* Body */}
      <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--fg-1)', margin: '0 0 12px',
                   textWrap: 'pretty' }}>
        {post.text}
      </p>

      {post.type === 'rec' && post.attached && (
        <div style={{ display: 'flex', gap: 12, padding: 12, marginBottom: 12,
                        background: 'var(--bg-0)', border: '1px solid var(--line-soft)',
                        borderRadius: 'var(--r-md)' }}>
          <div className="cover" style={{ width: 50, flexShrink: 0 }}>
            <GeneratedCover title={post.attached.title} author={post.attached.author}
                            seed={post.attached.id} showText={false} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 14, color: 'var(--fg-0)' }}>
              {post.attached.title}
            </div>
            <div style={{ fontSize: 11.5, color: 'var(--fg-3)', marginBottom: 4 }}>{post.attached.author}</div>
            <div className="stat-row" style={{ fontSize: 10.5, gap: 10 }}>
              <span className="stat"><Icon name="heart" size={10} />{post.attached.kudos.toLocaleString('uk-UA')}</span>
              <span className="stat"><Icon name="eye" size={10} />{(post.attached.hits/1000).toFixed(1)}k</span>
            </div>
          </div>
        </div>
      )}

      {post.type === 'milestone' && post.milestone && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px',
                        background: 'var(--accent-soft)', borderRadius: 'var(--r-md)',
                        marginBottom: 12 }}>
          <Icon name="rss" size={14} style={{ color: 'var(--accent)' }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10, color: 'var(--accent)', letterSpacing: '0.06em',
                            textTransform: 'uppercase', fontWeight: 600 }}>{post.milestone.label}</div>
            <div style={{ fontSize: 13, color: 'var(--fg-0)' }}>{post.milestone.target}</div>
          </div>
          <button className="btn sm">Читати</button>
        </div>
      )}

      {post.type === 'poll' && post.poll && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 12 }}>
          {post.poll.map((opt, i) => (
            <div key={i} style={{ position: 'relative', padding: '10px 12px',
                                    background: 'var(--bg-0)', border: '1px solid var(--line-soft)',
                                    borderRadius: 'var(--r-md)', overflow: 'hidden', cursor: 'pointer' }}>
              <div style={{ position: 'absolute', inset: 0, width: opt.pct + '%',
                              background: 'var(--accent-soft)', borderRadius: 'var(--r-md)' }} />
              <div style={{ position: 'relative', display: 'flex',
                              justifyContent: 'space-between', fontSize: 13 }}>
                <span style={{ color: 'var(--fg-1)' }}>{opt.label}</span>
                <span style={{ color: 'var(--fg-2)', fontVariantNumeric: 'tabular-nums', fontWeight: 500 }}>
                  {opt.pct}%
                </span>
              </div>
            </div>
          ))}
          <div style={{ fontSize: 11, color: 'var(--fg-3)', marginTop: 4 }}>
            1 248 голосів · опитування завершено
          </div>
        </div>
      )}

      {post.type === 'quote' && (
        <blockquote style={{ margin: '0 0 12px', padding: '14px 18px',
                              borderLeft: '3px solid var(--accent)',
                              background: 'var(--bg-0)', borderRadius: '0 var(--r-md) var(--r-md) 0' }}>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: 17, lineHeight: 1.5,
                       color: 'var(--fg-0)', margin: 0 }}>
            {post.quote}
          </p>
          <div style={{ fontSize: 12, color: 'var(--fg-3)', marginTop: 8, fontStyle: 'italic' }}>
            {post.quoteSource}
          </div>
        </blockquote>
      )}

      {/* Actions */}
      <div style={{ display: 'flex', gap: 18, paddingTop: 8,
                      borderTop: '1px solid var(--line-soft)' }}>
        <button style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12,
                          color: 'var(--fg-2)' }}>
          <Icon name="heart" size={14} /> {post.kudos}
        </button>
        <button style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12,
                          color: 'var(--fg-2)' }}>
          <Icon name="message" size={14} /> {post.comments}
        </button>
        <button style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12,
                          color: 'var(--fg-2)' }}>
          <Icon name="rss" size={14} /> {post.reposts}
        </button>
        <button style={{ marginLeft: 'auto', color: 'var(--fg-3)', padding: 4 }}>
          <Icon name="bookmark" size={14} />
        </button>
      </div>
    </article>
  );
}

window.FeedScreen = FeedScreen;
