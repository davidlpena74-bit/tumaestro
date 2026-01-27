---
description: Especialista en la creación de nuevos juegos de ciencias basados en el modelo premium de la Célula Animal.
---

Este workflow automatiza la creación de juegos de "puntos y etiquetas" (drag & drop) asegurando que el diseño premium, la estructura de página y la lógica de juego se mantengan idénticas a los estándares establecidos.

### 1. Preparación de Assets
*   **Imagen**: Debe ser una imagen transparente (PNG) en alta calidad. Si no lo es, usa el `/images-agent` para procesarla.
*   **Ruta**: Guarda la imagen final en `web/public/images/games/[nombre-del-juego].png`.

### 2. Creación del Componente (Lógica y UI)
Usa `web/src/components/games/AnimalCellGame.tsx` como **Template Absoluto**.
*   **Clonación**: Crea `web/src/components/games/[GameName]Game.tsx`.
*   **Componentes a mantener**: `GameHUD`, `HandGrabbing`, `Trophy`, `AnimatePresence`.
*   **Estructura Crítica**:
    1.  `REPRODUCTIVE_PARTS` (u objeto equivalente): Define los IDs y coordenadas iniciales.
    2.  `img` fuera del `svg`: El modelo exitoso usa un `div` absoluto con la imagen y el `svg` encima con `viewBox="-200 0 1200 1000"`.
    3.  **Splash Screen**: Debe usar el mismo overlay oscuro con desenfoque de fondo.
    4.  **Resultados**: Debe mostrar el desglose de "Tiempo" y "Errores".

### 3. Creación de la Página (Layout)
Usa `web/src/app/juegos/celula-animal/page.tsx` como **Template de Layout**.
*   **Título**: El `h1` debe ir fuera del componente de juego, con clase `text-slate-800` (para legibilidad en fondos claros si aplica) y un emoji temático.
*   **Descripción**: Añade un párrafo `<p>` descriptivo antes del juego con clase `text-slate-700`.
*   **Botón Volver**: Usa el `Link` estilo burbuja con el icono de `ArrowLeft`.

### 4. Integración de Datos
*   **Traducciones**: Añade las claves en `web/src/lib/translations.ts` dentro de `es.gamesPage.gameTitles` y un nuevo objeto para las partes del órgano/diagrama. Repite para `en`.
*   **Registro**: Añade el objeto del juego en `web/src/components/JuegosClient.tsx` dentro de la categoría y subsección correspondiente.
*   **Consistencia de Color**: Al crear la tarjeta de acceso en `JuegosClient.tsx`, el campo `color` (ej: `from-blue-500 to-cyan-600`) debe ser **idéntico** al del juego que se está tomando como referencia inicial (ej: Célula Animal), a menos que se trate de un subgrupo temático diferente (como el rosa/púrpura para el aparato reproductor femenino).

### 5. Calibración
Una vez creado el juego:
1. Abre el juego en el navegador.
2. Usa el modo de inspección o activa temporalmente un log de coordenadas en el `onClick` del SVG.
3. Ajusta el array de partes en el componente con las coordenadas `x, y` definitivas.
