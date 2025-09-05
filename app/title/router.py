from fastapi import APIRouter, Request, Depends
from .dependencies import validate_title_create
from app.dependencies import auth_mandatory
from app.dependencies import auth_optional
from fastapi import UploadFile, File
from app.schemas import FormResult
from .schemas import CreateForm
from app.models import User
from app import templates


router = APIRouter()


@router.get("/title")
async def title(request: Request, user: User | None = Depends(auth_optional)):
    return templates.TemplateResponse(
        "title/title.html",
        {
            "request": request,
            "user": user,
        },
    )


@router.api_route("/create", methods=["GET", "POST"])
async def create_title(
    request: Request,
    user: User | None = Depends(auth_mandatory),
    data: FormResult = Depends(validate_title_create),
    # file: UploadFile | None = File(None, alias="poster"),
):

    # print(valid)
    # print(form.genres.data)

    return templates.TemplateResponse(
        "title/create.html",
        {
            "request": request,
            "form": data.form,
            "user": user,
        },
    )
