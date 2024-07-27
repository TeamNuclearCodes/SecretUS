from sqlalchemy.orm import Mapped, mapped_column
from db import db

class SSHVault(db.Model):
    id: Mapped[str] = mapped_column(primary_key=True)
    sshkey: Mapped[str]
    username: Mapped[str]
    nonce: Mapped[str]
    host: Mapped[str]