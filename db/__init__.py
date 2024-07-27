from os.path import expanduser, isfile
from os import makedirs
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

installationDir = expanduser('~') + '/.secretus'
DBPath = installationDir + '/database.db'

isInstalled = isfile(DBPath)
if not isInstalled:
    makedirs(installationDir, exist_ok=True)
    open(DBPath,'w').close()