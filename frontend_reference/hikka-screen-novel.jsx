// Screen H2 — Hikka-style novel detail
const _useState_hkn = React.useState;

function HkNovelScreen() {
  const n = NOVELS[0];
  const [tab, setTab] = _useState_hkn('overview');
  const tabs = [
    { id: 'overview',  label: 'Огляд' },
    { id: 'chapters',  label: 'Розділи', count: n.chapters_total },
    { id: 'characters',label: 'Персонажі', count: 14 },
    { id: 'reviews',   label: 'Відгуки', count: 47 },
    { id: 'collections',label: 'Колекції', count: 12 },
    { id: 'related',   label: 'Пов\'язані' },
    { id: 'staff',     label: 'Команда' },
  ];

  return (
    <div style={{ flex: 1, overflow: 'auto', background: 'var(--hk-bg-0)' }}>
      {/* Banner backdrop */}
      <div style={{ position: 'relative', height: 280, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.55,
                        filter: 'blur(30px) saturate(1.3)', transform: 'scale(1.1)' }}>
          <GeneratedCover title={n.title} author={n.author} seed={n.id} showText={false} />
        </div>
        <div style={{ position: 'absolute', inset: 0,
                        background: 'linear-gradient(180deg, oklch(0.145 0 0 / 0.3) 0%, var(--hk-bg-0) 100%)' }} />
      </div>

      {/* Title block sitting on top of banner */}
      <div style={{ padding: '0 32px', marginTop: -180, position: 'relative',
                      display: 'grid', gridTemplateColumns: '220px 1fr 280px', gap: 28 }}>
        {/* Left: cover + actions */}
        <div>
          <div className="hk-cover" style={{ width: 220, height: 330,
                                                boxShadow: '0 16px 40px rgba(0,0,0,0.5)' }}>
            <GeneratedCover title={n.title} author={n.author} seed={n.id} showText={false} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginTop: 12 }}>
            <button className="hk-btn primary" style={{ gridColumn: '1 / 3' }}>
              <Icon name="play" size={13} /> Читати з 1 розділу
            </button>
            <button className="hk-btn outline">
              <Icon name="plus" size={13} /> До списку
            </button>
            <button className="hk-btn outline">
              <Icon name="heart" size={13} />
            </button>
          </div>
          <div style={{ marginTop: 14, padding: 14, background: 'var(--hk-bg-1)',
                          border: '1px solid var(--hk-line)', borderRadius: 'var(--hk-r-lg)',
                          display: 'flex', flexDirection: 'column', gap: 10, fontSize: 12.5 }}>
            <InfoRow label="Тип"     value="Роман" />
            <InfoRow label="Розділів" value={`${n.chapters_pub} / ${n.chapters_total}`} mono />
            <InfoRow label="Слів"    value={(n.words/1000).toFixed(1)+' k'} mono />
            <InfoRow label="Виходить" value="Щонеділі, 18:00" />
            <InfoRow label="Видавець" value="Самвидав" />
            <InfoRow label="Рейтинг" value={<span className="hk-badge outline">14+</span>} />
            <InfoRow label="Мова"    value="🇺🇦 українська" />
            <InfoRow label="Початок" value="11 грудня 2025" />
            <InfoRow label="Сезон"   value="Зима 2026" />
          </div>
        </div>

        {/* Center: title, summary, tags, tabs */}
        <div style={{ paddingTop: 200, minWidth: 0 }}>
          <div style={{ fontSize: 12, color: 'var(--hk-fg-3)', letterSpacing: '0.03em', marginBottom: 4 }}>
            повільно-горить · епістолярний · магічний реалізм
          </div>
          <h1 style={{ fontSize: 36, fontWeight: 700, letterSpacing: '-0.03em',
                        lineHeight: 1.05, marginBottom: 6 }}>
            {n.title}
          </h1>
          <div style={{ fontSize: 13.5, color: 'var(--hk-fg-2)', marginBottom: 12,
                          display: 'flex', alignItems: 'center', gap: 8 }}>
            {n.author}
            <span style={{ color: 'var(--hk-fg-4)' }}>·</span>
            <span className="hk-badge accent">Виходить</span>
            <span style={{ color: 'var(--hk-fg-4)' }}>·</span>
            <span>{n.year || 2026}</span>
          </div>

          {/* Score row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 22, padding: '14px 0',
                          borderTop: '1px solid var(--hk-line)',
                          borderBottom: '1px solid var(--hk-line)', marginBottom: 18 }}>
            <ScoreBig value={8.7} />
            <Stat label="оцінок" value="2 482" />
            <Stat label="у списках" value="4 120" />
            <Stat label="kudos" value={n.kudos.toLocaleString('uk-UA')} />
            <Stat label="прочитань" value={(n.hits/1000).toFixed(1)+'k'} />
            <div style={{ flex: 1 }} />
            <RankBadge label="ТОП ROMANCE" rank="#3" />
            <RankBadge label="ТРЕНД" rank="#1" accent />
          </div>

          {/* Tabs */}
          <div className="hk-tabs" style={{ marginBottom: 22 }}>
            {tabs.map(t => (
              <div key={t.id} className={'hk-tab ' + (tab === t.id ? 'active' : '')}
                    onClick={() => setTab(t.id)}>
                {t.label}
                {t.count !== undefined && (
                  <span className="num" style={{ marginLeft: 6, fontSize: 11,
                                                    color: tab === t.id ? 'var(--hk-fg-3)' : 'var(--hk-fg-4)' }}>
                    {t.count}
                  </span>
                )}
              </div>
            ))}
          </div>

          {tab === 'overview' && <OverviewPanel n={n} />}
          {tab === 'chapters' && <ChaptersTable />}
          {tab === 'characters' && <CharactersGrid />}
          {tab === 'reviews' && <ReviewsList />}
        </div>

        {/* Right: side rail */}
        <aside style={{ paddingTop: 200, display: 'flex', flexDirection: 'column', gap: 18 }}>
          <SidePanel title="ТЕГИ" sub="14 тегів">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {['зима', 'епістолярний', 'повільно-горить', 'магічний реалізм',
                 'листи', 'самотність', 'провінція', 'втрата', 'віднайдення',
                 'передвоєнне', 'хюґе', '1930-ті', 'жіноча проза'].map(t => (
                <span key={t} className="hk-badge outline" style={{ cursor: 'pointer' }}>
                  {t}
                </span>
              ))}
            </div>
          </SidePanel>

          <SidePanel title="АВТОР" sub="">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div className="hk-av" style={{ width: 44, height: 44, fontSize: 13 }}>КЛ</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13.5, color: 'var(--hk-fg-0)', fontWeight: 500 }}>
                  Калина Левчук
                </div>
                <div style={{ fontSize: 11.5, color: 'var(--hk-fg-3)' }}>
                  6 творів · 12.4k читачів
                </div>
              </div>
            </div>
            <button className="hk-btn outline sm" style={{ width: '100%', marginTop: 10 }}>
              <Icon name="plus" size={11} /> Стежити
            </button>
          </SidePanel>

          <SidePanel title="ПОВ'ЯЗАНІ ТВОРИ" sub="3">
            {NOVELS.slice(2, 5).map(rn => (
              <div key={rn.id} style={{ display: 'flex', gap: 10 }}>
                <div className="hk-cover" style={{ width: 36, height: 54 }}>
                  <GeneratedCover title={rn.title} author={rn.author} seed={rn.id} showText={false} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, color: 'var(--hk-fg-0)', lineHeight: 1.3,
                                  display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {rn.title}
                  </div>
                  <div style={{ fontSize: 10.5, color: 'var(--hk-fg-3)', marginTop: 2 }}>
                    Той самий автор
                  </div>
                </div>
              </div>
            ))}
          </SidePanel>
        </aside>
      </div>
    </div>
  );
}

function InfoRow({ label, value, mono }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
      <span style={{ color: 'var(--hk-fg-3)' }}>{label}</span>
      <span style={{ color: 'var(--hk-fg-1)', fontWeight: 500,
                      fontVariantNumeric: mono ? 'tabular-nums' : 'normal',
                      fontFamily: mono ? 'var(--hk-font-mono)' : 'inherit',
                      textAlign: 'right' }}>
        {value}
      </span>
    </div>
  );
}

function ScoreBig({ value }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
      <span className="num" style={{ fontSize: 32, fontWeight: 700, lineHeight: 1,
                                          color: scoreColor(value), letterSpacing: '-0.04em' }}>
        {value.toFixed(1)}
      </span>
      <span style={{ fontSize: 13, color: 'var(--hk-fg-3)' }}>/ 10</span>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div>
      <div className="num" style={{ fontSize: 16, fontWeight: 600, color: 'var(--hk-fg-0)' }}>{value}</div>
      <div style={{ fontSize: 10.5, color: 'var(--hk-fg-3)', textTransform: 'uppercase',
                     letterSpacing: '0.06em' }}>{label}</div>
    </div>
  );
}

function RankBadge({ label, rank, accent }) {
  return (
    <div style={{ padding: '4px 10px', border: '1px solid ' + (accent ? 'var(--hk-accent)' : 'var(--hk-line-strong)'),
                    borderRadius: 'var(--hk-r-sm)', display: 'flex', alignItems: 'center', gap: 6 }}>
      <span className="num" style={{ fontSize: 14, fontWeight: 700,
                                          color: accent ? 'var(--hk-accent)' : 'var(--hk-fg-0)' }}>
        {rank}
      </span>
      <span style={{ fontSize: 9.5, fontWeight: 600, letterSpacing: '0.08em',
                       color: 'var(--hk-fg-3)' }}>
        {label}
      </span>
    </div>
  );
}

function SidePanel({ title, sub, children }) {
  return (
    <section>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
                      marginBottom: 10 }}>
        <h4 style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: '0.08em',
                       color: 'var(--hk-fg-3)' }}>{title}</h4>
        {sub && <span className="num" style={{ fontSize: 10.5, color: 'var(--hk-fg-4)' }}>{sub}</span>}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>{children}</div>
    </section>
  );
}

function OverviewPanel({ n }) {
  return (
    <div>
      <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 10 }}>Опис</h3>
      <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--hk-fg-1)',
                   margin: '0 0 24px', textWrap: 'pretty' }}>
        {n.summary}
        {' '}
        Героїня залишається одна на хуторі біля Горохівців, де знаходить пачку листів,
        написаних її прабабою упродовж 1932–1939 років. Кожен лист — окрема історія, окремий
        жанр, окрема пора року. Поступово межа між читанням і життям героїні починає танути:
        зима 1939-го говорить з нею через папір, а сніг ніяк не може випасти на жодному з листів.
      </p>

      <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 10 }}>Атмосфера</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, marginBottom: 24 }}>
        {[
          ['Темп', 'Повільний', 0.25],
          ['Тон', 'Меланхолійний', 0.6],
          ['Складність', 'Помірна', 0.5],
          ['Магія', 'Латентна', 0.3],
        ].map(([k, v, pct]) => (
          <div key={k} style={{ padding: '10px 12px', background: 'var(--hk-bg-1)',
                                  border: '1px solid var(--hk-line)', borderRadius: 'var(--hk-r-md)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
              <span style={{ color: 'var(--hk-fg-3)' }}>{k}</span>
              <span style={{ color: 'var(--hk-fg-0)', fontWeight: 500 }}>{v}</span>
            </div>
            <div style={{ marginTop: 6, height: 3, background: 'var(--hk-bg-3)',
                            borderRadius: 999, overflow: 'hidden' }}>
              <div style={{ width: `${pct*100}%`, height: '100%', background: 'var(--hk-fg-1)' }} />
            </div>
          </div>
        ))}
      </div>

      <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 10 }}>Розподіл оцінок</h3>
      <RatingHistogram />
    </div>
  );
}

function RatingHistogram() {
  const data = [
    { s: 10, c: 412 }, { s: 9, c: 822 }, { s: 8, c: 760 }, { s: 7, c: 280 },
    { s: 6, c: 110 }, { s: 5, c: 48 }, { s: 4, c: 20 }, { s: 3, c: 12 },
    { s: 2, c: 8 },   { s: 1, c: 10 },
  ];
  const max = Math.max(...data.map(d => d.c));
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 90, padding: 12,
                    background: 'var(--hk-bg-1)', border: '1px solid var(--hk-line)',
                    borderRadius: 'var(--hk-r-md)' }}>
      {data.map(d => (
        <div key={d.s} style={{ flex: 1, display: 'flex', flexDirection: 'column',
                                  alignItems: 'center', gap: 4, height: '100%' }}>
          <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', width: '100%' }}>
            <div style={{ width: '100%', height: `${d.c/max*100}%`,
                            background: scoreColor(d.s), borderRadius: '3px 3px 0 0',
                            opacity: 0.8 }} />
          </div>
          <span className="num" style={{ fontSize: 10, color: 'var(--hk-fg-3)' }}>{d.s}</span>
        </div>
      ))}
    </div>
  );
}

function ChaptersTable() {
  return (
    <div className="hk-card" style={{ padding: 0 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '50px 1fr 90px 110px 90px 30px',
                      gap: 0, padding: '10px 16px',
                      borderBottom: '1px solid var(--hk-line)',
                      fontSize: 10.5, fontWeight: 600, letterSpacing: '0.08em',
                      color: 'var(--hk-fg-3)', textTransform: 'uppercase' }}>
        <span>#</span><span>Назва</span><span>Слів</span><span>Опубліковано</span><span>Прочит.</span><span></span>
      </div>
      {[
        { n: 1, t: 'Сніг, який не падає', words: 4820, date: '11 гру', read: true },
        { n: 2, t: 'Лист перший: Мирославі', words: 6310, date: '18 гру', read: true },
        { n: 3, t: 'Лист другий: про дим над дахом', words: 5440, date: '25 гру', read: true, current: true },
        { n: 4, t: '— наступний розділ —', words: 0, date: 'нд, 16 лют', read: false, upcoming: true },
        { n: 5, t: 'Лист четвертий', words: 0, date: '23 лют', upcoming: true, locked: true },
      ].map(c => (
        <div key={c.n} style={{ display: 'grid', gridTemplateColumns: '50px 1fr 90px 110px 90px 30px',
                                  padding: '11px 16px', alignItems: 'center', fontSize: 13,
                                  borderTop: '1px solid var(--hk-line)',
                                  background: c.current ? 'var(--hk-accent-soft)' : 'transparent',
                                  opacity: c.locked ? 0.5 : 1 }}>
          <span className="num" style={{ color: 'var(--hk-fg-3)', fontFamily: 'var(--hk-font-mono)' }}>
            {String(c.n).padStart(2, '0')}
          </span>
          <span style={{ color: c.upcoming ? 'var(--hk-fg-3)' : 'var(--hk-fg-0)',
                          fontStyle: c.upcoming ? 'italic' : 'normal' }}>
            {c.t}
            {c.current && <span className="hk-badge accent" style={{ marginLeft: 8, fontSize: 9.5 }}>READING</span>}
          </span>
          <span className="num" style={{ color: 'var(--hk-fg-2)' }}>
            {c.words ? c.words.toLocaleString('uk-UA') : '—'}
          </span>
          <span style={{ color: 'var(--hk-fg-3)', fontSize: 12 }}>{c.date}</span>
          <span>
            {c.read && <Icon name="check-circle" size={13} style={{ color: 'oklch(0.72 0.16 145)' }} />}
            {c.upcoming && <Icon name="lock" size={13} style={{ color: 'var(--hk-fg-4)' }} />}
          </span>
          <button style={{ color: 'var(--hk-fg-3)' }}><Icon name="more" size={13} /></button>
        </div>
      ))}
    </div>
  );
}

function CharactersGrid() {
  const chars = [
    { name: 'Мирослава', role: 'Головна героїня', avatar: 'М', color: 'oklch(0.7 0.12 30)' },
    { name: 'Калина (бабуся)', role: 'Авторка листів', avatar: 'К', color: 'oklch(0.7 0.10 80)' },
    { name: 'Дмитро', role: 'Сусід', avatar: 'Д', color: 'oklch(0.65 0.10 230)' },
    { name: 'Тереса', role: 'Подруга з міста', avatar: 'Т', color: 'oklch(0.7 0.12 320)' },
    { name: 'Чорний кіт', role: 'Свідок', avatar: '🐈', color: 'oklch(0.4 0 0)' },
    { name: 'Залізничник', role: 'Епізод', avatar: 'З', color: 'oklch(0.55 0.06 240)' },
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
      {chars.map(c => (
        <div key={c.name} className="hk-card" style={{ padding: 12, display: 'flex',
                                                              alignItems: 'center', gap: 12 }}>
          <div style={{ width: 48, height: 48, borderRadius: 'var(--hk-r-md)', background: c.color,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 18, color: 'white', fontWeight: 600 }}>
            {c.avatar}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13.5, color: 'var(--hk-fg-0)', fontWeight: 500 }}>{c.name}</div>
            <div style={{ fontSize: 11.5, color: 'var(--hk-fg-3)', marginTop: 2 }}>{c.role}</div>
          </div>
          <button className="hk-btn ghost icon sm"><Icon name="heart" size={13} /></button>
        </div>
      ))}
    </div>
  );
}

function ReviewsList() {
  const reviews = [
    { user: 'архіваріус', avatar: 'АР', score: 9, date: '2 дні тому',
      title: 'Епістолярна форма використана геніально',
      body: 'Кожен лист — окремий жанр: то інтимний щоденниковий запис, то майже діловий протокол. І все це від однієї людини. Я ще не зустрічав, щоб така структура працювала так природно.',
      kudos: 47, comments: 12 },
    { user: 'оля_читає', avatar: 'ОЧ', score: 10, date: '5 днів тому',
      title: 'Господи, цей розділ просто розриває серце',
      body: 'Як вона це робить? Я тричі перечитала момент із сніжинкою на чорнилі, і три рази не змогла видихнути. Чекаю четверту главу як божевільна.',
      kudos: 23, comments: 4 },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {reviews.map((r, i) => (
        <div key={i} className="hk-card" style={{ padding: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <div className="hk-av" style={{ width: 32, height: 32 }}>{r.avatar}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, color: 'var(--hk-fg-0)', fontWeight: 500 }}>{r.user}</div>
              <div style={{ fontSize: 11, color: 'var(--hk-fg-3)' }}>{r.date}</div>
            </div>
            <HkScore value={r.score} size={13} />
          </div>
          <h4 style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>{r.title}</h4>
          <p style={{ fontSize: 13.5, lineHeight: 1.6, color: 'var(--hk-fg-1)', margin: '0 0 10px',
                       textWrap: 'pretty' }}>
            {r.body}
          </p>
          <div style={{ display: 'flex', gap: 16, fontSize: 11.5, color: 'var(--hk-fg-3)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <Icon name="heart" size={12} /> {r.kudos}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <Icon name="message" size={12} /> {r.comments}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

window.HkNovelScreen = HkNovelScreen;
