# Inicia o Docker
Write-Host "Iniciando Infraestrutura (Docker)..." -ForegroundColor Cyan
docker compose up -d

$baseDir = Get-Location

# Pergunta se quer rodar o backend
$runBackend = Read-Host "Deseja iniciar os serviços backend? (S/N)"
if ($runBackend -eq "S" -or $runBackend -eq "s") {
    Write-Host "Iniciando Ecommerce Service na porta 8080..." -ForegroundColor Green
    Start-Process powershell -ArgumentList "-NoExit", "-Command", ".\mvnw spring-boot:run -pl ecommerce-service" -WorkingDirectory $baseDir
    
    Write-Host "Iniciando Notification Service na porta 8081..." -ForegroundColor Green
    Start-Process powershell -ArgumentList "-NoExit", "-Command", ".\mvnw spring-boot:run -pl notification-service" -WorkingDirectory $baseDir
}

# Pergunta se quer rodar o frontend
$runFrontend = Read-Host "Deseja iniciar o frontend? (S/N)"
if ($runFrontend -eq "S" -or $runFrontend -eq "s") {
    Write-Host "Iniciando Frontend na porta 5173..." -ForegroundColor Yellow
    $frontendDir = Join-Path $baseDir "frontend"
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm run dev" -WorkingDirectory $frontendDir
}

Write-Host "Ambiente pronto!" -ForegroundColor Magenta
