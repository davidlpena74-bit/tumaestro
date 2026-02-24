
import fs from 'fs';

function parse(d) {
    return d.replace(/Z$/, '').split(/[ML]/).filter(s => s).map(s => {
        const parts = s.split(',');
        return { x: parseFloat(parts[0]), y: parseFloat(parts[1]) };
    });
}

function stringify(points, closed = true) {
    if (!points || points.length === 0) return "";
    let d = `M${points[0].x.toFixed(1)},${points[0].y.toFixed(1)}`;
    for (let i = 1; i < points.length; i++) {
        d += `L${points[i].x.toFixed(1)},${points[i].y.toFixed(1)}`;
    }
    return closed ? d + 'Z' : d;
}

// Chaikin's Smoothing (one iteration)
function smoothPoints(points, closed = true) {
    if (points.length < 2) return points;
    const smoothed = [];
    const n = points.length;
    const limit = closed ? n : n - 1;

    if (!closed) {
        smoothed.push(points[0]);
    }

    for (let i = 0; i < limit; i++) {
        const p0 = points[i];
        const p1 = points[(i + 1) % n];

        smoothed.push({
            x: 0.75 * p0.x + 0.25 * p1.x,
            y: 0.75 * p0.y + 0.25 * p1.y
        });
        smoothed.push({
            x: 0.25 * p0.x + 0.75 * p1.x,
            y: 0.25 * p0.y + 0.75 * p1.y
        });
    }

    if (!closed) {
        smoothed.push(points[n - 1]);
    }
    return smoothed;
}

const SPANISH_MOUNTAINS_PATHS = {
    "Pirineos": "M396.704,76.186L479.92,101.554L549.267,114.176L632.484,126.758L637.107,151.8L549.267,139.299L479.92,126.758L396.704,95.228Z",
    "Cordillera Cantábrica": "M110.068,63.439L202.531,76.186L294.994,82.543L364.342,95.228L364.342,114.176L271.879,107.87L179.416,101.554L110.068,88.891Z",
    "Sistema Ibérico": "M331.98,126.758L368.965,176.684L456.804,256.505L489.166,298.845L503.036,292.823L470.674,238.225L387.457,164.262Z",
    "Sistema Central": "M133.184,256.505L248.763,238.225L341.226,207.572L350.472,225.992L248.763,256.505L133.184,274.704Z",
    "Sistemas Béticos": "M202.531,487.153L294.994,464.059L387.457,435.019L456.804,358.589L470.674,376.348L396.704,452.466L304.241,481.391L202.531,498.656Z",
    "Sierra Morena": "M133.184,388.147L271.879,376.348L364.342,358.589L364.342,382.252L271.879,399.913L133.184,411.646Z",
    "Montes de Toledo": "M225.647,310.862L341.226,310.862L341.226,334.794L225.647,334.794Z",
    "Macizo Galaico": "M54.591,88.891L133.184,114.176L133.184,151.8L54.591,133.033Z",
    "Montes de León": "M156.3,114.176L211.778,133.033L211.778,158.036L156.3,139.299Z",
    "Cordillera Costero-Catalana": "M503.036,225.992L549.267,176.684L609.368,145.554L618.615,164.262L572.383,195.246L526.152,238.225Z",
};

const processed = {};
for (let [name, d] of Object.entries(SPANISH_MOUNTAINS_PATHS)) {
    let pts = parse(d);

    // Spine calculation
    const n = pts.length;
    const half = Math.floor(n / 2);
    const top = pts.slice(0, half);
    const bottom = pts.slice(half).reverse();

    let spinePoints = [];
    const len = Math.min(top.length, bottom.length);
    for (let i = 0; i < len; i++) {
        spinePoints.push({
            x: (top[i].x + bottom[i].x) / 2,
            y: (top[i].y + bottom[i].y) / 2
        });
    }

    // Double Chaikin smoothing for boundary
    let softPts = smoothPoints(smoothPoints(pts, true), true);
    // Single smoothing for spine
    let softSpine = smoothPoints(spinePoints, false);

    processed[name] = {
        path: stringify(softPts, true),
        ridge: stringify(softSpine, false)
    };
}

let output = "// Smoothed mountain ranges with spines\n";
output += "export const SPANISH_MOUNTAINS_DATA: Record<string, { path: string, ridge: string }> = " + JSON.stringify(processed, null, 4) + ";\n";
fs.writeFileSync('src/components/games/data/spanish-mountains-detailed.ts', output);
console.log("Done!");
