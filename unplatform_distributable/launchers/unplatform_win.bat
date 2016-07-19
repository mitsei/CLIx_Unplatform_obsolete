@echo off

start /MIN "unplatform" unplatform/unplatform_win32.exe
ping localhost 
start chrome http://localhost:8080