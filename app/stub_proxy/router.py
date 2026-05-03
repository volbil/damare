"""Dev-only image proxy with on-disk cache.

Lets the design-stub frontend reference real cover URLs from
``stub/ranobe.json`` (zenko.online and friends) without hammering
their CDN every page load and without shipping their host names in
production HTML.

Flow:

1. Templates render ``<img src="/stub/proxy?url=https://...">`` instead
   of the raw upstream URL. The ``proxy_url()`` helper, exposed as a
   Jinja global, does this rewrite for cover images.
2. On request, this router checks ``stub/cache/<sha256>.<ext>``.
3. If hit, serves directly from disk with aggressive cache headers.
4. If miss, downloads, persists, and serves.

Hosts must be in :data:`ALLOWED_HOSTS` — that's the SSRF guard. The
router is only mounted when ``settings.backend.debug`` is True, so
production requests for ``/stub/proxy`` 404 by default.

The cache directory ``stub/cache/`` is gitignored alongside
``stub/ranobe.json`` and ``stub/data.pkl``.
"""

import hashlib
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

from fastapi import APIRouter, HTTPException, Query
from fastapi.responses import FileResponse, Response


# Project-root/stub/cache — sibling to the gitignored ranobe.json / data.pkl
_PROJECT_ROOT = Path(__file__).resolve().parent.parent.parent
CACHE_DIR = _PROJECT_ROOT / "stub" / "cache"


# Hosts the proxy will fetch from. Add new ones here when the data set
# grows. Anything not on this list returns 403 — that's the SSRF wall.
ALLOWED_HOSTS = {
    "storage.zenko.online",
}


# Content-Type → file extension. Anything not listed gets ``.bin`` and
# is served with the upstream content-type echoed back.
_CONTENT_TO_EXT = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "image/gif": "gif",
    "image/avif": "avif",
    "image/svg+xml": "svg",
}

_EXT_TO_CONTENT = {v: k for k, v in _CONTENT_TO_EXT.items()}


router = APIRouter(prefix="/stub", tags=["stub"])


# ─── URL helpers ────────────────────────────────────────────────────────

def _is_allowed(url: str) -> bool:
    if not url:
        return False
    try:
        parsed = urllib.parse.urlparse(url)
    except Exception:
        return False
    return parsed.scheme in ("http", "https") and parsed.netloc in ALLOWED_HOSTS


def proxy_url(url: str) -> str:
    """Rewrite an upstream image URL to go through the dev proxy.

    Used as a Jinja global. Pass-through for URLs we can't or won't
    proxy (relative paths, unknown hosts, falsy values, or
    non-debug environments where the proxy isn't mounted).
    """

    if not url or not isinstance(url, str):
        return url
    if not url.startswith(("http://", "https://")):
        return url
    if not _is_allowed(url):
        return url
    # Imported lazily to avoid a circular import at module load.
    from app.utils import get_settings
    if not get_settings().backend.debug:
        return url
    return f"/stub/proxy?url={urllib.parse.quote(url, safe='')}"


# ─── Cache helpers ──────────────────────────────────────────────────────

def _cache_key(url: str) -> str:
    return hashlib.sha256(url.encode("utf-8")).hexdigest()


def _find_cached(key: str) -> Path | None:
    if not CACHE_DIR.exists():
        return None
    for path in CACHE_DIR.glob(f"{key}.*"):
        return path
    return None


def _save_to_cache(key: str, body: bytes, content_type: str) -> Path:
    CACHE_DIR.mkdir(parents=True, exist_ok=True)
    ext = _CONTENT_TO_EXT.get(content_type, "bin")
    path = CACHE_DIR / f"{key}.{ext}"
    path.write_bytes(body)
    return path


# ─── Handler ────────────────────────────────────────────────────────────

@router.get("/proxy")
def proxy(url: str = Query(..., description="Upstream image URL to fetch and cache")):
    if not _is_allowed(url):
        raise HTTPException(status_code=403, detail="Host not allowed")

    key = _cache_key(url)
    cached = _find_cached(key)

    if cached is not None:
        ext = cached.suffix.lstrip(".")
        media_type = _EXT_TO_CONTENT.get(ext, "application/octet-stream")
        return FileResponse(
            cached,
            media_type=media_type,
            headers={"Cache-Control": "public, max-age=31536000, immutable"},
        )

    # Download upstream. Sync urllib in a sync route — FastAPI hands
    # this off to a threadpool, so it doesn't block the event loop.
    request = urllib.request.Request(
        url,
        headers={"User-Agent": "damare-stub-proxy/1.0 (+local dev)"},
    )
    try:
        with urllib.request.urlopen(request, timeout=15) as response:
            content_type = (
                response.headers.get("Content-Type", "application/octet-stream")
                .split(";")[0]
                .strip()
                .lower()
            )
            body = response.read()
    except urllib.error.HTTPError as e:
        raise HTTPException(status_code=502, detail=f"Upstream returned {e.code}")
    except urllib.error.URLError as e:
        raise HTTPException(status_code=502, detail=f"Upstream unreachable: {e.reason}")

    _save_to_cache(key, body, content_type)

    return Response(
        content=body,
        media_type=content_type,
        headers={"Cache-Control": "public, max-age=31536000, immutable"},
    )
