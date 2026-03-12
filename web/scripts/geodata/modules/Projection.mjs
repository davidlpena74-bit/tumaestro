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

export function projectToSpain(lon, lat) {
    const [u, v] = mercatorRaw(lon, lat);
    const { ax, bx, cx, ay, by, cy } = SPAIN_COEFFICIENTS;
    return [ax * u + bx * v + cx, ay * u + by * v + cy];
}

import { geoMercator, geoProjection, geoAlbersUsa, geoAlbers } from 'd3-geo';

/**
 * Miller Cylindrical Projection
 * Formula: x = λ, y = 1.25 * ln(tan(π/4 + 0.4φ))
 */
export function geoMiller() {
    return geoProjection(function (lambda, phi) {
        return [lambda, 1.25 * Math.log(Math.tan(Math.PI / 4 + 0.4 * phi))];
    });
}

function getMillerProj(boundingBox = null, extent = [[40, 40], [760, 560]], rotation = null) {
    const proj = geoMiller();
    if (rotation) proj.rotate(rotation);
    if (boundingBox) {
        return proj.fitExtent(extent, boundingBox);
    }
    return proj;
}

export function projectCoordinates(lon, lat, type = 'miller', options = {}) {
    const proj = getD3Projection(type, options.boundingBox, options.extent, options.rotation);
    if (proj) {
        const coords = proj([lon, lat]);
        return coords ? [coords[0], coords[1]] : [0, 0];
    }

    // Fallback to legacy Spain projection if explicitly requested
    if (type === 'spain') {
        return projectToSpain(lon, lat);
    }

    return [0, 0];
}

export function getD3Projection(type, boundingBox = null, extent = [[40, 40], [760, 560]], rotation = null) {
    if (type === 'miller') {
        return getMillerProj(boundingBox, extent, rotation);
    }
    if (type === 'europe' || type === 'mercator') {
        const proj = geoMercator();
        if (rotation) proj.rotate(rotation);
        if (boundingBox) proj.fitExtent(extent, boundingBox);
        return proj;
    }
    if (type === 'albersUsa') {
        const proj = geoAlbersUsa();
        if (boundingBox) proj.fitExtent(extent, boundingBox);
        return proj;
    }
    if (type === 'albers') {
        const proj = geoAlbers()
            .rotate([96, 0])
            .center([0, 38.7])
            .parallels([29.5, 45.5]);
        if (rotation) proj.rotate(rotation);
        if (boundingBox) proj.fitExtent(extent, boundingBox);
        return proj;
    }
    return null;
}
