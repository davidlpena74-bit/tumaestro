
'use client';

import { useMemo } from 'react';
import PhysicalMapGame from '@/components/games/PhysicalMapGame';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { AMERICA_SEAS_PATHS } from '@/components/games/data/america-physical-paths';
import { NORTH_AMERICA_PATHS } from '@/components/games/data/north-america-paths';
import { SOUTH_AMERICA_PATHS } from '@/components/games/data/south-america-paths';
import { calculatePathCentroid } from '@/lib/svg-utils';
import { useLanguage } from '@/context/LanguageContext';
import { useSearchParams } from 'next/navigation';

export default function MaresAmericaClient() {
    const { t } = useLanguage();
    const searchParams = useSearchParams();
    const taskId = searchParams.get('taskId');

    // Combine background paths
    const background = useMemo(() => ({ ...NORTH_AMERICA_PATHS, ...SOUTH_AMERICA_PATHS }), []);

    // Memoize country labels for background context
    const countryLabels = useMemo(() => {
        return Object.entries(background).map(([id, paths]) => {
            const primaryPath = Array.isArray(paths) ? paths[0] : paths;
            const centroid = calculatePathCentroid(primaryPath);
            return {
                id,
                name: id,
                ...(centroid || { x: 0, y: 0 })
            };
        }).filter(l => l.x !== 0) as { id: string; name: string; x: number; y: number }[];
    }, [background]);

    return (
        <PhysicalGameLayout
            title={t.gamesPage.gameTitles.oceansAmerica}
            description={t.gamesPage.gameTitles.oceansAmericaDesc}
            colorTheme="blue"
            activityId="mares-america"
        >
            <PhysicalMapGame
                title={t.gamesPage.gameTitles.oceansAmerica}
                description={t.gamesPage.gameTitles.oceansAmericaDesc}
                items={AMERICA_SEAS_PATHS}
                itemType="polygon"
                backgroundPaths={background}
                backgroundLabels={countryLabels}
                viewBox="0 0 840 700"
                theme="light"
                elevationHeight={2}
                taskId={taskId}
                colorTheme="blue"
                activityId="mares-america"
                region={t.gamesPage.regions.america}
                gameType={t.gamesPage.gameTypes.map}
            />
        </PhysicalGameLayout>
    );
}
