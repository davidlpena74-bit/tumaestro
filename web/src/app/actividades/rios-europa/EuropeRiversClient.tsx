
'use client';

import { useMemo } from 'react';
import PhysicalMapGame from '@/components/games/PhysicalMapGame';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { EUROPE_RIVERS_PATHS } from '@/components/games/data/europe-rivers-paths';
import { EUROPE_PATHS } from '@/components/games/data/europe-paths';
import { calculatePathCentroid } from '@/lib/svg-utils';
import { useLanguage } from '@/context/LanguageContext';
import { useSearchParams } from 'next/navigation';

export default function EuropeRiversClient() {
    const { t } = useLanguage();
    const searchParams = useSearchParams();
    const taskId = searchParams.get('taskId');

    // Memoize country labels for background context
    const countryLabels = useMemo(() => {
        return Object.entries(EUROPE_PATHS).map(([id, paths]) => {
            const primaryPath = Array.isArray(paths) ? paths[0] : paths;
            const centroid = calculatePathCentroid(primaryPath);
            return {
                id,
                name: id,
                ...(centroid || { x: 0, y: 0 })
            };
        }).filter(l => l.x !== 0) as { id: string; name: string; x: number; y: number }[];
    }, []);

    return (
        <PhysicalGameLayout
            title={t.gamesPage.gameTitles.riversEurope}
            description={t.gamesPage.gameTitles.riversEuropeDesc}
            colorTheme="blue"
            activityId="rios-europa"
        >
            <PhysicalMapGame
                title={t.gamesPage.gameTitles.riversEurope}
                description={t.gamesPage.gameTitles.riversEuropeDesc}
                items={EUROPE_RIVERS_PATHS}
                itemType="line"
                backgroundPaths={EUROPE_PATHS}
                backgroundLabels={countryLabels}
                viewBox="0 0 840 700"
                initialZoom={1.5}
                initialPan={{ x: -250, y: -100 }}
                theme="light"
                elevationHeight={5}
                colorTheme="blue"
                taskId={taskId}
                activityId="rios-europa"
                region={t.gamesPage.regions.europe}
                gameType={t.gamesPage.gameTypes.map}
            />
        </PhysicalGameLayout>
    );
}
