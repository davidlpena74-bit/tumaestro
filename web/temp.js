const fs = require('fs');
const content = fs.readFileSync('src/components/games/data/spain-provinces-paths-unified.ts', 'utf8');
const m = content.match(/["'](?:ceuta)["']\s*:\s*["']([^"']+)["']/);

if (m) {
    const subpaths = m[1].split(/(?=[Mm])/);
    subpaths.forEach((sub, idx) => {
        const nums = sub.match(/-?[\d.]+/g);
        console.log(`Subpath ${idx}: ${nums ? nums.length / 2 : 0} points, text: ${sub.substring(0, 30)}`);

        if (nums && nums.length >= 2) {
            let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
            for (let i = 0; i < nums.length - 1; i += 2) {
                const x = parseFloat(nums[i]);
                const y = parseFloat(nums[i + 1]);
                if (x < minX) minX = x;
                if (x > maxX) maxX = x;
                if (y < minY) minY = y;
                if (y > maxY) maxY = y;
            }
            console.log(`   Centroid: ${minX + (maxX - minX) / 2}, ${minY + (maxY - minY) / 2}, Area: ${(maxX - minX) * (maxY - minY)}`);
        }
    });
}
