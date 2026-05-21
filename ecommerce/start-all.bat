@echo off
SETLOCAL
CHCP 65001 > nul

echo.
echo  ===========================================================
echo   🚀 INICIANDO ECOSSISTEMA E-COMMERCE (MODO RÁPIDO)
echo  ===========================================================
echo.

:: 1. Docker
echo [1/4] Verificando Infraestrutura (Docker)...
docker-compose up -d
if %ERRORLEVEL% NEQ 0 (
    echo [ERRO] Certifique-se de que o Docker Desktop está rodando!
    pause
    exit /b %ERRORLEVEL%
)

:: 2. Backend - Ecommerce Service
echo [2/4] Iniciando Ecommerce Service (Porta 8080)...
start "Backend: Ecommerce Service" powershell -NoExit -Command ".\mvnw.cmd spring-boot:run -pl ecommerce-service"

:: 3. Backend - Notification Service
echo [3/4] Iniciando Notification Service (Porta 8081)...
start "Backend: Notification Service" powershell -NoExit -Command ".\mvnw.cmd spring-boot:run -pl notification-service"

:: 4. Frontend
echo [4/4] Iniciando Frontend (Vite)...
cd frontend
start "Frontend: Vite" powershell -NoExit -Command "npm run dev"

echo.
echo  ===========================================================
echo   ✅ TUDO PRONTO!
echo.
echo   - Backend Principal: http://localhost:8080/swagger-ui.html
echo   - Frontend:         http://localhost:5173
echo.
echo   As janelas do PowerShell foram abertas para você
echo   acompanhar os logs de cada serviço.
echo  ===========================================================
echo.

pause