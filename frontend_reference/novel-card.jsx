// Reusable card variants
const NovelCardCover = ({ novel, density = 'regular', onClick }) => {
  return (
    <article onClick={onClick} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div className="cover" style={{ boxShadow: 'var(--shadow-sm)' }}>
        <GeneratedCover title={novel.title} author={novel.author} seed={novel.id} />
        {novel.progress > 0 && novel.progress < 100 && (
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 3, background: 'rgba(0,0,0,0.4)' }}>
            <div style={{ height: '100%', width: novel.progress + '%', background: 'var(--accent)' }} />
          </div>
        )}
        {novel.status === 'Завершено' && (
          <span style={{ position: 'absolute', top: 8, right: 8, fontSize: 9.5, fontWeight: 600,
                          letterSpacing: '0.06em', textTransform: 'uppercase',
                          background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)',
                          color: '#fff', padding: '3px 7px', borderRadius: 999 }}>
            Завершено
          </span>
        )}
      </div>
      <div>
        <h3 style={{ fontSize: density === 'compact' ? 13 : 14, fontFamily: 'var(--font-serif)',
                      fontWeight: 500, lineHeight: 1.25, marginBottom: 3 }}>
          {novel.title}
        </h3>
        <div style={{ fontSize: 11.5, color: 'var(--fg-3)' }}>{novel.author}</div>
        <div className="stat-row" style={{ marginTop: 8, fontSize: 11 }}>
          <span className="stat"><Icon name="heart" size={11} />{novel.kudos.toLocaleString('uk-UA')}</span>
          <span className="stat"><Icon name="message" size={11} />{novel.comments}</span>
          <span className="stat"><Icon name="eye" size={11} />{(novel.hits/1000).toFixed(1)}k</span>
        </div>
      </div>
    </article>
  );
};

const NovelCardList = ({ novel, density = 'regular', onClick, showCover = true }) => {
  return (
    <article onClick={onClick} style={{
      cursor: 'pointer',
      display: 'flex', gap: 14, padding: density === 'compact' ? 12 : 16,
      borderRadius: 'var(--r-lg)', background: 'var(--bg-1)',
      border: '1px solid var(--line-soft)',
    }}>
      {showCover && (
        <div className="cover" style={{ width: density === 'compact' ? 60 : 76, flexShrink: 0, aspectRatio: '2 / 3' }}>
          <GeneratedCover title={novel.title} author={novel.author} seed={novel.id} showText={false} />
        </div>
      )}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12 }}>
          <h3 style={{ fontSize: density === 'compact' ? 14 : 15, fontFamily: 'var(--font-serif)',
                        fontWeight: 500, lineHeight: 1.25 }}>
            {novel.title}
          </h3>
          <span className="tag rating">{novel.rating}</span>
        </div>
        <div style={{ fontSize: 12, color: 'var(--fg-3)' }}>
          <span style={{ color: 'var(--fg-2)' }}>{novel.author}</span>
          {' · '}{novel.updated}
        </div>
        {density !== 'compact' && (
          <p style={{ fontSize: 12.5, color: 'var(--fg-2)', lineHeight: 1.55, margin: 0,
                       display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {novel.summary}
          </p>
        )}
        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginTop: 2 }}>
          {novel.warnings.map(w => <span key={w} className="tag warn">{w}</span>)}
          {novel.tags.slice(0, 3).map(t => <span key={t} className="tag">{t}</span>)}
        </div>
        <div className="stat-row" style={{ marginTop: 4 }}>
          <span className="stat"><Icon name="heart" size={12} />{novel.kudos.toLocaleString('uk-UA')}</span>
          <span className="stat"><Icon name="bookmark" size={12} />{novel.bookmarks}</span>
          <span className="stat"><Icon name="message" size={12} />{novel.comments}</span>
          <span className="stat"><Icon name="eye" size={12} />{(novel.hits/1000).toFixed(1)}k</span>
          <span style={{ marginLeft: 'auto', color: 'var(--fg-3)', fontSize: 11 }}>
            {novel.chapters}/{novel.chapter_count} р. · {(novel.words/1000).toFixed(1)}k слів
          </span>
        </div>
      </div>
    </article>
  );
};

const NovelCard = ({ novel, density, withCovers = true, onClick }) =>
  withCovers
    ? <NovelCardCover novel={novel} density={density} onClick={onClick} />
    : <NovelCardList novel={novel} density={density} onClick={onClick} showCover={false} />;

window.NovelCardCover = NovelCardCover;
window.NovelCardList = NovelCardList;
window.NovelCard = NovelCard;
