from functools import lru_cache
from datetime import datetime, UTC
from dynaconf import Dynaconf
import secrets


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
