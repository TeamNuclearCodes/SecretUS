.ONESHELL:
.PHONY: all test clean

install_deps:
	@echo "Installing dependencies"
	python3 -m virtualenv .venv
	. .venv/bin/activate
	pip3 install -r requirements.txt
	cd frontend && npm install
	cd ..

build:
	mkdir -p buildapp
	. .venv/bin/activate
	cd frontend && npm run build
	cd ../
	pyinstaller -w -F --add-data "frontend/build:frontend/build" app.py  --distpath buildapp/dist --workpath buildapp/buildapp

install: install_deps build
	cp buildapp/dist/app /usr/bin/secureus
	cp secretus.desktop /usr/share/applications/secretus.desktop
	cp imgs/logo.png /usr/share/icons/secureus.png
	chmod +x /usr/share/applications/secretus.desktop