from db.models.SSHVault import SSHVault
from db import db
from uuid import uuid4

def addNewKewToSSHVault(sshkey='', username='', host='', nonce=''):
    newkey = SSHVault(
        id = str(uuid4()),
        sshkey = sshkey,
        username = username,
        host = host,
        nonce = nonce
    )
    db.session.add(newkey)
    db.session.commit()

def getKeyFromSSHVault(id):
    data = db.session.query(SSHVault).filter_by(id=id).one_or_none()
    return data

def removeKeyFromSSHVault(id):
    entry = getKeyFromSSHVault(id)
    if not entry:
        return False
    db.session.delete(entry)
    db.session.commit()

def getSSHFromSSHVault():
    entires = db.session.query(
        SSHVault.id,
        SSHVault.username,
        SSHVault.host
    ).all()
    print(entires)
    return entires