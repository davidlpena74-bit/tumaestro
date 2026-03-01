'use client';

import { useMemo } from 'react';
import PhysicalMapGame from '@/components/games/PhysicalMapGame';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { SPANISH_MOUNTAINS_DATA } from '@/components/games/data/spanish-mountains-detailed';
import * as d3 from 'd3-geo';
import { geoConicConformalSpain } from 'd3-composite-projections';
import * as topojson from 'topojson-client';
import { REGION_DISPLAY_NAMES } from '@/components/games/spanish-communities-paths-unified';
import { useLanguage } from '@/context/LanguageContext';
import { useSearchParams } from 'next/navigation';

// Official Data
import communitiesData from '../../../../public/maps/spain-communities.json';
import provincesData from '../../../../public/maps/spain-provinces-official.json';
import worldData from '../../../../public/maps/world-countries-50m.json';

const CCAA_ID_MAP: Record<string, string> = {
    '01': 'andalucia',
    '02': 'aragon',
    '03': 'asturias',
    '04': 'baleares',
    '05': 'canarias',
    '06': 'cantabria',
    '07': 'castillaleon',
    '08': 'castillalamancha',
    '09': 'cataluna',
    '10': 'valencia',
    '11': 'extremadura',
    '12': 'galicia',
    '13': 'madrid',
    '14': 'murcia',
    '15': 'navarra',
    '16': 'paisvasco',
    '17': 'larioja',
    '18': 'ceuta',
    '19': 'melilla'
};

export default function MontanasEspanaClient() {
    const { t } = useLanguage();
    const searchParams = useSearchParams();
    const taskId = searchParams.get('taskId');

    // Unified projection for all map layers
    const projection = useMemo(() => {
        const proj = geoConicConformalSpain();
        proj.fitExtent([[-210, 0], [720, 620]], communitiesData as any);
        return proj;
    }, []);

    const pathGenerator = useMemo(() => d3.geoPath(projection), [projection]);

    // Fondo: Vecinos y provincias individuales del GeoJSON oficial
    const backgroundPaths = useMemo(() => {
        const bg: Record<string, string> = {};

        // 1. Neighbor countries
        try {
            const countries = topojson.feature(worldData as any, (worldData as any).objects.countries) as any;
            const neighborIds: Record<string, string> = {
                '620': 'Portugal', '250': 'France', '504': 'Morocco', '12': 'Algeria', '20': 'Andorra'
            };
            countries.features.forEach((f: any) => {
                const idStr = String(f.id);
                if (neighborIds[idStr]) {
                    bg[neighborIds[idStr]] = pathGenerator(f) || '';
                }
            });
        } catch (e) {
            console.error('Error processing neighbors:', e);
        }

        // 2. Spain Provinces backdrop
        (provincesData as any).features.forEach((feature: any) => {
            const name = feature.properties.name || 'prov';
            bg[name] = pathGenerator(feature) || '';
        });
        return bg;
    }, [pathGenerator]);

    // Community labels using official centroids
    const regionLabels = useMemo(() => {
        const labels: any[] = [];
        (communitiesData as any).features.forEach((feature: any) => {
            const code = feature.properties.cod_ccaa;
            const id = CCAA_ID_MAP[code] || feature.properties.name.toLowerCase().replace(/ /g, '_');
            const center = d3.geoCentroid(feature);
            const projPoint = projection(center);

            if (projPoint) {
                let [x, y] = projPoint;
                // Minor adjustments for specific small regions if needed
                if (id === 'ceuta') { x += 10; y += 0; }
                if (id === 'melilla') { x += 12; y += 0; }

                labels.push({
                    id,
                    name: REGION_DISPLAY_NAMES[id] || feature.properties.name,
                    x,
                    y
                });
            }
        });
        return labels;
    }, [projection]);

    // Sea and Ocean labels
    const environmentalLabels = useMemo(() => [
        { id: 'mar-cantabrico', name: 'MAR CANTÁBRICO', x: 243, y: 2, className: 'fill-sky-800/40', fontSize: '13px' },
        { id: 'mar-mediterraneo', name: 'MAR MEDITERRÁNEO', x: 580, y: 418, className: 'fill-sky-800/40', fontSize: '13px' },
        { id: 'oceano-atlantico-1', name: 'OCÉANO ATLÁNTICO', x: -126, y: 280, className: 'fill-sky-900/40', fontSize: '13px' },
    ], []);

    const combinedLabels = useMemo(() => [...regionLabels, ...environmentalLabels], [regionLabels, environmentalLabels]);

    const backgroundTransforms = {};

    return (
        <PhysicalGameLayout
            title={t.gamesPage.gameTitles.mountainsSpain}
            description={t.gamesPage.gameTitles.mountainsSpainDesc}
            colorTheme="teal"
            activityId="montanas-espana"
        >
            <PhysicalMapGame
                title={t.gamesPage.gameTitles.mountainsSpain}
                description={t.gamesPage.gameTitles.mountainsSpainDesc}
                items={SPANISH_MOUNTAINS_DATA}
                itemType="polygon"
                backgroundPaths={backgroundPaths}
                backgroundLabels={combinedLabels}
                backgroundTransforms={backgroundTransforms}
                theme="light"
                insetFrame={{ x: -228, y: 475, width: 280, height: 144 }}
                viewBox="-270 -35 970 700"
                colorTheme="teal"
                taskId={taskId}
                activityId="montanas-espana"
                elevationHeight={12}
                baseLabelSize={8}
                region={t.gamesPage.regions.spain}
                gameType={t.gamesPage.gameTypes.map}
            />
        </PhysicalGameLayout>
    );
}
