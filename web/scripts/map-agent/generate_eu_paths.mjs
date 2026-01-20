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
// We will generate paths for them too so the map looks complete, 
// but the game logic will filter for "EU_MEMBERS".
const CONTEXT_COUNTRIES = [
    'United Kingdom', 'Norway', 'Switzerland', 'Iceland', 'Ukraine', 'Belarus',
    'Moldova', 'Russia', 'Turkey', 'Serbia', 'Bosnia and Herz.', 'Montenegro',
    'North Macedonia', 'Albania', 'Kosovo', 'Andorra', 'San Marino', 'Vatican',
    'Monaco', 'Liechtenstein'
];

const ALL_EUROPE = [...EU_MEMBERS, ...CONTEXT_COUNTRIES];

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

    const paths = factory.generateSVGPaths('name');
    factory.saveTypeScript('src/components/games/data/eu-paths.ts', 'EU_PATHS', paths);

    console.log(`Successfully generated paths for ${Object.keys(paths).length} European countries (EU + Context).`);

} catch (error) {
    console.error("Error generating map:", error);
}
