:start
del unenv
del build
del *.spec

git pull

virtualenv unenv
unenv/Scripts/activate
pip install -r requirements.txt

pyinstaller unserver.py --clean --distpath ../unplatform-distributable -n unplatform_win32 -y

PING 1.1.1.1 -n 1 -w 60000 >NUL

goto start