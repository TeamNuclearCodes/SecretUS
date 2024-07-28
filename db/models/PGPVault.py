from sqlalchemy.orm import Mapped, mapped_column
from db import db

class PGPVault(db.Model):
    id: Mapped[str] = mapped_column(primary_key=True)
    title: Mapped[str]
    pgpkey: Mapped[str]
    nonce: Mapped[str]