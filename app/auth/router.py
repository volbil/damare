from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import APIRouter, Request, Depends
from fastapi.responses import RedirectResponse
from .dependencies import get_hikka_user_data
from app.dependencies import anon_mandatory
from app.database import get_session
from app.utils import get_settings
from app import templates
from . import service


router = APIRouter()


@router.get("/login", dependencies=[Depends(anon_mandatory)])
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
async def login_hikka(
    session: AsyncSession = Depends(get_session),
    user_data: str = Depends(get_hikka_user_data),
):
    user = await service.get_or_create_oauth_user(session, "hikka", user_data)
    token = await service.create_auth_token(session, user)

    response = RedirectResponse(url="/", status_code=302)

    response.set_cookie(
        key="auth",
        value=token.secret,
        max_age=360 * 24 * 60 * 60,
        samesite="lax",
    )

    return response


@router.get("/logout")
async def logout():
    response = RedirectResponse("/", status_code=302)
    response.delete_cookie("auth")
    return response
