/* Hot-now home — replaces "Редакторський вибір" with "Гаряче зараз".
   Layout: 2 rows × 2 columns of horizontal cards (cover left, content right).
   Each card carries a single LIVE signal, color-coded by kind. */

const SIGNAL_STYLES = {
  burst:    { color: 'text-accent', bg: 'bg-accent-soft', icon: 'flame', label: 'оновлення' },
  momentum: { color: 'text-info',   bg: 'bg-info/15',     icon: 'trend', label: 'тренд' },
  storm:    { color: 'text-love',   bg: 'bg-love/15',     icon: 'message', label: 'обговорення' },
  finale:   { color: 'text-fg-0',   bg: 'bg-bg-3',        icon: 'check', label: 'завершено' },
};

function HotIcon({ name, size = 12 }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' };
  switch (name) {
    case 'flame':   return <svg {...common}><path d="M12 21c4 0 7-3 7-7 0-3-3-5-3-9 0 0-3 1-4 5-1-2-3-2-3-4 0 0-4 3-4 8s3 7 7 7Z"/></svg>;
    case 'trend':   return <svg {...common}><path d="M3 17 10 10l4 4 7-9"/><path d="M14 5h7v7"/></svg>;
    case 'message': return <svg {...common}><path d="M4 5h16v11H8l-4 4V5Z"/></svg>;
    case 'check':   return <svg {...common}><circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/></svg>;
    default: return null;
  }
}

function HotCard({ item }) {
  const sig = SIGNAL_STYLES[item.signal_kind];
  return (
    <a href="#" className="group block">
      <article className="flex gap-4 p-4 bg-bg-1 border border-line-soft rounded-md hover:border-line transition h-full">
        {/* Cover with origin badge */}
        <div className="cover w-[100px] shrink-0">
          <MockCover title={item.title} seed={item.id} showText={false} />
          {item.is_translation ? (
            <span className="absolute top-1.5 left-1.5 text-[9px] font-mono font-semibold tracking-[0.04em] uppercase bg-black/55 text-white px-[6px] py-[2px]" style={{ backdropFilter: 'blur(6px)' }}>
              {item.source_lang.toUpperCase()}
            </span>
          ) : (
            <span className="absolute top-1.5 left-1.5 text-[9px] font-mono font-semibold tracking-[0.04em] uppercase bg-accent text-accent-fg px-[6px] py-[2px]">
              ОРИГ
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 flex flex-col">
          {/* SIGNAL — what makes this card hot, top of stack */}
          <div className={`inline-flex items-center gap-1.5 self-start px-2 py-[3px] mb-2 ${sig.bg} ${sig.color} rounded-sm whitespace-nowrap max-w-full overflow-hidden`}>
            <HotIcon name={sig.icon} size={11} />
            <span className="font-mono text-[10.5px] font-semibold tracking-[0.02em] whitespace-nowrap">{item.signal_label}</span>
            <span className="text-[10.5px] opacity-75 whitespace-nowrap truncate">· {item.signal_detail}</span>
          </div>

          {/* Title */}
          <h3 className="font-serif text-[16px] leading-[1.2] text-fg-0 mb-1 line-clamp-2">
            {item.title}
          </h3>

          {/* Author / team / fandom */}
          <div className="text-[11.5px] text-fg-3 mb-2 truncate">
            {item.fandom ? (
              <>
                <span className="text-fg-2">{item.author_or_team}</span>
                <span className="text-fg-4 mx-1.5">·</span>
                <span className="tag fandom" style={{ fontSize: '9.5px', padding: '1px 5px', verticalAlign: 'baseline' }}>{item.fandom}</span>
              </>
            ) : (
              <span className="text-fg-2">{item.author_or_team}</span>
            )}
          </div>

          {/* Excerpt — italic serif, the actual hook */}
          <p className="font-serif italic text-[12.5px] leading-[1.45] text-fg-2 m-0 line-clamp-2 mb-2">
            «{item.excerpt}»
          </p>

          {/* Footer: chapter signature */}
          <div className="mt-auto pt-1 flex items-baseline gap-2 text-[11px] text-fg-3 font-mono">
            <span className="tabular-nums">розділ&nbsp;{item.last_chapter_no}/{item.chapter_count}</span>
            <span className="text-fg-4">·</span>
            <span className="text-fg-2 truncate">«{item.last_chapter_title}»</span>
          </div>
        </div>
      </article>
    </a>
  );
}

function TopWeekCard({ item }) {
  const trendColor = item.trend.startsWith('↑') ? 'text-accent'
                   : item.trend.startsWith('↓') ? 'text-fg-3'
                   : item.trend === 'NEW'         ? 'text-love'
                   : 'text-fg-3';
  return (
    <a href="#" className="group block w-full">
      <div className="relative cover w-full mb-2">
        <MockCover title={item.title} seed={item.id} showText={false} />
        <span className="absolute top-1 left-1 px-1.5 py-[1px] bg-black/65 text-white text-[10px] font-mono font-semibold tabular-nums" style={{ backdropFilter: 'blur(4px)' }}>
          #{item.rank}
        </span>
        {item.is_translation && (
          <span className="absolute top-1 right-1 text-[8.5px] font-mono font-semibold tracking-[0.04em] uppercase bg-black/55 text-white px-1.5 py-[1px]" style={{ backdropFilter: 'blur(6px)' }}>
            {item.source_lang.toUpperCase()}
          </span>
        )}
      </div>
      <div className="flex items-baseline gap-1.5 mb-0.5 text-[11px] font-mono tabular-nums">
        <span className="text-accent font-semibold">★ {item.score.toFixed(1)}</span>
        <span className="text-fg-4">·</span>
        <span className="text-fg-3">{item.votes >= 1000 ? (item.votes/1000).toFixed(1)+'k' : item.votes}</span>
        <span className={`ml-auto text-[10px] ${trendColor}`}>{item.trend}</span>
      </div>
      <div className="font-serif text-[12.5px] leading-[1.25] text-fg-0 line-clamp-2 mb-0.5 group-hover:text-accent transition">{item.title}</div>
      <div className="text-[10.5px] text-fg-3 truncate">{item.author}</div>
    </a>
  );
}

function HotHome() {
  return (
    <>
      <MockNavbar />
      <div className="px-4 md:px-7 py-6 pb-12">

        {/* ═══ TOP-10 ОГЛЯД ═══ */}
        <section className="mb-7">
          <div className="flex items-baseline justify-between gap-4 mb-3.5">
            <h2 className="text-[12.5px] font-semibold tracking-[0.06em] uppercase text-fg-3 inline-flex items-baseline gap-1.5">
              <span className="redact-bar text-accent" style={{ height: '0.7em' }}></span>
              <span className="whitespace-nowrap">Топ тижня</span>
              <span className="text-fg-4 normal-case font-normal tracking-normal text-[11px] ml-1 hidden sm:inline">· за оцінками читачів</span>
            </h2>
            <a href="#" className="text-[11.5px] text-fg-3 hover:text-fg-1 whitespace-nowrap">Увесь рейтинг →</a>
          </div>
          <div className="grid grid-cols-7 gap-3">
            {TOP_WEEK.slice(0, 7).map(item => <TopWeekCard key={item.id} item={item} />)}
          </div>
        </section>

        {/* ═══ CONTINUE READING — slim bar ═══ */}
        <section className="mb-7">
          <div className="flex items-baseline justify-between mb-3">
            <h2 className="text-[12.5px] font-semibold tracking-[0.06em] uppercase text-fg-3">
              Продовжити читати · {MOCK_CONTINUE.length}
            </h2>
            <a href="#" className="text-[11.5px] text-fg-3 hover:text-fg-1">Уся бібліотека →</a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {MOCK_CONTINUE.map(item => (
              <a key={item.novel.id} href="#" className="flex gap-3 p-3 bg-bg-1 border border-line-soft rounded-md hover:border-line transition">
                <div className="cover w-[60px] shrink-0">
                  <MockCover title={item.novel.title} seed={item.novel.id} showText={false} />
                </div>
                <div className="flex-1 min-w-0 flex flex-col">
                  <div className="text-[10px] text-fg-3 uppercase tracking-[0.06em] mb-1">
                    Розділ {item.chapter_no} з {item.novel.chapter_count}
                  </div>
                  <div className="font-serif text-[14px] leading-[1.25] text-fg-0 mb-1 line-clamp-2">{item.novel.title}</div>
                  <div className="text-[11px] text-fg-3 truncate">{item.novel.author}</div>
                  <div className="flex items-center gap-2 mt-auto pt-2">
                    <div className="flex-1 h-0.5 bg-bg-3 rounded-full overflow-hidden">
                      <div className="h-full bg-accent rounded-full" style={{ width: `${item.progress}%` }}></div>
                    </div>
                    <span className="text-[10px] text-fg-3 tabular-nums">{item.progress}%</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ═══════════════ HOT NOW — replaces editorial pick ═══════════════ */}
        <section className="mb-9">
          <div className="flex items-baseline justify-between gap-4 mb-3.5">
            <h2 className="text-[12.5px] font-semibold tracking-[0.06em] uppercase text-fg-3 inline-flex items-baseline gap-1.5 min-w-0">
              <span className="redact-bar text-love" style={{ height: '0.7em' }}></span>
              <span className="whitespace-nowrap">Гаряче зараз</span>
              <span className="text-fg-4 normal-case font-normal tracking-normal text-[11px] ml-1 truncate hidden sm:inline">· що відбувається прямо зараз</span>
            </h2>
            <span className="text-[11px] text-fg-3 font-mono tabular-nums whitespace-nowrap shrink-0">оновлено 2&nbsp;хв&nbsp;тому</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {HOT_NOW.map(item => <HotCard key={item.id} item={item} />)}
          </div>
        </section>

        {/* Fresh from follows + Recent comments — split 2 columns, items-stretch matches heights */}
        <section className="mb-9 grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
          {/* LEFT — Свіже від ваших */}
          <div className="flex flex-col">
            <div className="flex items-baseline justify-between mb-3">
              <h2 className="text-[12.5px] font-semibold tracking-[0.06em] uppercase text-fg-3 inline-flex items-center gap-1.5">
                <MockIcon name="rss" size={11}/> Свіже від ваших
              </h2>
              <a href="#" className="text-[11.5px] text-fg-3 hover:text-fg-1">Стрічка →</a>
            </div>
            <div className="flex-1 flex flex-col bg-bg-1 border border-line-soft rounded-lg overflow-hidden">
              {MOCK_FRESH.map((u, i) => (
                <a key={i} href="#" className={`flex-1 flex items-center gap-3 px-3.5 py-3 hover:bg-bg-2/50 transition ${i < MOCK_FRESH.length - 1 ? 'border-b border-line-soft' : ''}`}>
                  <div className="w-7 h-7 shrink-0 rounded-md bg-bg-2 flex items-center justify-center text-accent">
                    <MockIcon name="rss" size={13}/>
                  </div>
                  <div className="flex-1 min-w-0 text-[12.5px] leading-snug">
                    {u.team && (
                      <div className="inline-flex items-center gap-1.5 mr-1.5">
                        <span className="avatar w-4 h-4 text-[9px]">{u.team.avatar}</span>
                        <span className="text-fg-2">{u.team.name}</span>
                        <span className="text-fg-4">·</span>
                      </div>
                    )}
                    <span className="text-fg-1">
                      <span className="text-fg-0 font-medium">розділ {u.chapter_no}</span>
                      {' у '}
                      <span className="text-accent">{u.novel.title.length > 32 ? u.novel.title.slice(0, 32) + '…' : u.novel.title}</span>
                    </span>
                  </div>
                  <span className="text-[11px] text-fg-3 shrink-0 whitespace-nowrap">{u.time}</span>
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT — Свіжі коментарі */}
          <div className="flex flex-col">
            <div className="flex items-baseline justify-between mb-3">
              <h2 className="text-[12.5px] font-semibold tracking-[0.06em] uppercase text-fg-3 inline-flex items-center gap-1.5">
                <MockIcon name="message" size={11}/> Свіжі коментарі
              </h2>
              <a href="#" className="text-[11.5px] text-fg-3 hover:text-fg-1">Усі →</a>
            </div>
            <div className="flex-1 flex flex-col bg-bg-1 border border-line-soft rounded-lg overflow-hidden">
              {RECENT_COMMENTS.map((c, i) => (
                <a key={i} href="#" className={`flex-1 flex gap-3 px-3.5 py-3 hover:bg-bg-2/50 transition ${i < RECENT_COMMENTS.length - 1 ? 'border-b border-line-soft' : ''}`}>
                  <span className="avatar w-7 h-7 text-[10px] shrink-0">{c.user.avatar}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-1.5 mb-0.5 text-[11.5px] flex-wrap">
                      <span className="text-fg-1 font-medium truncate">@{c.user.name}</span>
                      <span className="text-fg-4">→</span>
                      <span className="text-accent truncate min-w-0">«{c.novel_title}»</span>
                      <span className="text-fg-4 font-mono">·</span>
                      <span className="text-fg-3 font-mono tabular-nums">р. {c.chapter_no}</span>
                    </div>
                    <p className="font-serif text-[12.5px] leading-[1.45] text-fg-1 m-0 line-clamp-2">{c.body}</p>
                    <div className="flex items-center gap-3 mt-1.5 text-[10.5px] text-fg-3 font-mono">
                      <span className="inline-flex items-center gap-1"><MockIcon name="heart" size={10}/>{c.kudos}</span>
                      <span>·</span>
                      <span>{c.time}</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Trending */}
        <section className="mb-9">
          <div className="flex items-baseline justify-between mb-3.5">
            <h2 className="text-[12.5px] font-semibold tracking-[0.06em] uppercase text-fg-3 inline-flex items-center gap-1.5">
              <MockIcon name="flame" size={11}/> У тренді цього тижня
            </h2>
            <a href="#" className="text-[11.5px] text-fg-3 hover:text-fg-1">Більше →</a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {MOCK_TRENDING.map(n => trendingCard(n, { keepOriginalBadge: true }))}
          </div>
        </section>

        {/* Recently updated */}
        <section className="mb-9">
          <div className="flex items-baseline justify-between mb-3.5">
            <h2 className="text-[12.5px] font-semibold tracking-[0.06em] uppercase text-fg-3">Нещодавно оновлені</h2>
            <a href="#" className="text-[11.5px] text-fg-3 hover:text-fg-1">Більше →</a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {MOCK_RECENT.map(n => trendingCard(n, { keepOriginalBadge: true }))}
          </div>
        </section>

        {/* ═══ FOOTER BAND — publish + suggest ═══ */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <a href="#" className="flex items-center gap-4 p-5 bg-bg-1 border border-line-soft rounded-lg hover:border-accent transition group">
            <div className="w-10 h-10 shrink-0 rounded-md bg-accent-soft text-accent flex items-center justify-center">
              <MockIcon name="flame" size={18}/>
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-serif text-[15px] text-fg-0 mb-0.5 group-hover:text-accent transition">Опублікуйте свій твір</div>
              <div className="text-[12px] text-fg-3 leading-snug">Оригінальна проза, переклад, фанфікшн — Damare відкритий для всіх.</div>
            </div>
            <span className="text-fg-3 group-hover:text-accent transition">→</span>
          </a>
          <a href="#" className="flex items-center gap-4 p-5 bg-bg-1 border border-line-soft rounded-lg hover:border-line transition group">
            <div className="w-10 h-10 shrink-0 rounded-md bg-bg-2 text-fg-1 flex items-center justify-center">
              <MockIcon name="sparkle" size={18}/>
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-serif text-[15px] text-fg-0 mb-0.5">Не знайшли улюблений твір?</div>
              <div className="text-[12px] text-fg-3 leading-snug">Запропонуйте книжку або переклад — передамо перекладацьким командам.</div>
            </div>
            <span className="text-fg-3 group-hover:text-fg-1 transition">→</span>
          </a>
        </section>

      </div>

      {/* ═══ FOOTER ═══ */}
      <footer className="border-t border-line-soft mt-4">
        <div className="px-4 md:px-7 py-5 flex flex-wrap items-center gap-x-6 gap-y-3 text-[12px] text-fg-3">
          <a href="#" className="hover:text-fg-1 transition">Правила</a>
          <a href="#" className="hover:text-fg-1 transition">Правовласникам</a>
          <a href="#" className="hover:text-fg-1 transition inline-flex items-center gap-1.5">
            <span className="text-love"><MockIcon name="heart" size={12}/></span>
            Підтримати нас
          </a>
          <div className="flex items-center gap-4 ml-auto">
            <a href="#" aria-label="Telegram" className="hover:text-fg-1 transition"><MockIcon name="send" size={14}/></a>
            <a href="#" aria-label="Discord" className="hover:text-fg-1 transition"><MockIcon name="message" size={14}/></a>
            <a href="#" aria-label="GitHub" className="hover:text-fg-1 transition"><MockIcon name="github" size={14}/></a>
            <span className="text-fg-4 font-mono tabular-nums text-[11.5px] ml-1">© 2026 Damare</span>
          </div>
        </div>
      </footer>
    </>
  );
}

window.HotHome = HotHome;
