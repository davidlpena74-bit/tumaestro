import { MapFactory } from './MapFactory.mjs';
import * as d3Composite from 'd3-geo'; // AlbersUSA is usually in core d3-geo

const factory = new MapFactory();

try {
    factory
        .loadTopoJSON('public/maps/us-states-10m.json', 'states')
        .setProjection((collection, d3) => {
            // geoAlbersUsa is specifically for US states (includes Alaska/Hawaii)
            return d3.geoAlbersUsa()
                .fitExtent([[40, 40], [760, 560]], collection);
        });

    const paths = factory.generateSVGPaths('name');
    factory.saveTypeScript('src/components/games/data/usa-states-paths.ts', 'USA_STATES_PATHS', paths);

    console.log(`Successfully generated paths for ${Object.keys(paths).length} US states.`);

} catch (error) {
    console.error("Error generating USA map:", error);
}
