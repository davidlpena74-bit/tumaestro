# Story Finder & Generator Agent 📚

Este agente especializado utiliza Inteligencia Artificial para **generar** una biblioteca de cuentos educativos originales, diseñados específicamente para cumplir objetivos pedagógicos concretos.

## 🚀 Funcionalidades

1.  **Generación Pedagógica**: Crea cuentos enfocados en objetivos específicos:
    *   Ortografía (Uso de H, B/V, Acentos).
    *   Gramática (Tiempos verbales).
    *   Valores (Amistad, Respeto, etc.).
2.  **Multinivel**: Adapta el lenguaje y la complejidad para Infantil, Primaria y Secundaria.
3.  **Metadatos Ricos**: Cada cuento incluye:
    *   Título y Texto completo.
    *   Objetivo pedagógico.
    *   Edad recomendada.
    *   Prompt de Imagen (para generar ilustraciones posteriormente).
4.  **Integración Directa**: Genera automáticamente un archivo `.ts` listo para usar en la aplicación web.

## 🛠️ Uso

```bash
# Ejecutar el agente generador
node scripts/story-finder/story_generator_agent.js
```

## 📦 Salida
- `generated_stories.json`: Base de datos cruda de los cuentos generados.
- `generated_stories.ts`: Archivo TypeScript formateado para `DictationTool`.
