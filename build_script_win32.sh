#!/bin/bash 
COUNTER=20
until [  $COUNTER -lt 10 ]; do
    
    rm -r unenv
    rm -r build
    rm *.spec
    find . -name "*.pyc" -type f -delete
    
    git pull

    pip install -r requirements.txt
    
    pyinstaller unserver.py --clean --distpath ../unplatform-distributable -n unplatform_osx -y
    
    sleep 1h
done