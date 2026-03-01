import fs from 'fs';
import path from 'path';
import { projectToSpain } from './modules/Projection.mjs';
import { simplifyPath } from './modules/Simplifier.mjs';

/**
 * Tu Maestro Geo-Processor
 * Procesa configuraciones JSON para generar archivos .ts de rutas SVG.
 */

async function processLayer(configPath) {
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    console.log(`\n--- Processing Layer: ${config.id} ---`);

    // Resolve paths relative to web/
    const sourcePath = path.resolve('web', config.source);
    const outputPath = path.resolve('web', config.output);

    if (!fs.existsSync(sourcePath)) {
        console.error(`Error: Source file not found at ${sourcePath}`);
        return;
    }

    const rawData = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
    const features = rawData.features || [];
    const results = {};

    config.targets.forEach(target => {
        results[target] = [];
    });
    if (config.mappings) {
        Object.keys(config.mappings).forEach(key => {
            results[key] = [];
        });
    }

    const normalize = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

    features.forEach(f => {
        const name = f.properties[config.nameProperty || 'name'];
        if (!name) return;

        const normName = normalize(name);
        let matchedKey = config.targets.find(target => {
            const normTarget = normalize(target);
            return normName === normTarget || normName.includes(normTarget);
        });

        // If not found in simple targets, check mappings
        if (!matchedKey && config.mappings) {
            matchedKey = Object.keys(config.mappings).find(key => {
                const aliases = config.mappings[key];
                return aliases.some(alias => {
                    const normAlias = normalize(alias);
                    return normName === normAlias || normName.includes(normAlias);
                });
            });
        }

        if (matchedKey) {
            const geom = f.geometry;
            if (!geom) return;

            const processGeometry = (coords) => {
                const projected = coords.map(p => projectToSpain(p[0], p[1]));
                return simplifyPath(projected, config.tolerance || 0.5);
            };

            const lines = [];
            if (geom.type === 'LineString') {
                lines.push(processGeometry(geom.coordinates));
            } else if (geom.type === 'MultiLineString') {
                geom.coordinates.forEach(coords => {
                    lines.push(processGeometry(coords));
                });
            } else if (geom.type === 'Point' && config.itemType === 'mountain') {
                // Convert single peaks to a small simulated ridge/area if needed? 
                // For now, let's ignore single points for major systems unless they are vital.
            }

            if (lines.length > 0) {
                const ridgeStr = lines.map(line => {
                    if (line.length < 2) return "";
                    return 'M' + line.map(p => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join('L');
                }).join('');

                if (config.itemType === 'mountain') {
                    // We now handle 'mountain' lines directly in the React component with stylish strokes!
                    results[matchedKey].push({ path: ridgeStr, ridge: ridgeStr });
                } else {
                    results[matchedKey].push(ridgeStr);
                }
            }
        }
    });

    // Final merge of path strings for each target
    const finalPaths = {};
    Object.entries(results).forEach(([name, data]) => {
        if (config.itemType === 'mountain') {
            // Merge multiple parts of the same mountain system
            const combined = {
                path: data.map(d => d.path).join(''),
                ridge: data.map(d => d.ridge).join('')
            };
            if (combined.path) finalPaths[name] = combined;
        } else {
            const combined = data.join('');
            if (combined) finalPaths[name] = combined;
        }
    });

    const typeStr = config.itemType === 'mountain' ? 'Record<string, { path: string, ridge: string }>' : 'Record<string, string>';
    const outputContent = `// Generated with Tu Maestro Geo-Processor
// Source: ${config.source}
export const ${config.exportName}: ${typeStr} = ${JSON.stringify(finalPaths, null, 2)};
`;

    // Ensure directory exists
    const dirname = path.dirname(outputPath);
    if (!fs.existsSync(dirname)) {
        fs.mkdirSync(dirname, { recursive: true });
    }

    fs.writeFileSync(outputPath, outputContent);
    console.log(`Success! Data saved to: ${config.output}`);
    console.log(`Targets found: ${Object.keys(finalPaths).join(', ')}`);
}

// CLI Entry point
const configDir = 'web/scripts/geodata/config';
if (fs.existsSync(configDir)) {
    const configs = fs.readdirSync(configDir).filter(f => f.endsWith('.json'));
    for (const file of configs) {
        await processLayer(path.join(configDir, file));
    }
}
