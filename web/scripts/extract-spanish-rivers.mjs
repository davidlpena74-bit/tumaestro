import fs from 'fs';

const riversData = JSON.parse(fs.readFileSync('c:/Users/david/Desktop/Projects-Antigravity/Tu Maestro/web/public/maps/world-rivers.json', 'utf8'));

const spainBounds = {
    minLat: 35,
    maxLat: 44,
    minLon: -10,
    maxLon: 5
};

const spanishRivers = riversData.features.filter(f => {
    // Check if any point is in Spain
    if (f.geometry.type === 'LineString') {
        return f.geometry.coordinates.some(p =>
            p[1] >= spainBounds.minLat && p[1] <= spainBounds.maxLat &&
            p[0] >= spainBounds.minLon && p[0] <= spainBounds.maxLon
        );
    } else if (f.geometry.type === 'MultiLineString') {
        return f.geometry.coordinates.some(line =>
            line.some(p =>
                p[1] >= spainBounds.minLat && p[1] <= spainBounds.maxLat &&
                p[0] >= spainBounds.minLon && p[0] <= spainBounds.maxLon
            )
        );
    }
    return false;
});

console.log('Rivers found:', spanishRivers.length);
spanishRivers.forEach(r => {
    console.log(`- ${r.properties.name || r.properties.Name || 'Unnamed'}`);
});
