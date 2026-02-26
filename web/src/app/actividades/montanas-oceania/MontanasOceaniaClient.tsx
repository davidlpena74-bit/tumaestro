
'use client';

import { useMemo } from 'react';
import PhysicalMapGame from '@/components/games/PhysicalMapGame';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { OCEANIA_MOUNTAINS_PATHS } from '@/components/games/data/oceania-physical-paths';
import { OCEANIA_PATHS } from '@/components/games/data/oceania-paths';
import { calculatePathCentroid } from '@/lib/svg-utils';
import { useLanguage } from '@/context/LanguageContext';
import { useSearchParams } from 'next/navigation';

export default function MontanasOceaniaClient() {
    const { t } = useLanguage();
    const searchParams = useSearchParams();
    const taskId = searchParams.get('taskId');

    // Memoize country labels for background context
    const countryLabels = useMemo(() => {
        return Object.entries(OCEANIA_PATHS).map(([id, paths]) => {
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
            title={t.gamesPage.gameTitles.mountainsOceania}
            description={t.gamesPage.gameTitles.mountainsOceaniaDesc}
            colorTheme="teal"
            activityId="montanas-oceania"
        >
            <PhysicalMapGame
                title={t.gamesPage.gameTitles.mountainsOceania}
                description={t.gamesPage.gameTitles.mountainsOceaniaDesc}
                items={OCEANIA_MOUNTAINS_PATHS}
                itemType="polygon"
                backgroundPaths={OCEANIA_PATHS}
                backgroundLabels={countryLabels}
                viewBox="0 0 840 700"
                theme="light"
                elevationHeight={15}
                baseLabelSize={3}
                colorTheme="teal"
                taskId={taskId}
                activityId="montanas-oceania"
                region={t.gamesPage.regions.oceania}
                gameType={t.gamesPage.gameTypes.map}
            />
        </PhysicalGameLayout>
    );
}
