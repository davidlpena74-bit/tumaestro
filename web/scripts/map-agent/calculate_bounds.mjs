
import fs from 'fs';
import { projectPoint } from './UnifiedProjection.mjs';

const data = JSON.parse(fs.readFileSync('public/maps/spain-communities.json', 'utf8'));
let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;

function processGeometry(geometry) {
    if (geometry.type === 'Polygon') {
        geometry.coordinates.forEach(ring => {
            ring.forEach(p => {
                const [x, y] = projectPoint(p[0], p[1]);
                if (x < minX) minX = x; if (x > maxX) maxX = x;
                if (y < minY) minY = y; if (y > maxY) maxY = y;
            });
        });
    } else if (geometry.type === 'MultiPolygon') {
        geometry.coordinates.forEach(poly => {
            poly.forEach(ring => {
                ring.forEach(p => {
                    const [x, y] = projectPoint(p[0], p[1]);
                    if (x < minX) minX = x; if (x > maxX) maxX = x;
                    if (y < minY) minY = y; if (y > maxY) maxY = y;
                });
            });
        });
    }
}

data.features.forEach(f => processGeometry(f.geometry));
console.log({ minX, maxX, minY, maxY, width: maxX - minX, height: maxY - minY });
