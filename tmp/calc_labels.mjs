
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

const labels = {
    "Atlantic_Ocean": [-9, 45],
    "Arctic_Ocean": [15, 61],
    "Mediterranean_Sea": [15, 38],
    "Black_Sea": [33, 44]
};

console.log("Calculated Coordinates for Europe Projection (Labels v2):");
for (const [name, [lon, lat]] of Object.entries(labels)) {
    const [x, y] = projectCoordinates(lon, lat, EUROPE_PATHS_PROJECTION);
    console.log(`${name}: x=${x.toFixed(1)}, y=${y.toFixed(1)}`);
}
