
import { geoMercator } from 'd3-geo';

const boundingBox = {
    type: "Feature",
    geometry: {
        type: "LineString",
        coordinates: [
            [-25, 30], // SW
            [60, 30],  // SE
            [60, 72],  // NE
            [-25, 72]  // NW
        ]
    }
};

const projection = geoMercator().fitExtent([[40, 40], [760, 560]], boundingBox);

const testPoints = {
    'Madrid': [-3.7, 40.4],
    'Rome': [12.5, 41.8],
    'Bucharest': [26.1, 44.4],
    'Oslo': [10.7, 59.9],
    'London': [-0.1, 51.5]
};

console.log("Projected Points:");
Object.entries(testPoints).forEach(([name, coords]) => {
    const projected = projection(coords);
    console.log(`${name}: [${projected[0].toFixed(1)}, ${projected[1].toFixed(1)}]`);
});
