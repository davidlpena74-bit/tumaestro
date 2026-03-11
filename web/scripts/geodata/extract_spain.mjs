import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import topojson from 'topojson-client';
import { geoPath } from 'd3-geo';
import { getD3Projection } from './modules/Projection.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Read current projection params from africa-paths.ts
const africaPathsFile = path.resolve(__dirname, '../../src/components/games/data/africa-paths.ts');
const content = fs.readFileSync(africaPathsFile, 'utf8');

const scaleMatch = content.match(/"scale":\s*([\d.]+)/);
const translateMatch = content.match(/"translate":\s*\[\s*([\d.]+),\s*([\d.]+)\s*\]/);

const scale = parseFloat(scaleMatch[1]);
const tx = parseFloat(translateMatch[1]);
const ty = parseFloat(translateMatch[2]);

console.log('Projection params:', { scale, tx, ty });

// Rebuild projection with same params (miller, same scale/translate)
const boundingBox = {
    type: "LineString",
    coordinates: [[-25, -40], [55, 47]]
};
const proj = getD3Projection('miller', boundingBox, [[40, 40], [760, 560]]);
// Override with exact scale and translate from the file
proj.scale(scale).translate([tx, ty]);

const pathGenerator = geoPath(proj);

const worldPath = path.resolve(__dirname, '../../public/maps/world-countries-50m.json');
const worldData = JSON.parse(fs.readFileSync(worldPath, 'utf8'));

const layer = Object.keys(worldData.objects)[0];
const features = topojson.feature(worldData, worldData.objects[layer]).features;

const spain = features.find(f =>
    f.properties.name === 'Spain' ||
    f.properties.name_en === 'Spain' ||
    (f.properties.name && f.properties.name.toLowerCase().includes('spain'))
);

if (!spain) {
    console.error('Spain not found!');
    const names = features.map(f => f.properties.name).filter(Boolean).sort();
    console.log('Sample names:', names.slice(0, 30));
    process.exit(1);
}

console.log('Found Spain:', spain.properties.name);
const spainPath = pathGenerator(spain.geometry);
console.log('Spain path:', spainPath ? `FOUND (${spainPath.length} chars)` : 'NULL');

if (spainPath) {
    const outPath = path.resolve(__dirname, '../../../tmp/spain_path.txt');
    fs.writeFileSync(outPath, spainPath);
    console.log(`\nPath saved to: ${outPath}`);
    console.log('First 300 chars:', spainPath.substring(0, 300));
}
