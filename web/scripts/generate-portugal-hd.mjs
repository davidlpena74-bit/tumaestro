import { readFileSync } from 'fs';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const require = createRequire(import.meta.url);

const topojson = require('topojson-client');
const d3geo = require('d3-geo');
const composite = require(join(root, 'node_modules/d3-composite-projections/d3-composite-projections.js'));

const communitiesData = JSON.parse(readFileSync(join(root, 'public/maps/spain-communities.json'), 'utf8'));

const projection = composite.geoConicConformalSpain();
projection.fitExtent([[-140, 0], [700, 700]], communitiesData);

const pathGenerator = d3geo.geoPath(projection);

const worldData = JSON.parse(readFileSync(join(root, 'public/maps/world-countries-10m.json'), 'utf8'));
const countries = topojson.feature(worldData, worldData.objects.countries);

const portugal = countries.features.find(f => String(f.id) === '620');

if (!portugal) {
    console.error('Portugal not found! IDs:', countries.features.slice(0, 10).map(f => f.id).join(', '));
    process.exit(1);
}

const path = pathGenerator(portugal);
console.log('✅ Portugal HD path generated!\n');
console.log(`"Portugal": "${path}",`);
