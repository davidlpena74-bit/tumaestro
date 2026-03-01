const fs = require('fs');
const d3Geo = require('d3-geo');
const d3Path = require('d3-path');
const topojson = require('topojson-client');

// Setup global d3 for the UMD bundle
global.d3 = { ...d3Geo, path: d3Path.path };
// Load the composite projections
require('c:/Users/david/Desktop/Projects-Antigravity/Tu Maestro/web/node_modules/d3-composite-projections/d3-composite-projections.js');

const geoConicConformalSpain = global.d3.geoConicConformalSpain;

if (!geoConicConformalSpain) {
    console.error('Could not load geoConicConformalSpain');
    process.exit(1);
}

const COMMUNITIES_JSON = 'c:/Users/david/Desktop/Projects-Antigravity/Tu Maestro/web/public/maps/spain-communities.json';
const WORLD_JSON = 'c:/Users/david/Desktop/Projects-Antigravity/Tu Maestro/web/public/maps/world-countries-10m.json';

const CCAA_MAP = {
    '01': 'andalucia', '02': 'aragon', '03': 'asturias', '04': 'baleares',
    '05': 'canarias', '06': 'cantabria', '07': 'castillaleon', '08': 'castillalamancha',
    '09': 'cataluna', '10': 'valencia', '11': 'extremadura', '12': 'galicia',
    '13': 'madrid', '14': 'murcia', '15': 'navarra', '16': 'paisvasco',
    '17': 'larioja', '18': 'ceuta', '19': 'melilla'
};

const NEIGHBOR_IDS = {
    '250': 'France', '620': 'Portugal', '020': 'Andorra'
};

const AFRICA_IDS = [
    '504', '012', '732', '478', '788', '434', '466', '686', '262', '204', '120', '148', '174', '180', '232', '231', '270', '288', '324', '404', '450', '454', '480', '508', '516', '562', '566', '624', '646', '690', '694', '706', '710', '716', '728', '748', '768', '800', '818', '834', '854', '894'
];

const communities = JSON.parse(fs.readFileSync(COMMUNITIES_JSON, 'utf8'));
const worldRaw = JSON.parse(fs.readFileSync(WORLD_JSON, 'utf8'));
const worldFeatures = topojson.feature(worldRaw, worldRaw.objects.countries);

// Create a single MERGED Africa feature to avoid internal borders
const africaFeature = topojson.merge(worldRaw, worldRaw.objects.countries.geometries.filter(g => AFRICA_IDS.includes(String(g.id))));

const projection = geoConicConformalSpain();
const pathGenerator = d3Geo.geoPath(projection);

// Include Spain, France, Portugal and Africa in the fitting data
const fitFeatures = [
    ...communities.features,
    ...worldFeatures.features.filter(f => ['250', '620'].includes(String(f.id))),
    africaFeature
];
const fitData = { type: 'FeatureCollection', features: fitFeatures };

// Fit projection to the actual visible data using the tighter box
projection.fitExtent([[-240, -40], [750, 720]], fitData);

// 1. Communities
const communityPaths = {};
communities.features.forEach(f => {
    const code = f.properties.cod_ccaa;
    const id = CCAA_MAP[code] || (f.properties.name ? f.properties.name.toLowerCase().replace(/ /g, '_') : 'unknown');

    if (id === 'ceuta' || id === 'melilla') {
        const center = d3Geo.geoCentroid(f);
        const projPoint = projection(center);
        if (projPoint) {
            const cx = projPoint[0].toFixed(3);
            const cy = projPoint[1].toFixed(3);
            communityPaths[id] = `M ${cx - 10}, ${cy} a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0`;
        }
    } else {
        communityPaths[id] = pathGenerator(f);
    }
});

// 2. Neighbors (Context)
const neighborPaths = {};

// Specific neighbors (with borders)
worldFeatures.features.forEach(f => {
    const id = NEIGHBOR_IDS[f.id];
    if (id) {
        neighborPaths[id] = pathGenerator(f);
    }
});

// Single Africa block (NO internal borders)
neighborPaths['Africa'] = pathGenerator(africaFeature);

const output = `
export const SPAIN_COMMUNITIES_PATHS_OFFICIAL: Record<string, string> = ${JSON.stringify(communityPaths, null, 2)};
export const SPAIN_PROVINCES_PATHS_OFFICIAL: Record<string, string> = {};
export const SPAIN_NEIGHBORS_PATHS_OFFICIAL: Record<string, string> = ${JSON.stringify(neighborPaths, null, 2)};
`;

fs.writeFileSync('c:/Users/david/Desktop/Projects-Antigravity/Tu Maestro/web/src/components/games/data/spain-official-paths.ts', output);

console.log('Success! Reverted to original composite projection with Africa block.');
