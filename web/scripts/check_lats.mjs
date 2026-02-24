
import fs from 'fs';
import { geoMercator } from 'd3-geo';

const communitiesGeoJSON = JSON.parse(fs.readFileSync('public/maps/spain-communities.json', 'utf8'));
const mainlandFeatures = communitiesGeoJSON.features.filter(f => f.properties.name !== 'Canarias');
const projection = geoMercator()
    .fitExtent([[50, 20], [680, 600]], { type: "FeatureCollection", features: mainlandFeatures });

const latAtY700 = projection.invert([0, 700])[1];
const latAtY600 = projection.invert([0, 600])[1];

console.log(`Lat at Y=700: ${latAtY700.toFixed(2)}`);
console.log(`Lat at Y=600: ${latAtY600.toFixed(2)}`);
console.log(`Lat at Y=500: ${projection.invert([0, 500])[1].toFixed(2)}`);
