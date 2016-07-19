#!/bin/bash 

rm -r build
rm *.spec
find . -name "*.pyc" -type f -delete
find . -name ".DS_Store" -type f -delete
find . -name ".directory" -type f -delete

git pull

pip install -r requirements.txt

pyinstaller ../unplatform_source/unserver_ssl.py --clean --distpath ../unplatform-distributable -n unplatform_osx -y
pyinstaller ../unplatform_source/unworker.py --clean --distpath ../unplatform-distributable -n unplatform_osx_worker -y

rm -r build
    
