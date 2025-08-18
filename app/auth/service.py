from sqlalchemy.ext.asyncio import AsyncSession
from app.service import get_user_by_username
from app.utils import utcnow, new_token
from app.models import User, AuthToken
from app.utils import get_settings
from datetime import timedelta
from sqlalchemy import select
import secrets
import aiohttp


async def check_user_reference(reference: str):
    settings = get_settings()

    async with aiohttp.ClientSession() as session:
        resp = await session.post(
            "https://api.hikka.io/auth/token",
            json={
                "request_reference": reference,
                "client_secret": settings.backend.hikka_secret,
            },
        )

        return await resp.json()


async def get_hikka_username(secret: str):
    async with aiohttp.ClientSession() as session:
        resp = await session.get(
            "https://api.hikka.io/user/me", headers={"Auth": secret}
        )

        return await resp.json()


async def get_or_create_oauth_user(
    session: AsyncSession, oauth_provider: str, user_data: dict
):
    if oauth_provider == "hikka":
        oauth_reference = user_data["reference"]
        username = user_data["username"]

    now = utcnow()

    if not (
        user := await session.scalar(
            select(User).filter(
                User.oauth_provider == oauth_provider,
                User.oauth_reference == oauth_reference,
            )
        )
    ):
        # Just in case
        max_attempts = 5
        attempts = 0

        while True:
            # If for some reason we exceed attempts or 64 character limit
            # Just generate random username
            if attempts > max_attempts or len(username) > 64:
                username = secrets.token_urlsafe(16)
                break

            if not (await get_user_by_username(session, username)):
                break

            username += "-" + secrets.token_urlsafe(4)
            attempts += 1

        user = User(
            **{
                "oauth_reference": oauth_reference,
                "oauth_provider": oauth_provider,
                "username": username,
                "last_active": now,
                "created": now,
                "login": now,
            }
        )

        session.add(user)

    await session.commit()

    return user


async def create_auth_token(session: AsyncSession, user: User) -> AuthToken:
    now = utcnow()

    # Update user login time
    user.login = now

    # After auth token will be valid only for 30 minutes
    # If unused it will expire
    token = AuthToken(
        **{
            "expiration": now + timedelta(minutes=30),
            "secret": new_token(),
            "created": now,
            "user": user,
        }
    )

    session.add_all([user, token])
    await session.commit()

    return token
