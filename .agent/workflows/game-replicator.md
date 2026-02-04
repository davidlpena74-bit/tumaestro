---
description: Especialista técnico en replicación y creación de juegos nuevos usando arquitecturas probadas clonadas "Clone & Inject".
---

Este agente está diseñado para escalar el catálogo de juegos duplicando la arquitectura de juegos exitosos, cambiando únicamente los datos y assets. Esto garantiza estabilidad y consistencia visual inmediata sin reinventar la rueda.

### Estrategia de Replicación: "Clone & Inject"

#### 1. Selección del "Template Maestro"
Identifica la mecánica del juego solicitado y selecciona el archivo fuente sagrado que **NO** debes modificar estructuralmente, solo clonar:

*   **Juegos de Anatomía / Partes (Drag & Drop)**:
    *   **Template**: `web/src/components/games/AnimalCellGame.tsx`
    *   **Uso**: Diagramas médicos, partes de células, mapas mudos donde se arrastran nombres.
    *   **Clave**: Mantiene `HandGrabbing`, coordenadas de framer-motion y `GameHUD`.
    *   **Dato Crítico**: El array `REPRODUCTIVE_PARTS` (u otro nombre de constante) define las zonas de éxito.

*   **Juegos de Mapas Interactivos (Click en Región)**:
    *   **Template**: `web/src/components/games/EuropeGame.tsx`
    *   **Uso**: Geografía política, provincias, comunidades.
    *   **Clave**: Usa `SVG` paths puros y `onRegionClick`.
    *   **Dato Crítico**: Requiere un archivo auxiliar de paths (ej: `europe-paths.ts`) generado por `/map-agent`.

*   **Juegos de Capitales / Puntos (Click en Punto)**:
    *   **Template**: `web/src/components/games/EuropeCapitalsGame.tsx`
    *   **Uso**: Localizar ciudades o puntos específicos en un mapa.
    *   **Clave**: Renderiza puntos (`circle` o `div`) sobre coordenadas absolutas `cx, cy` (porcentuales o píxeles).

*   **Juegos de Quiz**:
    *   **Template**: Busca `QuizGame.tsx` o similar en `web/src/components/games/`.
    *   **Uso**: Preguntas y respuestas simples.

#### 2. Proceso de Creación (Paso a Paso)

1.  **Duplicación de Componente**:
    *   Lee el código del *Template Maestro*.
    *   Crea el nuevo archivo `web/src/components/games/[NuevoNombre]Game.tsx`.
    *   Pega el código íntegro del template.
    *   **Refactorización Mínima**: 
        *   Renombra el componente.
        *   Sustituye la imagen de fondo (`src="/images/games/..."`).
        *   Sustituye *únicamente* el array de datos (preguntas, partes, regiones) por los nuevos datos.
        *   **IMPORTANTE**: No toques la lógica de `useEffect`, `handleAnswer`, ni la estructura del `AnimatePresence` o el `ScoreScreen`. ¡La arquitectura funciona, no la rompas!

2.  **Gestión de Assets**:
    *   **Imágenes**: Deben ser PNG transparentes de alta calidad en `web/public/images/games/`. Si necesitas quitar fondo, usa `/images-agent`.
    *   **Paths**: Si es mapa, asegúrate de tener los paths SVG.
    *   **Diseño Visual (Alineación)**: Asegura que el título y la descripción estén alineados a la izquierda con el `GameHUD`.
    *   **Layout Estándar**: Usa siempre `PhysicalGameLayout` para envolver el juego. El contenedor debe ser `max-w-6xl` y el texto debe tener `text-left`.

3.  **Creación de la Página Envolvente**:
    *   Lee `web/src/app/juegos/celula-animal/page.tsx` (Template de Página).
    *   Usa el patrón de separación de componentes: `page.tsx` (Server Component para Metadata) y `[Nombre]Client.tsx` (Client Component para el Layout y Juego).
    *   **Metadata**: Define siempre el objeto `metadata` en el `page.tsx`.

4.  **Registro y Traducciones**:
    *   Añade el título y descripciones en `web/src/lib/translations.ts` (ES y EN).
    *   Registra la entrada del menú en `web/src/components/JuegosClient.tsx`.

#### 3. Normas de Calidad (Checklist)
*   **Alineación**: Título, descripción y GameHUD deben estar alineados a la izquierda (`max-w-6xl mx-auto px-4`).
*   **Imagen**: Fondo transparente de alta calidad.
*   **Colores**: Mantén la paleta de colores del template original.
*   **Imports**: Verifica que todas las rutas de importación (`@/components/...`) sean correctas.

#### 4. Template Maestro de Página (Referencia)
```tsx
// [Nombre]Client.tsx
'use client';
import PhysicalMapGame from '@/components/games/PhysicalMapGame';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { useLanguage } from '@/context/LanguageContext';

export default function GameClient() {
    const { t } = useLanguage();
    return (
        <PhysicalGameLayout
            title={t.gamesPage.gameTitles.tuJuego}
            description={t.gamesPage.gameTitles.tuJuegoDesc}
            colorTheme="emerald"
        >
            <PhysicalMapGame {...props} />
        </PhysicalGameLayout>
    );
}
```
