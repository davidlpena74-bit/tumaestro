import { MapFactory } from './MapFactory.mjs';

// List of European Union Member Countries (27 members as of 2024)
// Using English names to match Natural Earth Data
const EU_MEMBERS = [
    'Austria', 'Belgium', 'Bulgaria', 'Croatia', 'Cyprus', 'Czechia', 'Denmark',
    'Estonia', 'Finland', 'France', 'Germany', 'Greece', 'Hungary', 'Ireland',
    'Italy', 'Latvia', 'Lithuania', 'Luxembourg', 'Malta', 'Netherlands', 'Poland',
    'Portugal', 'Romania', 'Slovakia', 'Slovenia', 'Spain', 'Sweden'
];

// Non-EU countries to include for context (visual only, maybe greyed out)
const CONTEXT_COUNTRIES = [
    'United Kingdom', 'Norway', 'Switzerland', 'Iceland', 'Ukraine', 'Belarus',
    'Moldova', 'Russia', 'Turkey', 'Serbia', 'Bosnia and Herz.', 'Montenegro',
    'North Macedonia', 'Albania', 'Kosovo', 'Andorra', 'San Marino', 'Vatican',
    'Monaco', 'Liechtenstein'
];

const ALL_EUROPE = [...EU_MEMBERS, ...CONTEXT_COUNTRIES];

// Explicit Capital Coordinates [Lon, Lat]
const CAPITAL_COORDS = {
    'Albania': [19.8, 41.3],
    'Andorra': [1.5, 42.5],
    'Austria': [16.3, 48.2],
    'Belarus': [27.5, 53.9],
    'Belgium': [4.3, 50.8],
    'Bosnia and Herz.': [18.4, 43.8],
    'Bulgaria': [23.3, 42.7],
    'Croatia': [15.9, 45.8],
    'Cyprus': [33.3, 35.1],
    'Czechia': [14.4, 50.0],
    'Denmark': [12.5, 55.6], // Copenhagen is on Zealand
    'Estonia': [24.7, 59.4],
    'Finland': [24.9, 60.1],
    'France': [2.3, 48.8],
    'Germany': [13.4, 52.5],
    'Greece': [23.7, 37.9],
    'Hungary': [19.0, 47.5],
    'Iceland': [-21.9, 64.1],
    'Ireland': [-6.2, 53.3],
    'Italy': [12.4, 41.9],
    'Kosovo': [21.1, 42.6],
    'Latvia': [24.1, 56.9],
    'Liechtenstein': [9.5, 47.1],
    'Lithuania': [25.2, 54.6],
    'Luxembourg': [6.1, 49.6],
    'Malta': [14.5, 35.9],
    'Moldova': [28.8, 47.0],
    'Monaco': [7.4, 43.7],
    'Montenegro': [19.2, 42.4],
    'Netherlands': [4.9, 52.3],
    'North Macedonia': [21.4, 42.0],
    'Norway': [10.7, 59.9],
    'Poland': [21.0, 52.2],
    'Portugal': [-9.1, 38.7],
    'Romania': [26.1, 44.4],
    'Russia': [37.6, 55.7],
    'San Marino': [12.4, 43.9],
    'Serbia': [20.4, 44.8],
    'Slovakia': [17.1, 48.1],
    'Slovenia': [14.5, 46.0],
    'Spain': [-3.7, 40.4],
    'Sweden': [18.0, 59.3],
    'Switzerland': [7.4, 46.9],
    'Turkey': [32.8, 39.9],
    'Ukraine': [30.5, 50.4],
    'United Kingdom': [-0.1, 51.5],
    'Vatican': [12.4, 41.9]
};

const factory = new MapFactory();

try {
    factory
        .loadTopoJSON('public/maps/world-countries-50m.json', 'countries')
        .filter(f => ALL_EUROPE.includes(f.properties.name))
        .setProjection((collection, d3) => {
            // Same projection as standard Europe map for consistency
            const boundingBox = {
                type: "Feature",
                geometry: {
                    type: "LineString",
                    coordinates: [
                        [-18, 27.5], // South-West
                        [35, 27.5],  // South-East
                        [35, 71.5],   // North-East
                        [-18, 71.5],  // North-West
                        [-24, 64]     // Iceland
                    ]
                }
            };

            return d3.geoMercator()
                .fitExtent([[5, 5], [795, 595]], boundingBox);
        });

    // 1. Generate SVG Paths (Borders)
    const paths = factory.generateSVGPaths('name');
    factory.saveTypeScript('src/components/games/data/eu-paths.ts', 'EU_PATHS', paths);

    // 2. Generate Accurate Capital Coordinates
    // Instead of centroids, we project known Lat/Lon coordinates
    const coords = factory.projectCoordinates(CAPITAL_COORDS);
    factory.saveTypeScript(
        'src/components/games/data/eu-capitals-coords.ts',
        'EU_CAPITALS_COORDS',
        coords,
        'Record<string, {x: number, y: number}>'
    );

    console.log(`Successfully generated paths and coords for ${Object.keys(paths).length} European countries.`);

} catch (error) {
    console.error("Error generating map:", error);
}
