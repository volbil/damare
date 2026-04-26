// Mobile screens — iOS frames showing key flows on phone
// Reuses tokens & data; full-bleed dark UI inside the device frame.

function MobileApp({ screen, density, withCovers }) {
  const safeBottom = 80; // tab bar
  return (
    <div className="dmr" style={{ width: '100%', height: '100%', background: 'var(--bg-0)',
                                    color: 'var(--fg-1)', display: 'flex', flexDirection: 'column',
                                    paddingTop: 54 /* status bar room */ }}>
      {screen === 'home' && <MobileHome safeBottom={safeBottom} />}
      {screen === 'novel' && <MobileNovel safeBottom={safeBottom} />}
      {screen === 'reader' && <MobileReader />}
      {screen === 'profile' && <MobileProfile safeBottom={safeBottom} />}
      {screen !== 'reader' && <MobileTabBar active={screen} />}
    </div>
  );
}

function MobileTabBar({ active }) {
  const tabs = [
    ['home', 'home', 'Стрічка'],
    ['discover', 'compass', 'Огляд'],
    ['library', 'book', 'Бібліотека'],
    ['profile', 'user', 'Профіль'],
  ];
  return (
    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 80, paddingBottom: 24,
                    display: 'flex', alignItems: 'flex-start',
                    background: 'oklch(0.16 0.008 60 / 0.85)',
                    backdropFilter: 'blur(20px)',
                    borderTop: '1px solid var(--line-soft)' }}>
      {tabs.map(([id, ic, label]) => (
        <div key={id} style={{ flex: 1, display: 'flex', flexDirection: 'column',
                                alignItems: 'center', gap: 3, paddingTop: 10,
                                color: active === id ? 'var(--accent)' : 'var(--fg-3)' }}>
          <Icon name={ic} size={22} stroke={active === id ? 1.8 : 1.5} />
          <span style={{ fontSize: 10, fontWeight: 500 }}>{label}</span>
        </div>
      ))}
    </div>
  );
}

function MobileHome({ safeBottom }) {
  const cont = NOVELS[0];
  return (
    <div style={{ flex: 1, overflow: 'auto', paddingBottom: safeBottom + 16 }}>
      <div style={{ padding: '8px 20px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <Logomark size={26} />
        <div style={{ flex: 1, fontSize: 19, fontWeight: 600, color: 'var(--fg-0)', letterSpacing: '-0.02em' }}>
          damare
        </div>
        <button style={{ width: 36, height: 36, borderRadius: 999, background: 'var(--bg-2)',
                          color: 'var(--fg-1)', display: 'flex', alignItems: 'center',
                          justifyContent: 'center', position: 'relative' }}>
          <Icon name="bell" size={17} />
          <span style={{ position: 'absolute', top: 8, right: 9, width: 6, height: 6,
                          borderRadius: 999, background: 'var(--accent)' }} />
        </button>
      </div>

      {/* Continue reading card */}
      <div style={{ margin: '0 20px 24px', padding: 16, borderRadius: 16,
                      background: 'linear-gradient(180deg, var(--bg-1) 0%, var(--bg-0) 100%)',
                      border: '1px solid var(--line-soft)' }}>
        <div style={{ fontSize: 10, color: 'var(--fg-3)', letterSpacing: '0.08em',
                        textTransform: 'uppercase', marginBottom: 10 }}>
          Продовжити читати
        </div>
        <div style={{ display: 'flex', gap: 14 }}>
          <div className="cover" style={{ width: 76, flexShrink: 0 }}>
            <GeneratedCover title={cont.title} author={cont.author} seed={cont.id} showText={false} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 17, lineHeight: 1.2,
                            marginBottom: 3, color: 'var(--fg-0)' }}>
              {cont.title}
            </div>
            <div style={{ fontSize: 12, color: 'var(--fg-3)', marginBottom: 10 }}>
              Розділ {cont.chapters} з {cont.chapter_count}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ flex: 1, height: 2, background: 'var(--bg-3)', borderRadius: 999 }}>
                <div style={{ width: cont.progress + '%', height: '100%',
                                background: 'var(--accent)', borderRadius: 999 }} />
              </div>
              <span style={{ fontSize: 11, color: 'var(--fg-3)', fontVariantNumeric: 'tabular-nums' }}>
                {cont.progress}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Trending — horizontal scroll */}
      <div style={{ padding: '0 20px 10px', display: 'flex', alignItems: 'baseline',
                      justifyContent: 'space-between' }}>
        <h3 style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em',
                      textTransform: 'uppercase', color: 'var(--fg-3)' }}>
          У тренді
        </h3>
        <span style={{ fontSize: 12, color: 'var(--fg-3)' }}>Більше →</span>
      </div>
      <div style={{ display: 'flex', gap: 12, overflowX: 'auto', padding: '0 20px 24px',
                      scrollbarWidth: 'none' }}>
        {NOVELS.slice(2, 6).map(n => (
          <div key={n.id} style={{ width: 130, flexShrink: 0 }}>
            <div className="cover" style={{ marginBottom: 8 }}>
              <GeneratedCover title={n.title} author={n.author} seed={n.id} />
            </div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 13, lineHeight: 1.2,
                            color: 'var(--fg-0)', overflow: 'hidden', textOverflow: 'ellipsis',
                            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
              {n.title}
            </div>
            <div style={{ fontSize: 10.5, color: 'var(--fg-3)', marginTop: 2 }}>{n.author}</div>
          </div>
        ))}
      </div>

      {/* Recently updated list */}
      <div style={{ padding: '0 20px 10px' }}>
        <h3 style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em',
                      textTransform: 'uppercase', color: 'var(--fg-3)' }}>
          Нещодавно оновлені
        </h3>
      </div>
      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {NOVELS.slice(0, 3).map(n => (
          <div key={n.id} style={{ display: 'flex', gap: 12, padding: 10,
                                    background: 'var(--bg-1)', borderRadius: 12,
                                    border: '1px solid var(--line-soft)' }}>
            <div className="cover" style={{ width: 50, flexShrink: 0 }}>
              <GeneratedCover title={n.title} author={n.author} seed={n.id} showText={false} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: 14, lineHeight: 1.25,
                              color: 'var(--fg-0)', marginBottom: 2 }}>{n.title}</div>
              <div style={{ fontSize: 11, color: 'var(--fg-3)', marginBottom: 6 }}>
                {n.author} · {n.updated}
              </div>
              <div className="stat-row" style={{ fontSize: 10.5, gap: 10 }}>
                <span className="stat"><Icon name="heart" size={10} />{(n.kudos/1000).toFixed(1)}k</span>
                <span className="stat"><Icon name="message" size={10} />{n.comments}</span>
                <span className="tag" style={{ fontSize: 9, padding: '1px 6px' }}>{n.rating}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MobileNovel({ safeBottom }) {
  const n = NOVELS[0];
  return (
    <div style={{ flex: 1, overflow: 'auto', paddingBottom: safeBottom + 80 /* sticky CTA */ }}>
      {/* Hero */}
      <div style={{ position: 'relative', padding: '8px 20px 24px' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.35 }}>
          <GeneratedCover title={n.title} author={n.author} seed={n.id} showText={false} />
          <div style={{ position: 'absolute', inset: 0,
                         background: 'linear-gradient(180deg, transparent, var(--bg-0))' }} />
        </div>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 16,
                        marginBottom: 18 }}>
          <button style={{ color: 'var(--fg-1)' }}><Icon name="arrow-l" size={20} /></button>
          <div style={{ flex: 1 }} />
          <button style={{ color: 'var(--fg-1)' }}><Icon name="more" size={20} /></button>
        </div>
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column',
                        alignItems: 'center', gap: 14 }}>
          <div className="cover" style={{ width: 150, boxShadow: 'var(--shadow-lg)' }}>
            <GeneratedCover title={n.title} author={n.author} seed={n.id} />
          </div>
          <div style={{ display: 'flex', gap: 5 }}>
            <span className="tag rating">Підлітковий</span>
            <span className="tag" style={{ background: 'transparent', borderColor: 'var(--line)' }}>{n.status}</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 26, fontWeight: 500,
                        textAlign: 'center', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
            {n.title}
          </h1>
          <div style={{ fontSize: 13, color: 'var(--fg-2)' }}>
            від <span style={{ color: 'var(--accent)' }}>{n.author}</span>
          </div>
          <div className="stat-row" style={{ fontSize: 11.5, gap: 14 }}>
            <span className="stat"><Icon name="heart" size={11} />{n.kudos.toLocaleString('uk-UA')}</span>
            <span className="stat"><Icon name="bookmark" size={11} />{n.bookmarks}</span>
            <span className="stat"><Icon name="message" size={11} />{n.comments}</span>
          </div>
        </div>
      </div>

      <div style={{ padding: '0 20px 20px' }}>
        <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--fg-1)', margin: 0 }}>
          {n.summary}
        </p>
      </div>

      <div style={{ padding: '0 20px 24px', display: 'flex', flexWrap: 'wrap', gap: 5 }}>
        {n.tags.map(t => <span key={t} className="tag">{t}</span>)}
      </div>

      <div style={{ padding: '0 20px 12px', display: 'flex', justifyContent: 'space-between',
                      alignItems: 'baseline' }}>
        <h3 style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em',
                      textTransform: 'uppercase', color: 'var(--fg-3)' }}>
          Розділи · {n.chapter_count}
        </h3>
        <span style={{ fontSize: 12, color: 'var(--fg-3)' }}>Сортування ↓</span>
      </div>
      <div style={{ margin: '0 20px', borderRadius: 12, overflow: 'hidden',
                      border: '1px solid var(--line-soft)', background: 'var(--bg-1)' }}>
        {[
          ['01', 'Поверненння', '2 100 слів', 'місяць тому', true],
          ['02', 'Поштова скринька', '1 980 слів', '3 тижні тому', true],
          ['03', 'Лист, який ніхто не писав', '2 340 слів', '2 дні тому', false, true],
          ['04', 'Тітка Ніна', '— ще не опубліковано', '', false],
        ].map(([no, ttl, sub1, sub2, read, current], i, a) => (
          <div key={no} style={{ display: 'flex', alignItems: 'center', gap: 12,
                                  padding: '12px 14px',
                                  borderBottom: i === a.length - 1 ? 0 : '1px solid var(--line-soft)',
                                  background: current ? 'var(--accent-soft)' : 'transparent' }}>
            <span style={{ fontSize: 11, color: 'var(--fg-3)', fontVariantNumeric: 'tabular-nums', width: 22 }}>
              {no}
            </span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13.5, color: current ? 'var(--accent)' : 'var(--fg-0)' }}>
                {ttl}
              </div>
              <div style={{ fontSize: 11, color: 'var(--fg-3)' }}>{sub1}{sub2 && ' · ' + sub2}</div>
            </div>
            {read && <Icon name="check" size={13} style={{ color: 'var(--fg-3)' }} />}
            {current && <span style={{ fontSize: 9, fontWeight: 600, color: 'var(--accent)',
                                          letterSpacing: '0.06em', textTransform: 'uppercase' }}>Зараз</span>}
          </div>
        ))}
      </div>

      {/* Sticky CTA — sits directly above the tab bar (80px) */}
      <div style={{ position: 'absolute', bottom: 80, left: 0, right: 0, zIndex: 5,
                      padding: '10px 16px 12px',
                      background: 'oklch(0.16 0.008 60 / 0.92)',
                      backdropFilter: 'blur(16px)',
                      borderTop: '1px solid var(--line-soft)' }}>
        <button className="btn primary" style={{ width: '100%', height: 44 }}>
          Продовжити з розділу 3
        </button>
      </div>
    </div>
  );
}

function MobileReader() {
  const ch = READER_CHAPTER;
  const T = { bg: '#15161a', fg: '#dcd6c8', meta: '#7a766b' };
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.bg, color: T.fg,
                    marginTop: -54, paddingTop: 54 }}>
      <div style={{ padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 12,
                      borderBottom: '1px solid rgba(255,255,255,0.04)',
                      background: T.bg + 'ee', backdropFilter: 'blur(8px)' }}>
        <button style={{ color: T.meta }}><Icon name="arrow-l" size={18} /></button>
        <div style={{ flex: 1, textAlign: 'center', fontSize: 11, color: T.meta }}>
          Розділ {ch.chapter_no}/{ch.chapter_total}
        </div>
        <button style={{ color: T.fg }}><Icon name="type" size={17} /></button>
        <button style={{ color: T.fg }}><Icon name="bookmark" size={17} /></button>
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: '32px 22px 80px' }}>
        <div style={{ textAlign: 'center', fontSize: 10, color: T.meta, letterSpacing: '0.1em',
                        textTransform: 'uppercase', marginBottom: 6 }}>
          Розділ {ch.chapter_no}
        </div>
        <h1 style={{ fontFamily: 'var(--font-serif)', textAlign: 'center', fontWeight: 500,
                      fontSize: 22, lineHeight: 1.2, letterSpacing: '-0.015em',
                      color: T.fg, marginBottom: 4 }}>
          {ch.title}
        </h1>
        <div style={{ textAlign: 'center', fontSize: 11, color: T.meta, marginBottom: 32 }}>
          {ch.author} · 8 хв
        </div>

        <div style={{ fontFamily: 'var(--font-serif)', fontSize: 16.5, lineHeight: 1.75, color: T.fg }}>
          {ch.paragraphs.slice(0, 4).map((p, i) => (
            <p key={i} style={{ margin: i === 0 ? '0 0 1.2em' : '0 0 1em',
                                  textIndent: i > 0 ? '1.2em' : 0, textWrap: 'pretty' }}>
              {i === 0 && (
                <span style={{ float: 'left', fontFamily: 'var(--font-serif)',
                                fontSize: 56, lineHeight: 0.85, paddingRight: 8, paddingTop: 4,
                                color: 'var(--accent)' }}>{p[0]}</span>
              )}
              {i === 0 ? p.slice(1) : p}
            </p>
          ))}
          <div style={{ textAlign: 'center', fontSize: 16, color: T.meta, margin: '24px 0' }}>· · ·</div>
        </div>
      </div>

      {/* progress bar */}
      <div style={{ height: 2, background: 'rgba(255,255,255,0.05)' }}>
        <div style={{ height: '100%', width: '34%', background: 'var(--accent)' }} />
      </div>
    </div>
  );
}

function MobileProfile({ safeBottom }) {
  return (
    <div style={{ flex: 1, overflow: 'auto', paddingBottom: safeBottom + 16 }}>
      <div style={{ height: 90, marginTop: -54, paddingTop: 54,
                      background: 'linear-gradient(120deg, oklch(0.28 0.04 80) 0%, oklch(0.22 0.02 60) 50%, oklch(0.20 0.03 40) 100%)' }} />
      <div style={{ padding: '0 20px', marginTop: -32 }}>
        <div className="avatar" style={{ width: 72, height: 72, fontSize: 24,
                  border: '4px solid var(--bg-0)', background: 'var(--accent)', color: 'var(--accent-fg)' }}>
          КЛ
        </div>
        <h1 style={{ fontSize: 20, fontWeight: 600, marginTop: 14, marginBottom: 2 }}>Калина Левчук</h1>
        <div style={{ fontSize: 12.5, color: 'var(--fg-3)', marginBottom: 14 }}>
          @kalyna_l · 12 творів · 4.2k читачів
        </div>
        <p style={{ fontSize: 13.5, lineHeight: 1.6, color: 'var(--fg-1)', margin: '0 0 16px' }}>
          Пишу про маленькі міста, листи, що не дійшли, і людей, які повертаються.
        </p>
        <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
          <button className="btn primary" style={{ flex: 1 }}>
            <Icon name="plus" size={13} /> Стежити
          </button>
          <button className="btn"><Icon name="mail" size={14} /></button>
          <button className="btn"><Icon name="more" size={14} /></button>
        </div>

        {/* tabs */}
        <div style={{ display: 'flex', gap: 16, borderBottom: '1px solid var(--line-soft)', marginBottom: 16,
                        overflowX: 'auto' }}>
          {['Твори', 'Зараз читає', 'Прочитано', 'Колекції'].map((t, i) => (
            <button key={t} style={{ padding: '10px 0', fontSize: 13,
                                      color: i === 0 ? 'var(--fg-0)' : 'var(--fg-3)',
                                      fontWeight: i === 0 ? 500 : 400,
                                      borderBottom: i === 0 ? '2px solid var(--accent)' : '2px solid transparent',
                                      marginBottom: -1, whiteSpace: 'nowrap' }}>
              {t}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
          {NOVELS.slice(0, 4).map(n => (
            <div key={n.id}>
              <div className="cover" style={{ marginBottom: 8 }}>
                <GeneratedCover title={n.title} author={n.author} seed={n.id} />
              </div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: 13, lineHeight: 1.2,
                              color: 'var(--fg-0)' }}>{n.title}</div>
              <div className="stat-row" style={{ fontSize: 10.5, gap: 8, marginTop: 4 }}>
                <span className="stat"><Icon name="heart" size={10} />{(n.kudos/1000).toFixed(1)}k</span>
                <span className="stat"><Icon name="eye" size={10} />{(n.hits/1000).toFixed(1)}k</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

window.MobileApp = MobileApp;
