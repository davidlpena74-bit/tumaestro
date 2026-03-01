import { MapFactory } from './MapFactory.mjs';
import * as d3 from 'd3-geo';

const CONTINENTS = {
    europe: {
        playable: [
            'Albania', 'Andorra', 'Armenia', 'Austria', 'Azerbaijan', 'Belarus', 'Belgium',
            'Bosnia and Herz.', 'Bulgaria', 'Croatia', 'Cyprus', 'Czechia', 'Denmark',
            'Estonia', 'Finland', 'France', 'Georgia', 'Germany', 'Greece', 'Hungary',
            'Iceland', 'Ireland', 'Italy', 'Kosovo', 'Latvia', 'Liechtenstein', 'Lithuania',
            'Luxembourg', 'Malta', 'Moldova', 'Monaco', 'Montenegro', 'Netherlands',
            'North Macedonia', 'Norway', 'Poland', 'Portugal', 'Romania', 'Russia',
            'San Marino', 'Serbia', 'Slovakia', 'Slovenia', 'Spain', 'Sweden', 'Switzerland',
            'Turkey', 'Ukraine', 'United Kingdom', 'Vatican'
        ],
        neighbors: [
            'Morocco', 'Algeria', 'Tunisia', 'Libya', 'Egypt', 'Israel', 'Palestine',
            'Jordan', 'Syria', 'Iraq', 'Iran', 'Kazakhstan', 'Turkmenistan', 'Uzbekistan'
        ],
        bbox: [[-25, 34], [45, 72]] // [ [minLon, minLat], [maxLon, maxLat] ]
    },
    africa: {
        playable: [
            'Algeria', 'Angola', 'Benin', 'Botswana', 'Burkina Faso', 'Burundi', 'Cabo Verde',
            'Cameroon', 'Central African Rep.', 'Chad', 'Comoros', 'Congo', "Côte d'Ivoire",
            'Dem. Rep. Congo', 'Djibouti', 'Egypt', 'Eq. Guinea', 'Eritrea', 'Ethiopia',
            'Gabon', 'Gambia', 'Ghana', 'Guinea', 'Guinea-Bissau', 'Kenya', 'Lesotho',
            'Liberia', 'Libya', 'Madagascar', 'Malawi', 'Mali', 'Mauritania', 'Mauritius',
            'Morocco', 'Mozambique', 'Namibia', 'Niger', 'Nigeria', 'Rwanda',
            'São Tomé and Principe', 'Senegal', 'Seychelles', 'Sierra Leone', 'Somalia',
            'Somaliland', 'South Africa', 'S. Sudan', 'Sudan', 'Tanzania', 'Togo',
            'Tunisia', 'Uganda', 'Zambia', 'Zimbabwe', 'eSwatini', 'W. Sahara'
        ],
        neighbors: [
            'Spain', 'Portugal', 'Italy', 'Greece', 'Turkey', 'Saudi Arabia', 'Yemen',
            'Oman', 'Jordan', 'Israel', 'Palestine', 'Syria', 'Iraq', 'Iran'
        ],
        bbox: [[-20, -36], [55, 38]]
    },
    america: {
        playable: [
            'Antigua and Barb.', 'Argentina', 'Bahamas', 'Barbados', 'Belize', 'Bolivia', 'Brazil',
            'Canada', 'Chile', 'Colombia', 'Costa Rica', 'Cuba', 'Dominica', 'Dominican Rep.',
            'Ecuador', 'El Salvador', 'Grenada', 'Guatemala', 'Guyana', 'Haiti', 'Honduras',
            'Jamaica', 'Mexico', 'Nicaragua', 'Panama', 'Paraguay', 'Peru', 'Puerto Rico',
            'Saint Lucia', 'St. Kitts and Nevis', 'St. Vin. and Gren.', 'Suriname',
            'Trinidad and Tobago', 'United States of America', 'Uruguay', 'Venezuela',
            'Greenland', 'Falkland Is.'
        ],
        neighbors: [
            'Iceland', 'Russia', 'Cabo Verde', 'French Polynesia'
        ],
        bbox: [[-168, -58], [-34, 84]]
    },
    asia: {
        playable: [
            'Afghanistan', 'Armenia', 'Azerbaijan', 'Bahrain', 'Bangladesh', 'Bhutan', 'Brunei',
            'Camboya', 'China', 'Cyprus', 'Georgia', 'India', 'Indonesia', 'Iran', 'Iraq',
            'Israel', 'Japan', 'Jordan', 'Kazakhstan', 'Kuwait', 'Kyrgyzstan', 'Laos',
            'Lebanon', 'Malaysia', 'Maldives', 'Mongolia', 'Myanmar', 'Nepal', 'North Korea',
            'Oman', 'Pakistan', 'Palestine', 'Philippines', 'Qatar', 'Russia', 'Saudi Arabia',
            'Singapore', 'South Korea', 'Sri Lanka', 'Syria', 'Taiwan', 'Tajikistan',
            'Thailand', 'Timor-Leste', 'Turkey', 'Turkmenistan', 'United Arab Emirates',
            'Uzbekistan', 'Vietnam', 'Yemen'
        ],
        neighbors: [
            'Egypt', 'Sudan', 'Ethiopia', 'Somalia', 'Greece', 'Bulgaria', 'Romania',
            'Ukraine', 'Belarus', 'Poland', 'Latvia', 'Estonia', 'Finland', 'Australia',
            'Papua New Guinea'
        ],
        bbox: [[24, -12], [180, 82]]
    },
    oceania: {
        playable: [
            'Australia', 'Fiji', 'Kiribati', 'Marshall Is.', 'Micronesia', 'Nauru',
            'New Zealand', 'Palau', 'Papua New Guinea', 'Samoa', 'Solomon Is.',
            'Tonga', 'Tuvalu', 'Vanuatu', 'New Caledonia', 'Solomon Is.', 'Vanuatu'
        ],
        neighbors: [
            'Indonesia', 'Philippines', 'Timor-Leste', 'Chile'
        ],
        bbox: [[110, -50], [180, 25]]
    }
};

const factory = new MapFactory();

async function run() {
    try {
        factory.loadTopoJSON('public/maps/world-countries-50m.json', 'countries');

        for (const [name, config] of Object.entries(CONTINENTS)) {
            console.log(`\n🌍 Processing ${name.toUpperCase()}...`);

            const playableSet = new Set(config.playable);
            const neighborSet = new Set(config.neighbors);

            // 1. Playable paths
            const playableFeatures = factory.features.filter(f => playableSet.has(f.properties.name));

            // 2. Neighbor paths
            const neighborFeatures = factory.features.filter(f => neighborSet.has(f.properties.name));

            // Projection Setup
            const collection = { type: 'FeatureCollection', features: [...playableFeatures, ...neighborFeatures] };

            // Create a bounding box feature to fit
            const bboxFeature = {
                type: 'Feature',
                geometry: {
                    type: 'Polygon',
                    coordinates: [[
                        [config.bbox[0][0], config.bbox[0][1]],
                        [config.bbox[1][0], config.bbox[0][1]],
                        [config.bbox[1][0], config.bbox[1][1]],
                        [config.bbox[0][0], config.bbox[1][1]],
                        [config.bbox[0][0], config.bbox[0][1]]
                    ]]
                }
            };

            const projection = d3.geoMercator()
                .fitExtent([[5, 5], [795, 595]], bboxFeature);

            const geoPath = d3.geoPath().projection(projection);

            // Generate paths for playable
            const playablePaths = {};
            playableFeatures.forEach(f => {
                const path = geoPath(f);
                if (path) playablePaths[f.properties.name] = path;
            });

            // Generate paths for neighbors
            const neighborPaths = {};
            neighborFeatures.forEach(f => {
                const path = geoPath(f);
                if (path) neighborPaths[f.properties.name] = path;
            });

            // Save files
            const pathFile = `src/components/games/data/${name}-paths.ts`;
            const neighborFile = `src/components/games/data/${name}-neighbors-paths.ts`;

            factory.saveTypeScript(pathFile, `${name.toUpperCase()}_PATHS`, playablePaths);
            factory.saveTypeScript(neighborFile, `${name.toUpperCase()}_NEIGHBORS_PATHS`, neighborPaths);

            console.log(`   - Saved ${Object.keys(playablePaths).length} playable countries to ${pathFile}`);
            console.log(`   - Saved ${Object.keys(neighborPaths).length} neighbor countries to ${neighborFile}`);
        }

        console.log("\n✅ All continents generated successfully!");

    } catch (error) {
        console.error("Critical error during mass generation:", error);
    }
}

run();
