# SecretUS
## Overview

SecretUS is a secure and reliable password manager designed to store and manage your passwords using robust encryption techniques to ensure the safety of your sensitive information. The key features of SecretUS include:

- **AES 256 Encryption**: All passwords are stored using AES 256 encryption, providing a high level of security.
- **SHA Keys**: Additional security is provided through SHA keys.
- **PGP Keys**: Support for PGP keys for secure communication.
- **Master Password**: A single master password, encrypted using SHA 256, grants access to all stored passwords. The SHA 256 sum is used to encrypt the master password, ensuring it always results in a 32-byte key to match the AES standard. Since the master password itself serves as the key, there is no need to store the key used for encrypting the master password anywhere.


