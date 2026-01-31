---
description: Creación completa de un nuevo libro para el Cuenta Cuentos (Texto, Imágenes, Voz y Datos).
---

Este flujo de trabajo coordina a varios sub-agentes para crear un cuento desde cero con calidad premium.

## Pasos para crear un nuevo libro

### 1. Preparación del Contenido
- **Entrada**: Título, Autor y Texto completo del cuento.
- **Acción**: El agente debe dividir el texto en páginas lógicas (aprox. 300-600 caracteres por página).

### 2. Generación Visual (Arte)
- **Personaje (Chip)**:
    1. Usar `generate_image` para crear un retrato del protagonista (estilo ilustración de cuento clásico, fondo simple).
    2. Usar el comando de limpieza de fondos para crear el `chipImage`.
- **Portada y Páginas**: 
    1. Usar `generate_image` para crear la `coverImage` (formato 16:9 o 4:3).
    2. (Opcional) Generar ilustraciones específicas para páginas clave.

### 3. Registro de Datos
- **Acción**: Añadir el nuevo objeto `Book` al array `BOOKS` en `src/components/resources/storyteller/books-data.ts`.
- **Formato**: Asegurarse de asignar un `id` único, `themeColor`, `genre`, y las rutas a las imágenes generadas.

### 4. Generación de Voz Premium
- **Acción**: Ejecutar el script de Voice Director para generar los archivos MP3 gratuitos.
    ```bash
    cd web/scripts/voice-director
    node generate_story_audio.mjs
    ```

### 5. Verificación
- Comprobar que el cuento aparece en la biblioteca.
- Verificar el Modo Inmersivo y la calidad del audio.

## Comandos Rápidos
- **/story-create**: Inicia el proceso de creación de un nuevo libro (Pide el texto al usuario).
