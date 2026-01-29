# Story Narrator Agent 🎙️

Este agente es un script especializado que utiliza Inteligencia Artificial (OpenAI TTS) para convertir textos de cuentos en narraciones de audio de alta calidad, con entonación natural y voz femenina.

## 📋 Requisitos

1.  Node.js instalado.
2.  Una API Key de OpenAI configurada en el archivo `.env.local` en la carpeta `web`.
    ```env
    OPENAI_API_KEY=sk-tu-clave-aqui
    ```
3.  Dependencias instaladas (`npm install openai dotenv` en la carpeta `web`).

## 🚀 Uso

Ejecuta el script desde la carpeta `web`:

```bash
node scripts/story-narrator/narrate.js <archivo_texto> [nombre_salida.mp3] [voz] [velocidad]
```

### Argumentos

1.  **archivo_texto** (Requerido): Ruta al archivo `.txt` que contiene el cuento.
2.  **nombre_salida.mp3** (Opcional): Nombre del archivo resultante. Si no se indica, se genera uno con la fecha. Se guardará autmáticamente en `public/audios/stories`.
3.  **voz** (Opcional): Voz a utilizar.
    *   `nova` (Mujer, dinámica - **Recomendada**)
    *   `shimmer` (Mujer, clara)
    *   `alloy` (Neutra)
4.  **velocidad** (Opcional): Velocidad de lectura (0.25 a 4.0). Por defecto es `0.9` para narración pausada.

## 🌟 Ejemplo

Prueba con el cuento de ejemplo incluido:

```bash
node scripts/story-narrator/narrate.js scripts/story-narrator/ejemplo.txt cuento_luciernaga.mp3 nova 0.9
```

Esto generará `web/public/audios/stories/cuento_luciernaga.mp3`.

## 🛠️ Personalización

Puedes editar `narrate.js` para cambiar el modelo (por ejemplo a `tts-1` estándar para menor coste) o ajustar la lógica de procesamiento de textos largos.
