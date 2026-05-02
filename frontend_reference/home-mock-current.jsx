/* Faithful port of templates/home/home.html — the CURRENT implementation.
   Don't edit this file when iterating on revisions; it's the baseline. */

function HomeCurrent() {
  return (
    <>
      <MockNavbar />
      <div className="px-4 md:px-7 py-6 pb-12">

        {/* Continue reading */}
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

        {/* Fresh from follows */}
        <section className="mb-9">
          <div className="flex items-baseline justify-between mb-3">
            <h2 className="text-[12.5px] font-semibold tracking-[0.06em] uppercase text-fg-3 inline-flex items-center gap-1.5">
              <MockIcon name="rss" size={11}/> Свіже від ваших
            </h2>
            <a href="#" className="text-[11.5px] text-fg-3 hover:text-fg-1">Стрічка →</a>
          </div>
          <div className="flex flex-col bg-bg-1 border border-line-soft rounded-lg overflow-hidden">
            {MOCK_FRESH.map((u, i) => (
              <a key={i} href="#" className={`flex items-center gap-3 px-4 py-3 hover:bg-bg-2/50 transition ${i < MOCK_FRESH.length - 1 ? 'border-b border-line-soft' : ''}`}>
                <div className="w-7 h-7 shrink-0 rounded-md bg-bg-2 flex items-center justify-center text-accent">
                  <MockIcon name="rss" size={13}/>
                </div>
                <div className="flex-1 min-w-0 flex items-center gap-2 text-[12.5px] flex-wrap">
                  {u.team && (
                    <>
                      <span className="inline-flex items-center gap-1.5 shrink-0">
                        <span className="avatar w-4 h-4 text-[9px]">{u.team.avatar}</span>
                        <span className="text-fg-2">{u.team.name}</span>
                      </span>
                      <span className="text-fg-4 shrink-0">·</span>
                    </>
                  )}
                  <span className="text-fg-1 truncate">
                    <span className="text-fg-0 font-medium">розділ {u.chapter_no}</span>
                    {u.chapter_title && ` «${u.chapter_title}»`} у {' '}
                    <span className="text-accent">{u.novel.title.length > 40 ? u.novel.title.slice(0, 40) + '…' : u.novel.title}</span>
                  </span>
                </div>
                <span className="text-[11px] text-fg-3 shrink-0 whitespace-nowrap">{u.time}</span>
              </a>
            ))}
          </div>
        </section>

        {/* Editorial pick — current */}
        <section className="mb-9">
          <div className="flex items-baseline justify-between mb-3">
            <h2 className="text-[12.5px] font-semibold tracking-[0.06em] uppercase text-fg-3 inline-flex items-center gap-1.5">
              <MockIcon name="sparkle" size={11}/> Редакторський вибір
            </h2>
          </div>
          <a href="#" className="block">
            <div className="relative cursor-pointer min-h-[180px] rounded-lg overflow-hidden border border-line-soft">
              <div className="absolute inset-0">
                <MockCover title={MOCK_FEATURED.title} seed={MOCK_FEATURED.id} showText={false}/>
              </div>
              <div className="absolute inset-0" style={{ background: 'linear-gradient(110deg, rgba(14,17,14,0.95) 0%, rgba(14,17,14,0.7) 50%, rgba(14,17,14,0.4) 100%)' }}></div>
              <div className="relative flex flex-col justify-end p-6 max-w-[560px] min-h-[180px]">
                <span className="text-[10px] font-semibold tracking-[0.1em] uppercase text-accent mb-1.5">Тиждень тому · в тренді</span>
                <h3 className="font-serif text-2xl font-medium leading-[1.1] mb-1.5 text-white line-clamp-2">{MOCK_FEATURED.title}</h3>
                <div className="text-white/70 text-[12px] mb-2">{MOCK_FEATURED.author} · {MOCK_FEATURED.chapter_count} розділів</div>
                <p className="text-white/85 text-[13px] leading-[1.5] m-0 line-clamp-2">{MOCK_FEATURED.summary}</p>
              </div>
            </div>
          </a>
        </section>

        {/* Trending */}
        <section className="mb-9">
          <div className="flex items-baseline justify-between mb-3.5">
            <h2 className="text-[12.5px] font-semibold tracking-[0.06em] uppercase text-fg-3 inline-flex items-center gap-1.5">
              <MockIcon name="flame" size={11}/> Зараз у тренді
            </h2>
            <a href="#" className="text-[11.5px] text-fg-3 hover:text-fg-1">Більше →</a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {MOCK_TRENDING.map(n => trendingCard(n, { keepOriginalBadge: true }))}
          </div>
        </section>

        {/* Recently updated */}
        <section>
          <div className="flex items-baseline justify-between mb-3.5">
            <h2 className="text-[12.5px] font-semibold tracking-[0.06em] uppercase text-fg-3">Нещодавно оновлені</h2>
            <a href="#" className="text-[11.5px] text-fg-3 hover:text-fg-1">Більше →</a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {MOCK_RECENT.map(n => trendingCard(n, { keepOriginalBadge: true }))}
          </div>
        </section>

      </div>
    </>
  );
}

window.HomeCurrent = HomeCurrent;
