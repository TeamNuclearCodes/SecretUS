from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column
from db import db

class Settings(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    salt: Mapped[str]
    password: Mapped[str]