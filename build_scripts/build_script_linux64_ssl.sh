#!/bin/bash

cd ..

rm -r build
rm *.spec
find . -name "*.pyc" -type f -delete
find . -name ".DS_Store" -type f -delete
find . -name ".directory" -type f -delete

git pull

pip install -r unplatform_source/requirements.txt

rm -r unplatform_distributable/unplatform_linux64

pyinstaller unplatform_source/unserver_ssl.py --clean --distpath unplatform_distributable -n unplatform_linux64 -y
pyinstaller unplatform_source/unworker.py --clean --distpath unplatform_distributable -n unplatform_linux64_worker -y

rm -r build
rm *.spec
    
rsync --remove-source-files -vr unplatform_distributable/unplatform_linux64_worker/ unplatform_distributable/unplatform_linux64/
rm -r unplatform_distributable/unplatform_linux64_worker

mv unplatform_distributable/unplatform_linux64/* unplatform_distributable/unplatform_linux64/unplatform/

cp -r -v unplatform_source/common unplatform_distributable/unplatform_linux64/unplatform/
cp -r -v unplatform_source/curriculum unplatform_distributable/unplatform_linux64/unplatform/
cp -r -v unplatform_source/modules unplatform_distributable/unplatform_linux64/unplatform/
cp -r -v unplatform_source/research unplatform_distributable/unplatform_linux64/unplatform/
cp -r -v unplatform_source/unplatform unplatform_distributable/unplatform_linux64/unplatform/

cp unplatform_source/unplatform.cert.dummy.pem unplatform_distributable/unplatform_linux64/unplatform/
cp unplatform_source/unplatform.key.dummy.pem unplatform_distributable/unplatform_linux64/unplatform/

cp unplatform_distributable/launchers/unplatform_linux64_ssl.sh unplatform_distributable/unplatform_linux64

cp unplatform_distributable/qbank/qbank-lite-v0.0.65-ubuntu-ssl unplatform_distributable/unplatform_osx

cp -r -v unplatform_distributable/readme unplatform_distributable/unplatform_linux64/readme
