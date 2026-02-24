
import fs from 'fs';
import * as d3 from 'd3-geo';
import * as topojson from 'topojson-client';

// The data we collected
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
    { "name": "Castilla-La Mancha", "u": 517.21, "v": 168.54, "x": 320.85, "y": 290.66 },
    { "name": "Extremadura", "u": 422.94, "v": 183.83, "x": 151.31, "y": 315.11 },
    { "name": "Valencia", "u": 590.66, "v": 175.61, "x": 448.09, "y": 302.27 },
    { "name": "Murcia", "u": 562.74, "v": 229.66, "x": 397.20, "y": 392.3 },
    { "name": "Andalucia", "u": 470.14, "v": 249.92, "x": 235.45, "y": 436.54 }
];

// Simple Least Squares Solver for 2nd order polynomial
function solveCoefficients(pairs, targetKey) {
    const N = pairs.length;
    // Model: target = c0 + c1*u + c2*v + c3*u*u + c4*v*v + c5*u*v
    // Matrix A (N x 6)
    const A = pairs.map(p => [1, p.u, p.v, p.u * p.u, p.v * p.v, p.u * p.v]);
    const b = pairs.map(p => p[targetKey]);

    // Simple solve for A'A x = A'b
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

console.log('Coeffs X:', coeffsX);
console.log('Coeffs Y:', coeffsY);

pairs.forEach(p => {
    const [nx, ny] = transform(p.u, p.v);
    console.log(`${p.name}: Target(${p.x}, ${p.y}), Got(${nx.toFixed(1)}, ${ny.toFixed(1)})`);
});

function transform(u, v) {
    const [c0, c1, c2, c3, c4, c5] = coeffsX;
    const [d0, d1, d2, d3, d4, d5] = coeffsY;
    const x = c0 + c1 * u + c2 * v + c3 * u * u + c4 * v * v + c5 * u * v;
    const y = d0 + d1 * u + d2 * v + d3 * u * u + d4 * v * v + d5 * u * v;
    return [x, y];
}

// Now generate the neighbors using this transform
const geoJSON = JSON.parse(fs.readFileSync('./public/maps/spain-communities.json', 'utf8'));
const projectionRaw = d3.geoMercator().fitSize([800, 600], geoJSON);

const worldData = JSON.parse(fs.readFileSync('public/maps/world-countries-50m.json', 'utf8'));
const worldFeatures = topojson.feature(worldData, worldData.objects.countries).features;

const TARGETS = ['Portugal', 'France', 'Andorra', 'Morocco', 'Algeria'];

let output = `// Generated with Quadratic Transformation to match Provinces Map\n`;
output += `export const SPAIN_PROVINCES_NEIGHBORS_PATHS: Record<string, string> = {\n`;

TARGETS.forEach(name => {
    const feature = worldFeatures.find(f => f.properties.name === name);
    if (!feature) return;

    // We can't use d3.geoPath with our custom non-linear transform directly easily for complex polygons
    // unless we redefine the projection. 
    // D3 projection is just a function [lon, lat] -> [x, y]

    const customProjection = d3.geoProjection((λ, φ) => {
        // D3 geoProjection input λ, φ are in radians
        // projectionRaw input is [lon, lat] in degrees
        const [u, v] = projectionRaw([λ * 180 / Math.PI, φ * 180 / Math.PI]);
        const [x, y] = transform(u, v);
        // D3 expects Y to increase UP in the internal projection function, 
        // then it applies the scale/translate.
        // But since we are mapping to SCREEN coordinates directly, let's just bypass
        return [x, y];
    }).scale(1).translate([0, 0]);

    const pathGen = d3.geoPath().projection(customProjection);
    const d = pathGen(feature);

    if (d) {
        output += `    "${name}": "${d}",\n`;
        console.log(`Generated: ${name}`);
    }
});

output += `    "Gibraltar": "M188,531 m-2,0 a2,2 0 1,0 4,0 a2,2 0 1,0 -4,0",\n`;
output += `};\n`;

fs.writeFileSync('src/components/games/data/spain-neighbors-provinces-paths.ts', output);
console.log('Done!');
