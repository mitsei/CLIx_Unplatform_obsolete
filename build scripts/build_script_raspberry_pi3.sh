#!/bin/bash 

rm -r build
rm *.spec
find . -name "*.pyc" -type f -delete

git pull

virtualenv -p python3 unenv
source unenv/bin/activate
pip install -r requirements.txt

cp -r ../unenv/lib/python3.4/site-packages/PyInstaller/bootloader/Linux-32bit unenv/lib/python3.4/site-packages/PyInstaller/bootloader/Linux-32bit-arm

pyinstaller unserver.py --clean --distpath ../unplatform-distributable -n unplatform_linux32 -y
