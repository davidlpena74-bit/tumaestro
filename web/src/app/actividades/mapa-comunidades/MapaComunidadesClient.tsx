'use client';

import { useMemo } from 'react';
import PhysicalMapGame from '@/components/games/PhysicalMapGame';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { SPANISH_COMMUNITIES_PATHS, REGION_DISPLAY_NAMES } from '@/components/games/spanish-communities-paths';
import { SPAIN_NEIGHBORS_PATHS } from '@/components/games/data/spain-neighbors-paths';
import { calculatePathCentroid } from '@/lib/svg-utils';
import { useLanguage } from '@/context/LanguageContext';
import { useSearchParams } from 'next/navigation';

export default function MapaComunidadesClient() {
    const { t } = useLanguage();
    const searchParams = useSearchParams();
    const taskId = searchParams.get('taskId');

    // Prepare Items (Communities) for the interactive layer
    const communityItems = useMemo(() => {
        const items: Record<string, string> = {};
        Object.entries(SPANISH_COMMUNITIES_PATHS).forEach(([id, paths]) => {
            // Join paths for regions with multiple parts (islands)
            const combinedPath = Array.isArray(paths) ? paths.join(' ') : paths;
            items[id] = combinedPath;
        });
        return items;
    }, []);

    // Combine Spain communities + neighboring countries as one background object (for the sea hole)
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

    // Canary Islands transformation
    const backgroundTransforms = {
        canarias: "translate(-220, 40)"
    };

    return (
        <PhysicalGameLayout
            title={t.gamesPage.gameTitles.region}
            description={t.gamesPage.gameTitles.regionDesc}
            colorTheme="emerald"
            activityId="mapa-comunidades"
        >
            <PhysicalMapGame
                title={t.gamesPage.gameTitles.region}
                description={t.gamesPage.gameTitles.regionDesc}
                items={communityItems}
                itemType="region"
                backgroundPaths={backgroundPaths}
                backgroundLabels={regionLabels}
                backgroundTransforms={backgroundTransforms}
                theme="light"
                insetFrame={{ x: -190, y: 510, width: 280, height: 180 }}
                viewBox="-140 0 840 700"
                colorTheme="emerald"
                taskId={taskId}
                activityId="mapa-comunidades"
                elevationHeight={12}
                region={t.gamesPage.regions.spain}
                gameType={t.gamesPage.gameTypes.map}
            />
        </PhysicalGameLayout>
    );
}
