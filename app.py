from flask import Flask, render_template
from flaskwebgui import FlaskUI
from os import getenv
from db import DBPath, db
from routes.api import settings
from routes.api import passvault
from routes.api import sshvault
from routes.api import pgpvault
from dotenv import load_dotenv
from flask_cors import CORS

load_dotenv()
DEV = getenv('MODE') == 'development'

app = Flask(
    __name__,
    static_url_path='/' if not DEV else None,
    static_folder="frontend/build" if not DEV else None,
    template_folder='frontend/build' if not DEV else None
)

app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{DBPath}'
db.init_app(app)
CORS(app)

app.register_blueprint(settings.bp)
app.register_blueprint(passvault.bp)
app.register_blueprint(sshvault.bp)
app.register_blueprint(pgpvault.bp)

@app.route('/')
def home():
    if DEV:
        return 'SecretUS backend'
    else:
        return render_template('index.html')

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    if DEV:
        Flask.run(app,debug=True)
    else:
        FlaskUI(app=app,width=1600,height=900, server="flask").run()