#!/bin/bash 
COUNTER=20
until [  $COUNTER -lt 10 ]; do
    
    rm -r unenv
    rm -r build
    rm *.spec
    find . -name "*.pyc" -type f -delete
    find . -name ".DS_Store" -type f -delete
    
    git pull

    virtualenv -p python3 unenv
    source unenv/bin/activate
    pip install -r requirements.txt
    
    pyinstaller unserver.py --clean --distpath ../unplatform-distributable -n unplatform_linux64 -y
    
    
    echo COUNTER $COUNTER
    let COUNTER-=1
    sleep 1h
done