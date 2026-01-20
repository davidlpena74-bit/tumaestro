# Map Agent

Este directorio contiene herramientas para generar "librerías" de mapas (rutas SVG o datos GeoJSON optimizados) para los juegos interactivos de la aplicación.

## Uso del MapFactory

La clase `MapFactory` (`MapFactory.mjs`) permite:
1.  Cargar datos geográficos (TopoJSON o GeoJSON).
2.  Filtrar regiones específicas (por ejemplo, filtrar solo países de Europa).
3.  Proyectar el mapa a unas dimensiones fijas (dando como resultado strings `d` de SVG listos para renderizar).
4.  Exportar a archivos TypeScript para importar directamente en componentes React.

## Ejemplo: Generar Mapa de Europa

Para generar un nuevo mapa de Europa basado en el archivo `world-countries-50m.json`:

```bash
node scripts/map-agent/generate_europa_paths.mjs
```

## Crear un nuevo Generador

Crea un archivo `.mjs` (por ejemplo `generate_asia.mjs`) e importa el Factory:

```javascript
import { MapFactory } from './MapFactory.mjs';
import * as d3 from 'd3-geo'; // Importado implícitamente en el factory pero útil para proyecciones

const factory = new MapFactory();

factory
    .loadTopoJSON('public/maps/world-countries-50m.json', 'countries')
    .filter(f => {
        // Tu lógica de filtrado aquí
        // Ejemplo: return CONTINENT_MAP[f.properties.name] === 'Asia';
        return ['China', 'Japan', 'India'].includes(f.properties.name);
    })
    .setProjection((collection, d3) => {
        // Configura la proyección D3
        return d3.geoMercator()
            .fitExtent([[10, 10], [790, 590]], collection);
    });

const paths = factory.generateSVGPaths('name');
factory.saveTypeScript('src/components/games/data/asia-paths.ts', 'ASIA_PATHS', paths);
```
