'use client';

import { useMemo } from 'react';
import PhysicalMapGame from '@/components/games/PhysicalMapGame';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { SPANISH_MOUNTAINS_DATA } from '@/components/games/data/spanish-mountains-detailed';
import { SPANISH_COMMUNITIES_PATHS, REGION_DISPLAY_NAMES } from '@/components/games/spanish-communities-paths';
import { SPAIN_NEIGHBORS_PATHS } from '@/components/games/data/spain-neighbors-paths';
import { calculatePathCentroid } from '@/lib/svg-utils';
import { useLanguage } from '@/context/LanguageContext';
import { useSearchParams } from 'next/navigation';

export default function MontanasEspanaClient() {
    const { t } = useLanguage();
    const searchParams = useSearchParams();
    const taskId = searchParams.get('taskId');

    // Combine Spain communities + neighboring countries as one background object
    const backgroundPaths = useMemo(() => ({
        ...SPAIN_NEIGHBORS_PATHS,          // Portugal, France, Morocco, Andorra (rendered first = below)
        ...SPANISH_COMMUNITIES_PATHS,      // Spain regions on top
    }), []);

    // Memoize region labels (only for Spain communities, not neighbors)
    const regionLabels = useMemo(() => {
        return Object.entries(SPANISH_COMMUNITIES_PATHS).map(([id, paths]) => {
            if (id === 'ceuta') return { id, name: 'Ceuta', x: 234, y: 528 };
            if (id === 'melilla') return { id, name: 'Melilla', x: 344, y: 562 };

            const primaryPath = Array.isArray(paths) ? paths[0] : paths;
            const centroid = calculatePathCentroid(primaryPath);
            return {
                id,
                name: REGION_DISPLAY_NAMES[id] || id,
                ...(centroid || { x: 0, y: 0 })
            };
        }).filter(l => l.x !== 0) as { id: string; name: string; x: number; y: number }[];
    }, []);

    // Sea and Ocean labels
    const environmentalLabels = useMemo(() => [
        { id: 'mar-cantabrico', name: 'Mar Cantábrico', x: 243, y: 20 },
        { id: 'mar-mediterraneo', name: 'Mar Mediterráneo', x: 580, y: 418 },
        { id: 'oceano-atlantico-1', name: 'Océano Atlántico', x: -128, y: 240 },
    ], []);

    const combinedLabels = useMemo(() => [...regionLabels, ...environmentalLabels], [regionLabels, environmentalLabels]);

    // Canary Islands transformation
    const backgroundTransforms = {
        canarias: "translate(-220, 40)"
    };

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
                insetFrame={{ x: -190, y: 510, width: 280, height: 180 }}
                viewBox="-140 0 840 700"
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
