/**
 * Unified Geodata Projection Module
 * Centra la inteligencia matemática de posicionamiento en un solo lugar.
 */

export const SPAIN_COEFFICIENTS = {
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

import { geoMercator } from 'd3-geo';

/**
 * Proyecta coordenadas [lon, lat] al sistema unificado de la aplicación.
 */
export function projectToSpain(lon, lat) {
    const [u, v] = mercatorRaw(lon, lat);
    const { ax, bx, cx, ay, by, cy } = SPAIN_COEFFICIENTS;
    return [ax * u + bx * v + cx, ay * u + by * v + cy];
}

let europeProj;
function getEuropeProj() {
    if (!europeProj) {
        const boundingBox = {
            type: "Feature",
            geometry: {
                type: "LineString",
                coordinates: [
                    [-25, 30], // SW
                    [60, 30],  // SE
                    [60, 72],  // NE
                    [-25, 72]  // NW
                ]
            }
        };
        europeProj = geoMercator().fitExtent([[40, 40], [760, 560]], boundingBox);
    }
    return europeProj;
}

export function projectCoordinates(lon, lat, type = 'spain') {
    if (type === 'europe') {
        const coords = getEuropeProj()([lon, lat]);
        return coords ? [coords[0], coords[1]] : [0, 0];
    }
    return projectToSpain(lon, lat);
}

export function getD3Projection(type) {
    if (type === 'europe') return getEuropeProj();
    return null;
}
