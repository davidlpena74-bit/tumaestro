
import fs from 'fs';
import { geoMercator, geoPath } from 'd3-geo';

// Match the projection used in generate_europe_paths.mjs
const boundingBox = {
    type: "Feature",
    geometry: {
        type: "LineString",
        coordinates: [
            [-25, 30], // SW
            [60, 30],  // SE
            [60, 72],  // NE
            [-25, 72]  // NW
        ]
    }
};

const projection = geoMercator().fitExtent([[40, 40], [760, 560]], boundingBox);
const pathGen = geoPath().projection(projection);

const MOUNTAINS = {
    'Alpes': {
        type: "LineString",
        path: [[6.0, 45.0], [6.86, 45.83], [8.0, 46.5], [10.0, 47.0], [12.0, 47.2], [14.0, 47.5]],
        peaks: [{ name: 'Mont Blanc', coords: [6.86, 45.83], height: 4810 }]
    },
    'Pirineos': {
        type: "LineString",
        path: [[-1.8, 43.1], [0.5, 42.8], [3.2, 42.4]],
        peaks: [{ name: 'Aneto', coords: [0.65, 42.63], height: 3404 }]
    },
    'Apeninos': {
        type: "LineString",
        path: [[9.0, 44.5], [11.0, 44.0], [12.5, 43.0], [13.56, 42.47], [14.5, 41.5], [16.0, 40.0], [16.5, 38.5]],
        peaks: [{ name: 'Corno Grande', coords: [13.56, 42.47], height: 2912 }]
    },
    'Cárpatos': {
        type: "LineString",
        path: [[17.5, 49.5], [20.13, 49.16], [22.0, 49.0], [25.0, 47.5], [26.5, 46.5], [25.5, 45.5], [23.0, 45.0], [21.5, 44.5]],
        peaks: [{ name: 'Gerlachovský štít', coords: [20.13, 49.16], height: 2655 }]
    },
    'Cáucaso': {
        type: "LineString",
        path: [[38.0, 44.0], [40.0, 43.5], [42.44, 43.35], [45.0, 42.5], [48.0, 41.2]],
        peaks: [{ name: 'Elbrus', coords: [42.44, 43.35], height: 5642 }]
    },
    'Alpes Escandinavos': {
        type: "LineString",
        path: [[6.5, 59.0], [8.31, 61.63], [10.0, 63.0], [14.0, 66.0], [18.0, 68.0], [22.0, 69.5]],
        peaks: [{ name: 'Galdhøpiggen', coords: [8.31, 61.63], height: 2469 }]
    },
    'Balcanes': {
        type: "LineString",
        path: [[21.5, 43.5], [23.5, 43.0], [24.9, 42.7], [27.0, 42.8]],
        peaks: [{ name: 'Botev', coords: [24.9, 42.7], height: 2376 }]
    },
    'Urales': {
        type: "LineString",
        path: [[58.0, 51.0], [59.0, 55.0], [60.0, 60.0], [60.2, 65.03], [62.0, 67.5]],
        peaks: [{ name: 'Narodnaya', coords: [60.2, 65.03], height: 1894 }]
    },
    'Montes Grampianos': {
        type: "LineString",
        path: [[-5.5, 56.4], [-4.5, 56.8], [-3.0, 57.3]],
        peaks: []
    },
    'Peninos': {
        type: "LineString",
        path: [[-2.8, 53.2], [-2.3, 54.2], [-2.0, 55.5]],
        peaks: []
    },
    'Sierra Nevada': {
        type: "LineString",
        path: [[-4.0, 37.1], [-3.3, 37.05], [-2.5, 37.0]],
        peaks: [{ name: 'Mulhacén', coords: [-3.3, 37.05], height: 3479 }]
    },
    'Macizo Central': {
        type: "LineString",
        path: [[2.5, 44.5], [3.3, 45.2], [4.1, 46.1]],
        peaks: []
    },
    'Montes Pindo': {
        type: "LineString",
        path: [[20.5, 40.5], [21.0, 39.5], [22.0, 38.5]],
        peaks: []
    },
    'Cordillera Cantábrica': {
        type: "LineString",
        path: [[-8.5, 43.0], [-6.0, 43.2], [-3.5, 43.1], [-1.8, 42.9]],
        peaks: []
    },
    'Sistema Ibérico': {
        type: "LineString",
        path: [[-3.5, 41.8], [-2.2, 41.0], [-0.8, 40.2]],
        peaks: []
    },
    'Alpes Dináricos': {
        type: "LineString",
        path: [[15.0, 45.5], [16.5, 44.5], [18.2, 43.2], [19.8, 42.2]],
        peaks: []
    },
    'Montes Ródope': {
        type: "LineString",
        path: [[23.2, 41.8], [24.8, 42.0], [26.2, 41.4]],
        peaks: []
    }
};

let output = "// Generated Precise Europe Physical Data\n";
output += "export const EUROPE_MOUNTAINS_PATHS: Record<string, any> = {\n";

Object.entries(MOUNTAINS).forEach(([name, data]) => {
    const coords = data.type === "Polygon" ? [data.path] : data.path;
    const d = pathGen({ type: "Feature", geometry: { type: data.type, coordinates: coords } });
    const peaks = data.peaks.map(p => {
        const pt = projection(p.coords);
        return { name: p.name, x: Math.round(pt[0]), y: Math.round(pt[1]), height: p.height };
    });
    output += `    "${name}": {\n        path: "${d}",\n        peaks: ${JSON.stringify(peaks)}\n    },\n`;
});

output += "};\n\n";

// Keep SEAS as they were but maybe more precise if needed
const SEAS = {
    'Mar Mediterráneo': [[[-5.0, 35.0], [35.0, 35.0], [35.0, 45.0], [10.0, 45.0], [0.0, 40.0], [-5.0, 40.0], [-5.0, 35.0]]],
    'Mar del Norte': [[[0, 51], [10, 51], [10, 60], [0, 60], [0, 51]]],
    'Mar Báltico': [[[15, 54], [25, 54], [25, 65], [15, 65], [15, 54]]],
    'Mar Negro': [[[28, 41], [42, 41], [42, 47], [28, 47], [28, 41]]],
    'Mar Caspio': [[[47, 37], [55, 37], [55, 48], [47, 48], [47, 37]]],
    'Mar Adriático': [[[12, 40], [20, 40], [20, 46], [12, 46], [12, 40]]]
};

output += "export const EUROPE_SEAS_PATHS: Record<string, string> = {\n";
Object.entries(SEAS).forEach(([name, coords]) => {
    const d = pathGen({ type: "Feature", geometry: { type: "Polygon", coordinates: coords } });
    output += `    "${name}": "${d}",\n`;
});
output += "};\n";

fs.writeFileSync('src/components/games/data/europe-physical-paths.ts', output);
console.log("Precise Europe physical paths generated!");
