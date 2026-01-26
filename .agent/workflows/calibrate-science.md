---
description: Calibración de puntos de localización en juegos de Natural Science (Esqueleto, Músculos, Célula).
---

Este flujo de trabajo ayuda al usuario a ajustar las coordenadas (X, Y) de los puntos de interés en los juegos de anatomía y ciencias.

### Pasos a seguir:

1. **Activar Modo Depuración (Opcional)**:
   - Si el usuario lo pide, el agente añadirá un visor de coordenadas temporal al juego para que el usuario pueda identificar la posición exacta haciendo clic en el diagrama.

2. **Identificar el Juego**:
   - Preguntar al usuario sobre qué juego quiere trabajar:
     - `HumanSkeletonGame.tsx` (Esqueleto)
     - `HumanMusclesGame.tsx` (Músculos)
     - `AnimalCellGame.tsx` (Célula Animal)

3. **Recibir Coordenadas**:
   - El usuario proporcionará una lista de puntos con sus nuevas coordenadas. Ejemplo:
     - "Mueve el cráneo a x=420, y=150"
     - "El fémur está en 380, 600"

4. **Actualizar el Código**:
   - El agente buscará la constante correspondiente (`BONE_PARTS`, `MUSCLE_PARTS` o `CELL_PARTS`) y actualizará los valores.

5. **Verificar y Desplegar**:
   - Tras el cambio, se notificará al usuario para que verifique en su entorno local.
   - Si el usuario da el visto bueno, se procederá al despliegue mediante `/deploy`.

// turbo-all
6. **Ejemplo de comando de actualización**:
   - El agente usará `replace_file_content` o `multi_replace_file_content` para realizar la calibración de forma precisa.
