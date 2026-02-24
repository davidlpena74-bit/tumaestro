
import fs from 'fs';
import { geoMercator, geoPath } from 'd3-geo';
import * as topojson from 'topojson-client';

// Load the world TopoJSON
const worldData = JSON.parse(fs.readFileSync('public/maps/world-countries-50m.json', 'utf8'));
const worldFeatures = topojson.feature(worldData, worldData.objects.countries).features;

// Load the Spain communities to define the projection extent
const communitiesGeoJSON = JSON.parse(fs.readFileSync('public/maps/spain-communities.json', 'utf8'));
const mainlandFeatures = communitiesGeoJSON.features.filter(f => f.properties.name !== 'Canarias');

// Use the same projection as the mountains map (fits Spain in 800x670 canvas)
// Extended to include Portugal and N. Africa: fitExtent with wider geographic bounds
const extentFeatures = {
    type: "FeatureCollection",
    features: mainlandFeatures
};

const projectionMain = geoMercator()
    .fitExtent([[50, 20], [680, 600]], extentFeatures);

const pathGen = geoPath().projection(projectionMain);

// Countries to include in the physical background
const INCLUDE_COUNTRIES = [
    'Portugal',
    'Morocco',
    'Algeria',
    'Western Sahara',
    'Mauritania',
    'Tunisia',
    'Libya',
    'Spain',
    'France',
    'Andorra',
    'Gibraltar',
];

const paths = {};

worldFeatures.forEach(feature => {
    const name = feature.properties.name;
    if (INCLUDE_COUNTRIES.includes(name)) {
        const d = pathGen(feature);
        if (d) {
            paths[name] = d;
        }
    }
});

// Build TypeScript export
let output = `// Generated: Physical background for Montañas de España (includes Portugal & N.Africa)\n`;
output += `export const SPAIN_PHYSICAL_BACKGROUND: Record<string, string> = {\n`;
for (const [name, d] of Object.entries(paths)) {
    output += `    "${name}": "${d}",\n`;
}
output += `};\n`;

fs.writeFileSync('src/components/games/data/spain-physical-background.ts', output);
console.log(`Generated physical background with countries: ${Object.keys(paths).join(', ')}`);
