/* Shared chrome — simplified navbar from templates/partials/navbar.html.
   Used identically in both current and revised panels so we compare
   only the body. */

function MockNavbar() {
  return (
    <nav className="border-b border-line-soft bg-bg-0 sticky top-0 z-20">
      <div className="px-4 md:px-6 h-12 flex items-center gap-3 md:gap-5">
        <a href="#" className="flex items-center gap-1 shrink-0">
          <span className="font-bold text-[16px] text-fg-0 tracking-tight">damare</span>
          <span className="redact-bar text-accent" style={{ height: '0.7em' }}></span>
        </a>
        <div className="hidden md:flex items-center gap-0.5 ml-2">
          <a href="#" className="px-2.5 py-1.5 rounded-md text-[12.5px] font-medium bg-bg-2 text-fg-0">Стрічка</a>
          <a href="#" className="px-2.5 py-1.5 rounded-md text-[12.5px] font-medium text-fg-2">Огляд</a>
          <a href="#" className="px-2.5 py-1.5 rounded-md text-[12.5px] font-medium text-fg-2">Бібліотека</a>
          <a href="#" className="px-2.5 py-1.5 rounded-md text-[12.5px] font-medium text-fg-2">Закладки</a>
          <a href="#" className="px-2.5 py-1.5 rounded-md text-[12.5px] font-medium text-fg-2 inline-flex items-center gap-1">Спільнота
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6"/></svg>
          </a>
        </div>
        <div className="flex-1"></div>
        <div className="hidden lg:block relative w-44">
          <input className="w-full h-7 px-2.5 bg-bg-1 border border-line-soft rounded-md text-fg-0 text-[12px] outline-none placeholder:text-fg-3" placeholder="Пошук…"/>
        </div>
        <button className="btn ghost icon sm relative">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M6 17V11a6 6 0 1 1 12 0v6l1.5 2H4.5L6 17Z"/><path d="M10 21h4"/></svg>
          <span className="absolute -top-0.5 -right-0.5 min-w-[12px] h-[12px] px-1 rounded-full bg-accent text-accent-fg text-[8px] font-bold flex items-center justify-center">3</span>
        </button>
        <button className="btn primary sm">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M14 4l6 6L9 21H3v-6L14 4Z"/></svg>
          <span>Написати</span>
        </button>
        <span className="avatar w-7 h-7">ВО</span>
      </div>
    </nav>
  );
}

/* Shared trending grid — used by current. Revised version has its own
   variant that strips the origin badge for originals. */
function trendingCard(n, opts = {}) {
  const { keepOriginalBadge = true } = opts;
  return (
    <a key={n.id} href="#" className="block">
      <article className="cursor-pointer flex flex-col gap-2.5">
        <div className="cover shadow-sm">
          <MockCover title={n.title} author={n.author} seed={n.id} />
          {n.type === 'translation' ? (
            <span className="absolute top-2 left-2 text-[9.5px] font-mono font-semibold tracking-[0.04em] uppercase bg-black/55 text-white px-[7px] py-[3px]" style={{ backdropFilter: 'blur(8px)' }}>
              {n.source_language?.toUpperCase()}
            </span>
          ) : (
            keepOriginalBadge && (
              <span className="absolute top-2 left-2 text-[9.5px] font-mono font-semibold tracking-[0.04em] uppercase bg-accent text-accent-fg px-[7px] py-[3px]">
                ОРИГ
              </span>
            )
          )}
          {n.progress > 0 && n.progress < 100 && (
            <div className="absolute left-0 right-0 bottom-0 h-[3px] bg-black/40">
              <div className="h-full bg-accent" style={{ width: `${n.progress}%` }}></div>
            </div>
          )}
          {n.status === 'Завершено' && (
            <span className="absolute top-2 right-2 text-[9.5px] font-semibold tracking-[0.06em] uppercase bg-black/55 text-white px-[7px] py-[3px]" style={{ backdropFilter: 'blur(8px)' }}>
              Завершено
            </span>
          )}
        </div>
        <div>
          <h3 className="text-[13.5px] font-serif font-medium leading-tight mb-[3px] line-clamp-2 min-h-[2.5em] text-fg-0">{n.title}</h3>
          <div className="text-[11px] text-fg-3">{n.author}</div>
          <div className="stat-row mt-2 text-[11px]">
            <span className="stat"><MockIcon name="heart" size={11}/>{(n.kudos/1000).toFixed(1)}k</span>
            <span className="stat"><MockIcon name="message" size={11}/>{n.comments}</span>
            <span className="stat"><MockIcon name="eye" size={11}/>{(n.hits/1000).toFixed(1)}k</span>
          </div>
        </div>
      </article>
    </a>
  );
}

window.MockNavbar = MockNavbar;
window.trendingCard = trendingCard;
