from fastapi import APIRouter, Request, Depends
from app.dependencies import auth_optional
from app.models import User
from app import templates


router = APIRouter()


CHAPTER_TITLE = "Лист, який ніхто не писав"

CHAPTER_BODY = (
    "Сніг падав так, як падає тільки на Поліссі — повільно, з тією важкою терплячістю, "
    "з якою старі люди розповідають довгі історії.\n\n"
    "Маринка стояла біля воріт батьківської хати і дивилася, як сніжинки одна за одною "
    "лягають на дерев'яну поштову скриньку, прибиту до паркана ще її дідом.\n\n"
    "Сім років. Сім років вона не приїжджала сюди. За цей час вона встигла переїхати "
    "до Львова, потім до Кракова, потім назад до Києва."
)


@router.get("/editor")
async def editor(request: Request, user: User | None = Depends(auth_optional)):
    word_count = len([w for w in CHAPTER_BODY.split() if w.strip()])
    char_count = len(CHAPTER_BODY)

    return templates.TemplateResponse(
        "editor/editor.html",
        {
            "request": request,
            "user": user,
            "active": "write",
            "page_title": "Писати",
            "novel_title": "Сім зимових ночей",
            "chapter_no": 3,
            "chapter_title": CHAPTER_TITLE,
            "chapter_body": CHAPTER_BODY,
            "word_count": word_count,
            "char_count": char_count,
        },
    )
