
import fs from 'fs';
import * as d3 from 'd3-geo';
import * as topojson from 'topojson-client';

// Load all data
const worldData = JSON.parse(fs.readFileSync('public/maps/world-countries-50m.json', 'utf8'));
const worldFeatures = topojson.feature(worldData, worldData.objects.countries).features;
const spainFeature = worldFeatures.find(f => f.properties.name === 'Spain');

// Load detailed provinces GeoJSON
const provinceData = JSON.parse(fs.readFileSync('public/maps/spain-provinces.geojson', 'utf8'));
const provinceFeatures = provinceData.features;

// Define mainland Spain for fitting
const mainlandSpain = {
    type: 'Feature',
    geometry: {
        type: 'MultiPolygon',
        coordinates: spainFeature.geometry.coordinates.filter(poly => {
            const lon = poly[0][0][0];
            return lon > -12;
        })
    }
};

// Unified Projection (same as previous vOutline)
const projection = d3.geoMercator()
    .fitExtent([[-10, -10], [660, 560]], mainlandSpain);

const pathGen = d3.geoPath().projection(projection);

// Helper to normalize names to match PROVINCE_NAMES keys
function normalizeName(name) {
    const n = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '').replace(/[/]/g, '');

    const map = {
        "acoruna": "acoruna",
        "alava": "alava",
        "arabaalava": "alava",
        "albacete": "albacete",
        "alicante": "alicante",
        "alacantalicante": "alicante",
        "almeria": "almeria",
        "asturias": "asturias",
        "avila": "avila",
        "badajoz": "badajoz",
        "balears,illes": "baleares",
        "illesbalears": "baleares",
        "barcelona": "barcelona",
        "bizkaia": "bizkaia",
        "bizkaiavizcaya": "bizkaia",
        "burgos": "burgos",
        "caceres": "caceres",
        "cadiz": "cadiz",
        "cantabria": "cantabria",
        "castellon": "castellon",
        "castellocastellon": "castellon",
        "ciudadreal": "ciudadreal",
        "cordoba": "cordoba",
        "cuenca": "cuenca",
        "gipuzkoa": "gipuzkoa",
        "gipuzkoaguipuzcoa": "gipuzkoa",
        "girona": "girona",
        "granada": "granada",
        "guadalajara": "guadalajara",
        "huelva": "huelva",
        "huesca": "huesca",
        "jaen": "jaen",
        "larioja": "larioja",
        "laspalmas": "laspalmas",
        "leon": "leon",
        "lleida": "lleida",
        "lugo": "lugo",
        "madrid": "madrid",
        "malaga": "malaga",
        "murcia": "murcia",
        "navarra": "navarra",
        "ourense": "ourense",
        "palencia": "palencia",
        "pontevedra": "pontevedra",
        "salamanca": "salamanca",
        "santacruzdetenerife": "santacruz",
        "santacruz": "santacruz",
        "segovia": "segovia",
        "sevilla": "sevilla",
        "soria": "soria",
        "tarragona": "tarragona",
        "teruel": "teruel",
        "toledo": "toledo",
        "valencia": "valencia",
        "valenciavalencia": "valencia",
        "valladolid": "valladolid",
        "zamora": "zamora",
        "zaragoza": "zaragoza",
        "ceuta": "ceuta",
        "melilla": "melilla"
    };

    return map[n] || n;
}

const provincesPaths = {};
provinceFeatures.forEach(f => {
    const id = normalizeName(f.properties.name);
    const d = pathGen(f);
    if (d) {
        provincesPaths[id] = d;
    }
});

// Also include Neighbors and Outline
const neighborsPaths = {};
const TARGETS = ['Portugal', 'France', 'Andorra', 'Morocco', 'Algeria'];
TARGETS.forEach(name => {
    const feature = worldFeatures.find(f => f.properties.name === name);
    if (feature) neighborsPaths[name] = pathGen(feature);
});
neighborsPaths["Spain_Outline"] = pathGen(mainlandSpain);

// Output all to a combined file or separate ones
const outputProvinces = `// UNIFIED PROJECTION (vProvinces)
export const SPAIN_PROVINCES_PATHS_UNIFIED: Record<string, string> = ${JSON.stringify(provincesPaths, null, 2)};
`;

const outputNeighbors = `// UNIFIED PROJECTION (vProvinces)
export const SPAIN_PROVINCES_NEIGHBORS_PATHS: Record<string, string> = ${JSON.stringify(neighborsPaths, null, 2)};
`;

fs.writeFileSync('src/components/games/data/spain-provinces-paths-unified.ts', outputProvinces);
fs.writeFileSync('src/components/games/data/spain-neighbors-provinces-paths.ts', outputNeighbors);

console.log('✅ Unified all 52 provinces and neighbors.');
