import fs from 'fs';

/**
 * Fetches Spanish mountain ranges from Overpass API
 */
async function fetchMountains() {
    const query = `
    [out:json][timeout:120];
    area["name"="España"]->.border;
    (
      way["natural"="mountain_range"](area.border);
      way["natural"="ridge"](area.border);
      way["natural"="massif"](area.border);
      relation["natural"="mountain_range"](area.border);
      relation["natural"="massif"](area.border);
    );
    out body;
    >;
    out skel qt;
    `;

    console.log('Fetching mountains from Overpass API...');

    try {
        const response = await fetch('https://overpass-api.de/api/interpreter', {
            method: 'POST',
            body: query,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();

        fs.writeFileSync('web/public/maps/spain-mountains-osm-raw.json', JSON.stringify(data, null, 2));
        console.log('Success! Raw data saved to web/public/maps/spain-mountains-osm-raw.json');

        // Basic conversion to GeoJSON for our Geo-Processor
        const geojson = {
            type: 'FeatureCollection',
            features: []
        };

        const nodes = {};
        data.elements.forEach(el => {
            if (el.type === 'node') nodes[el.id] = [el.lon, el.lat];
        });

        const ways = {};
        data.elements.forEach(el => {
            if (el.type === 'way') ways[el.id] = el.nodes.map(nodeId => nodes[nodeId]).filter(Boolean);
        });

        data.elements.forEach(el => {
            if (el.type === 'way' && el.tags && el.tags.name) {
                const coordinates = ways[el.id];
                if (coordinates.length > 1) {
                    geojson.features.push({
                        type: 'Feature',
                        properties: { name: el.tags.name, type: 'way' },
                        geometry: { type: 'LineString', coordinates }
                    });
                }
            } else if (el.type === 'relation' && el.tags && el.tags.name) {
                const coordinates = [];
                el.members.forEach(m => {
                    if (m.type === 'way' && ways[m.ref]) {
                        coordinates.push(...ways[m.ref]);
                    }
                });
                if (coordinates.length > 1) {
                    geojson.features.push({
                        type: 'Feature',
                        properties: { name: el.tags.name, type: 'relation' },
                        geometry: { type: 'LineString', coordinates }
                    });
                }
            } else if (el.type === 'node' && el.tags && el.tags.name) {
                geojson.features.push({
                    type: 'Feature',
                    properties: { name: el.tags.name, type: 'node' },
                    geometry: { type: 'Point', coordinates: [el.lon, el.lat] }
                });
            }
        });

        fs.writeFileSync('web/scripts/geodata/raw/osm/spain-mountains.json', JSON.stringify(geojson, null, 2));
        console.log('GeoJSON created in web/scripts/geodata/raw/osm/spain-mountains.json');

    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}

fetchMountains();
