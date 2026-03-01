import fs from 'fs';
import { projectPoint } from './UnifiedProjection.mjs';

function processRiver(coords) {
    return coords;
}

const RIVERS_DATA = {
    'Miño': [
        [-7.63, 43.20], [-7.5, 43.0], [-7.8, 42.5], [-8.06, 42.35], [-8.5, 42.0], [-8.84, 41.87]
    ],
    'Duero': [
        [-2.31, 41.97], [-3.0, 41.8], [-3.6, 41.7], [-4.72, 41.53], [-5.5, 41.4], [-6.44, 41.27], [-7.5, 41.1], [-8.67, 41.13]
    ],
    'Tajo': [
        [-1.69, 40.32], [-2.35, 40.67], [-3.0, 40.3], [-3.5, 40.1], [-4.02, 39.86], [-5.0, 39.7], [-6.44, 39.66], [-8.0, 39.3], [-9.33, 38.67]
    ],
    'Guadiana': [
        [-3.0, 39.1], [-3.72, 39.12], [-4.32, 38.93], [-5.0, 38.9], [-6.07, 38.89], [-6.97, 38.88], [-7.5, 38.2], [-7.39, 37.18]
    ],
    'Guadalquivir': [
        [-2.97, 37.84], [-3.01, 37.89], [-3.5, 38.0], [-4.48, 37.84], [-5.0, 37.7], [-5.99, 37.38], [-6.34, 36.78]
    ],
    'Ebro': [
        [-4.4, 43.0], [-4.24, 43.01], [-3.5, 42.8], [-2.45, 42.66], [-2.0, 42.4], [-1.2, 41.9], [-0.88, 41.65], [0.0, 41.4], [0.52, 41.25], [0.85, 40.71]
    ],
    'Júcar': [
        [-1.84, 40.40], [-1.82, 40.23], [-2.11, 39.45], [-1.11, 39.22], [-0.23, 39.15]
    ],
    'Segura': [
        [-2.67, 38.07], [-2.57, 38.08], [-2.0, 38.2], [-1.13, 37.99], [-0.67, 38.11]
    ]
};

let output = "// Generated with UnifiedProjection\nexport const RIVERS_PATHS: Record<string, string> = {\n";

Object.entries(RIVERS_DATA).forEach(([name, coords]) => {
    const realisticCoords = processRiver(coords);
    const projectedCoords = realisticCoords.map(c => projectPoint(c[0], c[1]));

    let d = `M${projectedCoords[0][0].toFixed(1)},${projectedCoords[0][1].toFixed(1)}`;
    for (let i = 1; i < projectedCoords.length; i++) {
        d += `L${projectedCoords[i][0].toFixed(1)},${projectedCoords[i][1].toFixed(1)}`;
    }

    output += `    "${name}": "${d}",\n`;
});

output += "};\n";

fs.writeFileSync('src/components/games/data/rivers-paths.ts', output);
console.log("Realistic rivers paths generated for Spain with Unified Projection!");
