from flask import Blueprint, request
from db.functions.settings import getSettings
from flask import jsonify
from vault import encryptDataUsingAES, decryptDataUsingAES, checkMasterPassword
from db.functions.passvault import (
    addNewPassToPassVault,
    updatePassToPassVault,
    getPasswordFromPassVault, 
    removePasswordFromPassVault,
    getPasswordsFromPassVault
)

bp = Blueprint('passvault', __name__, url_prefix='/api/passvault')

@bp.route('/new', methods=('POST',))
def new():
    formData = request.json
    masterPassword = formData['masterPassword']
    isUser = checkMasterPassword(masterPassword)
    if not isUser:
        return jsonify({"error":"Incorrect master password"}),403
    encryptedPassword, nonce = encryptDataUsingAES(
        data = formData['password'].encode('utf-8'),
        masterPassword = masterPassword.encode('utf-8')
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
    masterPassword = formData['masterPassword']
    isUser = checkMasterPassword(masterPassword)
    if not isUser:
        return jsonify({"error":"Incorrect master password"}),403
    encryptedPassword, nonce = encryptDataUsingAES(
        data = formData['password'].encode('utf-8'),
        masterPassword = masterPassword.encode('utf-8')
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
    print(request.json)
    formData = request.json
    masterPassword = formData['masterPassword']
    isUser = checkMasterPassword(masterPassword)
    if not isUser:
        return jsonify({"error":"Incorrect master password"}),403
    dbData = getPasswordFromPassVault(formData["id"])
    password = decryptDataUsingAES(
        data = dbData.password,
        masterPassword = masterPassword.encode('utf-8'),
        nonce = dbData.nonce
    )
    return jsonify({
        "password": password.decode('utf-8'),
        "service": dbData.service,
        "description": dbData.description,
        "username": dbData.username,
        "id": dbData.id
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