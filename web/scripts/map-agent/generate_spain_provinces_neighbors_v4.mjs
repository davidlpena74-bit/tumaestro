
import fs from 'fs';
import * as d3 from 'd3-geo';
import * as topojson from 'topojson-client';

// ============================================================
// STRATEGY: 
//   1. Use geoMercator().fitSize([800,600], allSpainGeoJSON) → "raw" projection (u,v)
//   2. Apply quadratic polynomial transform (u,v) → (x,y) in provinces SVG coords
//   3. Walk each polygon's coordinates manually, applying the transform to each [lon,lat]
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

// Load raw projection
const geoJSON = JSON.parse(fs.readFileSync('public/maps/spain-communities.json', 'utf8'));
const projectionRaw = d3.geoMercator().fitSize([800, 600], geoJSON);

function projectPoint(lon, lat) {
    const [u, v] = projectionRaw([lon, lat]);
    const [c0, c1, c2, c3, c4, c5] = coeffsX;
    const [d0, d1, d2, d3, d4, d5] = coeffsY;
    const x = c0 + c1 * u + c2 * v + c3 * u * u + c4 * v * v + c5 * u * v;
    const y = d0 + d1 * u + d2 * v + d3 * u * u + d4 * v * v + d5 * u * v;
    return [x, y];
}

// ViewBox clipping bounds for the provinces map
// viewBox="-140 0 840 700" → visible x: -140 to 700, y: 0 to 700
const VB_XMIN = -150, VB_XMAX = 720, VB_YMIN = -20, VB_YMAX = 720;

function isInBounds(x, y) {
    return x >= VB_XMIN && x <= VB_XMAX && y >= VB_YMIN && y <= VB_YMAX;
}

// Convert a ring (array of [lon, lat]) to an SVG path "M...L...Z"
function ringToPath(ring) {
    const pts = ring.map(([lon, lat]) => projectPoint(lon, lat));
    if (pts.length < 2) return '';
    return 'M' + pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join('L') + 'Z';
}

// Convert a Polygon geometry to an SVG path
function polygonToPath(coordinates) {
    return coordinates.map(ring => ringToPath(ring)).join(' ');
}

// Check if a polygon ring has any point in the viewBox bounds
function ringHasPointInBounds(ring) {
    return ring.some(([lon, lat]) => {
        const [x, y] = projectPoint(lon, lat);
        return isInBounds(x, y);
    });
}

function featureToPath(feature) {
    const geom = feature.geometry;
    const parts = [];

    if (geom.type === 'Polygon') {
        if (ringHasPointInBounds(geom.coordinates[0])) {
            parts.push(polygonToPath(geom.coordinates));
        }
    } else if (geom.type === 'MultiPolygon') {
        for (const poly of geom.coordinates) {
            if (ringHasPointInBounds(poly[0])) {
                parts.push(polygonToPath(poly));
            }
        }
    }

    return parts.join(' ');
}

// Validation
console.log('\n=== Calibración ===');
pairs.forEach(p => {
    const [u, v] = projectionRaw([0, 0]); // dummy
    // Re-apply transform manually to check
    const { u: pu, v: pv } = p;
    const [c0, c1, c2, c3, c4, c5] = coeffsX;
    const [d0, d1, d2, d3, d4, d5] = coeffsY;
    const gx = c0 + c1 * pu + c2 * pv + c3 * pu * pu + c4 * pv * pv + c5 * pu * pv;
    const gy = d0 + d1 * pu + d2 * pv + d3 * pu * pu + d4 * pv * pv + d5 * pu * pv;
    console.log(`${p.name}: target(${p.x}, ${p.y}) → got(${gx.toFixed(1)}, ${gy.toFixed(1)})`);
});

// Test key border points
const borderPoints = [
    { name: 'Caminha (norte borde PT)', lon: -8.83, lat: 41.87 },
    { name: 'Fuentes de Oñoro (centro borde PT)', lon: -6.83, lat: 40.55 },
    { name: 'Ayamonte (sur borde PT)', lon: -7.40, lat: 37.22 },
    { name: 'Hendaya (frontera FR)', lon: -1.78, lat: 43.36 },
    { name: 'La Jonquera (frontera FR-Girona)', lon: 2.86, lat: 42.42 },
    { name: 'Gibraltar', lon: -5.35, lat: 36.14 },
    { name: 'Ceuta', lon: -5.30, lat: 35.89 },
    { name: 'Melilla', lon: -2.94, lat: 35.29 },
];

console.log('\n=== Puntos de frontera (para verificar alineación) ===');
borderPoints.forEach(p => {
    const [x, y] = projectPoint(p.lon, p.lat);
    console.log(`${p.name}: [${x.toFixed(1)}, ${y.toFixed(1)}]`);
});
console.log('\n=== Referencia: puntos en SVG de provincias ===');
console.log('Ceuta en SVG:   M185.5,538.7');
console.log('Melilla en SVG: M321.6,580.0');
console.log('Pontevedra SW (borde PT): path starts at M50.8,110.3 → Minho ~y=125');
console.log('Huelva SW (borde PT):     path starts at M135.4,470.8');

// Generate paths
const worldData = JSON.parse(fs.readFileSync('public/maps/world-countries-50m.json', 'utf8'));
const worldFeatures = topojson.feature(worldData, worldData.objects.countries).features;

const TARGETS = ['Portugal', 'France', 'Andorra', 'Morocco', 'Algeria'];

let output = `// Generated with Quadratic Transformation v4 - manual polygon walk\n`;
output += `// DO NOT EDIT MANUALLY - regenerate with generate_spain_provinces_neighbors_v4.mjs\n`;
output += `export const SPAIN_PROVINCES_NEIGHBORS_PATHS: Record<string, string> = {\n`;

TARGETS.forEach(name => {
    const feature = worldFeatures.find(f => f.properties.name === name);
    if (!feature) { console.log(`\nNOT FOUND: ${name}`); return; }

    const d = featureToPath(feature);
    if (d) {
        output += `    "${name}": "${d}",\n`;
        console.log(`\nGenerated: ${name} (${d.length} chars)`);
    } else {
        console.log(`\nNO VISIBLE POLYGONS: ${name}`);
    }
});

// Gibraltar dot
const [gibX, gibY] = projectPoint(-5.35, 36.14);
output += `    "Gibraltar": "M${gibX.toFixed(0)},${gibY.toFixed(0)} m-2,0 a2,2 0 1,0 4,0 a2,2 0 1,0 -4,0",\n`;
console.log(`\nGibraltar: [${gibX.toFixed(1)}, ${gibY.toFixed(1)}]`);

output += `};\n`;
fs.writeFileSync('src/components/games/data/spain-neighbors-provinces-paths.ts', output);
console.log('\nDone!');
