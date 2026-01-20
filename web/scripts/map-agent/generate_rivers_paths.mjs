
import fs from 'fs';
import { MapFactory } from './MapFactory.mjs';
import { geoMercator, geoPath } from 'd3-geo';

// Load communities to get the shared projection
const communitiesGeoJSON = JSON.parse(fs.readFileSync('public/maps/spain-communities.json', 'utf8'));

// 1. Define Main Projection (same as communities usually, but let's re-define to be sure we match)
// We want to overlay rivers on the EXACT same map. 
// Ideally we should export the projection logic, but here we will replicate it.
// From `generate_communities_paths.mjs`:
// mainlandFeatures = features != 'Canarias'
const mainlandFeatures = communitiesGeoJSON.features.filter(f => f.properties.name !== 'Canarias');
const projectionMain = geoMercator()
    .fitExtent([[50, 20], [680, 600]], { type: "FeatureCollection", features: mainlandFeatures });

const pathMain = geoPath().projection(projectionMain);

// NOTE: Canarias rivers are not in this list, but if we added them we would need the canary projection.
// For now, only peninsular rivers + baleares (none major).

// 2. Define River LineStrings
const RIVERS_DATA = {
    'Miño': [
        [-7.28, 43.21], // Source
        [-7.60, 43.00],
        [-7.90, 42.40],
        [-8.20, 42.10],
        [-8.87, 41.86]  // Mouth
    ],
    'Duero': [
        [-2.88, 42.01], // Source (Soria)
        [-3.60, 41.70],
        [-4.72, 41.65], // Valladolid
        [-5.75, 41.50], // Zamora
        [-6.80, 41.30], // Border approx
        [-8.67, 41.14]  // Mouth (Porto) -> We clip visual if needed but let's draw it all
    ],
    'Tajo': [
        [-1.69, 40.32], // Source
        [-2.5, 40.5],
        [-3.5, 40.1],
        [-4.02, 39.86], // Toledo
        [-6.6, 39.7],   // Alcantara
        [-9.17, 38.69]  // Mouth (Lisbon)
    ],
    'Guadiana': [
        [-3.72, 39.12], // Source
        [-4.5, 39.0],
        [-5.9, 38.95],
        [-6.97, 38.88], // Badajoz
        [-7.5, 38.2],   // South turn
        [-7.39, 37.17]  // Mouth
    ],
    'Guadalquivir': [
        [-2.97, 37.84], // Source
        [-3.5, 38.0],
        [-4.78, 37.88], // Cordoba
        [-6.00, 37.38], // Sevilla
        [-6.35, 36.78]  // Mouth
    ],
    'Ebro': [
        [-4.40, 43.04], // Source (Cantabria)
        [-3.5, 42.8],
        [-2.46, 42.46], // Logroño
        [-1.2, 41.9],
        [-0.88, 41.65], // Zaragoza
        [0.5, 41.0],
        [0.86, 40.72]   // Mouth
    ],
    'Júcar': [
        [-1.84, 40.40], // Source
        [-2.13, 40.07], // Cuenca
        [-1.5, 39.5],
        [-1.11, 39.22],
        [-0.23, 39.15]  // Mouth
    ],
    'Segura': [
        [-2.67, 38.07], // Source
        [-2.0, 38.2],
        [-1.13, 37.99], // Murcia
        [-0.63, 38.10]  // Mouth
    ]
};

// 3. Generate Paths
let output = "export const RIVERS_PATHS: Record<string, string> = {\n";

Object.entries(RIVERS_DATA).forEach(([name, coords]) => {
    const geojsonFeature = {
        type: "Feature",
        geometry: {
            type: "LineString",
            coordinates: coords // D3 uses [lon, lat] defaults
        },
        properties: { name }
    };

    const d = pathMain(geojsonFeature);
    if (d) {
        output += `    "${name}": "${d}",\n`;
    }
});

output += "};\n";

fs.writeFileSync('src/components/games/data/rivers-paths.ts', output);
console.log("Rivers paths generated!");
