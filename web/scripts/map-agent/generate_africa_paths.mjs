import { MapFactory } from './MapFactory.mjs';

const AFRICA_COUNTRIES = [
    'Algeria', 'Angola', 'Benin', 'Botswana', 'Burkina Faso', 'Burundi', 'Cabo Verde',
    'Cameroon', 'Central African Rep.', 'Chad', 'Comoros', 'Congo', "Côte d'Ivoire",
    'Dem. Rep. Congo', 'Djibouti', 'Egypt', 'Eq. Guinea', 'Eritrea', 'Ethiopia',
    'Gabon', 'Gambia', 'Ghana', 'Guinea', 'Guinea-Bissau', 'Kenya', 'Lesotho',
    'Liberia', 'Libya', 'Madagascar', 'Malawi', 'Mali', 'Mauritania', 'Mauritius',
    'Morocco', 'Mozambique', 'Namibia', 'Niger', 'Nigeria', 'Rwanda',
    'São Tomé and Principe', 'Senegal', 'Seychelles', 'Sierra Leone', 'Somalia',
    'Somaliland', 'South Africa', 'S. Sudan', 'Sudan', 'Tanzania', 'Togo',
    'Tunisia', 'Uganda', 'Zambia', 'Zimbabwe', 'eSwatini', 'W. Sahara'
];

const factory = new MapFactory();

try {
    factory
        .loadTopoJSON('public/maps/world-countries-50m.json', 'countries')
        .filter(f => AFRICA_COUNTRIES.includes(f.properties.name))
        .setProjection((collection, d3) => {
            // Tightening the bounding box to the actual continent limits for maximum height
            // Including Madagascar and surrounding islands.
            const boundingBox = {
                type: "Feature",
                geometry: {
                    type: "LineString",
                    coordinates: [
                        [-19, -36], // West Coast to South
                        [53, -36],  // East Coast (including Madagascar)
                        [53, 38],   // North East
                        [-19, 38]   // North West
                    ]
                }
            };

            // Using very small vertical padding (10, 10) to make it "fit the height" 
            // of the SVG viewport (800x600)
            return d3.geoMercator()
                .fitExtent([[10, 10], [790, 590]], boundingBox);
        });

    const paths = factory.generateSVGPaths('name');
    factory.saveTypeScript('src/components/games/data/africa-paths.ts', 'AFRICA_PATHS', paths);

    console.log(`Successfully generated paths for ${Object.keys(paths).length} African countries (Fit to Height).`);

} catch (error) {
    console.error("Error generating Africa map:", error);
}
