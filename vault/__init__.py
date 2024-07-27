from Crypto.Cipher import AES

def encryptDataUsingAES(data, key):
    cipher = AES.new(key, AES.MODE_EAX)
    nonce = cipher.nonce
    cipher.encrypt(b'hello')