---
description: Despliegue automático a producción (git add, commit, push) sin solicitar confirmación.
---

Este workflow automatiza el ciclo de despliegue.

// turbo-all
1. Ejecuta `git add .` para añadir todos los cambios.
2. Genera un mensaje de commit descriptivo basado en los últimos cambios realizados si el usuario no proporciona uno específico.
3. Ejecuta `git commit -m "MENSAJE_DEL_COMMIT"`.
4. Ejecuta `git push origin main`.
5. Confirma al usuario que el despliegue se ha realizado.
