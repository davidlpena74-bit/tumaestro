
import fs from 'fs';
import { geoMercator, geoPath } from 'd3-geo';

// Europe Projection logic
const boundingBox = {
    type: "Feature",
    geometry: {
        type: "LineString",
        coordinates: [
            [-25, 30], // SW
            [60, 30],  // SE
            [60, 72],  // NE
            [-25, 72]  // NW
        ]
    }
};

const projection = geoMercator().fitExtent([[40, 40], [760, 560]], boundingBox);
const pathGen = geoPath().projection(projection);

const MOUNTAINS = {
    'Alpes': [[6.0, 45.0], [8.0, 46.5], [10.0, 47.0], [14.0, 47.5]],
    'Pirineos': [[-1.5, 43.0], [0.5, 42.8], [2.5, 42.4]],
    'Cárpatos': [[18.0, 49.5], [20.0, 49.0], [24.0, 46.0], [26.0, 46.5]],
    'Apeninos': [[10.0, 44.5], [12.0, 42.0], [15.0, 40.0]],
    'Cáucaso': [[40.0, 44.0], [45.0, 42.0], [48.0, 41.5]],
    'Urales': [[60.0, 50.0], [60.0, 60.0], [60.0, 68.0]],
    'Alpes Escandinavos': [[6.0, 60.0], [12.0, 65.0], [20.0, 68.0]],
    'Balcanes': [[22.0, 43.0], [26.0, 43.0]]
};

const SEAS = {
    'Mar Mediterráneo': [[[-5, 35], [30, 35], [30, 45], [-5, 45], [-5, 35]]],
    'Mar del Norte': [[[0, 51], [10, 51], [10, 60], [0, 60], [0, 51]]],
    'Mar Báltico': [[[15, 54], [25, 54], [25, 65], [15, 65], [15, 54]]],
    'Mar Negro': [[[28, 41], [41, 41], [41, 47], [28, 47], [28, 41]]],
    'Mar Caspio': [[[47, 37], [54, 37], [54, 47], [47, 47], [47, 37]]],
    'Mar Adriático': [[[12, 40], [19, 40], [19, 45], [12, 45], [12, 40]]]
};

let output = "// Generated Europe Physical Data\n";
output += "export const EUROPE_MOUNTAINS_PATHS: Record<string, string> = {\n";
Object.entries(MOUNTAINS).forEach(([name, coords]) => {
    const d = pathGen({ type: "Feature", geometry: { type: "LineString", coordinates: coords } });
    output += `    "${name}": "${d}",\n`;
});
output += "};\n\n";

output += "export const EUROPE_SEAS_PATHS: Record<string, string> = {\n";
Object.entries(SEAS).forEach(([name, coords]) => {
    const d = pathGen({ type: "Feature", geometry: { type: "Polygon", coordinates: coords } });
    output += `    "${name}": "${d}",\n`;
});
output += "};\n";

fs.writeFileSync('src/components/games/data/europe-physical-paths.ts', output);
console.log("Europe physical paths generated!");
