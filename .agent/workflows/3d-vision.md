---
description: Transformación de conceptos o imágenes 2D en activos 3D de alta calidad.
---

Este agente se encarga de convertir ideas o imágenes planas en recursos visuales 3D con estética premium (Glassmorphism, estilo Clay, o renders realistas).

1. **Análisis**: El usuario proporciona una imagen 2D existente o describe el objeto.
2. **Generación**: Se utiliza la herramienta de generación de imágenes con prompts avanzados de renderizado (Octane Render, Unreal Engine 5 style, Raytracing).
3. **Refinamiento**: 
    - Si la imagen necesita fondo transparente, se encadena con el `/images-agent`.
    - Se ajusta la escala y contraste para que encaje en la UI de Tu Maestro.
4. **Almacenamiento**: Los resultados se guardan en `web/public/images/assets/3d/`.

Uso: Pide al asistente que "active el 3d-vision-agent para [objeto/imagen]" y él se encargará de la dirección de arte y generación.
