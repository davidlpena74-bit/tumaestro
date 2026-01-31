---
description: Reinicia el servidor de desarrollo local (Mata procesos node y ejecuta npm run dev)
---

1. Detener todos los procesos de Node.js
// turbo
Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force

2. Iniciar el servidor de desarrollo
// turbo
Set-Location "C:\Users\david\Desktop\Projects-Antigravity\Tu Maestro\web"
npm run dev
