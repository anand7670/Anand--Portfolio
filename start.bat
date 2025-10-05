@echo off
echo Starting Anand's Portfolio Application...
echo.

echo Installing dependencies...
call npm run install-all

echo.
echo Starting development servers...
echo Frontend will be available at: http://localhost:3000
echo Backend API will be available at: http://localhost:5000
echo Admin panel will be available at: http://localhost:3000/admin
echo.
echo Default admin credentials:
echo Email: admin@anandyadav.com
echo Password: admin123
echo.

call npm run dev