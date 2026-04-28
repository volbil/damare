from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.gzip import GZipMiddleware
from contextlib import asynccontextmanager
from app.database import sessionmanager
from app.utils import get_settings, cover_palette, cover_layout
from fastapi import FastAPI
import arel


settings = get_settings()
templates = Jinja2Templates(directory="templates")


# Expose cover helpers to Jinja templates
templates.env.globals["cover_palette"] = cover_palette
templates.env.globals["cover_layout"] = cover_layout


def _thousands_uk(n):
    """Format an int with space as thousand separator (Ukrainian style)."""

    return "{:,}".format(int(n)).replace(",", " ")


def _initials(name, max_chars=2):
    """Return up to max_chars initials from a name (first letter of each word)."""

    if not name:
        return ""

    parts = name.split()

    if len(parts) >= 2:
        return "".join(p[0] for p in parts[:max_chars]).upper()

    return name[:max_chars].upper()


templates.env.filters["thousands_uk"] = _thousands_uk
templates.env.filters["initials"] = _initials


def create_app(init_db: bool = True) -> FastAPI:
    lifespan = None

    app = FastAPI(
        lifespan=lifespan,
    )

    app.add_middleware(GZipMiddleware, minimum_size=1000)

    app.mount(
        "/static",
        StaticFiles(directory="static"),
        name="static",
    )

    # SQLAlchemy initialization process
    if init_db:
        sessionmanager.init(settings.database.endpoint)

        @asynccontextmanager
        async def lifespan(app: FastAPI):
            yield
            if sessionmanager._engine is not None:
                await sessionmanager.close()

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

    from .editor import router as editor_router
    from .title import router as title_router
    from .home import router as home_router
    from .auth import router as auth_router

    app.include_router(editor_router)
    app.include_router(title_router)
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
