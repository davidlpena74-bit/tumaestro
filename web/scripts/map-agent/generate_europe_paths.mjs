import { MapFactory } from './MapFactory.mjs';

const EUROPE_COUNTRIES = [
    'Albania', 'Andorra', 'Armenia', 'Austria', 'Azerbaijan', 'Belarus', 'Belgium',
    'Bosnia and Herz.', 'Bulgaria', 'Croatia', 'Cyprus', 'Czechia', 'Denmark',
    'Estonia', 'Finland', 'France', 'Georgia', 'Germany', 'Greece', 'Hungary',
    'Iceland', 'Ireland', 'Italy', 'Kazakhstan', 'Kosovo', 'Latvia', 'Liechtenstein',
    'Lithuania', 'Luxembourg', 'Malta', 'Moldova', 'Monaco', 'Montenegro',
    'Netherlands', 'North Macedonia', 'Norway', 'Poland', 'Portugal', 'Romania',
    'Russia', 'San Marino', 'Serbia', 'Slovakia', 'Slovenia', 'Spain', 'Sweden',
    'Switzerland', 'Turkey', 'Ukraine', 'United Kingdom', 'Vatican'
];

const factory = new MapFactory();

try {
    factory
        .loadTopoJSON('public/maps/world-countries-50m.json', 'countries')
        .filter(f => EUROPE_COUNTRIES.includes(f.properties.name))
        .setProjection((collection, d3) => {
            const boundingBox = {
                type: "Feature",
                geometry: {
                    type: "LineString",
                    coordinates: [
                        [-25, 30], // SW
                        [60, 30],  // SE
                        [60, 72],  // NE
                        [-25, 72]  // NW
                    ]
                }
            };

            // Increased padding to 40px
            return d3.geoMercator()
                .fitExtent([[40, 40], [760, 560]], boundingBox);
        });

    const paths = factory.generateSVGPaths('name');
    factory.saveTypeScript('src/components/games/data/europe-paths.ts', 'EUROPE_PATHS', paths);

    console.log(`Successfully generated paths for ${Object.keys(paths).length} European countries (Fit with Padding).`);

} catch (error) {
    console.error("Error generating Europe map:", error);
}
