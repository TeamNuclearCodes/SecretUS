from flask import Blueprint, request
from db.functions.settings import getSettings
from flask import jsonify
from vault import encryptDataUsingAES,decryptDataUsingAES
from db.functions.passvault import addNewPassToPassVault,updatePassToPassVault,getData

bp = Blueprint('passvault', __name__, url_prefix='/api/passvault')

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

@bp.route('/decrypt', methods=('POST',))
def decrypt():
    formData = request.json
    dbData = getData(formData["id"])
    password = decryptDataUsingAES(
        data = dbData.password,
        masterPassword = formData['key'].encode('utf-8'),
        nonce = dbData.nonce
    )
    print(password.decode('utf-8'))
    return ''