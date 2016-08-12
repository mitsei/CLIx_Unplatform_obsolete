@echo off

start /MIN "unplatform" unplatform/unplatform_win32.exe
ping localhost 
start /MIN "unworker" unplatform/unplatform_win32_worker.exe
start chrome https://localhost:8888