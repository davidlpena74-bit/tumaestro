// Script to extract Spain's SVG path using Africa map projection
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import topojson from 'topojson-client';
import { geoPath, geoMiller } from 'd3-geo';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Use the same projection parameters as africa-paths.ts
// After processing with boundingBox [-25,-40] to [55,47]
// We need to find the actual projection params
const africaPathsFile = path.resolve(__dirname, '../web/src/components/games/data/africa-paths.ts');
const content = fs.readFileSync(africaPathsFile, 'utf8');

// Extract projection params
const scaleMatch = content.match(/"scale":\s*([\d.]+)/);
const translateMatch = content.match(/"translate":\s*\[\s*([\d.]+),\s*([\d.]+)\s*\]/);

const scale = parseFloat(scaleMatch[1]);
const tx = parseFloat(translateMatch[1]);
const ty = parseFloat(translateMatch[2]);

console.log('Projection params:', { scale, tx, ty });

// Build projection
const proj = geoMiller().scale(scale).translate([tx, ty]);
const pathGenerator = geoPath(proj);

// Load world data
const worldPath = path.resolve(__dirname, '../web/public/maps/world-countries-50m.json');
const worldData = JSON.parse(fs.readFileSync(worldPath, 'utf8'));

const layer = Object.keys(worldData.objects)[0];
const features = topojson.feature(worldData, worldData.objects[layer]).features;

const spain = features.find(f => f.properties.name === 'Spain' || f.properties.name_en === 'Spain');
if (!spain) {
    console.error('Spain not found!');
    console.log('Available names:', features.slice(0, 20).map(f => f.properties.name));
    process.exit(1);
}

const spainPath = pathGenerator(spain.geometry);
console.log('\n=== SPAIN SVG PATH ===');
console.log(spainPath ? spainPath.substring(0, 200) + '...' : 'NULL - Spain not in projection bounds');
console.log('\nFull path length:', spainPath?.length);

if (spainPath) {
    console.log('\n=== ADD TO AfricaMapGame.tsx backgroundPaths ===');
    console.log(`'Spain': \`${spainPath.substring(0, 100)}...\``);

    // Save full path to a file
    fs.writeFileSync(path.resolve(__dirname, 'spain_path.txt'), spainPath);
    console.log('\nFull path saved to tmp/spain_path.txt');
}
