import fs from 'fs';
import * as d3 from 'd3-geo';
import { MapFactory } from './MapFactory.mjs';
import { getPathData, projectPoint } from './UnifiedProjection.mjs';

const args = process.argv.slice(2);
const countryArg = args.find(a => a.startsWith('--country='))?.split('=')[1] || "France";
const outputFilename = args.find(a => a.startsWith('--output='))?.split('=')[1] || countryArg.toLowerCase().replace(/\s+/g, '-');
const isUnified = args.includes('--unified');

const ADMIN_FILE = 'public/maps/world-admin-1.geojson';
const ADMIN_50M_FILE = 'public/maps/world-admin-1-50m.geojson';
const RIVERS_FILE = 'public/maps/world-rivers.json';

const factory = new MapFactory();

try {
    // 1. Load Admin-1 for the country
    // Try 10m first, then 50m
    let adminFileToUse = ADMIN_FILE;
    if (!fs.existsSync(ADMIN_FILE)) {
        if (fs.existsSync(ADMIN_50M_FILE)) {
            adminFileToUse = ADMIN_50M_FILE;
            console.log("⚠️ Using 50m admin-1 as 10m is not available.");
        } else {
            throw new Error(`Admin-1 file not found. Run download first.`);
        }
    }

    const adminGeo = JSON.parse(fs.readFileSync(adminFileToUse, 'utf8'));

    // Filter features for the target country
    const countrySubdivisions = adminGeo.features.filter(f =>
        f.properties.admin === countryArg ||
        f.properties.name_en === countryArg ||
        f.properties.geounit === countryArg
    );

    if (countrySubdivisions.length === 0) {
        throw new Error(`No subdivisions found for country: ${countryArg}`);
    }

    console.log(`Found ${countrySubdivisions.length} subdivisions for ${countryArg}`);

    // 2. Generate Paths
    const regionPaths = {};
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;

    if (isUnified) {
        console.log("Using UNIFIED projection space...");
        countrySubdivisions.forEach(f => {
            const id = f.properties.name_es || f.properties.name || f.properties.name_en;
            regionPaths[id] = getPathData(f);

            // Calculate bbox for viewBox
            const geom = f.geometry;
            const polys = geom.type === 'Polygon' ? [geom.coordinates] : geom.coordinates;
            polys.forEach(poly => poly[0].forEach(p => {
                const [px, py] = projectPoint(p[0], p[1]);
                if (px < minX) minX = px; if (px > maxX) maxX = px;
                if (py < minY) minY = py; if (py > maxY) maxY = py;
            }));
        });
    } else {
        // Legacy fitExtent
        factory.features = countrySubdivisions;
        factory.setProjection((collection, d3) => {
            return d3.geoMercator().fitExtent([[50, 50], [750, 550]], collection);
        });
        const paths = factory.generateSVGPaths(f => f.properties.name_es || f.properties.name || f.properties.name_en);
        Object.assign(regionPaths, paths);
    }

    // Save Regions
    let regionOutput = `// Generated for ${countryArg}\n`;
    regionOutput += `export const ${countryArg.toUpperCase().replace(/\s+/g, '_')}_PATHS: Record<string, string> = ${JSON.stringify(regionPaths, null, 2)};\n`;
    if (isUnified) {
        regionOutput += `export const ${countryArg.toUpperCase().replace(/\s+/g, '_')}_VIEWBOX = "${(minX - 20).toFixed(0)} ${(minY - 20).toFixed(0)} ${(maxX - minX + 40).toFixed(0)} ${(maxY - minY + 40).toFixed(0)}";\n`;
    }
    fs.writeFileSync(`src/components/games/data/countries/${outputFilename}-paths.ts`, regionOutput);

    // 3. Generate Rivers
    if (fs.existsSync(RIVERS_FILE)) {
        const riversGeo = JSON.parse(fs.readFileSync(RIVERS_FILE, 'utf8'));
        const countryRivers = {};

        riversGeo.features.forEach(river => {
            if (isUnified) {
                // For unified, we check if the river bounding box intersects the country bounding box
                const riverPath = getPathData(river);
                if (riverPath) {
                    // Check if any point of the river is inside the country bbox
                    const geom = river.geometry;
                    const coords = geom.type === 'LineString' ? [geom.coordinates] : geom.coordinates;
                    let intersects = false;
                    coords.forEach(line => line.forEach(p => {
                        const [px, py] = projectPoint(p[0], p[1]);
                        if (px >= minX && px <= maxX && py >= minY && py <= maxY) intersects = true;
                    }));
                    if (intersects) {
                        countryRivers[river.properties.name || river.properties.name_en] = riverPath;
                    }
                }
            } else {
                // Legacy
                const pathGen = d3.geoPath().projection(factory.projection);
                const d = pathGen(river);
                if (d) countryRivers[river.properties.name || river.properties.name_en] = d;
            }
        });

        const riverOutput = `export const ${countryArg.toUpperCase().replace(/\s+/g, '_')}_RIVERS_PATHS: Record<string, string> = ${JSON.stringify(countryRivers, null, 2)};\n`;
        fs.writeFileSync(`src/components/games/data/countries/${outputFilename}-rivers.ts`, riverOutput);
        console.log(`Generated rivers for ${countryArg}`);
    }

    console.log(`✅ Success: Generated drill-down for ${countryArg}`);

} catch (error) {
    console.error(`❌ Error generating drill-down for ${countryArg}:`, error.message);
}
