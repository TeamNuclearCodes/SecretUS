# SecretUS

<div align="center">
  <img src="imgs/logo1.png" width="150"/>
  <p>
  A one stop solution for people who have hard time recalling passwords.
  </p>
</div>

> [!TIP]
> This project received a special mention from the jury in [FOSS Hack 2024](https://forum.fossunited.org/t/foss-hack-2024-results/3964#special-mentions-2)
> 
## Contents

- [**Overview**](#overview)
- [**Installation & Usage**](#installation--usage)
- [**Gallery**](#gallery)
- [**Team Memebers**](#team-members)

## Overview

SecretUS is a secure and reliable password manager designed to store and manage your passwords using robust encryption techniques to ensure the safety of your sensitive information. The key features of SecretUS include:

- **AES 256 Encryption**: All passwords are stored using AES 256 encryption, providing a high level of security.
- **SSH Keys**: Support for storing SSH private keys.
- **PGP Keys**: Support for storing PGP private keys.
- **Master Password**: A single master password, encrypted using SHA-256, grants access to all stored passwords. The SHA-256 sum is used to encrypt the master password, ensuring it always results in a 32-byte key to match the AES standard. Since the master password itself serves as the key, there is no need to store the key used for encrypting the master password anywhere.


## Installation & Usage
### Linux
```bash
git clone https://github.com/TeamNuclearCodes/SecretUS.git
cd SecretUS
sudo make install
# SecretUS will be available under application search menu after installation
```
### Windows
```powershell
git clone https://github.com/TeamNuclearCodes/SecretUS.git
cd SecretUS
python -m virtualenv .venv
.\.venv\Scripts\activate
pip install -r requirements.txt
cd frontend
npm i
npm run build
cd ..
pyinstaller -w -F --add-data "frontend/build;frontend/build" app.py --distpath build/dist --workpath build/build
.\build\dist\app.exe
```

## Gallery

| Home|Pass Vault (Decrypted password)|
:-:|:-:
| ![](imgs/img4.png) | ![](imgs/img1.png) |

| SSH Vault|PGP Vault (Key export) |
:-:|:-:
| ![](imgs/img2.png) | ![](imgs/img3.png) |


## Team Members

<div align="center">
  
| <img src="https://avatars.githubusercontent.com/u/138325645" width="100"/> | <img src="https://avatars.githubusercontent.com/u/147746119" width="100"/> |
:-:|:-:
|Aaron George<br/>Abraham|Eshaan<br/>Abdulkalam|
|<a href="https://github.com/aaron-6960">@aaron-6960</a>|<a href="https://github.com/Eshaanmanath">@Eshaanmanath</a>|

|![](https://avatars.githubusercontent.com/u/96683120?s=100) | ![](https://avatars.githubusercontent.com/u/45532566?s=100) |
:-:|:-:
|Midhun Unni|Vasanth R|
|<a href="https://github.com/midhununni457">@midhununni457</a>|<a href="https://github.com/1337kid/">@1337kid</a>|

</div>
