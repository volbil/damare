from fastapi import APIRouter, Request, Depends
from .dependencies import validate_title_create
from app.dependencies import auth_mandatory
from app.dependencies import auth_optional
from app.stub_data import NOVELS, NOTIFICATIONS, READER_CHAPTER, TAGS, novel_by_id, READER_CHAPTER
from app.schemas import FormResult
from app.models import User
from app import templates


router = APIRouter()


CHAPTER_TITLES = [
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
    "Чи могла я просто не помирати?",
    "Принц, що ставить незручні питання",
    "Стара академія, нові правила",
    "Хімія — це теж магія",
]

CHAPTER_DATES = [
    "2 дні тому", "5 днів тому", "тиждень тому", "2 тижні тому", "місяць тому",
]


def _build_chapters(novel):
    chapters = []

    for i in range(novel["chapter_count"]):
        chapters.append({
            "no": i + 1,
            "title": CHAPTER_TITLES[i] if i < len(CHAPTER_TITLES) else f"Розділ {i + 1}",
            "words": 1800 + ((i * 137) % 1400),
            "date": CHAPTER_DATES[i % len(CHAPTER_DATES)],
            "read": i < novel["chapters"] - 1,
            "current": i == novel["chapters"] - 1,
        })

    return chapters


@router.get("/title/{novel_id}")
async def title(
    request: Request,
    novel_id: str,
    user: User | None = Depends(auth_optional),
):
    novel = novel_by_id(novel_id) or NOVELS[0]
    chapters = _build_chapters(novel)
    similar = [n for n in NOVELS if n["id"] != novel["id"]][:3]

    return templates.TemplateResponse(
        "title/title.html",
        {
            "request": request,
            "user": user,
            "active": "discover",
            "page_title": "Твір",
            "novel": novel,
            "chapters": chapters,
            "similar": similar,
        },
    )


@router.get("/title/{novel_id}/read")
async def read_chapter(
    request: Request,
    novel_id: str,
    user: User | None = Depends(auth_optional),
):
    novel = novel_by_id(novel_id) or NOVELS[0]
    chapters = _build_chapters(novel)
    current_no = READER_CHAPTER["chapter_no"]
    prev_chapter = chapters[current_no - 2] if current_no > 1 else None
    next_chapter = chapters[current_no] if current_no < len(chapters) else None

    return templates.TemplateResponse(
        "reader/reader.html",
        {
            "request": request,
            "user": user,
            "novel": novel,
            "chapter": READER_CHAPTER,
            "prev_chapter": prev_chapter,
            "next_chapter": next_chapter,
        },
    )


@router.get("/search")
async def search(request: Request, user: User | None = Depends(auth_optional)):
    return templates.TemplateResponse(
        "search/search.html",
        {
            "request": request,
            "user": user,
            "active": "discover",
            "page_title": "Пошук",
            "query": "зимові",
            "active_tags": ["містика", "повільне горіння"],
            "excluded_tags": ["насильство", "смерть персонажа"],
            "popular_tags": TAGS,
            "result_count": 1284,
            "results": NOVELS[:5],
        },
    )


@router.get("/profile")
async def profile(
    request: Request,
    user: User | None = Depends(auth_optional),
    tab: str = "works",
):
    valid_tabs = {"works", "reading", "finished", "lists", "activity"}
    if tab not in valid_tabs:
        tab = "works"

    own_works = NOVELS[:3]
    reading = NOVELS[:4]
    finished = [NOVELS[1], NOVELS[4], NOVELS[6]]

    lists = [
        {"name": "Зимове читання", "count": 12, "novels": NOVELS[:4]},
        {"name": "Перечитати", "count": 8, "novels": NOVELS[2:6]},
        {"name": "Українське фентезі", "count": 24, "novels": NOVELS[4:8]},
        {"name": "Ще не торкалась", "count": 6, "novels": NOVELS[1:5]},
    ]

    profile_data = {
        "name": "Калина Левчук",
        "handle": "kalyna_l",
        "location": "Київ",
        "joined": "березня 2024",
        "bio": "Пишу про маленькі міста, листи, які не дійшли, і людей, що повертаються. Магічний реалізм, повільне горіння, зимові настрої. Інколи борщ.",
        "stats": [
            {"value": "12", "label": "творів"},
            {"value": "4.2k", "label": "читачів"},
            {"value": "38k", "label": "kudos"},
        ],
    }

    tabs = [
        {"id": "works", "label": "Твори", "count": len(own_works)},
        {"id": "reading", "label": "Зараз читає", "count": len(reading)},
        {"id": "finished", "label": "Прочитано", "count": len(finished)},
        {"id": "lists", "label": "Колекції", "count": len(lists)},
        {"id": "activity", "label": "Активність", "count": None},
    ]

    return templates.TemplateResponse(
        "profile/profile.html",
        {
            "request": request,
            "user": user,
            "active": "library",
            "page_title": "Профіль",
            "active_tab": tab,
            "profile": profile_data,
            "own_works": own_works,
            "reading": reading,
            "finished": finished,
            "lists": lists,
            "notifications": NOTIFICATIONS,
            "tabs": tabs,
        },
    )


@router.get("/title/{novel_id}/comments")
async def comments(
    request: Request,
    novel_id: str,
    user: User | None = Depends(auth_optional),
):
    novel = novel_by_id(novel_id) or NOVELS[0]

    threads = [
        {
            "user": "архіваріус", "avatar": "АР", "time": "вчора", "kudos": 47,
            "is_author": False, "pinned": True, "spoiler": False,
            "text": "Епістолярна форма використана геніально. Кожен лист — окремий жанр: то інтимний щоденниковий запис, то майже діловий протокол. І все це від однієї людини. Я ще не зустрічав, щоб така структура працювала так природно.",
            "replies": [
                {
                    "user": "Калина Левчук", "avatar": "КЛ", "is_author": True, "time": "23 год тому", "kudos": 32,
                    "spoiler": False, "pinned": False,
                    "text": "Дуже дякую. Я вагалась цілий тиждень, чи не вийде штучно. Приємно знати, що ні 🤍",
                },
                {
                    "user": "оля_читає", "avatar": "ОЧ", "time": "12 год тому", "kudos": 5,
                    "is_author": False, "spoiler": False, "pinned": False,
                    "text": "+1 до цього. Третій лист — взагалі окрема історія в історії.",
                },
            ],
        },
        {
            "user": "оля_читає", "avatar": "ОЧ", "time": "2 год тому", "kudos": 23,
            "is_author": False, "pinned": False, "spoiler": False,
            "text": "Господи, цей розділ просто розриває серце. Як ви це робите? Я тричі перечитала момент із сніжинкою на чорнилі, і три рази не змогла видихнути. Чекаю четверту главу як божевільна.",
            "replies": [],
        },
        {
            "user": "mariana_b", "avatar": "МБ", "time": "4 год тому", "kudos": 18,
            "is_author": False, "pinned": False, "spoiler": True,
            "text": "Я зрозуміла, ким насправді була та жінка біля вокзалу! Перечитала перший розділ — все сходиться 🤯 Чи я надумую?",
            "replies": [
                {
                    "user": "нічний_кіт", "avatar": "НК", "time": "3 год тому", "kudos": 7,
                    "is_author": False, "spoiler": False, "pinned": False,
                    "text": "Я думаю про те саме від другого розділу. Будемо чекати, чи Калина підтвердить 🙃",
                },
            ],
        },
        {
            "user": "нічний_кіт", "avatar": "НК", "time": "6 год тому", "kudos": 12,
            "is_author": False, "pinned": False, "spoiler": False,
            "text": "Калино, дякую вам за це. Прочитала за вечір. Чекаю на наступну главу. Без зайвих слів.",
            "replies": [],
        },
    ]

    return templates.TemplateResponse(
        "title/comments.html",
        {
            "request": request,
            "user": user,
            "active": "community",
            "page_title": "Обговорення",
            "novel": novel,
            "chapter": READER_CHAPTER,
            "threads": threads,
        },
    )


@router.get("/forums")
async def forums(request: Request, user: User | None = Depends(auth_optional)):
    categories = [
        {"id": "craft", "name": "Майстерня", "icon": "pen", "desc": "Поради, чернетки, beta-readers", "threads": 1240, "color": "#9bb89a"},
        {"id": "recs", "name": "Рекомендації", "icon": "sparkle", "desc": "Що почитати? Чим поділитися?", "threads": 2890, "color": "#a594d9"},
        {"id": "fandoms", "name": "Фендоми", "icon": "flame", "desc": "Обговорення, теорії, шипи", "threads": 4120, "color": "#d97a5a"},
        {"id": "lounge", "name": "Світлиця", "icon": "message", "desc": "Поза темою — про життя", "threads": 980, "color": "#7c9eb2"},
        {"id": "help", "name": "Допомога", "icon": "flag", "desc": "Технічні питання, репорти", "threads": 320, "color": "#e89e8a"},
        {"id": "meta", "name": "Мета", "icon": "globe", "desc": "Про сайт, правила, ідеї", "threads": 240, "color": "#bf8ce0"},
    ]

    threads = [
        {
            "cat": "Майстерня", "user": "архіваріус", "avatar": "АР",
            "title": "Як ви знаходите час писати, коли робота й діти?",
            "preview": "Я пишу шість років, і останній рік — суцільна боротьба за 30 хвилин на день. Поділіться, будь ласка, своїми лайфхаками…",
            "replies": 84, "views": 1240, "kudos": 47, "time": "2 год тому", "pinned": True, "hot": False,
        },
        {
            "cat": "Рекомендації", "user": "оля_читає", "avatar": "ОЧ",
            "title": "Український магічний реалізм — що ще, окрім Шкляра?",
            "preview": "Прочитала «Сім зимових ночей» Калини Левчук і захотіла ще таких атмосферних історій. Бажано українською. Хочу зимового, тихого…",
            "replies": 142, "views": 3120, "kudos": 89, "time": "5 год тому", "pinned": False, "hot": False,
        },
        {
            "cat": "Фендоми", "user": "mariana_b", "avatar": "МБ",
            "title": "[Теорія] Хто насправді писав листи в «Сім зимових ночей»? (СПОЙЛЕРИ до 14 розділу)",
            "preview": "Ок, я перечитала перші 14 розділів двічі. У мене є теорія, і вона включає як мінімум три часові лінії…",
            "replies": 268, "views": 8400, "kudos": 312, "time": "вчора", "pinned": False, "hot": True,
        },
        {
            "cat": "Майстерня", "user": "нічний_кіт", "avatar": "НК",
            "title": "Шукаю beta-reader для повільного романтичного фентезі (українська, 80k слів)",
            "preview": "Працюю над романом про відьму-картографа. Є чернетки 12 розділів. Шукаю когось, кому близькі повільне горіння та…",
            "replies": 23, "views": 410, "kudos": 12, "time": "8 год тому", "pinned": False, "hot": False,
        },
        {
            "cat": "Світлиця", "user": "таня_літ", "avatar": "ТЛ",
            "title": "Що ви слухаєте під час письма?",
            "preview": "Я останній місяць пишу під радіо «Промінь» вночі. Це майже містичний досвід. А ви?",
            "replies": 91, "views": 1820, "kudos": 34, "time": "2 дні тому", "pinned": False, "hot": False,
        },
    ]

    return templates.TemplateResponse(
        "forums/forums.html",
        {
            "request": request,
            "user": user,
            "active": "community",
            "page_title": "Громада",
            "categories": categories,
            "threads": threads,
        },
    )


@router.get("/articles")
async def articles(
    request: Request,
    user: User | None = Depends(auth_optional),
    tag: str = "Усі",
):
    featured = {
        "title": "Як писати тишу: чого нас вчить епістолярний жанр у 2026 році",
        "subtitle": "Лист — найповільніша форма наративу, і саме тому вона зараз потрібна як ніколи.",
        "author": "Калина Левчук", "avatar": "КЛ",
        "time": "12 хв читання · 2 дні тому",
        "kudos": 412, "comments": 38,
    }

    article_list = [
        {"cat": "Розбір", "title": "«Янголи їдять борщ»: коротка форма як магія", "author": "архіваріус", "avatar": "АР", "time": "8 хв · 4 дні тому", "kudos": 184, "comments": 22, "official": False},
        {"cat": "Поради", "title": "Шість способів вийти з письменницького блоку, які не «гуляйте у парку»", "author": "Тарас Вовк", "avatar": "ТВ", "time": "6 хв · тиждень тому", "kudos": 622, "comments": 91, "official": False},
        {"cat": "Інтерв'ю", "title": "Розмова з Мирославою Дід: «Я не вірю в музу, я вірю в дисципліну»", "author": "Damare", "avatar": "DM", "time": "14 хв · тиждень тому", "kudos": 298, "comments": 44, "official": True},
        {"cat": "Рекомендації", "title": "Десять українських романів, які варто прочитати взимку", "author": "оля_читає", "avatar": "ОЧ", "time": "10 хв · 2 тижні тому", "kudos": 1100, "comments": 168, "official": False},
        {"cat": "Майстерня", "title": "Як я писала роман по 200 слів на день (і вижила)", "author": "Богдана Шум", "avatar": "БШ", "time": "7 хв · 2 тижні тому", "kudos": 487, "comments": 73, "official": False},
        {"cat": "Розбір", "title": "Магічний реалізм по-українськи: відмінності від латиноамериканської традиції", "author": "Андрій Чорний", "avatar": "АЧ", "time": "18 хв · 3 тижні тому", "kudos": 712, "comments": 102, "official": False},
    ]

    tag_filter = ["Усі", "Майстерність", "Рекомендації", "Інтерв'ю", "Розбори", "Жанри", "Видавництво", "Переклад"]

    return templates.TemplateResponse(
        "articles/articles.html",
        {
            "request": request,
            "user": user,
            "active": "community",
            "page_title": "Записник",
            "featured": featured,
            "articles": article_list,
            "tag_filter": tag_filter,
            "active_tag": tag if tag in tag_filter else "Усі",
        },
    )


@router.get("/feed")
async def feed(
    request: Request,
    user: User | None = Depends(auth_optional),
    tab: str = "За підпискою",
):
    posts = [
        {
            "user": "Калина Левчук", "handle": "kalyna_l", "avatar": "КЛ", "time": "2 год тому",
            "type": "note", "is_following": True,
            "text": "Дописала четвертий розділ. Він на 600 слів довший за заплановане, і я не шкодую. Завтра — редагування. Сподіваюсь, опублікую в неділю 🤍",
            "kudos": 142, "comments": 23, "reposts": 8,
        },
        {
            "user": "архіваріус", "handle": "arkhivarius", "avatar": "АР", "time": "4 год тому",
            "type": "rec", "is_following": False,
            "text": "Хто ще не читав «Карта втрачених міст» Тараса Вовка — займіться. Перші три розділи здавалися повільними, потім я не міг відірватись. Це найкраща дистопія, написана українською за останні три роки.",
            "attached": NOVELS[5],
            "kudos": 89, "comments": 12, "reposts": 24,
        },
        {
            "user": "Тарас Вовк", "handle": "taras_v", "avatar": "ТВ", "time": "6 год тому",
            "type": "milestone", "is_following": False,
            "text": "Новий розділ «Карти втрачених міст» опубліковано. Це 31-й. Я почав цей роман у березні 2024, і ось ми тут.",
            "milestone": {"label": "Новий розділ", "target": "Карта втрачених міст · Розділ 31"},
            "kudos": 248, "comments": 41, "reposts": 32,
        },
        {
            "user": "оля_читає", "handle": "olya_chyt", "avatar": "ОЧ", "time": "вчора",
            "type": "poll", "is_following": False,
            "text": "Питання до читачів: ви слухаєте музику під час читання?",
            "poll": [
                {"label": "Так, інструментал", "pct": 42},
                {"label": "Так, що завгодно", "pct": 14},
                {"label": "Тільки тишу", "pct": 38},
                {"label": "Залежить", "pct": 6},
            ],
            "kudos": 78, "comments": 56, "reposts": 4,
        },
        {
            "user": "Мирослава Дід", "handle": "myroslava_d", "avatar": "МД", "time": "вчора",
            "type": "quote", "is_following": False,
            "text": "Цитата, яка не йде з голови з ранку:",
            "quote": "«Ми пишемо не для того, щоб бути зрозумілими, а щоб залишитись.»",
            "quote_source": "— Олена Гуцалюк, есей «Тиша між рядками»",
            "kudos": 312, "comments": 28, "reposts": 47,
        },
    ]

    writing_now = [
        {"name": "Калина Левчук", "status": "дописує розд. 4"},
        {"name": "Тарас Вовк", "status": "редагує розд. 32"},
        {"name": "Богдана Шум", "status": "+412 слів сьогодні"},
    ]

    tabs = [
        {"id": "За підпискою", "label": "За підпискою"},
        {"id": "Усе", "label": "Усе"},
        {"id": "Цитати", "label": "Цитати"},
        {"id": "Тільки мої", "label": "Тільки мої"},
    ]

    return templates.TemplateResponse(
        "feed/feed.html",
        {
            "request": request,
            "user": user,
            "active": "community",
            "page_title": "Стрічка авторів",
            "posts": posts,
            "writing_now": writing_now,
            "recommendations": NOVELS[2:5],
            "tags": TAGS[:8],
            "tabs": tabs,
            "active_tab": tab,
        },
    )


@router.get("/styleguide")
async def styleguide(request: Request, user: User | None = Depends(auth_optional)):
    icon_names = [
        "search", "home", "compass", "book", "pen", "bookmark", "bookmark-fill",
        "heart", "heart-fill", "eye", "message", "bell", "user", "settings",
        "plus", "check", "arrow-r", "arrow-l", "arrow-up", "menu", "filter",
        "sort", "x", "more", "chevron-d", "chevron-r", "star", "sparkle",
        "tag", "list", "grid", "type", "sun", "moon", "edit", "flag", "send",
        "image", "bold", "italic", "quote", "minus", "check-circle", "globe",
        "flame", "rss", "lock", "mail", "kudos", "calendar", "play", "tv",
    ]

    tokens = {
        "colors": [
            "bg-0", "bg-1", "bg-2", "bg-3", "bg-4",
            "fg-0", "fg-1", "fg-2", "fg-3", "fg-4",
            "line", "line-soft",
            "accent", "accent-soft", "accent-fg",
            "warn", "love", "info",
        ],
    }

    return templates.TemplateResponse(
        "styleguide/styleguide.html",
        {
            "request": request,
            "user": user,
            "active": "",
            "page_title": "Компоненти",
            "icon_names": icon_names,
            "tokens": tokens,
            "demo_novel": NOVELS[0],
        },
    )


@router.api_route("/create", methods=["GET", "POST"])
async def create_title(
    request: Request,
    user: User | None = Depends(auth_mandatory),
    data: FormResult = Depends(validate_title_create),
):
    return templates.TemplateResponse(
        "title/create.html",
        {
            "request": request,
            "form": data.form,
            "user": user,
            "active": "write",
            "page_title": "Додати твір",
        },
    )
