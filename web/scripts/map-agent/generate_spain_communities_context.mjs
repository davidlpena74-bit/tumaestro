
import fs from 'fs';
import * as topojson from 'topojson-client';

// ============================================================
// CALIBRATION (FROM V7) - Exact affine transform to match communities map
// ============================================================
const borderPairs = [
    { name: 'NW Tip (ACoruna)', lon: -9.3, lat: 43.8, x: 0, y: 0 },
    { name: 'NE Tip (Girona)', lon: 3.33, lat: 42.32, x: 633.7, y: 100 },
    { name: 'South Tip (Tarifa)', lon: -5.60, lat: 36.00, x: 178, y: 532.9 },
    { name: 'Hendaya (FR)', lon: -1.78, lat: 43.36, x: 373, y: 30.6 },
    { name: 'Ceuta', lon: -5.30, lat: 35.89, x: 185.5, y: 538.7 },
    { name: 'Melilla', lon: -2.94, lat: 35.29, x: 321.6, y: 580.0 },
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
console.log('COEFFICIENTS:', { ax, bx, cx, ay, by, cy });

function projectPoint(lon, lat) {
    const [u, v] = mercatorRaw(lon, lat);
    return [ax * u + bx * v + cx, ay * u + by * v + cy];
}

// ============================================================
// DATA LOADING
// ============================================================
const worldData = JSON.parse(fs.readFileSync('public/maps/world-countries.json', 'utf8'));
const worldFeatures = topojson.feature(worldData, worldData.objects.countries).features;

const TARGETS = ['Portugal', 'France', 'Andorra', 'Morocco', 'Algeria'];

let output = `// Generated with Precise Affine Transformation (Refined Border Calibration v7)\n`;
output += `export const SPAIN_NEIGHBORS_PATHS: Record<string, string> = {\n`;

function ringToPath(ring) {
    return 'M' + ring.map(([lon, lat]) => {
        const [x, y] = projectPoint(lon, lat);
        return `${x.toFixed(1)},${y.toFixed(1)}`;
    }).join('L') + 'Z';
}

TARGETS.forEach(name => {
    const feature = worldFeatures.find(f => f.properties.name === name);
    if (!feature) { console.log(`NOT FOUND: ${name}`); return; }

    // Simple clipping: only keep points within reasonable bounds for the browser
    // This prevents extreme coordinates if the feature extends far beyond Europe
    const geom = feature.geometry;
    const polys = geom.type === 'Polygon' ? [geom.coordinates] : geom.coordinates;

    const paths = polys.map(poly => {
        // poly[0] is outer ring
        const outer = poly[0].map(p => projectPoint(p[0], p[1]));

        // Simple bounding box check to see if it's visible in our viewBox area
        // ViewBox is roughly -220 to 800+
        const minX = Math.min(...outer.map(p => p[0]));
        const maxX = Math.max(...outer.map(p => p[0]));
        const minY = Math.min(...outer.map(p => p[1]));
        const maxY = Math.max(...outer.map(p => p[1]));

        if (maxX < -500 || minX > 1500 || maxY < -500 || minY > 1500) return null;

        return 'M' + outer.map(p => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join('L') + 'Z';
    }).filter(p => p !== null);

    if (paths.length > 0) {
        output += `    "${name}": "${paths.join(' ')}",\n`;
    }
});

// Gibraltar
const [gx, gy] = projectPoint(-5.35, 36.14);
output += `    "Gibraltar": "M${gx.toFixed(1)},${gy.toFixed(1)} m-1,0 a1,1 0 1,0 2,0 a1,1 0 1,0 -2,0",\n`;

output += `};\n`;

fs.writeFileSync('src/components/games/data/spain-neighbors-paths.ts', output);
console.log('✅ Generated Precise Neighbors Paths');
