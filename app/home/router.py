from fastapi import APIRouter, Request, Depends
from app.dependencies import auth_optional
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
        },
    )


@router.get("/title")
async def title(request: Request, user: User | None = Depends(auth_optional)):
    return templates.TemplateResponse(
        "title/title.html",
        {
            "request": request,
            "user": user,
        },
    )
