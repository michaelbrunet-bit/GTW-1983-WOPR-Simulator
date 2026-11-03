@echo off
title GTW: 1983 W.O.P.R. Simulator — NORAD War Room
cd /d "%~dp0"
if exist "%~dp0GTW_WOPR.exe" (
    start "" "%~dp0GTW_WOPR.exe"
) else (
    start "" "%~dp0index.html"
)
