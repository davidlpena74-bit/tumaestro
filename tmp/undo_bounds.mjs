import fs from 'fs';
import path from 'path';

const configDir = 'web/scripts/geodata/config';

const boundingBoxes = {
    'africa': [[-25, -40], [55, 40]],
    'america': [[-170, -60], [-30, 85]],
    'asia': [[30, -15], [150, 50]],
    'central-america': [[-95, 5], [-75, 20]],
    'europe': [[-25, 30], [45, 75]],
    'north-america': [[-170, 10], [-50, 85]],
    'oceania': [[110, -50], [180, 5]],
    'south-america': [[-95, -60], [-30, 15]],
    'spain': [[-10, 35], [5, 44]]
};

const configs = fs.readdirSync(configDir).filter(f => f.endsWith('.json'));

for (const file of configs) {
    const filePath = path.join(configDir, file);
    const cfg = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    // Determine prefix
    let prefix = null;
    if (file === 'continents.json') {
        // continents usually global, so remove boundingBox
        delete cfg.boundingBox;
    } else {
        for (const key of Object.keys(boundingBoxes)) {
            if (file.startsWith(key)) {
                prefix = key;
                break;
            }
        }

        if (prefix) {
            // Apply projection miller and original bounding box
            cfg.projection = 'miller';
            cfg.boundingBox = {
                type: "LineString",
                coordinates: boundingBoxes[prefix]
            };
        }
    }

    fs.writeFileSync(filePath, JSON.stringify(cfg, null, 4));
    console.log(`Reverted bounding box for ${file}`);
}
