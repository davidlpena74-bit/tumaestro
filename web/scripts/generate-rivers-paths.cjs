const fs = require('fs');

const COEFFICIENTS = {
    ax: 2890.600506600986,
    bx: 26.76483244968971,
    cx: 443.44171183189576,
    ay: 2.7423840129061654,
    by: -3018.7743269545604,
    cy: 2567.812402408052
};

function mercatorRaw(lon, lat) {
    const λ = lon * Math.PI / 180;
    const φ = lat * Math.PI / 180;
    return [λ, Math.log(Math.tan(Math.PI / 4 + φ / 2))];
}

function projectPoint(lon, lat) {
    const [u, v] = mercatorRaw(lon, lat);
    const { ax, bx, cx, ay, by, cy } = COEFFICIENTS;
    return [ax * u + bx * v + cx, ay * u + by * v + cy];
}

const RIVERS_JSON = 'C:/Users/david/Desktop/Projects-Antigravity/Tu Maestro/web/public/maps/spain-rivers-osm.json';
const rivers = JSON.parse(fs.readFileSync(RIVERS_JSON, 'utf8'));

const TARGET_RIVERS = ["Duero", "Ebro", "Tajo", "Guadalquivir", "Guadiana", "Júcar", "Segura", "Miño"];

const riverPaths = {};
TARGET_RIVERS.forEach(name => riverPaths[name] = []);

function normalize(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function simplify(points, tolerance = 0.5) {
    if (points.length < 3) return points;
    const result = [points[0]];
    let prev = points[0];
    for (let i = 1; i < points.length; i++) {
        const curr = points[i];
        const dist = Math.sqrt(Math.pow(curr[0] - prev[0], 2) + Math.pow(curr[1] - prev[1], 2));
        if (dist > tolerance || i === points.length - 1) {
            result.push(curr);
            prev = curr;
        }
    }
    return result;
}

rivers.features.forEach(f => {
    const name = f.properties.name;
    if (!name) return;

    const normName = normalize(name);
    const matchedKey = TARGET_RIVERS.find(target => {
        const normTarget = normalize(target);
        // Strict match to avoid partial matches like "Cinca" in "Cincaliño" (unlikely but safe)
        // Or "Miño" matching "Alto Miño"
        return normName === normTarget || normName.includes("rio " + normTarget) || normName.includes(normTarget + " ");
    });

    if (matchedKey) {
        const geom = f.geometry;
        const processLine = (coords) => {
            const projected = coords.map(p => projectPoint(p[0], p[1]));
            return simplify(projected);
        };

        if (geom.type === 'LineString') {
            riverPaths[matchedKey].push(processLine(geom.coordinates));
        } else if (geom.type === 'MultiLineString') {
            geom.coordinates.forEach(coords => {
                riverPaths[matchedKey].push(processLine(coords));
            });
        }
    }
});

const finalPaths = {};
Object.entries(riverPaths).forEach(([name, lines]) => {
    if (lines.length > 0) {
        finalPaths[name] = lines.map(line => {
            if (line.length < 2) return "";
            return 'M' + line.map(p => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join('L');
        }).join('');
    }
});

const output = `// Generated with Optimized High-Precision OSM Data and Unified Affine Projection
export const RIVERS_PATHS: Record<string, string> = ${JSON.stringify(finalPaths, null, 2)};
`;

fs.writeFileSync('C:/Users/david/Desktop/Projects-Antigravity/Tu Maestro/web/src/components/games/data/rivers-paths.ts', output);

console.log(`Success! Generated optimized paths for: ${Object.keys(finalPaths).join(', ')}`);



