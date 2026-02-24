const fs = require('fs');
const content = fs.readFileSync('./web/src/components/games/data/spain-neighbors-provinces-paths.ts', 'utf8');

function getBounds(name) {
    const regex = new RegExp('"' + name + '": "([^"]+)"');
    const match = content.match(regex);
    if (!match) return null;
    const numbers = match[1].match(/-?[\d.]+/g).map(Number);
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    for (let i = 0; i < numbers.length - 1; i += 2) {
        let x = numbers[i], y = numbers[i + 1];
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
    }
    return { minX, maxX, minY, maxY };
}
console.log('Portugal:', getBounds('Portugal'));
console.log('France:', getBounds('France'));
