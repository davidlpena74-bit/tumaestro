import { MapFactory } from './MapFactory.mjs';

// Full list of European countries (approx 50)
// Using English names as they usually appear in Natural Earth Data
const EUROPEAN_COUNTRIES = [
    // Western Europe
    'Belgium', 'France', 'Germany', 'Ireland', 'Luxembourg', 'Netherlands', 'United Kingdom',

    // Eastern Europe
    'Belarus', 'Bulgaria', 'Czechia', 'Hungary', 'Moldova', 'Poland', 'Romania', 'Slovakia', 'Ukraine', 'Russia',

    // Northern Europe
    'Denmark', 'Estonia', 'Finland', 'Iceland', 'Latvia', 'Lithuania', 'Norway', 'Sweden',

    // Southern Europe
    'Albania', 'Andorra', 'Bosnia and Herz.', 'Croatia', 'Greece', 'Italy', 'Malta', 'Montenegro', 'North Macedonia', 'Portugal', 'San Marino', 'Serbia', 'Slovenia', 'Spain', 'Vatican', 'Kosovo',

    // Transcontinental / Others often included
    'Turkey', 'Cyprus', 'Georgia', 'Armenia', 'Azerbaijan', 'Kazakhstan', 'Switzerland', 'Austria', 'Liechtenstein', 'Monaco'
];

const factory = new MapFactory();

try {
    factory
        .loadTopoJSON('public/maps/world-countries-50m.json', 'countries')
        .filter(f => EUROPEAN_COUNTRIES.includes(f.properties.name))
        .setProjection((collection, d3) => {
            // Mercator projection centered on Europe
            // We fit the extent to a specific bounding box to match user request:
            // "North of Norway close to upper limit" (approx 71.2 N)
            // "Canary Islands close to lower limit" (approx 27.6 N)

            const boundingBox = {
                type: "Feature",
                geometry: {
                    type: "LineString",
                    coordinates: [
                        [-18, 27.5], // South-West (Canaries latitude)
                        [35, 27.5],  // South-East
                        [35, 71.5],  // North-East (North Cape latitude)
                        [-18, 71.5], // North-West
                        [-24, 64]    // Iceland (ensure it's included in width)
                    ]
                }
            };

            return d3.geoMercator()
                .fitExtent([[5, 5], [795, 595]], boundingBox);
        });

    const paths = factory.generateSVGPaths('name');
    factory.saveTypeScript('src/components/games/data/europe-paths.ts', 'EUROPE_PATHS', paths);

    console.log(`Successfully generated paths for ${Object.keys(paths).length} European countries.`);

} catch (error) {
    console.error("Error generating map:", error);
}
