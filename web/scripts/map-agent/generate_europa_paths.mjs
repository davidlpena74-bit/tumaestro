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
            // We fit the extent to 'Core Europe' to ensure good initial zoom
            // Excluding massive eastern countries (Russia, Kazakhstan) and far periphery to focus the view
            // The features for these countries will still be generated, but they might extend off-canvas initially
            const FIT_EXCLUSIONS = ['Russia', 'Kazakhstan', 'Turkey', 'Georgia', 'Armenia', 'Azerbaijan', 'Cyprus'];

            const fitCollection = {
                type: "FeatureCollection",
                features: collection.features.filter(f => !FIT_EXCLUSIONS.includes(f.properties.name))
            };

            return d3.geoMercator()
                .center([10, 54])
                .fitExtent([[20, 20], [780, 580]], fitCollection);
        });

    const paths = factory.generateSVGPaths('name');
    factory.saveTypeScript('src/components/games/data/europe-paths.ts', 'EUROPE_PATHS', paths);

    console.log(`Successfully generated paths for ${Object.keys(paths).length} European countries.`);

} catch (error) {
    console.error("Error generating map:", error);
}
