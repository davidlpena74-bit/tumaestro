'use strict';
const pathLib = require('path');
const fs = require('fs');
const root = pathLib.join(__dirname, '..');

const d3Geo = require('d3-geo');
const d3pathLib = require('d3-path');
const topojson = require('topojson-client');

// Setup global d3 for the UMD bundle (same as generate-official-maps.js)
global.d3 = { ...d3Geo, path: d3pathLib.path };
require(pathLib.join(root, 'node_modules/d3-composite-projections/d3-composite-projections.js'));

const geoConicConformalSpain = global.d3.geoConicConformalSpain;

const WORLD_JSON = pathLib.join(root, 'public/maps/world-countries-10m.json');
const COMMUNITIES_JSON = pathLib.join(root, 'public/maps/spain-communities.json');

const communities = JSON.parse(fs.readFileSync(COMMUNITIES_JSON, 'utf8'));
const worldRaw = JSON.parse(fs.readFileSync(WORLD_JSON, 'utf8'));
const worldFeatures = topojson.feature(worldRaw, worldRaw.objects.countries);

const AFRICA_IDS = [
    '504', '012', '732', '478', '788', '434', '466', '686', '262', '204', '120', '148', '174',
    '180', '232', '231', '270', '288', '324', '404', '450', '454', '480', '508', '516', '562',
    '566', '624', '646', '690', '694', '706', '710', '716', '728', '748', '768', '800', '818',
    '834', '854', '894'
];
const africaFeature = topojson.merge(worldRaw, worldRaw.objects.countries.geometries.filter(function (g) {
    return AFRICA_IDS.includes(String(g.id));
}));

const projection = geoConicConformalSpain();
const pathGenerator = d3Geo.geoPath(projection);

// EXACT same fitExtent as generate-official-maps.js
const fitFeatures = [
    ...communities.features,
    ...worldFeatures.features.filter(function (f) { return ['250', '620'].includes(String(f.id)); }),
    africaFeature
];
const fitData = { type: 'FeatureCollection', features: fitFeatures };
projection.fitExtent([[-240, -40], [750, 720]], fitData);

// Generate Portugal with this EXACT projection
const portugal = worldFeatures.features.find(function (f) { return String(f.id) === '620'; });
if (!portugal) { console.error('Portugal not found'); process.exit(1); }
const svgPath = pathGenerator(portugal);

// Update spain-neighbors-paths.ts
const filePath = pathLib.join(root, 'src/components/games/data/spain-neighbors-paths.ts');
let content = fs.readFileSync(filePath, 'utf8');

const startMarker = '"Portugal": "';
const startIdx = content.indexOf(startMarker);
if (startIdx === -1) { console.error('Portugal entry not found in file'); process.exit(1); }

const pathStart = startIdx + startMarker.length;
const pathEnd = content.indexOf('",', pathStart);
if (pathEnd === -1) { console.error('End of Portugal path not found'); process.exit(1); }

const newContent = content.substring(0, pathStart) + svgPath + content.substring(pathEnd);
fs.writeFileSync(filePath, newContent, 'utf8');

console.log('✅ spain-neighbors-paths.ts updated with CORRECTLY ALIGNED Portugal HD path!');
console.log('   Old length: ' + (pathEnd - pathStart) + ' chars');
console.log('   New length: ' + svgPath.length + ' chars');
console.log('   Projection: fitExtent([[-240, -40], [750, 720]]) — identical to generate-official-maps.js');
