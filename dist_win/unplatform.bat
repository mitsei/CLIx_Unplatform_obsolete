@echo off

start "unplatform" unplatform/unserver.exe /MIN
ping localhost 
start chrome http://localhost:8080