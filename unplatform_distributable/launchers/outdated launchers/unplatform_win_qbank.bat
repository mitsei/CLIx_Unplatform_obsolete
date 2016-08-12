@echo off

start /MIN "unplatform" unplatform/unserver.exe 
start /MIN "qbank" qbank-lite-dist/main.exe 
ping localhost 
start chrome http://localhost:8080