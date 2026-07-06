@echo off
chcp 65001 > nul
echo ==========================================
echo       W. 官方網站自動發佈工具
echo ==========================================
echo.
echo 正在偵測你剛剛修改或新增的網頁內容...
"C:\Program Files\Git\cmd\git.exe" add .
"C:\Program Files\Git\cmd\git.exe" commit -m "本機後台自動發佈的內容更新" > nul 2>&1
echo 正在將更新上傳至 GitHub...
"C:\Program Files\Git\cmd\git.exe" push origin main
echo.
echo ==========================================
echo   發佈成功！
echo   Vercel 將在 60 秒內自動更新你的線上網站：
echo   https://parawongling.vercel.app/
echo ==========================================
echo.
pause
