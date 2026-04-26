// Screen 10 — Articles / blog (essays, recs, craft)
const _useState_articles = React.useState;
function ArticlesScreen() {
  const featured = {
    title: 'Як писати тишу: чого нас вчить епістолярний жанр у 2026 році',
    subtitle: 'Лист — найповільніша форма наративу, і саме тому вона зараз потрібна як ніколи.',
    author: 'Калина Левчук', avatar: 'КЛ',
    time: '12 хв читання · 2 дні тому',
    kudos: 412, comments: 38,
  };

  const articles = [
    { cat: 'Розбір', title: '«Янголи їдять борщ»: коротка форма як магія', author: 'архіваріус', avatar: 'АР', time: '8 хв · 4 дні тому', kudos: 184, comments: 22 },
    { cat: 'Поради', title: 'Шість способів вийти з письменницького блоку, які не «гуляйте у парку»', author: 'Тарас Вовк', avatar: 'ТВ', time: '6 хв · тиждень тому', kudos: 622, comments: 91 },
    { cat: 'Інтерв\'ю', title: 'Розмова з Мирославою Дід: «Я не вірю в музу, я вірю в дисципліну»', author: 'Damare', avatar: 'DM', time: '14 хв · тиждень тому', kudos: 298, comments: 44, official: true },
    { cat: 'Рекомендації', title: 'Десять українських романів, які варто прочитати взимку', author: 'оля_читає', avatar: 'ОЧ', time: '10 хв · 2 тижні тому', kudos: 1100, comments: 168 },
    { cat: 'Майстерня', title: 'Як я писала роман по 200 слів на день (і вижила)', author: 'Богдана Шум', avatar: 'БШ', time: '7 хв · 2 тижні тому', kudos: 487, comments: 73 },
    { cat: 'Розбір', title: 'Магічний реалізм по-українськи: відмінності від латиноамериканської традиції', author: 'Андрій Чорний', avatar: 'АЧ', time: '18 хв · 3 тижні тому', kudos: 712, comments: 102 },
  ];

  const tags = ['Майстерність', 'Рекомендації', 'Інтерв\'ю', 'Розбори', 'Жанри', 'Видавництво', 'Переклад'];
  const [activeTag, setActiveTag] = _useState_articles('Усі');

  return (
    <div style={{ flex: 1, overflow: 'auto', background: 'var(--bg-0)' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '24px 32px 80px' }}>
        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 11, color: 'var(--accent)', letterSpacing: '0.1em',
                          textTransform: 'uppercase', marginBottom: 10 }}>
            Damare · Записник
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 36, fontWeight: 500,
                        letterSpacing: '-0.02em', marginBottom: 6 }}>
            Есеї, розбори й розмови про літературу
          </h1>
          <div style={{ fontSize: 14, color: 'var(--fg-3)', maxWidth: 540 }}>
            Тексти від авторів, читачів і редакції. Читайте, обговорюйте, пропонуйте свої.
          </div>
        </div>

        {/* Tag filter */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 28, overflowX: 'auto', paddingBottom: 4 }}>
          {['Усі', ...tags].map(t => (
            <button key={t} onClick={() => setActiveTag(t)}
                    style={{ flexShrink: 0, padding: '6px 14px', fontSize: 12.5,
                              borderRadius: 999, whiteSpace: 'nowrap',
                              background: activeTag === t ? 'var(--fg-0)' : 'var(--bg-1)',
                              color: activeTag === t ? 'var(--bg-0)' : 'var(--fg-1)',
                              border: '1px solid ' + (activeTag === t ? 'var(--fg-0)' : 'var(--line-soft)'),
                              fontWeight: activeTag === t ? 600 : 400 }}>
              {t}
            </button>
          ))}
        </div>

        {/* Featured article */}
        <article style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 32,
                            padding: 28, marginBottom: 40,
                            background: 'linear-gradient(180deg, var(--bg-1) 0%, var(--bg-0) 100%)',
                            border: '1px solid var(--line-soft)', borderRadius: 'var(--r-lg)' }}>
          <div>
            <div style={{ fontSize: 11, color: 'var(--accent)', letterSpacing: '0.1em',
                            textTransform: 'uppercase', marginBottom: 12 }}>
              Есей тижня
            </div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 30, fontWeight: 500,
                          lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: 12 }}>
              {featured.title}
            </h2>
            <p style={{ fontSize: 14.5, lineHeight: 1.6, color: 'var(--fg-2)', margin: '0 0 18px',
                         maxWidth: 480 }}>
              {featured.subtitle}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
              <div className="avatar" style={{ width: 28, height: 28 }}>{featured.avatar}</div>
              <div>
                <div style={{ fontSize: 13, color: 'var(--fg-0)', fontWeight: 500 }}>{featured.author}</div>
                <div style={{ fontSize: 11.5, color: 'var(--fg-3)' }}>{featured.time}</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn primary">Читати <Icon name="arrow-r" size={13} /></button>
              <button className="btn"><Icon name="bookmark" size={13} /> Зберегти</button>
              <span className="stat-row" style={{ marginLeft: 8, fontSize: 12 }}>
                <span className="stat"><Icon name="heart" size={12} />{featured.kudos}</span>
                <span className="stat"><Icon name="message" size={12} />{featured.comments}</span>
              </span>
            </div>
          </div>
          <div style={{ position: 'relative', borderRadius: 'var(--r-md)', overflow: 'hidden',
                          background: 'var(--bg-2)', minHeight: 220 }}>
            <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice"
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
              <rect width="400" height="300" fill="oklch(0.22 0.02 60)"/>
              {[...Array(20)].map((_, i) => (
                <line key={i} x1={i * 22} y1="0" x2={i * 22 + 80} y2="300"
                      stroke="var(--accent)" strokeOpacity="0.06" strokeWidth="1"/>
              ))}
              <circle cx="200" cy="150" r="80" fill="var(--accent)" opacity="0.15"/>
              <circle cx="200" cy="150" r="40" fill="var(--accent)" opacity="0.85"/>
              <text x="200" y="158" fontFamily="Newsreader, Georgia, serif" fontSize="48"
                     textAnchor="middle" fill="var(--bg-0)">«</text>
            </svg>
          </div>
        </article>

        {/* Article grid */}
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 16 }}>
          <h2 style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.06em',
                        textTransform: 'uppercase', color: 'var(--fg-3)' }}>
            Свіже
          </h2>
          <Segmented options={['Найсвіжіші', 'Найпопулярніші', 'Найчитаніші']} value="Найсвіжіші" small />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
          {articles.map((a, i) => (
            <article key={i} style={{ padding: 20,
                                        background: 'var(--bg-1)', border: '1px solid var(--line-soft)',
                                        borderRadius: 'var(--r-lg)', cursor: 'pointer',
                                        display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <span className="tag" style={{ fontSize: 10, padding: '2px 8px' }}>{a.cat}</span>
                {a.official && (
                  <span style={{ fontSize: 10, fontWeight: 600, padding: '2px 6px',
                                  background: 'var(--accent-soft)', color: 'var(--accent)',
                                  borderRadius: 999, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                    Редакція
                  </span>
                )}
              </div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 19, fontWeight: 500,
                            lineHeight: 1.25, marginBottom: 12, color: 'var(--fg-0)' }}>
                {a.title}
              </h3>
              <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
                <div className="avatar" style={{ width: 22, height: 22, fontSize: 10 }}>{a.avatar}</div>
                <span style={{ fontSize: 12, color: 'var(--fg-2)' }}>{a.author}</span>
                <span style={{ fontSize: 11.5, color: 'var(--fg-3)', marginLeft: 'auto' }}>{a.time}</span>
              </div>
              <div className="stat-row" style={{ fontSize: 11, marginTop: 10 }}>
                <span className="stat"><Icon name="heart" size={11} />{a.kudos}</span>
                <span className="stat"><Icon name="message" size={11} />{a.comments}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

window.ArticlesScreen = ArticlesScreen;
