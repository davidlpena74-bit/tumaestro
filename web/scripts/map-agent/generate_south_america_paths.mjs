import { MapFactory } from './MapFactory.mjs';

const SOUTH_AMERICA_COUNTRIES = [
    'Argentina', 'Bolivia', 'Brazil', 'Chile', 'Colombia', 'Ecuador',
    'Guyana', 'Paraguay', 'Peru', 'Suriname', 'Uruguay', 'Venezuela',
    'Falkland Is.', 'Trinidad and Tobago'
];

const factory = new MapFactory();

try {
    factory
        .loadTopoJSON('public/maps/world-countries-50m.json', 'countries')
        .filter(f => SOUTH_AMERICA_COUNTRIES.includes(f.properties.name))
        .setProjection((collection, d3) => {
            const boundingBox = {
                type: "Feature",
                geometry: {
                    type: "LineString",
                    coordinates: [
                        [-95, -58], // SW
                        [-30, -58], // SE
                        [-30, 15],  // NE
                        [-95, 15]   // NW
                    ]
                }
            };

            return d3.geoMercator()
                .fitExtent([[40, 40], [760, 560]], boundingBox);
        });

    const paths = factory.generateSVGPaths('name');
    factory.saveTypeScript('src/components/games/data/south-america-paths.ts', 'SOUTH_AMERICA_PATHS', paths);

    console.log(`Successfully generated paths for ${Object.keys(paths).length} South American countries.`);

} catch (error) {
    console.error("Error generating South America map:", error);
}
