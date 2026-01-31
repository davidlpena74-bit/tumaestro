---
description: Generación automática de narraciones de voz para los cuentos usando OpenAI TTS.
---

Este agente se encarga de dar voz a las historias.
 
 ## Estrategia de Voz (Híbrida)
 El sistema priorizará AUTOMÁTICAMENTE **ElevenLabs** (Voz: Charlotte/Premium) si encuentra una API Key válida. Si no, o si falla, usará **Microsoft Edge TTS** (Voz: ElviraNeural) como respaldo gratuito de alta calidad.

 ## Prerrequisitos
- Clave de API de ElevenLabs en `.env` (`ELEVENLABS_API_KEY`) para calidad premium.
- Archivo de datos de libros en `src/components/resources/storyteller/books-data.ts`.

## Flujo de Trabajo

1.  **Ejecutar Script de Generación**:
    El script leerá los cuentos y generará los audios faltantes en `public/audio/storyteller/[book_id]/`.

    ```bash
    cd web/scripts/voice-director
    node generate_story_audio.mjs
    ```

2.  **Verificar Audios**:
    Comprueba que se han creado los archivos MP3 en la carpeta `web/public/audio/storyteller`.

3.  **Actualizar `books-data.ts` (Opcional)**:
    Si el sistema de reproducción de `StorytellerTool.tsx` requiere rutas explícitas, actualiza el archivo de datos. 
    *Nota: Actualmente el componente puede configurarse para buscar automáticamente `page_N.mp3` si existe, o usar TTS del navegador como fallback.*

    Si necesitas actualizar el componente para que use estos audios:
    - Modifica `StorytellerTool.tsx` para intentar cargar `audio/storyteller/${selectedBook.id}/page_${currentPage}.mp3`.
    - Usa un elemento HTML `<audio>` o la API de Audio en lugar de `SpeechSynthesis` cuando el archivo exista.

## Comandos Rápidos
- **/voice-gen**: Ejecuta el script de generación de audio.
