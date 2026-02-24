
import fs from 'fs';
import * as d3 from 'd3-geo';
import * as topojson from 'topojson-client';

// ============================================================
// STRATEGY: Use a LINEAR transform (affine) to avoid overfitting.
// The quadratic was calibrated on Autonomous Communities centroids
// (interior points), causing extrapolation errors near the borders.
//
// We estimate the affine transform: [x,y] = A * [u,v,1]^T
// using least squares on the original 14 pairs.
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
    { "name": "Andalucia", "u": 470.14, "v": 249.92, "x": 235.45, "y": 436.54 },

    // === ADDITIONAL CALIBRATION POINTS from province borders ===
    // These are derived by checking province SVG paths at known geographic corners:
    // 
    // A Coruña: extreme NW of Spain (~lon=-9.3, lat=43.8) → in SVG path M27.1,72.5
    // Centroid of Pontevedra southern point (Minho, border with PT lat~41.85):
    //   path: "M50.8,110.3 L44.3,113.5 L36.4,114.3 L29.9,116.1" → aprox center [40, 113]
    // Gipuzkoa (NE border with France, lat~43.3):
    //   path: "M352.1,64.7 L346.9,61.4" → centroid aprox [355, 52]
    //   Geographic: lon=-2.0, lat=43.25
    // Girona (NE corner, border with France at La Jonquera):
    //   path starts at M559.4,97.0 → extreme NE around [625, 83]
    //   Geographic: Cap de Creus lon=3.32, lat=42.32 → extreme NE    
    // Huelva (SW, border with Portugal):
    //   path M135.4,470.8 → centroid ~[90, 440]
    //   Geographic centroid of Huelva: lon=-6.95, lat=37.55
    // Badajoz (W, border with Portugal):
    //   long western province. Centroid ~lon=-6.1, lat=38.8
    //   From path: centroid approx [145, 345]
    // Caceres (W, border with Portugal):
    //   centroid ~lon=-6.3, lat=39.7
    //   From path: centroid approx [140, 295]    
];

// === SOLVE AFFINE (LINEAR) TRANSFORM ===
// x = ax*u + bx*v + cx
// y = ay*u + by*v + cy
// This is more stable for extrapolation outside the calibration region

function solveAffine(pairs, targetKey) {
    const N = pairs.length;
    // A = [[u1,v1,1],[u2,v2,1],...]
    // b = [x1,x2,...]
    // Solve A'A * coeffs = A'b (3 unknowns: [a, b, c])

    let suu = 0, suv = 0, su = 0, svv = 0, sv = 0, sn = N;
    let sbу = 0, suy = 0, svy = 0;

    for (const p of pairs) {
        suu += p.u * p.u;
        suv += p.u * p.v;
        su += p.u;
        svv += p.v * p.v;
        sv += p.v;
        suy += p.u * p[targetKey];
        svy += p.v * p[targetKey];
        sbу += p[targetKey];
    }

    // AtA = [[suu, suv, su],
    //        [suv, svv, sv],
    //        [su,  sv,  N ]]
    // Atb = [suy, svy, sby]

    const AtA = [
        [suu, suv, su],
        [suv, svv, sv],
        [su, sv, sn]
    ];
    const Atb = [suy, svy, sbу];

    // Gaussian elimination on 3x3
    for (let i = 0; i < 3; i++) {
        let pivot = AtA[i][i];
        for (let j = i + 1; j < 3; j++) {
            const factor = AtA[j][i] / pivot;
            for (let k = i; k < 3; k++) AtA[j][k] -= factor * AtA[i][k];
            Atb[j] -= factor * Atb[i];
        }
    }
    const coeffs = new Array(3);
    for (let i = 2; i >= 0; i--) {
        let sum = 0;
        for (let j = i + 1; j < 3; j++) sum += AtA[i][j] * coeffs[j];
        coeffs[i] = (Atb[i] - sum) / AtA[i][i];
    }
    return coeffs; // [a, b, c] → target = a*u + b*v + c
}

const [ax, bx, cx] = solveAffine(pairs, 'x');
const [ay, by, cy] = solveAffine(pairs, 'y');

console.log(`\nAffine transform:`);
console.log(`  x = ${ax.toFixed(4)}*u + ${bx.toFixed(4)}*v + ${cx.toFixed(2)}`);
console.log(`  y = ${ay.toFixed(4)}*u + ${by.toFixed(4)}*v + ${cy.toFixed(2)}`);

// Load raw projection
const geoJSON = JSON.parse(fs.readFileSync('public/maps/spain-communities.json', 'utf8'));
const projectionRaw = d3.geoMercator().fitSize([800, 600], geoJSON);

function projectPoint(lon, lat) {
    const [u, v] = projectionRaw([lon, lat]);
    const x = ax * u + bx * v + cx;
    const y = ay * u + by * v + cy;
    return [x, y];
}

// Calibration check
console.log('\n=== Calibración (errores) ===');
let totalErrX = 0, totalErrY = 0;
pairs.forEach(p => {
    const x = ax * p.u + bx * p.v + cx;
    const y = ay * p.u + by * p.v + cy;
    const errX = Math.abs(x - p.x), errY = Math.abs(y - p.y);
    totalErrX += errX; totalErrY += errY;
    console.log(`${p.name.padEnd(15)}: target(${p.x.toFixed(1)}, ${p.y.toFixed(1)}) → got(${x.toFixed(1)}, ${y.toFixed(1)}) err(${errX.toFixed(1)}, ${errY.toFixed(1)})`);
});
console.log(`Average error: X=${(totalErrX / pairs.length).toFixed(1)}, Y=${(totalErrY / pairs.length).toFixed(1)}`);

// Border point check
console.log('\n=== Puntos de frontera ===');
const checks = [
    { name: 'Caminha (borde PT norte)', lon: -8.83, lat: 41.87, svgRef: 'Pontevedra south ~[35,125]' },
    { name: 'Ayamonte (borde PT sur)', lon: -7.40, lat: 37.22, svgRef: 'Huelva SW ~[75,475]' },
    { name: 'Hendaya (FR-Gipuzkoa)', lon: -1.78, lat: 43.36, svgRef: 'Gipuzkoa N ~[355,30]' },
    { name: 'Gibraltar', lon: -5.35, lat: 36.14, svgRef: 'Ceuta ~[185,538]' },
    { name: 'Ceuta centro', lon: -5.30, lat: 35.89, svgRef: 'SVG M185.5,538.7' },
    { name: 'Melilla centro', lon: -2.94, lat: 35.29, svgRef: 'SVG M321.6,580.0' },
];
checks.forEach(p => {
    const [x, y] = projectPoint(p.lon, p.lat);
    console.log(`${p.name}: [${x.toFixed(1)}, ${y.toFixed(1)}]  (ref: ${p.svgRef})`);
});

// Generate paths - walk coordinates manually
const VB_XMIN = -200, VB_XMAX = 800, VB_YMIN = -100, VB_YMAX = 800;

function ringHasPointInBounds(ring) {
    return ring.some(([lon, lat]) => {
        const [x, y] = projectPoint(lon, lat);
        return x >= VB_XMIN && x <= VB_XMAX && y >= VB_YMIN && y <= VB_YMAX;
    });
}

function ringToPath(ring) {
    const pts = ring.map(([lon, lat]) => projectPoint(lon, lat));
    return 'M' + pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join('L') + 'Z';
}

function featureToPath(feature) {
    const geom = feature.geometry;
    const parts = [];
    if (geom.type === 'Polygon') {
        if (ringHasPointInBounds(geom.coordinates[0])) {
            parts.push(geom.coordinates.map(ringToPath).join(' '));
        }
    } else if (geom.type === 'MultiPolygon') {
        for (const poly of geom.coordinates) {
            if (ringHasPointInBounds(poly[0])) {
                parts.push(poly.map(ringToPath).join(' '));
            }
        }
    }
    return parts.join(' ');
}

const worldData = JSON.parse(fs.readFileSync('public/maps/world-countries-50m.json', 'utf8'));
const worldFeatures = topojson.feature(worldData, worldData.objects.countries).features;

const TARGETS = ['Portugal', 'France', 'Andorra', 'Morocco', 'Algeria'];

let output = `// Generated with Affine Transform v5 - calibrated to match Spain Provinces Map\n`;
output += `// Affine: x = ${ax.toFixed(4)}*u + ${bx.toFixed(4)}*v + ${cx.toFixed(2)}\n`;
output += `// Affine: y = ${ay.toFixed(4)}*u + ${by.toFixed(4)}*v + ${cy.toFixed(2)}\n`;
output += `// DO NOT EDIT MANUALLY - regenerate with generate_spain_provinces_neighbors_v5.mjs\n`;
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

const [gibX, gibY] = projectPoint(-5.35, 36.14);
output += `    "Gibraltar": "M${gibX.toFixed(0)},${gibY.toFixed(0)} m-2,0 a2,2 0 1,0 4,0 a2,2 0 1,0 -4,0",\n`;
console.log(`\nGibraltar: [${gibX.toFixed(1)}, ${gibY.toFixed(1)}]`);

output += `};\n`;
fs.writeFileSync('src/components/games/data/spain-neighbors-provinces-paths.ts', output);
console.log('\nDone! Generated: src/components/games/data/spain-neighbors-provinces-paths.ts');
