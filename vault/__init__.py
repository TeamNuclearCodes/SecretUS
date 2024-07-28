from Crypto.Cipher import AES
from base64 import b64encode, b64decode
from hashlib import sha256
from flask_bcrypt import check_password_hash
from db.functions.settings import getSettings

def getSHA256sum(data):
    hash = sha256()
    hash.update(data)
    key = hash.digest()
    return key

def encryptDataUsingAES(data, masterPassword):
    key = getSHA256sum(masterPassword)
    cipher = AES.new(key, AES.MODE_EAX)
    nonce = cipher.nonce
    ciphertext = cipher.encrypt(data)
    nonce = b64encode(nonce)
    encryptedPassword = b64encode(ciphertext)
    return encryptedPassword, nonce
    
def decryptDataUsingAES(data, masterPassword, nonce):
    data = b64decode(data)
    nonce = b64decode(nonce)
    key = getSHA256sum(masterPassword)
    cipher = AES.new(key, AES.MODE_EAX, nonce=nonce)
    password = cipher.decrypt(data)
    return password

def checkMasterPassword(password):
    settings = getSettings()
    if not settings:
        return False
    return check_password_hash(settings.password, password)