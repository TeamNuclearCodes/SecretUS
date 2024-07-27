from Crypto.Cipher import AES
from base64 import b64encode, b64decode
from db.functions.passvault import addNewPassToPassVault
from hashlib import sha256

def encryptDataUsingAES(data, password):
    hash = sha256()
    hash.update(password)
    key = hash.digest()
    cipher = AES.new(key, AES.MODE_EAX)
    nonce = cipher.nonce
    ciphertext = cipher.encrypt(data)
    nonce = b64encode(nonce)
    ciphertext = b64encode(ciphertext)
    return ciphertext, nonce