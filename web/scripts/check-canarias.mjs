
import fs from 'fs';
import * as d3 from 'd3-geo';

async function run() {
    const { geoConicConformalSpain } = await import('d3-composite-projections');
    const COMMUNITIES_JSON = 'c:/Users/david/Desktop/Projects-Antigravity/Tu Maestro/web/public/maps/spain-communities.json';
    const communities = JSON.parse(fs.readFileSync(COMMUNITIES_JSON, 'utf8'));

    const projection = geoConicConformalSpain();
    projection.fitExtent([[-210, 0], [720, 620]], communities);

    const canarias = communities.features.find(f => f.properties.cod_ccaa === '05');

    const path = d3.geoPath(projection);
    const bounds = path.bounds(canarias);
    console.log('Canarias Bounds:', bounds);
}

run().catch(console.error);
