from flask import Flask, render_template
from flaskwebgui import FlaskUI
from os import getenv
from db import DBPath, db

DEV = getenv('MODE') == 'development'

app = Flask(__name__, static_url_path='/' if not DEV else None,
            static_folder="frontend/build" if not DEV else None, 
            template_folder='frontend/build' if not DEV else None)

app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{DBPath}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


from routes.api import settings
app.register_blueprint(settings.bp)
db.init_app(app)

@app.route('/')
def home():
    if DEV:
        return 'SecretUS backend'
    else:
        return render_template('index.html')

@app.route('/api/hello')
def get_current_time():
    return "noice"

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    if DEV:
        Flask.run(app,debug=True)
    else:
        FlaskUI(app=app,width=800,height=600, server="flask").run()