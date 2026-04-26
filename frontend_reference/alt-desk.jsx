// Direction C — The Reading Desk
// Discovery as a still-life scene. Novels are objects on a desk at night.

function DkDiscover() {
  return (
    <div className="dk dk-desk" style={{ minHeight: 1200, position: 'relative',
                                              overflow: 'hidden', padding: 48 }}>
      {/* Floating chrome — almost invisible */}
      <div style={{ position: 'absolute', top: 24, left: 32, right: 32,
                      display: 'flex', alignItems: 'center',
                      fontFamily: 'var(--dk-mono)', fontSize: 10.5,
                      letterSpacing: '0.18em', textTransform: 'uppercase',
                      color: 'rgba(237,226,200,0.35)', zIndex: 30 }}>
        <span style={{ fontFamily: 'var(--dk-display)', fontStyle: 'italic',
                         fontSize: 18, letterSpacing: 0, textTransform: 'none',
                         color: 'rgba(237,226,200,0.7)' }}>
          Damare
        </span>
        <span style={{ marginLeft: 16, opacity: 0.6 }}>· ваш стіл, понеділок 23:14</span>
        <span style={{ flex: 1 }} />
        <span style={{ opacity: 0.5 }}>прибрати стіл</span>
        <span style={{ marginLeft: 18, opacity: 0.5 }}>пошук</span>
        <span style={{ marginLeft: 18, opacity: 0.5 }}>увійти</span>
      </div>

      {/* Lamp glow indicator (top-left corner) */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: 200, height: 200,
                      background: 'radial-gradient(circle at 30% 30%, var(--dk-lamp), transparent 50%)',
                      opacity: 0.4, pointerEvents: 'none' }} />

      {/* === OPEN BOOK at center — the "now reading" =================== */}
      <div style={{ position: 'absolute', top: 110, left: 80, width: 720, height: 480,
                      transform: 'rotate(-1.5deg)', zIndex: 20 }}>
        <div className="dk-shadow" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr',
                                                 height: '100%',
                                                 background: 'linear-gradient(90deg, var(--dk-paper) 49%, rgba(0,0,0,0.18) 50%, var(--dk-paper) 51%)' }}>
          {/* Left page — title/colophon */}
          <div className="dk-paper" style={{ padding: '36px 30px', position: 'relative' }}>
            <div className="dk-eyebrow" style={{ marginBottom: 14 }}>відкрита книга</div>
            <div style={{ fontFamily: 'var(--dk-display)', fontSize: 42, lineHeight: 0.95,
                            letterSpacing: '-0.025em', color: 'var(--dk-ink)',
                            fontWeight: 500, textWrap: 'balance' }}>
              Сім<br/>
              <em style={{ fontWeight: 400 }}>зимових</em><br/>
              ночей.
            </div>
            <div style={{ marginTop: 16, fontFamily: 'var(--dk-display)',
                            fontStyle: 'italic', fontSize: 17, color: 'var(--dk-ink-soft)' }}>
              Калина Левчук
            </div>
            <div style={{ position: 'absolute', bottom: 28, left: 30, right: 30,
                            fontFamily: 'var(--dk-mono)', fontSize: 10,
                            letterSpacing: '0.12em', color: 'var(--dk-ink-faded)',
                            textTransform: 'uppercase' }}>
              <div style={{ borderTop: '1px solid var(--dk-ink-faded)', paddingTop: 8 }}>
                закладка на с. 47 · розділ III<br/>
                ви читаєте 4-й вечір поспіль
              </div>
            </div>
            {/* Ribbon bookmark */}
            <div style={{ position: 'absolute', top: -8, left: '60%', width: 12, height: 220,
                            background: 'linear-gradient(180deg, var(--dk-spot), #8a2a10)',
                            boxShadow: '2px 2px 4px rgba(0,0,0,0.3)' }} />
          </div>

          {/* Right page — actual prose */}
          <div className="dk-paper" style={{ padding: '36px 30px', position: 'relative',
                                                  fontFamily: 'var(--dk-body)' }}>
            <div className="dk-eyebrow" style={{ marginBottom: 12, color: 'var(--dk-ink-faded)' }}>
              ст. 47 · продовжити з закладки
            </div>
            <p style={{ fontSize: 13.5, lineHeight: 1.55, color: 'var(--dk-ink)',
                          margin: '0 0 10px', textWrap: 'pretty' }}>
              <span style={{ fontFamily: 'var(--dk-display)', fontSize: 38,
                                float: 'left', lineHeight: 0.85,
                                margin: '0.06em 0.08em 0 0',
                                color: 'var(--dk-spot)' }}>С</span>
              ніжинка впала на лист, повільно розтанула, залишивши круглу пляму на чорнилі —
              і чорнило не розпливлося. Воно вже було сухе. Дуже-дуже давно сухе.
            </p>
            <p style={{ fontSize: 13.5, lineHeight: 1.55, color: 'var(--dk-ink)',
                          margin: '0 0 10px', textWrap: 'pretty' }}>
              Маринка склала папір удвоє, потім учетверо, і поклала собі в кишеню. На якусь мить
              вона забула, як її звуть. На якусь зовсім коротку мить.
            </p>
            <p style={{ fontSize: 13.5, lineHeight: 1.55, color: 'var(--dk-ink)',
                          margin: '0 0 10px', textWrap: 'pretty' }}>
              Сніг падав і падав. Поштова скринька стояла відчинена, наче рот, з якого щойно
              вилетіло слово.
            </p>
            <div style={{ position: 'absolute', bottom: 24, right: 30,
                            fontFamily: 'var(--dk-hand)', fontSize: 22,
                            color: 'var(--dk-pencil-mark)', transform: 'rotate(-3deg)',
                            lineHeight: 1.1 }}>
              ↪ продовжити
            </div>
          </div>
        </div>
      </div>

      {/* === STACK OF BOOKS to the right — "to read" pile ============== */}
      <div style={{ position: 'absolute', top: 130, right: 90, width: 280, zIndex: 18 }}>
        <div className="dk-eyebrow" style={{ position: 'absolute', top: -28,
                                                  left: 0,
                                                  color: 'rgba(237,226,200,0.5)' }}>
          стос «прочитати наступним» · 12
        </div>
        {[
          { t: 'Карта втрачених міст', a: 'Тарас Вовк', col: '#5a3522', tilt: -2, w: 270 },
          { t: 'Шепіт Карпат',          a: 'А. Чорний',   col: '#3a2810', tilt: 1,  w: 260 },
          { t: 'Хатня магія',           a: 'Б. Шум',     col: '#6a4830', tilt: -1, w: 268 },
          { t: 'Останній трамвай',      a: 'Я. Бойко',   col: '#2a4858', tilt: 2,  w: 254 },
          { t: 'Янголи їдять борщ',     a: 'О. Гриценко', col: '#7a3020', tilt: -2, w: 266 },
        ].map((b, i) => (
          <div key={b.t} className="dk-shadow"
                 style={{ height: 36, width: b.w,
                           background: b.col,
                           marginTop: i === 0 ? 0 : -8,
                           transform: `rotate(${b.tilt}deg) translateX(${i*4}px)`,
                           position: 'relative',
                           color: 'rgba(255,230,200,0.85)',
                           padding: '0 14px',
                           display: 'flex', alignItems: 'center',
                           borderRadius: 1,
                           borderLeft: '4px solid rgba(0,0,0,0.3)',
                           borderRight: '2px solid rgba(0,0,0,0.2)' }}>
            <div style={{ fontFamily: 'var(--dk-display)', fontStyle: 'italic',
                            fontSize: 13.5, letterSpacing: '0.02em',
                            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {b.t}
            </div>
            <span style={{ flex: 1 }} />
            <div style={{ fontFamily: 'var(--dk-mono)', fontSize: 9, opacity: 0.5,
                            letterSpacing: '0.1em' }}>
              {b.a}
            </div>
          </div>
        ))}
        <div style={{ marginTop: 14, fontFamily: 'var(--dk-hand)',
                        fontSize: 22, color: 'var(--dk-paper-3)',
                        transform: 'rotate(-2deg)', lineHeight: 1.1,
                        textAlign: 'right', paddingRight: 30 }}>
          + ще 7 чекають
        </div>
      </div>

      {/* === FOLDED LETTERS — "new chapters this week" =============== */}
      <div style={{ position: 'absolute', top: 640, left: 60, width: 700, zIndex: 15 }}>
        <div className="dk-eyebrow" style={{ marginBottom: 14, color: 'rgba(237,226,200,0.5)' }}>
          цього тижня прийшли · 5 нових розділів
        </div>
        <div style={{ position: 'relative', height: 240 }}>
          {[
            { day: 'ПН',  date: '12', time: '18:00', t: 'Сім зимових ночей',  ch: 'розд. 4',  a: 'К. Левчук',
              x: 0, y: 0, rot: -3, color: 'paper-aged', stamp: true },
            { day: 'СР',  date: '14', time: '11:00', t: 'Янголи їдять борщ',  ch: 'глава 9', a: 'Б. Шум',
              x: 180, y: 30, rot: 2, color: 'paper' },
            { day: 'ПТ',  date: '16', time: '20:00', t: 'Шепіт Карпат',        ch: 'розд. 19', a: 'А. Чорний',
              x: 360, y: -15, rot: -1, color: 'paper-aged' },
            { day: 'НД',  date: '18', time: '17:00', t: 'Останній трамвай',    ch: 'розд. 12', a: 'Я. Бойко',
              x: 530, y: 20, rot: 4, color: 'paper' },
          ].map((l, i) => (
            <div key={i} className={'dk-shadow ' + (l.color === 'paper-aged' ? 'dk-paper-aged' : 'dk-paper')}
                  style={{ position: 'absolute',
                            left: l.x, top: l.y,
                            width: 220, height: 180,
                            transform: `rotate(${l.rot}deg)`,
                            padding: 18,
                            display: 'flex', flexDirection: 'column',
                            zIndex: 10 - i }}>
              {/* Sealing wax */}
              {l.stamp && (
                <div style={{ position: 'absolute', top: -10, right: 30,
                                width: 36, height: 36, borderRadius: 999,
                                background: 'radial-gradient(circle at 35% 30%, #d8503a, #8a2a10 60%, #5a1a08)',
                                boxShadow: '2px 4px 6px rgba(0,0,0,0.3)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontFamily: 'var(--dk-display)', fontStyle: 'italic',
                                fontSize: 14, color: 'rgba(255,200,170,0.8)',
                                fontWeight: 700 }}>
                  D
                </div>
              )}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span style={{ fontFamily: 'var(--dk-mono)', fontSize: 9.5,
                                 letterSpacing: '0.15em', color: 'var(--dk-ink-faded)' }}>
                  {l.day}
                </span>
                <span style={{ fontFamily: 'var(--dk-display)', fontSize: 26,
                                 fontWeight: 500, lineHeight: 1, color: 'var(--dk-ink)' }}>
                  {l.date}
                </span>
                <span style={{ flex: 1 }} />
                <span style={{ fontFamily: 'var(--dk-mono)', fontSize: 9.5,
                                 color: 'var(--dk-ink-faded)' }}>
                  {l.time}
                </span>
              </div>
              <div style={{ height: 1, background: 'var(--dk-ink-faded)',
                              opacity: 0.5, margin: '8px 0' }} />
              <div style={{ fontFamily: 'var(--dk-display)', fontStyle: 'italic',
                              fontSize: 16, lineHeight: 1.2, color: 'var(--dk-ink)',
                              fontWeight: 500 }}>
                {l.t}
              </div>
              <div style={{ fontFamily: 'var(--dk-mono)', fontSize: 10,
                              color: 'var(--dk-ink-faded)', marginTop: 4 }}>
                {l.ch} · {l.a}
              </div>
              <div style={{ flex: 1 }} />
              <div style={{ fontFamily: 'var(--dk-hand)', fontSize: 18,
                              color: 'var(--dk-pencil-mark)', alignSelf: 'flex-end',
                              transform: 'rotate(-3deg)' }}>
                відкрити →
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* === NOTEBOOK at bottom-right — open with handwritten notes === */}
      <div style={{ position: 'absolute', bottom: 60, right: 70, width: 380,
                      transform: 'rotate(2deg)', zIndex: 22 }}>
        <div className="dk-eyebrow" style={{ position: 'absolute', top: -28, left: 8,
                                                  color: 'rgba(237,226,200,0.5)' }}>
          ваш записник
        </div>
        <div className="dk-shadow dk-paper" style={{ padding: '20px 24px 22px',
                                                            background:
                                                              'repeating-linear-gradient(180deg, transparent 0, transparent 23px, rgba(60,40,10,0.10) 23px, rgba(60,40,10,0.10) 24px), var(--dk-paper)',
                                                            position: 'relative' }}>
          {/* red margin line */}
          <div style={{ position: 'absolute', top: 0, bottom: 0, left: 50,
                          width: 1, background: 'rgba(196,68,31,0.4)' }} />

          <div style={{ paddingLeft: 36, fontFamily: 'var(--dk-hand)',
                          fontSize: 22, lineHeight: 1.1,
                          color: 'var(--dk-pencil-mark)' }}>
            <div style={{ fontFamily: 'var(--dk-display)', fontStyle: 'italic',
                            fontSize: 16, color: 'var(--dk-ink-faded)',
                            marginBottom: 8 }}>
              12 лютого, понеділок
            </div>
            <div style={{ marginBottom: 6 }}>
              ✓ дочитати IV «зимових»
            </div>
            <div style={{ marginBottom: 6, color: 'var(--dk-spot)' }}>
              ✓ <span style={{ textDecoration: 'line-through' }}>повернути «Карту»</span> — лишила собі
            </div>
            <div style={{ marginBottom: 6 }}>
              ◯ написати оля_читає про Калину
            </div>
            <div style={{ marginBottom: 12 }}>
              ◯ нічого важкого до 17 лют
            </div>
            <div style={{ fontFamily: 'var(--dk-display)', fontStyle: 'italic',
                            fontSize: 14, color: 'var(--dk-ink-soft)',
                            margin: '8px 0 4px' }}>
              думки на берегах:
            </div>
            <div style={{ fontSize: 19, lineHeight: 1.2 }}>
              «не розплилося чорнило» —<br/>
              це образ, до якого хочу<br/>
              повернутись завтра.
            </div>
          </div>
        </div>
      </div>

      {/* === PINNED CALENDAR / WALL ITEMS — top-right ================ */}
      <div style={{ position: 'absolute', top: 70, right: 380,
                      width: 200, transform: 'rotate(-3deg)', zIndex: 12 }}>
        <div className="dk-shadow" style={{
            background: 'var(--dk-paper-2)',
            padding: '12px 14px',
            color: 'var(--dk-ink)',
            border: '1px solid rgba(0,0,0,0.1)' }}>
          <div className="dk-eyebrow" style={{ color: 'var(--dk-ink-faded)',
                                                    marginBottom: 6 }}>лютий 2026</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)',
                          gap: 1, fontSize: 9, fontFamily: 'var(--dk-mono)' }}>
            {['Пн','Вт','Ср','Чт','Пт','Сб','Нд'].map(d =>
              <div key={d} style={{ textAlign: 'center', padding: '2px 0',
                                       color: 'var(--dk-ink-faded)' }}>{d}</div>)}
            {[...Array(28)].map((_, i) => {
              const day = i + 1;
              const today = day === 12;
              const event = [12, 14, 16, 18].includes(day);
              return (
                <div key={i} style={{ textAlign: 'center', padding: '3px 0',
                                          fontSize: 10,
                                          background: today ? 'var(--dk-spot)' : 'transparent',
                                          color: today ? 'var(--dk-paper)' :
                                                  event ? 'var(--dk-ink)' : 'var(--dk-ink-faded)',
                                          borderRadius: today ? 999 : 0,
                                          fontWeight: event ? 600 : 400 }}>
                  {day}
                  {event && !today && (
                    <div style={{ width: 3, height: 3, background: 'var(--dk-spot)',
                                    borderRadius: 999, margin: '0 auto' }} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
        {/* Pin */}
        <div style={{ position: 'absolute', top: -6, left: '50%',
                        width: 14, height: 14, marginLeft: -7,
                        background: 'radial-gradient(circle at 35% 30%, #e8c060, #8a6020)',
                        borderRadius: 999,
                        boxShadow: '1px 2px 3px rgba(0,0,0,0.4)' }} />
      </div>

      {/* === A POSTCARD/POLAROID — recommendation from a friend ====== */}
      <div style={{ position: 'absolute', top: 270, right: 360, width: 220,
                      transform: 'rotate(5deg)', zIndex: 14 }}>
        <div className="dk-shadow" style={{ background: '#f0e8d4', padding: 12, paddingBottom: 36,
                                                 border: '1px solid rgba(0,0,0,0.1)' }}>
          <div style={{ height: 130, background: 'linear-gradient(135deg, #5a3522, #3a2810)',
                          position: 'relative', overflow: 'hidden' }}>
            <GeneratedCover title={NOVELS[5].title} author={NOVELS[5].author} seed="n6" showText={false} />
          </div>
          <div style={{ fontFamily: 'var(--dk-hand)', fontSize: 18,
                          color: 'var(--dk-pencil-mark)', marginTop: 8, lineHeight: 1.1 }}>
            «прочитай це.<br/>я знаю, що ти<br/>не читаєш дистопій.<br/>прочитай»
          </div>
          <div style={{ fontFamily: 'var(--dk-hand)', fontSize: 16,
                          color: 'var(--dk-spot)', marginTop: 6,
                          textAlign: 'right' }}>
            — оля
          </div>
        </div>
      </div>

      {/* === MOOD MENU at bottom — like a printed library card ====== */}
      <div style={{ position: 'absolute', bottom: 60, left: 60, width: 540,
                      transform: 'rotate(-1deg)', zIndex: 16 }}>
        <div className="dk-eyebrow" style={{ position: 'absolute', top: -28, left: 8,
                                                  color: 'rgba(237,226,200,0.5)' }}>
          картка з шухляди · обрати настрій
        </div>
        <div className="dk-shadow" style={{ background: '#f4e8c8',
                                                  border: '1px solid var(--dk-ink-faded)',
                                                  padding: '18px 22px',
                                                  color: 'var(--dk-ink)',
                                                  position: 'relative' }}>
          {/* Library hole-punch */}
          <div style={{ position: 'absolute', top: 8, left: 8, right: 8, height: 10,
                          display: 'flex', justifyContent: 'space-around' }}>
            {[...Array(8)].map((_, i) => (
              <span key={i} style={{ width: 6, height: 6, borderRadius: 999,
                                          background: 'var(--dk-wood)' }} />
            ))}
          </div>

          <div style={{ fontFamily: 'var(--dk-typewriter), var(--dk-mono)',
                          fontSize: 11, letterSpacing: '0.15em',
                          textTransform: 'uppercase', marginTop: 10, marginBottom: 14,
                          color: 'var(--dk-ink-soft)' }}>
            DAMARE / читальний зал / картка №47
          </div>

          <div style={{ fontFamily: 'var(--dk-display)', fontStyle: 'italic',
                          fontSize: 22, color: 'var(--dk-ink)', marginBottom: 12 }}>
            обрати твір за настроєм:
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
                          gap: '8px 24px', marginTop: 14 }}>
            {[
              ['I',   'тиша і сніг',         '47 текстів', 'для довгих вечорів'],
              ['II',  'місто вночі',          '92 тексти',  'Львів, Київ, Харків'],
              ['III', 'на один вечір',        '124 тексти', 'до 10 тис. слів'],
              ['IV',  'розрядка',              '38 текстів', 'нічого важкого'],
              ['V',   'фольклор і пагорби',   '28 текстів', 'Карпати, Полісся'],
              ['VI',  'листи й щоденники',    '54 тексти',  'епістолярні форми'],
            ].map(([n, t, c, sub]) => (
              <div key={n} style={{ display: 'grid',
                                       gridTemplateColumns: '24px 1fr auto',
                                       gap: 8, alignItems: 'baseline',
                                       padding: '7px 0',
                                       borderBottom: '1px dotted var(--dk-ink-faded)' }}>
                <span style={{ fontFamily: 'var(--dk-mono)', fontSize: 11,
                                 color: 'var(--dk-ink-faded)' }}>{n}.</span>
                <div>
                  <div style={{ fontFamily: 'var(--dk-display)', fontStyle: 'italic',
                                  fontSize: 16, color: 'var(--dk-ink)' }}>{t}</div>
                  <div style={{ fontSize: 10.5, color: 'var(--dk-ink-faded)',
                                  marginTop: 1 }}>{sub}</div>
                </div>
                <span style={{ fontFamily: 'var(--dk-mono)', fontSize: 10,
                                 color: 'var(--dk-ink-faded)' }}>{c}</span>
              </div>
            ))}
          </div>

          <div style={{ fontFamily: 'var(--dk-hand)', fontSize: 18,
                          color: 'var(--dk-spot)', marginTop: 14,
                          transform: 'rotate(-1deg)' }}>
            ↪ або просто «дайте щось гарне»
          </div>
        </div>
      </div>

      {/* === COFFEE RING / cup ============================== */}
      <div style={{ position: 'absolute', top: 540, left: 800,
                      width: 70, height: 70, borderRadius: 999,
                      border: '3px solid rgba(80,50,20,0.35)',
                      transform: 'rotate(15deg)', zIndex: 5 }} />
      <div style={{ position: 'absolute', top: 545, left: 805,
                      width: 60, height: 60, borderRadius: 999,
                      border: '1px solid rgba(80,50,20,0.20)',
                      zIndex: 5 }} />

      {/* === ASSORTED MARGINALIA in lamp pool ================ */}
      <div style={{ position: 'absolute', top: 80, left: 600,
                      fontFamily: 'var(--dk-hand)', fontSize: 26,
                      color: 'rgba(237,226,200,0.4)',
                      transform: 'rotate(-8deg)', zIndex: 8 }}>
        ось де я лишила…
      </div>
    </div>
  );
}

// === DESK: TASTE OF ADJACENT — opening a book ====================
// What happens when you click the open book? You're "inside" it.
// This is the reader, but still a desk: you can see your own hands.

function DkReader() {
  return (
    <div className="dk dk-desk" style={{ minHeight: 1000, position: 'relative',
                                              overflow: 'hidden', padding: 32 }}>
      {/* Top — almost no chrome */}
      <div style={{ position: 'absolute', top: 20, left: 32, right: 32,
                      display: 'flex', alignItems: 'baseline', gap: 16, zIndex: 30,
                      fontFamily: 'var(--dk-mono)', fontSize: 10,
                      letterSpacing: '0.16em', textTransform: 'uppercase',
                      color: 'rgba(237,226,200,0.4)' }}>
        <span style={{ fontFamily: 'var(--dk-display)', fontStyle: 'italic',
                         fontSize: 14, letterSpacing: 0, textTransform: 'none' }}>
          ← на стіл
        </span>
        <span style={{ flex: 1 }} />
        <span>с. 47 / 184</span>
        <span>розділ III · з 18</span>
        <span>лампа</span>
        <span>лінійка</span>
      </div>

      {/* The book — much larger, still a physical object */}
      <div style={{ position: 'absolute', top: 70, left: 80, right: 80, bottom: 70,
                      display: 'grid', gridTemplateColumns: '1fr 1fr',
                      transform: 'rotate(-0.5deg)' }}>
        {/* Left page */}
        <div className="dk-shadow dk-paper" style={{ padding: '50px 50px 80px',
                                                          position: 'relative' }}>
          <div className="dk-eyebrow" style={{ position: 'absolute', top: 18, left: 50,
                                                    color: 'var(--dk-ink-faded)' }}>
            48 · Сім зимових ночей
          </div>
          <p style={{ fontFamily: 'var(--dk-body)', fontSize: 15,
                       lineHeight: 1.65, color: 'var(--dk-ink)',
                       margin: '0 0 14px', textWrap: 'pretty' }}>
            <span style={{ fontFamily: 'var(--dk-display)', fontSize: 56,
                              float: 'left', lineHeight: 0.78,
                              margin: '0.04em 0.08em 0 0',
                              color: 'var(--dk-spot)' }}>В</span>
            она тримала лист обома руками, як тримають птаха, коли ще не знають, чи він живий.
            Сніг падав. Маринка дивилася на ці слова — свої слова, написані не нею, — і думала
            про те, як це: бути одночасно адресатом і авторкою.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--dk-ink)',
                       margin: '0 0 14px', textWrap: 'pretty' }}>
            «Дорога я. Знаю, ти не пам'ятаєш, як це писала. Так і має бути. Я писала це для нас
            обох — тієї, що поїхала, і тієї, яка повернеться».
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--dk-ink)',
                       margin: '0 0 14px', textWrap: 'pretty' }}>
            Маринка перевернула аркуш. На звороті був малюнок — олівцем, дуже легкий, майже не
            видний: дім, у якому вона стояла, тільки <em>з боку, якого вона ніколи не бачила</em>.
            З того боку, з якого до нього не можна підійти, бо там лісосмуга, а далі — поле,
            а далі — те, чого вона не пам'ятає.
          </p>

          {/* underline mark by reader */}
          <div style={{ position: 'absolute', top: 248, left: 50, width: 320,
                          height: 2, background: 'var(--dk-spot)', opacity: 0.6,
                          transform: 'rotate(0.3deg)' }} />

          {/* Margin note */}
          <div style={{ position: 'absolute', top: 230, right: 12, width: 80,
                          fontFamily: 'var(--dk-hand)', fontSize: 17,
                          color: 'var(--dk-pencil-mark)', transform: 'rotate(2deg)',
                          lineHeight: 1.1 }}>
            ← це!! образ року
          </div>

          <div style={{ position: 'absolute', bottom: 30, left: 50, right: 50,
                          fontFamily: 'var(--dk-display)', fontStyle: 'italic',
                          fontSize: 12, color: 'var(--dk-ink-faded)',
                          textAlign: 'center' }}>
            ...
          </div>
        </div>

        {/* Right page */}
        <div className="dk-shadow dk-paper" style={{ padding: '50px 50px 80px',
                                                          position: 'relative',
                                                          borderLeft: '1px solid rgba(0,0,0,0.08)' }}>
          <div className="dk-eyebrow" style={{ position: 'absolute', top: 18, right: 50,
                                                    color: 'var(--dk-ink-faded)' }}>
            Сім зимових ночей · 49
          </div>
          <p style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--dk-ink)',
                       margin: '0 0 14px', textWrap: 'pretty' }}>
            Вона довго дивилася на той малюнок. Сніг далі падав. Десь у кишені починало
            тиснути — конверт нагрівався, наче живий. Маринка обережно витягла його, поклала
            поряд із листом, і помітила: на конверті, з того боку, де було ім'я, тепер було
            інше слово. Не її. <em>«Дому»</em>.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--dk-ink)',
                       margin: '0 0 14px', textWrap: 'pretty' }}>
            Вона зайшла всередину.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--dk-ink)',
                       margin: '0 0 14px', textWrap: 'pretty' }}>
            У домі пахло дровами і чимось ще — солодким, як сухі яблука на печі. На столі
            горіла гасова лампа, хоча електрика вже сорок років як була проведена. Маринка не
            торкнулася вимикача. Вона повісила пальто, обережно, наче боялася, що дім її
            розгляне і впізнає.
          </p>

          {/* Bottom-right page corner */}
          <div style={{ position: 'absolute', bottom: 30, right: 50,
                          display: 'flex', gap: 14, alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--dk-mono)', fontSize: 10,
                             color: 'var(--dk-ink-faded)', letterSpacing: '0.1em' }}>
              ст. 49 / 184
            </span>
            <span style={{ fontFamily: 'var(--dk-hand)', fontSize: 18,
                             color: 'var(--dk-pencil-mark)' }}>
              перегорнути →
            </span>
          </div>

          {/* Pencil resting on the page */}
          <div style={{ position: 'absolute', bottom: 60, left: 30, width: 240, height: 8,
                          background: 'linear-gradient(90deg, #d4a060 0%, #d4a060 80%, #2a1810 80%, #2a1810 100%)',
                          borderRadius: 1,
                          transform: 'rotate(-12deg)',
                          boxShadow: '0 4px 8px rgba(0,0,0,0.3)' }} />
        </div>
      </div>

      {/* "Hand" — a glove gesture that you're still IN the room */}
      <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
                      fontFamily: 'var(--dk-hand)', fontSize: 17,
                      color: 'rgba(237,226,200,0.4)', zIndex: 30,
                      padding: '12px 20px',
                      background: 'rgba(12,10,8,0.5)',
                      borderRadius: 4 }}>
        ↻ ще трохи · ▼ закрити книгу · ✎ записати на берег · ☞ kudos авторці
      </div>
    </div>
  );
}

window.DkDiscover = DkDiscover;
window.DkReader = DkReader;
