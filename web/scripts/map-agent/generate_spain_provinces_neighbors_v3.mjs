
import fs from 'fs';
import * as d3 from 'd3-geo';
import * as topojson from 'topojson-client';

// ============================================================
// Calibration pairs:
//   u, v = coords in the "raw" geoMercator().fitSize([800,600], allCommunities)
//   x, y = actual coords in the Provinces SVG
// These pairs were manually collected by comparing community centroids
// in the communities projection vs the provinces SVG.
// ============================================================
const pairs = [
    { "name": "Galicia", "u": 393.18, "v": 46.19, "x": 66.86, "y": 79.54 },
    { "name": "Asturias", "u": 444.82, "v": 34.02, "x": 169.5, "y": 48.7 },
    { "name": "Cantabria", "u": 483.69, "v": 35.47, "x": 257.6, "y": 42.1 },
    { "name": "Pais Vasco", "u": 516.29, "v": 45.45, "x": 331.43, "y": 55.45 },
    { "name": "Navarra", "u": 541.24, "v": 68.61, "x": 401.9, "y": 89.2 },
    { "name": "Aragon", "u": 558.12, "v": 115.65, "x": 451.71, "y": 185.0 },
    { "name": "Cataluña", "u": 622.95, "v": 125.84, "x": 560.52, "y": 194.21 },
    { "name": "Castilla-Leon", "u": 464.0, "v": 82.67, "x": 228.41, "y": 142.81 },
    { "name": "Madrid", "u": 495.87, "v": 133.23, "x": 273.55, "y": 226.55 },
    { "name": "Castilla-LM", "u": 517.21, "v": 168.54, "x": 320.85, "y": 290.66 },
    { "name": "Extremadura", "u": 422.94, "v": 183.83, "x": 151.31, "y": 315.11 },
    { "name": "Valencia", "u": 590.66, "v": 175.61, "x": 448.09, "y": 302.27 },
    { "name": "Murcia", "u": 562.74, "v": 229.66, "x": 397.20, "y": 392.3 },
    { "name": "Andalucia", "u": 470.14, "v": 249.92, "x": 235.45, "y": 436.54 }
];

// Solve least-squares polynomial coefficients
// Model: target = c0 + c1*u + c2*v + c3*u^2 + c4*v^2 + c5*u*v
function solveCoefficients(pairs, targetKey) {
    const N = pairs.length;
    const A = pairs.map(p => [1, p.u, p.v, p.u * p.u, p.v * p.v, p.u * p.v]);
    const b = pairs.map(p => p[targetKey]);

    const At = [];
    for (let j = 0; j < 6; j++) {
        At[j] = [];
        for (let i = 0; i < N; i++) At[j][i] = A[i][j];
    }

    const AtA = [];
    for (let i = 0; i < 6; i++) {
        AtA[i] = [];
        for (let j = 0; j < 6; j++) {
            let sum = 0;
            for (let k = 0; k < N; k++) sum += At[i][k] * A[k][j];
            AtA[i][j] = sum;
        }
    }

    const Atb = [];
    for (let i = 0; i < 6; i++) {
        let sum = 0;
        for (let k = 0; k < N; k++) sum += At[i][k] * b[k];
        Atb[i] = sum;
    }

    // Gaussian elimination
    for (let i = 0; i < 6; i++) {
        let pivot = AtA[i][i];
        for (let j = i + 1; j < 6; j++) {
            let factor = AtA[j][i] / pivot;
            for (let k = i; k < 6; k++) AtA[j][k] -= factor * AtA[i][k];
            Atb[j] -= factor * Atb[i];
        }
    }

    const x = new Array(6);
    for (let i = 5; i >= 0; i--) {
        let sum = 0;
        for (let j = i + 1; j < 6; j++) sum += AtA[i][j] * x[j];
        x[i] = (Atb[i] - sum) / AtA[i][i];
    }
    return x;
}

const coeffsX = solveCoefficients(pairs, 'x');
const coeffsY = solveCoefficients(pairs, 'y');

function transform(u, v) {
    const [c0, c1, c2, c3, c4, c5] = coeffsX;
    const [d0, d1, d2, d3, d4, d5] = coeffsY;
    const x = c0 + c1 * u + c2 * v + c3 * u * u + c4 * v * v + c5 * u * v;
    const y = d0 + d1 * u + d2 * v + d3 * u * u + d4 * v * v + d5 * u * v;
    return [x, y];
}

// Validate calibration
console.log('\n=== Calibración (debe ser cercano a 0.0 de error) ===');
pairs.forEach(p => {
    const [nx, ny] = transform(p.u, p.v);
    console.log(`${p.name}: target(${p.x}, ${p.y}) → got(${nx.toFixed(1)}, ${ny.toFixed(1)}) err(${(nx - p.x).toFixed(1)}, ${(ny - p.y).toFixed(1)})`);
});

// Check transform on known geographic points (Portugal/France boundaries)
// Using the raw projection to get u,v from lon/lat
const geoJSON = JSON.parse(fs.readFileSync('public/maps/spain-communities.json', 'utf8'));
const projectionRaw = d3.geoMercator().fitSize([800, 600], geoJSON);

const testPoints = [
    { name: 'Caminha (Minho, norte borde PT)', lon: -8.83, lat: 41.87 },
    { name: 'Ayamonte (sur borde PT-Huelva)', lon: -7.40, lat: 37.22 },
    { name: 'Hendaya (frontera FR-Gipuzkoa)', lon: -1.78, lat: 43.36 },
    { name: 'Gibraltar', lon: -5.35, lat: 36.14 },
    { name: 'Ceuta centro', lon: -5.30, lat: 35.89 },
    { name: 'Melilla centro', lon: -2.94, lat: 35.29 },
];

console.log('\n=== Puntos de frontera proyectados (deben coincidir con las provincias) ===');
testPoints.forEach(p => {
    const [u, v] = projectionRaw([p.lon, p.lat]);
    const [x, y] = transform(u, v);
    console.log(`${p.name}: [${x.toFixed(1)}, ${y.toFixed(1)}]`);
});

// Load world data
const worldData = JSON.parse(fs.readFileSync('public/maps/world-countries-50m.json', 'utf8'));
const worldFeatures = topojson.feature(worldData, worldData.objects.countries).features;

const TARGETS = ['Portugal', 'France', 'Andorra', 'Morocco', 'Algeria'];

let output = `// Generated with Quadratic Transformation v3 - calibrated to match Spain Provinces Map\n`;
output += `// DO NOT EDIT MANUALLY - regenerate with generate_spain_provinces_neighbors_v3.mjs\n`;
output += `export const SPAIN_PROVINCES_NEIGHBORS_PATHS: Record<string, string> = {\n`;

TARGETS.forEach(name => {
    const feature = worldFeatures.find(f => f.properties.name === name);
    if (!feature) { console.log(`NOT FOUND: ${name}`); return; }

    const customProjection = d3.geoProjection((λ, φ) => {
        const [u, v] = projectionRaw([λ * 180 / Math.PI, φ * 180 / Math.PI]);
        const [x, y] = transform(u, v);
        return [x, y];
    }).scale(1).translate([0, 0]);

    const pathGen = d3.geoPath().projection(customProjection);
    const d = pathGen(feature);

    if (d) {
        output += `    "${name}": "${d}",\n`;
        console.log(`\nGenerated: ${name}`);
    }
});

// Gibraltar position from test point above: [202, 543] approx
// Let's compute it properly
const [gibU, gibV] = projectionRaw([-5.35, 36.14]);
const [gibX, gibY] = transform(gibU, gibV);
output += `    "Gibraltar": "M${gibX.toFixed(0)},${gibY.toFixed(0)} m-2,0 a2,2 0 1,0 4,0 a2,2 0 1,0 -4,0",\n`;
console.log(`\nGibraltar dot: [${gibX.toFixed(1)}, ${gibY.toFixed(1)}]`);

output += `};\n`;
fs.writeFileSync('src/components/games/data/spain-neighbors-provinces-paths.ts', output);
console.log('\nDone! Generated: src/components/games/data/spain-neighbors-provinces-paths.ts');
