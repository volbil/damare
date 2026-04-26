// Screen 2 — Novel detail page (chapters, summary, tags, ratings)
function NovelDetailScreen({ novel, onOpenReader }) {
  const n = novel || NOVELS[0];
  const chapters = Array.from({ length: n.chapter_count }, (_, i) => ({
    no: i + 1,
    title: [
      'Поверненння', 'Поштова скринька', 'Лист, який ніхто не писав', 'Тітка Ніна',
      'Сон у понеділок', 'Сніг на чорнилі', 'Друге повернення', 'Та, що обіцяла',
      'Лист третій', 'Вокзал у грудні', 'Малий Андрій', 'Ще один сніг',
      'Розмова з матір\'ю', 'Лист, який не дійшов', 'Сім ночей', 'Сімдесят сім',
      'Лист останній', 'Та, що залишилась',
    ][i] || `Розділ ${i + 1}`,
    words: 1800 + ((i * 137) % 1400),
    date: ['2 дні тому', '5 днів тому', 'тиждень тому', '2 тижні тому', 'місяць тому'][i % 5],
    read: i < n.chapters - 1,
    current: i === n.chapters - 1,
  }));

  return (
    <div style={{ flex: 1, overflow: 'auto', background: 'var(--bg-0)' }}>
      {/* Hero */}
      <div style={{ position: 'relative', borderBottom: '1px solid var(--line-soft)' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.3 }}>
          <GeneratedCover title={n.title} author={n.author} seed={n.id} showText={false} />
          <div style={{ position: 'absolute', inset: 0,
                         background: 'linear-gradient(180deg, transparent 0%, var(--bg-0) 90%)' }} />
        </div>
        <div style={{ position: 'relative', maxWidth: 960, margin: '0 auto', padding: '40px 32px 32px',
                       display: 'flex', gap: 28 }}>
          <div className="cover" style={{ width: 200, flexShrink: 0, boxShadow: 'var(--shadow-lg)' }}>
            <GeneratedCover title={n.title} author={n.author} seed={n.id} />
          </div>
          <div style={{ flex: 1, paddingTop: 12 }}>
            <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
              <span className="tag rating">{n.rating === 'G' ? 'Загальна' : n.rating === 'T' ? 'Підлітковий' : 'Дорослий'}</span>
              <span className="tag" style={{ background: 'transparent', borderColor: 'var(--line)' }}>{n.status}</span>
              <span className="tag" style={{ background: 'transparent', borderColor: 'var(--line)' }}>Українська</span>
            </div>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 40, fontWeight: 500,
                          lineHeight: 1.05, marginBottom: 8, letterSpacing: '-0.02em' }}>
              {n.title}
            </h1>
            <div style={{ fontSize: 14, color: 'var(--fg-2)', marginBottom: 16 }}>
              від <span style={{ color: 'var(--accent)', textDecoration: 'underline', textUnderlineOffset: 3 }}>{n.author}</span>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--fg-1)', maxWidth: 560,
                         marginBottom: 20 }}>
              {n.summary}
            </p>
            <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
              <button className="btn primary" onClick={onOpenReader}>
                <Icon name="book" size={14} /> Почати читати
              </button>
              <button className="btn"><Icon name="bookmark" size={14} /> Зберегти</button>
              <button className="btn"><Icon name="heart" size={14} /> 1284</button>
              <button className="btn icon"><Icon name="more" size={15} /></button>
            </div>
            <div className="stat-row" style={{ fontSize: 12, color: 'var(--fg-2)' }}>
              <span className="stat"><Icon name="eye" size={12} />{n.hits.toLocaleString('uk-UA')} переглядів</span>
              <span className="stat"><Icon name="heart" size={12} />{n.kudos.toLocaleString('uk-UA')} kudos</span>
              <span className="stat"><Icon name="bookmark" size={12} />{n.bookmarks} закладок</span>
              <span className="stat"><Icon name="message" size={12} />{n.comments} коментарів</span>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '32px 32px 80px',
                     display: 'grid', gridTemplateColumns: '1fr 260px', gap: 40 }}>
        <div>
          {/* Tags / warnings */}
          <section style={{ marginBottom: 28 }}>
            <h3 style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em',
                          textTransform: 'uppercase', color: 'var(--fg-3)', marginBottom: 10 }}>Теги</h3>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {n.warnings.map(w => <span key={w} className="tag warn">⚠ {w}</span>)}
              {n.tags.map(t => <span key={t} className="tag">{t}</span>)}
              <span className="tag" style={{ background: 'transparent', borderColor: 'var(--line)' }}>+ ще 4</span>
            </div>
          </section>

          {/* Chapters */}
          <section>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 14 }}>
              <h3 style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em',
                            textTransform: 'uppercase', color: 'var(--fg-3)' }}>
                Розділи · {n.chapter_count}
              </h3>
              <button style={{ fontSize: 12, color: 'var(--fg-3)' }}>
                <Icon name="sort" size={11} /> Найновіші
              </button>
            </div>
            <ol style={{ margin: 0, padding: 0, listStyle: 'none',
                          border: '1px solid var(--line-soft)', borderRadius: 'var(--r-lg)',
                          overflow: 'hidden', background: 'var(--bg-1)' }}>
              {chapters.slice(0, 8).map(ch => (
                <li key={ch.no} onClick={ch.current ? onOpenReader : undefined}
                    style={{ display: 'flex', alignItems: 'center', gap: 14,
                              padding: '12px 16px',
                              borderBottom: '1px solid var(--line-soft)',
                              cursor: ch.current ? 'pointer' : 'default',
                              background: ch.current ? 'var(--accent-soft)' : 'transparent' }}>
                  <span style={{ width: 28, fontSize: 12, color: 'var(--fg-3)',
                                  fontVariantNumeric: 'tabular-nums', textAlign: 'right' }}>
                    {String(ch.no).padStart(2, '0')}
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13.5, color: ch.current ? 'var(--accent)' : 'var(--fg-0)',
                                    fontWeight: ch.current ? 500 : 400, marginBottom: 2 }}>
                      {ch.title}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--fg-3)' }}>
                      {ch.words.toLocaleString('uk-UA')} слів · {ch.date}
                    </div>
                  </div>
                  {ch.read && <Icon name="check" size={13} style={{ color: 'var(--fg-3)' }} />}
                  {ch.current && <span style={{ fontSize: 10, color: 'var(--accent)', fontWeight: 600,
                                                    letterSpacing: '0.06em', textTransform: 'uppercase' }}>Зараз</span>}
                </li>
              ))}
              <li style={{ padding: '12px 16px', textAlign: 'center', fontSize: 12, color: 'var(--fg-3)',
                            cursor: 'pointer' }}>
                Показати ще {n.chapter_count - 8} розділів ↓
              </li>
            </ol>
          </section>
        </div>

        <aside style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <section style={{ padding: 16, border: '1px solid var(--line-soft)',
                              borderRadius: 'var(--r-lg)', background: 'var(--bg-1)' }}>
            <h4 style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em',
                          textTransform: 'uppercase', color: 'var(--fg-3)', marginBottom: 12 }}>Автор</h4>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 12 }}>
              <div className="avatar" style={{ width: 36, height: 36 }}>КЛ</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, color: 'var(--fg-0)', fontWeight: 500 }}>{n.author}</div>
                <div style={{ fontSize: 11, color: 'var(--fg-3)' }}>12 творів · 4.2k читачів</div>
              </div>
            </div>
            <button className="btn sm" style={{ width: '100%' }}>
              <Icon name="plus" size={11} /> Стежити
            </button>
          </section>

          <section>
            <h4 style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em',
                          textTransform: 'uppercase', color: 'var(--fg-3)', marginBottom: 10 }}>Подібне</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {NOVELS.slice(2, 5).map(nv => (
                <div key={nv.id} style={{ display: 'flex', gap: 10, cursor: 'pointer' }}>
                  <div className="cover" style={{ width: 40, flexShrink: 0 }}>
                    <GeneratedCover title={nv.title} author={nv.author} seed={nv.id} showText={false} />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 12.5, fontFamily: 'var(--font-serif)',
                                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {nv.title}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--fg-3)' }}>{nv.author}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}

window.NovelDetailScreen = NovelDetailScreen;
