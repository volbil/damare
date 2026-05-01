from urllib.parse import urlencode

from fastapi import APIRouter, Request, Depends, Query
from .dependencies import validate_title_create
from app.dependencies import auth_mandatory
from app.dependencies import auth_optional
from app.stub_data import (
    NOVELS,
    NOTIFICATIONS,
    READER_CHAPTER,
    TAGS,
    TEAMS,
    USERS,
    followers_of,
    following_of,
    novel_by_id,
    team_by_id,
    team_member_by_handle,
    user_brief,
    user_by_handle,
)
from app.schemas import FormResult
from app.models import User
from app import plural_uk, templates


router = APIRouter()


def _build_chapters(novel):
    """Build chapter rows for the Series page, enriched with team metadata.

    For translations: each row includes primary_team (full team dict),
    alternates (list of {team_id, team, title} for non-primary teams that
    translated this chapter), and has_alternates flag. The first translation
    in chapters_full[].translations is treated as primary.

    For originals: team fields are None and has_alternates is False.
    """

    chapters = []

    for ch in novel.get("chapters_full", []):
        if novel["type"] == "translation":
            translations = ch.get("translations") or []

            if not translations:
                continue

            primary_t = translations[0]
            primary_team = team_by_id(primary_t["team_id"])

            alternates = []
            for t in translations[1:]:
                alt_team = team_by_id(t["team_id"])
                if alt_team:
                    alternates.append({
                        "team_id": t["team_id"],
                        "team": alt_team,
                        "title": t["title"],
                    })

            row = {
                "no": ch["no"],
                "title": primary_t["title"],
                "primary_team_id": primary_t["team_id"],
                "primary_team": primary_team,
                "alternates": alternates,
                "has_alternates": len(translations) > 1,
                "date": primary_t.get("updated", ""),
                "words": 1800 + ((ch["no"] * 137) % 1400),
                "read": ch["no"] < novel["chapters"],
                "current": ch["no"] == novel["chapters"],
            }
        else:
            row = {
                "no": ch["no"],
                "title": ch.get("title", f"Розділ {ch['no']}"),
                "primary_team_id": None,
                "primary_team": None,
                "alternates": [],
                "has_alternates": False,
                "date": ch.get("updated", ""),
                "words": 1800 + ((ch["no"] * 137) % 1400),
                "read": ch["no"] < novel["chapters"],
                "current": ch["no"] == novel["chapters"],
            }

        chapters.append(row)

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
    ch: int | None = None,
    team: str | None = None,
    user: User | None = Depends(auth_optional),
):
    novel = novel_by_id(novel_id) or NOVELS[0]
    chapters = _build_chapters(novel)

    # Default chapter — primary team's current
    if ch is None:
        ch = novel.get("chapters", 1)

    # Find chapter row in the merged list
    chapter_row = next((c for c in chapters if c["no"] == ch), None)
    if not chapter_row and chapters:
        chapter_row = chapters[0]
        ch = chapter_row["no"]

    # Resolve current team and team-specific chapter title
    current_team = None
    current_team_id = None
    chapter_title = chapter_row["title"] if chapter_row else ""
    alternate_teams = []

    if novel["type"] == "translation":
        chapter_full = next(
            (c for c in novel.get("chapters_full", []) if c["no"] == ch),
            None,
        )
        translations = chapter_full.get("translations", []) if chapter_full else []

        if team:
            chosen = next((t for t in translations if t["team_id"] == team), None)
            if not chosen and translations:
                chosen = translations[0]
        elif translations:
            chosen = translations[0]
        else:
            chosen = None

        if chosen:
            current_team_id = chosen["team_id"]
            current_team = team_by_id(chosen["team_id"])
            chapter_title = chosen["title"]

        for t in translations:
            if t["team_id"] != current_team_id:
                alt_team = team_by_id(t["team_id"])
                if alt_team:
                    alternate_teams.append({
                        "team_id": t["team_id"],
                        "team": alt_team,
                        "title": t["title"],
                        "updated": t.get("updated", ""),
                    })

    # Prev / next from the merged chapter list
    current_idx = next((i for i, c in enumerate(chapters) if c["no"] == ch), 0)
    prev_chapter = chapters[current_idx - 1] if current_idx > 0 else None
    next_chapter = chapters[current_idx + 1] if current_idx + 1 < len(chapters) else None

    return templates.TemplateResponse(
        "reader/reader.html",
        {
            "request": request,
            "user": user,
            "novel": novel,
            "chapter": READER_CHAPTER,
            "chapter_no": ch,
            "chapter_title": chapter_title,
            "current_team": current_team,
            "current_team_id": current_team_id,
            "alternate_teams": alternate_teams,
            "prev_chapter": prev_chapter,
            "next_chapter": next_chapter,
        },
    )


@router.get("/search")
async def search(
    request: Request,
    user: User | None = Depends(auth_optional),
    q: str = "",
    kind: str = Query("all", alias="type"),
    lang: str = "all",
    team: str = "all",
):
    valid_kinds = {"all", "translation", "original"}
    if kind not in valid_kinds:
        kind = "all"

    valid_team_ids = {"all"} | {t["id"] for t in TEAMS}
    if team not in valid_team_ids:
        team = "all"

    # Apply filters
    results = list(NOVELS)
    if kind == "translation":
        results = [n for n in results if n.get("type") == "translation"]
    elif kind == "original":
        results = [n for n in results if n.get("type") == "original"]

    if lang != "all":
        results = [n for n in results if n.get("source_language") == lang]

    if team != "all":
        results = [
            n for n in results
            if any(ta.get("team_id") == team for ta in n.get("teams_active", []))
        ]

    # Source languages found in actual translation data — keeps filter honest
    available_langs = sorted({
        n.get("source_language")
        for n in NOVELS
        if n.get("type") == "translation" and n.get("source_language")
    })

    def search_url(**overrides):
        params = {"q": q, "type": kind, "lang": lang, "team": team}
        params.update(overrides)
        # Strip defaults so URLs stay tidy
        params = {k: v for k, v in params.items() if v and v != "all"}
        if not params:
            return "/search"
        return "/search?" + urlencode(params)

    type_filters = [
        {"label": "Усі", "active": kind == "all", "href": search_url(type="all")},
        {"label": "Переклади", "active": kind == "translation", "href": search_url(type="translation")},
        {"label": "Оригінали", "active": kind == "original", "href": search_url(type="original")},
    ]

    lang_labels = {"ja": "Японська", "ko": "Корейська", "zh": "Китайська"}
    lang_filters = [
        {"label": "Усі", "active": lang == "all", "href": search_url(lang="all")},
    ]
    for code in available_langs:
        lang_filters.append({
            "label": lang_labels.get(code, code.upper()),
            "active": lang == code,
            "href": search_url(lang=code),
        })

    team_filters = [
        {"label": "Усі команди", "active": team == "all", "href": search_url(team="all")},
    ]
    for t in TEAMS:
        team_filters.append({
            "label": t["name"],
            "avatar": t["avatar"],
            "active": team == t["id"],
            "href": search_url(team=t["id"]),
        })

    return templates.TemplateResponse(
        "search/search.html",
        {
            "request": request,
            "user": user,
            "active": "discover",
            "page_title": "Пошук",
            "query": q,
            "active_tags": [],
            "excluded_tags": [],
            "popular_tags": TAGS,
            "result_count": len(results),
            "results": results,
            "type_filters": type_filters,
            "lang_filters": lang_filters,
            "team_filters": team_filters,
            "show_lang_filter": kind != "original",
            "current_kind": kind,
            "current_lang": lang,
            "current_team": team,
        },
    )


def _resolve_profile(handle: str | None):
    """Resolve a profile by handle.

    Returns a dict with the user data plus origin metadata. Resolution
    chain: USERS fixture → team member with derived minimal profile →
    fallback to kalyna_l.
    """

    if not handle:
        return user_by_handle("kalyna_l"), "default"

    fixture = user_by_handle(handle)
    if fixture:
        return fixture, "fixture"

    team, member = team_member_by_handle(handle)
    if team and member:
        derived = {
            "handle": member["handle"],
            "name": member["name"],
            "avatar": None,
            "location": "",
            "joined": team.get("joined", ""),
            "bio": f"{member['role'].capitalize()} у команді {team['name']}.",
            "team_memberships": [{"team_id": team["id"], "role": member["role"]}],
            "original_handles": [],
            "roles": [member["role"]],
        }
        return derived, "derived"

    return user_by_handle("kalyna_l"), "fallback"


@router.get("/profile")
@router.get("/profile/{handle}")
async def profile(
    request: Request,
    handle: str | None = None,
    user: User | None = Depends(auth_optional),
    tab: str = "works",
):
    # Tab is validated against the dynamic tab list at the end of this
    # function — tabs depend on what the user actually has (own works,
    # translations, social graph). The legacy hardcoded check used to
    # silently downgrade unknown tabs here; that broke /profile?tab=
    # for everything new (translations, followers, following).

    profile_user, origin = _resolve_profile(handle)

    # Team memberships, hydrated with full team data
    user_teams = []
    for membership in profile_user.get("team_memberships", []):
        team = team_by_id(membership["team_id"])
        if team:
            user_teams.append({
                "team": team,
                "role": membership["role"],
            })

    # The user's own original works (only authors have these)
    own_works = [
        n for n in NOVELS
        if n.get("id") in profile_user.get("original_handles", [])
    ]

    # Translation works — for each team this user belongs to, find the
    # series they translate and which row in teams_active is theirs.
    translation_works = []
    seen_novel_ids = set()
    total_chapters_translated = 0
    for ut in user_teams:
        team_id = ut["team"]["id"]
        for novel in NOVELS:
            if novel.get("type") != "translation":
                continue
            for ta in novel.get("teams_active", []):
                if ta["team_id"] == team_id:
                    translation_works.append({
                        "novel": novel,
                        "team_active": ta,
                        "team": ut["team"],
                        "user_role": ut["role"],
                    })
                    seen_novel_ids.add(novel["id"])
                    total_chapters_translated += ta.get("chapters_done", 0)
                    break

    # Social graph — followers + following, hydrated with display data.
    follower_briefs = [b for b in (user_brief(h) for h in followers_of(profile_user["handle"])) if b]
    following_briefs = [b for b in (user_brief(h) for h in following_of(profile_user["handle"])) if b]

    # Generic library data for now — per-user reading is out of Phase A/B/C scope
    reading = NOVELS[:4]
    finished = [NOVELS[1], NOVELS[4], NOVELS[6]]
    lists = [
        {"name": "Зимове читання", "count": 12, "novels": NOVELS[:4]},
        {"name": "Перечитати", "count": 8, "novels": NOVELS[2:6]},
        {"name": "Українське фентезі", "count": 24, "novels": NOVELS[4:8]},
        {"name": "Ще не торкалась", "count": 6, "novels": NOVELS[1:5]},
    ]

    # Archetype-aware stats
    has_originals = bool(own_works)
    has_translations = bool(translation_works)
    series_count = len(seen_novel_ids)

    if has_originals and has_translations:
        # Hybrid: writes own + translates with a team
        stats = [
            {"value": str(len(own_works)), "label": plural_uk(len(own_works), "твір", "твори", "творів")},
            {"value": str(series_count), "label": plural_uk(series_count, "серія", "серії", "серій")},
            {"value": "38k", "label": "kudos"},
        ]
    elif has_translations:
        # Translator
        stats = [
            {"value": str(series_count), "label": plural_uk(series_count, "серія", "серії", "серій")},
            {"value": str(total_chapters_translated), "label": plural_uk(total_chapters_translated, "розділ", "розділи", "розділів")},
            {"value": "38k", "label": "kudos"},
        ]
    elif has_originals:
        # Author
        stats = [
            {"value": str(len(own_works)), "label": plural_uk(len(own_works), "твір", "твори", "творів")},
            {"value": "4.2k", "label": "читачів"},
            {"value": "38k", "label": "kudos"},
        ]
    else:
        # Reader / default
        stats = [
            {"value": "127", "label": plural_uk(127, "прочитане", "прочитаних", "прочитаних")},
            {"value": "12", "label": plural_uk(12, "колекція", "колекції", "колекцій")},
            {"value": "38k", "label": "kudos"},
        ]

    profile_data = {
        "name": profile_user["name"],
        "handle": profile_user["handle"],
        "avatar": profile_user.get("avatar"),
        "location": profile_user.get("location", ""),
        "joined": profile_user.get("joined", ""),
        "bio": profile_user.get("bio", ""),
        "stats": stats,
        "roles": profile_user.get("roles", []),
        "origin": origin,
    }

    # Build tab list dynamically — only show what's relevant
    tabs = []
    if has_originals:
        tabs.append({"id": "works", "label": "Твори", "count": len(own_works)})
    if has_translations:
        tabs.append({"id": "translations", "label": "Переклади", "count": series_count})
    tabs.append({"id": "reading", "label": "Зараз читає", "count": len(reading)})
    tabs.append({"id": "finished", "label": "Прочитано", "count": len(finished)})
    tabs.append({"id": "lists", "label": "Колекції", "count": len(lists)})
    tabs.append({"id": "activity", "label": "Активність", "count": None})
    if follower_briefs:
        tabs.append({"id": "followers", "label": "Підписники", "count": len(follower_briefs)})
    if following_briefs:
        tabs.append({"id": "following", "label": "Підписки", "count": len(following_briefs)})

    valid_tab_ids = {t["id"] for t in tabs}
    if tab not in valid_tab_ids:
        # Pick the user's most "primary" tab — works > translations > reading
        if "works" in valid_tab_ids:
            tab = "works"
        elif "translations" in valid_tab_ids:
            tab = "translations"
        else:
            tab = "reading"

    return templates.TemplateResponse(
        "profile/profile.html",
        {
            "request": request,
            "user": user,
            "active": "library",
            "page_title": profile_data["name"],
            "active_tab": tab,
            "profile": profile_data,
            "own_works": own_works,
            "translation_works": translation_works,
            "reading": reading,
            "finished": finished,
            "lists": lists,
            "notifications": NOTIFICATIONS,
            "tabs": tabs,
            "user_teams": user_teams,
            "followers": follower_briefs,
            "following": following_briefs,
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
            "demo_translation": NOVELS[0],
            "demo_original": next((n for n in NOVELS if n["type"] == "original"), None),
        },
    )


@router.get("/team/{team_id}")
async def team_profile(
    request: Request,
    team_id: str,
    tab: str = "overview",
    user: User | None = Depends(auth_optional),
):
    team = team_by_id(team_id)
    if not team:
        return templates.TemplateResponse(
            "team/team.html",
            {
                "request": request,
                "user": user,
                "active": "",
                "page_title": "Команда не знайдена",
                "team": None,
            },
            status_code=404,
        )

    if tab not in {"overview", "projects", "activity"}:
        tab = "overview"

    # Find all series this team works on + compute stats + activity entries
    projects = []
    total_chapters = 0
    active_count = 0
    activity = []

    for novel in NOVELS:
        if novel.get("type") != "translation":
            continue
        for ta in novel.get("teams_active", []):
            if ta["team_id"] != team["id"]:
                continue
            projects.append(novel)
            total_chapters += ta.get("chapters_done", 0)
            if ta.get("status") == "active":
                active_count += 1
            # Take up to 3 most-recent chapters this team did on this project
            project_activity = []
            for ch in reversed(novel.get("chapters_full", [])):
                found = next(
                    (t for t in ch.get("translations", []) if t["team_id"] == team["id"]),
                    None,
                )
                if found:
                    project_activity.append({
                        "chapter_no": ch["no"],
                        "chapter_title": found["title"],
                        "novel_id": novel["id"],
                        "novel_title": novel["title"],
                        "time": found.get("updated", ""),
                    })
                    if len(project_activity) >= 3:
                        break
            activity.extend(project_activity)
            break

    return templates.TemplateResponse(
        "team/team.html",
        {
            "request": request,
            "user": user,
            "active": "",
            "page_title": team["name"],
            "team": team,
            "projects": projects,
            "stats": {
                "project_count": len(projects),
                "total_chapters": total_chapters,
                "active_count": active_count,
            },
            "activity": activity,
            "active_tab": tab,
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
