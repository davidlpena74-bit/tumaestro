import { MapFactory } from './MapFactory.mjs';

const NORTH_AMERICA_COUNTRIES = [
    'Canada', 'United States of America', 'Mexico', 'Greenland', 'Bahamas',
    'Cuba', 'Haiti', 'Dominican Rep.', 'Jamaica', 'Guatemala', 'Belize',
    'El Salvador', 'Honduras', 'Nicaragua', 'Costa Rica', 'Panama',
    'Puerto Rico', 'Antigua and Barb.', 'Barbados', 'Dominica', 'Grenada',
    'Saint Lucia', 'St. Kitts and Nevis', 'St. Vin. and Gren.', 'Trinidad and Tobago'
];

const factory = new MapFactory();

try {
    factory
        .loadTopoJSON('public/maps/world-countries-50m.json', 'countries')
        .filter(f => NORTH_AMERICA_COUNTRIES.includes(f.properties.name))
        .setProjection((collection, d3) => {
            const boundingBox = {
                type: "Feature",
                geometry: {
                    type: "LineString",
                    coordinates: [
                        [-170, 7],   // SW (South of Panama)
                        [-20, 7],    // SE
                        [-20, 85],   // NE (North Greenland)
                        [-170, 85]   // NW
                    ]
                }
            };

            return d3.geoMercator()
                .fitExtent([[40, 40], [760, 560]], boundingBox);
        });

    const paths = factory.generateSVGPaths('name');
    factory.saveTypeScript('src/components/games/data/north-america-paths.ts', 'NORTH_AMERICA_PATHS', paths);

    console.log(`Successfully generated paths for ${Object.keys(paths).length} North American countries.`);

} catch (error) {
    console.error("Error generating North America map:", error);
}
