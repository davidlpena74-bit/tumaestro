import fs from 'fs';
import { getPathData } from './UnifiedProjection.mjs';

const provincesData = JSON.parse(fs.readFileSync('public/maps/spain-provinces-official.json', 'utf8'));

function normalizeName(name) {
    const n = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '').replace(/[/]/g, '');

    const map = {
        "acoruna": "acoruna",
        "coruna": "acoruna",
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

let output = `// Generated for Spain Provinces (Unified Affine Projection)
export const SPAIN_PROVINCES_PATHS_UNIFIED: Record<string, string> = {\n`;

provincesData.features.forEach(f => {
    let rawName = f.properties.name || f.properties.provincia || f.properties.NAME_2;
    if (!rawName) return;
    const id = normalizeName(rawName);

    const pathData = getPathData(f);
    output += `    "${id}": "${pathData}",\n`;
});

output += `};\n`;

fs.writeFileSync('src/components/games/data/spain-provinces-paths-unified.ts', output);
console.log('✅ Generated unified province paths');
