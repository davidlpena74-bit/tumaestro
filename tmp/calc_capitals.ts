
import { projectCoordinates } from './src/utils/projection.ts';

const EUROPE_PATHS_PROJECTION = {
    "type": "miller",
    "scale": 868.4833947246162,
    "translate": [
        221.89473684210532,
        1138.048909250595
    ]
};

const capitals = {
    "Oslo": [10.75, 59.91],
    "Moscow": [37.61, 55.75],
    "London": [-0.12, 51.50],
    "Paris": [2.35, 48.85],
    "Berlin": [13.40, 52.52],
    "Madrid": [-3.70, 40.41],
    "Rome": [12.49, 41.90],
    "Reykjavik": [-21.94, 64.12]
};

console.log("Calculated Coordinates for Europe Projection:");
for (const [name, [lon, lat]] of Object.entries(capitals)) {
    const [x, y] = projectCoordinates(lon, lat, EUROPE_PATHS_PROJECTION);
    console.log(`${name}: x=${x.toFixed(1)}, y=${y.toFixed(1)}`);
}
