'use client';

import { useMemo } from 'react';
import PhysicalMapGame from '@/components/games/PhysicalMapGame';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { SPANISH_MOUNTAINS_PATHS } from '@/components/games/data/spanish-mountains-paths';
import { SPANISH_COMMUNITIES_PATHS, REGION_DISPLAY_NAMES } from '@/components/games/spanish-communities-paths';
import { calculatePathCentroid } from '@/lib/svg-utils';
import { useLanguage } from '@/context/LanguageContext';
import { useSearchParams } from 'next/navigation';

export default function MontanasEspanaClient() {
    const { t } = useLanguage();
    const searchParams = useSearchParams();
    const taskId = searchParams.get('taskId');

    // Memoize region labels
    const regionLabels = useMemo(() => {
        return Object.entries(SPANISH_COMMUNITIES_PATHS).map(([id, paths]) => {
            // Hardcode Ceuta/Melilla due to path arc parameters breaking centroid calc
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

    // Canary Islands transformations
    // Shifting -220 (1.5cm left from base) and +40 (1cm down from base)
    const backgroundTransforms = {
        canarias: "translate(-220, 40)"
    };

    return (
        <PhysicalGameLayout
            title={t.gamesPage.gameTitles.mountainsSpain}
            description={t.gamesPage.gameTitles.mountainsSpainDesc}
            colorTheme="emerald"
            activityId="montanas-espana"
        >
            <div className="w-full max-w-5xl mx-auto">
                <PhysicalMapGame
                    title={t.gamesPage.gameTitles.mountainsSpain}
                    description={t.gamesPage.gameTitles.mountainsSpainDesc}
                    items={SPANISH_MOUNTAINS_PATHS}
                    itemType="line"
                    backgroundPaths={SPANISH_COMMUNITIES_PATHS}
                    backgroundLabels={regionLabels}
                    backgroundTransforms={backgroundTransforms}
                    theme="light"
                    insetFrame={{ x: -190, y: 510, width: 280, height: 180 }}
                    viewBox="-140 0 840 700"
                    colorTheme="emerald"
                    taskId={taskId}
                    activityId="montanas-espana"
                    elevationHeight={12}
                />
            </div>
        </PhysicalGameLayout>
    );
}
