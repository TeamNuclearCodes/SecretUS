from flask import Blueprint, request
from db.functions.settings import getSettings
from flask import jsonify
from vault import encryptDataUsingAES

bp = Blueprint('passvault', __name__, url_prefix='/api/passvault')

@bp.route('/new', methods=('POST',))
def status():
    formData = request.json
    encryptedPassword, nonce = encryptDataUsingAES(
        data=formData['password'],
        masterPassword=formData['']
    )
    return ''