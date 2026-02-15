---
description: Creación completa de un nuevo libro para el Cuenta Cuentos (Texto, Imágenes, Voz y Datos) siguiendo el estándar Premium.
---

Este flujo de trabajo coordina la creación de un nuevo cuento asegurando que cumpla con los estándares de diseño "Vintage/Classic" y la lógica de reproducción automática mejorada.

### 0. Verificación Inicial (CRÍTICO)
Antes de comenzar, lee la lista oficial de cuentos en `.agent/resources/storyteller_books_list.md`.
- Si el cuento ya existe en la lista, **DETENTE** e informa al usuario.
- Si no existe, **añade el nuevo ID y Título a la lista** antes de proceder con la generación de código para evitar duplicados futuros.

## Estándar de Calidad Premium

### 1. Formato de Texto y Narrativa
- **Idiomas**: Español (Principal), Inglés, Francés y Alemán (Todos Obligatorios).
- **Estructura**: El reproductor soporta cuatro flujos de contenido: `content` (ES), `contentEn` (EN), `contentFr` (FR) y `contentDe` (DE).
- **Extensión de Texto**: Los cuentos deben tener un **mínimo de 1000 palabras y un máximo de 1200 palabras** para garantizar una experiencia de lectura rica y completa.
- **División y Densidad**: 
    - Divide el cuento en **15-20 páginas** para mantener la riqueza narrativa.
    - **REGLA DE ORO**: Cada página debe tener un **mínimo de 5 líneas y un máximo de 10 líneas** de texto. No satures ni dejes las páginas demasiado vacías.
- **Ritmo**: Cada página debe representar una escena o idea completa para mantener el ritmo de lectura.

### 2. Identidad Visual (Estilo Arthur Rackham Ornato)
Cada nuevo cuento DEBE seguir este estilo visual para mantener la coherencia de la biblioteca:

- **Retrato del Personaje (chipImage)**:
    - **Prompt**: `Portrait of [Character], classic antique storybook illustration style of Arthur Rackham. Inside a highly decorative and ornate circular frame with [Motifs related to the story]. Muted colors, detailed pen and ink line work with watercolor wash, vintage paper texture. Serene expression. High resolution, public domain aesthetic. No text.`
    - **Ubicación**: `web/public/images/storyteller/character-[id].png`

- **Imagen de Portada (coverImage)**:
    - **Prompt**: `Wide landscape scene of [Key Scene], classic antique storybook illustration style of Arthur Rackham and Edmund Dulac. Muted colors, detailed scenery, vintage engraved texture. Ethereal and atmospheric. No text. High resolution.`
    - **Ubicación**: `web/public/images/storyteller/[id]-cover.png`

> 🛑 **POLÍTICA DE GENERACIÓN ÚNICA (STRICT ONE-SHOT)**:
> 1.  Antes de llamar a `generate_image`, **BUSCA SIEMPRE** en la memoria temporal (`C:\Users\david\.gemini\antigravity\brain`) usando `find_by_name`.
> 2.  Si existe una imagen con un nombre similar, **ÚSALA**.
> 3.  Si NO existe, realiza **UN ÚNICO INTENTO**.
> 4.  **PROTOCOLO ANTI-RACE-CONDITION**: Si `generate_image` devuelve error (503/Timeout):
>     a. **ESPERA 10 SEGUNDOS** ejecutando `run_command` con `Start-Sleep -Seconds 10`.
>     b. **VUELVE A BUSCAR** en la memoria temporal. A veces la imagen se guarda milisegundos después del error.
>     c. Si aparece, úsala. Si no, **ABORTA** la imagen. NO reintentes la generación.

### 3. Registro y Lógica Técnica
- **Fichero**: `src/components/resources/storyteller/books-data.ts`.
- **Estructura de Datos**: Define SIEMPRE las propiedades `content` (ES), `contentEn` (EN), `contentFr` (FR) y `contentDe` (DE) con sus respectivas traducciones.
- **Ilustraciones en Páginas**: Si durante la creación generas o encuentras ilustraciones horizontales (Landscape) que coincidan con la escena de una página específica y mantengan el estilo "Arthur Rackham", DEBES incluirlas usando la propiedad `image` en el objeto de esa página. Esto enriquecerá la experiencia visual debajo de los controles.

- **Auto-Advance**: No es necesario tocar el código para esto, pero asegúrate de que el objeto `Book` tenga todas las páginas en el array `content`. El componente `StorytellerTool.tsx` gestionará automáticamente el paso de página al terminar el audio (MP3 o Voz Sintetizada).
- **Theme Color**: Elige un gradiente de Tailwind que armonice con la ilustración (ej. `from-amber-600 to-brown-700`).
- **Rating**: Añade un campo `rating` con un valor numérico (float) entre 4.0 y 5.0 (ej. `4.8`) para simular la valoración de los lectores.

#### Optimización de Legibilidad (Layout Premium)
- El reproductor utiliza una **Consola de Control Inferior** en modo inmersivo. 
- El texto debe estar bien distribuido para evitar el scroll vertical excesivo. 
- **Estilo de Lectura**: El texto ya leído usa `text-slate-900` (negro) y el texto pendiente usa `text-slate-500` (gris medio) en modo normal para garantizar legibilidad sobre el cristal.
- Respeta estrictamente el límite de **5 a 10 líneas** para asegurar que el texto "respire" y no se monte sobre los controles o el botón de "Salir" integrado en la consola.
- La **Consola de Control** en modo inmersivo utiliza alturas uniformes de **44px** para todos sus elementos (Salir, Velocidad, Contador, Idioma, Fuente).
- El botón de **"Salir"** (extremo izquierdo) y la etiqueta **"Velocidad voz"** usan la misma tipografía (`text-xs font-bold`) para mantener la coherencia.
- El **Control de Velocidad** está centrado entre el botón de Salir y el bloque central de reproducción.
- Todos los contenedores usan un diseño de **"pastilla" translúcida** (`bg-white/10`) con bordes redondeados XL.
- Los controles de **Navegación** (Anterior, Play, Siguiente) están agrupados en el centro exacto.

### 4. Generación de Voz
1. **Ejecución**: Usa el Voice Director. El script detectará automáticamente si tienes una key de ElevenLabs para usar voces Ultra-Premium. Si no, usará Edge TTS (Calidad Alta).
   ```bash
   cd web/scripts/voice-director
   node generate_story_audio.mjs
   ```
2. **Fallback Automático**: El script ya incluye lógica de reintento. Si ElevenLabs falla, saltará a Edge TTS automáticamente para esa página.
3. **Idiomas Adicionales**: De momento el sistema usará TTS nativo del navegador para inglés, francés y alemán; no es necesario generar MP3s para estos idiomas.

## Verificación Final
- La imagen del personaje debe verse completa en el círculo del reproductor, superpuesta al contenedor.
- El cuento debe avanzar automáticamente a la siguiente página tras el audio.
- Comprueba que aparecen las **banderas de idioma** (ES, UK, FR, DE) y las **estrellas de valoración** en la tarjeta del libro.
- El selector de idioma debe permitir cambiar entre los 4 idiomas durante la lectura y **verificar que la URL cambia** (`/en`, `/fr`, `/de`) para SEO internacional.
- El despliegue debe incluir un incremento de versión en `package.json` y el uso del flujo `/deploy`.
