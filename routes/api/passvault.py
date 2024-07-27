from flask import Blueprint, request
from db.functions.settings import getSettings
from flask import jsonify
from vault import encryptDataUsingAES
from db.functions.passvault import addNewPassToPassVault    

bp = Blueprint('passvault', __name__, url_prefix='/api/passvault')

@bp.route('/new', methods=('POST',))
def status():
    formData = request.json
    encryptedPassword, nonce = encryptDataUsingAES(
        data=formData['password'].encode('utf-8'),
        masterPassword=formData['key'].encode('utf-8')
    )
    addNewPassToPassVault(encryptedPassword, formData["username"], formData["service"], formData["description"])
    return ''