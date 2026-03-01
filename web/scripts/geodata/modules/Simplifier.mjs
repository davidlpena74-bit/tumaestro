/**
 * Geometry Simplification Module
 * Reduce el número de puntos de una trayectoria para optimizar peso SVG.
 */

/**
 * Simplificación básica por distancia radial.
 * @param {Array} points - Array de puntos [[x,y], [x,y]...]
 * @param {number} tolerance - Distancia mínima entre puntos para conservarlos
 */
export function simplifyPath(points, tolerance = 0.5) {
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
