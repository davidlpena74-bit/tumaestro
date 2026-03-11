const fs = require('fs');
const content = fs.readFileSync('c:/Users/david/Desktop/Projects-Antigravity/Tu Maestro/web/src/components/games/CountryGameBase.tsx', 'utf8');
const lines = content.split('\n');
lines.forEach((line, i) => {
    if (line.includes('identifyMode')) {
        console.log(`${i + 1}: ${line.trim()}`);
    }
});
