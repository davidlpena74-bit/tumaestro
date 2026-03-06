import { geoMercator, geoPath, geoProjection } from 'd3-geo';

// Local mirror of the python/node projection logic for Miller Cyrindical
export function geoMiller() {
    return geoProjection(function (lambda, phi) {
        return [lambda, 1.25 * Math.log(Math.tan(Math.PI / 4 + 0.4 * phi))];
    });
}

export interface ProjectionParams {
    type: string;
    scale: number;
    translate: [number, number];
}

/**
 * Projects longitude and latitude to SVG SVG (x, y) coordinates
 * based on dynamically generated projection parameters.
 */
export function projectCoordinates(lon: number, lat: number, params: ProjectionParams): [number, number] {
    if (!params) return [0, 0];

    let proj;
    if (params.type === 'miller') {
        proj = geoMiller();
    } else if (params.type === 'mercator' || params.type === 'europe') {
        proj = geoMercator();
    } else {
        proj = geoMiller(); // fallback
    }

    if (params.scale) proj.scale(params.scale);
    if (params.translate) proj.translate(params.translate);

    const coords = proj([lon, lat]);
    return coords ? [coords[0], coords[1]] : [0, 0];
}
