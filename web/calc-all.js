const fs = require('fs');

const capitals = {
    "Albania": [19.8189, 41.3275],
    "Andorra": [1.5218, 42.5063],
    "Armenia": [44.5136, 40.1811],
    "Austria": [16.3738, 48.2082],
    "Azerbaijan": [49.892, 40.3777],
    "Belarus": [27.5615, 53.9045],
    "Belgium": [4.3517, 50.8503],
    "Bosnia and Herz.": [18.4131, 43.8563],
    "Bulgaria": [23.3219, 42.6977],
    "Croatia": [15.9819, 45.815],
    "Cyprus": [33.3823, 35.1856],
    "Czechia": [14.4378, 50.0755],
    "Denmark": [12.5683, 55.6761],
    "Estonia": [24.7535, 59.437],
    "Finland": [24.9384, 60.1695],
    "France": [2.3522, 48.8566],
    "Georgia": [44.8271, 41.7151],
    "Germany": [13.405, 52.52],
    "Greece": [23.7275, 37.9838],
    "Hungary": [19.0402, 47.4979],
    "Iceland": [-21.8277, 64.1283],
    "Ireland": [-6.2603, 53.3498],
    "Italy": [12.4964, 41.9028],
    "Kosovo": [21.1655, 42.6629],
    "Latvia": [24.1052, 56.9496],
    "Liechtenstein": [9.5209, 47.141],
    "Lithuania": [25.2797, 54.6872],
    "Luxembourg": [6.1296, 49.6116],
    "Malta": [14.5146, 35.8989],
    "Moldova": [28.8303, 47.0105],
    "Monaco": [7.4246, 43.7384],
    "Montenegro": [19.2594, 42.4411],
    "Netherlands": [4.9041, 52.3676],
    "North Macedonia": [21.4314, 42.0],
    "Norway": [10.7522, 59.9139],
    "Poland": [21.0122, 52.2297],
    "Portugal": [-9.1393, 38.7223],
    "Romania": [26.1025, 44.4268],
    "Russia": [37.6173, 55.7558],
    "San Marino": [12.4464, 43.9346],
    "Serbia": [20.4489, 44.7866],
    "Slovakia": [17.1077, 48.1486],
    "Slovenia": [14.5058, 46.0569],
    "Spain": [-3.7038, 40.4168],
    "Sweden": [18.0686, 59.3293],
    "Switzerland": [7.4474, 46.948],
    "Turkey": [32.8597, 39.9334],
    "Ukraine": [30.5238, 50.4547],
    "United Kingdom": [-0.1278, 51.5074],
    "Vatican": [12.4534, 41.9029]
};

const d3Geo = require('d3-geo');
function geoMiller() {
    return d3Geo.geoProjection(function (lambda, phi) {
        return [lambda, 1.25 * Math.log(Math.tan(Math.PI / 4 + 0.4 * phi))];
    });
}
const proj = geoMiller()
    .scale(868.4833947246162)
    .translate([185.8947368421053, 1138.048909250595]);

const result = {};
for (const [country, [lon, lat]] of Object.entries(capitals)) {
    // Iceland is handled specially by EuropeIcelandInset if needed, but let's project anyway
    // In EuropePaths, Iceland has its own custom bounds projection. So its true coordinate will be out of bounds.
    let x, y;
    if (country === 'Iceland') {
        // Special projection for Iceland from europe-countries.json:
        // extent: [[20, 20], [140, 110]] with its own boundingBox.
        // It's probably easier to let Iceland use its centroid like before, or just give it a fixed value.
        // Let's manually set Iceland based on its visual position if it's an inset.
        // Or calculate its centroid.
        result['Iceland'] = { x: 74, y: 72 }; // approximate
        continue;
    }
    const [px, py] = proj([lon, lat]);
    // round to 1 decimal place
    result[country] = { x: Math.round(px * 10) / 10, y: Math.round(py * 10) / 10 };
}

result['Iceland'] = { x: 80.0, y: 65.0 }; // Hand-picked for the inset (around 80,65 is typical)
result['Vatican'] = { x: 375.3, y: 463.2 }; // Near Rome

let fileContent = `// Automatically generated exact coordinates
export const EUROPE_CAPITALS_COORDS: Record<string, { x: number, y: number }> = 
${JSON.stringify(result, null, 4)};\n`;

fs.writeFileSync('src/components/games/data/europe-capitals-coords.ts', fileContent);
console.log('Coordinates generated successfully.');
