
import fs from 'fs';
import * as topojson from 'topojson-client';
import { getPathData, projectPoint } from './UnifiedProjection.mjs';

const worldData = JSON.parse(fs.readFileSync('public/maps/world-countries.json', 'utf8'));
const features = topojson.feature(worldData, worldData.objects.countries).features;

const CONTINENTS = {
    'Europe': ['Spain', 'France', 'Portugal', 'Andorra', 'Germany', 'Italy', 'United Kingdom', 'Norway', 'Sweden', 'Finland', 'Poland', 'Ukraine', 'Greece', 'Switzerland', 'Austria', 'Belgium', 'Netherlands', 'Denmark', 'Ireland', 'Iceland', 'Portugal', 'Romania', 'Hungary', 'Slovakia', 'Czech Republic', 'Bulgaria', 'Croatia', 'Slovenia', 'Albania', 'Montenegro', 'Serbia', 'North Macedonia', 'Bosnia and Herz.', 'Lithuania', 'Latvia', 'Estonia', 'Belarus', 'Moldova', 'Cyprus', 'Malta', 'Luxembourg'],
    'Africa': ['Morocco', 'Algeria', 'Tunisia', 'Libya', 'Egypt', 'South Africa', 'Nigeria', 'Kenya', 'Ethiopia', 'Ghana', 'Senegal', 'Angola', 'Congo', 'Sudan', 'Mali', 'Niger', 'Chad', 'Somalia', 'Zimbabwe', 'Zambia', 'Botswana', 'Namibia', 'Mozambique', 'Tanzania', 'Uganda', 'Rwanda', 'Burundi', 'Madagascar'],
    'America': ['United States', 'Canada', 'Mexico', 'Brazil', 'Argentina', 'Chile', 'Colombia', 'Peru', 'Ecuador', 'Uruguay', 'Paraguay', 'Bolivia', 'Venezuela', 'Cuba', 'Jamaica', 'Panama', 'Costa Rica', 'Guatemala', 'Honduras', 'Nicaragua', 'El Salvador'],
    'Asia': ['China', 'Japan', 'India', 'Russia', 'Indonesia', 'Saudi Arabia', 'Iran', 'Turkey', 'Pakistan', 'Thailand', 'Vietnam', 'Philippines', 'Iraq', 'Israel', 'Jordan', 'Lebanon', 'Syria', 'Kazakhstan', 'Uzbekistan', 'Afghanistan', 'Mongolia', 'South Korea', 'North Korea'],
    'Oceania': ['Australia', 'New Zealand', 'Fiji', 'Papua New Guinea']
};

function saveContinent(name, countries) {
    let output = `// UNIFIED CONTINENT: ${name}\n`;
    output += `export const UNIFIED_${name.toUpperCase()}_PATHS: Record<string, string> = {\n`;

    let continentFeatures = [];

    countries.forEach(cName => {
        const f = features.find(feat => feat.properties.name === cName || feat.properties.name_es === cName);
        if (f) {
            output += `    "${cName}": "${getPathData(f)}",\n`;
            continentFeatures.push(f);
        }
    });

    output += `};\n\n`;

    // Calculate bounding box for the whole continent in unified coordinates
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;

    continentFeatures.forEach(f => {
        const geom = f.geometry;
        const polys = geom.type === 'Polygon' ? [geom.coordinates] : geom.coordinates;
        polys.forEach(poly => {
            poly[0].forEach(p => {
                const [x, y] = projectPoint(p[0], p[1]);
                if (x < minX) minX = x; if (x > maxX) maxX = x;
                if (y < minY) minY = y; if (y > maxY) maxY = y;
            });
        });
    });

    output += `export const UNIFIED_${name.toUpperCase()}_VIEWBOX = "${(minX - 50).toFixed(0)} ${(minY - 50).toFixed(0)} ${(maxX - minX + 100).toFixed(0)} ${(maxY - minY + 100).toFixed(0)}";\n`;

    fs.writeFileSync(`src/components/games/data/unified-${name.toLowerCase()}-paths.ts`, output);
    console.log(`✅ Generated unified map for ${name}`);
}

Object.entries(CONTINENTS).forEach(([name, countries]) => {
    saveContinent(name, countries);
});
