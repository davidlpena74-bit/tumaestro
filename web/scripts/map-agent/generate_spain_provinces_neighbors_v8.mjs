
import fs from 'fs';
import * as d3 from 'd3-geo';
import * as topojson from 'topojson-client';

const worldData = JSON.parse(fs.readFileSync('public/maps/world-countries-50m.json', 'utf8'));
const worldFeatures = topojson.feature(worldData, worldData.objects.countries).features;
const spainFeature = worldFeatures.find(f => f.properties.name === 'Spain');

const mainlandSpain = {
    type: "Feature",
    geometry: {
        type: "MultiPolygon",
        coordinates: spainFeature.geometry.coordinates.filter(poly => {
            const lon = poly[0][0][0];
            return lon > -12;
        })
    }
};

// V8 refined Fit: Extent derived from provinces SVG bounds
// We fit Spain in the exact same frame as the Highcharts SVG
const projection = d3.geoMercator()
    .fitExtent([[-5, -15], [655, 560]], mainlandSpain);

const pathGen = d3.geoPath().projection(projection);
const TARGETS = ['Portugal', 'France', 'Andorra', 'Morocco', 'Algeria'];

let output = `// Generated with High-Precision D3 fitExtent (v8)\n`;
output += `export const SPAIN_PROVINCES_NEIGHBORS_PATHS: Record<string, string> = {\n`;

TARGETS.forEach(name => {
    const feature = worldFeatures.find(f => f.properties.name === name);
    if (!feature) return;
    const d = pathGen(feature);
    if (d) {
        output += `    "${name}": "${d}",\n`;
    }
});

const [gx, gy] = projection([-5.35, 36.14]);
output += `    "Gibraltar": "M${gx.toFixed(0)},${gy.toFixed(0)} m-2,0 a2,2 0 1,0 4,0 a2,2 0 1,0 -4,0",\n`;
output += `};\n`;

fs.writeFileSync('src/components/games/data/spain-neighbors-provinces-paths.ts', output);
console.log('Done!');
