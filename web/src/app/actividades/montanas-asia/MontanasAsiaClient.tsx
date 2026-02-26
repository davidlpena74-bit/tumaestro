
'use client';

import { useMemo } from 'react';
import PhysicalMapGame from '@/components/games/PhysicalMapGame';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { ASIA_MOUNTAINS_PATHS } from '@/components/games/data/asia-physical-paths';
import { ASIA_PATHS } from '@/components/games/data/asia-paths';
import { calculatePathCentroid } from '@/lib/svg-utils';
import { useLanguage } from '@/context/LanguageContext';
import { useSearchParams } from 'next/navigation';

export default function MontanasAsiaClient() {
    const { t } = useLanguage();
    const searchParams = useSearchParams();
    const taskId = searchParams.get('taskId');

    // Memoize country labels for background context
    const countryLabels = useMemo(() => {
        return Object.entries(ASIA_PATHS).map(([id, paths]) => {
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
            title={t.gamesPage.gameTitles.mountainsAsia}
            description={t.gamesPage.gameTitles.mountainsAsiaDesc}
            colorTheme="teal"
            activityId="montanas-asia"
        >
            <PhysicalMapGame
                title={t.gamesPage.gameTitles.mountainsAsia}
                description={t.gamesPage.gameTitles.mountainsAsiaDesc}
                items={ASIA_MOUNTAINS_PATHS}
                itemType="polygon"
                backgroundPaths={ASIA_PATHS}
                backgroundLabels={countryLabels}
                viewBox="0 0 840 700"
                initialZoom={1.2}
                initialPan={{ x: -40, y: -40 }}
                theme="light"
                elevationHeight={15}
                baseLabelSize={3}
                colorTheme="teal"
                taskId={taskId}
                activityId="montanas-asia"
                region={t.gamesPage.regions.asia}
                gameType={t.gamesPage.gameTypes.map}
            />
        </PhysicalGameLayout>
    );
}
