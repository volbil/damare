from fastapi import APIRouter, Request, Depends
from .dependencies import get_username
from app.utils import get_settings
from app import templates


router = APIRouter()


@router.get("/login")
async def login(request: Request):
    settings = get_settings()
    return templates.TemplateResponse(
        "auth/login.html",
        {
            "request": request,
            "hikka_app_id": settings.backend.hikka_app_id,
        },
    )


@router.get("/login/hikka")
async def login_hikka(request: Request, username: str = Depends(get_username)):
    return templates.TemplateResponse(
        "auth/login.html",
        {"request": request, "username": username},
    )
