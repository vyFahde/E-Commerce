# Comandos para Iniciar o Projeto

Este arquivo contém os comandos necessários para rodar o ecossistema completo.

## 1. Infraestrutura (Docker)
Certifique-se de que o Docker Desktop está rodando.
```powershell
docker compose up -d
```

## 2. Backend (Serviços Spring Boot)

### Ecommerce Service (Porta 8080)
```powershell
cd ecommerce-service
../mvnw spring-boot:run
```

### Notification Service (Porta 8081)
```powershell
cd notification-service
../mvnw spring-boot:run
```

## 3. Frontend (Vite + React)
```powershell
cd frontend
npm run dev
```

---
*Configurado por Gemini CLI para continuar o trabalho de João.*
