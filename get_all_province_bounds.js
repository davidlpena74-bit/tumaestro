const fs = require('fs');
const content = fs.readFileSync('./web/src/components/games/spanish-provinces.ts', 'utf8');

function getBounds(name) {
    const match = content.match(new RegExp('"' + name + '":\\s*\\[([\\s\\S]*?)\\]'));
    if (!match) return null;
    const pathsText = match[1];
    const numbers = pathsText.match(/-?[\d.]+/g).map(Number);
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    for (let i = 0; i < numbers.length - 1; i += 2) {
        let x = numbers[i], y = numbers[i + 1];
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
    }
    return { name, minX, maxX, minY, maxY };
}

const provinceIds = ["alicante"];

const bounds = provinceIds.map(getBounds).filter(x => x);
bounds.forEach(b => console.log(b));
