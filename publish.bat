@echo off
echo ==========================================
echo       W. Website Auto-Publish Tool
echo ==========================================
echo.
echo [1/3] Detecting changes...
"C:\Program Files\Git\cmd\git.exe" add .
"C:\Program Files\Git\cmd\git.exe" commit -m "Local CMS update"

echo.
echo [2/3] Uploading changes to GitHub...
"C:\Program Files\Git\cmd\git.exe" push origin main

echo.
echo ==========================================
echo   [3/3] Success!
echo   Netlify will update your live site in 60s:
echo   https://parawongling.com/
echo ==========================================
echo.
pause
