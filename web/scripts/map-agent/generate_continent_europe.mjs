import fs from 'fs';
import * as d3 from 'd3-geo';
import * as topojson from 'topojson-client';
import { MapFactory } from './MapFactory.mjs';

/**
 * EUROPE MASTER GENERATOR
 * Standardized projection, viewBox, and context countries.
 */

const EUROPE_COUNTRIES = [
    'Albania', 'Andorra', 'Armenia', 'Austria', 'Azerbaijan', 'Belarus', 'Belgium',
    'Bosnia and Herz.', 'Bulgaria', 'Croatia', 'Cyprus', 'Czechia', 'Denmark',
    'Estonia', 'Finland', 'France', 'Georgia', 'Germany', 'Greece', 'Hungary',
    'Iceland', 'Ireland', 'Italy', 'Kazakhstan', 'Kosovo', 'Latvia', 'Liechtenstein',
    'Lithuania', 'Luxembourg', 'Malta', 'Moldova', 'Monaco', 'Montenegro',
    'Netherlands', 'North Macedonia', 'Norway', 'Poland', 'Portugal', 'Romania',
    'Russia', 'San Marino', 'Serbia', 'Slovakia', 'Slovenia', 'Spain', 'Sweden',
    'Switzerland', 'Turkey', 'Ukraine', 'United Kingdom', 'Vatican'
];

// Context countries for visual background only
const CONTEXT_COUNTRIES = [
    'Morocco', 'Algeria', 'Tunisia', 'Libya', 'Egypt',
    'Israel', 'Lebanon', 'Syria', 'Jordan', 'Iraq', 'Iran',
    'Turkmenistan', 'Uzbekistan'
];

const ALL_EUROPE_VIEW = [...EUROPE_COUNTRIES, ...CONTEXT_COUNTRIES];

const factory = new MapFactory();

try {
    factory
        .loadTopoJSON('public/maps/world-countries-50m.json', 'countries')
        .filter(f => {
            const name = f.properties.name;
            if (name === 'Macedonia') return true;
            return ALL_EUROPE_VIEW.includes(name);
        })
        .setProjection((collection, d3) => {
            // Tight bounding box for Europe for maximum detail in 800x600
            const boundingBox = {
                type: "Feature",
                geometry: {
                    type: "LineString",
                    coordinates: [
                        [-25, 30], // SW
                        [55, 30],  // SE
                        [55, 72],  // NE
                        [-25, 72]  // NW
                    ]
                }
            };

            return d3.geoMercator()
                .fitExtent([[30, 30], [770, 570]], boundingBox);
        });

    // 1. Generate Playable Paths (EUROPE_PATHS)
    const europePaths = factory.generateSVGPaths(f => {
        const name = f.properties.name;
        if (name === 'Macedonia') return 'North Macedonia';
        return name;
    });

    // Filter out context countries from the playable list
    const filteredEuropePaths = {};
    EUROPE_COUNTRIES.forEach(c => {
        if (europePaths[c]) filteredEuropePaths[c] = europePaths[c];
    });

    factory.saveTypeScript('src/components/games/data/europe-paths.ts', 'EUROPE_PATHS', filteredEuropePaths);

    // 2. Generate Context/Neighbor Paths (EUROPE_NEIGHBORS_PATHS)
    const neighborPaths = {};
    CONTEXT_COUNTRIES.forEach(c => {
        if (europePaths[c]) neighborPaths[c] = europePaths[c];
    });

    // Add special clipping to keep neighbors from overflowing if needed
    factory.saveTypeScript('src/components/games/data/europe-neighbors-paths.ts', 'EUROPE_NEIGHBORS_PATHS', neighborPaths);

    console.log(`✅ Europe Continent Map Generated: 
    - ${Object.keys(filteredEuropePaths).length} Playable countries
    - ${Object.keys(neighborPaths).length} Context neighbors`);

} catch (error) {
    console.error("❌ Error generating Europe master map:", error);
}
