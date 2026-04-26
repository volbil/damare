// Screen 1 — Home / discover feed
function HomeScreen({ density, withCovers, onOpenNovel }) {
  const featured = NOVELS[5];
  const continueReading = NOVELS[0];
  const trending = NOVELS.slice(2, 6);
  const newReleases = NOVELS.slice(0, 4);

  return (
    <div style={{ flex: 1, overflow: 'auto', background: 'var(--bg-0)' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '24px 32px 80px' }}>
        {/* Continue reading */}
        <section style={{ marginBottom: 36 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 }}>
            <h2 style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.06em',
                          textTransform: 'uppercase', color: 'var(--fg-3)' }}>Продовжити читати</h2>
            <button style={{ fontSize: 12, color: 'var(--fg-3)' }}>Уся бібліотека →</button>
          </div>
          <div onClick={() => onOpenNovel(continueReading)}
               style={{ display: 'flex', gap: 20, padding: 20,
                        background: 'linear-gradient(180deg, var(--bg-1) 0%, var(--bg-0) 100%)',
                        border: '1px solid var(--line-soft)', borderRadius: 'var(--r-lg)',
                        cursor: 'pointer' }}>
            <div className="cover" style={{ width: 120, flexShrink: 0 }}>
              <GeneratedCover title={continueReading.title} author={continueReading.author}
                              seed={continueReading.id} showText={false} />
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: 11, color: 'var(--fg-3)', textTransform: 'uppercase',
                                letterSpacing: '0.06em', marginBottom: 6 }}>
                  Розділ {continueReading.chapters} з {continueReading.chapter_count}
                </div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 24, fontWeight: 500,
                              marginBottom: 4, lineHeight: 1.15 }}>
                  {continueReading.title}
                </h3>
                <div style={{ color: 'var(--fg-2)', fontSize: 13, marginBottom: 12 }}>
                  {continueReading.author}
                </div>
                <p style={{ color: 'var(--fg-2)', fontSize: 13, lineHeight: 1.6, margin: 0,
                              maxWidth: 520 }}>
                  «Маринка опустилася на лавку біля воріт. Сніжинка впала на лист, повільно розтанула…»
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 16 }}>
                <button className="btn primary">Продовжити читання <Icon name="arrow-r" size={13} /></button>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ flex: 1, height: 2, background: 'var(--bg-3)', borderRadius: 999 }}>
                    <div style={{ width: continueReading.progress + '%', height: '100%',
                                    background: 'var(--accent)', borderRadius: 999 }} />
                  </div>
                  <span style={{ fontSize: 11, color: 'var(--fg-3)', fontVariantNumeric: 'tabular-nums' }}>
                    {continueReading.progress}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured */}
        <section style={{ marginBottom: 36 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 }}>
            <h2 style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.06em',
                          textTransform: 'uppercase', color: 'var(--fg-3)' }}>
              <Icon name="sparkle" size={11} /> Редакторський вибір
            </h2>
          </div>
          <div onClick={() => onOpenNovel(featured)} style={{ position: 'relative', cursor: 'pointer',
                  height: 280, borderRadius: 'var(--r-lg)', overflow: 'hidden',
                  border: '1px solid var(--line-soft)' }}>
            <div style={{ position: 'absolute', inset: 0 }}>
              <GeneratedCover title={featured.title} author={featured.author} seed={featured.id} showText={false} />
            </div>
            <div style={{ position: 'absolute', inset: 0,
                            background: 'linear-gradient(110deg, rgba(20,18,14,0.95) 0%, rgba(20,18,14,0.7) 50%, rgba(20,18,14,0.4) 100%)' }} />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
                            justifyContent: 'flex-end', padding: 32, maxWidth: 600 }}>
              <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.1em',
                              textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 8 }}>
                Тиждень тому · в тренді
              </span>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 36, fontWeight: 500,
                              lineHeight: 1.05, marginBottom: 8, color: '#fff' }}>
                {featured.title}
              </h3>
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, marginBottom: 14 }}>
                {featured.author} · {featured.chapter_count} розділів
              </div>
              <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 14, lineHeight: 1.55,
                            margin: 0, marginBottom: 18 }}>{featured.summary}</p>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {featured.tags.map(t => <span key={t} className="tag" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', borderColor: 'transparent' }}>{t}</span>)}
              </div>
            </div>
          </div>
        </section>

        {/* Trending */}
        <section style={{ marginBottom: 36 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 14 }}>
            <h2 style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.06em',
                          textTransform: 'uppercase', color: 'var(--fg-3)' }}>
              <Icon name="flame" size={11} /> Зараз у тренді
            </h2>
            <button style={{ fontSize: 12, color: 'var(--fg-3)' }}>Більше →</button>
          </div>
          <div style={{ display: 'grid',
                          gridTemplateColumns: withCovers ? 'repeat(4, 1fr)' : '1fr',
                          gap: withCovers ? 18 : 10 }}>
            {trending.map(n => <NovelCard key={n.id} novel={n} density={density} withCovers={withCovers}
                                            onClick={() => onOpenNovel(n)} />)}
          </div>
        </section>

        {/* New releases */}
        <section>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 14 }}>
            <h2 style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.06em',
                          textTransform: 'uppercase', color: 'var(--fg-3)' }}>Нещодавно оновлені</h2>
          </div>
          <div style={{ display: 'grid',
                          gridTemplateColumns: withCovers ? 'repeat(4, 1fr)' : '1fr',
                          gap: withCovers ? 18 : 10 }}>
            {newReleases.map(n => <NovelCard key={n.id} novel={n} density={density} withCovers={withCovers}
                                                onClick={() => onOpenNovel(n)} />)}
          </div>
        </section>
      </div>
    </div>
  );
}

window.HomeScreen = HomeScreen;
