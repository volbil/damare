// Direction A — Editorial / literary-magazine discover
// Scoped under .ed wrapper. Standalone — no chrome from main app.

function EdDiscover() {
  return (
    <div className="ed ed-paper-bg" style={{ minHeight: '100%', padding: '0 0 64px' }}>
      {/* === Folio bar (running head) ============================== */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                      padding: '14px 56px 12px', borderBottom: '1px solid var(--ed-ink)' }}>
        <span className="ed-folio">Damare · літературний журнал</span>
        <span className="ed-folio">№ 47 · зима 2026 · понеділок, 12 лютого</span>
        <span className="ed-folio">укр / 一 / arkush.ua</span>
      </div>

      {/* === Masthead ============================================== */}
      <div style={{ padding: '24px 56px 8px', display: 'flex',
                      alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <div className="ed-masthead">Damare</div>
        <div style={{ textAlign: 'right', fontFamily: 'var(--ed-mono)', fontSize: 11,
                       lineHeight: 1.5, color: 'var(--ed-ink-2)', letterSpacing: '0.05em' }}>
          ВИПУСК ЦЬОГО ТИЖНЯ:<br/>
          14 нових розділів · 3 дебюти<br/>
          1 зимовий конкурс · обов'язкове читання
        </div>
      </div>

      <div style={{ padding: '0 56px' }}>
        <div className="ed-rule-double" style={{ marginBottom: 4 }} />
        <div className="ed-rule-thin" />
      </div>

      {/* === LEAD SPREAD ============================================ */}
      <div style={{ padding: '40px 56px 32px',
                      display: 'grid', gridTemplateColumns: '1fr 1.4fr',
                      gap: 48, alignItems: 'start' }}>
        {/* LEFT: editor's note */}
        <aside style={{ paddingRight: 32, borderRight: '1px solid var(--ed-ink)' }}>
          <div className="ed-eyebrow" style={{ marginBottom: 14 }}>Слово редактора</div>
          <p className="ed-dropcap" style={{ fontSize: 15, lineHeight: 1.55,
                                                margin: '0 0 14px', textWrap: 'pretty' }}>
            Цей тиждень — про повернення. Калина Левчук завершує цикл, який ми супроводжуємо
            від листопада, і ми вирішили винести її новий розділ на першу шпальту повністю —
            без скорочень, без блоків з рекомендаціями, без бічних колонок.
          </p>
          <p style={{ fontSize: 14, lineHeight: 1.55, margin: '0 0 14px',
                       color: 'var(--ed-ink-2)', textWrap: 'pretty' }}>
            Якщо ви тут уперше: Damare — це місце для прози, яку важко знайти в інших
            каталогах. Кожна проза зимового сезону відібрана редакцією разом з нашими
            читачами; жодного алгоритму, лише люди, які читають довго і повільно.
          </p>
          <p style={{ fontSize: 12, fontStyle: 'italic', color: 'var(--ed-ink-3)', margin: 0 }}>
            — Тереса Заячук, головна редакторка
          </p>

          <div className="ed-rule" style={{ margin: '32px 0 16px' }} />

          <div className="ed-eyebrow" style={{ marginBottom: 12 }}>У цьому випуску</div>
          <ol style={{ margin: 0, padding: 0, listStyle: 'none' }}>
            {[
              ['I',   'Лід',          'Сім зимових ночей · розділ 4',  'с. 1'],
              ['II',  'Дебют',        'Янголи їдять борщ',              'с. 4'],
              ['III', 'Огляд',        'Карта втрачених міст',           'с. 6'],
              ['IV',  'Підбірка',     'Зимові твори: 12 текстів',       'с. 8'],
              ['V',   'Хроніка',      'Розклад на тиждень',             'с. 11'],
              ['VI',  'Лист читача',  'Про другий розділ К.Л.',         'с. 14'],
            ].map(([i, k, t, p]) => (
              <li key={i} style={{ display: 'grid',
                                      gridTemplateColumns: '24px 70px 1fr auto',
                                      gap: 8, alignItems: 'baseline',
                                      padding: '7px 0', borderBottom: '1px dotted var(--ed-ink-3)',
                                      fontSize: 12.5 }}>
                <span style={{ fontFamily: 'var(--ed-mono)', color: 'var(--ed-ink-3)' }}>{i}.</span>
                <span className="ed-eyebrow" style={{ fontSize: 9.5 }}>{k}</span>
                <span style={{ fontStyle: 'italic' }}>{t}</span>
                <span className="ed-num" style={{ fontFamily: 'var(--ed-mono)', fontSize: 11,
                                                       color: 'var(--ed-ink-3)' }}>{p}</span>
              </li>
            ))}
          </ol>
        </aside>

        {/* RIGHT: lead piece */}
        <article>
          <div className="ed-eyebrow" style={{ marginBottom: 12 }}>
            ПЕРША ШПАЛЬТА · РОМАН З ПРОДОВЖЕННЯМ
          </div>
          <h1 style={{ fontSize: 96, fontWeight: 700, lineHeight: 0.93,
                        letterSpacing: '-0.045em', marginBottom: 18, textWrap: 'balance' }}>
            Сім зимових ночей,<br/>
            <span style={{ fontStyle: 'italic', fontWeight: 400 }}>четверта</span>
          </h1>

          {/* Byline + signature stats — print-card style */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 18, paddingBottom: 14,
                          borderBottom: '1px solid var(--ed-ink)', marginBottom: 22,
                          flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'var(--ed-display)', fontStyle: 'italic',
                             fontSize: 16, fontWeight: 500 }}>
              Калина Левчук
            </span>
            <span style={{ color: 'var(--ed-ink-3)' }}>·</span>
            <span style={{ fontFamily: 'var(--ed-mono)', fontSize: 11,
                             letterSpacing: '0.06em', color: 'var(--ed-ink-2)' }}>
              ЕПІСТОЛЯРНИЙ · МАГРЕАЛІЗМ · ЗИМА
            </span>
            <span style={{ flex: 1 }} />
            <span className="ed-num" style={{ fontFamily: 'var(--ed-mono)', fontSize: 11.5,
                                                  color: 'var(--ed-ink-3)' }}>
              4 820 слів · ≈ 22 хв · нд 18:00
            </span>
          </div>

          {/* Two-column body, real magazine columns */}
          <div style={{ columnCount: 2, columnGap: 28, columnRule: '1px solid var(--ed-ink-3)',
                          fontSize: 14.5, lineHeight: 1.62, textWrap: 'pretty',
                          color: 'var(--ed-ink-2)' }}>
            <p className="ed-dropcap" style={{ margin: '0 0 12px' }}>
              Сніг падав так, як падає тільки на Поліссі — повільно, з тією важкою терплячістю,
              з якою старі люди розповідають довгі історії. Маринка стояла біля воріт батьківської
              хати і дивилася, як сніжинки одна за одною лягають на дерев'яну поштову скриньку,
              прибиту до паркана ще її дідом.
            </p>
            <p style={{ margin: '0 0 12px' }}>
              Сім років. Сім років вона не приїжджала сюди. За цей час вона встигла переїхати
              до Львова, потім до Кракова, потім назад до Києва. Вона встигла закінчити
              аспірантуру, написати дисертацію, яку ніхто не прочитав, і втратити двох
              близьких людей.
            </p>

            <div style={{ breakInside: 'avoid', margin: '12px 0',
                            padding: '14px 0', borderTop: '1px solid var(--ed-ink)',
                            borderBottom: '1px solid var(--ed-ink)' }}>
              <p className="ed-pull" style={{ margin: 0 }}>
                «Прочитати в той день, коли повернешся.»
              </p>
              <div style={{ marginTop: 8, fontSize: 11, fontFamily: 'var(--ed-mono)',
                              letterSpacing: '0.1em', textTransform: 'uppercase',
                              color: 'var(--ed-spot)' }}>
                — З листа, що чекав сім років
              </div>
            </div>

            <p style={{ margin: '0 0 12px' }}>
              Усередині — лист. Маринка побачила його ще здалеку, краєчок жовтуватого паперу
              визирав з-під металевої кришки. Вона потягнула за ручку — заіржавіло, але піддалося.
              Конверт був без марки, без штампа. На ньому стояло її ім'я, написане її власним
              почерком.
            </p>
            <p style={{ margin: '0 0 12px' }}>
              Вона роззирнулася. На вулиці нікого. Тільки сніг і тиша, та десь далеко гавкнув
              собака — приглушено, як крізь подушку. Той самий нахил, та сама петелька в літері «к».
            </p>
            <p style={{ margin: 0, fontStyle: 'italic',
                          color: 'var(--ed-ink-3)', fontFamily: 'var(--ed-display)' }}>
              ↪ Продовження на сторінці 2 — або читайте цілком на сайті.
            </p>
          </div>

          {/* CTA strip — done as an old-school price tag, not a button */}
          <div style={{ display: 'flex', alignItems: 'stretch', marginTop: 28,
                          border: '1.5px solid var(--ed-ink)' }}>
            <div style={{ flex: 1, padding: '14px 18px',
                            borderRight: '1.5px solid var(--ed-ink)' }}>
              <div className="ed-eyebrow" style={{ marginBottom: 4, color: 'var(--ed-ink-3)' }}>
                Читати від першого розділу
              </div>
              <div style={{ fontFamily: 'var(--ed-display)', fontStyle: 'italic',
                              fontSize: 18, fontWeight: 500 }}>
                ↗ Перший лист, перший сніг
              </div>
            </div>
            <div style={{ padding: '14px 18px', background: 'var(--ed-ink)',
                            color: 'var(--ed-paper)',
                            display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontFamily: 'var(--ed-mono)', fontSize: 10.5,
                               letterSpacing: '0.12em' }}>СЛІДКУВАТИ</span>
              <span style={{ fontSize: 18 }}>+</span>
            </div>
          </div>
        </article>
      </div>

      {/* === BAND: TIME-CODED ROUNDUP ============================== */}
      <div style={{ padding: '0 56px' }}>
        <div className="ed-rule-thick" style={{ margin: '8px 0 6px' }} />
        <div className="ed-rule-thin" style={{ marginBottom: 24 }} />
      </div>

      <div style={{ padding: '0 56px', display: 'grid',
                      gridTemplateColumns: '180px 1fr', gap: 40, marginBottom: 48 }}>
        <div>
          <div className="ed-eyebrow" style={{ marginBottom: 8 }}>Хроніка</div>
          <h2 style={{ fontSize: 36, lineHeight: 0.95, letterSpacing: '-0.03em',
                        fontStyle: 'italic', fontWeight: 500 }}>
            Що виходить<br/>цього тижня
          </h2>
          <div style={{ marginTop: 12, fontSize: 11.5, color: 'var(--ed-ink-3)',
                          fontFamily: 'var(--ed-mono)', lineHeight: 1.6 }}>
            12–18 лют<br/>
            <span style={{ color: 'var(--ed-spot)' }}>● 7 розділів</span><br/>
            <span style={{ color: 'var(--ed-ink-3)' }}>○ 2 анонси</span>
          </div>
        </div>
        <div>
          {[
            { day: 'ПН', date: '12', time: '18:00', author: 'Калина Левчук',
              title: 'Сім зимових ночей · розділ 4',
              tag: 'епістолярний', words: 4820, status: 'lead' },
            { day: 'ПН', date: '12', time: '21:00', author: 'Тарас Вовк',
              title: 'Карта втрачених міст · розділ 32',
              tag: 'дистопія', words: 5100, status: 'normal' },
            { day: 'СР', date: '14', time: '11:00', author: 'Богдана Шум',
              title: 'Янголи їдять борщ · глава 9',
              tag: 'магреалізм', words: 3200, status: 'normal' },
            { day: 'ПТ', date: '16', time: '20:00', author: 'Андрій Чорний',
              title: 'Шепіт Карпат · розділ 19',
              tag: 'фольклор-горор', words: 6420, status: 'normal' },
            { day: 'НД', date: '18', time: '17:00', author: 'Ярина Бойко',
              title: 'Останній трамвай у Львові · розділ 12',
              tag: 'місто', words: 4100, status: 'normal' },
          ].map((r, i) => (
            <div key={i} style={{ display: 'grid',
                                    gridTemplateColumns: '50px 70px 1fr 130px 70px',
                                    gap: 16, alignItems: 'baseline',
                                    padding: '16px 0',
                                    borderBottom: '1px solid var(--ed-ink)',
                                    borderTop: i === 0 ? '1px solid var(--ed-ink)' : 0 }}>
              <div>
                <div style={{ fontFamily: 'var(--ed-mono)', fontSize: 10.5,
                                letterSpacing: '0.12em', color: 'var(--ed-ink-3)' }}>
                  {r.day}
                </div>
                <div className="ed-num" style={{ fontFamily: 'var(--ed-display)',
                                                      fontSize: 30, lineHeight: 1, fontWeight: 500 }}>
                  {r.date}
                </div>
              </div>
              <div className="ed-num" style={{ fontFamily: 'var(--ed-mono)', fontSize: 12,
                                                   color: 'var(--ed-ink-2)' }}>{r.time}</div>
              <div>
                <div style={{ fontFamily: 'var(--ed-display)', fontSize: 22,
                                lineHeight: 1.15, letterSpacing: '-0.01em',
                                fontStyle: r.status === 'lead' ? 'italic' : 'normal',
                                fontWeight: r.status === 'lead' ? 600 : 500 }}>
                  {r.title}
                  {r.status === 'lead' && (
                    <span style={{ color: 'var(--ed-spot)', marginLeft: 6,
                                     fontSize: 14, verticalAlign: 'super' }}>★</span>
                  )}
                </div>
                <div style={{ fontSize: 13, color: 'var(--ed-ink-3)', marginTop: 2,
                                fontStyle: 'italic' }}>
                  {r.author}
                </div>
              </div>
              <div className="ed-eyebrow" style={{ fontSize: 10, color: 'var(--ed-ink-3)' }}>
                {r.tag}
              </div>
              <div className="ed-num" style={{ textAlign: 'right',
                                                   fontFamily: 'var(--ed-mono)',
                                                   fontSize: 11.5, color: 'var(--ed-ink-3)' }}>
                {r.words.toLocaleString('uk-UA')} сл.
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* === BAND: CRITICAL TAKE — SINGLE WORK SPREAD =============== */}
      <div style={{ padding: '0 56px', marginBottom: 48 }}>
        <div className="ed-rule-double" style={{ marginBottom: 24 }} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 40 }}>
          <div>
            <div className="ed-eyebrow" style={{ marginBottom: 12 }}>Прочитано · огляд</div>
            <h2 style={{ fontSize: 56, lineHeight: 0.95, letterSpacing: '-0.04em',
                          marginBottom: 14, fontWeight: 600, textWrap: 'balance' }}>
              Місто, якого більше нема,<br/>
              <span style={{ fontStyle: 'italic', fontWeight: 400 }}>а воно є</span>
            </h2>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12,
                            marginBottom: 18, paddingBottom: 14,
                            borderBottom: '1px solid var(--ed-ink)' }}>
              <span style={{ fontFamily: 'var(--ed-display)', fontStyle: 'italic',
                               fontSize: 14 }}>
                Тарас Вовк, «Карта втрачених міст»
              </span>
              <span style={{ color: 'var(--ed-ink-3)' }}>·</span>
              <span style={{ fontSize: 12, color: 'var(--ed-ink-3)',
                               fontFamily: 'var(--ed-mono)', letterSpacing: '0.05em' }}>
                рец. Андрій Чорний
              </span>
              <span style={{ flex: 1 }} />
              <span className="ed-num" style={{ fontFamily: 'var(--ed-mono)',
                                                    fontSize: 11, color: 'var(--ed-ink-3)' }}>
                142 800 сл. · 31/40 розд.
              </span>
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.62, margin: '0 0 14px',
                         columnCount: 2, columnGap: 24,
                         columnRule: '1px solid var(--ed-ink-3)',
                         textWrap: 'pretty' }}>
              Вовк пише про картографа, який укладає атлас зниклих міст і виявляє, що його
              власне місто — наступне. Це могла би бути дистопія. Це могла би бути
              філософська притча. Натомість це повільне, точне, майже бухгалтерське
              перерахування того, що зникає першим: вивіски магазинів, голос диспетчерки
              на вокзалі, певний відтінок вуличного ліхтаря в листопаді, окрема порода
              голубів. Метафора працює, бо автор їй не довіряє і весь час перевіряє лінійкою.
            </p>
          </div>
          {/* Right: rating "stamp" */}
          <aside>
            <div style={{ border: '1.5px solid var(--ed-ink)', padding: 20,
                            transform: 'rotate(-1.5deg)',
                            background: 'var(--ed-paper-2)' }}>
              <div className="ed-eyebrow" style={{ color: 'var(--ed-spot)', marginBottom: 8 }}>
                Редакційна оцінка
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                <span className="ed-num" style={{ fontFamily: 'var(--ed-display)',
                                                       fontSize: 72, lineHeight: 0.85,
                                                       fontWeight: 700, fontStyle: 'italic',
                                                       color: 'var(--ed-spot)' }}>
                  4½
                </span>
                <span style={{ fontFamily: 'var(--ed-display)', fontStyle: 'italic',
                                 fontSize: 20, color: 'var(--ed-ink-3)' }}>
                  / 5
                </span>
              </div>
              <div style={{ fontFamily: 'var(--ed-display)', fontStyle: 'italic',
                              fontSize: 16, lineHeight: 1.3, marginTop: 8,
                              borderTop: '1px solid var(--ed-ink)', paddingTop: 8 }}>
                «Найточніше написана дистопія останнього десятиліття.»
              </div>
              <div style={{ fontFamily: 'var(--ed-mono)', fontSize: 10,
                              letterSpacing: '0.1em', textTransform: 'uppercase',
                              color: 'var(--ed-ink-3)', marginTop: 14 }}>
                Стрімкий темп · важка тема<br/>
                Рекомендовано: 16+
              </div>
            </div>
            <div style={{ marginTop: 24, fontFamily: 'var(--ed-display)',
                            fontStyle: 'italic', fontSize: 14, lineHeight: 1.4,
                            color: 'var(--ed-ink-3)' }}>
              Доступно повністю на Damare. Перші три розділи безкоштовно для нечитачів.
            </div>
          </aside>
        </div>
      </div>

      {/* === CLASSIFIEDS: BROWSE BY MOOD =========================== */}
      <div style={{ padding: '0 56px', marginBottom: 48 }}>
        <div className="ed-rule" style={{ marginBottom: 16 }} />
        <div className="ed-eyebrow" style={{ marginBottom: 14 }}>
          Оголошення редакції · знайти за настроєм
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 28 }}>
          {[
            { mood: 'Тиша',          desc: 'Для тих вечорів, коли хочеться слухати лише сніг.',
              count: 47, picks: ['Сім зимових ночей', 'Хатня магія', 'Янголи їдять борщ'] },
            { mood: 'Місто',          desc: 'Львів, Київ, Харків — як живі персонажі, не декорації.',
              count: 92, picks: ['Останній трамвай у Львові', 'Карта втрачених міст', 'Радіохвилі'] },
            { mood: 'Зима',          desc: 'Холод, що не залякує, а робить чутливішим.',
              count: 124, picks: ['Сім зимових ночей', 'Шепіт Карпат', 'Сніжна тітка'] },
            { mood: 'Голос',         desc: 'Перша особа, що звучить як сповідь або як розмова.',
              count: 68, picks: ['Тиша на радіохвилях', 'Хатня магія', 'Янголи їдять борщ'] },
          ].map((c, i) => (
            <article key={c.mood} style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
                <span style={{ fontFamily: 'var(--ed-mono)', fontSize: 11,
                                 letterSpacing: '0.12em', color: 'var(--ed-spot)' }}>
                  №{String(i + 1).padStart(2, '0')}
                </span>
                <span style={{ flex: 1, borderBottom: '1px dotted var(--ed-ink-3)' }} />
                <span className="ed-num" style={{ fontFamily: 'var(--ed-mono)', fontSize: 11,
                                                       color: 'var(--ed-ink-3)' }}>
                  {c.count}
                </span>
              </div>
              <h3 style={{ fontSize: 38, fontStyle: 'italic', fontWeight: 500,
                            lineHeight: 0.95, letterSpacing: '-0.03em',
                            marginBottom: 8 }}>
                {c.mood}.
              </h3>
              <p style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--ed-ink-2)',
                           margin: '0 0 14px', textWrap: 'pretty' }}>
                {c.desc}
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 12,
                            borderTop: '1px solid var(--ed-ink)' }}>
                {c.picks.map(p => (
                  <li key={p} style={{ padding: '7px 0',
                                          borderBottom: '1px dotted var(--ed-ink-3)',
                                          fontStyle: 'italic',
                                          fontFamily: 'var(--ed-display)',
                                          fontSize: 14 }}>
                    ↳ {p}
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: 'auto', paddingTop: 14,
                              fontFamily: 'var(--ed-mono)', fontSize: 10.5,
                              letterSpacing: '0.12em', color: 'var(--ed-ink-3)',
                              textTransform: 'uppercase' }}>
                Усі {c.count} текстів →
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* === FOOTER COLOPHON ====================================== */}
      <div style={{ padding: '0 56px', marginTop: 48 }}>
        <div className="ed-rule-double" />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                        padding: '18px 0', fontFamily: 'var(--ed-mono)',
                        fontSize: 10.5, letterSpacing: '0.12em',
                        textTransform: 'uppercase', color: 'var(--ed-ink-3)' }}>
          <span>Damare №47 · надруковано в Києві · колофон с. 16</span>
          <span style={{ fontStyle: 'italic', fontFamily: 'var(--ed-display)',
                            textTransform: 'none', fontSize: 14, letterSpacing: 0,
                            color: 'var(--ed-ink-2)' }}>
            «що тихіше, то ясніше»
          </span>
          <span>наступний випуск нд 18.02</span>
        </div>
      </div>
    </div>
  );
}

// === EDITORIAL: TASTE OF ADJACENT — A SINGLE WORK PAGE ============
function EdNovelPage() {
  return (
    <div className="ed ed-paper-bg" style={{ minHeight: '100%', padding: '0 0 64px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                      padding: '14px 56px 12px', borderBottom: '1px solid var(--ed-ink)' }}>
        <span className="ed-folio">Damare · літературний журнал</span>
        <span className="ed-folio">с. 6 · огляд</span>
        <span className="ed-folio">↩ повернутись на першу шпальту</span>
      </div>

      <div style={{ padding: '40px 56px 0' }}>
        <div className="ed-eyebrow" style={{ marginBottom: 18 }}>
          Відділ прози · довге читання
        </div>
        <h1 style={{ fontSize: 144, lineHeight: 0.85, letterSpacing: '-0.05em',
                      fontWeight: 700, marginBottom: 8, textWrap: 'balance' }}>
          Сім<br/>
          <span style={{ fontStyle: 'italic', fontWeight: 400 }}>зимових</span><br/>
          ночей.
        </h1>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14,
                        paddingTop: 16, paddingBottom: 14,
                        borderTop: '4px solid var(--ed-ink)',
                        borderBottom: '1px solid var(--ed-ink)',
                        marginBottom: 28 }}>
          <span style={{ fontFamily: 'var(--ed-display)', fontStyle: 'italic',
                           fontSize: 22, fontWeight: 500 }}>
            Калина Левчук
          </span>
          <span style={{ color: 'var(--ed-ink-3)' }}>·</span>
          <span style={{ fontFamily: 'var(--ed-mono)', fontSize: 11.5,
                           letterSpacing: '0.08em', color: 'var(--ed-ink-2)' }}>
            ЕПІСТОЛЯРНИЙ РОМАН · УКРАЇНСЬКОЮ · 2025–2026
          </span>
          <span style={{ flex: 1 }} />
          <span className="ed-num" style={{ fontFamily: 'var(--ed-mono)',
                                                fontSize: 12, color: 'var(--ed-ink-3)' }}>
            14 / 18 розд. · 47 280 сл.
          </span>
        </div>
      </div>

      {/* 4-column print spread */}
      <div style={{ padding: '0 56px',
                      display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr',
                      gap: 36 }}>
        {/* Col 1: synopsis */}
        <div>
          <div className="ed-eyebrow" style={{ marginBottom: 10 }}>Про що це</div>
          <p className="ed-dropcap" style={{ fontSize: 16, lineHeight: 1.6,
                                                 textWrap: 'pretty', margin: '0 0 14px' }}>
            Дівчина з маленького міста на Поліссі повертається додому через сім років. На неї
            чекає дім, повний листів, які вона ніколи не писала — але почерком впізнає
            свій власний.
          </p>
          <p style={{ fontSize: 14.5, lineHeight: 1.6, color: 'var(--ed-ink-2)',
                       textWrap: 'pretty', margin: '0 0 18px' }}>
            Кожен розділ — окремий лист, окремий жанр, окрема пора зими 1932–1939 років.
            Поступово межа між читанням і життям героїні починає танути: зима 1939-го
            говорить з нею через папір, а сніг ніяк не може випасти на жодному з листів.
          </p>

          <div className="ed-rule" style={{ margin: '24px 0 14px' }} />
          <div className="ed-eyebrow" style={{ marginBottom: 10 }}>Цитата з другого розділу</div>
          <p className="ed-pull" style={{ margin: 0 }}>
            «Я писала це для нас обох — тієї, що поїхала, і тієї, яка повернеться.»
          </p>
        </div>

        {/* Col 2: chapter card-catalog */}
        <div>
          <div className="ed-eyebrow" style={{ marginBottom: 10 }}>Розділи</div>
          <div style={{ borderTop: '1px solid var(--ed-ink)' }}>
            {[
              ['I',    'Сніг, який не падає',          '11 гру', 4820, 'read'],
              ['II',   'Лист перший: Мирославі',       '18 гру', 6310, 'read'],
              ['III',  'Лист другий: про дим',          '25 гру', 5440, 'read'],
              ['IV',   'Лист третій: про чорнило',      '01 січ', 5910, 'reading'],
              ['V',    'Лист четвертий: про двері',     '08 січ', 4720, 'pending'],
              ['VI',   'Інтерлюдія: бабусині сни',      '15 січ', 3110, 'pending'],
              ['VII',  'Лист п\'ятий',                  '22 січ', null, 'planned'],
              ['VIII', '— невідомо —',                   '— ',    null, 'planned'],
            ].map(([n, t, d, w, st]) => (
              <div key={n} style={{ display: 'grid',
                                       gridTemplateColumns: '32px 1fr auto',
                                       gap: 10, padding: '9px 0',
                                       borderBottom: '1px dotted var(--ed-ink-3)',
                                       opacity: st === 'planned' ? 0.5 : 1,
                                       background: st === 'reading' ? 'var(--ed-paper-3)' : 'transparent',
                                       margin: st === 'reading' ? '0 -8px' : 0,
                                       padding: st === 'reading' ? '9px 8px' : '9px 0',
                                       alignItems: 'baseline' }}>
                <span style={{ fontFamily: 'var(--ed-mono)', fontSize: 11,
                                 color: st === 'read' ? 'var(--ed-ink-3)' : 'var(--ed-ink)' }}>
                  {n}.
                </span>
                <span style={{ fontFamily: 'var(--ed-display)',
                                 fontStyle: st === 'planned' ? 'italic' : 'normal',
                                 fontSize: 14,
                                 textDecoration: st === 'read' ? 'line-through' : 'none',
                                 textDecorationColor: 'var(--ed-ink-3)' }}>
                  {t}
                </span>
                <span className="ed-num" style={{ fontFamily: 'var(--ed-mono)', fontSize: 10.5,
                                                       color: 'var(--ed-ink-3)' }}>
                  {d}
                </span>
              </div>
            ))}
          </div>
          <div style={{ fontFamily: 'var(--ed-mono)', fontSize: 10.5,
                          letterSpacing: '0.1em', color: 'var(--ed-spot)',
                          marginTop: 14, textTransform: 'uppercase' }}>
            ↳ Зараз читаю розділ IV
          </div>
        </div>

        {/* Col 3: bibliographic card */}
        <div>
          <div className="ed-eyebrow" style={{ marginBottom: 10 }}>Бібліографічна картка</div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12.5 }}>
            <tbody>
              {[
                ['Автор',       'Левчук, Калина'],
                ['Жанр',        'Епістолярний роман'],
                ['Підкатегорії','Магічний реалізм, родинне, зима'],
                ['Розпочато',   '11 грудня 2025'],
                ['Виходить',    'Щонеділі, 18:00'],
                ['Прогноз',     'Завершення кв.II 2026'],
                ['Вікове обм.', '14+'],
                ['Шифр',        'DAM-2025-014'],
                ['Полиця',      'Зимовий каталог'],
                ['Каталогізація', 'Тереса З.'],
              ].map(([k, v]) => (
                <tr key={k}>
                  <td style={{ padding: '7px 8px 7px 0',
                                 borderBottom: '1px solid var(--ed-ink-3)',
                                 verticalAlign: 'top',
                                 fontFamily: 'var(--ed-mono)', fontSize: 10,
                                 letterSpacing: '0.08em', textTransform: 'uppercase',
                                 color: 'var(--ed-ink-3)', width: 110 }}>
                    {k}
                  </td>
                  <td style={{ padding: '7px 0',
                                 borderBottom: '1px solid var(--ed-ink-3)',
                                 fontFamily: 'var(--ed-display)',
                                 fontSize: 14 }}>
                    {v}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ marginTop: 20, padding: '16px 0',
                          borderTop: '4px solid var(--ed-ink)',
                          borderBottom: '1px solid var(--ed-ink)' }}>
            <div className="ed-eyebrow" style={{ marginBottom: 6 }}>На полиці у</div>
            <div className="ed-num" style={{ fontFamily: 'var(--ed-display)',
                                                  fontSize: 44, fontWeight: 600,
                                                  lineHeight: 0.95, fontStyle: 'italic' }}>
              4 120
            </div>
            <div style={{ fontSize: 12, color: 'var(--ed-ink-3)', marginTop: 4 }}>
              читачів і читачок
            </div>
          </div>
        </div>
      </div>

      {/* CTA strip again */}
      <div style={{ padding: '40px 56px 0' }}>
        <div className="ed-rule-double" style={{ marginBottom: 18 }} />
        <div style={{ display: 'flex', alignItems: 'stretch', gap: 0 }}>
          {[
            ['Читати з I',     'із самого початку, як і годиться'],
            ['Продовжити IV',  'ваша поточна закладка'],
            ['Підписатись',    'нові розділи в інбокс'],
            ['↗ Поділитися',   'надіслати товаришці'],
          ].map(([t, s], i) => (
            <a key={t} style={{ flex: 1, padding: '18px 20px',
                                   borderRight: i < 3 ? '1px solid var(--ed-ink)' : 0,
                                   background: i === 1 ? 'var(--ed-ink)' : 'transparent',
                                   color: i === 1 ? 'var(--ed-paper)' : 'var(--ed-ink)',
                                   border: i === 1 ? 0 : 0,
                                   borderTop: '1.5px solid var(--ed-ink)',
                                   borderBottom: '1.5px solid var(--ed-ink)' }}>
              <div style={{ fontFamily: 'var(--ed-display)', fontStyle: 'italic',
                              fontSize: 22, fontWeight: 500, lineHeight: 1 }}>
                {t}
              </div>
              <div style={{ fontFamily: 'var(--ed-mono)', fontSize: 10.5,
                              letterSpacing: '0.1em', textTransform: 'uppercase',
                              marginTop: 6,
                              color: i === 1 ? 'rgba(236,230,214,0.6)' : 'var(--ed-ink-3)' }}>
                {s}
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

window.EdDiscover = EdDiscover;
window.EdNovelPage = EdNovelPage;
