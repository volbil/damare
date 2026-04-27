from fastapi import APIRouter, Request, Depends
from app.dependencies import auth_optional
from app.models import User
from app import templates


router = APIRouter()


CHAPTER_TITLE = "Хвіст. Чому хвіст?"

CHAPTER_BODY = (
    "Я помер у п'ятницю ввечері. Не від чогось ефектного. Не від драконячого вогню "
    "чи прокляття стародавніх. Я помер тому, що сів за робочий стіл після п'яти кав "
    "і дванадцятигодинної зміни в лабораторії, і моє серце мовчки сказало: «ну все».\n\n"
    "Останнє, що я бачив — це монітор з результатами хроматографії. Шматок суші, який "
    "не дожував. І мою дисертацію, яку я так і не дописав.\n\n"
    "Прокинувся я в лісі. У дівочому тілі. З довгим лускатим хвостом."
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
            "novel_title": "Я був токсикологом...",
            "chapter_no": 3,
            "chapter_title": CHAPTER_TITLE,
            "chapter_body": CHAPTER_BODY,
            "word_count": word_count,
            "char_count": char_count,
        },
    )
