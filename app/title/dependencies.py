from app.schemas import FormResult
from .schemas import CreateForm
from fastapi import Request


async def validate_title_create(request: Request):
    form = await CreateForm.from_formdata(request)

    # Idea: we should always return false first if form validation failed
    if not (valid := await form.validate_on_submit()):
        return FormResult(form, False)
