---
description: Creación completa de un nuevo libro para el Cuenta Cuentos (Texto, Imágenes, Voz y Datos) siguiendo el estándar Premium.
---

Este flujo de trabajo coordina la creación de un nuevo cuento asegurando que cumpla con los estándares de diseño "Vintage/Classic" y la lógica de reproducción automática mejorada.

## Estándar de Calidad Premium

### 1. Formato de Texto y Narrativa
- **División**: El texto debe ser literario y detallado. Divide el cuento en **10-12 páginas**.
- **Ritmo**: Cada página debe representar una escena o idea completa para mantener el ritmo de lectura.

### 2. Identidad Visual (Estilo Arthur Rackham Ornato)
Cada nuevo cuento DEBE seguir este estilo visual para mantener la coherencia de la biblioteca:

- **Retrato del Personaje (chipImage)**:
    - **Prompt**: `Portrait of [Character], classic antique storybook illustration style of Arthur Rackham. Inside a highly decorative and ornate circular frame with [Motifs related to the story]. Muted colors, detailed pen and ink line work with watercolor wash, vintage paper texture. Serene expression. High resolution, public domain aesthetic. No text.`
    - **Ubicación**: `web/public/images/storyteller/character-[id].png`

- **Imagen de Portada (coverImage)**:
    - **Prompt**: `Wide landscape scene of [Key Scene], classic antique storybook illustration style of Arthur Rackham and Edmund Dulac. Muted colors, detailed scenery, vintage engraved texture. Ethereal and atmospheric. No text. High resolution.`
    - **Ubicación**: `web/public/images/storyteller/[id]-cover.png`

### 3. Registro y Lógica Técnica
- **Fichero**: `src/components/resources/storyteller/books-data.ts`.
- **Auto-Advance**: No es necesario tocar el código para esto, pero asegúrate de que el objeto `Book` tenga todas las páginas en el array `content`. El componente `StorytellerTool.tsx` gestionará automáticamente el paso de página al terminar el audio (MP3 o Voz Sintetizada).
- **Theme Color**: Elige un gradiente de Tailwind que armonice con la ilustración (ej. `from-amber-600 to-brown-700`).

### 4. Generación de Voz
1. **Script**: Usa el Voice Director para generar los audios si es posible.
   ```bash
   cd web/scripts/voice-director
   node generate_story_audio.mjs
   ```
2. **Fallback**: Si no hay MP3, el sistema usará automáticamente `SpeechSynthesis` con la lógica de robustez mejorada.

## Verificación Final
- La imagen del personaje debe verse completa en el círculo del reproductor.
- El cuento debe avanzar automáticamente a la siguiente página tras el audio.
- El despliegue debe incluir un incremento de versión en `package.json` y el uso del flujo `/deploy`.
