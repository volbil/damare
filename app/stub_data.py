"""Stub fixtures for the design-stub frontend.

Light-novel translation site model — a Series can have multiple Translation
Projects (one per team) sharing source-locked chapter numbering. Originals
collapse to a single creator.

Schema:

    Series
      ├─ id, type ('translation' | 'original')
      ├─ source_language ('ja' | 'ko' | 'zh' | 'uk')
      ├─ summary, tags, warnings, rating
      │
      ├─ (translation only)
      │     ├─ title_ja, title_romaji
      │     ├─ original_author
      │     ├─ original_publisher, original_year, original_status
      │     └─ teams_active []
      │           ├─ team_id, title (this team's UA title)
      │           ├─ status ('active' | 'frozen' | 'completed' | 'dropped')
      │           ├─ chapters_done, last_update, kudos_total
      │           └─ translator_notes_excerpt
      │
      ├─ (original only)
      │     └─ author_obj { id, name, avatar, bio? }
      │
      ├─ chapters_full []
      │     ├─ no
      │     │
      │     ├─ (translation chapters)
      │     │     ├─ primary_title  (the row's display title)
      │     │     └─ translations [{ team_id, title, updated }]
      │     │
      │     └─ (original chapters)
      │           ├─ title
      │           └─ updated
      │
      └─ (backward-compat fields kept on every series so existing card
         and page templates continue to render before they're updated
         phase-by-phase: title, author, chapters, chapter_count, kudos,
         bookmarks, comments, hits, summary, tags, warnings, rating,
         updated, status, progress, words, fandom, author_handle,
         title_en)

    Team — entity with profile, members, list of projects
"""


# ────────────────────────────────────────────────────────────────────────
# Teams
# ────────────────────────────────────────────────────────────────────────

TEAMS = [
    {
        "id": "team_tysha",
        "name": "Тиша",
        "avatar": "Т",
        "kind": "group",
        "members_count": 4,
        "members": [
            {"name": "Маринка К.", "handle": "marinka_k", "role": "редакторка"},
            {"name": "Іван Б.", "handle": "ivan_b", "role": "перекладач"},
            {"name": "Юлія", "handle": "yulia", "role": "перекладачка"},
            {"name": "Богдан", "handle": "bohdan", "role": "коректор"},
        ],
        "joined": "лютого 2024",
        "bio": "Переклад японської повільної прози. Любимо тишу, листи й зимові настрої.",
    },
    {
        "id": "team_snih",
        "name": "Сніг",
        "avatar": "С",
        "kind": "group",
        "members_count": 2,
        "members": [
            {"name": "Олекса", "handle": "oleksa", "role": "перекладач"},
            {"name": "Дарка", "handle": "darka", "role": "редакторка"},
        ],
        "joined": "вересня 2023",
        "bio": "Команда у заморозці. Колись повернемося — обіцяємо.",
    },
    {
        "id": "team_sim_tinei",
        "name": "Сім тіней",
        "avatar": "СТ",
        "kind": "group",
        "members_count": 6,
        "members": [
            {"name": "Тарас В.", "handle": "taras_v", "role": "перекладач"},
            {"name": "Світлана", "handle": "svitlana", "role": "редакторка"},
            {"name": "Андрій К.", "handle": "andriy_k", "role": "перекладач"},
            {"name": "Олена", "handle": "olena_t", "role": "коректорка"},
            {"name": "Михайло", "handle": "mykhailo", "role": "перекладач"},
            {"name": "Юрій", "handle": "yuriy", "role": "оформлення"},
        ],
        "joined": "березня 2023",
        "bio": "Великий колектив, велика амбіція. Беремо великі серіали й доводимо до кінця.",
    },
    {
        "id": "solo_lesyk",
        "name": "Лесик",
        "avatar": "Л",
        "kind": "solo",
        "members_count": 1,
        "members": [{"name": "Лесик", "handle": "lesyk", "role": "усе зразу"}],
        "joined": "січня 2025",
        "bio": "Соло-перекладач. Перекладаю те, що подобається, у власному темпі.",
    },
    {
        "id": "solo_anna_maria",
        "name": "Анна-Марія",
        "avatar": "АМ",
        "kind": "solo",
        "members_count": 1,
        "members": [{"name": "Анна-Марія", "handle": "anna_maria", "role": "перекладачка"}],
        "joined": "червня 2024",
        "bio": "Перекладаю комедійні ранобе. У вільний час пишу рецензії.",
    },
    {
        "id": "team_hryf",
        "name": "Гриф",
        "avatar": "Г",
        "kind": "group",
        "members_count": 3,
        "members": [
            {"name": "Антон", "handle": "anton", "role": "перекладач"},
            {"name": "Кіра", "handle": "kira", "role": "редакторка"},
            {"name": "Гліб", "handle": "hlib", "role": "коректор"},
        ],
        "joined": "грудня 2024",
        "bio": "Свіжий колектив, фокус на романтичних ранобе.",
    },
]


def team_by_id(team_id):
    """Return a team dict by its id, or None if not found."""

    return next((t for t in TEAMS if t["id"] == team_id), None)


# ────────────────────────────────────────────────────────────────────────
# Users — fixtures for the profile page
# ────────────────────────────────────────────────────────────────────────
#
# Three archetypes worth demoing:
#   - kalyna_l : reader (default profile, no team membership, no own works)
#   - olena_h  : original-fiction author (writes n5)
#   - marinka_k: team translator (Тиша · редакторка)
#   - lesyk    : solo translator (runs solo_lesyk)
#
# Other team members reference handles that don't have a USERS fixture.
# user_by_handle returns None for those; the profile route falls back to
# a minimal derived profile from team membership.

USERS = [
    {
        "handle": "kalyna_l",
        "name": "Калина Левчук",
        "avatar": None,  # falls back to initials
        "location": "Київ",
        "joined": "березня 2024",
        "bio": "Читачка-всеїдна. Збираю списки, лишаю kudos, інколи коментую. Працюю в архіві.",
        "team_memberships": [],
        "original_handles": [],
        "roles": [],
        "following": ["olena_h", "marinka_k", "lesyk", "ivan_b"],
    },
    {
        "handle": "olena_h",
        "name": "Олена Гуцалюк",
        "avatar": "ОГ",
        "location": "Львів",
        "joined": "листопада 2023",
        "bio": "Пишу про маленькі міста та дивних сусідів. Магічний реалізм у затишних формах.",
        "team_memberships": [],
        "original_handles": ["n5"],
        "roles": ["авторка"],
        "following": ["marinka_k"],
    },
    {
        "handle": "marinka_k",
        "name": "Маринка К.",
        "avatar": "МК",
        "location": "Київ",
        "joined": "лютого 2024",
        "bio": "Редагую переклади з японської. Люблю крапки в кінці речень. Інколи лишаю занадто багато коментарів на полях.",
        "team_memberships": [{"team_id": "team_tysha", "role": "редакторка"}],
        "original_handles": [],
        "roles": ["редакторка"],
        "following": ["olena_h", "ivan_b", "lesyk"],
    },
    {
        "handle": "lesyk",
        "name": "Лесик",
        "avatar": "Л",
        "location": "Чернігів",
        "joined": "січня 2025",
        "bio": "Соло-перекладач. Беру те, що ніхто не береться, і доводжу до кінця у власному темпі. Командну роботу не люблю — занадто багато перемовин.",
        "team_memberships": [{"team_id": "solo_lesyk", "role": "усе зразу"}],
        "original_handles": [],
        "roles": ["соло-перекладач"],
        "following": ["marinka_k", "olena_h"],
    },
]


def user_by_handle(handle):
    """Return a USERS fixture by handle, or None if no fixture exists."""

    return next((u for u in USERS if u["handle"] == handle), None)


def team_member_by_handle(handle):
    """Find a team member by handle across all teams.

    Returns (team, member) tuple, or (None, None) if not found. Useful for
    deriving a minimal profile when a handle isn't in USERS but the person
    is listed as a team member somewhere.
    """

    for team in TEAMS:
        for member in team.get("members", []):
            if member.get("handle") == handle:
                return team, member
    return None, None


def followers_of(handle):
    """Return list of handles that follow the given handle.

    Derived from each USER's `following` list — single source of truth.
    """

    return [u["handle"] for u in USERS if handle in u.get("following", [])]


def following_of(handle):
    """Return list of handles that the given handle follows."""

    user = user_by_handle(handle)
    return list(user.get("following", [])) if user else []


def user_brief(handle):
    """Return a lightweight display dict for a handle.

    Resolves through USERS first, then team membership. Used for rendering
    follower / following / mention lists without paying for full profile
    resolution each iteration. Returns None if the handle is unknown.
    """

    fixture = user_by_handle(handle)
    if fixture:
        return {
            "handle": fixture["handle"],
            "name": fixture["name"],
            "avatar": fixture.get("avatar"),
            "bio": fixture.get("bio", ""),
            "roles": fixture.get("roles", []),
        }

    team, member = team_member_by_handle(handle)
    if team and member:
        return {
            "handle": member["handle"],
            "name": member["name"],
            "avatar": None,
            "bio": f"{member['role'].capitalize()} у команді {team['name']}.",
            "roles": [member["role"]],
        }

    return None


# ────────────────────────────────────────────────────────────────────────
# Helpers for chapter list construction
# ────────────────────────────────────────────────────────────────────────

def _stub_updated(distance):
    """Fake 'updated' timestamp for a chapter, by distance from team's latest."""

    if distance <= 0:
        return "вчора"
    elif distance == 1:
        return "5 днів тому"
    elif distance == 2:
        return "тиждень тому"
    elif distance == 3:
        return "2 тижні тому"
    elif distance <= 5:
        return "3 тижні тому"
    elif distance <= 10:
        return "місяць тому"
    else:
        return "давно"


def _make_translation_chapters(team_coverages, max_to_populate=50):
    """Build chapters_full for a translation series.

    team_coverages: list of dicts: { team_id, chapters_done, titles? }
    Order matters — the first team in the list is treated as primary.
    """

    if not team_coverages:
        return []

    visible = min(max_to_populate, max(c["chapters_done"] for c in team_coverages))
    chapters = []

    for i in range(visible):
        translations = []

        for c in team_coverages:
            if i < c["chapters_done"]:
                titles = c.get("titles", [])
                title = titles[i] if i < len(titles) else f"Розділ {i + 1}"
                translations.append({
                    "team_id": c["team_id"],
                    "title": title,
                    "updated": _stub_updated(c["chapters_done"] - i - 1),
                })

        if translations:
            chapters.append({
                "no": i + 1,
                "primary_title": translations[0]["title"],
                "translations": translations,
            })

    return chapters


def _make_original_chapters(titles, max_to_populate=50):
    """Build chapters_full for an original series."""

    visible = min(max_to_populate, len(titles))
    return [
        {
            "no": i + 1,
            "title": titles[i],
            "updated": _stub_updated(visible - i - 1),
        }
        for i in range(visible)
    ]


# ────────────────────────────────────────────────────────────────────────
# Per-series chapter title pools (only specified where it matters)
# ────────────────────────────────────────────────────────────────────────

# n1 — multi-team showcase. Two teams, divergent translations.
_N1_TYSHA_TITLES = [
    "Я помер. Знову.",
    "Прокинулась у дівочому тілі",
    "Хвіст. Чому хвіст?",
    "Аптекаря не існує — це я",
    "Принцеса повертається з могили",
    "Перший пацієнт — генерал",
    "Що це за магія, я ж хімік",
    "Дисертація знайшла мене",
    "Бал, на якому всі помирають",
    "Тітка Степанида знає більше",
    "Хвіст — це політична проблема",
    "Імператор має нежить",
    "Лабораторія в підвалі замку",
    "Я отруїв міністра (ненавмисне)",
]

_N1_SNIH_TITLES = [
    "Я знов помер.",
    "Жінкою прокидаюсь",
    "Хвіст? Серйозно?",
    "Я і є аптекар?",
    "Принцеса воскресла",
    "Генерал — пацієнт перший",
    "Магія чи хімія?",
    "Дисертація мене знайшла",
]

_N5_TITLES = [
    "Перша зустріч на сходах",
    "Газовий рахунок",
    "Чай з мохом",
    "Дерево у вікні",
    "Літо, що лишилось",
]

_N8_TITLES = [
    "Понеділок, 7:23",
    "Спроба перша",
    "Спроба третя (друга не вийшла)",
    "Космічний об'єкт у новинах",
    "Я знаю, де мої ключі",
    "Світ закінчиться у четвер",
    "Сорок п'ятий понеділок",
    "Я просто залишусь у ліжку",
]


# ────────────────────────────────────────────────────────────────────────
# Series — translations (6) + originals (2)
# ────────────────────────────────────────────────────────────────────────

NOVELS = [
    # ════════════ n1 — toxicologist princess (multi-team showcase) ════════════
    {
        "id": "n1",
        "type": "translation",

        # Source-level
        "title_ja": "毒物学者だった私が、目覚めたら謎の薬師、しかも尻尾がある",
        "title_romaji": "Dokubutsugakusha datta watashi ga…",
        "original_author": "Хіросі Канесакі",
        "source_language": "ja",
        "original_publisher": "Shogakukan",
        "original_year": 2024,
        "original_status": "У процесі",

        # Universal
        "summary": "Помер від перевтоми за робочим столом — прокинувся в дівочому тілі у фентезі-світі. Стандартне ізекай. Чого не очікував — бути принцесою-аптекарем, яку всі вважають мертвою. І мати хвіст. Принаймні фінансова стабільність.",
        "tags": ["ізекай", "перевтілення", "комедія", "магія", "повільне горіння"],
        "warnings": [],
        "rating": "T",

        # Teams
        "teams_active": [
            {
                "team_id": "team_tysha",
                "title": "Я був звичайним токсикологом у п'ятницю ввечері, але прокинувся загадковим лікарем-аптекарем у тілі двадцятилітньої принцеси, та чомусь у мене з'явився довгий хвіст",
                "status": "active",
                "chapters_done": 14,
                "last_update": "2 дні тому",
                "kudos_total": 4128,
                "translator_notes_excerpt": "Цей перекладач любить хвіст не менше за вас. Сподіваюсь, читається із задоволенням.",
            },
            {
                "team_id": "team_snih",
                "title": "Принцеса з хвостом",
                "status": "frozen",
                "chapters_done": 8,
                "last_update": "місяць тому",
                "kudos_total": 412,
                "translator_notes_excerpt": "Команда у тимчасовій паузі. Повернемося, коли стане час.",
            },
        ],

        "chapters_full": _make_translation_chapters([
            {"team_id": "team_tysha", "chapters_done": 14, "titles": _N1_TYSHA_TITLES},
            {"team_id": "team_snih", "chapters_done": 8, "titles": _N1_SNIH_TITLES},
        ]),

        # Backward-compat
        "title": "Я був звичайним токсикологом у п'ятницю ввечері, але прокинувся загадковим лікарем-аптекарем у тілі двадцятилітньої принцеси, та чомусь у мене з'явився довгий хвіст",
        "title_en": "I Was Just a Toxicologist Friday Night, but I Woke Up as a Mysterious Apothecary in the Body of a 20-Year-Old Princess, and for Some Reason I Have a Long Tail Now",
        "author": "Хіросі Канесакі",
        "author_handle": "kanesaki_h",
        "fandom": "金崎 浩 (Kanesaki Hiroshi)",
        "chapters": 14,
        "chapter_count": 18,
        "words": 47280,
        "kudos": 4128,
        "bookmarks": 1812,
        "comments": 389,
        "hits": 52480,
        "updated": "2 дні тому",
        "status": "У процесі",
        "progress": 48,
    },

    # ════════════ n2 — angel utility (single team, completed) ════════════
    {
        "id": "n2",
        "type": "translation",

        "title_ja": "隣のアパートの天使が私の電気を全部使う",
        "title_romaji": "Tonari no apaato no tenshi ga watashi no denki o zenbu tsukau",
        "original_author": "Кенджі Накагава",
        "source_language": "ja",
        "original_publisher": "Kadokawa",
        "original_year": 2023,
        "original_status": "Завершено",

        "summary": "До київської п'ятиповерхівки переселяється тиха дівчина-янгол. Тільки одна проблема — вона генерує електрику просто від того, що жива, і КП через місяць приходить з претензіями. Маленька історія про любов і дотації.",
        "tags": ["повсякденність", "комедія", "затишне", "магічний реалізм"],
        "warnings": [],
        "rating": "G",

        "teams_active": [
            {
                "team_id": "team_tysha",
                "title": "Янгол із сусідньої квартири споживає всю мою електроенергію",
                "status": "completed",
                "chapters_done": 8,
                "last_update": "тиждень тому",
                "kudos_total": 1892,
                "translator_notes_excerpt": "Любим це ранобе. Дякуємо всім, хто читав.",
            },
        ],

        "chapters_full": _make_translation_chapters([
            {"team_id": "team_tysha", "chapters_done": 8},
        ]),

        "title": "Янгол із сусідньої квартири споживає всю мою електроенергію",
        "title_en": "The Angel from the Apartment Next Door Uses All My Electricity",
        "author": "Кенджі Накагава",
        "author_handle": "nakagawa_k",
        "fandom": "中川 健司 (Nakagawa Kenji)",
        "chapters": 8,
        "chapter_count": 8,
        "words": 22150,
        "kudos": 1892,
        "bookmarks": 821,
        "comments": 234,
        "hits": 18200,
        "updated": "тиждень тому",
        "status": "Завершено",
        "progress": 100,
    },

    # ════════════ n3 — otome bakery (multi-team) ════════════
    {
        "id": "n3",
        "type": "translation",

        "title_ja": "私はオトメゲームの悪役令嬢に転生したけれど、登場人物全員が阿呆だったので、ただパン屋を開いた",
        "title_romaji": "Watashi wa otome geemu no akuyaku reijou ni tensei shita keredo…",
        "original_author": "Сакура Хошіно",
        "source_language": "ja",
        "original_publisher": "Hakusensha",
        "original_year": 2024,
        "original_status": "У процесі",

        "summary": "Аліна знала свою долю: померти від рук головної героїні в третьому акті. Але після зустрічі з принцом-«головним героєм», який не може назвати власну столицю, вона зрозуміла — ці дурні нікого не врятують. Краще пекти круасани.",
        "tags": ["перевтілення", "отоме", "комедія", "повільне горіння", "романтика"],
        "warnings": [],
        "rating": "T",

        "teams_active": [
            {
                "team_id": "team_sim_tinei",
                "title": "Я перевтілилась у злодійку отоме-гри, але всі персонажі — ідіоти, тому я просто відкрила пекарню",
                "status": "active",
                "chapters_done": 22,
                "last_update": "вчора",
                "kudos_total": 3200,
                "translator_notes_excerpt": "Великий проєкт, доводимо до кінця. Дякуємо за підтримку.",
            },
            {
                "team_id": "solo_lesyk",
                "title": "Я — злодійка, але вирішила пекти",
                "status": "active",
                "chapters_done": 15,
                "last_update": "5 днів тому",
                "kudos_total": 691,
                "translator_notes_excerpt": "Я переклав це бо люблю круасани.",
            },
        ],

        "chapters_full": _make_translation_chapters([
            {"team_id": "team_sim_tinei", "chapters_done": 22},
            {"team_id": "solo_lesyk", "chapters_done": 15},
        ]),

        "title": "Я перевтілилась у злодійку отоме-гри, але всі персонажі — ідіоти, тому я просто відкрила пекарню",
        "title_en": "I Reincarnated as the Villainess of an Otome Game, but All the Characters Are Idiots, So I Just Opened a Bakery",
        "author": "Сакура Хошіно",
        "author_handle": "hoshino_s",
        "fandom": "星野 さくら (Hoshino Sakura)",
        "chapters": 22,
        "chapter_count": 24,
        "words": 89120,
        "kudos": 3891,
        "bookmarks": 1401,
        "comments": 612,
        "hits": 38140,
        "updated": "вчора",
        "status": "У процесі",
        "progress": 62,
    },

    # ════════════ n4 — girlfriend's older sister (single team) ════════════
    {
        "id": "n4",
        "type": "translation",

        "title_ja": "私の彼女の姉も私の彼女だが、まだ誰も知らない、私自身も含めて",
        "title_romaji": "Watashi no kanojo no ane mo watashi no kanojo da ga…",
        "original_author": "Кента Аояма",
        "source_language": "ja",
        "original_publisher": "Kodansha",
        "original_year": 2025,
        "original_status": "У процесі",

        "summary": "Іто-кун закохався в Юку. Юка любить його. Старша сестра Юки, Айя, теж його любить — і чомусь Іто-кун теж її любить, але не знає чому. Можливо, йому стерли пам'ять. Можливо, це історія про амнезію. Або пара ідіотів.",
        "tags": ["романтика", "комедія", "школа", "гарем", "повільне горіння"],
        "warnings": [],
        "rating": "T",

        "teams_active": [
            {
                "team_id": "team_hryf",
                "title": "Старша сестра моєї дівчини теж моя дівчина, але про це поки ніхто не знає, включно зі мною",
                "status": "active",
                "chapters_done": 11,
                "last_update": "5 днів тому",
                "kudos_total": 1620,
                "translator_notes_excerpt": "Романтичний хаос — наш профіль. Чекайте на нові розділи.",
            },
        ],

        "chapters_full": _make_translation_chapters([
            {"team_id": "team_hryf", "chapters_done": 11},
        ]),

        "title": "Старша сестра моєї дівчини теж моя дівчина, але про це поки ніхто не знає, включно зі мною",
        "title_en": "My Girlfriend's Older Sister Is Also My Girlfriend, but Nobody Knows Yet, Including Me",
        "author": "Кента Аояма",
        "author_handle": "aoyama_k",
        "fandom": "青山 健太 (Aoyama Kenta)",
        "chapters": 11,
        "chapter_count": 16,
        "words": 38400,
        "kudos": 1620,
        "bookmarks": 482,
        "comments": 201,
        "hits": 14920,
        "updated": "4 дні тому",
        "status": "У процесі",
        "progress": 0,
    },

    # ════════════ n5 — forest spirit (ORIGINAL) ════════════
    {
        "id": "n5",
        "type": "original",

        "author_obj": {
            "id": "olena_h",
            "name": "Олена Гуцалюк",
            "avatar": "ОГ",
            "bio": "Пишу про маленькі міста та дивних сусідів. Магічний реалізм у затишних формах.",
        },
        "source_language": "uk",

        "summary": "Інженер з Києва на 35-му році життя дізнається, що його сусідка — справжній лісовий дух. Тепер він допомагає їй розібратися з комунальними рахунками, а вона за це не дає йому помирати від стресу. Чесна угода.",
        "tags": ["повсякденність", "магічний реалізм", "комедія", "затишне"],
        "warnings": [],
        "rating": "G",

        "chapters_full": _make_original_chapters(_N5_TITLES),

        "title": "Сусідка з третього поверху — лісовий дух, який не вміє платити за газ",
        "title_en": "The Neighbour on the Third Floor Is a Forest Spirit Who Doesn't Know How to Pay for Gas",
        "author": "Олена Гуцалюк",
        "author_handle": "olena_h",
        "fandom": "Original",
        "chapters": 5,
        "chapter_count": 5,
        "words": 12200,
        "kudos": 542,
        "bookmarks": 188,
        "comments": 92,
        "hits": 6100,
        "updated": "3 тижні тому",
        "status": "Завершено",
        "progress": 100,
    },

    # ════════════ n6 — banished pumpkin (three-team series) ════════════
    {
        "id": "n6",
        "type": "translation",

        "title_ja": "ギルドから「弱い」と追放されたが、実は礼儀正しいだけだった、今は田舎で皆を狂わせるカボチャを育てている",
        "title_romaji": "Girudo kara 'yowai' to tsuihou sareta ga…",
        "original_author": "Юкі Танака",
        "source_language": "ja",
        "original_publisher": "Shogakukan",
        "original_year": 2023,
        "original_status": "У процесі",

        "summary": "Колишнього рейнджера S-рангу вигнали з гільдії за «низький бойовий потенціал». Виявилось, його ввічливе «не хочу нікого вбивати» вважали слабкістю. Тепер вирощує гарбузи. Гарбузи мають побічні ефекти. Король хоче поговорити.",
        "tags": ["фентезі", "ізекай", "комедія", "темне фентезі", "сільське життя"],
        "warnings": ["насильство"],
        "rating": "M",

        "teams_active": [
            {
                "team_id": "team_sim_tinei",
                "title": "Мене вигнали з гільдії за «слабкість», але я просто був ввічливий, тепер живу в селі і вирощую гарбузи (від яких всі божеволіють)",
                "status": "active",
                "chapters_done": 31,
                "last_update": "вчора",
                "kudos_total": 4100,
                "translator_notes_excerpt": "Епічний роман про гарбузи. Доводимо до 40 розділу.",
            },
            {
                "team_id": "team_tysha",
                "title": "Вигнаний рейнджер і його гарбузи",
                "status": "frozen",
                "chapters_done": 12,
                "last_update": "місяць тому",
                "kudos_total": 580,
                "translator_notes_excerpt": "Перейшли на інший проєкт. Цей може повернеться.",
            },
            {
                "team_id": "solo_lesyk",
                "title": "Гарбузи, що зводять з розуму",
                "status": "active",
                "chapters_done": 25,
                "last_update": "2 дні тому",
                "kudos_total": 530,
                "translator_notes_excerpt": "Третій рік перекладаю. Залишилось небагато.",
            },
        ],

        "chapters_full": _make_translation_chapters([
            {"team_id": "team_sim_tinei", "chapters_done": 31},
            {"team_id": "team_tysha", "chapters_done": 12},
            {"team_id": "solo_lesyk", "chapters_done": 25},
        ]),

        "title": "Мене вигнали з гільдії за «слабкість», але я просто був ввічливий, тепер живу в селі і вирощую гарбузи (від яких всі божеволіють)",
        "title_en": "I Was Kicked Out of the Guild for Being 'Weak,' but I Was Just Polite. Now I Live in a Village Growing Pumpkins (Which Drive Everyone Insane)",
        "author": "Юкі Танака",
        "author_handle": "tanaka_y",
        "fandom": "田中 雪 (Tanaka Yuki)",
        "chapters": 31,
        "chapter_count": 40,
        "words": 142800,
        "kudos": 5210,
        "bookmarks": 2120,
        "comments": 789,
        "hits": 71200,
        "updated": "сьогодні",
        "status": "У процесі",
        "progress": 22,
    },

    # ════════════ n7 — necromancer grandma (single team, completed) ════════════
    {
        "id": "n7",
        "type": "translation",

        "title_ja": "私は大陸最強の死霊術師だが、唯一の死霊術は死んだ親戚と話すことだ",
        "title_romaji": "Watashi wa tairiku saikyou no shireijutsushi da ga…",
        "original_author": "Дайскі Огата",
        "source_language": "ja",
        "original_publisher": "Kadokawa",
        "original_year": 2025,
        "original_status": "Завершено",

        "summary": "Імперія платить мені цілий статок як «найгрізнішому некроманту епохи». Технічно я один — все, що я вмію, це викликати привид баби Степаниди для життєвих порад. Але вона дає дуже гарні поради. Імперія ніколи не дізнається.",
        "tags": ["комедія", "фентезі", "темне фентезі", "повільне горіння"],
        "warnings": [],
        "rating": "T",

        "teams_active": [
            {
                "team_id": "solo_anna_maria",
                "title": "Я — найсильніший некромант на континенті, але мій єдиний некромантський трюк — це говорити з мертвими родичами",
                "status": "completed",
                "chapters_done": 12,
                "last_update": "тиждень тому",
                "kudos_total": 1102,
                "translator_notes_excerpt": "Завершено. Спасибі що читали.",
            },
        ],

        "chapters_full": _make_translation_chapters([
            {"team_id": "solo_anna_maria", "chapters_done": 12},
        ]),

        "title": "Я — найсильніший некромант на континенті, але мій єдиний некромантський трюк — це говорити з мертвими родичами",
        "title_en": "I'm the Strongest Necromancer on the Continent, but My Only Necromancy Trick Is Talking to Dead Relatives",
        "author": "Дайскі Огата",
        "author_handle": "ogata_d",
        "fandom": "尾形 大樹 (Ogata Daiki)",
        "chapters": 12,
        "chapter_count": 12,
        "words": 31000,
        "kudos": 1102,
        "bookmarks": 540,
        "comments": 156,
        "hits": 9800,
        "updated": "тиждень тому",
        "status": "Завершено",
        "progress": 0,
    },

    # ════════════ n8 — time loop (ORIGINAL) ════════════
    {
        "id": "n8",
        "type": "original",

        "author_obj": {
            "id": "zoryana_k",
            "name": "Зоряна Кобилянська",
            "avatar": "ЗК",
            "bio": "Пишу психологічні трилери. Цикліки. Понеділки. Тривога загорнута у наратив.",
        },
        "source_language": "uk",

        "summary": "Оля помирає вже 47-й раз. Часова петля повертає її в ранок понеділка о 7:23. Вона знає, що завтра впаде космічний об'єкт. Знає, як його зупинити. Знає, де її ключі. Просто залишається в ліжку. Світ закінчиться у четвер.",
        "tags": ["трилер", "часова петля", "темне", "психологічне"],
        "warnings": ["екзистенційна криза"],
        "rating": "M",

        "chapters_full": _make_original_chapters(_N8_TITLES),

        "title": "Кожного разу, коли я помираю, я повертаюся в той самий ранок понеділка з усіма спогадами, але зовсім без бажання щось робити",
        "title_en": "Every Time I Die, I Return to the Same Monday Morning with All My Memories but No Will to Do Anything",
        "author": "Зоряна Кобилянська",
        "author_handle": "zoryana_k",
        "fandom": "Original",
        "chapters": 9,
        "chapter_count": 15,
        "words": 33500,
        "kudos": 2188,
        "bookmarks": 912,
        "comments": 478,
        "hits": 23200,
        "updated": "вчора",
        "status": "У процесі",
        "progress": 0,
    },
]


# ────────────────────────────────────────────────────────────────────────
# Tags, reader chapter, comments, notifications (mostly unchanged)
# ────────────────────────────────────────────────────────────────────────

TAGS = [
    {"name": "ізекай", "count": 8420},
    {"name": "романтика", "count": 6210},
    {"name": "перевтілення", "count": 4890},
    {"name": "повільне горіння", "count": 3920},
    {"name": "комедія", "count": 3110},
    {"name": "фентезі", "count": 2840},
    {"name": "повсякденність", "count": 2150},
    {"name": "гарем", "count": 1980},
    {"name": "темне фентезі", "count": 1620},
    {"name": "магія", "count": 1380},
    {"name": "школа", "count": 980},
    {"name": "часова петля", "count": 540},
]


READER_CHAPTER = {
    "novel": "Я був звичайним токсикологом у п'ятницю ввечері...",
    "author": "Хіросі Канесакі",
    "chapter_no": 3,
    "chapter_total": 18,
    "title": "Хвіст. Чому хвіст?",
    "paragraphs": [
        "Я помер у п'ятницю ввечері. Не від чогось ефектного. Не від драконячого вогню чи прокляття стародавніх. Я помер тому, що сів за робочий стіл після п'яти кав і дванадцятигодинної зміни в лабораторії, і моє серце мовчки сказало: «ну все, з мене досить».",
        "Останнє, що я бачив — це монітор з результатами хроматографії. Шматок суші, який не дожував. І мою дисертацію, яку я так і не дописав. Вона досі чекає мене десь у хмарі, точно прорахована, точно непридатна для захисту.",
        "Прокинувся я в лісі. У дівочому тілі. З довгим лускатим хвостом.",
        "Хвіст був важкий. Це перше, що я зрозумів. Друге — він рухався сам. Третє — лускою він був покритий рівномірно, золотисто-зеленою, і пах ландишем. Четверте — я не вмію думати про чотири речі одночасно, тому я знепритомнів.",
        "Коли я знову прийшов до тями, наді мною стояла стара жінка з обличчям, яке я бачив тільки на портретах в кабінеті завкафедри. Вона сказала українською: «Принцесо, ви знову впали з ліжка». А потім: «Ваш хвіст знову розкидав посуд. Скільки разів я просила — не виходьте з кімнати під час повного місяця».",
        "Я хотів сказати «Я не принцеса». Я хотів сказати «Я був чоловіком чотири години тому». Але хвіст дернувся, у мене запаморочилася голова, і я сказав єдине, що зміг вимовити: «Чому хвіст?»",
        "Жінка зітхнула. Вийняла з кишені записник — я впізнав його, такі видавали в радянському Інституті органічної хімії, де я колись був на стажуванні. Це знущання чи знак? Не зміг вирішити.",
        "Вона перегорнула сторінку, поглянула на мене зі співчуттям, і сказала: «Це довга історія, ваша світлосте. Краще починайте з суші».",
    ],
}


COMMENTS = [
    {"user": "оля_читає", "avatar": "ОЧ", "text": "Господи, цей розділ просто розриває серце. І перекладач передав жарт про хвіст ідеально — рідко так буває!", "time": "2 год тому", "kudos": 23, "chapter": 3},
    {"user": "mariana_b", "avatar": "МБ", "text": "Я зрозуміла, ким насправді була та жінка з кафедри! Перечитала перший розділ — все сходиться 🤯", "time": "4 год тому", "kudos": 18, "chapter": 3},
    {"user": "нічний_кіт", "avatar": "НК", "text": "Дякую перекладачам за такий темп. Прочитала за вечір. Чекаю на наступну главу.", "time": "6 год тому", "kudos": 12, "chapter": 3},
    {"user": "архіваріус", "avatar": "АР", "text": "Переклад на високому рівні — особливо діалог про суші. Кожен жарт працює. Дякую!", "time": "вчора", "kudos": 31, "chapter": 2},
]


NOTIFICATIONS = [
    {"type": "comment", "user": "оля_читає", "text": "прокоментувала ваш переклад", "target": "Хвіст. Чому хвіст?", "time": "щойно", "read": False},
    {"type": "kudos", "user": "mariana_b", "text": "та ще 5 людей залишили kudos на", "target": "Я був звичайним токсикологом...", "time": "2 год тому", "read": False},
    {"type": "follow", "user": "архіваріус", "text": "почав/ла стежити за вами", "target": "", "time": "5 год тому", "read": False},
    {"type": "update", "user": "Юкі Танака", "text": "опублікував новий розділ", "target": "Гарбузи · Розділ 31", "time": "вчора", "read": True},
    {"type": "bookmark", "user": "нічний_кіт", "text": "додав/ла до колекції «Зимове читання»", "target": "Сусідка з третього поверху", "time": "2 дні тому", "read": True},
    {"type": "comment", "user": "архіваріус", "text": "відповів/ла на ваш коментар у", "target": "Гарбузи", "time": "3 дні тому", "read": True},
]


# ────────────────────────────────────────────────────────────────────────
# Lookups
# ────────────────────────────────────────────────────────────────────────

def novel_by_id(novel_id):
    """Return a series dict by its id, or None if not found."""

    return next((n for n in NOVELS if n["id"] == novel_id), None)
