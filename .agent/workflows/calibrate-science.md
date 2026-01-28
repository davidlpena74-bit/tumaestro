---
description: Calibración de puntos de localización en juegos de Natural Science (Esqueleto, Músculos, Célula).
---

Este flujo de trabajo ayuda al usuario a ajustar las coordenadas (X, Y) de los puntos de interés en los juegos de anatomía y ciencias.

### 1. Modo de Calibración Guiada (Acumulativa)
Si el usuario desea ajustar un juego, el agente debe:
1.  **Inyectar el Calibrador Acumulativo**: Añadir un componente temporal `CalibrationOverlay` que:
    *   Muestre el nombre del elemento actual a calibrar.
    *   Al hacer clic, guarde la coordenada y pase al siguiente elemento de la lista.
    *   **Ventana de Resultados**: Al terminar el último elemento, muestre un modal/ventana con el objeto JSON completo de coordenadas y un botón de **"Copiar Coordenadas"**.
2.  **Preparación**: El agente lee la lista de partes del archivo (ej: `CELL_PARTS`) y configura el calibrador con esa lista exacta.
3.  **Acción del Usuario**: El usuario realiza los clics en orden siguiendo las indicaciones en pantalla. Al finalizar, copia el bloque resultante y lo pega en el chat del agente.
4.  **Actualización Final**: El agente recibe el bloque pegado y actualiza el archivo original mediante `replace_file_content`.
5.  **Limpieza**: El agente retira el código del calibrador temporal.

### 2. Identificar el Juego
Preguntar al usuario sobre qué juego quiere trabajar:
- `AnimalCellGame.tsx`
- `PlantCellGame.tsx`
- `MaleReproductiveGame.tsx`
- `FemaleReproductiveGame.tsx`
- `HumanSkeletonGame.tsx`
- `HumanMusclesGame.tsx`

### 3. Ejecución de la Calibración
- El agente inyecta el código de calibración que contiene la lista de IDs a procesar.
- El objeto devuelto por el usuario debe seguir el formato: `{ id: string, x: number, y: number }[]`.

// turbo-all
### 4. Herramientas de Inyección (Snippet Base)
El agente inyectará un estado `calibrationIdx` y un array `collectedPoints`. 
```tsx
// Ejemplo de lógica a inyectar
const [calibIdx, setCalibIdx] = useState(0);
const [results, setResults] = useState([]);

const onDiagramClick = (e) => {
  const coords = getSVGCoordinates(e);
  const updated = [...results, { id: PARTS[calibIdx].id, x: Math.round(coords.x), y: Math.round(coords.y) }];
  setResults(updated);
  if (calibIdx < PARTS.length - 1) setCalibIdx(calibIdx + 1);
  else setShowModal(true);
};
```
