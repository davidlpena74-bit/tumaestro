const fs = require('fs');
const content = fs.readFileSync('c:/Users/david/Desktop/Projects-Antigravity/Tu Maestro/web/src/components/games/data/north-america-paths.ts', 'utf8');
const regex = /"([^"]+)":/g;
let match;
const keys = [];
while ((match = regex.exec(content)) !== null) {
    keys.push(match[1]);
}
console.log(JSON.stringify(keys));
