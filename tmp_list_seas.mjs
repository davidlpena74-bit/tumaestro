import fs from 'fs';
const data = JSON.parse(fs.readFileSync('web/public/maps/world-marine.json', 'utf8'));
console.log(data.features.map(f => f.properties.name).filter(n => n).slice(0, 100));
