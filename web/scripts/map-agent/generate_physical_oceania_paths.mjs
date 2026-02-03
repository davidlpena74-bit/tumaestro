
import fs from 'fs';
import { geoMercator, geoPath } from 'd3-geo';

// Oceania Projection logic
const boundingBox = {
    type: "Feature",
    geometry: {
        type: "LineString",
        coordinates: [
            [110, -50], // SW
            [180, -50], // SE
            [180, 10],  // NE
            [110, 10]   // NW
        ]
    }
};

const projection = geoMercator().fitExtent([[40, 40], [760, 560]], boundingBox);
const pathGen = geoPath().projection(projection);

const MOUNTAINS = {
    'Gran Cordillera Divisoria': [[145, -12], [152, -30], [146, -37]],
    'Alpes del Sur': [[168, -45], [172, -42]],
    'Cordillera Owen Stanley': [[146, -9], [149, -10]]
};

const SEAS = {
    'Mar del Coral': [[[145, -25], [155, -25], [155, -10], [145, -10], [145, -25]]],
    'Mar de Tasmania': [[[150, -45], [165, -45], [165, -35], [150, -35], [150, -45]]],
    'Mar de Arafura': [[[130, -12], [142, -12], [142, -5], [130, -5], [130, -12]]],
    'Gran Bahía Australiana': [[[120, -40], [140, -40], [140, -32], [120, -32], [120, -40]]]
};

let output = "// Generated Oceania Physical Data\n";
output += "export const OCEANIA_MOUNTAINS_PATHS: Record<string, string> = {\n";
Object.entries(MOUNTAINS).forEach(([name, coords]) => {
    const d = pathGen({ type: "Feature", geometry: { type: "LineString", coordinates: coords } });
    output += `    "${name}": "${d}",\n`;
});
output += "};\n\n";

output += "export const OCEANIA_SEAS_PATHS: Record<string, string> = {\n";
Object.entries(SEAS).forEach(([name, coords]) => {
    const d = pathGen({ type: "Feature", geometry: { type: "Polygon", coordinates: coords } });
    output += `    "${name}": "${d}",\n`;
});
output += "};\n";

fs.writeFileSync('src/components/games/data/oceania-physical-paths.ts', output);
console.log("Oceania physical paths generated!");
