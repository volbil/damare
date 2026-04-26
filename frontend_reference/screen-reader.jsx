// Screen 3 — Reader view (HERO polished)
function ReaderScreen({ tweaks, onBack }) {
  const ch = READER_CHAPTER;
  const [fontSize, setFontSize] = useState(18);
  const [lineHeight, setLineHeight] = useState(1.75);
  const [width, setWidth] = useState(640);
  const [theme, setTheme] = useState('night'); // night | sepia | parchment
  const [serif, setSerif] = useState(true);
  const [showControls, setShowControls] = useState(false);

  const themes = {
    night:     { bg: '#15161a', fg: '#dcd6c8', meta: '#7a766b' },
    sepia:     { bg: '#1d1814', fg: '#e8d9bf', meta: '#8a7d65' },
    parchment: { bg: '#1a1a17', fg: '#d8d4c4', meta: '#7c7866' },
    void:      { bg: '#0a0a0a', fg: '#c8c5bc', meta: '#6a6760' },
  };
  const T = themes[theme];

  return (
    <div style={{ flex: 1, overflow: 'auto', background: T.bg, color: T.fg, position: 'relative' }}>
      {/* Top mini bar */}
      <div style={{ position: 'sticky', top: 0, zIndex: 5,
                     background: T.bg + 'ee', backdropFilter: 'blur(8px)',
                     borderBottom: '1px solid rgba(255,255,255,0.04)',
                     padding: '12px 24px', display: 'flex', alignItems: 'center', gap: 16 }}>
        <button onClick={onBack} style={{ color: T.meta, display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
          <Icon name="arrow-l" size={13} /> {ch.novel}
        </button>
        <div style={{ flex: 1, textAlign: 'center', fontSize: 11, color: T.meta }}>
          Розділ {ch.chapter_no} з {ch.chapter_total} · {ch.title}
        </div>
        <button onClick={() => setShowControls(!showControls)}
                style={{ color: T.fg, padding: 6, borderRadius: 6,
                          background: showControls ? 'rgba(255,255,255,0.08)' : 'transparent' }}>
          <Icon name="type" size={15} />
        </button>
        <button style={{ color: T.fg, padding: 6 }}><Icon name="bookmark" size={15} /></button>
      </div>

      {/* Floating typography panel */}
      {showControls && (
        <div style={{ position: 'absolute', top: 60, right: 24, zIndex: 6,
                       width: 280, padding: 18, borderRadius: 'var(--r-lg)',
                       background: 'rgba(28,28,32,0.96)', backdropFilter: 'blur(20px)',
                       border: '1px solid rgba(255,255,255,0.08)',
                       boxShadow: 'var(--shadow-lg)', color: '#e0dccf' }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.08em',
                          textTransform: 'uppercase', color: '#888377', marginBottom: 12 }}>Тема</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6, marginBottom: 16 }}>
            {Object.entries(themes).map(([k, v]) => (
              <button key={k} onClick={() => setTheme(k)}
                      style={{ height: 40, borderRadius: 6, background: v.bg,
                                border: theme === k ? `2px solid var(--accent)` : '1px solid rgba(255,255,255,0.1)',
                                color: v.fg, fontFamily: 'var(--font-serif)', fontSize: 14 }}>
                Aa
              </button>
            ))}
          </div>

          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.08em',
                          textTransform: 'uppercase', color: '#888377', marginBottom: 8 }}>Шрифт</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginBottom: 16 }}>
            <button onClick={() => setSerif(true)}
                    style={{ height: 32, borderRadius: 6, fontFamily: 'var(--font-serif)', fontSize: 14,
                              background: serif ? '#3a3530' : 'transparent', color: serif ? '#fff' : '#aaa',
                              border: '1px solid rgba(255,255,255,0.08)' }}>
              Newsreader
            </button>
            <button onClick={() => setSerif(false)}
                    style={{ height: 32, borderRadius: 6, fontFamily: 'var(--font-sans)', fontSize: 13,
                              background: !serif ? '#3a3530' : 'transparent', color: !serif ? '#fff' : '#aaa',
                              border: '1px solid rgba(255,255,255,0.08)' }}>
              Inter
            </button>
          </div>

          <SliderRow label="Розмір тексту" value={fontSize} unit="px" min={14} max={26} step={1} onChange={setFontSize} />
          <SliderRow label="Висота рядка" value={lineHeight} unit="" min={1.4} max={2.1} step={0.05} onChange={setLineHeight} fixed={2} />
          <SliderRow label="Ширина колонки" value={width} unit="px" min={520} max={780} step={20} onChange={setWidth} />
        </div>
      )}

      {/* Chapter body */}
      <article style={{ maxWidth: width, margin: '0 auto', padding: '64px 32px 120px' }}>
        <div style={{ fontSize: 11, color: T.meta, letterSpacing: '0.1em',
                       textTransform: 'uppercase', textAlign: 'center', marginBottom: 8 }}>
          Розділ {ch.chapter_no}
        </div>
        <h1 style={{ fontFamily: 'var(--font-serif)', textAlign: 'center', fontWeight: 500,
                      fontSize: 32, lineHeight: 1.15, marginBottom: 8, color: T.fg,
                      letterSpacing: '-0.015em' }}>
          {ch.title}
        </h1>
        <div style={{ textAlign: 'center', fontSize: 12, color: T.meta, marginBottom: 56 }}>
          {ch.author} · 8 хв читання
        </div>

        <div style={{
          fontFamily: serif ? 'var(--font-serif)' : 'var(--font-sans)',
          fontSize: fontSize, lineHeight: lineHeight, color: T.fg,
        }}>
          {ch.paragraphs.map((p, i) => (
            <p key={i} style={{ margin: i === 0 ? '0 0 1.4em' : '0 0 1.2em', textIndent: i > 0 ? '1.4em' : 0,
                                  textWrap: 'pretty' }}>
              {i === 0 ? <span style={{ fontFamily: 'var(--font-serif)', float: 'left',
                                           fontSize: fontSize * 3.4, lineHeight: 0.85,
                                           paddingRight: 10, paddingTop: 8, color: 'var(--accent)' }}>
                {p[0]}
              </span> : null}
              {i === 0 ? p.slice(1) : p}
            </p>
          ))}
          <div style={{ textAlign: 'center', fontSize: 18, color: T.meta, margin: '40px 0' }}>· · ·</div>
          <p style={{ margin: 0, color: T.meta, fontStyle: 'italic', fontSize: fontSize * 0.9 }}>
            Далі буде…
          </p>
        </div>

        {/* Chapter footer */}
        <div style={{ marginTop: 64, paddingTop: 32, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 32 }}>
            <button className="btn" style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)' }}>
              <Icon name="heart" size={14} /> Залишити kudos
            </button>
            <button className="btn" style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)' }}>
              <Icon name="message" size={14} /> Прокоментувати
            </button>
            <button className="btn" style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)' }}>
              <Icon name="bookmark" size={14} />
            </button>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16 }}>
            <button style={{ flex: 1, textAlign: 'left', padding: 16, borderRadius: 'var(--r-lg)',
                              background: 'rgba(255,255,255,0.03)', color: T.fg,
                              border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize: 11, color: T.meta, marginBottom: 4 }}>← Розділ 2</div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: 15 }}>Поштова скринька</div>
            </button>
            <button className="btn primary" style={{ flex: 1, height: 'auto', padding: 16,
                                                       flexDirection: 'column', alignItems: 'flex-end' }}>
              <div style={{ fontSize: 11, opacity: 0.8, marginBottom: 4 }}>Розділ 4 →</div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: 15 }}>Тітка Ніна</div>
            </button>
          </div>
        </div>
      </article>

      {/* Reading progress */}
      <div style={{ position: 'sticky', bottom: 0, height: 2, background: 'rgba(255,255,255,0.05)' }}>
        <div style={{ height: '100%', width: '34%', background: 'var(--accent)' }} />
      </div>
    </div>
  );
}

function SliderRow({ label, value, unit, min, max, step, onChange, fixed }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 4 }}>
        <span style={{ color: '#a8a395' }}>{label}</span>
        <span style={{ color: '#888377', fontVariantNumeric: 'tabular-nums' }}>
          {fixed != null ? value.toFixed(fixed) : value}{unit}
        </span>
      </div>
      <input type="range" value={value} min={min} max={max} step={step}
              onChange={(e) => onChange(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--accent)' }} />
    </div>
  );
}

window.ReaderScreen = ReaderScreen;
