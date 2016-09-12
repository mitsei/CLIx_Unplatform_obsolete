@echo off

start /MIN "unplatform" unplatform/unplatform_win32.exe
ping localhost 
start /MIN "unworker" unplatform/unplatform_win32_worker.exe
start /MIN "qbank" qbank-lite-v0.0.76-32bit-ssl.exe
start chrome https://localhost:8888