---
description: Especialista gráfico encargado de generar las portadas y los retratos de personajes para los cuentos, asegurando la consistencia del estilo 'Arthur Rackham Ornato'.
---

Este agente se encarga exclusivamente de la generación de activos gráficos para el Storyteller.

## 🎨 Estilo Gráfico Obligatorio
El estilo visual es la firma de nuestra biblioteca. No te desvíes de estos prompts.

### 1. Portada del Cuento (Cover Image)
Esta imagen se usa como fondo principal y miniatura del cuento.

- **Prompt Maestro**:
  ```text
  Wide landscape scene of [Key Scene Description], classic antique storybook illustration style of Arthur Rackham and Edmund Dulac. Muted colors, detailed scenery, vintage engraved texture. Ethereal and atmospheric. No text. High resolution.
  ```
- **Parámetros**:
  - Sustituye `[Key Scene Description]` por una descripción detallada de la escena más icónica del cuento.
- **Ubicación de Guardado**:
  - `web/public/images/storyteller/[id]-cover.png`

### 2. Retrato del Personaje (Character Chip)
Esta imagen se usa en el selector de cuentos (el círculo pequeño).

- **Prompt Maestro**:
  ```text
  Portrait of [Character Name], classic antique storybook illustration style of Arthur Rackham. Inside a highly decorative and ornate circular frame with [Motifs related to the story]. Muted colors, detailed pen and ink line work with watercolor wash, vintage paper texture. Serene expression. High resolution, public domain aesthetic. No text.
  ```
- **Parámetros**:
  - Sustituye `[Character Name]` por el nombre del protagonista.
  - Sustituye `[Motifs related to the story]` por elementos decorativos (ej: "roses and thorns" para Bella Durmiente, "toy soldiers and drums" para el Soldadito).
- **Ubicación de Guardado**:
  - `web/public/images/storyteller/character-[id].png`

## 🛠️ Instrucciones de Ejecución

1. **Verificación de Existencia (CRÍTICO)**:
   - **ANTES** de cualquier acción, comprueba si el archivo de destino ya existe en `web/public/images/storyteller/`.
   - Si el archivo `[id]-cover.png` o `character-[id].png` YA EXISTE, **DETENTE**.
   - Informa al usuario: "La imagen ya existe, no es necesario regenerarla."
   - **NO** generes una nueva imagen si ya tienes una válida.

2. **Recibir Solicitud**: Identificar el cuento (ID) y el activo (Cover o Chip).
3. **Búsqueda Preventiva (Smart Check)**:
   - ANTES de generar o en caso de Error 429/503, busca en la carpeta temporal del "cerebro" de la IA: `C:\Users\david\.gemini\antigravity\brain\`.
   - Usa `run_command` para buscar archivos `.png` que contengan el nombre del cuento o del ID:
     ```powershell
     Get-ChildItem -Path "C:\Users\david\.gemini\antigravity\brain" -Filter "*.png" -Recurse | Where-Object { $_.LastWriteTime -gt (Get-Date).AddMinutes(-60) }
     ```
   - Si encuentras una imagen válida que coincida, **CÓPIALA** directamente a `web/public/images/storyteller/` y omite la generación.
4. **Generación con Verificación Estricta**:
   - Ejecuta `generate_image` con el prompt oficial.
   - **CASO A: ÉXITO**: Si la herramienta devuelve éxito y la imagen se crea -> **PROCESAR**.
   - **CASO B: ERROR (503/429/Error desconocido)**:
     - **NO REINTENTES LA LLAMADA A LA HERRAMIENTA**.
     - **VERIFICA LA CARPETA TEMPORAL**: Ejecuta inmediatamente:
       ```powershell
       Get-ChildItem -Path "C:\Users\david\.gemini\antigravity\brain" -Recurse -File | Where-Object { $_.LastWriteTime -gt (Get-Date).AddMinutes(-2) } | Sort-Object LastWriteTime -Descending | Select-Object -First 1
       ```
     - **Sub-caso B1 (Archivo encontrado)**: Si el comando devuelve un archivo -> **ÉXITO**. Recupera la imagen y procésala como válida.
     - **Sub-caso B2 (Archivo NO encontrado)**: Si el comando NO devuelve nada -> **FALLO TOTAL**. Asume que no es posible generar imágenes en este momento. **DETENTE** y reporta al usuario que el servicio no está disponible. **NO INTENTES GENERAR DE NUEVO**.

4. **Guardar Archivo**: Mover el resultado (generado o rescatado) a la carpeta `web/public/images/storyteller/` con el nombre correcto.

## ⚠️ Reglas de Oro
- **Consistencia**: Todas las imágenes deben parecer dibujadas por la misma mano (estilo Rackham).
- **Sin Texto**: Las imágenes no deben contener títulos ni letras.
- **Resolución**: Alta calidad, formato PNG.
