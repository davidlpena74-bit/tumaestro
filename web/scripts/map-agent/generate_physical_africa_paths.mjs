
import fs from 'fs';
import * as d3 from 'd3-geo';

const boundingBox = {
    type: "Feature",
    geometry: {
        type: "LineString",
        coordinates: [
            [-19, -36], // West Coast to South
            [53, -36],  // East Coast (including Madagascar)
            [53, 38],   // North East
            [-19, 38]   // North West
        ]
    }
};

const projection = d3.geoMercator()
    .fitExtent([[10, 10], [790, 590]], boundingBox);
const pathGen = d3.geoPath().projection(projection);

const MOUNTAINS = {
    'Montes Atlas': [[-9.86, 30.74], [-7.90, 31.05], [-5.88, 35.76], [2.68, 36.67], [6.63, 37.00], [10.17, 37.12]],
    'Drakensberg': [[29.83, -23.59], [31.13, -22.38], [29.13, -28.25], [27.01, -29.93], [30.11, -30.69], [25.13, -33.20]],
    'Tierras Altas de Etiopía': [[37.68, 4.91], [34.20, 8.98], [33.95, 9.75], [38.32, 16.20], [37.71, 17.84], [43.18, 9.43], [40.57, 5.65]],
    'Kilimanjaro': [[37.3, -3.1], [37.4, -3.1]], // Small line as peak
    'Monte Kenia': [[37.3, -0.1], [37.4, -0.1]],
    'Montes Ruwenzori': [[30.0, 0.4], [30.1, 0.4]]
};

const SEAS = {
    'Mar Rojo': [[[32.55, 29.96], [35.50, 23.94], [37.24, 19.58], [40.08, 15.15], [42.79, 12.86], [43.30, 12.46], [42.0, 12.0], [35.0, 23.0], [32.0, 29.0], [32.55, 29.96]]],
    'Lago Victoria': [[[31.67, -3.00], [34.82, -3.00], [34.82, 0.50], [31.67, 0.50], [31.67, -3.00]]],
    'Lago Tanganica': [[[29.11, -8.79], [31.14, -8.79], [31.14, -3.33], [29.11, -3.33], [29.11, -8.79]]],
    'Lago Malaui': [[[33.90, -14.40], [35.28, -14.40], [35.28, -9.49], [33.90, -9.49], [33.90, -14.40]]],
    'Golfo de Guinea': [[[0, 5], [10, 5], [15, 0], [10, -5], [0, -5], [0, 5]]],
    'Canal de Mozambique': [[[40, -15], [45, -15], [45, -25], [40, -25], [40, -15]]]
};

const RIVERS = {
    'Nilo': [[33.00, -1.06], [32.52, 1.56], [31.66, 9.48], [32.52, 15.60], [33.92, 18.27], [30.48, 19.24], [31.09, 21.60], [32.87, 23.98], [32.62, 25.23], [31.25, 29.99], [31.23, 31.42]],
    'Congo': [[30.15, -9.45], [29.75, -11.25], [26.44, -8.27], [25.18, 0.51], [18.18, 0.06], [15.26, -4.26], [13.46, -5.81], [12.40, -6.00]],
    'Níger': [[-10.78, 9.08], [-8.00, 12.63], [-3.00, 16.76], [-0.05, 16.26], [2.10, 13.51], [6.73, 7.80], [7.00, 4.75]],
    'Zambeze': [[24.30, -11.36], [23.18, -13.72], [25.85, -17.91], [28.76, -16.53], [32.70, -15.57], [36.28, -18.83]],
    'Orange': [[28.5, -29.0], [25.0, -28.5], [20.0, -28.6], [16.5, -28.6]],
    'Limpopo': [[26.0, -24.0], [29.0, -22.0], [32.0, -24.0], [33.5, -25.0]]
};

let output = "// Generated Africa Physical Data\n";

// Mountains
output += "export const AFRICA_MOUNTAINS_PATHS: Record<string, any> = {\n";
Object.entries(MOUNTAINS).forEach(([name, coords]) => {
    const d = pathGen({ type: "Feature", geometry: { type: "LineString", coordinates: coords } });
    output += `    "${name}": { path: "${d}" },\n`;
});
output += "};\n\n";

// Seas / Lakes
output += "export const AFRICA_SEAS_PATHS: Record<string, string> = {\n";
Object.entries(SEAS).forEach(([name, coords]) => {
    const d = pathGen({ type: "Feature", geometry: { type: "Polygon", coordinates: coords } });
    output += `    "${name}": "${d}",\n`;
});
output += "};\n\n";

// Rivers
output += "export const AFRICA_RIVERS_PATHS: Record<string, string> = {\n";
Object.entries(RIVERS).forEach(([name, coords]) => {
    const d = pathGen({ type: "Feature", geometry: { type: "LineString", coordinates: coords } });
    output += `    "${name}": "${d}",\n`;
});
output += "};\n";

fs.writeFileSync('src/components/games/data/africa-physical-paths.ts', output);
console.log("Africa physical paths generated!");
