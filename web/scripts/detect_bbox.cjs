
const fs = require('fs');
const content = fs.readFileSync('src/components/games/data/spain-physical-background.ts', 'utf8');

let allX = [], allY = [];

// Extract path strings between quotes
const pathMatches = content.match(/"(M[^"]+)"/g) || [];

pathMatches.forEach(pm => {
    const path = pm.replace(/"/g, '');
    const coords = path.match(/-?\d+\.?\d*,-?\d+\.?\d*/g) || [];
    coords.forEach(c => {
        const parts = c.split(',');
        const x = parseFloat(parts[0]);
        const y = parseFloat(parts[1]);
        // Only look at reasonable range for the Iberian peninsula + N.Africa
        if (!isNaN(x) && !isNaN(y) && x > -200 && x < 900 && y > -50 && y < 1200) {
            allX.push(x);
            allY.push(y);
        }
    });
});

if (allX.length > 0) {
    const minX = Math.min(...allX);
    const maxX = Math.max(...allX);
    const minY = Math.min(...allY);
    const maxY = Math.max(...allY);
    console.log('BBox filtered minX:', minX.toFixed(0), 'minY:', minY.toFixed(0), 'w:', (maxX - minX).toFixed(0), 'h:', (maxY - minY).toFixed(0));
    // We want viewBox for Iberia (50-680, 20-600) + port (-180 to 80) + N.Africa (down to y~1150)
    console.log('Suggested viewBox:', `${Math.floor(minX - 20)} ${Math.floor(minY - 20)} ${Math.ceil(maxX - minX + 40)} ${Math.ceil(maxY - minY + 40)}`);
} else {
    console.log('No coords found');
}
