#!/bin/bash 

rm -r unenv
rm -r build
rm *.spec
find . -name "*.pyc" -type f -delete
find . -name ".DS_Store" -type f -delete

git pull

pip install -r requirements.txt

pyinstaller ../unplatform_source/unserver.py --clean --distpath ../unplatform-distributable -n unplatform_win32 -y
