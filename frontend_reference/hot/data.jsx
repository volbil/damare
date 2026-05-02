/* Mock data shaped to match templates/home/home.html context.
   All strings authored in Ukrainian to match real rendering. */

const MOCK_CONTINUE = [
  {
    novel: { id: 'aurum', title: 'Аурум, або Записки з провінції', author: 'Олена Шкарупа', chapter_count: 24 },
    chapter_no: 14,
    progress: 58,
  },
  {
    novel: { id: 'pelyna', title: 'Полин на крижаному вітрі', author: 'Тарас Лимар', chapter_count: 18 },
    chapter_no: 17,
    progress: 92, // triggers "останній розділ" treatment in revised
  },
  {
    novel: { id: 'nadtoplyu', title: 'Надто плюшеві ліси', author: 'Соломія Береза', chapter_count: 12 },
    chapter_no: 4,
    progress: 31,
  },
];

const MOCK_FRESH = [
  {
    novel: { id: 'kyrylytsya', title: 'Кирилицею з Берліна' },
    team: { name: 'Дочки Темряви', avatar: 'ДТ', handle: 'dochky' },
    chapter_no: 23,
    chapter_title: 'Те, що залишається в пальті',
    excerpt: 'Він уперше за тиждень увімкнув світло на кухні — і одразу пошкодував.',
    time: '14 хв',
  },
  {
    novel: { id: 'mosaika', title: 'Мозаїка для тих, хто запізнився' },
    team: null,
    author: { name: 'Іван Дрозд', avatar: 'ІД', handle: 'drozd' },
    chapter_no: 7,
    chapter_title: 'Кафе «Атлас»',
    excerpt: 'У цьому місті всі зустрічі починаються з фрази «я тут уперше», навіть якщо ні.',
    time: '1 год',
  },
  {
    novel: { id: 'sirko', title: 'Сірко повертається додому' },
    team: { name: 'Перекладацька майстерня «Смолоскип»', avatar: 'СМ', handle: 'smoloskyp' },
    chapter_no: 2,
    chapter_title: null,
    excerpt: 'Дорога до селища була довшою, ніж він пам’ятав. Або він став коротшим.',
    time: '3 год',
  },
  {
    novel: { id: 'velet', title: 'Велет, що боявся темряви' },
    team: null,
    author: { name: 'Олекса Кравець', avatar: 'ОК', handle: 'kravets' },
    chapter_no: 11,
    chapter_title: 'Перший сніг',
    excerpt: 'Сніг ішов так, ніби хтось забув його вимкнути, і це мало щось означати.',
    time: '7 год',
  },
  {
    novel: { id: 'tysha', title: 'Тиша між поверхами' },
    team: null,
    author: { name: 'Леся Тарнавська', avatar: 'ЛТ', handle: 'lesia' },
    chapter_no: 22,
    chapter_title: 'Той, хто пам’ятає',
    excerpt: 'У цьому домі найгучніше говорять ті стіни, які давно вже не несуть нічого.',
    time: '11 год',
  },
  {
    novel: { id: 'pelyna', title: 'Полин на крижаному вітрі' },
    team: { name: 'Перекладацька «Смолоскип»', avatar: 'СМ', handle: 'smoloskyp' },
    chapter_no: 18,
    chapter_title: 'Наступного ранку',
    excerpt: 'Уранці він зрозумів, що сніг уже навіть не спадав — він просто стояв у повітрі.',
    time: '14 год',
  },
];

const MOCK_FEATURED = {
  id: 'tysha',
  title: 'Тиша між поверхами',
  author: 'Леся Тарнавська',
  chapter_count: 31,
  summary: 'Ліфт у старому будинку зупиняється між третім і четвертим — і кожен мешканець по-своєму вирішує, що робити з цією тишею.',
  // for revised version:
  pull_quote: 'У цьому домі найгучніше говорять ті стіни, які давно вже не несуть нічого, окрім себе.',
  editor_note: 'Найтонший дебют сезону — про багатоквартирну самотність і дрібну ввічливість як форму опору.',
  week: 18,
};

const MOCK_TRENDING = [
  { id: 't1', title: 'Інструкція з вимкнення сонця', author: 'Аркадій Чорнохліб', kudos: 4820, comments: 312, hits: 38400, type: 'translation', source_language: 'eng', status: null,           progress: 0 },
  { id: 't2', title: 'Дім, у якому всі переїжджають', author: 'Ярина Свіжак',     kudos: 3210, comments: 198, hits: 24100, type: 'original',    source_language: null,  status: null,           progress: 0 },
  { id: 't3', title: 'Пів-чашки кави в Чернівцях',    author: 'Богдан Лисий',      kudos: 2890, comments: 144, hits: 19200, type: 'translation', source_language: 'pol', status: null,           progress: 27 },
  { id: 't4', title: 'Запах ранкових ліфтів',          author: 'Соломія Береза',    kudos: 2410, comments: 121, hits: 17800, type: 'original',    source_language: null,  status: 'Завершено',    progress: 0 },
  { id: 't5', title: 'Я залишила собаці ключі',         author: 'Орися Майборода',   kudos: 2180, comments:  88, hits: 15400, type: 'translation', source_language: 'jpn', status: null,           progress: 0 },
];

const MOCK_RECENT = [
  { id: 'r1', title: 'Пасажири нічного 73-го', author: 'Володимир Заплітний', kudos: 1820, comments: 98,  hits: 11200, type: 'original',    source_language: null,  status: null,        progress: 0 },
  { id: 'r2', title: 'Тиша між поверхами',     author: 'Леся Тарнавська',     kudos: 5410, comments: 412, hits: 41200, type: 'original',    source_language: null,  status: null,        progress: 0 },
  { id: 'r3', title: 'Кирилицею з Берліна',     author: 'Дочки Темряви',       kudos: 1240, comments:  61, hits:  8900, type: 'translation', source_language: 'deu', status: null,        progress: 0 },
  { id: 'r4', title: 'Сірко повертається додому', author: 'Перекл. «Смолоскип»', kudos:  890, comments:  44, hits:  6100, type: 'translation', source_language: 'jpn', status: null,        progress: 0 },
  { id: 'r5', title: 'Колекціонер дрібних радостей', author: 'Мар’яна Дудник',  kudos:  720, comments:  31, hits:  4900, type: 'original',    source_language: null,  status: 'Завершено', progress: 0 },
];

Object.assign(window, { MOCK_CONTINUE, MOCK_FRESH, MOCK_FEATURED, MOCK_TRENDING, MOCK_RECENT });
