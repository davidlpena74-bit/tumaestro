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

    const sources = config.sources || [{
        path: config.source,
        nameProperty: config.nameProperty,
        topojsonLayer: config.topojsonLayer
    }];

    const basePath = process.cwd().endsWith('web') ? '.' : 'web';
    const outputPath = path.resolve(basePath, config.output);
    const results = {};

    // Initialize results
    config.targets.forEach(target => {
        results[target] = [];
    });
    if (config.mappings) {
        Object.keys(config.mappings).forEach(key => {
            results[key] = [];
        });
    }

    const normalize = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

    let projParams = null;
    if (config.useD3Path || config.projection) {
        const proj = getD3Projection(config.projection, config.boundingBox, config.extent);
        if (proj && proj.scale && proj.translate) {
            projParams = {
                type: config.projection || 'miller',
                scale: proj.scale(),
                translate: proj.translate(),
            };
        }
    }

    for (const sourceInfo of sources) {
        const sourcePath = path.resolve(basePath, sourceInfo.path);
        if (!fs.existsSync(sourcePath)) {
            console.warn(`Warning: Source file not found at ${sourcePath}`);
            continue;
        }

        const fileData = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
        let features;
        if (fileData.type === 'Topology') {
            const layer = sourceInfo.topojsonLayer || Object.keys(fileData.objects)[0];
            const rawData = topojson.feature(fileData, fileData.objects[layer]);
            features = rawData.features || [];
        } else {
            features = fileData.features || [];
        }

        features.forEach(f => {
            const name = f.properties[sourceInfo.nameProperty || config.nameProperty || 'name'] ||
                f.properties['name_en'] || f.properties['name'];
            if (!name) return;

            const normName = normalize(name);

            // 1. Try exact matches first
            let matchedKey = config.targets.find(target => normalize(target) === normName);

            if (!matchedKey && config.mappings) {
                matchedKey = Object.keys(config.mappings).find(key => {
                    const aliases = config.mappings[key];
                    return aliases.some(alias => normalize(alias) === normName);
                });
            }

            if (matchedKey) {
                const geom = f.geometry;
                if (!geom) return;

                if (config.useD3Path) {
                    let proj = getD3Projection(config.projection, config.boundingBox, config.extent);

                    // Support for special features (like Iceland Inset)
                    if (config.specialFeatures && config.specialFeatures[matchedKey]) {
                        const spec = config.specialFeatures[matchedKey];
                        proj = getD3Projection(
                            spec.projection || config.projection,
                            spec.boundingBox,
                            spec.extent || [[10, 10], [150, 120]]
                        );
                    }

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
                    return;
                }

                // Manual projection (legacy/custom)
                const processGeometry = (coords) => {
                    const projected = coords.map(p => {
                        const pr = projectCoordinates(p[0], p[1], config.projection || 'miller', {
                            boundingBox: config.boundingBox,
                            extent: config.extent
                        });
                        return pr || p;
                    });
                    return simplifyPath(projected, config.tolerance || 0.5);
                };

                const lines = [];
                if (geom.type === 'LineString') {
                    lines.push(processGeometry(geom.coordinates));
                } else if (geom.type === 'MultiLineString') {
                    geom.coordinates.forEach(coords => lines.push(processGeometry(coords)));
                } else if (geom.type === 'Polygon') {
                    geom.coordinates.forEach(ring => lines.push(processGeometry(ring)));
                } else if (geom.type === 'MultiPolygon') {
                    geom.coordinates.forEach(polygon => polygon.forEach(ring => lines.push(processGeometry(ring))));
                }

                if (lines.length > 0) {
                    const isPolygon = geom.type.includes('Polygon');
                    const ridgeStr = lines.map(line => {
                        if (line.length < 2) return "";
                        return 'M' + line.map(p => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join('L') + (isPolygon ? 'Z' : '');
                    }).join('');

                    if (config.itemType === 'mountain') {
                        results[matchedKey].push({ path: ridgeStr, ridge: ridgeStr });
                    } else {
                        results[matchedKey].push(ridgeStr);
                    }
                }
            }
        });
    }

    // Process background sources if defined
    if (config.background) {
        const bg = config.background;
        const bgPath = path.resolve(basePath, bg.source);
        if (fs.existsSync(bgPath)) {
            const bgData = JSON.parse(fs.readFileSync(bgPath, 'utf8'));
            let bgFeatures;
            if (bgData.type === 'Topology') {
                const layer = bg.topojsonLayer || Object.keys(bgData.objects)[0];
                bgFeatures = topojson.feature(bgData, bgData.objects[layer]).features;
            } else {
                bgFeatures = bgData.features || [];
            }

            const proj = getD3Projection(bg.projection || config.projection, config.boundingBox, config.extent);
            const pathGenerator = geoPath(proj);

            bgFeatures.forEach(f => {
                const name = f.properties[bg.nameProperty || 'name'] || f.properties['name_en'];
                if (bg.targets.includes(name)) {
                    const pathStr = pathGenerator(f);
                    if (pathStr) {
                        results[`__bg_${name}`] = [pathStr];
                    }
                }
            });
        }
    }

    // Final merge of results
    const finalPaths = {};
    Object.entries(results).forEach(([name, data]) => {
        if (data.length === 0) return;
        if (config.itemType === 'mountain') {
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
    const exportProjName = `${config.exportName}_PROJECTION`;
    const projExport = projParams ? `export const ${exportProjName} = ${JSON.stringify(projParams, null, 2)};\n` : '';
    const exportStatement = `${projExport}export const ${config.exportName}: ${typeStr} = ${JSON.stringify(finalPaths, null, 2)};`;

    let outputContent = `// Generated with Tu Maestro Geo-Processor\n// Source: ${config.source || 'Multiple Sources'}\n${exportStatement}\n`;

    // Merging logic with existing file
    if (fs.existsSync(outputPath)) {
        let existingContent = fs.readFileSync(outputPath, 'utf8');

        // Remove existing projection export if it exists
        const oldProjRegex = new RegExp(`export const ${exportProjName} = {[\\s\\S]*?};\\n?`, 'g');
        existingContent = existingContent.replace(oldProjRegex, '');

        const exportRegex = new RegExp(`export const ${config.exportName}: [^=]+ = {[\\s\\S]*?};\\n?`, 'g');

        if (existingContent.match(exportRegex)) {
            outputContent = existingContent.replace(exportRegex, exportStatement + '\n');
        } else {
            outputContent = existingContent.trim() + '\n\n' + exportStatement + '\n';
        }
    }

    const dirname = path.dirname(outputPath);
    if (!fs.existsSync(dirname)) fs.mkdirSync(dirname, { recursive: true });

    fs.writeFileSync(outputPath, outputContent);
    console.log(`Success! ${Object.keys(finalPaths).length} items saved to: ${config.output}`);
}

// CLI Entry point
const configDir = 'scripts/geodata/config';
const arg = process.argv[2];

if (fs.existsSync(configDir)) {
    const configs = fs.readdirSync(configDir)
        .filter(f => f.endsWith('.json'))
        .filter(f => !arg || f.includes(arg));

    for (const file of configs) {
        await processLayer(path.join(configDir, file));
    }
}


