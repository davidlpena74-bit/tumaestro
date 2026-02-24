
import fs from 'fs';
import * as d3 from 'd3-geo';
import * as topojson from 'topojson-client';

// ============================================================
// REFINED CALIBRATION USING LOGGED PROVINCE BOUNDS
// ============================================================

const borderPairs = [
    // 1. A Coruña NW tip (~Finisterre): lon -9.2, lat 42.9 (approx)
    // Provinces A Coruña minX=0, minY=0
    { name: 'NW Tip (ACoruna)', lon: -9.3, lat: 43.8, x: 0, y: 0 },

    // 2. Girona NE tip (Cap de Creus): lon 3.3, lat 42.3
    // Provinces Girona maxX=633.7, minY is around 85 for the tip
    { name: 'NE Tip (Girona)', lon: 3.33, lat: 42.32, x: 633.7, y: 100 },

    // 3. Cadiz Southern tip (Tarifa): lon -5.6, lat 36.0
    // Provinces Cadiz maxY=532.9, X is around 170
    { name: 'South Tip (Tarifa)', lon: -5.60, lat: 36.00, x: 178, y: 532.9 },

    // 4. Gipuzkoa (Hendaya/FR border): lon -1.78, lat 43.36
    // Provinces Gipuzkoa minY=30.6, maxX=376.7
    { name: 'Hendaya (FR)', lon: -1.78, lat: 43.36, x: 373, y: 30.6 },

    // 5. Ceuta (Exact reference point in Africa)
    { name: 'Ceuta', lon: -5.30, lat: 35.89, x: 185.5, y: 538.7 },

    // 6. Melilla (Exact reference point in Africa)
    { name: 'Melilla', lon: -2.94, lat: 35.29, x: 321.6, y: 580.0 },

    // 7. Pontevedra/Portugal border (Minho)
    // Pontevedra maxX=69.9, maxY=126.5. Southern tip of Pontevedra.
    { name: 'Minho (PT)', lon: -8.87, lat: 41.87, x: 18, y: 126.5 },
];

function mercatorRaw(lon, lat) {
    const λ = lon * Math.PI / 180;
    const φ = lat * Math.PI / 180;
    return [λ, Math.log(Math.tan(Math.PI / 4 + φ / 2))];
}

function solveAffine(pairs) {
    const N = pairs.length;
    let suu = 0, suv = 0, su = 0, svv = 0, sv = 0;
    let sux = 0, svx = 0, sx = 0;
    let suy = 0, svy = 0, sy = 0;

    for (const p of pairs) {
        suu += p.u * p.u; suv += p.u * p.v; su += p.u;
        svv += p.v * p.v; sv += p.v;
        sux += p.u * p.x; svx += p.v * p.x; sx += p.x;
        suy += p.u * p.y; svy += p.v * p.y; sy += p.y;
    }

    function solve3(AtA, Atb) {
        const A = AtA.map(r => [...r]);
        const b = [...Atb];
        for (let i = 0; i < 3; i++) {
            for (let j = i + 1; j < 3; j++) {
                const f = A[j][i] / A[i][i];
                for (let k = i; k < 3; k++) A[j][k] -= f * A[i][k];
                b[j] -= f * b[i];
            }
        }
        const x = [0, 0, 0];
        for (let i = 2; i >= 0; i--) {
            let s = 0; for (let j = i + 1; j < 3; j++) s += A[i][j] * x[j];
            x[i] = (b[i] - s) / A[i][i];
        }
        return x;
    }

    const M = [[suu, suv, su], [suv, svv, sv], [su, sv, N]];
    const [ax, bx, cx] = solve3(M, [sux, svx, sx]);
    const [ay, by, cy] = solve3(M, [suy, svy, sy]);
    return { ax, bx, cx, ay, by, cy };
}

const pairs = borderPairs.map(p => {
    const [u, v] = mercatorRaw(p.lon, p.lat);
    return { ...p, u, v };
});

const { ax, bx, cx, ay, by, cy } = solveAffine(pairs);

function projectPoint(lon, lat) {
    const [u, v] = mercatorRaw(lon, lat);
    return [ax * u + bx * v + cx, ay * u + by * v + cy];
}

console.log('\n--- VERIFICATION (px) ---');
pairs.forEach(p => {
    const [gx, gy] = projectPoint(p.lon, p.lat);
    console.log(`${p.name.padEnd(20)}: Target(${p.x.toFixed(1)},${p.y.toFixed(1)}) Got(${gx.toFixed(1)},${gy.toFixed(1)}) Err(${Math.abs(gx - p.x).toFixed(1)},${Math.abs(gy - p.y).toFixed(1)})`);
});

const worldData = JSON.parse(fs.readFileSync('public/maps/world-countries-50m.json', 'utf8'));
const worldFeatures = topojson.feature(worldData, worldData.objects.countries).features;

const TARGETS = ['Portugal', 'France', 'Andorra', 'Morocco', 'Algeria'];

let output = `// Generated with Refined Border Calibration v7\n`;
output += `export const SPAIN_PROVINCES_NEIGHBORS_PATHS: Record<string, string> = {\n`;

function ringToPath(ring) {
    return 'M' + ring.map(([lon, lat]) => {
        const [x, y] = projectPoint(lon, lat);
        return `${x.toFixed(1)},${y.toFixed(1)}`;
    }).join('L') + 'Z';
}

TARGETS.forEach(name => {
    const feature = worldFeatures.find(f => f.properties.name === name);
    if (!feature) return;
    const geom = feature.geometry;
    const polys = geom.type === 'Polygon' ? [geom.coordinates] : geom.coordinates;
    const d = polys.map(poly => poly.map(ringToPath).join(' ')).join(' ');
    output += `    "${name}": "${d}",\n`;
});

const [gibX, gibY] = projectPoint(-5.35, 36.14);
output += `    "Gibraltar": "M${gibX.toFixed(0)},${gibY.toFixed(0)} m-2,0 a2,2 0 1,0 4,0 a2,2 0 1,0 -4,0",\n`;

output += `};\n`;
fs.writeFileSync('src/components/games/data/spain-neighbors-provinces-paths.ts', output);
console.log('\nDone!');
