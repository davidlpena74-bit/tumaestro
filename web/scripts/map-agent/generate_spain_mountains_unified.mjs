import fs from 'fs';
import { projectPoint } from './UnifiedProjection.mjs';

const MOUNTAINS_DATA = {
    'Pirineos': [
        [-1.8, 43.4], [0.0, 43.0], [1.5, 42.8], [3.3, 42.6], [3.4, 42.2], [1.5, 42.4], [0.0, 42.6], [-1.8, 43.1]
    ],
    'Cordillera Cantábrica': [
        [-8.0, 43.6], [-6.0, 43.4], [-4.0, 43.3], [-2.5, 43.1], [-2.5, 42.8], [-4.5, 42.9], [-6.5, 43.0], [-8.0, 43.2]
    ],
    'Sistema Ibérico': [
        [-3.2, 42.6], [-2.4, 41.8], [-0.5, 40.5], [0.2, 39.8], [0.5, 39.9], [-0.2, 40.8], [-2.0, 42.0]
    ],
    'Sistema Central': [
        [-7.5, 40.5], [-5.0, 40.8], [-3.0, 41.3], [-2.8, 41.0], [-5.0, 40.5], [-7.5, 40.2]
    ],
    'Sistemas Béticos': [
        [-6.0, 36.6], [-4.0, 37.0], [-2.0, 37.5], [-0.5, 38.8], [-0.2, 38.5], [-1.8, 37.2], [-3.8, 36.7], [-6.0, 36.4]
    ],
    'Sierra Morena': [
        [-7.5, 38.3], [-4.5, 38.5], [-2.5, 38.8], [-2.5, 38.4], [-4.5, 38.1], [-7.5, 37.9]
    ],
    'Montes de Toledo': [
        [-5.5, 39.6], [-3.0, 39.6], [-3.0, 39.2], [-5.5, 39.2]
    ],
    'Macizo Galaico': [
        [-9.2, 43.2], [-7.5, 42.8], [-7.5, 42.2], [-9.2, 42.5]
    ],
    'Montes de León': [
        [-7.0, 42.8], [-5.8, 42.5], [-5.8, 42.1], [-7.0, 42.4]
    ],
    'Cordillera Costero-Catalana': [
        [0.5, 41.0], [1.5, 41.8], [2.8, 42.3], [3.0, 42.0], [2.0, 41.5], [1.0, 40.8]
    ]
};

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

const processed = {};
for (let [name, coords] of Object.entries(MOUNTAINS_DATA)) {
    // Project the coordinates using UnifiedProjection
    let pts = coords.map(c => {
        const proj = projectPoint(c[0], c[1]);
        return { x: proj[0], y: proj[1] };
    });

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

let output = "// Smoothed mountain ranges with spines (Unified Projection)\n";
output += "export const SPANISH_MOUNTAINS_DATA: Record<string, { path: string, ridge: string }> = " + JSON.stringify(processed, null, 4) + ";\n";
fs.writeFileSync('src/components/games/data/spanish-mountains-detailed.ts', output);
console.log("Done! Generated unified mountains data.");
