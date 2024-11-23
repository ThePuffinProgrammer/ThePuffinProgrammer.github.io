// src.load.{init.c} \\ 
@echo off
cls
echo =======================================
echo          2dpt Installation
echo =======================================
echo.
echo Are you sure you want to install the game?
echo.
echo Press Y to install or N to cancel.
echo.
echo DEBUG: mode: on  
echo DEBUG: init::load::{init.c#}::execute{init.c#}::end
echo DEBUG: failed to load {init.c#} will only install game.html.
:CHOICE
choice /C YN /M "Do you want to proceed with the installation?"
if errorlevel 2 goto CANCEL
if errorlevel 1 goto INSTALL

:INSTALL
echo DEBUG: checking for new versions...
echo DEBUG: none found. downloading...
echo Downloading 2dpt.html...
powershell -Command "Invoke-WebRequest -Uri 'https://thepuffinprogrammer.github.io/2dpt.html' -OutFile '2dpt.html'"
echo Downloading 2dpt assets... 
powershell -Command "Invoke-WebRequest -Uri 'https://thepuffinprogrammer.github.io/RUN(2).ico' -OutFile '2dpt_assets-integrated_edition.zip'"
if %errorlevel% neq 0 (
    echo Download failed! Please check the URL or your connection.
    goto END
)
echo Download completed successfully.
:: Proceed with installation commands after downloading the game

goto END

:CANCEL
echo Installation cancelled.
goto END

:END
echo.
pause
