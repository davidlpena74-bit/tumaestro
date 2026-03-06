
// Mocking the projection logic to run in plain node
function projectCoordinates(lon, lat, params) {
    const lambda = lon * Math.PI / 180;
    const phi = lat * Math.PI / 180;
    const x_raw = lambda;
    const y_raw = 1.25 * Math.log(Math.tan(Math.PI / 4 + 0.4 * phi));
    const x = x_raw * params.scale + params.translate[0];
    const y = -y_raw * params.scale + params.translate[1];
    return [x, y];
}

const EUROPE_PATHS_PROJECTION = {
    "type": "miller",
    "scale": 868.4833947246162,
    "translate": [
        221.89473684210532,
        1138.048909250595
    ]
};

const capitals = {
    "Norway": [10.75, 59.91],
    "Russia": [37.61, 55.75],
    "United Kingdom": [-0.12, 51.50],
    "Sweden": [18.06, 59.33],
    "Finland": [24.94, 60.17],
    "Denmark": [12.56, 55.67],
    "Spain": [-3.70, 40.41],
    "Italy": [12.49, 41.90]
};

console.log("Calculated Coordinates for Europe Projection:");
for (const [name, [lon, lat]] of Object.entries(capitals)) {
    const [x, y] = projectCoordinates(lon, lat, EUROPE_PATHS_PROJECTION);
    console.log(`${name}: x=${x.toFixed(1)}, y=${y.toFixed(1)}`);
}
