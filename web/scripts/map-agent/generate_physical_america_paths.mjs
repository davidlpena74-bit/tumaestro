
import fs from 'fs';
import { geoMercator, geoPath } from 'd3-geo';

// America Projection logic
const boundingBox = {
    type: "Feature",
    geometry: {
        type: "LineString",
        coordinates: [
            [-170, -60], // SW
            [-30, -60], // SE
            [-30, 75],  // NE
            [-170, 75]   // NW
        ]
    }
};

const projection = geoMercator().fitExtent([[40, 40], [760, 560]], boundingBox);
const pathGen = geoPath().projection(projection);

const MOUNTAINS = {
    'Rocosas': [[-115, 35], [-110, 45], [-120, 60]],
    'Andes': [[-74, 10], [-78, -10], [-70, -30], [-73, -53]],
    'Apalaches': [[-84, 34], [-78, 41], [-68, 47]],
    'Sierra Nevada': [[-120, 36], [-119, 39]],
    'Sierra Madre Occidental': [[-108, 28], [-105, 20]],
    'Sierra Madre Oriental': [[-100, 25], [-98, 19]]
};

const SEAS = {
    'Mar Caribe': [[[-85, 10], [-60, 10], [-60, 20], [-85, 20], [-85, 10]]],
    'Golfo de México': [[[-97, 20], [-82, 20], [-82, 30], [-97, 30], [-97, 20]]],
    'Bahía de Hudson': [[[-95, 51], [-75, 51], [-75, 63], [-95, 63], [-95, 51]]],
    'Mar de Bering': [[[-180, 52], [-160, 52], [-160, 65], [-180, 65], [-180, 52]]],
    'Golfo de California': [[[-115, 25], [-108, 25], [-115, 32], [-115, 25]]]
};

let output = "// Generated America Physical Data\n";
output += "export const AMERICA_MOUNTAINS_PATHS: Record<string, string> = {\n";
Object.entries(MOUNTAINS).forEach(([name, coords]) => {
    const d = pathGen({ type: "Feature", geometry: { type: "LineString", coordinates: coords } });
    output += `    "${name}": "${d}",\n`;
});
output += "};\n\n";

output += "export const AMERICA_SEAS_PATHS: Record<string, string> = {\n";
Object.entries(SEAS).forEach(([name, coords]) => {
    const d = pathGen({ type: "Feature", geometry: { type: "Polygon", coordinates: coords } });
    output += `    "${name}": "${d}",\n`;
});
output += "};\n";

fs.writeFileSync('src/components/games/data/america-physical-paths.ts', output);
console.log("America physical paths generated!");
