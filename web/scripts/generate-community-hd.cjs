'use strict';
const pathLib = require('path');
const fs = require('fs');
const root = pathLib.join(__dirname, '..');

const communityId = process.argv[2];
if (!communityId) {
    console.error('Usage: node generate-community-hd.cjs <community_id>');
    process.exit(1);
}

const CCAA_MAP = {
    '01': 'andalucia', '02': 'aragon', '03': 'asturias', '04': 'baleares',
    '05': 'canarias', '06': 'cantabria', '07': 'castillaleon', '08': 'castillalamancha',
    '09': 'cataluna', '10': 'valencia', '11': 'extremadura', '12': 'galicia',
    '13': 'madrid', '14': 'murcia', '15': 'navarra', '16': 'paisvasco',
    '17': 'larioja', '18': 'ceuta', '19': 'melilla'
};

const d3Geo = require('d3-geo');
const d3pathLib = require('d3-path');
const topojson = require('topojson-client');

global.d3 = { ...d3Geo, path: d3pathLib.path };
require(pathLib.join(root, 'node_modules/d3-composite-projections/d3-composite-projections.js'));

const geoConicConformalSpain = global.d3.geoConicConformalSpain;

const communities = JSON.parse(fs.readFileSync(pathLib.join(root, 'public/maps/spain-communities.json'), 'utf8'));
const worldRaw = JSON.parse(fs.readFileSync(pathLib.join(root, 'public/maps/world-countries-10m.json'), 'utf8'));
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

const fitFeatures = [
    ...communities.features,
    ...worldFeatures.features.filter(function (f) { return ['250', '620'].includes(String(f.id)); }),
    africaFeature
];
projection.fitExtent([[-240, -40], [750, 720]], { type: 'FeatureCollection', features: fitFeatures });

// Find the community feature
const feature = communities.features.find(function (f) {
    const code = f.properties.cod_ccaa;
    return (CCAA_MAP[code] || '').toLowerCase() === communityId.toLowerCase();
});

if (!feature) {
    console.error('Community "' + communityId + '" not found. Available:', Object.values(CCAA_MAP).join(', '));
    process.exit(1);
}

const svgPath = pathGenerator(feature);
if (!svgPath) { console.error('Generated path is empty'); process.exit(1); }

// Update spanish-communities-paths.ts
// Format: galicia: [`...path...`],
const filePath = pathLib.join(root, 'src/components/games/spanish-communities-paths.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Try different key formats: "galicia: [`" or `galicia: ['`
const patterns = [
    communityId + ': [`',
    '"' + communityId + '": [`',
    communityId + ": ['",
    '"' + communityId + '": [\''
];

let startIdx = -1;
let markerLen = 0;
let endMarker = '';

for (const pat of patterns) {
    startIdx = content.indexOf(pat);
    if (startIdx !== -1) {
        markerLen = pat.length;
        // Determine the closing marker
        endMarker = pat.includes('`') ? '`]' : "']";
        break;
    }
}

if (startIdx === -1) {
    console.error('Key "' + communityId + '" not found in spanish-communities-paths.ts');
    console.error('Tried patterns:', patterns);
    process.exit(1);
}

const pathStart = startIdx + markerLen;
const pathEnd = content.indexOf(endMarker, pathStart);
if (pathEnd === -1) { console.error('Could not find end of path for ' + communityId); process.exit(1); }

const oldLen = pathEnd - pathStart;
const newContent = content.substring(0, pathStart) + svgPath + content.substring(pathEnd);
fs.writeFileSync(filePath, newContent, 'utf8');

console.log('✅ ' + communityId + ' updated in spanish-communities-paths.ts');
console.log('   Old: ' + oldLen + ' chars  →  New: ' + svgPath.length + ' chars');
