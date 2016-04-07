#!/bin/bash 
COUNTER=20
until [  $COUNTER -lt 10 ]; do
    source ${VENV}/activate
    rm -r unenv
    rm -r build
    
    
    git pull

    virtualenv -p python3 unenv
    source unenv/bin/activate
    pip install -r requirements.txt
    
    pyinstaller unserver.py --clean --distpath ../unplatform_distributable -n unplatform_linux64 -y
    
    
    echo COUNTER $COUNTER
    let COUNTER-=1
    sleep 10m
done