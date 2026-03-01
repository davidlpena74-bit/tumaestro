
import fs from 'fs';
import { getPathData, projectPoint } from './UnifiedProjection.mjs';

const communitiesData = JSON.parse(fs.readFileSync('public/maps/spain-communities.json', 'utf8'));

const nameMap = {
    'Andalucia': 'andalucia',
    'Aragon': 'aragon',
    'Asturias': 'asturias',
    'Baleares': 'baleares',
    'Canarias': 'canarias',
    'Cantabria': 'cantabria',
    'Castilla-La Mancha': 'castillalamancha',
    'Castilla-Leon': 'castillaleon',
    'Cataluña': 'cataluna',
    'Extremadura': 'extremadura',
    'Galicia': 'galicia',
    'Madrid': 'madrid',
    'Murcia': 'murcia',
    'Navarra': 'navarra',
    'Pais Vasco': 'paisvasco',
    'La Rioja': 'larioja',
    'Valencia': 'valencia',
    'Ceuta': 'ceuta',
    'Melilla': 'melilla'
};

let output = `export const SPANISH_COMMUNITIES_PATHS: Record<string, string[]> = {\n`;

communitiesData.features.forEach(f => {
    const rawName = f.properties.name;
    const id = nameMap[rawName];
    if (!id) {
        console.warn(`Unknown community: ${rawName}`);
        return;
    }

    const pathData = getPathData(f);
    // The component expects string[], so we split by space if there are multiple paths (multipolygon)
    // Actually, getPathData returns joined paths with M and Z.
    // Let's make it a single string array for compatibility with existing type.
    output += `    "${id}": ["${pathData}"],\n`;
});

output += `};\n`;

fs.writeFileSync('src/components/games/data/spain-communities-paths-unified.ts', output);
console.log('✅ Generated unified communities paths');
