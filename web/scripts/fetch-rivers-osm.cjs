const fs = require('fs');

async function fetchRivers() {
    // Spanish bounding box: (South, West, North, East)
    const bbox = "35.0,-10.0,44.0,5.0";
    const query = `
[out:json][timeout:60];
(
  rel["name"~"Duero|Ebro|Tajo|Guadalquivir|Guadiana|Júcar|Segura|Miño"][waterway=river](${bbox});
  way["name"~"Duero|Ebro|Tajo|Guadalquivir|Guadiana|Júcar|Segura|Miño"][waterway=river](${bbox});
);
out geom;`;

    console.log('Fetching river data from Overpass (Spain BBox)...');

    try {
        const response = await fetch('https://overpass-api.de/api/interpreter', {
            method: 'POST',
            body: query
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const features = data.elements.map(e => {
            let coordinates = [];
            if (e.type === 'way') {
                coordinates = e.geometry.map(p => [p.lon, p.lat]);
            } else if (e.type === 'relation') {
                // For relations, we might have multiple members. Simplify to MultiLineString
                coordinates = e.members
                    .filter(m => m.type === 'way' && m.geometry)
                    .map(m => m.geometry.map(p => [p.lon, p.lat]));
            }

            return {
                type: 'Feature',
                properties: {
                    name: e.tags.name,
                    id: e.id
                },
                geometry: {
                    type: e.type === 'way' ? 'LineString' : 'MultiLineString',
                    coordinates: coordinates
                }
            };
        });

        const geojson = {
            type: 'FeatureCollection',
            features: features
        };

        fs.writeFileSync('C:/Users/david/Desktop/Projects-Antigravity/Tu Maestro/web/public/maps/spain-rivers-osm.json', JSON.stringify(geojson, null, 2));
        console.log(`Success! Saved ${features.length} river features to spain-rivers-osm.json`);

    } catch (error) {
        console.error('Error fetching river data:', error);
    }
}

fetchRivers();
