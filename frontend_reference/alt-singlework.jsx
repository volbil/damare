// Direction B — Single-work feed (read / save / pass)
// One novel fills the canvas at a time. The decision IS the discovery.

const _useState_sw = React.useState;

function SwDiscover() {
  const [idx, setIdx] = _useState_sw(0);
  const [decisions, setDecisions] = _useState_sw({});  // id -> 'read'|'save'|'pass'

  const works = NOVELS;
  const w = works[idx];
  const next = works[idx + 1] || works[0];

  const decide = (verdict) => {
    setDecisions({ ...decisions, [w.id]: verdict });
    setTimeout(() => setIdx((idx + 1) % works.length), 200);
  };

  // "Why this?" reasons hand-tuned per work
  const REASONS = {
    n1: { tldr: 'епістолярний роман про повернення додому', why: 'бо ви читали «Хатню магію» і додали в обране «зимове»' },
    n2: { tldr: 'короткий магреалізм про янгола в Києві',  why: 'бо ви двічі шукали «затишне» цього тижня' },
    n3: { tldr: 'нічний трилер у форматі радіоефіру',       why: 'оля_читає, на яку ви підписані, поставила 10/10' },
    n4: { tldr: 'повільна романтика про Львів і трамваї',   why: 'бо ви читали два романи цього автора раніше' },
    n5: { tldr: 'короткий гумор про кота-музиканта',         want: 'розрядка',
                  why: 'бо ваше попереднє читання було важким' },
    n6: { tldr: 'дистопія, яка читається як бухгалтерія',    why: 'бо ви додали Тараса Вовка в стежу' },
    n7: { tldr: 'збірка про відьом у звичайних кухнях',     why: 'бо ви тричі повертались до тегу «затишне»' },
    n8: { tldr: 'фольклорний горор з Карпат',                 why: 'бо ви дочитали «Шепіт» цього автора' },
  };
  const r = REASONS[w.id] || { tldr: '', why: '' };

  return (
    <div className="sw" style={{ minHeight: '100%',
                                     background: 'var(--sw-bg)',
                                     position: 'relative',
                                     overflow: 'hidden' }}>
      {/* Top chrome */}
      <header style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10,
                          padding: '20px 32px',
                          display: 'flex', alignItems: 'center', gap: 24 }}>
        <div style={{ fontFamily: 'var(--sw-display)', fontStyle: 'italic',
                        fontSize: 22, fontWeight: 500, letterSpacing: '-0.02em' }}>
          Damare
        </div>
        <span style={{ flex: 1 }} />
        <span className="sw-eyebrow">сесія · 12 лют</span>
        <span className="sw-eyebrow sw-num">{idx + 1} / {works.length}</span>
        <button style={{ fontFamily: 'var(--sw-mono)', fontSize: 11,
                          letterSpacing: '0.12em', textTransform: 'uppercase',
                          color: 'var(--sw-fg-2)', background: 'none', border: 0, padding: 0 }}>
          Налаштування подачі
        </button>
      </header>

      {/* Side rail — verdict tally */}
      <aside style={{ position: 'absolute', left: 32, top: '50%', transform: 'translateY(-50%)',
                        zIndex: 8, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {[
          ['read', 'читати',   '◐'],
          ['save', 'на потім', '◓'],
          ['pass', 'не моє',   '◯'],
        ].map(([k, l, ic]) => {
          const count = Object.values(decisions).filter(v => v === k).length;
          return (
            <div key={k} style={{ width: 56, padding: '10px 0', textAlign: 'center',
                                     border: '1px solid var(--sw-rule)', borderRadius: 6,
                                     background: 'rgba(255,255,255,0.02)' }}>
              <div className="sw-num" style={{ fontFamily: 'var(--sw-display)',
                                                    fontSize: 24, fontWeight: 500, lineHeight: 1,
                                                    color: k === 'read' ? 'var(--sw-yes)' :
                                                            k === 'save' ? 'var(--sw-save)' : 'var(--sw-no)' }}>
                {count}
              </div>
              <div className="sw-eyebrow" style={{ fontSize: 9, marginTop: 4 }}>
                {l}
              </div>
            </div>
          );
        })}
        <div style={{ height: 1, background: 'var(--sw-rule)', margin: '6px 0' }} />
        <button style={{ width: 56, padding: '10px 0',
                          fontFamily: 'var(--sw-mono)', fontSize: 9,
                          letterSpacing: '0.1em', textTransform: 'uppercase',
                          color: 'var(--sw-fg-3)',
                          background: 'rgba(255,255,255,0.02)',
                          border: '1px dashed var(--sw-rule)', borderRadius: 6 }}>
          Полиця<br/>{Object.keys(decisions).length}
        </button>
      </aside>

      {/* Stack — current card with next peeking behind */}
      <div style={{ position: 'absolute', inset: '90px 140px 110px 140px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Next card peek */}
        <div className="sw-card" style={{ position: 'absolute', inset: '20px 80px 60px 80px',
                                              opacity: 0.25, transform: 'translateY(40px) scale(0.96)',
                                              filter: 'blur(2px)' }}>
          <div style={{ position: 'absolute', top: 24, left: 24, right: 24,
                          fontFamily: 'var(--sw-display)', fontSize: 36,
                          fontStyle: 'italic', color: 'var(--sw-ink-3)' }}>
            наступний:&nbsp;{next.title}
          </div>
        </div>

        {/* Active card */}
        <article className="sw-card" style={{ width: '100%', height: '100%', maxWidth: 880,
                                                    display: 'grid',
                                                    gridTemplateColumns: '300px 1fr',
                                                    overflow: 'hidden' }}>
          {/* Left panel — cover */}
          <div style={{ position: 'relative', background: 'var(--sw-paper-2)',
                          borderRight: '1px solid rgba(0,0,0,0.08)' }}>
            <div style={{ position: 'absolute', inset: 0 }}>
              <GeneratedCover title={w.title} author={w.author} seed={w.id} showText={false} />
            </div>
            {/* Top-left perforation */}
            <div style={{ position: 'absolute', top: 16, left: 16, right: 16,
                            fontFamily: 'var(--sw-mono)', fontSize: 10,
                            letterSpacing: '0.14em', textTransform: 'uppercase',
                            color: 'rgba(255,255,255,0.85)',
                            textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>
              картка №{String(idx + 1).padStart(3, '0')} · {w.status === 'Завершено' ? 'завершено' : 'у процесі'}
            </div>
            {/* Bottom-left rating stamp */}
            <div style={{ position: 'absolute', bottom: 18, left: 16,
                            border: '1.5px solid rgba(255,255,255,0.85)',
                            padding: '6px 10px', borderRadius: 4,
                            color: 'white', textShadow: '0 1px 3px rgba(0,0,0,0.5)',
                            transform: 'rotate(-2deg)',
                            fontFamily: 'var(--sw-mono)', fontSize: 9.5,
                            letterSpacing: '0.18em', textTransform: 'uppercase' }}>
              {w.rating === 'G' ? 'для всіх' : w.rating === 'T' ? 'підлітки+' : w.rating === 'M' ? 'дорослі' : 'без обмежень'}
            </div>
          </div>

          {/* Right panel — content */}
          <div style={{ padding: '32px 36px 28px',
                          display: 'flex', flexDirection: 'column',
                          minWidth: 0 }}>
            {/* Why panel */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10,
                            marginBottom: 20, paddingBottom: 14,
                            borderBottom: '1px dashed rgba(0,0,0,0.18)' }}>
              <span style={{ fontFamily: 'var(--sw-mono)', fontSize: 10,
                               letterSpacing: '0.16em', textTransform: 'uppercase',
                               color: 'var(--sw-ink-3)' }}>
                Чому це для вас
              </span>
              <span style={{ flex: 1 }} />
              <span style={{ fontFamily: 'var(--sw-display)', fontStyle: 'italic',
                               fontSize: 14, color: 'var(--sw-ink-2)' }}>
                {r.why}
              </span>
            </div>

            <h1 style={{ fontSize: 56, lineHeight: 0.92, letterSpacing: '-0.035em',
                          fontWeight: 500, marginBottom: 6, textWrap: 'balance',
                          color: 'var(--sw-ink)' }}>
              {w.title}
            </h1>
            <div style={{ fontFamily: 'var(--sw-display)', fontStyle: 'italic',
                            fontSize: 18, color: 'var(--sw-ink-2)', marginBottom: 22 }}>
              {w.author}
            </div>

            <p style={{ fontSize: 17, lineHeight: 1.55, margin: '0 0 18px',
                         textWrap: 'pretty', color: 'var(--sw-ink)' }}>
              {w.summary}
            </p>

            {/* First-line preview */}
            <div style={{ borderLeft: '2px solid var(--sw-ink-2)',
                            paddingLeft: 16, marginBottom: 22 }}>
              <div className="sw-eyebrow" style={{ color: 'var(--sw-ink-3)', marginBottom: 6 }}>
                Перший рядок
              </div>
              <p style={{ fontFamily: 'var(--sw-display)', fontStyle: 'italic',
                           fontSize: 18, lineHeight: 1.4, margin: 0,
                           color: 'var(--sw-ink-2)' }}>
                «Сніг падав так, як падає тільки на Поліссі — повільно, з тією важкою терплячістю,
                з якою старі люди розповідають довгі історії.»
              </p>
            </div>

            {/* Stats strip */}
            <div style={{ display: 'flex', gap: 0, marginTop: 'auto', paddingTop: 14,
                            borderTop: '1px solid rgba(0,0,0,0.18)' }}>
              <Stat3 k="довжина"  v={`${(w.words/1000).toFixed(0)}k`} sub="слів" />
              <Stat3 k="час"      v={`≈ ${Math.round(w.words/250)}`} sub="хв читання" />
              <Stat3 k="темп"     v="повільно" sub="за тегом" />
              <Stat3 k="настрій"  v={r.tldr.split(' ').slice(0, 2).join(' ')} sub={w.tags?.[0] || ''} />
            </div>
          </div>
        </article>
      </div>

      {/* Bottom action bar — verdicts */}
      <footer style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 10,
                          padding: '24px 32px',
                          display: 'flex', alignItems: 'center', gap: 18,
                          justifyContent: 'center' }}>
        <SwVerdict label="не моє"     hint="←" color="var(--sw-no)"   onClick={() => decide('pass')} />
        <SwVerdict label="на потім"    hint="↓" color="var(--sw-save)" onClick={() => decide('save')} primary />
        <SwVerdict label="читати"      hint="→" color="var(--sw-yes)"  onClick={() => decide('read')} primary />
        <span style={{ flex: 1 }} />
        <button style={{ fontFamily: 'var(--sw-mono)', fontSize: 11,
                          letterSpacing: '0.14em', textTransform: 'uppercase',
                          color: 'var(--sw-fg-3)', background: 'none', border: 0,
                          padding: '8px 12px', cursor: 'pointer' }}>
          ↩ повернути попередню
        </button>
      </footer>
    </div>
  );
}

function Stat3({ k, v, sub }) {
  return (
    <div style={{ flex: 1, paddingRight: 18 }}>
      <div className="sw-eyebrow" style={{ color: 'var(--sw-ink-3)', fontSize: 9.5,
                                              marginBottom: 4 }}>
        {k}
      </div>
      <div style={{ fontFamily: 'var(--sw-display)', fontSize: 20, fontWeight: 500,
                      lineHeight: 1, color: 'var(--sw-ink)' }}>
        {v}
      </div>
      {sub && (
        <div style={{ fontSize: 11, color: 'var(--sw-ink-3)', marginTop: 2,
                        fontStyle: 'italic' }}>
          {sub}
        </div>
      )}
    </div>
  );
}

function SwVerdict({ label, hint, color, onClick, primary }) {
  return (
    <button onClick={onClick}
            style={{ display: 'flex', alignItems: 'center', gap: 12,
                      padding: primary ? '14px 28px' : '12px 22px',
                      background: primary ? color : 'transparent',
                      color: primary ? 'var(--sw-bg)' : color,
                      border: primary ? 0 : `1.5px solid ${color}`,
                      borderRadius: 4, cursor: 'pointer',
                      fontFamily: 'var(--sw-display)', fontStyle: 'italic',
                      fontSize: primary ? 22 : 18, fontWeight: 500,
                      letterSpacing: '-0.01em' }}>
      <span style={{ fontFamily: 'var(--sw-mono)', fontStyle: 'normal',
                       fontSize: 12, opacity: 0.7,
                       border: '1px solid currentColor', borderRadius: 3,
                       padding: '1px 6px', letterSpacing: 0 }}>
        {hint}
      </span>
      {label}
    </button>
  );
}

// === SINGLE-WORK: TASTE OF ADJACENT — "THE SHELF" =================
// What happens to all those decisions? They become a personal feed
// the user can revisit. This shows the SAVED-FOR-LATER shelf.

function SwShelf() {
  return (
    <div className="sw" style={{ minHeight: '100%', padding: '32px 56px 56px',
                                     background: 'var(--sw-bg)' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12,
                      borderBottom: '1px solid var(--sw-rule)', paddingBottom: 14,
                      marginBottom: 32 }}>
        <span style={{ fontFamily: 'var(--sw-display)', fontStyle: 'italic',
                         fontSize: 24, fontWeight: 500 }}>
          Damare
        </span>
        <span className="sw-eyebrow">/</span>
        <span style={{ fontSize: 16, color: 'var(--sw-fg-2)',
                         fontFamily: 'var(--sw-display)', fontStyle: 'italic' }}>
          ваша полиця
        </span>
        <span style={{ flex: 1 }} />
        <SwTab label="читаю" count={3} active />
        <SwTab label="на потім" count={12} />
        <SwTab label="не моє" count={28} />
        <SwTab label="всі" count={43} />
      </div>

      {/* Now-reading — vertical timeline of last 3 sessions */}
      <section style={{ marginBottom: 48 }}>
        <div className="sw-eyebrow" style={{ marginBottom: 18 }}>
          Зараз читаю · 3 твори
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {NOVELS.slice(0, 3).map((w, i) => (
            <article key={w.id} className="sw-card" style={{ padding: 20,
                                                                  display: 'flex',
                                                                  flexDirection: 'column',
                                                                  gap: 10 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span style={{ fontFamily: 'var(--sw-mono)', fontSize: 10,
                                 letterSpacing: '0.14em', textTransform: 'uppercase',
                                 color: 'var(--sw-ink-3)' }}>
                  розділ {[3, 7, 12][i]} / {w.chapter_count}
                </span>
                <span style={{ flex: 1, borderTop: '1px dotted var(--sw-ink-3)' }} />
                <span style={{ fontFamily: 'var(--sw-mono)', fontSize: 10,
                                 color: 'var(--sw-yes)' }}>● тут</span>
              </div>
              <h3 style={{ fontFamily: 'var(--sw-display)', fontSize: 26,
                            lineHeight: 1, fontWeight: 500, letterSpacing: '-0.02em',
                            color: 'var(--sw-ink)', textWrap: 'balance' }}>
                {w.title}
              </h3>
              <div style={{ fontFamily: 'var(--sw-display)', fontStyle: 'italic',
                              fontSize: 13, color: 'var(--sw-ink-2)' }}>
                {w.author}
              </div>
              {/* Per-chapter stipple */}
              <div style={{ display: 'flex', gap: 3, marginTop: 6 }}>
                {[...Array(w.chapter_count)].map((_, j) => (
                  <span key={j} style={{ flex: 1, height: 6,
                                            background: j < [3, 7, 12][i] ? 'var(--sw-ink)' :
                                                          j === [3, 7, 12][i] ? 'var(--sw-yes)' :
                                                          'rgba(0,0,0,0.12)',
                                            borderRadius: 1 }} />
                ))}
              </div>
              <p style={{ fontSize: 13.5, lineHeight: 1.5, margin: '6px 0 0',
                           color: 'var(--sw-ink-2)', textWrap: 'pretty' }}>
                Ваша остання нотатка: <em>«не дочитую сьогодні, цей розділ хочеться розтягнути»</em>
              </p>
              <button style={{ marginTop: 'auto',
                                padding: '10px 14px',
                                background: 'var(--sw-ink)', color: 'var(--sw-paper)',
                                border: 0, borderRadius: 4, cursor: 'pointer',
                                fontFamily: 'var(--sw-display)', fontStyle: 'italic',
                                fontSize: 16, fontWeight: 500 }}>
                ↗ продовжити з закладки
              </button>
            </article>
          ))}
        </div>
      </section>

      {/* Save-for-later: dense ledger */}
      <section style={{ marginBottom: 48 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 14 }}>
          <span className="sw-eyebrow">На потім · 12 творів</span>
          <span style={{ flex: 1, borderTop: '1px solid var(--sw-rule)' }} />
          <span style={{ fontFamily: 'var(--sw-mono)', fontSize: 10.5,
                           letterSpacing: '0.1em', color: 'var(--sw-fg-3)' }}>
            сортувати: за датою додавання ▾
          </span>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.02)',
                        border: '1px solid var(--sw-rule)',
                        borderRadius: 6 }}>
          {[
            { d: '11 лют', n: NOVELS[5], note: 'тарас_чорний рекомендував', rev: 'оля_читає · 9/10' },
            { d: '09 лют', n: NOVELS[3], note: 'для березня, як тільки потеплішає' },
            { d: '07 лют', n: NOVELS[6], note: '— нічна підбірка' },
            { d: '05 лют', n: NOVELS[4], note: 'кіт. саксофон. так' },
            { d: '03 лют', n: NOVELS[7], note: 'для довгої поїздки' },
            { d: '02 лют', n: NOVELS[2], note: '«нічне радіо» — обережно, не на ніч' },
          ].map((row, i) => (
            <div key={i} style={{ display: 'grid',
                                     gridTemplateColumns: '70px 1.4fr 1fr 90px 110px',
                                     gap: 16, alignItems: 'baseline',
                                     padding: '14px 18px',
                                     borderBottom: i < 5 ? '1px solid var(--sw-rule)' : 0 }}>
              <span style={{ fontFamily: 'var(--sw-mono)', fontSize: 11,
                               color: 'var(--sw-fg-3)', letterSpacing: '0.06em' }}>
                {row.d}
              </span>
              <div>
                <div style={{ fontFamily: 'var(--sw-display)', fontSize: 18,
                                fontWeight: 500, lineHeight: 1.1, letterSpacing: '-0.01em' }}>
                  {row.n.title}
                </div>
                <div style={{ fontFamily: 'var(--sw-display)', fontStyle: 'italic',
                                fontSize: 13, color: 'var(--sw-fg-2)', marginTop: 2 }}>
                  {row.n.author}
                </div>
              </div>
              <div style={{ fontFamily: 'var(--sw-display)', fontStyle: 'italic',
                              fontSize: 13, color: 'var(--sw-fg-2)', textWrap: 'pretty' }}>
                {row.note}
              </div>
              <span className="sw-num" style={{ fontFamily: 'var(--sw-mono)', fontSize: 11,
                                                     color: 'var(--sw-fg-3)' }}>
                {(row.n.words/1000).toFixed(0)}k слів
              </span>
              <button style={{ fontFamily: 'var(--sw-mono)', fontSize: 10,
                                letterSpacing: '0.14em', textTransform: 'uppercase',
                                color: 'var(--sw-yes)', background: 'transparent',
                                border: '1px solid var(--sw-yes)', borderRadius: 3,
                                padding: '6px 10px', cursor: 'pointer' }}>
                почати
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Why-you-passed — make the rejections useful */}
      <section>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 14 }}>
          <span className="sw-eyebrow">Що не зайшло · 28 творів</span>
          <span style={{ flex: 1, borderTop: '1px solid var(--sw-rule)' }} />
          <span style={{ fontFamily: 'var(--sw-display)', fontStyle: 'italic',
                           fontSize: 14, color: 'var(--sw-fg-2)' }}>
            ваші відмови формують подачу
          </span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
          {[
            { label: 'жанри, які ви часто відхиляєте', items: ['наукова фантастика', 'дистопія', 'хорор'] },
            { label: 'теми, до яких ви не повертаєтесь', items: ['війна', 'насильство', 'поліція'] },
            { label: 'довжини, яких уникаєте', items: ['100k+ слів', 'короткі (<10k)'] },
            { label: 'автори, яких ви прочитали і пропускаєте', items: ['Сашко Поточний', 'Юрій Гавриленко'] },
          ].map(b => (
            <div key={b.label} style={{ background: 'rgba(255,255,255,0.02)',
                                            border: '1px dashed var(--sw-rule)',
                                            borderRadius: 6, padding: 14 }}>
              <div className="sw-eyebrow" style={{ fontSize: 9.5, marginBottom: 10 }}>
                {b.label}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {b.items.map(t => (
                  <span key={t} style={{ fontFamily: 'var(--sw-display)',
                                            fontStyle: 'italic', fontSize: 13,
                                            padding: '3px 8px',
                                            border: '1px solid var(--sw-rule)',
                                            borderRadius: 999,
                                            color: 'var(--sw-fg-2)',
                                            textDecoration: 'line-through',
                                            textDecorationColor: 'var(--sw-no)' }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function SwTab({ label, count, active }) {
  return (
    <button style={{ display: 'flex', alignItems: 'baseline', gap: 6,
                      padding: '6px 12px', borderRadius: 4,
                      background: active ? 'rgba(255,255,255,0.06)' : 'transparent',
                      border: 0, cursor: 'pointer',
                      fontFamily: 'var(--sw-display)', fontStyle: 'italic',
                      fontSize: 16,
                      color: active ? 'var(--sw-fg)' : 'var(--sw-fg-3)' }}>
      {label}
      <span className="sw-num" style={{ fontFamily: 'var(--sw-mono)',
                                            fontStyle: 'normal',
                                            fontSize: 11,
                                            color: active ? 'var(--sw-yes)' : 'var(--sw-fg-3)' }}>
        {count}
      </span>
    </button>
  );
}

window.SwDiscover = SwDiscover;
window.SwShelf = SwShelf;
