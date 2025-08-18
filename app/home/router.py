from fastapi import APIRouter, Request
from app import templates


router = APIRouter()


@router.get("/")
async def home(request: Request):
    return templates.TemplateResponse("home/home.html", {"request": request})
