---
description: Especialista en la búsqueda y extracción de cuentos clásicos de dominio público para el Cuenta Cuentos.
---
# 📚 Story Finder Agent (Dominio Público)

Este flujo de trabajo permite encontrar, limpiar y formatear cuentos extensos de fuentes de dominio público (como Project Gutenberg o Wikisource) para integrarlos directamente en la aplicación.

## 🛠️ Procedimiento de Búsqueda

1. **Identificar Obra**: Buscar títulos clásicos cuyos autores hayan fallecido hace más de 70 años (dominio público).
   - Ejemplos: Hermanos Grimm, Hans Christian Andersen, Oscar Wilde, Esopo, Charles Perrault.

2. **Búsqueda de Texto Completo**: Utilizar `search_web` para encontrar el texto íntegro en español o inglés.
   - Query sugerida: `"obra" "autor" texto completo dominio público español` o `Wikisource "obra"`.

3. **Extracción y Limpieza**:
   - Leer el contenido usando `read_url_content`.
   - Eliminar introducciones editoriales, prefacios modernos o avisos legales del sitio web fuente.
   - Asegurarse de mantener la estructura narrativa original.

4. **Formateo para la App**:
   - El cuento debe dividirse en un array de strings (`content: string[]`).
   - Cada elemento del array representa una "página" o "pantalla" lógica. **NUEVO ESTÁNDAR**: Cada página debe contener entre **5 y 10 líneas** de texto para ajustarse perfectamente al diseño Premium sin necesidad de scroll.

5. **Integración**:
   - Crear un objeto que cumpla con la interfaz `Book` de `books-data.ts`.
   - Generar una descripción atractiva y seleccionar una categoría de edad/nivel.
   - Buscar una imagen de referencia en Unsplash para el `coverImage`.

## 📋 Reglas de Oro
- **Verificar Derechos**: Confirmar que la fuente explicite que el texto es libre.
- **Calidad de Traducción**: Si es traducción al español, priorizar versiones clásicas reconocidas o de alta calidad.
- **Extensión**: El texto seleccionado o adaptado debe tener una extensión de entre **1000 y 1200 palabras**. La división por "páginas" es obligatoria para el efecto karaoke.

// turbo-all
6. **Ejecución Automática**: Una vez encontrado el texto, el agente debe proponer el código listo para insertar en `books-data.ts`.
