#!/bin/bash

python3 -m virtualenv .venv
source .venv/bin/activate
pip3 install -r requirements.txt
cd frontend && npm install && npm run build
mkdir -p build
cd ../ && pyinstaller -w -F --add-data "frontend/build:frontend/build" app.py  --distpath build/dist --workpath build/build