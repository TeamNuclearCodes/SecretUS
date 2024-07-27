from flask import Blueprint, request
from flask import jsonify
from vault import encryptDataUsingAES, decryptDataUsingAES
from db.functions.sshvault import addNewKewToSSHVault,removeKeyFromSSHVault,getKeyFromSSHVault
from db import installationDir

bp = Blueprint('sshvault', __name__, url_prefix='/api/sshvault')

@bp.route('/new', methods=('POST',))
def new():
    formData = request.json
    if 'file' not in request.files:
        return jsonify({"message":"Password saved successfully"}),201
    file = request.files["file"]
    encryptedPassword, nonce = encryptDataUsingAES(
        data = file.read(),
        masterPassword = formData['masterPassword'].encode('utf-8')
    )
    print(file.read())
    addNewKewToSSHVault(
        encryptedPassword,
        formData["username"],
        formData["host"],
        nonce
    )
    return jsonify({"message":"Password saved successfully"}),201

@bp.route('/decrypt', methods=('POST',))
def decrypt():
    formData = request.json
    dbData = getKeyFromSSHVault(formData["id"])
    sshkey = decryptDataUsingAES(
        data = dbData.sshkey,
        masterPassword = formData['masterPassword'].encode('utf-8'),
        nonce = dbData.nonce
    )
    exportFile = f'{installationDir}/{dbData.id}.ssh.key'
    with open(exportFile, 'wb') as f:
        f.write(sshkey)
    return jsonify({"message":f"SSH key exported to {exportFile}"}),201

@bp.route('/delete', methods=('POST',))
def delete():
    formData = request.json
    status = removeKeyFromSSHVault(formData["id"])
    if not status:
        return jsonify({"error": "Failed to delete"}),201
    return jsonify({"message":"Deleted successfully"}),201