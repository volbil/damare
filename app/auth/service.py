import aiohttp


async def check_user_reference(reference: str):
    async with aiohttp.ClientSession() as session:
        resp = await session.post(
            "https://api.hikka.io/auth/token",
            json={
                "request_reference": reference,
                "client_secret": "nGVSW-SkmtAU7ySddxSIJF65DLkTNRzEEdoZHM_bc9PJznx47uqHLDrELInU6Jik8uNhyPCK4SqZqSBGfN00iR30wmUkdggngVs-XnGfhZMXA7441Ss8c6VzEx0CTeIp",
            },
        )

        return await resp.json()


async def get_hikka_username(secret: str):
    async with aiohttp.ClientSession() as session:
        resp = await session.get(
            "https://api.hikka.io/user/me", headers={"Auth": secret}
        )

        return await resp.json()
