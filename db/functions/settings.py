from db.models.Settings import Settings
from db import db

def getSettings():
    return Settings.query.get(1)

def createSettings(password):
    settings = Settings(
        id = 1,
        password = password
    )
    db.session.add(settings)
    db.session.commit()