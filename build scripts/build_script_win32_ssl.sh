#!/bin/bash 

cd ..

rm -r build
rm *.spec
find . -name "*.pyc" -type f -delete
find . -name ".DS_Store" -type f -delete
find . -name ".directory" -type f -delete

git pull

pip install -r unplatform_source/requirements.txt

pyinstaller unplatform_source/unserver_ssl.py --clean --distpath ../unplatform_distributable -n unplatform_win32 -y
pyinstaller unplatform_source/unworker.py --clean --distpath ../unplatform_distributable -n unplatform_win32_worker -y

rm -r build
