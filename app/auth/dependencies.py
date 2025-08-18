from fastapi.exceptions import HTTPException
from fastapi import status
from . import service


async def get_hikka_user_data(reference: str) -> str:
    data = await service.check_user_reference(reference)

    if "code" in data:
        raise HTTPException(
            status_code=status.HTTP_307_TEMPORARY_REDIRECT,
            headers={"Location": "/login"},
        )

    data = await service.get_hikka_username(data["secret"])

    return data
