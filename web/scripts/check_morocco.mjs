
import fs from 'fs';
import { geoMercator, geoPath } from 'd3-geo';
import * as topojson from 'topojson-client';

// Same projection as Spain communities
const communitiesGeoJSON = JSON.parse(fs.readFileSync('public/maps/spain-communities.json', 'utf8'));
const mainlandFeatures = communitiesGeoJSON.features.filter(f => f.properties.name !== 'Canarias');
const projection = geoMercator()
    .fitExtent([[50, 20], [680, 600]], { type: "FeatureCollection", features: mainlandFeatures });
const pathGen = geoPath().projection(projection);

const worldData = JSON.parse(fs.readFileSync('public/maps/world-countries-50m.json', 'utf8'));
const worldFeatures = topojson.feature(worldData, worldData.objects.countries).features;

// Find Morocco and check its bounding box
const morocco = worldFeatures.find(f => f.properties.name === 'Morocco');
if (morocco) {
    const bounds = pathGen.bounds(morocco);
    console.log('Morocco projected bounds:',
        'minX:', bounds[0][0].toFixed(1),
        'minY:', bounds[0][1].toFixed(1),
        'maxX:', bounds[1][0].toFixed(1),
        'maxY:', bounds[1][1].toFixed(1)
    );

    // Check if geometry is MultiPolygon (could have islands far away)
    console.log('Morocco geometry type:', morocco.geometry.type);
    if (morocco.geometry.type === 'MultiPolygon') {
        console.log('Number of polygons:', morocco.geometry.coordinates.length);
        morocco.geometry.coordinates.forEach((poly, i) => {
            const feature = { type: 'Feature', geometry: { type: 'Polygon', coordinates: poly }, properties: {} };
            const b = pathGen.bounds(feature);
            console.log(`  Polygon ${i}: x=[${b[0][0].toFixed(0)},${b[1][0].toFixed(0)}] y=[${b[0][1].toFixed(0)},${b[1][1].toFixed(0)}]`);
        });
    }
}
