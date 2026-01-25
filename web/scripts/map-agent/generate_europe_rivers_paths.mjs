
import fs from 'fs';
import { geoMercator, geoPath } from 'd3-geo';

// 1. Define Projection (Matches generate_europa_paths.mjs exactly)
const boundingBox = {
    type: "Feature",
    geometry: {
        type: "LineString",
        coordinates: [
            [-18, 27.5], // South-West (Canaries latitude)
            [35, 27.5],  // South-East
            [35, 71.5],  // North-East (North Cape latitude)
            [-18, 71.5], // North-West
            [-24, 64]    // Iceland (ensure it's included in width)
        ]
    }
};

const projection = geoMercator()
    .fitExtent([[5, 5], [795, 595]], boundingBox);

const pathGenerator = geoPath().projection(projection);

/**
 * Adds realistic meandering to a segment between two points.
 */
function addMeandering(p1, p2, depth = 3, intensity = 0.05) {
    if (depth === 0) return [p2];

    const mid = [
        (p1[0] + p2[0]) / 2,
        (p1[1] + p2[1]) / 2
    ];

    const dx = p2[0] - p1[0];
    const dy = p2[1] - p1[1];
    const length = Math.sqrt(dx * dx + dy * dy);

    if (length < 0.01) return [p2];

    const nx = -dy / length;
    const ny = dx / length;

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
        // Lower intensity for Europe (0.2 instead of 0.4) due to scale
        const meanderPoints = addMeandering(coords[i], coords[i + 1], 3, 0.2);
        newCoords = newCoords.concat(meanderPoints);
    }
    return newCoords;
}

const EUROPE_RIVERS_DATA = {
    'Danubio': [
        [8.1, 48.1], [10.0, 48.5], [14.0, 48.3], [16.4, 48.2], [19.0, 47.5], [21.0, 44.8], [24.0, 43.7], [28.0, 43.7], [29.6, 45.2]
    ],
    'Rin': [
        [9.3, 46.6], [8.5, 47.6], [7.6, 48.5], [8.2, 49.9], [7.5, 51.0], [6.0, 51.8], [4.1, 51.9]
    ],
    'Volga': [
        [32.5, 57.0], [36.0, 57.0], [40.0, 57.5], [44.0, 56.5], [49.0, 55.0], [49.0, 53.0], [49.5, 51.0], [45.0, 48.0], [47.5, 45.7]
    ],
    'Sena': [
        [4.8, 47.5], [3.5, 48.5], [2.3, 48.8], [1.5, 49.0], [0.2, 49.4]
    ],
    'Támesis': [
        [-2.0, 51.7], [-1.0, 51.6], [-0.1, 51.5], [0.5, 51.4], [0.9, 51.5]
    ],
    'Tajo': [
        [-1.7, 40.3], [-4.0, 39.8], [-6.5, 39.7], [-8.0, 39.2], [-9.2, 38.7]
    ],
    'Ebro': [
        [-4.4, 43.0], [-3.5, 42.5], [-2.5, 42.5], [-1.5, 42.0], [-0.8, 41.6], [0.5, 41.0], [0.8, 40.7]
    ],
    'Tíber': [
        [12.0, 43.8], [12.4, 43.0], [12.5, 42.2], [12.2, 41.7]
    ],
    'Po': [
        [7.2, 44.6], [8.0, 45.0], [10.0, 45.0], [11.5, 45.0], [12.4, 44.8]
    ],
    'Elba': [
        [15.5, 50.7], [14.0, 51.0], [12.5, 51.8], [11.0, 52.5], [10.0, 53.5], [8.5, 53.9]
    ],
    'Vístula': [
        [18.9, 49.6], [20.0, 50.0], [21.5, 51.5], [19.0, 53.0], [18.8, 54.3]
    ],
    'Loira': [
        [4.2, 44.8], [3.5, 46.0], [3.0, 47.0], [1.5, 47.5], [0.0, 47.3], [-2.1, 47.2]
    ],
    'Ródano': [
        [8.3, 46.5], [7.0, 46.2], [5.2, 45.8], [4.8, 44.5], [4.7, 43.4]
    ],
    'Oder': [
        [17.5, 49.6], [18.0, 50.5], [14.5, 52.0], [14.2, 53.0], [14.5, 53.6]
    ],
    'Duero': [
        [-2.9, 41.9], [-4.0, 41.6], [-6.0, 41.4], [-8.6, 41.1]
    ]
};

let output = "export const EUROPE_RIVERS_PATHS: Record<string, string> = {\n";

Object.entries(EUROPE_RIVERS_DATA).forEach(([name, coords]) => {
    const realisticCoords = processRiver(coords);

    const geojsonFeature = {
        type: "Feature",
        geometry: {
            type: "LineString",
            coordinates: realisticCoords
        },
        properties: { name }
    };

    const d = pathGenerator(geojsonFeature);
    if (d) {
        output += `    "${name}": "${d}",\n`;
    }
});

output += "};\n";

fs.writeFileSync('src/components/games/data/europe-rivers-paths.ts', output);
console.log("Realistic Europe rivers paths generated!");
