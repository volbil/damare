from fastapi import APIRouter, Request, Depends
from app.dependencies import auth_optional
from app.stub_data import NOVELS
from app.models import User
from app import templates


router = APIRouter()


@router.get("/")
async def home(request: Request, user: User | None = Depends(auth_optional)):
    return templates.TemplateResponse(
        "home/home.html",
        {
            "request": request,
            "user": user,
            "active": "home",
            "page_title": "Стрічка",
            "continue_reading": NOVELS[0],
            "featured": NOVELS[5],
            "trending": NOVELS[2:6],
            "new_releases": NOVELS[:4],
        },
    )
