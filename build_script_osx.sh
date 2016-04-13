#!/bin/bash 
COUNTER=20
until [  $COUNTER -lt 10 ]; do

    rm -r build
    rm *.spec
    find . -name "*.pyc" -type f -delete
    find . -name ".DS_Store" -type f -delete
    
    git pull

    pip install -r requirements.txt
    
    pyinstaller unserver.py --clean --distpath ../unplatform-distributable -n unplatform_osx -y
    
    
    echo WAITING
    
    sleep 3600
done
