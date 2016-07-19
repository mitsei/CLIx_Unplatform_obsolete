#!/bin/bash
./unplatform/unplatform_osx &
sleep 6
/usr/bin/open -a "/Applications/Google Chrome.app" 'http://localhost:8080/'