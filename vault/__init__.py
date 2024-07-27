from Crypto.Cipher import AES
from base64 import b64encode, b64decode
from hashlib import sha256

def encryptDataUsingAES(data, masterPassword):
    hash = sha256()
    hash.update(masterPassword)
    key = hash.digest()
    cipher = AES.new(key, AES.MODE_EAX)
    nonce = cipher.nonce
    ciphertext = cipher.encrypt(data)
    nonce = b64encode(nonce)
    encryptedPassword = b64encode(ciphertext)
    return encryptedPassword, nonce