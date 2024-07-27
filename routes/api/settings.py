from flask import Blueprint
from db.functions import getSettings
from flask import jsonify

bp = Blueprint('settings', __name__, url_prefix='/api/settings')

@bp.route('/status', methods=('GET',))
def status():
    if getSettings():
        return jsonify({"registered": True}), 200
    return jsonify({"registered": False}), 200

@bp.route('/register', methods=('POST',))
def register():
    if getSettings():
        return jsonify({"error": "Already registered"}), 200