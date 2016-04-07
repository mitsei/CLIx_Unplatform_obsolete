#!/bin/bash 
COUNTER=20
until [  $COUNTER -lt 10 ]; do
    
    rm -r unenv
    rm -r build
    rm *.spec
    
    git pull

    pip install -r requirements.txt
    
    pyinstaller unserver.py --clean --distpath ../unplatform-distributable -n unplatform_win32 -y
    
    sleep 1h
done