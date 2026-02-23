import fs from 'fs';
import path from 'path';

function svgPathToPoints(pathString) {
    const points = [];
    // split by space or commands
    const matches = pathString.match(/[MCLSQT]\s*([^MCLSQT]+)/g);
    if (!matches) return points;
    matches.forEach(m => {
        const type = m[0];
        const coords = m.slice(1).split(/[\s,]+/).filter(x => x).map(parseFloat);
        for (let i = 0; i < coords.length; i += 2) {
            if (!isNaN(coords[i]) && !isNaN(coords[i + 1])) {
                points.push({ x: coords[i], y: coords[i + 1] });
            }
        }
    });
    return points;
}

function generatePeaks(pathString) {
    const points = svgPathToPoints(pathString);
    if (points.length === 0) return [];

    // We want a peak every ~15 units of distance, with varying scales
    const peaks = [];
    // Start with the first point
    peaks.push({ x: Math.round(points[0].x), y: Math.round(points[0].y), scale: 0.9 });

    for (let i = 1; i < points.length; i++) {
        const p1 = points[i - 1];
        const p2 = points[i];

        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        const numSteps = Math.max(1, Math.floor(dist / 20));

        for (let j = 1; j <= numSteps; j++) {
            const t = j / numSteps;
            const px = p1.x + dx * t;
            const py = p1.y + dy * t;

            // Randomize scale a bit depending on position
            let scaleRange = 1.0;
            if (points.length > 2) {
                const overallT = (i - 1 + t) / (points.length - 1);
                // hump in the middle
                const hump = Math.sin(overallT * Math.PI);
                scaleRange = 0.8 + hump * 0.8;
            }
            // clamp scale between 0.8 and 1.8
            let scale = Math.max(0.8, Math.min(1.8, scaleRange + (Math.random() * 0.2 - 0.1)));

            peaks.push({ x: Math.round(px), y: Math.round(py), scale: Math.round(scale * 10) / 10 });
        }
    }
    return peaks;
}

function processFile(filePath, varName, isBoth = false) {
    let content = fs.readFileSync(filePath, 'utf8');
    const regex = new RegExp(`export const ${varName}: Record<string, string> = {([\\s\\S]*?)};`);

    const match = content.match(regex);
    if (!match) return;

    let block = match[1];
    let newBlock = '';

    // Parse key value pairs
    const lineRegex = /"(.*?)":\s*"(.*?)",/g;
    let lineMatch;

    let outDict = {};
    while ((lineMatch = lineRegex.exec(block)) !== null) {
        const name = lineMatch[1];
        const p = lineMatch[2];
        const peaks = generatePeaks(p);

        let peaksStr = '[\n';
        for (let j = 0; j < peaks.length; j++) {
            peaksStr += `            { x: ${peaks[j].x}, y: ${peaks[j].y}, scale: ${peaks[j].scale} },\n`;
        }
        peaksStr += '        ]';

        newBlock += `    "${name}": {\n        path: "${p}",\n        peaks: ${peaksStr}\n    },\n`;
    }

    const replacement = `export const ${varName}: Record<string, any> = {\n${newBlock}};`;
    const newContent = content.replace(regex, replacement);
    fs.writeFileSync(filePath, newContent);
}

processFile('src/components/games/data/europe-physical-paths.ts', 'EUROPE_MOUNTAINS_PATHS');
processFile('src/components/games/data/america-physical-paths.ts', 'AMERICA_MOUNTAINS_PATHS');
processFile('src/components/games/data/asia-physical-paths.ts', 'ASIA_MOUNTAINS_PATHS');
processFile('src/components/games/data/oceania-physical-paths.ts', 'OCEANIA_MOUNTAINS_PATHS');

console.log('DONE');
