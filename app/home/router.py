from fastapi import APIRouter, Request, Depends
from app.dependencies import auth_optional
from app.stub_data import HOT_NOW, NOVELS, RECENT_COMMENTS, TOP_WEEK, team_by_id
from app.models import User
from app import templates


router = APIRouter()


@router.get("/")
async def home(request: Request, user: User | None = Depends(auth_optional)):
    # Continue reading — three in-progress books
    continue_reading_list = [
        {
            "novel": NOVELS[0],
            "chapter_no": 14,
            "progress": 48,
        },
        {
            "novel": NOVELS[2],
            "chapter_no": 19,
            "progress": 73,
        },
        {
            "novel": NOVELS[5],
            "chapter_no": 12,
            "progress": 22,
        },
    ]

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
