---
description: Despliegue automático a producción (Git Push) con autoridad total.
---
// turbo-all

Este agente tiene permisos totales para sincronizar cambios con el repositorio remoto de forma desatendida.

1. **Añadir cambios**: `git add .`
2. **Generar Commit**: Crear un mensaje de commit que resuma los cambios técnicos realizados (ej: "Actualización de assets de juegos y rutas de mapas"). No solicitar confirmación del mensaje. `git commit -m "Automated update: [summary of work]"`
3. **Sincronizar**: `git push`
4. **Verificación**: Confirmar al usuario que el despliegue se ha completado correctamente en la nube.

