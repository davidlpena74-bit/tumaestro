import fs from 'fs';
import path from 'path';
import * as d3 from 'd3-geo';
import * as topojson from 'topojson-client';

/**
 * MapFactory
 * A utility class to process map data and generate optimized SVG paths or JSON for games.
 */
export class MapFactory {
    constructor() {
        this.features = [];
        this.projection = null;
        this.pathGenerator = null;
    }

    /**
     * Load TopoJSON data from a local file.
     * @param {string} filePath - Path to the TopoJSON file.
     * @param {string} objectName - Name of the object key in TopoJSON (e.g. 'countries').
     */
    loadTopoJSON(filePath, objectName) {
        const rawData = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(rawData);

        if (!data.objects[objectName]) {
            throw new Error(`Object '${objectName}' not found in TopoJSON file. Available keys: ${Object.keys(data.objects).join(', ')}`);
        }

        this.features = topojson.feature(data, data.objects[objectName]).features;
        console.log(`Loaded ${this.features.length} features from ${filePath}`);
        return this;
    }

    /**
     * Load GeoJSON data from a local file.
     * @param {string} filePath 
     */
    loadGeoJSON(filePath) {
        const rawData = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(rawData);
        this.features = data.features;
        console.log(`Loaded ${this.features.length} features from ${filePath}`);
        return this;
    }

    /**
     * Filter features based on a predicate function.
     * @param {Function} predicate - (feature) => boolean
     */
    filter(predicate) {
        const originalCount = this.features.length;
        this.features = this.features.filter(predicate);
        console.log(`Filtered features: ${originalCount} -> ${this.features.length}`);
        return this;
    }

    /**
     * Configure the projection.
     * @param {Function} projectionBuilder - Function returning a d3 projection.
     * Example: (features) => d3.geoMercator().fitExtent([[0,0], [800,600]], {type:"FeatureCollection", features})
     */
    setProjection(projectionBuilder) {
        const collection = { type: "FeatureCollection", features: this.features };
        this.projection = projectionBuilder(collection, d3);
        this.pathGenerator = d3.geoPath().projection(this.projection);
        return this;
    }

    /**
     * Generate SVG path strings for each feature.
     * @param {string|Function} keyAccessor - Property name or function to get the unique ID for the feature.
     * @returns {Object} Map of ID -> SVG Path String
     */
    generateSVGPaths(keyAccessor) {
        if (!this.pathGenerator) {
            throw new Error("Projection not set. Call setProjection() first.");
        }

        const output = {};
        this.features.forEach(feature => {
            const key = typeof keyAccessor === 'function'
                ? keyAccessor(feature)
                : feature.properties[keyAccessor];

            if (key) {
                const pathData = this.pathGenerator(feature);
                if (pathData) {
                    // Optimize: remove excessive decimals could be added here if needed
                    output[key] = pathData;
                }
            }
        });
        return output;
    }

    /**
     * Generate [x, y] coordinates for the centroid of each feature.
     * @param {string|Function} keyAccessor - Property name or function to get the unique ID for the feature.
     * @returns {Object} Map of ID -> { x: number, y: number }
     */
    generatePoints(keyAccessor) {
        if (!this.pathGenerator) {
            throw new Error("Projection not set. Call setProjection() first.");
        }

        const output = {};
        this.features.forEach(feature => {
            const key = typeof keyAccessor === 'function'
                ? keyAccessor(feature)
                : feature.properties[keyAccessor];

            if (key) {
                const centroid = this.pathGenerator.centroid(feature);
                if (centroid && !isNaN(centroid[0]) && !isNaN(centroid[1])) {
                    output[key] = {
                        x: Math.round(centroid[0]),
                        y: Math.round(centroid[1])
                    };
                }
            }
        });
        return output;
    }

    /**
     * Project specific Lat/Lon coordinates to map {x, y}.
     * @param {Object} coordinatesMap - Map of Key -> [Longitude, Latitude]
     * @returns {Object} Map of Key -> { x: number, y: number }
     */
    projectCoordinates(coordinatesMap) {
        if (!this.projection) {
            throw new Error("Projection not set. Call setProjection() first.");
        }

        const output = {};
        for (const [key, coords] of Object.entries(coordinatesMap)) {
            const projected = this.projection(coords); // [x, y]
            if (projected && !isNaN(projected[0]) && !isNaN(projected[1])) {
                output[key] = {
                    x: Math.round(projected[0]),
                    y: Math.round(projected[1])
                };
            }
        }
        return output;
    }

    /**
     * Save the result as a TypeScript const.
     * @param {string} outputPath 
     * @param {string} variableName 
     * @param {Object} paths 
     */
    saveTypeScript(outputPath, variableName, paths, typeName = 'Record<string, string>') {
        const content = `// Generated by MapFactory\nexport const ${variableName}: ${typeName} = ${JSON.stringify(paths, null, 4)};\n`;
        // Basic cleanup to make it look like code logic if wanted (removing quotes on keys), but JSON is fine.

        fs.mkdirSync(path.dirname(outputPath), { recursive: true });
        fs.writeFileSync(outputPath, content);
        console.log(`Saved TypeScript file to ${outputPath}`);
    }
}
