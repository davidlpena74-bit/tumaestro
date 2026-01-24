import { MapFactory } from './MapFactory.mjs';

const ASIA_OCEANIA_COUNTRIES = [
    // Asia
    'Afghanistan', 'Armenia', 'Azerbaijan', 'Bahrain', 'Bangladesh', 'Bhutan', 'Brunei',
    'Cambodia', 'China', 'Cyprus', 'Georgia', 'Hong Kong', 'India', 'Indonesia', 'Iran',
    'Iraq', 'Israel', 'Japan', 'Jordan', 'Kazakhstan', 'Kuwait', 'Kyrgyzstan', 'Laos',
    'Lebanon', 'Macao', 'Malaysia', 'Maldives', 'Mongolia', 'Myanmar', 'Nepal',
    'North Korea', 'Oman', 'Pakistan', 'Palestine', 'Philippines', 'Qatar', 'Russia',
    'Saudi Arabia', 'Singapore', 'South Korea', 'Sri Lanka', 'Syria', 'Taiwan',
    'Tajikistan', 'Thailand', 'Timor-Leste', 'Turkey', 'Turkmenistan',
    'United Arab Emirates', 'Uzbekistan', 'Vietnam', 'Yemen',

    // Oceania
    'Australia', 'Fiji', 'Kiribati', 'Marshall Is.', 'Micronesia', 'Nauru', 'New Zealand',
    'Palau', 'Papua New Guinea', 'Samoa', 'Solomon Is.', 'Tonga', 'Tuvalu', 'Vanuatu'
];

const factory = new MapFactory();

try {
    factory
        .loadTopoJSON('public/maps/world-countries-50m.json', 'countries')
        .filter(f => ASIA_OCEANIA_COUNTRIES.includes(f.properties.name))
        .setProjection((collection, d3) => {
            const boundingBox = {
                type: "Feature",
                geometry: {
                    type: "LineString",
                    coordinates: [
                        [25, -50],  // SW
                        [180, -50], // SE
                        [180, 80],  // NE
                        [25, 80]    // NW
                    ]
                }
            };

            // Increased padding to 40px
            return d3.geoMercator()
                .fitExtent([[40, 40], [760, 560]], boundingBox);
        });

    const paths = factory.generateSVGPaths('name');
    factory.saveTypeScript('src/components/games/data/asia-oceania-paths.ts', 'ASIA_OCEANIA_PATHS', paths);

    console.log(`Successfully generated paths for ${Object.keys(paths).length} Asian/Oceanic countries (Fit with Padding).`);

} catch (error) {
    console.error("Error generating Asia/Oceania map:", error);
}
