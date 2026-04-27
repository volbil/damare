from fastapi import APIRouter, Request, Depends
from .dependencies import validate_title_create
from app.dependencies import auth_mandatory
from app.dependencies import auth_optional
from app.stub_data import NOVELS, READER_CHAPTER, TAGS, novel_by_id, READER_CHAPTER
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
