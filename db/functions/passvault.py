from db.models.PassVault import PassVault
from db import db
from uuid import uuid4

def addNewPassToPassVault(password='',username='',service='', description=''):
    newpass = PassVault(
        id = str(uuid4()),
        username = username,
        password = password,
        service = service,
        description = description
    )
    db.session.add(newpass)
    db.session.commit()