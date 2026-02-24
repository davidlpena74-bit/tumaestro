
import fs from 'fs';
import { geoMercator, geoPath } from 'd3-geo';
import * as topojson from 'topojson-client';

// ViewBox visible area (with some margin): x: -200 to 800, y: -50 to 750
const VB_XMIN = -200, VB_XMAX = 800;
const VB_YMIN = -50, VB_YMAX = 750;

// Same projection as Spain communities
const communitiesGeoJSON = JSON.parse(fs.readFileSync('public/maps/spain-communities.json', 'utf8'));
const mainlandFeatures = communitiesGeoJSON.features.filter(f => f.properties.name !== 'Canarias');
const projection = geoMercator()
    .fitExtent([[50, 20], [680, 600]], { type: "FeatureCollection", features: mainlandFeatures })
    .clipExtent([[VB_XMIN, VB_YMIN], [VB_XMAX, VB_YMAX]]);
const pathGen = geoPath().projection(projection);

const worldData = JSON.parse(fs.readFileSync('public/maps/world-countries-50m.json', 'utf8'));
const worldFeatures = topojson.feature(worldData, worldData.objects.countries).features;

// Filter a feature's polygons to only those that overlap the viewBox
function clipToViewbox(feature) {
    const geom = feature.geometry;

    if (geom.type === 'Polygon') {
        const bounds = pathGen.bounds(feature);
        const [minX, minY] = bounds[0], [maxX, maxY] = bounds[1];
        // Keep if overlaps viewbox
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

const TARGETS = ['Portugal', 'France', 'Andorra', 'Morocco', 'Algeria'];

let output = `// Generated: Neighboring countries in Spain map projection (clipped to viewBox)\n`;
output += `export const SPAIN_NEIGHBORS_PATHS: Record<string, string> = {\n`;

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

// Manual entry for Gibraltar (not in 50m world dataset normally)
// Gibraltar position: x=232.8, y=509.3
output += `    "Gibraltar": "M233,509 m-2,0 a2,2 0 1,0 4,0 a2,2 0 1,0 -4,0",\n`;

output += `};\n`;
fs.writeFileSync('src/components/games/data/spain-neighbors-paths.ts', output);
console.log('Done!');
