from db.models.Settings import Settings

def getSettings():
    return Settings.query.get(1)