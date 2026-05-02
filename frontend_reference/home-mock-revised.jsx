/* Revised home — applies the four changes from the recommendations brief.
   Each section that diverges from the current is marked with [CHANGE-N]. */

function HomeRevised() {
  return (
    <>
      <MockNavbar />
      <div className="px-4 md:px-7 py-6 pb-12">

        {/* ───── [CHANGE 3] Continue reading — more weight ───── */}
        <section className="mb-7 relative">
          <span className="change-mark">3</span>
          <div className="flex items-baseline justify-between mb-3">
            <h2 className="text-[12.5px] font-semibold tracking-[0.06em] uppercase text-fg-3">
              Продовжити читати · {MOCK_CONTINUE.length}
            </h2>
            <a href="#" className="text-[11.5px] text-fg-3 hover:text-fg-1">Уся бібліотека →</a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {MOCK_CONTINUE.map(item => {
              const nearEnd = item.progress >= 80;
              return (
                <a key={item.novel.id} href="#" className="flex gap-3.5 p-3.5 bg-bg-1 border border-line-soft rounded-md hover:border-line transition">
                  {/* CHANGE: cover 60 → 76 (matches novel_card_list) */}
                  <div className="cover w-[76px] shrink-0">
                    <MockCover title={item.novel.title} seed={item.novel.id} showText={false} />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col">
                    {/* CHANGE: chapter line in mono on its own row, less floaty */}
                    <div className="font-mono text-[10px] text-fg-3 uppercase tracking-[0.08em] mb-1.5 tabular-nums">
                      Розділ {item.chapter_no} / {item.novel.chapter_count}
                    </div>
                    <div className="font-serif text-[15px] leading-[1.2] text-fg-0 mb-1 line-clamp-2">{item.novel.title}</div>
                    <div className="text-[11.5px] text-fg-3 truncate mb-auto">{item.novel.author}</div>
                    {/* CHANGE: "останній розділ" reward state on >80% */}
                    {nearEnd && (
                      <div className="font-mono text-[9.5px] text-accent uppercase tracking-[0.1em] mt-1.5 mb-0.5 inline-flex items-center gap-1">
                        <MockIcon name="check" size={10}/> останній розділ
                      </div>
                    )}
                    <div className="flex items-center gap-2 mt-1.5">
                      <div className={`flex-1 h-[3px] ${nearEnd ? 'bg-accent/15' : 'bg-bg-3'} rounded-full overflow-hidden`}>
                        <div className="h-full bg-accent rounded-full" style={{ width: `${item.progress}%` }}></div>
                      </div>
                      <span className="font-mono text-[10px] text-fg-3 tabular-nums">{item.progress}%</span>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </section>

        {/* ───── [CHANGE 2] Fresh from follows — properly social ───── */}
        <section className="mb-9 relative">
          <span className="change-mark">2</span>
          <div className="flex items-baseline justify-between mb-3">
            <h2 className="text-[12.5px] font-semibold tracking-[0.06em] uppercase text-fg-3 inline-flex items-center gap-1.5">
              <MockIcon name="rss" size={11}/> Свіже від ваших
            </h2>
            <a href="#" className="text-[11.5px] text-fg-3 hover:text-fg-1">Стрічка →</a>
          </div>
          <div className="flex flex-col bg-bg-1 border border-line-soft rounded-lg overflow-hidden">
            {MOCK_FRESH.map((u, i) => {
              const actor = u.team || u.author;
              const actorLabel = u.team ? u.team.name : u.author.name;
              const actorHandle = actor.handle;
              return (
                <a key={i} href="#" className={`flex gap-3 px-4 py-3.5 hover:bg-bg-2/50 transition ${i < MOCK_FRESH.length - 1 ? 'border-b border-line-soft' : ''}`}>
                  {/* CHANGE: real 32px rectangular avatar (matches .avatar component) */}
                  <span className="avatar w-8 h-8 text-[11px] shrink-0">{actor.avatar}</span>
                  <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                    {/* Top row: actor + action */}
                    <div className="flex items-baseline gap-1.5 text-[12.5px]">
                      <span className="text-fg-0 font-medium truncate">{actorLabel}</span>
                      <span className="text-fg-4 shrink-0 font-mono text-[10px]">@{actorHandle}</span>
                      <span className="text-fg-3 truncate">
                        {' · '}<span className="font-mono text-[11px] text-fg-2">розд. {u.chapter_no}</span>
                        {u.chapter_title && <> «<span className="text-fg-1">{u.chapter_title}</span>»</>}
                        {' у '}<span className="text-accent">{u.novel.title}</span>
                      </span>
                      <span className="ml-auto text-[10.5px] text-fg-4 shrink-0 whitespace-nowrap font-mono tabular-nums">{u.time}</span>
                    </div>
                    {/* CHANGE: serif excerpt — the row now carries actual signal */}
                    <p className="font-serif italic text-[12.5px] text-fg-2 leading-[1.45] line-clamp-1 m-0">
                      {u.excerpt}
                    </p>
                  </div>
                </a>
              );
            })}
          </div>
        </section>

        {/* ───── [CHANGE 1] Editorial pick — real anchor ───── */}
        <section className="mb-9 relative">
          <span className="change-mark">1</span>
          <div className="flex items-baseline justify-between mb-3">
            <h2 className="text-[12.5px] font-semibold tracking-[0.06em] uppercase text-fg-3 inline-flex items-center gap-1.5">
              <span className="redact-bar text-love" style={{ height: '0.7em' }}></span> Редакторський вибір
            </h2>
            <span className="font-mono text-[10.5px] text-fg-3 tracking-[0.06em] uppercase">тиждень {MOCK_FEATURED.week}</span>
          </div>
          {/* CHANGE: two-column composition — cover left, content right.
              Single warm color (love) used for the editorial mark. */}
          <a href="#" className="block">
            <article className="grid grid-cols-[140px_1fr] md:grid-cols-[170px_1fr] gap-5 md:gap-7 p-5 md:p-6 bg-bg-1 border border-line-soft hover:border-line transition rounded-md">
              <div className="cover">
                <MockCover title={MOCK_FEATURED.title} author={MOCK_FEATURED.author} seed={MOCK_FEATURED.id} />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-love mb-2 inline-flex items-center gap-1.5">
                  <MockIcon name="star" size={10}/> ОБРАНО · ВИПУСК {MOCK_FEATURED.week}
                </span>
                <h3 className="font-serif text-[26px] md:text-[28px] font-medium leading-[1.05] mb-2 text-fg-0">{MOCK_FEATURED.title}</h3>
                <div className="text-[12px] text-fg-3 mb-4">
                  <span className="text-fg-1">{MOCK_FEATURED.author}</span> · {MOCK_FEATURED.chapter_count} розділів · триває
                </div>
                {/* CHANGE: pulled quote in serif italic, hard left border in love */}
                <blockquote className="m-0 mb-4 pl-4 border-l-2 border-love/60">
                  <p className="font-serif italic text-[15px] leading-[1.45] text-fg-1 m-0">
                    «{MOCK_FEATURED.pull_quote}»
                  </p>
                </blockquote>
                {/* CHANGE: editor note — the human voice */}
                <div className="text-[12.5px] text-fg-2 leading-[1.55] m-0 mb-4 max-w-[60ch]">
                  <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-fg-3 mr-1.5">від редакції —</span>
                  {MOCK_FEATURED.editor_note}
                </div>
                <div className="mt-auto flex items-center gap-3">
                  <button className="btn primary sm">Читати з 1-го розділу <MockIcon name="arrow-r" size={11}/></button>
                  <button className="btn ghost sm">У бібліотеку</button>
                </div>
              </div>
            </article>
          </a>
        </section>

        {/* ───── [CHANGE 4] Trending — quieter cover badges ───── */}
        <section className="mb-9 relative">
          <span className="change-mark">4</span>
          <div className="flex items-baseline justify-between mb-3.5">
            <h2 className="text-[12.5px] font-semibold tracking-[0.06em] uppercase text-fg-3 inline-flex items-center gap-1.5">
              <MockIcon name="flame" size={11}/> Зараз у тренді
            </h2>
            <a href="#" className="text-[11.5px] text-fg-3 hover:text-fg-1">Більше →</a>
          </div>
          {/* CHANGE: keepOriginalBadge=false — strip "ОРИГ" from cover grid.
              Only translations show their language code; "Завершено" stays. */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {MOCK_TRENDING.map(n => trendingCard(n, { keepOriginalBadge: false }))}
          </div>
        </section>

        {/* Recently updated — same treatment as trending */}
        <section>
          <div className="flex items-baseline justify-between mb-3.5">
            <h2 className="text-[12.5px] font-semibold tracking-[0.06em] uppercase text-fg-3">Нещодавно оновлені</h2>
            <a href="#" className="text-[11.5px] text-fg-3 hover:text-fg-1">Більше →</a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {MOCK_RECENT.map(n => trendingCard(n, { keepOriginalBadge: false }))}
          </div>
        </section>

      </div>
    </>
  );
}

window.HomeRevised = HomeRevised;
