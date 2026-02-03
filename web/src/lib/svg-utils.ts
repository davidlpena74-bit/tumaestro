export function calculatePathCentroid(pathData: string): { x: number; y: number; area: number } | null {
    if (!pathData) return null;

    // Matches all numbers that might be coordinates (e.g., 123.45 or -123.45)
    // SVG paths can be M x y L x y ...
    const numbers = pathData.match(/-?[\d.]+/g)?.map(Number);

    if (!numbers || numbers.length < 2) return null;

    // Simple bounding box average relative to the points actually defined in the path
    // While not a polygon centroid, it's usually good enough for label placement in map regions
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    let count = 0;

    // SVG path commands usually come in pairs x,y but typically after a command letter.
    // However, regex match pulls all numbers.
    // We assume even indices are X and odd are Y generally, 
    // although some commands like H or V break this pattern.
    // For a complex map path (M ... L ...), most numbers are coordinate pairs.
    // A more robust but heavier approach: parse exact commands.
    // Heuristic: iterate pairs.

    for (let i = 0; i < numbers.length - 1; i += 2) {
        const x = numbers[i];
        const y = numbers[i + 1];

        // Filter out absurdly small or large numbers if there's noise, but map data usually clean.
        if (isNaN(x) || isNaN(y)) continue;

        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
        count++;
    }

    if (count === 0) return null;

    const width = maxX - minX;
    const height = maxY - minY;
    const area = width * height;

    return {
        x: minX + width / 2,
        y: minY + height / 2,
        area
    };
}
