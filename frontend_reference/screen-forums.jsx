// Screen 9 — Forums / community discussions
function ForumsScreen() {
  const categories = [
    { id: 'craft', name: 'Майстерня', icon: 'pen', desc: 'Поради, чернетки, beta-readers', threads: 1240, color: '#e8c547' },
    { id: 'recs', name: 'Рекомендації', icon: 'sparkle', desc: 'Що почитати? Чим поділитися?', threads: 2890, color: '#9bb89a' },
    { id: 'fandoms', name: 'Фендоми', icon: 'flame', desc: 'Обговорення, теорії, шипи', threads: 4120, color: '#d97a5a' },
    { id: 'lounge', name: 'Світлиця', icon: 'message', desc: 'Поза темою — про життя', threads: 980, color: '#7c9eb2' },
    { id: 'help', name: 'Допомога', icon: 'flag', desc: 'Технічні питання, репорти', threads: 320, color: '#a594d9' },
    { id: 'meta', name: 'Мета', icon: 'globe', desc: 'Про сайт, правила, ідеї', threads: 240, color: '#bf8ce0' },
  ];

  const threads = [
    {
      cat: 'Майстерня', user: 'архіваріус', avatar: 'АР',
      title: 'Як ви знаходите час писати, коли робота й діти?',
      preview: 'Я пишу шість років, і останній рік — суцільна боротьба за 30 хвилин на день. Поділіться, будь ласка, своїми лайфхаками…',
      replies: 84, views: 1240, kudos: 47, time: '2 год тому', pinned: true,
    },
    {
      cat: 'Рекомендації', user: 'оля_читає', avatar: 'ОЧ',
      title: 'Український магічний реалізм — що ще, окрім Шкляра?',
      preview: 'Прочитала «Сім зимових ночей» Калини Левчук і захотіла ще таких атмосферних історій. Бажано українською. Хочу зимового, тихого…',
      replies: 142, views: 3120, kudos: 89, time: '5 год тому', tags: ['магічний реалізм', 'затишне'],
    },
    {
      cat: 'Фендоми', user: 'mariana_b', avatar: 'МБ',
      title: '[Теорія] Хто насправді писав листи в «Сім зимових ночей»? (СПОЙЛЕРИ до 14 розділу)',
      preview: 'Ок, я перечитала перші 14 розділів двічі. У мене є теорія, і вона включає як мінімум три часові лінії…',
      replies: 268, views: 8400, kudos: 312, time: 'вчора', hot: true,
    },
    {
      cat: 'Майстерня', user: 'нічний_кіт', avatar: 'НК',
      title: 'Шукаю beta-reader для повільного романтичного фентезі (українська, 80k слів)',
      preview: 'Працюю над романом про відьму-картографа. Є чернетки 12 розділів. Шукаю когось, кому близькі повільне горіння та…',
      replies: 23, views: 410, kudos: 12, time: '8 год тому',
    },
    {
      cat: 'Світлиця', user: 'таня_літ', avatar: 'ТЛ',
      title: 'Що ви слухаєте під час письма?',
      preview: 'Я останній місяць пишу під радіо «Промінь» вночі. Це майже містичний досвід. А ви?',
      replies: 91, views: 1820, kudos: 34, time: '2 дні тому',
    },
  ];

  return (
    <div style={{ flex: 1, overflow: 'auto', background: 'var(--bg-0)' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '24px 32px 80px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 28 }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 32, fontWeight: 500,
                          letterSpacing: '-0.02em', marginBottom: 4 }}>
              Громада
            </h1>
            <div style={{ fontSize: 13, color: 'var(--fg-3)' }}>
              9 820 учасників онлайн · 14 200 тем за тиждень
            </div>
          </div>
          <button className="btn primary"><Icon name="plus" size={13} /> Нова тема</button>
        </div>

        {/* Categories grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 32 }}>
          {categories.map(c => (
            <div key={c.id} style={{ padding: 16, background: 'var(--bg-1)',
                                       border: '1px solid var(--line-soft)',
                                       borderRadius: 'var(--r-lg)', cursor: 'pointer',
                                       display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <div style={{ width: 36, height: 36, borderRadius: 'var(--r-md)',
                              background: c.color + '22', color: c.color,
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              flexShrink: 0 }}>
                <Icon name={c.icon} size={17} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--fg-0)', marginBottom: 2 }}>
                  {c.name}
                </div>
                <div style={{ fontSize: 12, color: 'var(--fg-3)', lineHeight: 1.45, marginBottom: 6 }}>
                  {c.desc}
                </div>
                <div style={{ fontSize: 11, color: 'var(--fg-4)', fontVariantNumeric: 'tabular-nums' }}>
                  {c.threads.toLocaleString('uk-UA')} тем
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Active discussions */}
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 }}>
          <h2 style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.06em',
                        textTransform: 'uppercase', color: 'var(--fg-3)' }}>
            Активні обговорення
          </h2>
          <Segmented options={['Усі', 'За підпискою', 'Активні']} value="Усі" small />
        </div>

        <div style={{ borderRadius: 'var(--r-lg)', overflow: 'hidden',
                        border: '1px solid var(--line-soft)', background: 'var(--bg-1)' }}>
          {threads.map((t, i) => (
            <div key={i} style={{ display: 'flex', gap: 14, padding: 16,
                                    borderBottom: i === threads.length - 1 ? 0 : '1px solid var(--line-soft)',
                                    cursor: 'pointer' }}>
              <div className="avatar" style={{ width: 36, height: 36, flexShrink: 0 }}>{t.avatar}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <span className="tag" style={{ fontSize: 10, padding: '2px 8px' }}>{t.cat}</span>
                  {t.pinned && (
                    <span style={{ fontSize: 10, color: 'var(--accent)',
                                    display: 'flex', alignItems: 'center', gap: 3 }}>
                      <Icon name="bookmark-fill" size={10} /> Закріплено
                    </span>
                  )}
                  {t.hot && (
                    <span style={{ fontSize: 10, color: '#d97a5a',
                                    display: 'flex', alignItems: 'center', gap: 3 }}>
                      <Icon name="flame" size={10} /> Гаряче
                    </span>
                  )}
                </div>
                <div style={{ fontSize: 14.5, fontWeight: 500, color: 'var(--fg-0)',
                                lineHeight: 1.3, marginBottom: 4 }}>
                  {t.title}
                </div>
                <p style={{ fontSize: 12.5, color: 'var(--fg-2)', lineHeight: 1.55, margin: '0 0 8px',
                              display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {t.preview}
                </p>
                <div className="stat-row" style={{ fontSize: 11 }}>
                  <span style={{ color: 'var(--fg-2)' }}>{t.user}</span>
                  <span className="stat"><Icon name="message" size={11} />{t.replies}</span>
                  <span className="stat"><Icon name="eye" size={11} />{t.views.toLocaleString('uk-UA')}</span>
                  <span className="stat"><Icon name="heart" size={11} />{t.kudos}</span>
                  <span style={{ marginLeft: 'auto', color: 'var(--fg-3)' }}>{t.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

window.ForumsScreen = ForumsScreen;
