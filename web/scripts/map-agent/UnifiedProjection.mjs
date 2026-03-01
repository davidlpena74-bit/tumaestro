
/**
 * Unified Projection based on Spain Communities map calibration.
 * Maps [lon, lat] to SVG [x, y] coordinates.
 */
export const COEFFICIENTS = {
    ax: 2890.600506600986,
    bx: 26.76483244968971,
    cx: 443.44171183189576,
    ay: 2.7423840129061654,
    by: -3018.7743269545604,
    cy: 2567.812402408052
};

export function mercatorRaw(lon, lat) {
    const λ = lon * Math.PI / 180;
    const φ = lat * Math.PI / 180;
    return [λ, Math.log(Math.tan(Math.PI / 4 + φ / 2))];
}

export function projectPoint(lon, lat) {
    const [u, v] = mercatorRaw(lon, lat);
    const { ax, bx, cx, ay, by, cy } = COEFFICIENTS;
    return [ax * u + bx * v + cx, ay * u + by * v + cy];
}

export function projectFeature(feature) {
    if (!feature || !feature.geometry) return null;
    const geom = feature.geometry;

    const transformPolygon = (coords) => {
        return coords.map(ring => ring.map(p => projectPoint(p[0], p[1])));
    };

    if (geom.type === 'Polygon') {
        return { ...feature, geometry: { ...geom, coordinates: transformPolygon(geom.coordinates) } };
    } else if (geom.type === 'MultiPolygon') {
        return { ...feature, geometry: { ...geom, coordinates: geom.coordinates.map(transformPolygon) } };
    }
    return feature;
}

export function getPathData(feature) {
    if (!feature || !feature.geometry) return "";
    const geom = feature.geometry;
    const polys = geom.type === 'Polygon' ? [geom.coordinates] : geom.coordinates;

    return polys.map(poly => {
        return poly.map(ring => {
            return 'M' + ring.map(p => {
                const [x, y] = projectPoint(p[0], p[1]);
                return `${x.toFixed(1)},${y.toFixed(1)}`;
            }).join('L') + 'Z';
        }).join(' ');
    }).join(' ');
}
