from db.models.PGPVault import PGPVault
from db import db
from uuid import uuid4

def addNewKewToPGPVault(pgpkey='', title='', nonce=''):
    newkey = PGPVault(
        id = str(uuid4()),
        pgpkey = pgpkey,
        title = title,
        nonce = nonce
    )
    db.session.add(newkey)
    db.session.commit()

def getKeyFromPGPVault(id):
    data = db.session.query(PGPVault).filter_by(id=id).one_or_none()
    return data

def removeKeyFromPGPVault(id):
    entry = getKeyFromPGPVault(id)
    if not entry:
        return False
    db.session.delete(entry)
    db.session.commit()

def getKeysFromPGPVault():
    entires = db.session.query(
        PGPVault.id,
        PGPVault.title,
    ).all()
    return entires