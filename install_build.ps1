pip install -r requirements.txt
Set-Location frontend
npm install
npm run build
Set-Location ..
.venv/Scripts/Activate
pyinstaller -w -F --add-data "frontend/build;frontend/build" app.py --distpath build/dist --workpath build/build