
import fs from 'fs';
import * as d3 from 'd3-geo';

const provincesContent = fs.readFileSync('./src/components/games/spanish-provinces.ts', 'utf8');

function calculatePathCentroid(pathData) {
    const numbers = pathData.match(/-?[\d.]+/g)?.map(Number);
    if (!numbers || numbers.length < 2) return null;
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    for (let i = 0; i < numbers.length - 1; i += 2) {
        let x = numbers[i], y = numbers[i + 1];
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
    }
    const width = maxX - minX;
    const height = maxY - minY;
    return { x: minX + width / 2, y: minY + height / 2, area: width * height };
}

function getProvinceCentroid(id) {
    const regex = new RegExp(`"${id}":\\s*\\[([\\s\\S]*?)\\]`);
    const match = provincesContent.match(regex);
    if (!match) return null;
    const pathsText = match[1];
    const pathRegex = /"([^"]+)"/g;
    let totalX = 0, totalY = 0, totalArea = 0;
    let pathMatch;
    while ((pathMatch = pathRegex.exec(pathsText)) !== null) {
        const c = calculatePathCentroid(pathMatch[1]);
        if (c) {
            totalX += c.x * c.area;
            totalY += c.y * c.area;
            totalArea += c.area;
        }
    }
    return totalArea > 0 ? { x: totalX / totalArea, y: totalY / totalArea, area: totalArea } : null;
}

const mapping = {
    "Galicia": ["acoruna", "lugo", "ourense", "pontevedra"],
    "Asturias": ["asturias"],
    "Cantabria": ["cantabria"],
    "Pais Vasco": ["bizkaia", "gipuzkoa", "alava"],
    "Navarra": ["navarra"],
    "Aragon": ["huesca", "zaragoza", "teruel"],
    "Cataluña": ["girona", "barcelona", "lleida", "tarragona"],
    "Castilla-Leon": ["leon", "zamora", "salamanca", "palencia", "valladolid", "avila", "burgos", "soria", "segovia"],
    "Madrid": ["madrid"],
    "Castilla-La Mancha": ["guadalajara", "cuenca", "toledo", "ciudadreal", "albacete"],
    "Extremadura": ["caceres", "badajoz"],
    "Valencia": ["castellon", "valencia", "alicante"],
    "Murcia": ["murcia"],
    "Andalucia": ["huelva", "sevilla", "cordoba", "jaen", "cadiz", "malaga", "granada", "almeria"]
};

const geoJSON = JSON.parse(fs.readFileSync('./public/maps/spain-communities.json', 'utf8'));

// Standard projection to get normalized [u, v]
const projection = d3.geoMercator().fitSize([800, 600], geoJSON);
const path = d3.geoPath().projection(projection);

const pairs = [];

Object.entries(mapping).forEach(([communityName, provinceIds]) => {
    const feature = geoJSON.features.find(f => f.properties.name === communityName);
    if (!feature) return;

    const [u, v] = path.centroid(feature);

    let totalX = 0, totalY = 0, totalArea = 0;
    provinceIds.forEach(id => {
        const c = getProvinceCentroid(id);
        if (c) {
            totalX += c.x * c.area;
            totalY += c.y * c.area;
            totalArea += c.area;
        }
    });

    if (totalArea > 0) {
        pairs.push({
            name: communityName,
            u, v,
            x: totalX / totalArea,
            y: totalY / totalArea
        });
    }
});

console.log(JSON.stringify(pairs, null, 2));
