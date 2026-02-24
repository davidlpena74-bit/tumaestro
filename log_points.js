const fs = require('fs');
const content = fs.readFileSync('./web/src/components/games/spanish-provinces.ts', 'utf8');

function logProvincePoints(id) {
    const regexMulti = new RegExp(`"${id}":\\s*\\[([\\s\\S]*?)\\]`);
    const matchMulti = content.match(regexMulti);
    if (!matchMulti) {
        console.log(`--- ${id} NOT FOUND ---`);
        return;
    }
    const paths = matchMulti[1].match(/"([^"]+)"/g);
    console.log(`--- ${id} ---`);
    paths.forEach(p => {
        const d = p.replace(/"/g, '');
        const coords = d.match(/-?[\d.]+/g).map(Number);
        const xs = coords.filter((_, i) => i % 2 === 0);
        const ys = coords.filter((_, i) => i % 2 === 1);
        console.log(`  Min: ${Math.min(...xs).toFixed(1)},${Math.min(...ys).toFixed(1)}  Max: ${Math.max(...xs).toFixed(1)},${Math.max(...ys).toFixed(1)}`);
        // Log some sample points to check order
        console.log(`  Start: ${xs[0]},${ys[0]}  End: ${xs[xs.length - 1]},${ys[ys.length - 1]}`);
    });
}

logProvincePoints('pontevedra');
logProvincePoints('huelva');
logProvincePoints('badajoz');
logProvincePoints('caceres');
logProvincePoints('gipuzkoa');
logProvincePoints('girona');
logProvincePoints('ceuta');
logProvincePoints('melilla');
