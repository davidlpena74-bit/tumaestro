---
description: Procesamiento automático de mapas y rutas SVG.
---
// turbo-all

Este agente automatiza la generación de datos geográficos para los juegos interactivos.

1. **Localización**: Situarse en el directorio `web`.
2. **Ejecución**: Ejecutar todos los generadores de rutas disponibles. `node scripts/map-agent/MapFactory.mjs` (si tiene lógica de ejecución) o procesar los archivos individuales: `Get-ChildItem scripts/map-agent/generate_*.mjs | ForEach-Object { node $_.FullName }`
3. **Validación**: Asegurarse de que los archivos `.ts` resultantes en `src/components/games/data/` se han actualizado.
