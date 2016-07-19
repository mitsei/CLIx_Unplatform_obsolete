#!/bin/bash
./unplatform/unplatform_osx &
sleep 6
./unplatform/unplatform_osx_worker &
/usr/bin/open -a "/Applications/Google Chrome.app" 'https://localhost:8888/'