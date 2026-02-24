
import fs from 'fs';
import { geoMercator, geoPath } from 'd3-geo';
import * as topojson from 'topojson-client';

// ============================================================
// OBJETIVO: Generar vecinos de España para el Mapa de PROVINCIAS
// usando la misma proyección que el Mapa de COMUNIDADES
// pero recalibrando para que encaje con las coordenadas de las provincias.
// ============================================================

// El mapa de Provincias usa un viewport diferente al de Comunidades.
// Las provincias tienen coordenadas que van de ~0 a ~700 en X y ~0 a ~600 en Y.
// Según el MapaProvinciasClient:
//   viewBox="-140 0 840 700"
//   insetFrame={{ x: -190, y: 490, width: 280, height: 180 }}
//   Las Canarias se mueven con: translate(-615, 109) -> para moverlas al inset frame

// Al analizar las coordenadas reales de las provincias (ejemplo baleares empieza en ~550,270)
// y compararlas con las de comunidades, la proyección de provincias tiene:
// - Un extent diferente, centrado más hacia la derecha y arriba

// Analizamos las coordenadas de provincias que conocemos:
// - Galicia (acoruna): x ≈ 0-80, y ≈ 0-130
// - Cataluña (barcelona): x ≈ 550-630, y ≈ 80-155
// - Andalucía (malaga): x ≈ 150-275, y ≈ 450-520
// - Baleares: x ≈ 540-700, y ≈ 250-360
// - Canarias: x ≈ 500-630, y ≈ 450-500 (antes del translate)

// Esto corresponde a un mapa de la Península Ibérica proyectado con:
// fitExtent aproximado de [[0, 0], [700, 600]] sobre la colección de provincias

// Usamos el mismo GeoJSON de comunidades para definir la projection,
// y ajustamos el extent para que coincida con las coordenadas reales de las provincias.
// Basándonos en los puntos conocidos:
// - Galicia (comunidades centroid ~66, 80) -> provincias acoruna ~35, 65
// - Cataluña (comunidades centroid ~560, 194) -> provincias barcelona ~590, 120

// La proyección de provincias tiene un extent aprox: [[0, 0], [700, 580]]
// Para el mainland spain (sin Canarias)

const VB_XMIN = -200, VB_XMAX = 800;
const VB_YMIN = -50, VB_YMAX = 750;

// Cargamos el GeoJSON de comunidades de España para definir la proyección base
const communitiesGeoJSON = JSON.parse(fs.readFileSync('public/maps/spain-communities.json', 'utf8'));

// Filtramos solo la península (sin Canarias) para el fitExtent
const mainlandFeatures = communitiesGeoJSON.features.filter(f =>
    f.properties.name !== 'Canarias' &&
    f.properties.name !== 'Ceuta' &&
    f.properties.name !== 'Melilla'
);

// Proyección calibrada para el mapa de PROVINCIAS
// Basándonos en los límites reales de las provincias en su SVG:
// - Las provincias ocupan aproximadamente de (0,0) a (700,600) en coordenadas SVG
// - La lógica del MapaProvincias usa viewBox="-140 0 840 700"
// Esto es equivalente a usar un fitExtent ligeramente más pequeño que el de comunidades
const projection = geoMercator()
    .fitExtent([[0, 0], [700, 600]], { type: "FeatureCollection", features: mainlandFeatures })
    .clipExtent([[VB_XMIN, VB_YMIN], [VB_XMAX, VB_YMAX]]);

const pathGen = geoPath().projection(projection);

// Cargamos los datos del mundo
const worldData = JSON.parse(fs.readFileSync('public/maps/world-countries-50m.json', 'utf8'));
const worldFeatures = topojson.feature(worldData, worldData.objects.countries).features;

// Filtrar polígonos al viewbox
function clipToViewbox(feature) {
    const geom = feature.geometry;

    if (geom.type === 'Polygon') {
        const bounds = pathGen.bounds(feature);
        const [minX, minY] = bounds[0], [maxX, maxY] = bounds[1];
        if (maxX < VB_XMIN || minX > VB_XMAX || maxY < VB_YMIN || minY > VB_YMAX) return null;
        return feature;
    }

    if (geom.type === 'MultiPolygon') {
        const keptPolys = geom.coordinates.filter(poly => {
            const f = { type: 'Feature', geometry: { type: 'Polygon', coordinates: poly }, properties: {} };
            const bounds = pathGen.bounds(f);
            const [minX, minY] = bounds[0], [maxX, maxY] = bounds[1];
            return !(maxX < VB_XMIN || minX > VB_XMAX || maxY < VB_YMIN || minY > VB_YMAX);
        });
        if (keptPolys.length === 0) return null;
        return { ...feature, geometry: { type: 'MultiPolygon', coordinates: keptPolys } };
    }

    return feature;
}

// Verificamos la calibración comparando algunas provincias con sus bounds proyectados
// Proyectamos el punto central de algunas comunidades para ver si coincide
const calibrationPoints = [
    { name: 'Galicia centro', lon: -8.0, lat: 42.7 },
    { name: 'Cataluña centro', lon: 1.7, lat: 41.8 },
    { name: 'Andalucía centro', lon: -4.5, lat: 37.5 },
    { name: 'Madrid centro', lon: -3.7, lat: 40.4 },
];

console.log('\n=== Calibración de proyección ===');
calibrationPoints.forEach(p => {
    const [x, y] = projection([p.lon, p.lat]);
    console.log(`${p.name}: [${x.toFixed(1)}, ${y.toFixed(1)}]`);
});
console.log('=== Coordenadas esperadas aprox ===');
console.log('Galicia: ~[50, 80]');
console.log('Cataluña: ~[560, 135]');
console.log('Andalucía: ~[250, 420]');
console.log('Madrid: ~[290, 220]');
console.log();

const TARGETS = ['Portugal', 'France', 'Andorra', 'Morocco', 'Algeria'];

let output = `// Generated: Neighboring countries for Spain Provinces Map\n`;
output += `// Using same Mercator projection fitted to mainland Spain provinces\n`;
output += `export const SPAIN_PROVINCES_NEIGHBORS_PATHS: Record<string, string> = {\n`;

TARGETS.forEach(name => {
    const feature = worldFeatures.find(f => f.properties.name === name);
    if (!feature) { console.log(`NOT FOUND: ${name}`); return; }

    const clipped = clipToViewbox(feature);
    if (!clipped) { console.log(`OUTSIDE VIEWBOX: ${name}`); return; }

    const d = pathGen(clipped);
    if (d) {
        const bounds = pathGen.bounds(clipped);
        output += `    "${name}": "${d}",\n`;
        console.log(`${name}: x=[${bounds[0][0].toFixed(0)},${bounds[1][0].toFixed(0)}] y=[${bounds[0][1].toFixed(0)},${bounds[1][1].toFixed(0)}]`);
    }
});

// Gibraltar en coordenadas del mapa de provincias
// En el mapa de comunidades, Gibraltar está en x=232.8, y=509.3
// En el mapa de provincias, el punto del estrecho de Gibraltar está aproximadamente en:
const [gibX, gibY] = projection([-5.35, 36.14]); // Coordenadas reales de Gibraltar
output += `    "Gibraltar": "M${gibX.toFixed(0)},${gibY.toFixed(0)} m-2,0 a2,2 0 1,0 4,0 a2,2 0 1,0 -4,0",\n`;
console.log(`Gibraltar proyectado en: [${gibX.toFixed(1)}, ${gibY.toFixed(1)}]`);

output += `};\n`;
fs.writeFileSync('src/components/games/data/spain-neighbors-provinces-paths.ts', output);
console.log('\nDone! Archivo generado: src/components/games/data/spain-neighbors-provinces-paths.ts');
