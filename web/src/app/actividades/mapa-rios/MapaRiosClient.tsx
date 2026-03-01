'use client';

import { useMemo } from 'react';
import PhysicalMapGame from '@/components/games/PhysicalMapGame';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { RIVERS_PATHS } from '@/components/games/data/rivers-paths';
import { SPANISH_COMMUNITIES_PATHS, REGION_DISPLAY_NAMES } from '@/components/games/data/spain-communities-paths-unified';
import { SPAIN_NEIGHBORS_PATHS } from '@/components/games/data/spain-neighbors-paths';
import { calculatePathCentroid } from '@/lib/svg-utils';
import { useLanguage } from '@/context/LanguageContext';
import { useSearchParams } from 'next/navigation';

export default function MapaRiosClient() {
    const { t } = useLanguage();
    const searchParams = useSearchParams();
    const taskId = searchParams.get('taskId');

    // Memoize region labels (as background for the rivers map)
    const regionLabels = useMemo(() => {
        return Object.entries(SPANISH_COMMUNITIES_PATHS).map(([id, paths]) => {
            if (id === 'ceuta') return { id, name: 'Ceuta', x: 232, y: 535 };
            if (id === 'melilla') return { id, name: 'Melilla', x: 281, y: 576 };

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

    // Combine Communities + Neighbors for the background land hole
    const backgroundPaths = useMemo(() => ({
        ...SPAIN_NEIGHBORS_PATHS,
        ...SPANISH_COMMUNITIES_PATHS,
    }), []);

    // Canary Islands transformations
    const backgroundTransforms = {
        canarias: "translate(-220, 40)"
    };

    return (
        <PhysicalGameLayout
            title={t.gamesPage.gameTitles.riversSpain}
            description={t.gamesPage.gameTitles.riversSpainDesc}
            colorTheme="cyan"
            activityId="mapa-rios"
        >
            <PhysicalMapGame
                title={t.gamesPage.gameTitles.riversSpain}
                description={t.gamesPage.gameTitles.riversSpainDesc}
                items={RIVERS_PATHS}
                itemType="line"
                backgroundPaths={backgroundPaths}
                backgroundLabels={combinedLabels}
                backgroundTransforms={backgroundTransforms}
                theme="light"
                insetFrame={{ x: -190, y: 510, width: 280, height: 180 }}
                viewBox="-140 0 840 700"
                colorTheme="cyan"
                taskId={taskId}
                activityId="mapa-rios"
                elevationHeight={5}
                region={t.gamesPage.regions.spain}
                gameType={t.gamesPage.gameTypes.map}
            />
        </PhysicalGameLayout>
    );
}
