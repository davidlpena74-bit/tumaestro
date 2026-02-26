import { MapFactory } from './MapFactory.mjs';

const EUROPE_COUNTRIES = [
    'Albania', 'Andorra', 'Armenia', 'Austria', 'Azerbaijan', 'Belarus', 'Belgium',
    'Bosnia and Herz.', 'Bulgaria', 'Croatia', 'Cyprus', 'Czechia', 'Denmark',
    'Estonia', 'Finland', 'France', 'Georgia', 'Germany', 'Greece', 'Hungary',
    'Iceland', 'Ireland', 'Italy', 'Kazakhstan', 'Kosovo', 'Latvia', 'Liechtenstein',
    'Lithuania', 'Luxembourg', 'Malta', 'Moldova', 'Monaco', 'Montenegro',
    'Netherlands', 'North Macedonia', 'Norway', 'Poland', 'Portugal', 'Romania',
    'Russia', 'San Marino', 'Serbia', 'Slovakia', 'Slovenia', 'Spain', 'Sweden',
    'Switzerland', 'Turkey', 'Ukraine', 'United Kingdom', 'Vatican',
    // Context Countries (Non-playable)
    'Morocco', 'Algeria', 'Tunisia', 'Libya', 'Egypt',
    'Israel', 'Lebanon', 'Syria', 'Jordan', 'Iraq', 'Iran',
    'Turkmenistan', 'Uzbekistan'
];

// Exact Capital Coordinates [Lon, Lat]
const PIN_COORDINATES = {
    "Vatican": [12.4533, 41.9029],
    "United Kingdom": [-0.1276, 51.5074], // London
    "Ukraine": [30.5234, 50.4501], // Kyiv
    "Turkey": [32.8597, 39.9334], // Ankara
    "Switzerland": [7.4474, 46.9480], // Bern
    "Sweden": [18.0686, 59.3293], // Stockholm
    "Spain": [-3.7038, 40.4168], // Madrid
    "Slovakia": [17.1077, 48.1486], // Bratislava
    "Slovenia": [14.5058, 46.0569], // Ljubljana
    "Serbia": [20.4489, 44.7866], // Belgrade
    "San Marino": [12.4578, 43.9424],
    "Russia": [37.6173, 55.7558], // Moscow
    "Romania": [26.1025, 44.4268], // Bucharest
    "Portugal": [-9.1393, 38.7223], // Lisbon
    "Poland": [21.0122, 52.2297], // Warsaw
    "Norway": [10.7522, 59.9139], // Oslo
    "Netherlands": [4.8952, 52.3702], // Amsterdam
    "Montenegro": [19.2600, 42.4304], // Podgorica
    "Moldova": [28.8638, 47.0105], // Chisinau
    "Monaco": [7.4128, 43.7384],
    "Malta": [14.5141, 35.8992], // Valletta
    "North Macedonia": [21.4280, 41.9965], // Skopje
    "Luxembourg": [6.1319, 49.6116],
    "Lithuania": [25.2797, 54.6872], // Vilnius
    "Liechtenstein": [9.5209, 47.1410], // Vaduz
    "Latvia": [24.1052, 56.9496], // Riga
    "Kosovo": [21.1655, 42.6629], // Pristina
    "Italy": [12.4964, 41.9028], // Rome
    "Ireland": [-6.2603, 53.3498], // Dublin
    "Iceland": [-21.9424, 64.1466], // Reykjavik
    "Hungary": [19.0402, 47.4979], // Budapest
    "Greece": [23.7275, 37.9838], // Athens
    "Germany": [13.4050, 52.5200], // Berlin
    "Georgia": [44.8271, 41.7151], // Tbilisi
    "France": [2.3522, 48.8566], // Paris
    "Finland": [24.9414, 60.1699], // Helsinki
    "Estonia": [24.7536, 59.4370], // Tallinn
    "Denmark": [12.5683, 55.6761], // Copenhagen
    "Czechia": [14.4378, 50.0755], // Prague
    "Cyprus": [33.3823, 35.1856], // Nicosia
    "Croatia": [15.9819, 45.8150], // Zagreb
    "Bulgaria": [23.3219, 42.6977], // Sofia
    "Bosnia and Herz.": [18.4131, 43.8563], // Sarajevo
    "Belgium": [4.3517, 50.8503], // Brussels
    "Belarus": [27.5615, 53.9006], // Minsk
    "Azerbaijan": [49.8671, 40.4093], // Baku
    "Austria": [16.3738, 48.2082], // Vienna
    "Armenia": [44.5152, 40.1792], // Yerevan
    "Andorra": [1.5218, 42.5063],
    "Albania": [19.8189, 41.3275] // Tirana
};

const factory = new MapFactory();

try {
    factory
        .loadTopoJSON('public/maps/world-countries-50m.json', 'countries')
        .filter(f => {
            const name = f.properties.name;
            if (name === 'Macedonia') return true;
            return EUROPE_COUNTRIES.includes(name);
        })
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

            return d3.geoMercator()
                .fitExtent([[40, 40], [760, 560]], boundingBox);
        });

    // 1. Generate paths
    const paths = factory.generateSVGPaths(f => {
        const name = f.properties.name;
        if (name === 'Macedonia') return 'North Macedonia';
        return name;
    });
    factory.saveTypeScript('src/components/games/data/europe-paths.ts', 'EUROPE_PATHS', paths);

    // 2. Generate capitals coordinates using the exact same projection
    const capitalCoords = factory.projectCoordinates(PIN_COORDINATES);
    factory.saveTypeScript('src/components/games/data/europe-capitals-coords.ts', 'EUROPE_CAPITALS_COORDS', capitalCoords, 'Record<string, { x: number, y: number }>');

    console.log(`Successfully generated paths and precise capital coordinates for Europe.`);

} catch (error) {
    console.error("Error generating Europe map and capitals:", error);
}
