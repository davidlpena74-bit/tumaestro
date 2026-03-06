import { getD3Projection } from '../web/scripts/geodata/modules/Projection.mjs';

const boundingBox = {
    type: "LineString",
    coordinates: [[-95, -60], [-30, 15]]
};

const proj = getD3Projection('miller', boundingBox);
console.log("Scale:", proj.scale());
console.log("Translate:", proj.translate());

// Test a coordinate mapping
const pt = proj([-60, -20]);
console.log("Point (-60, -20) ->", pt);
