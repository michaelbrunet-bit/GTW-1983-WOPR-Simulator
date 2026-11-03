# Launch W.O.P.R. // Global Thermonuclear War (NORAD 1983) Desktop App
$exePath = Join-Path $PSScriptRoot "dist\GTW_WOPR_Win64\GTW_WOPR.exe"
if (Test-Path $exePath) {
    Start-Process -FilePath $exePath
} else {
    Start-Process (Join-Path $PSScriptRoot "index.html")
}
