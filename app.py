import time
from flask import Flask, render_template
from flaskwebgui import FlaskUI
from dotenv import load_dotenv
from os import getenv

DEV = getenv('MODE') == 'development'

if DEV: app = Flask(__name__)
else: app = Flask(__name__,static_url_path='/',static_folder="frontend/build", template_folder='frontend/build')
@app.route('/')
def home():
    if DEV: return 'lmao'
    else: return render_template('index.html')

@app.route('/api/hello')
def get_current_time():
    return "noice"

if __name__ == "__main__":
    if DEV:
        Flask.run(app)
    else:
        FlaskUI(app=app,width=800,height=600, server="flask").run()