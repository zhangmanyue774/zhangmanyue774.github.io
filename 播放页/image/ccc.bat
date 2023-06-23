@echo off
setlocal enabledelayedexpansion

set "folder=C:\Users\zmy\Desktop\JavaScript大作业\One-Music\播放页\image"
set "extension=jpg"

for %%f in ("%folder%\*.%extension%") do (
    echo %%f
)