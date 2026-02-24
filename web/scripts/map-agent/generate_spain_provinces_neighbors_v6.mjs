
import fs from 'fs';
import * as d3 from 'd3-geo';
import * as topojson from 'topojson-client';

// ============================================================
// CALIBRACIÓN CON PUNTOS FRONTERIZOS REALES
// Para cada punto de calibración, tenemos:
//   lon, lat  → coordenadas geográficas exactas del punto fronterizo
//   x, y      → coordenadas SVG donde aparece ese punto en el mapa de provincias
//
// Los puntos SVG se leen del archivo spanish-provinces.ts mirando
// las provincias fronterizas en sus extremos.
// ============================================================

const borderPairs = [
    // === FRONTERA CON PORTUGAL ===
    // Sur de Pontevedra (río Miño): el borde sur de Pontevedra toca Portugal
    { name: 'Minho norte PT-ES', lon: -8.87, lat: 41.87, x: 18, y: 126 },
    // Extremo oeste de Huelva (borde con Portugal/Guadiana)
    { name: 'Huelva oeste PT-ES', lon: -7.40, lat: 37.72, x: 76, y: 430 },

    // === FRONTERA CON FRANCIA ===
    // Norte de Gipuzkoa (Hendaya - frontera FR)
    { name: 'Hendaya FR-Gipuzkoa', lon: -1.78, lat: 43.36, x: 373, y: 30 },
    // Norte de Girona (Cap de Creus área - frontera FR)
    { name: 'La Jonquera FR-Girona', lon: 2.86, lat: 42.42, x: 615, y: 83 },

    // === COSTA NORTE (para escala vertical) ===
    // Norte de Asturias  
    { name: 'Costa Asturias', lon: -6.00, lat: 43.57, x: 168, y: 22 },

    // === FRONTERA SUR (África) ===
    // Ceuta (territorio español EN África - referencia exacta)
    { name: 'Ceuta', lon: -5.30, lat: 35.89, x: 185.5, y: 538.7 },
    // Melilla (territorio español EN África - referencia exacta)
    { name: 'Melilla', lon: -2.94, lat: 35.29, x: 321.6, y: 580.0 },

    // === INTERIOR (para estabilizar la transformación) ===
    // Madrid (bien calibrado)
    { name: 'Madrid', lon: -3.70, lat: 40.40, x: 287, y: 226 },
    // Barcelona
    { name: 'Barcelona', lon: 2.10, lat: 41.40, x: 555, y: 195 },
    // Sevilla
    { name: 'Sevilla', lon: -5.99, lat: 37.39, x: 164, y: 456 },
    // Galicia centroid
    { name: 'Galicia', lon: -7.86, lat: 42.70, x: 62, y: 80 },
    // Valencia
    { name: 'Valencia', lon: -0.50, lat: 39.47, x: 454, y: 306 },
];

// Proyección Mercator raw para convertir lon/lat → (u, v)
// Usamos una proyección "neutral" de Mercator sin fitSize para evitar
// el sesgo del area de España+Canarias
// raw_x = lon * π/180
// raw_y = ln(tan(π/4 + lat*π/180/2))

function mercatorRaw(lon, lat) {
    const λ = lon * Math.PI / 180;
    const φ = lat * Math.PI / 180;
    return [λ, Math.log(Math.tan(Math.PI / 4 + φ / 2))];
}

// Solve affine transform: x = ax*u + bx*v + cx, y = ay*u + by*v + cy
// using least squares
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

    // 3×3 system: [[suu, suv, su], [suv, svv, sv], [su, sv, N]] * [a,b,c] = [sub, svb, sb]
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

// Preparar pares con coordenadas raw de Mercator
const pairs = borderPairs.map(p => {
    const [u, v] = mercatorRaw(p.lon, p.lat);
    return { ...p, u, v };
});

console.log('\nCoordenadas Mercator raw de los puntos de calibración:');
pairs.forEach(p => console.log(`  ${p.name}: u=${p.u.toFixed(4)}, v=${p.v.toFixed(4)}`));

const { ax, bx, cx, ay, by, cy } = solveAffine(pairs);

console.log(`\nTransformación afín resultante:`);
console.log(`  x = ${ax.toFixed(2)}*u + ${bx.toFixed(2)}*v + ${cx.toFixed(2)}`);
console.log(`  y = ${ay.toFixed(2)}*u + ${by.toFixed(2)}*v + ${cy.toFixed(2)}`);

function projectPoint(lon, lat) {
    const [u, v] = mercatorRaw(lon, lat);
    return [ax * u + bx * v + cx, ay * u + by * v + cy];
}

// Verificación de calibración
console.log('\n=== Verificación (errores en px) ===');
pairs.forEach(p => {
    const [gx, gy] = projectPoint(p.lon, p.lat);
    console.log(`${p.name.padEnd(22)}: target(${p.x.toFixed(0)},${p.y.toFixed(0)}) → got(${gx.toFixed(0)},${gy.toFixed(0)}) err(${(gx - p.x).toFixed(1)},${(gy - p.y).toFixed(1)})`);
});

// Puntos extra de verificación
console.log('\n=== Puntos extra de verificación ===');
const checks = [
    { name: 'Lisboa PT', lon: -9.14, lat: 38.72, ref: 'centro Portugal' },
    { name: 'Paris FR', lon: 2.35, lat: 48.85, ref: 'fuera del viewport, y<0' },
    { name: 'Burdeos FR', lon: -0.58, lat: 44.84, ref: 'frontera sur Francia' },
    { name: 'Marrakech MA', lon: -8.01, lat: 31.63, ref: 'sur de Marruecos' },
    { name: 'Tanger MA', lon: -5.80, lat: 35.77, ref: 'norte Marruecos' },
    { name: 'Algiers DZ', lon: 3.06, lat: 36.74, ref: 'norte Argelia' },
    { name: 'Andorra', lon: 1.52, lat: 42.55, ref: 'debe estar en y≈57-75' },
];
checks.forEach(p => {
    const [x, y] = projectPoint(p.lon, p.lat);
    console.log(`${p.name.padEnd(18)}: [${x.toFixed(0)}, ${y.toFixed(0)}]  (${p.ref})`);
});

// Generar paths
const VB_XMIN = -200, VB_XMAX = 800, VB_YMIN = -100, VB_YMAX = 800;

function ringHasPointInBounds(ring) {
    return ring.some(([lon, lat]) => {
        const [x, y] = projectPoint(lon, lat);
        return x >= VB_XMIN && x <= VB_XMAX && y >= VB_YMIN && y <= VB_YMAX;
    });
}

function ringToPath(ring) {
    return 'M' + ring.map(([lon, lat]) => {
        const [x, y] = projectPoint(lon, lat);
        return `${x.toFixed(1)},${y.toFixed(1)}`;
    }).join('L') + 'Z';
}

function featureToPath(feature) {
    const geom = feature.geometry;
    const parts = [];
    const polys = geom.type === 'Polygon' ? [geom.coordinates] : geom.coordinates;
    for (const poly of polys) {
        if (ringHasPointInBounds(poly[0])) {
            parts.push(poly.map(ringToPath).join(' '));
        }
    }
    return parts.join(' ');
}

const worldData = JSON.parse(fs.readFileSync('public/maps/world-countries-50m.json', 'utf8'));
const worldFeatures = topojson.feature(worldData, worldData.objects.countries).features;

const TARGETS = ['Portugal', 'France', 'Andorra', 'Morocco', 'Algeria'];

let output = `// Generated with Border-Calibrated Affine Transform v6\n`;
output += `// Calibrated using Spain border points (Ceuta, Melilla, France border, Portugal border)\n`;
output += `// x = ${ax.toFixed(2)}*lon_rad + ${bx.toFixed(2)}*mercator_y + ${cx.toFixed(2)}\n`;
output += `// y = ${ay.toFixed(2)}*lon_rad + ${by.toFixed(2)}*mercator_y + ${cy.toFixed(2)}\n`;
output += `export const SPAIN_PROVINCES_NEIGHBORS_PATHS: Record<string, string> = {\n`;

TARGETS.forEach(name => {
    const feature = worldFeatures.find(f => f.properties.name === name);
    if (!feature) return;
    const d = featureToPath(feature);
    if (d) {
        output += `    "${name}": "${d}",\n`;
        console.log(`\nGenerated: ${name} (${d.length} chars)`);
    }
});

const [gibX, gibY] = projectPoint(-5.35, 36.14);
output += `    "Gibraltar": "M${gibX.toFixed(0)},${gibY.toFixed(0)} m-2,0 a2,2 0 1,0 4,0 a2,2 0 1,0 -4,0",\n`;
console.log(`Gibraltar: [${gibX.toFixed(0)}, ${gibY.toFixed(0)}]`);

output += `};\n`;
fs.writeFileSync('src/components/games/data/spain-neighbors-provinces-paths.ts', output);
console.log('\nDone!');
