
import { projectPoint } from './UnifiedProjection.mjs';

const labels = [
    { id: 'mar-cantabrico', name: 'Mar Cantábrico', lon: -4, lat: 44.5 },
    { id: 'mar-mediterraneo', name: 'Mar Mediterráneo', lon: 4, lat: 39 },
    { id: 'oceano-atlantico-1', name: 'Océano Atlántico', lon: -12, lat: 40 },
];

labels.forEach(l => {
    const [x, y] = projectPoint(l.lon, l.lat);
    console.log(`${l.name}: x=${x.toFixed(1)}, y=${y.toFixed(1)}`);
});
