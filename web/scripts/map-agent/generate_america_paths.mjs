import { MapFactory } from './MapFactory.mjs';

const AMERICA_COUNTRIES = [
    'Antigua and Barb.', 'Argentina', 'Bahamas', 'Barbados', 'Belize', 'Bolivia', 'Brazil',
    'Canada', 'Chile', 'Colombia', 'Costa Rica', 'Cuba', 'Dominica', 'Dominican Rep.',
    'Ecuador', 'El Salvador', 'Grenada', 'Guatemala', 'Guyana', 'Haiti', 'Honduras',
    'Jamaica', 'Mexico', 'Nicaragua', 'Panama', 'Paraguay', 'Peru', 'Puerto Rico',
    'Saint Lucia', 'St. Kitts and Nevis', 'St. Vin. and Gren.', 'Suriname',
    'Trinidad and Tobago', 'United States of America', 'Uruguay', 'Venezuela',
    'Greenland', 'Falkland Is.'
];

const factory = new MapFactory();

try {
    factory
        .loadTopoJSON('public/maps/world-countries-50m.json', 'countries')
        .filter(f => AMERICA_COUNTRIES.includes(f.properties.name))
        .setProjection((collection, d3) => {
            // Tightening the bounding box to focus on the land masses
            const boundingBox = {
                type: "Feature",
                geometry: {
                    type: "LineString",
                    coordinates: [
                        [-168, -56], // SW (focus on land)
                        [-34, -56],  // SE
                        [-34, 84],   // NE (top of Greenland)
                        [-168, 84]   // NW
                    ]
                }
            };

            // Reduced padding to 10px to "fit height" as much as possible
            return d3.geoMercator()
                .fitExtent([[10, 10], [790, 590]], boundingBox);
        });

    const paths = factory.generateSVGPaths('name');
    factory.saveTypeScript('src/components/games/data/america-paths.ts', 'AMERICA_PATHS', paths);

    console.log(`Successfully generated paths for ${Object.keys(paths).length} American countries (Fit to Height).`);

} catch (error) {
    console.error("Error generating America map:", error);
}
