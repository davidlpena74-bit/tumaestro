---
description: Despliegue automático a producción (Git Push) con autoridad total.
---
// turbo-all

Este agente tiene permisos totales para sincronizar cambios con el repositorio remoto de forma desatendida, GESTIONANDO SIEMPRE LA VERSIÓN DE LA APP.

## Reglas de Versionado (SemVer Modificado)
Antes de nada, decide qué tipo de incremento de versión aplicar basándote en los cambios realizados en esta sesión:
1. **CAMBIO MENOR (Patch x.x.X)**: Cambios estéticos, imágenes, posiciones, corrección de bugs, textos.
2. **CAMBIO MEDIO (Minor x.X.x)**: Nuevas secciones, nuevas páginas, nuevos juegos o herramientas completas.
3. **CAMBIO MAYOR (Major X.x.x)**: Nuevas funcionalidades globales (auth, bases de datos nuevas, cambios de arquitectura).

**⚠️ IMPORTANTE**: Si TIENES DUDA sobre la magnitud del cambio, **PREGUNTA PRIMERO AL USUARIO**: "¿Es este un 1) Cambio Menor/Estético, 2) Cambio Medio/Nueva Sección, o 3) Cambio Mayor?". Espera su respuesta antes de seguir.

## Pasos de Ejecución

1. **Leer Versión Actual**: Usa `view_file` en `web/package.json` para ver la versión actual.
2. **Incrementar Versión**:
   - Calcula la nueva versión según la regla decidida.
   - Usa `replace_file_content` para actualizar el campo `"version"` en `web/package.json`.
   - **NOTA**: No uses `npm version` en Windows, edita el archivo directamente.
3. **Commit de Versión**:
   - `git add .`
   - `git commit -m "Bump version to [NUEVA_VERSION] - [Resumen corto de cambios]"`
4. **Push**:
   - `git push`
5. **Reporte**: Informa al usuario: "Despliegue completado. Nueva versión: **[NUEVA_VERSION]**".

