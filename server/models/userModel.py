from sqlalchemy import String, ForeignKey
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from typing import List, Optional

class Base(DeclarativeBase):
    pass

class Users(Base):
    __tablename__ = "users"

class Campaigns(Base):
    __tablename__ = "campaigns"

    