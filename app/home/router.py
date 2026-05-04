import hashlib

from fastapi import APIRouter, Request, Depends
from app.dependencies import auth_optional
from app.stub_data import HOT_NOW, NOVELS, RECENT_COMMENTS, TOP_WEEK, novel_by_id, team_by_id
from app.models import User
from app import templates


router = APIRouter()


# Deterministic stub "last read" labels — one bucket per novel, stable
# across renders so timestamps don't flicker on reload.
_LAST_READ_BUCKETS = [
    "сьогодні",
    "вчора",
    "3 дні тому",
    "тиждень тому",
    "2 тижні тому",
]


def _last_read_for(novel_id):
    """Stable per-novel relative timestamp. Pure stub fabrication."""

    h = int(hashlib.sha1(str(novel_id).encode()).hexdigest()[:8], 16)
    return _LAST_READ_BUCKETS[h % len(_LAST_READ_BUCKETS)]


def _next_chapter_title(novel, current_chapter_no):
    """Title of the chapter immediately after current_chapter_no.

    Returns None when the next chapter has only an auto-generated
    "Розділ N" fallback name — the slot is privileged for chapters
    with real titles, otherwise the line is hidden in the template.
    """

    chapters_full = novel.get("chapters_full") or []
    if current_chapter_no >= len(chapters_full):
        return None
    nxt = chapters_full[current_chapter_no]
    title = nxt.get("primary_title") or nxt.get("title")
    if not title or title.startswith("Розділ "):
        return None
    return title


@router.get("/")
async def home(request: Request, user: User | None = Depends(auth_optional)):
    # Continue reading — three in-progress books picked across the progress
    # spectrum (early / mid / late) with novels that have rich chapter titles.
    # IDs reference real records in stub data; the per-card chapter_no and
    # progress are fabricated but plausible against each novel's chapter count.
    continue_reading_picks = [
        ("r2951", 12, 11),  # «Тільки я візьму новий рівень» — early
        ("r4036", 14, 32),  # «Я павучиха, то й що?»          — mid
        ("r2148", 32, 89),  # «Сусідський ангел»               — late
    ]
    continue_reading_list = []
    for nid, chapter_no, progress in continue_reading_picks:
        novel = novel_by_id(nid)
        if novel is None:
            continue
        continue_reading_list.append({
            "novel": novel,
            "chapter_no": chapter_no,
            "progress": progress,
            "last_read": _last_read_for(novel["id"]),
            "next_chapter_title": _next_chapter_title(novel, chapter_no),
        })

    # Fresh updates from teams / authors the user follows.
    # Stub-composed; in real life this would be a query joining
    # follows × chapters by recency.
    fresh_updates = [
        {
            "novel": NOVELS[0],
            "team": team_by_id("team_tysha"),
            "chapter_no": 14,
            "chapter_title": "Я отруїв міністра (ненавмисне)",
            "time": "30 хв тому",
        },
        {
            "novel": NOVELS[5],
            "team": team_by_id("solo_lesyk"),
            "chapter_no": 25,
            "chapter_title": "Король хоче поговорити",
            "time": "2 год тому",
        },
        {
            "novel": NOVELS[3],
            "team": team_by_id("team_sim_tinei"),
            "chapter_no": 22,
            "chapter_title": "Я не сестра, а мама",
            "time": "4 год тому",
        },
        {
            "novel": NOVELS[7],
            "team": None,  # original — author publishes directly
            "chapter_no": 9,
            "chapter_title": "Понеділок, 7:23",
            "time": "вчора",
        },
        {
            "novel": NOVELS[6],
            "team": team_by_id("solo_anna_maria"),
            "chapter_no": 7,
            "chapter_title": "Хімічна реакція на серце",
            "time": "вчора",
        },
        {
            "novel": NOVELS[1],
            "team": team_by_id("team_tysha"),
            "chapter_no": 8,
            "chapter_title": "Кінець (правда цього разу)",
            "time": "2 дні тому",
        },
    ]

    return templates.TemplateResponse(
        "home/home.html",
        {
            "request": request,
            "user": user,
            "active": "home",
            "page_title": "Стрічка",
            "continue_reading_list": continue_reading_list,
            "fresh_updates": fresh_updates,
            "top_week": TOP_WEEK[:7],
            "hot_now": HOT_NOW,
            "recent_comments": RECENT_COMMENTS,
            "trending": NOVELS[2:8],
            "new_releases": NOVELS[:6],
            "hot_now_updated": "оновлено 2 хв тому",
        },
    )
