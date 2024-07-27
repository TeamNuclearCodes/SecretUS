from sqlalchemy.orm import Mapped, mapped_column
from db import db

class SSHValut(db.Model):
    id: Mapped[str] = mapped_column(primary_key=True)
    sshkey: Mapped[str]
    nonce: Mapped[str]
    host: Mapped[str]