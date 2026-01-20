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
            // Using fitExtent to ensure it maximizes the 800x600 viewbox
            return d3.geoMercator()
                .center([10, 54])
                .fitExtent([[20, 20], [780, 580]], collection);
        });

    const paths = factory.generateSVGPaths('name');
    factory.saveTypeScript('src/components/games/data/europe-paths.ts', 'EUROPE_PATHS', paths);

    console.log(`Successfully generated paths for ${Object.keys(paths).length} European countries.`);

} catch (error) {
    console.error("Error generating map:", error);
}
