#!/bin/bash 
COUNTER=20
until [  $COUNTER -lt 10 ]; do
    
    rm -r unenv
    rm -r build
    rm *.spec
    find . -name "*.pyc" -type f -delete
    find . -name ".DS_Store" -type f -delete

    git pull

    pip install -r requirements.txt
    
    pyinstaller unproxy.py --clean --distpath ../unplatform-distributable -n unplatform_win32 -y

    echo WAITING

    sleep 1h
done
