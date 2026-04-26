from fastapi import APIRouter, Request, Depends
from .dependencies import validate_title_create
from app.dependencies import auth_mandatory
from app.dependencies import auth_optional
from app.stub_data import NOVELS, novel_by_id
from app.schemas import FormResult
from app.models import User
from app import templates


router = APIRouter()


CHAPTER_TITLES = [
    "Поверненння", "Поштова скринька", "Лист, який ніхто не писав", "Тітка Ніна",
    "Сон у понеділок", "Сніг на чорнилі", "Друге повернення", "Та, що обіцяла",
    "Лист третій", "Вокзал у грудні", "Малий Андрій", "Ще один сніг",
    "Розмова з матір'ю", "Лист, який не дійшов", "Сім ночей", "Сімдесят сім",
    "Лист останній", "Та, що залишилась",
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
