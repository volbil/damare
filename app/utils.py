from functools import lru_cache
from datetime import datetime, UTC
from dynaconf import Dynaconf
import secrets
import os


# Replacement for deprecated datetime's utcnow
def utcnow():
    return datetime.now(UTC).replace(tzinfo=None)


def new_token():
    """Genereate new random token"""

    return secrets.token_urlsafe(32)


@lru_cache()
def get_settings():
    """Returns lru cached system settings"""

    return Dynaconf(
        settings_files=["settings.toml"],
        default_env="default",
        environments=True,
    )


# Cover-art palettes — (base, accent, ink). Ported from covers.jsx.
COVER_PALETTES = [
    ("#1a2138", "#e8c547", "#f5e9c4"),
    ("#2b1d2f", "#d97a5a", "#f0d9c8"),
    ("#1c2a26", "#9bb89a", "#dde7d8"),
    ("#3a1f1c", "#e8c547", "#f4d8b8"),
    ("#241a2e", "#a594d9", "#e2d9f2"),
    ("#1f2a3a", "#7cb3c9", "#d6e6ee"),
    ("#2a2118", "#e8b547", "#f3dca0"),
    ("#1d2b2b", "#e8c547", "#cce5d8"),
    ("#2e1a26", "#e89e8a", "#f4d4cc"),
    ("#202020", "#e8c547", "#e8e4d8"),
    ("#1a1d2e", "#bf8ce0", "#dccff0"),
    ("#2a2a3e", "#e8c547", "#cdd0e8"),
]


# Replicates JS `(h * mult + s.charCodeAt(i)) | 0` accumulator (signed 32-bit)
def hash32(s, multiplier):
    h = 0
    for ch in s:
        h = (h * multiplier + ord(ch)) & 0xFFFFFFFF
        if h >= 0x80000000:
            h -= 0x100000000
    return h


def cover_palette(seed):
    """Pick a cover palette tuple deterministically by seed."""

    h = hash32(seed, 31)
    return COVER_PALETTES[abs(h) % len(COVER_PALETTES)]


def cover_layout(seed, title=""):
    """Pick one of 6 cover layouts deterministically by seed + title."""

    h = hash32(seed + title, 33)
    return abs(h) % 6


def css_mtime():
    """Return the modification time of static/styles.css as an int.

    Used as a cache buster in templates. Auto-invalidates the browser
    cache whenever Tailwind's watcher rewrites the file, while staying
    stable across requests in production.
    """

    try:
        return int(os.stat("static/styles.css").st_mtime)
    except FileNotFoundError:
        return 0
