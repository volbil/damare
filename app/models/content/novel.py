from sqlalchemy import String, ForeignKey
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship
from sqlalchemy.orm import Mapped
from datetime import datetime
from ..base import Base


class Novel(Base):
    __tablename__ = "service_novels"

    status: Mapped[str] = mapped_column(String(16), index=True, nullable=True)
    title_original: Mapped[str] = mapped_column(String(255), nullable=True)
    author: Mapped[str] = mapped_column(String(255), nullable=True)
    title: Mapped[str] = mapped_column(String(255), nullable=True)
    year: Mapped[int] = mapped_column(index=True, nullable=True)
    synopsis: Mapped[str] = mapped_column(nullable=True)
    original: Mapped[bool]

    # genres
    # poster
    # teams ?
