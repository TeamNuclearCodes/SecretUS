from sqlalchemy.orm import Mapped, mapped_column
from db import db

class PassVault(db.Model):
    id: Mapped[str] = mapped_column(primary_key=True)
    username: Mapped[str]
    password: Mapped[str]
    nonce: Mapped[str]
    service: Mapped[str]
    nonce: Mapped[str]
    description: Mapped[str]