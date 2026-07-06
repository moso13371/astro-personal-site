@echo off
chcp 65001 > nul
echo ==========================================
echo       W. 啟動本機網站與後台測試
echo ==========================================
echo.
echo 正在啟動伺服器，請勿關閉此視窗...
echo 啟動完成後，你可以打開瀏覽器存取以下網址：
echo.
echo 🔹 網站前台：http://127.0.0.1:4321/
echo 🔹 後台管理：http://127.0.0.1:4321/keystatic
echo.
echo ==========================================
cd C:\Users\admin\.gemini\antigravity\scratch\astro-personal-site
npm run dev
