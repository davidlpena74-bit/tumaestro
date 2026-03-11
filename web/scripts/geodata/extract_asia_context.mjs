// Extract Middle East / Asian context countries for Africa map
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import topojson from 'topojson-client';
import { geoPath } from 'd3-geo';
import { getD3Projection } from './modules/Projection.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Read projection params from africa-paths.ts
const africaPathsFile = path.resolve(__dirname, '../../src/components/games/data/africa-paths.ts');
const content = fs.readFileSync(africaPathsFile, 'utf8');
const scaleMatch = content.match(/"scale":\s*([\d.]+)/);
const translateMatch = content.match(/"translate":\s*\[\s*([\d.]+),\s*([\d.]+)\s*\]/);

const scale = parseFloat(scaleMatch[1]);
const tx = parseFloat(translateMatch[1]);
const ty = parseFloat(translateMatch[2]);

console.log('Projection:', { scale, tx, ty });

// Build same projection as Africa map
const boundingBox = { type: "LineString", coordinates: [[-25, -40], [55, 47]] };
const proj = getD3Projection('miller', boundingBox, [[40, 40], [760, 560]]);
proj.scale(scale).translate([tx, ty]);
const pathGenerator = geoPath(proj);

// Load world data
const worldPath = path.resolve(__dirname, '../../public/maps/world-countries-50m.json');
const worldData = JSON.parse(fs.readFileSync(worldPath, 'utf8'));
const layer = Object.keys(worldData.objects)[0];
const features = topojson.feature(worldData, worldData.objects[layer]).features;

// Asian/Middle East countries visible near Africa
const targets = [
    'Saudi Arabia', 'Yemen', 'Oman', 'Jordan', 'Israel', 'Palestine',
    'Syria', 'Turkey', 'Iraq', 'Iran', 'Lebanon', 'Kuwait',
    'United Arab Emirates', 'Qatar', 'Bahrain', 'Cyprus',
    'Pakistan', 'India', 'Afghanistan'
];

const results = {};
for (const name of targets) {
    const f = features.find(f =>
        f.properties.name === name ||
        f.properties.name_en === name ||
        (f.properties.name && f.properties.name.toLowerCase() === name.toLowerCase())
    );
    if (!f) { console.log(`Not found: ${name}`); continue; }
    const p = pathGenerator(f.geometry);
    if (p) {
        results[name] = p;
        console.log(`✓ ${name} (${p.length} chars)`);
    } else {
        console.log(`✗ ${name} - outside projection bounds`);
    }
}

console.log(`\nTotal: ${Object.keys(results).length} countries`);
fs.writeFileSync(
    path.resolve(__dirname, '../../../tmp/asia_context_paths.json'),
    JSON.stringify(results, null, 2)
);
console.log('Saved to tmp/asia_context_paths.json');
