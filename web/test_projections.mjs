
import * as d3 from 'd3-geo';

const anchors = [
    { name: 'A Coruna (NW)', lon: -9.299, lat: 43.788, x: 0, y: 0 },
    { name: 'Girona (E)', lon: 3.3158, lat: 42.3195, x: 633.7, y: 82.1 },
    { name: 'Cadiz (S)', lon: -5.604, lat: 36.0, x: 130, y: 532.9 },
    { name: 'Irun (NE France border)', lon: -1.78, lat: 43.34, x: 376.7, y: 30.6 },
    { name: 'Badajoz (W Portugal border)', lon: -6.97, lat: 38.88, x: 132.1, y: 301.2 }
];

function testProjection(projName, proj) {
    console.log(`--- Testing ${projName} ---`);
    proj.fitExtent([[0, 0], [633.7, 532.9]], {
        type: "FeatureCollection",
        features: anchors.map(p => ({
            type: "Feature",
            geometry: { type: "Point", coordinates: [p.lon, p.lat] }
        }))
    });

    anchors.forEach(p => {
        const [x, y] = proj([p.lon, p.lat]);
        console.log(`${p.name}: Expected (${p.x}, ${p.y}), Got (${x.toFixed(1)}, ${y.toFixed(1)})`);
    });
}

testProjection('Mercator', d3.geoMercator());
testProjection('Equirectangular', d3.geoEquirectangular());
