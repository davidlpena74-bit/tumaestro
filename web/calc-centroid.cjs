const fs = require('fs');
const code = fs.readFileSync('src/components/games/data/europe-paths.ts', 'utf8');
const spainPathMatch = code.match(/"Spain":\s*"([^"]+)"/);
if (!spainPathMatch) { console.log('no spain!'); process.exit(1); }
const pathData = spainPathMatch[1];
const subpaths = pathData.split(/(?=[Mm])/);
let bestCentroid = null;
let maxArea = -1;
for (const subpath of subpaths) {
    const numbers = subpath.match(/-?[\d.]+/g)?.map(Number);
    if (!numbers || numbers.length < 2) continue;
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    let count = 0;
    for (let i = 0; i < numbers.length - 1; i += 2) {
        const x = numbers[i]; const y = numbers[i + 1];
        if (isNaN(x) || isNaN(y)) continue;
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
        count++;
    }
    if (count > 0) {
        const width = maxX - minX;
        const height = maxY - minY;
        const area = width * height;
        if (area > maxArea || bestCentroid === null) {
            maxArea = area;
            bestCentroid = { x: minX + width / 2, y: minY + height / 2, area };
        }
    }
}
console.log('Spain path center bounding box:', bestCentroid);
