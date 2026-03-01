
import fs from 'fs';
import * as d3 from 'd3-geo';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// Try to get d3-composite-projections via cjs to avoid ESM issues in Node
let geoConicConformalSpain;
try {
    const d3cp = require('d3-composite-projections');
    geoConicConformalSpain = d3cp.geoConicConformalSpain;
} catch (e) {
    console.log('Failed to require d3-composite-projections, trying manual path');
}

if (!geoConicConformalSpain) {
    console.error('Could not load geoConicConformalSpain');
    process.exit(1);
}

const COMMUNITIES_JSON = 'c:/Users/david/Desktop/Projects-Antigravity/Tu Maestro/web/public/maps/spain-communities.json';
const PROVINCES_JSON = 'c:/Users/david/Desktop/Projects-Antigravity/Tu Maestro/web/public/maps/spain-provinces-official.json';

const CCAA_MAP = {
    '01': 'andalucia',
    '02': 'aragon',
    '03': 'asturias',
    '04': 'baleares',
    '05': 'canarias',
    '06': 'cantabria',
    '07': 'castillaleon',
    '08': 'castillalamancha',
    '09': 'cataluna',
    '10': 'valencia',
    '11': 'extremadura',
    '12': 'galicia',
    '13': 'madrid',
    '14': 'murcia',
    '15': 'navarra',
    '16': 'paisvasco',
    '17': 'larioja',
    '18': 'ceuta',
    '19': 'melilla'
};

const communities = JSON.parse(fs.readFileSync(COMMUNITIES_JSON, 'utf8'));
const provinces = JSON.parse(fs.readFileSync(PROVINCES_JSON, 'utf8'));

const projection = geoConicConformalSpain();
const pathGenerator = d3.geoPath(projection);

// REFERENCE: Fit to provinces
// extent matches MapaProvinciasClient.tsx and MapaComunidadesClient.tsx
projection.fitExtent([[-210, 0], [720, 620]], provinces);

const communityPaths = {};
communities.features.forEach(f => {
    const id = CCAA_MAP[f.properties.cod_ccaa] || f.properties.name.toLowerCase().replace(/ /g, '_');
    communityPaths[id] = pathGenerator(f);
});

const provincePaths = {};
provinces.features.forEach(f => {
    const name = f.properties.name || f.properties.PROV || 'unknown';
    let id = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ /g, '_');

    const mapping = {
        'coruna': 'coruna',
        'balears': 'baleares',
        'lleida': 'lleida',
        'girona': 'girona',
        'alacant': 'alicante',
        'castello': 'castellon',
        'ourense': 'orense',
        'araba': 'alava',
        'gipuzkoa': 'gipuzkoa',
        'bizkaia': 'bizkaia',
        'illes_balears': 'baleares',
        'a_coruna': 'coruna',
        'la_rioja': 'larioja'
    };
    if (mapping[id]) id = mapping[id];
    provincePaths[id] = pathGenerator(f);
});

const communityOutput = `
export const SPAIN_COMMUNITIES_PATHS_OFFICIAL: Record<string, string> = ${JSON.stringify(communityPaths, null, 2)};
`;

const provinceOutput = `
export const SPAIN_PROVINCES_PATHS_OFFICIAL: Record<string, string> = ${JSON.stringify(provincePaths, null, 2)};
`;

fs.writeFileSync('c:/Users/david/Desktop/Projects-Antigravity/Tu Maestro/web/src/components/games/data/spain-communities-paths-official.ts', communityOutput);
fs.writeFileSync('c:/Users/david/Desktop/Projects-Antigravity/Tu Maestro/web/src/components/games/data/spain-provinces-paths-official.ts', provinceOutput);

console.log('Success!');
