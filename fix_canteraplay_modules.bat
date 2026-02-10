@echo off
echo ==========================================
echo FIXING CANTERAPLAY DEPENDENCIES
echo ==========================================

cd /d "%~dp0"

echo [1/4] Cleaning existing installation...
if exist "node_modules" (
    echo    - Removing node_modules...
    rmdir /s /q "node_modules"
)
if exist ".next" (
    echo    - Removing .next cache...
    rmdir /s /q ".next"
)
if exist "package-lock.json" (
    echo    - Removing package-lock.json...
    del "package-lock.json"
)

echo.
echo [2/4] Installing dependencies...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] npm install failed. Please check your internet connection or permissions.
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo [3/4] Verifying tailwindcss installation...
if exist "node_modules\tailwindcss\package.json" (
    echo    [OK] tailwindcss found in node_modules.
) else (
    echo    [ERROR] tailwindcss NOT found in node_modules! Installation failed.
    pause
    exit /b 1
)

echo.
echo [4/4] Starting development server...
echo.
echo Please allow a moment for Next.js to rebuild the cache.
echo.
call npm run dev
