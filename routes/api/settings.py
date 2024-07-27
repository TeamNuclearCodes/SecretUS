from flask import Blueprint, request
from db.functions.settings import getSettings, createSettings
from flask import jsonify
from flask_bcrypt import generate_password_hash

bp = Blueprint('settings', __name__, url_prefix='/api/settings')

@bp.route('/status', methods=('GET',))
def status():
    if getSettings():
        return jsonify({"registered": True}),200
    return jsonify({"registered": False}), 200

@bp.route('/register', methods=('POST',))
def register():
    if getSettings():
        return jsonify({"error": "Already registered"}),200
    password = request.json['password']
    hash = generate_password_hash(password)
    createSettings(hash)
    return jsonify({"message": "Registered successfully"}), 201