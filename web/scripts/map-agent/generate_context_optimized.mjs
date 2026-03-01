
import { readFileSync, writeFileSync } from 'fs';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
import { projectPoint, getPathData } from './UnifiedProjection.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '../..');
const require = createRequire(import.meta.url);
const topojson = require('topojson-client');

// Load the 10m world data
const worldData = JSON.parse(readFileSync(join(root, 'public/maps/world-countries-10m.json'), 'utf8'));
const countries = topojson.feature(worldData, worldData.objects.countries);

// ========================
// CLIPPING HELPER
// ========================
function clipPolygonAtLatitude(ring, minLat) {
    const clippedRing = [];
    for (let i = 0; i < ring.length; i++) {
        const curr = ring[i];
        const next = ring[(i + 1) % ring.length];

        if (curr[1] >= minLat) {
            clippedRing.push(curr);
        }

        if ((curr[1] >= minLat && next[1] < minLat) || (curr[1] < minLat && next[1] >= minLat)) {
            const t = (minLat - curr[1]) / (next[1] - curr[1]);
            const lonAt = curr[0] + t * (next[0] - curr[0]);
            clippedRing.push([lonAt, minLat]);
        }
    }
    return clippedRing.length >= 3 ? clippedRing : null;
}

function clipFeatureAtLatitude(feature, minLat) {
    const geom = feature.geometry;
    const polys = geom.type === 'Polygon' ? [geom.coordinates] : geom.coordinates;

    const clippedPolys = polys.map(polygon => {
        return polygon.map(ring => clipPolygonAtLatitude(ring, minLat)).filter(r => r !== null);
    }).filter(p => p.length > 0);

    if (clippedPolys.length === 0) return null;

    return {
        ...feature,
        geometry: geom.type === 'Polygon'
            ? { ...geom, type: 'Polygon', coordinates: clippedPolys[0] }
            : { ...geom, type: 'MultiPolygon', coordinates: clippedPolys }
    };
}

// ========================
// GENERATE CLIPPED CONTEXT
// ========================
const portugal = countries.features.find(f => String(f.id) === '620');
const andorra = countries.features.find(f => String(f.id) === '020');
const france = countries.features.find(f => String(f.id) === '250');
const morocco = countries.features.find(f => String(f.id) === '504');
const algeria = countries.features.find(f => String(f.id) === '012');

// Morocco: clip at 33°N (keep northern 1/5)
const morNorthLat = 35.93;
const morSouthLat = 21.42;
const morSpan = morNorthLat - morSouthLat;
const MOROCCO_CLIP_LAT = morNorthLat - (morSpan / 5); // ≈ 33°N

console.log(`Morocco clip latitude: ${MOROCCO_CLIP_LAT.toFixed(2)}°N (1/5 from north)`);

const clippedMorocco = clipFeatureAtLatitude(morocco, MOROCCO_CLIP_LAT);

// Algeria: clip at same latitude as Morocco (only show northern strip visible in viewBox)
const clippedAlgeria = clipFeatureAtLatitude(algeria, MOROCCO_CLIP_LAT);

// Get paths
const moroccoPath = clippedMorocco ? getPathData(clippedMorocco) : '';
const algeriaClippedPath = clippedAlgeria ? getPathData(clippedAlgeria) : '';

// Also clip unnecessary viewBox-external polygons from context paths
// For Portugal, France: filter out sub-polygons that are entirely outside viewBox
function getPathDataClippedToViewBox(feature, margin = 200) {
    if (!feature || !feature.geometry) return "";
    const geom = feature.geometry;
    const polys = geom.type === 'Polygon' ? [geom.coordinates] : geom.coordinates;

    // ViewBox: -92, -41, 675, 675 → visible area with margin
    const xMin = -92 - margin, xMax = 583 + margin;
    const yMin = -41 - margin, yMax = 634 + margin;

    return polys.map(poly => {
        return poly.map(ring => {
            const projected = ring.map(p => projectPoint(p[0], p[1]));

            // Check if any point of this ring/polygon is within the extended viewBox
            const isVisible = projected.some(([x, y]) =>
                x >= xMin && x <= xMax && y >= yMin && y <= yMax
            );

            if (!isVisible) return null;

            return 'M' + projected.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join('L') + 'Z';
        }).filter(r => r !== null).join(' ');
    }).filter(s => s.length > 0).join(' ');
}

const portugalPath = getPathDataClippedToViewBox(portugal);
const francePath = getPathDataClippedToViewBox(france);
const andorraPath = getPathData(andorra);

// Algeria: use the latitude-clipped version, then also filter polygons to viewBox
const algeriaPath = (() => {
    if (!clippedAlgeria) return '';
    // Apply viewBox polygon filter to the already lat-clipped Algeria
    const geom = clippedAlgeria.geometry;
    const polys = geom.type === 'Polygon' ? [geom.coordinates] : geom.coordinates;
    const margin = 200;
    const xMin = -92 - margin, xMax = 583 + margin;
    const yMin = -41 - margin, yMax = 634 + margin;

    return polys.map(poly => {
        return poly.map(ring => {
            const projected = ring.map(p => projectPoint(p[0], p[1]));
            const isVisible = projected.some(([x, y]) =>
                x >= xMin && x <= xMax && y >= yMin && y <= yMax
            );
            if (!isVisible) return null;
            return 'M' + projected.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join('L') + 'Z';
        }).filter(r => r !== null).join(' ');
    }).filter(s => s.length > 0).join(' ');
})();

console.log(`\n=== Optimized Context Paths ===`);
console.log(`Portugal: ${portugalPath.length} chars`);
console.log(`France:   ${francePath.length} chars`);
console.log(`Andorra:  ${andorraPath.length} chars`);
console.log(`Morocco:  ${moroccoPath.length} chars`);
console.log(`Algeria:  ${algeriaPath.length} chars (NEW - Morocco neighbor)`);

const totalNew = portugalPath.length + francePath.length + andorraPath.length + moroccoPath.length + algeriaPath.length;
console.log(`\nTotal: ${totalNew} chars`);

// Generate the output TS file
const tsContent = `// Context countries in Unified Projection
// Morocco & Algeria clipped at ${MOROCCO_CLIP_LAT.toFixed(1)}°N (northern 1/5 of Morocco)
// France & Portugal filtered to remove overseas territories outside viewBox
export const CONTEXT_PATHS: Record<string, string> = {
    "portugal": "${portugalPath}",
    "andorra": "${andorraPath}",
    "france": "${francePath}",
    "morocco": "${moroccoPath}",
    "algeria": "${algeriaPath}"
};
`;

writeFileSync(join(root, 'src/components/games/data/map-context-unified.ts'), tsContent);
console.log('\n✅ Generated optimized context paths (with Algeria)');
console.log(`   File: src/components/games/data/map-context-unified.ts`);
