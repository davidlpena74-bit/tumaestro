const fs = require('fs');
const content = fs.readFileSync('c:/Users/david/Desktop/Projects-Antigravity/Tu Maestro/web/src/components/games/data/central-america-paths.ts', 'utf8');

const pathsMatch = content.match(/export const CENTRAL_AMERICA_PATHS: Record<string, string> = (\{[\s\S]*?\});/);
if (!pathsMatch) {
    console.error("Could not find CENTRAL_AMERICA_PATHS");
    process.exit(1);
}

const paths = eval('(' + pathsMatch[1] + ')');

let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;

Object.entries(paths).forEach(([name, d]) => {
    const coords = d.match(/-?[\d.]+/g);
    if (coords) {
        for (let i = 0; i < coords.length - 1; i += 2) {
            const x = parseFloat(coords[i]);
            const y = parseFloat(coords[i + 1]);
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
        }
    }
});

console.log({ minX, maxX, minY, maxY, width: maxX - minX, height: maxY - minY, centerX: (minX + maxX) / 2, centerY: (minY + maxY) / 2 });
