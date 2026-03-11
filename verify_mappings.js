const fs = require('fs');
const content = fs.readFileSync('c:/Users/david/Desktop/Projects-Antigravity/Tu Maestro/web/src/components/games/data/country-translations.ts', 'utf8');

function getKeys(regex) {
    let match;
    const keys = [];
    while ((match = regex.exec(content)) !== null) {
        keys.push(match[1]);
    }
    return keys;
}

console.log('NORTH_AMERICA_CAPITALS_MAPPING:', JSON.stringify(getKeys(/export const NORTH_AMERICA_CAPITALS_MAPPING: Record<string, string> = {([\s\S]*?)};/g)));
// Wait, my regex is wrong for multiple matches.
