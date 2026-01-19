import fs from 'fs';
import { geoMercator, geoPath } from 'd3-geo';

// Read GeoJSON
const geojson = JSON.parse(fs.readFileSync('public/maps/spain-communities.json', 'utf8'));

// 1. Separate Features
const canariasFeature = geojson.features.find(f => f.properties.name === 'Canarias');
const mainlandFeatures = geojson.features.filter(f => f.properties.name !== 'Canarias');
const mainlandCollection = { type: "FeatureCollection", features: mainlandFeatures };

// 2. Main Projection (Peninsula + Baleares + Ceuta + Melilla)
// Target: Center and fill most of the SVG, leaving space bottom-left
const projectionMain = geoMercator()
    .fitExtent([[50, 20], [680, 600]], mainlandCollection);

const pathMain = geoPath().projection(projectionMain);

// 3. Canary Projection (Inset)
// Target: Bottom Left Box (x: 20-250, y: 500-680) - Ajustado para que sea grande y visible
const projectionCanary = geoMercator()
    .fitExtent([[50, 480], [280, 650]], canariasFeature);

const pathCanary = geoPath().projection(projectionCanary);

const mapping = {
    'Castilla-Leon': 'castillaleon',
    'Cataluña': 'cataluna',
    'Ceuta': 'ceuta',
    'Murcia': 'murcia',
    'La Rioja': 'larioja',
    'Baleares': 'baleares',
    'Canarias': 'canarias',
    'Cantabria': 'cantabria',
    'Andalucia': 'andalucia',
    'Asturias': 'asturias',
    'Valencia': 'valencia',
    'Melilla': 'melilla',
    'Navarra': 'navarra',
    'Galicia': 'galicia',
    'Aragon': 'aragon',
    'Madrid': 'madrid',
    'Extremadura': 'extremadura',
    'Castilla-La Mancha': 'castillalamancha',
    'Pais Vasco': 'paisvasco'
};

let output = "export const SPANISH_COMMUNITIES_PATHS: Record<string, string[]> = {\n";

geojson.features.forEach(f => {
    const rawName = f.properties.name;
    const id = mapping[rawName];
    if (id) {
        let d;
        if (rawName === 'Canarias') {
            d = pathCanary(f);
        } else {
            d = pathMain(f);
        }

        // Optimize: remove extensive whitespace
        if (d) output += `    "${id}": [\`${d}\`],\n`;
    }
});

output += "};\n";

fs.writeFileSync('src/components/games/spanish-communities-paths.ts', output);
console.log("SVG Paths Generated Successfully with Custom Projection");
