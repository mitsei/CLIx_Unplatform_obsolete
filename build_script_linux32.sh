#!/bin/bash 
COUNTER=20
until [  $COUNTER -lt 10 ]; do

    rm -r unenv
    rm -r build
    rm *.spec
    
    git pull

    virtualevn -p python3 unenv
    source unenv/bin/activate
    pip install -r requirements.txt
    
    mv unenv/lib/python3.4/site-packages/PyInstaller/bootloader/Linux-32bit Linux-32bit-arm
    
    pyinstaller unserver.py --clean --distpath ../unplatform_distributable -n unplatform_linux64 -y
    
    
    echo COUNTER $COUNTER
    let COUNTER-=1
    sleep 10m
done