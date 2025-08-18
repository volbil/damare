from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from app.models import User


async def get_user_by_username(
    session: AsyncSession, username: str
) -> User | None:
    return await session.scalar(
        select(User).filter(func.lower(User.username) == username.lower())
    )
