
import fs from 'fs';
import { geoMercator, geoPath } from 'd3-geo';

// Load communities to get the shared projection
const communitiesGeoJSON = JSON.parse(fs.readFileSync('public/maps/spain-communities.json', 'utf8'));

const mainlandFeatures = communitiesGeoJSON.features.filter(f => f.properties.name !== 'Canarias');
const projectionMain = geoMercator()
    .fitExtent([[50, 20], [680, 600]], { type: "FeatureCollection", features: mainlandFeatures });

const pathMain = geoPath().projection(projectionMain);

/**
 * Adds realistic meandering to a segment between two points.
 * @param {Array} p1 [lon, lat]
 * @param {Array} p2 [lon, lat]
 * @param {number} depth Recursion depth
 * @param {number} intensity Scale of the random displacement
 */
function addMeandering(p1, p2, depth = 3, intensity = 0.05) {
    if (depth === 0) return [p2];

    const mid = [
        (p1[0] + p2[0]) / 2,
        (p1[1] + p2[1]) / 2
    ];

    // Calculate perpendicular vector
    const dx = p2[0] - p1[0];
    const dy = p2[1] - p1[1];
    const length = Math.sqrt(dx * dx + dy * dy);

    if (length < 0.01) return [p2];

    // Perpendicular unit vector
    const nx = -dy / length;
    const ny = dx / length;

    // Displacement
    const displacement = (Math.random() - 0.5) * intensity * length;
    mid[0] += nx * displacement;
    mid[1] += ny * displacement;

    return [
        ...addMeandering(p1, mid, depth - 1, intensity),
        ...addMeandering(mid, p2, depth - 1, intensity)
    ];
}

function processRiver(coords) {
    let newCoords = [coords[0]];
    for (let i = 0; i < coords.length - 1; i++) {
        const meanderPoints = addMeandering(coords[i], coords[i + 1], 3, 0.4);
        newCoords = newCoords.concat(meanderPoints);
    }
    return newCoords;
}

const RIVERS_DATA = {
    'Miño': [
        [-7.28, 43.21], [-7.60, 43.00], [-7.90, 42.40], [-8.20, 42.10], [-8.87, 41.86]
    ],
    'Duero': [
        [-2.88, 42.01], [-3.60, 41.70], [-4.72, 41.65], [-5.75, 41.50], [-6.80, 41.30], [-8.67, 41.14]
    ],
    'Tajo': [
        [-1.69, 40.32], [-2.5, 40.5], [-3.5, 40.1], [-4.02, 39.86], [-6.6, 39.7], [-9.17, 38.69]
    ],
    'Guadiana': [
        [-3.72, 39.12], [-4.5, 39.0], [-5.9, 38.95], [-6.97, 38.88], [-7.5, 38.2], [-7.39, 37.17]
    ],
    'Guadalquivir': [
        [-2.97, 37.84], [-3.5, 38.0], [-4.78, 37.88], [-6.00, 37.38], [-6.35, 36.78]
    ],
    'Ebro': [
        [-4.40, 43.04], [-3.5, 42.8], [-2.46, 42.46], [-1.2, 41.9], [-0.88, 41.65], [0.5, 41.0], [0.86, 40.72]
    ],
    'Júcar': [
        [-1.84, 40.40], [-2.13, 40.07], [-1.5, 39.5], [-1.11, 39.22], [-0.23, 39.15]
    ],
    'Segura': [
        [-2.67, 38.07], [-2.0, 38.2], [-1.13, 37.99], [-0.63, 38.10]
    ]
};

let output = "export const RIVERS_PATHS: Record<string, string> = {\n";

Object.entries(RIVERS_DATA).forEach(([name, coords]) => {
    // Apply realistic meandering
    const realisticCoords = processRiver(coords);

    const geojsonFeature = {
        type: "Feature",
        geometry: {
            type: "LineString",
            coordinates: realisticCoords
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
console.log("Realistic rivers paths generated for Spain!");
