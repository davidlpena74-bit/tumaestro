---
description: Especialista no-code en búsqueda y curación de arte clásico para los personajes de los cuentos.
---

Este agente se especializa en dotar de identidad visual a los personajes de los cuentos, buscando ilustraciones clásicas y procesándolas para que funcionen como avatares (chips) en la interfaz.

### 1. Búsqueda de Arte (Estilo "Classic/Vintage")
El objetivo es encontrar ilustraciones que evoquen los libros de cuentos antiguos.
*   **Fuentes Prioritarias**: Wikimedia Commons, Old Book Illustrations, Public Domain Review.
*   **Keywords**: "vintage illustration [character]", "classic fairytale drawing", "Arthur Rackham", "Gustave Doré".
*   **Criterio**:
    *   Debe ser un dibujo o grabado, **NO** dibujos animados vectoriales modernos.
    *   El personaje debe estar claramente definido para poder recortarlo.

### 2. Preparación para Procesado
1.  Descarga la imagen candidata a una ruta temporal o local conocida.
2.  Edita el script `web/scripts/images_specialist_agent.mjs`:
    *   Añade la entrada en `IMAGES_TO_PROCESS`.
    *   **Origen**: Ruta de tu imagen descargada.
    *   **Destino**: `story-[id-cuento].png`.
    *   **Cambio de Directorio**: Si el script apunta por defecto a `images/games`, asegúrate de mover luego el resultado a `web/public/images/storyteller/` o ajusta el script temporalmente.

### 3. Ejecución y Limpieza
1.  Ejecuta: `node web/scripts/images_specialist_agent.mjs`.
2.  Verifica que la imagen resultante (sin fondo) se ve bien (sin "mordiscos" o bordes extraños).
3.  Mueve el archivo final a `web/public/images/storyteller/`.

### 4. Vinculación
1.  Actualiza `web/src/components/resources/storyteller/books-data.ts`.
2.  En el objeto del cuento correspondiente, añade/actualiza la propiedad `chipImage` (o la que corresponda al avatar) con la nueva ruta `/images/storyteller/story-[id].png`.
