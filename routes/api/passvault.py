from flask import Blueprint, request
from db.functions.settings import getSettings
from flask import jsonify
from flask_bcrypt import generate_password_hash

bp = Blueprint('passvault', __name__, url_prefix='/api/passvault')

@bp.route('/new', methods=('POST',))
def status():
    pass