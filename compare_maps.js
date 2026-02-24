const fs = require('fs');

function getBounds(filePath, name, isArray) {
    const content = fs.readFileSync(filePath, 'utf8');
    const regex = isArray
        ? new RegExp(`"${name}":\\s*\\[([\\s\\S]*?)\\]`)
        : new RegExp(`"${name}":\\s*"([^"]+)"`);

    const match = content.match(regex);
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
    return { minX, maxX, minY, maxY };
}

console.log('--- PROVINCES ---');
console.log('A Coruña:', getBounds('./web/src/components/games/spanish-provinces.ts', 'acoruna', true));
console.log('Girona:', getBounds('./web/src/components/games/spanish-provinces.ts', 'girona', true));
console.log('Gipuzkoa:', getBounds('./web/src/components/games/spanish-provinces.ts', 'gipuzkoa', true));
console.log('Cadiz:', getBounds('./web/src/components/games/spanish-provinces.ts', 'cadiz', true));

console.log('\n--- COMMUNITIES ---');
console.log('Galicia:', getBounds('./web/src/components/games/spanish-communities-paths.ts', 'galicia', true));
console.log('Cataluña:', getBounds('./web/src/components/games/spanish-communities-paths.ts', 'cataluna', true));
console.log('Pais Vasco:', getBounds('./web/src/components/games/spanish-communities-paths.ts', 'paisvasco', true));
console.log('Andalucia:', getBounds('./web/src/components/games/spanish-communities-paths.ts', 'andalucia', true));
