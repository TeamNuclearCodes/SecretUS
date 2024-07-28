from flask import Blueprint, request
from flask import jsonify
from vault import encryptDataUsingAES, decryptDataUsingAES, checkMasterPassword
from db.functions.pgpvault import (
    addNewKewToPGPVault,
    removeKeyFromPGPVault,
    getKeyFromPGPVault,
    getKeysFromPGPVault
)
from db import installationDir

bp = Blueprint('pgpvault', __name__, url_prefix='/api/pgpvault')

@bp.route('/new', methods=('POST',))
def new():
    formData = request.json
    masterPassword = formData['masterPassword']
    isUser = checkMasterPassword(masterPassword)
    if not isUser:
        return jsonify({"error":"Incorrect master password"}),403
    if 'file' not in request.files:
        return jsonify({"error":"File not found"}),201
    file = request.files["file"]
    encryptedKey, nonce = encryptDataUsingAES(
        data = file.read(),
        masterPassword = masterPassword.encode('utf-8')
    )
    addNewKewToPGPVault(
        encryptedKey,
        formData["username"],
        formData["host"],
        nonce
    )
    return jsonify({"message":"PGP key saved successfully"}),201

@bp.route('/decrypt', methods=('POST',))
def decrypt():
    formData = request.json
    masterPassword = formData['masterPassword']
    isUser = checkMasterPassword(masterPassword)
    if not isUser:
        return jsonify({"error":"Incorrect master password"}),403
    dbData = getKeyFromPGPVault(formData["id"])
    pgpkey = decryptDataUsingAES(
        data = dbData.pgpkey,
        masterPassword = masterPassword.encode('utf-8'),
        nonce = dbData.nonce
    )
    exportFile = f'{installationDir}/{dbData.id}.pgp.key'
    with open(exportFile, 'wb') as f:
        f.write(pgpkey)
    return jsonify({"message":f"PGP key exported to {exportFile}"}),201

@bp.route('/delete', methods=('POST',))
def delete():
    formData = request.json
    status = removeKeyFromPGPVault(formData["id"])
    if not status:
        return jsonify({"error": "Failed to delete"}),201
    return jsonify({"message":"Deleted successfully"}),201

@bp.route('/list', methods=('GET',))
def pgpkeylist():
    keys = ['id', 'title']
    keyList = getKeysFromPGPVault()
    dict_list = [dict(zip(keys, item)) for item in keyList]
    return jsonify(dict_list),200