from db.models.PassVault import PassVault
from db import db
from uuid import uuid4

def addNewPassToPassVault(password='',username='',service='', description='', nonce=""):
    newpass = PassVault(
        id = str(uuid4()),
        username = username,
        password = password,
        service = service,
        description = description,
        nonce = nonce
    )
    db.session.add(newpass)
    db.session.commit()

def updatePassToPassVault(password='',username='',service='', description='', nonce="", id=""):
    entry = getPasswordFromPassVault(id)
    if entry:
        entry.password = password
        entry.description = description
        entry.service = service
        entry.nonce = nonce
        entry.username = username
        db.session.commit()
        return True
    return False

def getPasswordFromPassVault(id):
     data = db.session.query(PassVault).filter_by(id=id).one_or_none()
     return data

def removePasswordFromPassVault(id):
    entry = getPasswordFromPassVault(id)
    if not entry:
        return False
    db.session.delete(entry)
    db.session.commit()

def getPasswordsFromPassVault():
    entires = db.session.query(
        PassVault.id,
        PassVault.username,
        PassVault.description,
        PassVault.service
    ).all()
    print(entires)
    return entires