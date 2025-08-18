from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from app.models import User, AuthToken
from sqlalchemy import select, func


async def get_user_by_username(
    session: AsyncSession, username: str
) -> User | None:
    return await session.scalar(
        select(User).filter(func.lower(User.username) == username.lower())
    )


async def get_auth_token(
    session: AsyncSession, secret: str
) -> AuthToken | None:
    return await session.scalar(
        select(AuthToken)
        .filter(AuthToken.secret == secret)
        .options(selectinload(AuthToken.user))
    )
