
'use client';

import { useMemo } from 'react';
import PhysicalMapGame from '@/components/games/PhysicalMapGame';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { EUROPE_MOUNTAINS_PATHS } from '@/components/games/data/europe-physical-paths';
import { EUROPE_PATHS } from '@/components/games/data/europe-paths';
import { EUROPE_MAPPING } from '@/components/games/data/country-translations';
import { calculatePathCentroid } from '@/lib/svg-utils';
import { useLanguage } from '@/context/LanguageContext';
import { useSearchParams } from 'next/navigation';

export default function MontanasEuropaClient() {
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
                name: (EUROPE_MAPPING as Record<string, string>)[id] || id,
                ...(centroid || { x: 0, y: 0 })
            };
        }).filter(l => l.x !== 0) as { id: string; name: string; x: number; y: number }[];
    }, []);

    return (
        <PhysicalGameLayout
            title={t.gamesPage.gameTitles.mountainsEurope}
            description={t.gamesPage.gameTitles.mountainsEuropeDesc}
            colorTheme="teal"
            activityId="montanas-europa"
        >
            <PhysicalMapGame
                title={t.gamesPage.gameTitles.mountainsEurope}
                description={t.gamesPage.gameTitles.mountainsEuropeDesc}
                items={EUROPE_MOUNTAINS_PATHS}
                itemType="polygon"
                backgroundPaths={EUROPE_PATHS}
                backgroundLabels={countryLabels}
                viewBox="0 0 800 600"
                initialZoom={1.8}
                initialPan={{ x: 40, y: -130 }}
                theme="light"
                elevationHeight={15}
                baseLabelSize={3}
                taskId={taskId}
                colorTheme="teal"
                activityId="montanas-europa"
                region={t.gamesPage.regions.europe}
                gameType={t.gamesPage.gameTypes.map}
            />
        </PhysicalGameLayout>
    );
}
