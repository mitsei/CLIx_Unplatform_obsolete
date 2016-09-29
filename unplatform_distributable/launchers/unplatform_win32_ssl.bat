@echo off

start /MIN "unplatform" unplatform/unplatform_win32.exe
ping localhost
start /MIN "unworker" unplatform/unplatform_win32_worker.exe

FOR /F "delims=|" %%I IN ('DIR "qbank-lite*.exe" /B /O:N') DO SET NewestQBank=%%I
start /MIN "qbank" "%NewestQBank%"
start chrome https://localhost:8888
