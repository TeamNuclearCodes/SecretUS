from flask import Blueprint, request
from db.functions.settings import getSettings
from flask import jsonify
from vault import encryptDataUsingAES
from db.functions.passvault import addNewPassToPassVault,updatePassToPassVault

bp = Blueprint('pgpvault', __name__, url_prefix='/api/pgpvault')

@bp.route('/new', methods=('POST',))
def new():
    formData = request.json
    encryptedPassword, nonce = encryptDataUsingAES(
        data=formData['password'].encode('utf-8'),
        masterPassword=formData['key'].encode('utf-8')
    )
    addNewPassToPassVault(encryptedPassword, formData["username"], formData["service"], formData["description"], nonce)
    return ''

@bp.route('/update', methods=('POST',))
def update():
    formData = request.json
    encryptedPassword, nonce = encryptDataUsingAES(
        data=formData['password'].encode('utf-8'),
        masterPassword=formData['key'].encode('utf-8')
    )
    updatePassToPassVault(encryptedPassword, formData["username"], formData["service"], formData["description"], nonce, formData["id"])
    return ''