from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from app.utils import get_settings
from fastapi import FastAPI
from fastapi import Request
import traceback
import arel


settings = get_settings()
templates = Jinja2Templates(directory="templates")


def create_app(init_db: bool = True) -> FastAPI:
    lifespan = None

    app = FastAPI()

    app.mount(
        "/static",
        StaticFiles(directory="static"),
        name="static",
    )

    # Hot reload for Jinja templates
    if settings.backend.debug:
        hot_reload = arel.HotReload(
            paths=[
                arel.Path("./templates/"),
                arel.Path("./static/"),
            ]
        )
        templates.env.globals["hot_reload"] = hot_reload
        templates.env.globals["DEBUG"] = True

        app.add_websocket_route(
            "/hot-reload", route=hot_reload, name="hot-reload"
        )

        app.add_event_handler("startup", hot_reload.startup)
        app.add_event_handler("shutdown", hot_reload.shutdown)

    else:
        templates.env.globals["DEBUG"] = False

    from .home import router as home_router
    from .auth import router as auth_router

    app.include_router(home_router)
    app.include_router(auth_router)

    # @app.exception_handler(Exception)
    # async def custom_exception_handler(request: Request, exc: Exception):
    #     return templates.TemplateResponse(
    #         "layout/error.html",
    #         {
    #             "request": request,
    #             "traceback": "".join(
    #                 traceback.format_exception(
    #                     type(exc), exc, exc.__traceback__
    #                 )
    #             ),
    #         },
    #     )

    return app
