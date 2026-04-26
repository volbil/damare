// Screen H1 — Hikka-style home
function HkHomeScreen() {
  const hero = NOVELS[0];
  const trending = NOVELS.slice(1, 8);
  const seasonal = NOVELS.slice(2, 10);
  const updates = NOVELS.slice(0, 6);
  const collections = [
    { id: 'c1', name: 'Зима 2026: 12 затишних історій', curator: 'оля_читає', count: 12 },
    { id: 'c2', name: 'Український магічний реалізм', curator: 'архіваріус', count: 24 },
    { id: 'c3', name: 'Дебюти року', curator: 'Damare', count: 18, official: true },
  ];

  return (
    <div style={{ flex: 1, overflow: 'auto', background: 'var(--hk-bg-0)' }}>
      {/* Backdrop hero */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.45,
                        filter: 'blur(40px) saturate(1.2)' }}>
          <GeneratedCover title={hero.title} author={hero.author} seed={hero.id} showText={false} />
        </div>
        <div style={{ position: 'absolute', inset: 0,
                        background: 'linear-gradient(180deg, transparent 0%, var(--hk-bg-0) 90%)' }} />
        <div style={{ position: 'relative', display: 'grid',
                        gridTemplateColumns: '180px 1fr',
                        gap: 28, padding: '36px 32px 56px' }}>
          <div className="hk-cover" style={{ width: 180, height: 270 }}>
            <GeneratedCover title={hero.title} author={hero.author} seed={hero.id} showText={false} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingTop: 8 }}>
            <div style={{ display: 'flex', gap: 6 }}>
              <span className="hk-badge accent">Виходить</span>
              <span className="hk-badge sec">Дебют тижня</span>
              <span className="hk-badge sec">Магічний реалізм</span>
            </div>
            <h1 style={{ fontSize: 38, fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.05 }}>
              {hero.title}
            </h1>
            <div style={{ fontSize: 14, color: 'var(--hk-fg-2)' }}>
              {hero.author} · {hero.year || 2026} · {hero.chapters_total} розділів запланована
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--hk-fg-1)',
                         margin: '8px 0 0', maxWidth: 640, textWrap: 'pretty' }}>
              {hero.summary}
            </p>
            <div className="hk-stat-row" style={{ display: 'flex', gap: 18, marginTop: 10,
                                                       fontSize: 12.5, color: 'var(--hk-fg-2)',
                                                       alignItems: 'center' }}>
              <HkScore value={8.7} size={14} />
              <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <Icon name="heart" size={13} /> <span className="num">{hero.kudos.toLocaleString('uk-UA')}</span>
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <Icon name="eye" size={13} /> <span className="num">{(hero.hits/1000).toFixed(1)}k</span>
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <Icon name="bookmark" size={13} /> <span className="num">2 480</span> у списку
              </span>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
              <button className="hk-btn primary lg"><Icon name="play" size={13} /> Читати з 1 розділу</button>
              <button className="hk-btn lg"><Icon name="plus" size={13} /> До списку</button>
              <button className="hk-btn outline lg icon"><Icon name="heart" size={14} /></button>
              <button className="hk-btn outline lg icon"><Icon name="more" size={14} /></button>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '0 32px 48px', display: 'flex', flexDirection: 'column', gap: 36 }}>
        {/* Trending row */}
        <Section title="Зараз популярне" link="Усі тренди →">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 14 }}>
            {trending.map((n, i) => <SmallCard key={n.id} n={n} rank={i + 1} />)}
          </div>
        </Section>

        {/* 2-col split: schedule | updates */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
          <div>
            <SectionHeader title="Розклад" link="Тиждень →" />
            <div className="hk-card" style={{ padding: 0 }}>
              {[
                { day: 'Сьогодні', date: '12 лют', items: [
                  { time: '18:00', title: 'Сім зимових ночей · Розділ 4', author: 'Калина Левчук', status: 'reading' },
                  { time: '21:00', title: 'Карта втрачених міст · Розділ 32', author: 'Тарас Вовк', status: 'planning' },
                ]},
                { day: 'Завтра', date: '13 лют', items: [
                  { time: '11:00', title: 'Янголи їдять борщ · Глава 9', author: 'Богдана Шум', status: 'reading' },
                ]},
                { day: 'П\'ятниця', date: '14 лют', items: [
                  { time: '20:00', title: 'Між молотом і землею · Розділ 19', author: 'Андрій Чорний' },
                ]},
              ].map((d, i) => (
                <div key={i} style={{ borderBottom: '1px solid var(--hk-line)' }}>
                  <div style={{ padding: '10px 14px', display: 'flex', justifyContent: 'space-between',
                                  fontSize: 11, fontWeight: 600, letterSpacing: '0.06em',
                                  textTransform: 'uppercase', color: 'var(--hk-fg-3)',
                                  background: 'var(--hk-bg-1)' }}>
                    <span>{d.day}</span><span>{d.date}</span>
                  </div>
                  {d.items.map((it, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 12,
                                            padding: '11px 14px',
                                            borderTop: j === 0 ? 0 : '1px solid var(--hk-line)' }}>
                      <span className="num" style={{ fontSize: 12, color: 'var(--hk-fg-3)',
                                                       fontFamily: 'var(--hk-font-mono)', minWidth: 44 }}>
                        {it.time}
                      </span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 13, color: 'var(--hk-fg-0)' }}>{it.title}</div>
                        <div style={{ fontSize: 11.5, color: 'var(--hk-fg-3)', marginTop: 1 }}>{it.author}</div>
                      </div>
                      {it.status && <HkStatus kind={it.status} />}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div>
            <SectionHeader title="Нові розділи" link="Усі оновлення →" />
            <div className="hk-card" style={{ padding: 0 }}>
              {updates.map((n, i) => (
                <div key={n.id} style={{ display: 'flex', gap: 12, padding: 12,
                                            borderTop: i === 0 ? 0 : '1px solid var(--hk-line)' }}>
                  <div className="hk-cover" style={{ width: 36, height: 54 }}>
                    <GeneratedCover title={n.title} author={n.author} seed={n.id} showText={false} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span className="hk-badge accent" style={{ fontSize: 9.5 }}>NEW</span>
                      <span style={{ fontSize: 13, color: 'var(--hk-fg-0)',
                                       overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {n.title}
                      </span>
                    </div>
                    <div style={{ fontSize: 11.5, color: 'var(--hk-fg-3)', marginTop: 2 }}>
                      {n.author} · Розділ {3 + i}
                    </div>
                    <div className="num" style={{ fontSize: 11, color: 'var(--hk-fg-4)', marginTop: 'auto' }}>
                      {i === 0 ? '12 хв тому' : i === 1 ? '34 хв тому' : i === 2 ? '1 год тому' :
                        i === 3 ? '2 год тому' : i === 4 ? '4 год тому' : '7 год тому'}
                    </div>
                  </div>
                  <button className="hk-btn ghost icon sm"><Icon name="bookmark" size={13} /></button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Seasonal grid */}
        <Section title="Зима 2026" link="Сезон цілком →">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 12 }}>
            {seasonal.map(n => <SmallCard key={n.id} n={n} compact />)}
          </div>
        </Section>

        {/* Collections */}
        <Section title="Колекції від спільноти" link="Усі колекції →">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
            {collections.map(c => (
              <div key={c.id} className="hk-card" style={{ padding: 14, display: 'flex', gap: 12 }}>
                {/* mini stack */}
                <div style={{ position: 'relative', width: 56, height: 84, flexShrink: 0 }}>
                  {NOVELS.slice(0, 3).map((n, i) => (
                    <div key={i} style={{ position: 'absolute', top: 0, left: i * 8,
                                            width: 40, height: 60, transform: `rotate(${(i-1)*4}deg)`,
                                            transformOrigin: 'bottom center' }}>
                      <div className="hk-cover" style={{ width: 40, height: 60 }}>
                        <GeneratedCover title={n.title} author={n.author} seed={n.id} showText={false} />
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13.5, color: 'var(--hk-fg-0)', fontWeight: 500, lineHeight: 1.3, marginBottom: 6 }}>
                    {c.name}
                  </div>
                  <div style={{ fontSize: 11.5, color: 'var(--hk-fg-3)' }}>
                    {c.official ? <span className="hk-badge accent" style={{ fontSize: 9.5 }}>офіційне</span> : c.curator}
                    <span className="num" style={{ marginLeft: 8 }}>{c.count} творів</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}

function Section({ title, link, children }) {
  return (
    <section>
      <SectionHeader title={title} link={link} />
      {children}
    </section>
  );
}

function SectionHeader({ title, link }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 14 }}>
      <h2 style={{ fontSize: 18, fontWeight: 600, letterSpacing: '-0.02em' }}>{title}</h2>
      {link && (
        <a style={{ fontSize: 12.5, color: 'var(--hk-fg-3)', cursor: 'pointer' }}>{link}</a>
      )}
    </div>
  );
}

function SmallCard({ n, rank, compact }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, position: 'relative', cursor: 'pointer' }}>
      <HkCover novel={n} />
      {rank !== undefined && (
        <div style={{ position: 'absolute', top: -2, left: -2,
                        fontFamily: 'var(--hk-font-mono)', fontSize: 22, fontWeight: 700,
                        color: 'white', textShadow: '0 1px 4px rgba(0,0,0,0.6)',
                        WebkitTextStroke: '1px var(--hk-bg-0)',
                        lineHeight: 1, padding: '4px 6px' }}>
          {rank}
        </div>
      )}
      {!compact && (
        <div>
          <div style={{ fontSize: 12.5, color: 'var(--hk-fg-0)', fontWeight: 500,
                          lineHeight: 1.3, overflow: 'hidden',
                          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                          textWrap: 'pretty' }}>
            {n.title}
          </div>
          <div style={{ fontSize: 11, color: 'var(--hk-fg-3)', marginTop: 2 }}>
            {n.year || 2025} · {n.tags?.[0] || 'роман'}
          </div>
        </div>
      )}
    </div>
  );
}

window.HkHomeScreen = HkHomeScreen;
window.HkSection = Section;
window.HkSmallCard = SmallCard;
