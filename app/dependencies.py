from sqlalchemy.ext.asyncio import AsyncSession
from fastapi.exceptions import HTTPException
from app.models import User, AuthToken
from app.service import get_auth_token
from app.database import get_session
from fastapi import Cookie, Depends
from typing import Annotated
from app.utils import utcnow
from fastapi import status


async def get_request_auth_token(
    cookie_auth: Annotated[str | None, Cookie(alias="auth")] = None,
) -> str | None:
    return cookie_auth


async def get_token(
    session: AsyncSession = Depends(get_session),
    raw_token: str | None = Depends(get_request_auth_token),
) -> AuthToken | None:
    now = utcnow()

    if not raw_token:
        return None

    token = await get_auth_token(session, raw_token)

    if not token:
        return None

    if not token.user:
        return None

    if now > token.expiration:
        return None

    await session.commit()

    return token


async def auth_optional(
    token: AuthToken | None = Depends(get_token),
) -> User | None:
    if token is not None:
        return token.user

    return None


async def auth_mandatory(
    token: AuthToken | None = Depends(get_token),
) -> User | None:
    if token is not None:
        return token.user

    raise HTTPException(
        status_code=status.HTTP_307_TEMPORARY_REDIRECT,
        headers={"Location": "/login"},
    )
