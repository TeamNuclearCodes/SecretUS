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
    try:
        # Fetch the record by ID
        entry = db.session.query(PassVault).filter_by(id=id).one_or_none()
        
        if entry is None:
            print("Entry not found.")
            return

        # Update the fields if new values are provided
        entry.password = password
        entry.description = description
        entry.service = service
        entry.nonce = nonce
        entry.username = username
        

        # Commit the changes to the database
        db.session.commit()
        print("Entry updated successfully.")
        
    except Exception as e:
        db.session.rollback()  # Roll back the transaction on error
        print(f"An error occurred: {e}")