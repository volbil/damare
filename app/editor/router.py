from fastapi import APIRouter, Request, Depends
from app.dependencies import auth_optional
from app.models import User
from app import templates


router = APIRouter()


@router.get("/editor")
async def editor(request: Request, user: User | None = Depends(auth_optional)):
    return templates.TemplateResponse(
        "editor/editor.html",
        {
            "request": request,
            "user": user,
        },
    )
