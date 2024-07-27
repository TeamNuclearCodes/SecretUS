from flask import Blueprint, request
from db.functions.settings import getSettings
from flask import jsonify
from vault import encryptDataUsingAES, decryptDataUsingAES, checkMasterPassword
from db.functions.passvault import addNewPassToPassVault,updatePassToPassVault, getPasswordFromPassVault, removePasswordFromPassVault, getPasswordsFromPassVault

bp = Blueprint('passvault', __name__, url_prefix='/api/passvault')

@bp.route('/new', methods=('POST',))
def new():
    formData = request.json
    encryptedPassword, nonce = encryptDataUsingAES(
        data = formData['password'].encode('utf-8'),
        masterPassword = formData['masterPassword'].encode('utf-8')
    )
    addNewPassToPassVault(
        encryptedPassword,
        formData["username"],
        formData["service"],
        formData["description"],
        nonce
    )
    return jsonify({"message":"Password saved successfully"}),201

@bp.route('/update', methods=('POST',))
def update():
    formData = request.json
    encryptedPassword, nonce = encryptDataUsingAES(
        data = formData['password'].encode('utf-8'),
        masterPassword = formData['masterPassword'].encode('utf-8')
    )
    a = updatePassToPassVault(
        encryptedPassword,
        formData["username"],
        formData["service"],
        formData["description"],
        nonce,
        formData["id"]
    )
    if not a:
        return jsonify({"error":"Failed to update"}),500
    return jsonify({"message":"Password updated successfully"}),201

@bp.route('/decrypt', methods=('POST',))
def decrypt():
    formData = request.json
    dbData = getPasswordFromPassVault(formData["id"])
    password = decryptDataUsingAES(
        data = dbData.password,
        masterPassword = formData['masterPassword'].encode('utf-8'),
        nonce = dbData.nonce
    )
    return jsonify({
        "password": password.decode('utf-8'),
        "service": dbData.service,
        "description": dbData.description,
        "username": dbData.username
    }),201

@bp.route('/delete', methods=('POST',))
def delete():
    formData = request.json
    status = removePasswordFromPassVault(formData["id"])
    if not status:
        return jsonify({"error": "Failed to delete"}),201
    return jsonify({"message":"Deleted successfully"}),201

@bp.route('/list', methods=('GET',))
def pgpkeylist():
    keys = ['id', 'username', 'description', 'service']
    passList = getPasswordsFromPassVault()
    dict_list = [dict(zip(keys, item)) for item in passList]
    return jsonify(dict_list),200