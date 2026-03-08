// BUILD MEDITERRANEAN SEA FROM COUNTRY COASTLINES
// Strategy: Bounding box of Med MINUS all land polygons within it = Mediterranean Sea
// Uses the same TopoJSON source as the countries → identical shared edges

import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import topojson from 'topojson-client';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE = resolve(__dirname, '../web');

// Mediterranean bounding box (geographic coordinates, lon/lat)
const MED_BOX = {
    minLon: -6.0,   // Strait of Gibraltar (Spain side)
    maxLon: 36.5,   // Turkey / Syria
    minLat: 30.0,   // North Africa
    maxLat: 46.5    // N. Italy / Adriatic top
};

// Countries that border the Mediterranean and need to be "subtracted" from the box
const MED_COASTAL_COUNTRIES = [
    'Spain', 'France', 'Monaco', 'Italy', 'Slovenia', 'Croatia', 'Bosnia and Herzegovina',
    'Montenegro', 'Albania', 'Greece', 'Turkey', 'Syria', 'Lebanon', 'Israel',
    'Egypt', 'Libya', 'Tunisia', 'Algeria', 'Morocco', 'Malta', 'Cyprus'
];

// Load countries TopoJSON (same file used for europe-countries)
const topoPath = resolve(BASE, 'public/maps/world-countries-50m.json');
const topo = JSON.parse(fs.readFileSync(topoPath, 'utf8'));
const layer = Object.keys(topo.objects)[0];
const geojson = topojson.feature(topo, topo.objects[layer]);

console.log(`Loaded ${geojson.features.length} country features`);

// Helper: does a GeoJSON feature touch the Med box?
function featureTouchesMedBox(feature) {
    if (!feature.geometry) return false;
    const geom = feature.geometry;

    function ringWithinBox(ring) {
        return ring.some(([lon, lat]) =>
            lon >= MED_BOX.minLon && lon <= MED_BOX.maxLon &&
            lat >= MED_BOX.minLat && lat <= MED_BOX.maxLat
        );
    }

    function checkPolygon(coords) {
        return coords.some(ring => ringWithinBox(ring));
    }

    if (geom.type === 'Polygon') return checkPolygon(geom.coordinates);
    if (geom.type === 'MultiPolygon') return geom.coordinates.some(p => checkPolygon(p));
    return false;
}

// Clip a polygon ring to the Med bounding box
function clipRingToBox(ring) {
    return ring.filter(([lon, lat]) =>
        lon >= MED_BOX.minLon - 1 && lon <= MED_BOX.maxLon + 1 &&
        lat >= MED_BOX.minLat - 1 && lat <= MED_BOX.maxLat + 1
    );
}

// Find Mediterranean-bordering countries by name
const medFeatures = geojson.features.filter(f => {
    const name = f.properties && (f.properties.name || f.properties.NAME || f.properties.admin);
    if (!name) return false;
    return MED_COASTAL_COUNTRIES.some(c =>
        name.toLowerCase().includes(c.toLowerCase()) ||
        c.toLowerCase().includes(name.toLowerCase())
    );
});

console.log(`Found ${medFeatures.length} Mediterranean coastal countries`);
medFeatures.forEach(f => {
    const name = f.properties.name || f.properties.NAME;
    console.log(`  - ${name}`);
});

// Build the Mediterranean bounding box polygon
const boxPolygon = {
    type: "Polygon",
    coordinates: [[
        [MED_BOX.minLon, MED_BOX.minLat],
        [MED_BOX.maxLon, MED_BOX.minLat],
        [MED_BOX.maxLon, MED_BOX.maxLat],
        [MED_BOX.minLon, MED_BOX.maxLat],
        [MED_BOX.minLon, MED_BOX.minLat]
    ]]
};

// Create the Mediterranean GeoJSON feature = bounding box + land as holes (evenodd)
// Strategy: Use MultiPolygon approach:
// - Outer ring: bounding box
// - Holes: each land polygon ring that falls within the box
const holeRings = [];
medFeatures.forEach(f => {
    if (!f.geometry) return;

    function processPolygon(coords) {
        const outerRing = coords[0];
        // Only include if the ring has significant overlap with Med box
        const clipped = clipRingToBox(outerRing);
        if (clipped.length >= 3) {
            holeRings.push(outerRing);
        }
        // Also process any existing holes (islands)
        // We skip holes here as they'd become sea (islands as holes of land = sea, correct!)
    }

    if (f.geometry.type === 'Polygon') processPolygon(f.geometry.coordinates);
    if (f.geometry.type === 'MultiPolygon') {
        f.geometry.coordinates.forEach(poly => processPolygon(poly));
    }
});

console.log(`\n${holeRings.length} land polygons will be subtracted from the Med box`);

// GeoJSON: Polygon with bounding box outer ring + land rings as holes
// Using evenodd fill rule in the renderer will make this look correct
const medSeaGeoJSON = {
    type: "FeatureCollection",
    features: [{
        type: "Feature",
        properties: { name: "Mediterranean Sea" },
        geometry: {
            type: "Polygon",
            coordinates: [
                // Outer: bounding box (counterclockwise for evenodd to work)
                [
                    [MED_BOX.minLon, MED_BOX.minLat],
                    [MED_BOX.minLon, MED_BOX.maxLat],
                    [MED_BOX.maxLon, MED_BOX.maxLat],
                    [MED_BOX.maxLon, MED_BOX.minLat],
                    [MED_BOX.minLon, MED_BOX.minLat]
                ],
                // Holes: land polygons (clockwise winding)
                ...holeRings
            ]
        }
    }]
};

const outputPath = resolve(BASE, 'public/maps/mediterranean-sea.geojson');
fs.writeFileSync(outputPath, JSON.stringify(medSeaGeoJSON, null, 2));
console.log(`\nSaved Mediterranean Sea GeoJSON to: ${outputPath}`);
console.log(`  Outer ring: 5 pts (bounding box)`);
console.log(`  Land holes: ${holeRings.length} polygons`);
