/* Hot-now data — 4 novels, each with a distinct LIVE signal.
   The signal_kind drives icon + accent color in the card. */

const HOT_NOW = [
  {
    id: 'kultivator',
    title: 'Культиватор з обкладинки журналу',
    author_or_team: 'Дочки Темряви',
    is_translation: true,
    source_lang: 'cn',
    signal_kind: 'burst',          // accent color
    signal_label: '+7 розділів',
    signal_detail: 'за останню добу',
    chapter_count: 184,
    last_chapter_no: 184,
    last_chapter_title: 'Той, хто вміє рахувати кроки в темряві',
    excerpt: 'Лі Цзянь усе ще не знав, чи варто було йому повертатися — але вже точно знав, що пішки до Хуацзіна вже не дістатися.',
  },
  {
    id: 'mizh-poverkhamy',
    title: 'Тиша між поверхами',
    author_or_team: 'Леся Тарнавська',
    is_translation: false,
    source_lang: null,
    signal_kind: 'momentum',       // info color
    signal_label: '↑ 320%',
    signal_detail: 'читачів цього тижня',
    chapter_count: 31,
    last_chapter_no: 22,
    last_chapter_title: 'Той, хто пам’ятає, як ми сюди в’їжджали',
    excerpt: 'У цьому домі найгучніше говорять ті стіни, які давно вже не несуть нічого, окрім себе.',
  },
  {
    id: 'house-dragon',
    title: 'Те, що ми залишаємо собі',
    author_or_team: 'lesia.writes',
    is_translation: false,
    source_lang: null,
    fandom: 'Дім Дракона',
    signal_kind: 'storm',          // love color
    signal_label: '412 коментарів',
    signal_detail: 'обговорення кипить',
    chapter_count: 14,
    last_chapter_no: 14,
    last_chapter_title: 'Епілог · перша зима',
    excerpt: 'Ренейра витерла руку об плащ і сказала тільки: «Я не питатиму, чи ти готовий — питаю, чи ти все ще пам’ятаєш, як це було».',
  },
  {
    id: 'sirko-finale',
    title: 'Сірко повертається додому',
    author_or_team: 'Перекладацька «Смолоскип»',
    is_translation: true,
    source_lang: 'jpn',
    signal_kind: 'finale',         // accent color, "completed" energy
    signal_label: 'фінальний розділ',
    signal_detail: 'вчора · 88 розділів',
    chapter_count: 88,
    last_chapter_no: 88,
    last_chapter_title: 'Дорогою додому',
    excerpt: 'Він уперше за вісім років не відчував поспіху. Світло на ґанку горіло так само, як і тоді — лише трохи тьмяніше.',
  },
];

/* Recent reader comments — surfaces social energy & makes the right column live */
const RECENT_COMMENTS = [
  {
    user: { name: 'kateryna_v', avatar: 'КВ' },
    novel_title: 'Тиша між поверхами',
    chapter_no: 22,
    body: 'Ця сцена з ліфтом — я перечитала тричі. Як ви це робите, що мовчання чути голосніше за крик?',
    kudos: 14,
    time: '6 хв',
  },
  {
    user: { name: 'drozdiv_son', avatar: 'ДС' },
    novel_title: 'Те, що ми залишаємо собі',
    chapter_no: 14,
    body: 'епілог зробив мені боляче і добре одночасно. дякую що довели до кінця 🌿',
    kudos: 28,
    time: '22 хв',
  },
  {
    user: { name: 'ostap.read', avatar: 'ОР' },
    novel_title: 'Культиватор з обкладинки журналу',
    chapter_no: 184,
    body: 'переклад тримає темп ориґіналу, фрази дихають. найкраща глава за останній арк.',
    kudos: 9,
    time: '41 хв',
  },
  {
    user: { name: 'lina_ch', avatar: 'ЛЧ' },
    novel_title: 'Сірко повертається додому',
    chapter_no: 88,
    body: 'я не готова що це останній розділ. читала майже рік, відчуття ніби з кимось прощаюся',
    kudos: 47,
    time: '1 год',
  },
];

/* Top-10 of the week — by user score */
const TOP_WEEK = [
  { rank: 1,  id: 'tysha',       title: 'Тиша між поверхами',         author: 'Леся Тарнавська',         score: 9.4, votes: 2814, trend: '↑2', is_translation: false, source_lang: null },
  { rank: 2,  id: 'kultivator',  title: 'Культиватор з обкладинки журналу', author: 'Дочки Темряви',     score: 9.2, votes: 4120, trend: '=',  is_translation: true,  source_lang: 'cn' },
  { rank: 3,  id: 'sirko',       title: 'Сірко повертається додому',  author: 'Перекл. «Смолоскип»',     score: 9.1, votes: 1980, trend: 'NEW',is_translation: true,  source_lang: 'jpn' },
  { rank: 4,  id: 'house-dragon',title: 'Те, що ми залишаємо собі',   author: 'lesia.writes',            score: 8.9, votes: 3210, trend: '↑5', is_translation: false, source_lang: null },
  { rank: 5,  id: 'aurum',       title: 'Аурум, або Записки з провінції', author: 'Олена Шкарупа',       score: 8.8, votes: 1660, trend: '↓1', is_translation: false, source_lang: null },
  { rank: 6,  id: 'mosaika',     title: 'Мозаїка для тих, хто запізнився', author: 'Іван Дрозд',         score: 8.7, votes: 1402, trend: '↑1', is_translation: false, source_lang: null },
  { rank: 7,  id: 'instr-sun',   title: 'Інструкція з вимкнення сонця', author: 'Аркадій Чорнохліб',     score: 8.6, votes: 4820, trend: '↓2', is_translation: true,  source_lang: 'eng' },
  { rank: 8,  id: 'pelyna',      title: 'Полин на крижаному вітрі',    author: 'Тарас Лимар',            score: 8.5, votes: 1140, trend: '=',  is_translation: false, source_lang: null },
  { rank: 9,  id: 'kyrylytsya',  title: 'Кирилицею з Берліна',         author: 'Дочки Темряви',           score: 8.4, votes:  920, trend: '↑3', is_translation: true,  source_lang: 'deu' },
  { rank: 10, id: 'dim-pereiezh',title: 'Дім, у якому всі переїжджають', author: 'Ярина Свіжак',         score: 8.3, votes: 2110, trend: '↓3', is_translation: false, source_lang: null },
];

Object.assign(window, { HOT_NOW, RECENT_COMMENTS, TOP_WEEK });
