import fs from 'fs';
import path from 'path';
import topojson from 'topojson-client';
import { geoBounds } from 'd3-geo';

const configDir = 'scripts/geodata/config';
const configs = fs.readdirSync(configDir).filter(f => f.endsWith('.json'));

const normalize = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

// Get bounding box for specific countries list
function getBoundsForPrefix(prefix) {
    const mainFileStr = prefix === 'continents' ? 'continents.json' : `${prefix}-countries.json`;
    const configPath = path.join(configDir, mainFileStr);

    if (!fs.existsSync(configPath)) {
        console.log("No find", configPath);
        return null;
    }

    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    const sources = config.sources || [{ path: config.source, nameProperty: config.nameProperty, topojsonLayer: config.topojsonLayer }];
    let allFeatures = [];

    for (const src of sources) {
        const sourcePath = path.resolve('.', src.path);
        if (!fs.existsSync(sourcePath)) continue;

        const fileData = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
        let features;
        if (fileData.type === 'Topology') {
            const layer = src.topojsonLayer || Object.keys(fileData.objects)[0];
            features = topojson.feature(fileData, fileData.objects[layer]).features || [];
        } else {
            features = fileData.features || [];
        }

        for (const f of features) {
            const name = f.properties[src.nameProperty || config.nameProperty || 'name'] || f.properties['name_en'];
            if (!name) continue;

            const normName = normalize(name);
            let matchedKey = config.targets.find(target => normalize(target) === normName);
            if (!matchedKey && config.mappings) {
                matchedKey = Object.keys(config.mappings).find(k => config.mappings[k].some(a => normalize(a) === normName));
            }
            if (matchedKey) {
                allFeatures.push(f);
            }
        }
    }

    if (allFeatures.length > 0) {
        const bounds = geoBounds({ type: "FeatureCollection", features: allFeatures });
        const lonDiff = bounds[1][0] - bounds[0][0];
        const latDiff = bounds[1][1] - bounds[0][1];

        let newBounds;
        if (lonDiff < 0) { // Crosses anti-meridian (Oceania, Russia)
            newBounds = bounds;
            // Fallback manual adjust for Oceania context if needed, or leave unpadded
        } else {
            const padLon = lonDiff * 0.05;
            const padLat = latDiff * 0.05;
            newBounds = [
                [bounds[0][0] - padLon, bounds[0][1] - padLat],
                [bounds[1][0] + padLon, bounds[1][1] + padLat]
            ];
            // Clamp to absolute bounds
            newBounds[0][1] = Math.max(newBounds[0][1], -90);
            newBounds[1][1] = Math.min(newBounds[1][1], 90);
        }
        return newBounds;
    }
    return null;
}

const prefixes = ['africa', 'america', 'asia', 'central-america', 'continents', 'europe', 'north-america', 'oceania', 'south-america'];

for (const prefix of prefixes) {
    const newBounds = getBoundsForPrefix(prefix);
    if (!newBounds) continue;

    console.log(`Prefix: ${prefix} -> New Bounds: `, newBounds);

    // Apply this bounding box to any config staring with matching prefix
    const affectedFiles = configs.filter(f => f.startsWith(prefix) || f === `${prefix}.json`);
    for (const file of affectedFiles) {
        const filePath = path.join(configDir, file);
        const cfg = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        cfg.boundingBox = {
            type: "LineString",
            coordinates: newBounds
        };
        fs.writeFileSync(filePath, JSON.stringify(cfg, null, 4));
        console.log(`    Updated ${file}`);
    }
}
