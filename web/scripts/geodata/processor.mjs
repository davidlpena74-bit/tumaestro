import fs from 'fs';
import path from 'path';
import { projectCoordinates, getD3Projection } from './modules/Projection.mjs';
import { simplifyPath } from './modules/Simplifier.mjs';
import topojson from 'topojson-client';
import { geoPath } from 'd3-geo';

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

    const fileData = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
    let features;
    if (fileData.type === 'Topology') {
        const layer = config.topojsonLayer || Object.keys(fileData.objects)[0];
        const rawData = topojson.feature(fileData, fileData.objects[layer]);
        features = rawData.features || [];
    } else {
        features = fileData.features || [];
    }
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

        // 1. Try exact matches first (targets then mappings aliases)
        let matchedKey = config.targets.find(target => normalize(target) === normName);

        if (!matchedKey && config.mappings) {
            matchedKey = Object.keys(config.mappings).find(key => {
                const aliases = config.mappings[key];
                return aliases.some(alias => normalize(alias) === normName);
            });
        }

        // 2. Fallback to 'includes' ONLY for targets (optional, but keep it for flexibility)
        // For mountains/rivers, we usually want precision.
        // We'll only do it if the name is an EXACT match of the alias.

        if (matchedKey) {
            const geom = f.geometry;
            if (!geom) return;

            if (config.useD3Path) {
                const proj = getD3Projection(config.projection);
                if (proj) {
                    const pathGenerator = geoPath(proj);
                    const pathStr = pathGenerator(geom);
                    if (pathStr) {
                        if (config.itemType === 'mountain') {
                            results[matchedKey].push({ path: pathStr, ridge: pathStr });
                        } else {
                            results[matchedKey].push(pathStr);
                        }
                    }
                }
                return; // skip manual geometry processing below
            }

            const processGeometry = (coords) => {
                const projected = coords.map(p => {
                    const pr = projectCoordinates(p[0], p[1], config.projection || 'spain');
                    return pr || p;
                });
                return simplifyPath(projected, config.tolerance || 0.5);
            };

            const lines = [];
            if (geom.type === 'LineString') {
                lines.push(processGeometry(geom.coordinates));
            } else if (geom.type === 'MultiLineString') {
                geom.coordinates.forEach(coords => {
                    lines.push(processGeometry(coords));
                });
            } else if (geom.type === 'Polygon') {
                geom.coordinates.forEach(ring => {
                    lines.push(processGeometry(ring));
                });
            } else if (geom.type === 'MultiPolygon') {
                geom.coordinates.forEach(polygon => {
                    polygon.forEach(ring => {
                        lines.push(processGeometry(ring));
                    });
                });
            } else if (geom.type === 'Point' && config.itemType === 'mountain') {
                // Convert single peaks to a small simulated ridge/area if needed? 
                // For now, let's ignore single points for major systems unless they are vital.
            }

            if (lines.length > 0) {
                const ridgeStr = lines.map(line => {
                    if (line.length < 2) return "";
                    const isPolygon = geom.type.includes('Polygon');
                    return 'M' + line.map(p => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join('L') + (isPolygon ? 'Z' : '');
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
    const exportStatement = `export const ${config.exportName}: ${typeStr} = ${JSON.stringify(finalPaths, null, 2)};`;

    let outputContent = `// Generated with Tu Maestro Geo-Processor\n// Source: ${config.source}\n${exportStatement}\n`;

    // If file exists, try to merge
    if (fs.existsSync(outputPath)) {
        let existingContent = fs.readFileSync(outputPath, 'utf8');
        const exportRegex = new RegExp(`export const ${config.exportName}: [^=]+ = {[\\s\\S]*?};?\\n?`, 'g');

        if (existingContent.match(exportRegex)) {
            // Replace existing export
            outputContent = existingContent.replace(exportRegex, exportStatement + '\n');
        } else {
            // Append to existing file
            outputContent = existingContent.trim() + '\n\n' + exportStatement + '\n';
        }
    }

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
const arg = process.argv[2];

if (fs.existsSync(configDir)) {
    const configs = fs.readdirSync(configDir)
        .filter(f => f.endsWith('.json'))
        .filter(f => !arg || f.includes(arg));

    for (const file of configs) {
        await processLayer(path.join(configDir, file));
    }
}

