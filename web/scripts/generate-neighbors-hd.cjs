'use strict';
const pathLib = require('path');
const fs = require('fs');
const root = pathLib.join(__dirname, '..');

const d3Geo = require('d3-geo');
const d3pathLib = require('d3-path');
const topojson = require('topojson-client');

global.d3 = { ...d3Geo, path: d3pathLib.path };
require(pathLib.join(root, 'node_modules/d3-composite-projections/d3-composite-projections.js'));

const geoConicConformalSpain = global.d3.geoConicConformalSpain;

const communities = JSON.parse(fs.readFileSync(pathLib.join(root, 'public/maps/spain-communities.json'), 'utf8'));
const worldRaw = JSON.parse(fs.readFileSync(pathLib.join(root, 'public/maps/world-countries-10m.json'), 'utf8'));
const worldFeatures = topojson.feature(worldRaw, worldRaw.objects.countries);

// ALL African country IDs (merged = no internal borders, extends to South Africa)
const AFRICA_IDS = [
    '504', '012', '732', '478', '788', '434', '466', '686', '262', '204', '120', '148', '174',
    '180', '232', '231', '270', '288', '324', '404', '450', '454', '480', '508', '516', '562',
    '566', '624', '646', '690', '694', '706', '710', '716', '728', '748', '768', '800', '818',
    '834', '854', '894'
];

// European neighbors of France (merged = no internal borders, extends far north)
const EUROPE_IDS = [
    '250', // France
    '056', // Belgium
    '276', // Germany
    '380', // Italy
    '756', // Switzerland
    '442', // Luxembourg
    '492', // Monaco
    '040', // Austria
    '528', // Netherlands
    '826', // United Kingdom
    '372', // Ireland
    '724', // Spain - skip (we have it)
    '620', // Portugal - skip
    '020', // Andorra - skip
];

// Merge Africa into one solid block
const africaMerged = topojson.merge(worldRaw, worldRaw.objects.countries.geometries.filter(function (g) {
    return AFRICA_IDS.includes(String(g.id));
}));

// Merge European countries (France + neighbors) into one solid block
const europeMerged = topojson.merge(worldRaw, worldRaw.objects.countries.geometries.filter(function (g) {
    return EUROPE_IDS.includes(String(g.id));
}));

// Andorra separately (small, just France geometry but as context)
const andorra = worldFeatures.features.find(function (f) { return String(f.id) === '020'; });

// EXACT same projection as generate-official-maps.js
const projection = geoConicConformalSpain();
const pathGenerator = d3Geo.geoPath(projection);

const fitFeatures = [
    ...communities.features,
    ...worldFeatures.features.filter(function (f) { return ['250', '620'].includes(String(f.id)); }),
    africaMerged
];
projection.fitExtent([[-240, -40], [750, 720]], { type: 'FeatureCollection', features: fitFeatures });

// Generate paths
const africaPath = pathGenerator(africaMerged);
const europePath = pathGenerator(europeMerged);
const andorraPath = andorra ? pathGenerator(andorra) : null;

// Extend Africa southward with a huge rectangle starting at y=500
// (overlaps with the bottom of the geographic Africa path → no gap)
const africaExtended = africaPath
    + ' M-5000,500 L15000,500 L15000,15000 L-5000,15000 Z';

// Extend Europe northward with a huge rectangle ending at y=10
// (overlaps with the top of the geographic Europe path → no gap)
const europeExtended = europePath
    + ' M-5000,-15000 L15000,-15000 L15000,10 L-5000,10 Z';

console.log('Africa merged + extended:  ' + africaExtended.length + ' chars');
console.log('Europe merged + extended:  ' + europeExtended.length + ' chars');
console.log('Andorra:                   ' + (andorraPath ? andorraPath.length + ' chars' : 'ERROR'));

// Update spain-neighbors-paths.ts
const filePath = pathLib.join(root, 'src/components/games/data/spain-neighbors-paths.ts');
let content = fs.readFileSync(filePath, 'utf8');

function replacePath(content, key, newPath) {
    const patterns = [
        '"' + key + '": "',
        key + ': "',
        '"' + key + '":"',
    ];
    let startIdx = -1, markerLen = 0;
    for (const pat of patterns) {
        startIdx = content.indexOf(pat);
        if (startIdx !== -1) { markerLen = pat.length; break; }
    }
    if (startIdx === -1) { console.error('  ⚠️  Key "' + key + '" not found'); return content; }
    const pathStart = startIdx + markerLen;
    const pathEnd = content.indexOf('",', pathStart);
    if (pathEnd === -1) { console.error('  ⚠️  End not found for "' + key + '"'); return content; }
    const oldLen = pathEnd - pathStart;
    console.log('  ✅ ' + key + ': ' + oldLen + ' → ' + newPath.length + ' chars');
    return content.substring(0, pathStart) + newPath + content.substring(pathEnd);
}

// France → merged Europe block (no northern border visible)
content = replacePath(content, 'France', europePath);

// Andorra → individual path
if (andorraPath) content = replacePath(content, 'Andorra', andorraPath);

// Morocco → merged Africa block (no southern border visible)  
content = replacePath(content, 'Morocco', africaPath);

// Algeria → empty (already covered by merged Africa in Morocco key)
content = replacePath(content, 'Algeria', 'M0,0');

fs.writeFileSync(filePath, content, 'utf8');
console.log('\n🎉 Done! Africa and Europe are now solid merged blocks — no visible cutoff edges.');
