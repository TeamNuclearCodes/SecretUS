from flask import Blueprint, request
from db.functions.settings import getSettings, createSettings
from db import db
from flask import jsonify
from flask_bcrypt import generate_password_hash
from vault import checkMasterPassword

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

@bp.route('/delete', methods=('POST',))
def delete():
    formData = request.json
    masterPassword = formData['masterPassword']
    isUser = checkMasterPassword(masterPassword)
    if not isUser:
        return jsonify({"error":"Incorrect master password"}),403
    db.drop_all()
    db.create_all()
    return jsonify({"message":"data deleted"}),200