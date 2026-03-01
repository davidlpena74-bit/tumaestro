
import { readFileSync, writeFileSync } from 'fs';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
import { getPathData } from './UnifiedProjection.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '../..');
const require = createRequire(import.meta.url);
const topojson = require('topojson-client');

const worldData = JSON.parse(readFileSync(join(root, 'public/maps/world-countries-10m.json'), 'utf8'));
const countries = topojson.feature(worldData, worldData.objects.countries);

const portugal = countries.features.find(f => String(f.id) === '620');
const andorra = countries.features.find(f => String(f.id) === '020');
const france = countries.features.find(f => String(f.id) === '250');
const morocco = countries.features.find(f => String(f.id) === '504');

const contextPaths = {
    portugal: getPathData(portugal),
    andorra: getPathData(andorra),
    france: getPathData(france),
    morocco: getPathData(morocco)
};

const tsContent = `// Context countries in Unified Projection
export const CONTEXT_PATHS: Record<string, string> = ${JSON.stringify(contextPaths, null, 4)};
`;

writeFileSync(join(root, 'src/components/games/map-context-unified.ts'), tsContent);
console.log('✅ Generated context paths (Portugal, Andorra, etc) in Unified Projection');
