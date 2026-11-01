@echo off
setlocal
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Install Node.js 22.12 or newer from https://nodejs.org/ first.
  pause
  exit /b 1
)
where npm >nul 2>nul
if errorlevel 1 (
  echo npm was not found. Reinstall Node.js with npm and reopen this window.
  pause
  exit /b 1
)
if not exist "node_modules\vite\package.json" (
  echo Installing React project dependencies...
  call npm.cmd ci
  if errorlevel 1 (
    echo Installation failed. Check the output above.
    pause
    exit /b 1
  )
)
echo Starting MAK React. Open the Local URL printed below.
echo Keep this window open. Press Ctrl+C to stop.
call npm.cmd run dev
pause
