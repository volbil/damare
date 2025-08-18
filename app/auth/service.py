from app.utils import get_settings
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
