// Screen 8 — Chapter comments / discussion (deep thread)
const _useState_comments = React.useState;
function CommentsScreen() {
  const ch = READER_CHAPTER;
  return (
    <div style={{ flex: 1, overflow: 'auto', background: 'var(--bg-0)' }}>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '24px 32px 80px' }}>
        {/* Breadcrumbs / context */}
        <div style={{ fontSize: 12, color: 'var(--fg-3)', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
          <span>{ch.novel}</span>
          <Icon name="chevron-r" size={11} />
          <span>Розділ {ch.chapter_no}</span>
          <Icon name="chevron-r" size={11} />
          <span style={{ color: 'var(--fg-1)' }}>Обговорення</span>
        </div>

        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 500, marginBottom: 4 }}>
          {ch.title}
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
          <span style={{ fontSize: 13, color: 'var(--fg-2)' }}>
            <span style={{ color: 'var(--fg-0)', fontWeight: 600 }}>148</span> коментарів
          </span>
          <span style={{ fontSize: 13, color: 'var(--fg-2)' }}>
            <span style={{ color: 'var(--fg-0)', fontWeight: 600 }}>1.2k</span> kudos
          </span>
          <div style={{ flex: 1 }} />
          <Segmented options={['Найкращі', 'Найновіші', 'Автор']} value="Найкращі" small />
        </div>

        {/* Composer */}
        <div style={{ display: 'flex', gap: 12, padding: 14,
                        background: 'var(--bg-1)', border: '1px solid var(--line-soft)',
                        borderRadius: 'var(--r-lg)', marginBottom: 28 }}>
          <div className="avatar" style={{ width: 32, height: 32 }}>МК</div>
          <div style={{ flex: 1 }}>
            <textarea placeholder="Поділіться думкою про розділ…"
                      style={{ width: '100%', minHeight: 64, padding: 10,
                                background: 'var(--bg-0)', border: '1px solid var(--line-soft)',
                                borderRadius: 'var(--r-md)', color: 'var(--fg-1)',
                                fontSize: 13.5, lineHeight: 1.55, resize: 'vertical', outline: 'none' }} />
            <div style={{ display: 'flex', alignItems: 'center', marginTop: 8 }}>
              <div style={{ display: 'flex', gap: 4 }}>
                <button className="btn ghost icon sm"><Icon name="bold" size={13} /></button>
                <button className="btn ghost icon sm"><Icon name="italic" size={13} /></button>
                <button className="btn ghost icon sm"><Icon name="quote" size={13} /></button>
              </div>
              <span style={{ flex: 1, fontSize: 11, color: 'var(--fg-3)', marginLeft: 12 }}>
                Markdown підтримується · спойлери у &lt;spoiler&gt;
              </span>
              <button className="btn primary sm">
                <Icon name="send" size={12} /> Опублікувати
              </button>
            </div>
          </div>
        </div>

        {/* Thread list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <CommentThread
            user="архіваріус" avatar="АР" time="вчора" kudos={47}
            isAuthorReply={false} pinned={true}
            text={'Епістолярна форма використана геніально. Кожен лист — окремий жанр: то інтимний щоденниковий запис, то майже діловий протокол. І все це від однієї людини. Я ще не зустрічав, щоб така структура працювала так природно.'}
            replies={[
              {
                user: 'Калина Левчук', avatar: 'КЛ', isAuthor: true, time: '23 год тому', kudos: 32,
                text: 'Дуже дякую. Я вагалась цілий тиждень, чи не вийде штучно. Приємно знати, що ні 🤍',
              },
              {
                user: 'оля_читає', avatar: 'ОЧ', time: '12 год тому', kudos: 5,
                text: '+1 до цього. Третій лист — взагалі окрема історія в історії.',
              },
            ]}
          />

          <CommentThread
            user="оля_читає" avatar="ОЧ" time="2 год тому" kudos={23}
            text={'Господи, цей розділ просто розриває серце. Як ви це робите? Я тричі перечитала момент із сніжинкою на чорнилі, і три рази не змогла видихнути. Чекаю четверту главу як божевільна.'}
            replies={[]}
          />

          <CommentThread
            user="mariana_b" avatar="МБ" time="4 год тому" kudos={18}
            text={'<spoiler>Я зрозуміла, ким насправді була та жінка біля вокзалу!</spoiler> Перечитала перший розділ — все сходиться 🤯 Чи я надумую?'}
            spoiler
            replies={[
              {
                user: 'нічний_кіт', avatar: 'НК', time: '3 год тому', kudos: 7,
                text: 'Я думаю про те саме від другого розділу. Будемо чекати, чи Калина підтвердить 🙃',
              },
            ]}
          />

          <CommentThread
            user="нічний_кіт" avatar="НК" time="6 год тому" kudos={12}
            text={'Калино, дякую вам за це. Прочитала за вечір. Чекаю на наступну главу. Без зайвих слів.'}
            replies={[]}
          />
        </div>

        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <button className="btn">Завантажити ще 144 коментарі</button>
        </div>
      </div>
    </div>
  );
}

function CommentThread({ user, avatar, time, kudos, text, replies = [], pinned, isAuthor, spoiler }) {
  return (
    <div>
      <Comment user={user} avatar={avatar} time={time} kudos={kudos} text={text}
                pinned={pinned} isAuthor={isAuthor} spoiler={spoiler} />
      {replies.length > 0 && (
        <div style={{ marginLeft: 44, marginTop: 14, borderLeft: '2px solid var(--line-soft)',
                        paddingLeft: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>
          {replies.map((r, i) => (
            <Comment key={i} {...r} />
          ))}
        </div>
      )}
    </div>
  );
}

function Comment({ user, avatar, time, kudos, text, pinned, isAuthor, spoiler }) {
  const [revealed, setRevealed] = _useState_comments(!spoiler);
  return (
    <div style={{ display: 'flex', gap: 12 }}>
      <div className="avatar" style={{ width: 32, height: 32, flexShrink: 0,
              background: isAuthor ? 'var(--accent)' : 'var(--bg-3)',
              color: isAuthor ? 'var(--accent-fg)' : 'var(--fg-1)' }}>
        {avatar}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--fg-0)' }}>{user}</span>
          {isAuthor && (
            <span style={{ fontSize: 9.5, fontWeight: 600, padding: '2px 6px',
                            background: 'var(--accent-soft)', color: 'var(--accent)',
                            borderRadius: 999, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              Автор
            </span>
          )}
          {pinned && (
            <span style={{ fontSize: 10, color: 'var(--fg-3)', display: 'flex', alignItems: 'center', gap: 4 }}>
              <Icon name="bookmark-fill" size={10} /> Закріплено
            </span>
          )}
          <span style={{ fontSize: 11.5, color: 'var(--fg-3)' }}>· {time}</span>
        </div>
        {spoiler && !revealed ? (
          <button onClick={() => setRevealed(true)}
                  style={{ fontSize: 12, padding: '8px 12px',
                            background: 'var(--bg-2)', borderRadius: 'var(--r-md)',
                            color: 'var(--fg-2)', border: '1px solid var(--line-soft)' }}>
            ⚠ Спойлер · натисніть, щоб показати
          </button>
        ) : (
          <p style={{ fontSize: 13.5, lineHeight: 1.6, color: 'var(--fg-1)', margin: '0 0 8px',
                       textWrap: 'pretty' }}>
            {text.replace(/<\/?spoiler>/g, '')}
          </p>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 11.5, color: 'var(--fg-3)' }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--fg-2)' }}>
            <Icon name="heart" size={12} /> {kudos}
          </button>
          <button style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--fg-2)' }}>
            <Icon name="message" size={12} /> Відповісти
          </button>
          <button style={{ color: 'var(--fg-3)' }}>Поскаржитись</button>
        </div>
      </div>
    </div>
  );
}

window.CommentsScreen = CommentsScreen;
