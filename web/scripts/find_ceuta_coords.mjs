
import { geoMercator, geoPath } from 'd3-geo';
import fs from 'fs';

// Same projection as Spain communities
const communitiesGeoJSON = JSON.parse(fs.readFileSync('public/maps/spain-communities.json', 'utf8'));
const mainlandFeatures = communitiesGeoJSON.features.filter(f => f.properties.name !== 'Canarias');
const projection = geoMercator()
    .fitExtent([[50, 20], [680, 600]], { type: "FeatureCollection", features: mainlandFeatures });

// Ceuta: 35.889°N, -5.322°W
// Melilla: 35.292°N, -2.938°W
// Strait of Gibraltar reference: 35.97°N, -5.44°W

const locations = {
    'Ceuta': [-5.322, 35.889],
    'Melilla': [-2.938, 35.292],
    'Gibraltar': [-5.353, 36.140],
    'Strait_N': [-5.0, 36.1],   // North coast of Strait
    'Morocco_N': [-5.0, 35.8],   // North Morocco coast
};

console.log('Projected coordinates:');
for (const [name, [lon, lat]] of Object.entries(locations)) {
    const [x, y] = projection([lon, lat]);
    console.log(`  ${name}: x=${x.toFixed(1)}, y=${y.toFixed(1)}`);
}
