from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship
from sqlalchemy.orm import Mapped
from sqlalchemy import String
from datetime import datetime
from sqlalchemy import Index
from sqlalchemy import func
from ..base import Base


class User(Base):
    __tablename__ = "service_users"

    username: Mapped[str] = mapped_column(String(64), index=True)

    updated: Mapped[datetime] = mapped_column(nullable=True)
    last_active: Mapped[datetime]
    created: Mapped[datetime]
    login: Mapped[datetime]

    oauth_provider: Mapped[str] = mapped_column(
        String(64), index=True, nullable=True
    )

    oauth_reference: Mapped[str] = mapped_column(
        String(64), index=True, nullable=True
    )

    auth_tokens: Mapped[list["AuthToken"]] = relationship(
        back_populates="user",
    )

    __table_args__ = (
        Index("ix_lower_username", func.lower(username), unique=True),
    )
