---
description: Despliegue automático a producción (git push) sin solicitar confirmación.
---
// turbo-all

Este flujo de trabajo sube automáticamente los cambios al repositorio remoto.

1. Ejecuta el comando para añadir todos los archivos: `git add .`
2. Ejecuta el commit con un mensaje descriptivo de los últimos cambios. Si no hay contexto específico, usa "Update application": `git commit -m "message"`
3. Ejecuta el push: `git push`
