export function calculatePathCentroid(pathData: string): { x: number; y: number; area: number } | null {
    if (!pathData) return null;

    // Split the path into distinct shapes (subpaths) by looking for Move commands
    const subpaths = pathData.split(/(?=[Mm])/);

    let bestCentroid: { x: number; y: number; area: number } | null = null;
    let maxArea = -1;

    for (const subpath of subpaths) {
        const numbers = subpath.match(/-?[\d.]+/g)?.map(Number);

        if (!numbers || numbers.length < 2) continue;

        let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
        let count = 0;

        for (let i = 0; i < numbers.length - 1; i += 2) {
            const x = numbers[i];
            const y = numbers[i + 1];

            if (isNaN(x) || isNaN(y)) continue;

            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
            count++;
        }

        if (count > 0) {
            const width = maxX - minX;
            const height = maxY - minY;
            const area = width * height;

            // Pick the subpath with the largest bounding box area.
            // If area is the same (e.g. 0), fallback to the one with more points if needed.
            // But area > maxArea handles the main landmass generally well.
            if (area > maxArea || bestCentroid === null) {
                maxArea = area;
                bestCentroid = {
                    x: minX + width / 2,
                    y: minY + height / 2,
                    area
                };
            }
        }
    }

    return bestCentroid;
}
