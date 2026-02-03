
import fs from 'fs';
import { geoMercator, geoPath } from 'd3-geo';

// Asia Projection logic (approximate centered on Asia)
const boundingBox = {
    type: "Feature",
    geometry: {
        type: "LineString",
        coordinates: [
            [25, -10], // SW
            [150, -10], // SE
            [150, 75],  // NE
            [25, 75]   // NW
        ]
    }
};

const projection = geoMercator().fitExtent([[40, 40], [760, 560]], boundingBox);
const pathGen = geoPath().projection(projection);

const MOUNTAINS = {
    'Himalaya': [[75.0, 35.0], [85.0, 28.0], [95.0, 28.0]],
    'Karakórum': [[74.0, 36.0], [77.0, 35.5]],
    'Tian Shan': [[70.0, 42.0], [85.0, 42.0]],
    'Altái': [[85.0, 50.0], [95.0, 48.0]],
    'Kunlun': [[80.0, 36.0], [90.0, 36.0]],
    'Zagros': [[45.0, 35.0], [55.0, 28.0]],
    'Hindu Kush': [[68.0, 35.0], [72.0, 36.5]],
    'Montes Urales': [[60.0, 50.0], [60.0, 70.0]]
};

const SEAS = {
    'Mar Arábigo': [[[55, 10], [75, 10], [75, 25], [55, 25], [55, 10]]],
    'Bahía de Bengala': [[[80, 10], [95, 10], [95, 22], [80, 22], [80, 10]]],
    'Mar de China Meridional': [[[110, 5], [120, 5], [120, 20], [110, 20], [110, 5]]],
    'Mar de Japón': [[[130, 35], [140, 35], [140, 45], [130, 45], [130, 35]]],
    'Mar Rojo': [[[35, 15], [43, 15], [43, 28], [35, 28], [35, 15]]],
    'Golfo Pérsico': [[[48, 24], [56, 24], [56, 30], [48, 30], [48, 24]]]
};

let output = "// Generated Asia Physical Data\n";
output += "export const ASIA_MOUNTAINS_PATHS: Record<string, string> = {\n";
Object.entries(MOUNTAINS).forEach(([name, coords]) => {
    const d = pathGen({ type: "Feature", geometry: { type: "LineString", coordinates: coords } });
    output += `    "${name}": "${d}",\n`;
});
output += "};\n\n";

output += "export const ASIA_SEAS_PATHS: Record<string, string> = {\n";
Object.entries(SEAS).forEach(([name, coords]) => {
    const d = pathGen({ type: "Feature", geometry: { type: "Polygon", coordinates: coords } });
    output += `    "${name}": "${d}",\n`;
});
output += "};\n";

fs.writeFileSync('src/components/games/data/asia-physical-paths.ts', output);
console.log("Asia physical paths generated!");
