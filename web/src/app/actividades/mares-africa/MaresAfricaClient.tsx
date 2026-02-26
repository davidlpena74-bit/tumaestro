
'use client';

import { useMemo } from 'react';
import PhysicalMapGame from '@/components/games/PhysicalMapGame';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { AFRICA_SEAS_PATHS } from '@/components/games/data/africa-physical-paths';
import { AFRICA_PATHS } from '@/components/games/data/africa-paths';
import { AFRICA_MAPPING } from '@/components/games/data/country-translations';
import { calculatePathCentroid } from '@/lib/svg-utils';
import { useLanguage } from '@/context/LanguageContext';
import { useSearchParams } from 'next/navigation';

export default function MaresAfricaClient() {
    const { t, language } = useLanguage();
    const searchParams = useSearchParams();
    const taskId = searchParams.get('taskId');

    // Memoize country labels for background context
    const countryLabels = useMemo(() => {
        return Object.entries(AFRICA_PATHS).map(([id, paths]) => {
            const primaryPath = Array.isArray(paths) ? paths[0] : paths;
            const centroid = calculatePathCentroid(primaryPath);

            // Get localized name
            let localizedName = id;
            const mapping = (AFRICA_MAPPING as any)[language] || AFRICA_MAPPING.es;
            if (mapping[id]) {
                localizedName = mapping[id];
            }

            return {
                id,
                name: localizedName,
                ...(centroid || { x: 0, y: 0 })
            };
        }).filter(l => l.x !== 0) as { id: string; name: string; x: number; y: number }[];
    }, [language]);

    return (
        <PhysicalGameLayout
            title={t.gamesPage.gameTitles.africaSeas}
            description={t.gamesPage.gameTitles.africaSeasDesc}
            colorTheme="blue"
            activityId="mares-africa"
        >
            <PhysicalMapGame
                title={t.gamesPage.gameTitles.africaSeas}
                description={t.gamesPage.gameTitles.africaSeasDesc}
                items={AFRICA_SEAS_PATHS}
                itemType="polygon"
                backgroundPaths={AFRICA_PATHS}
                backgroundLabels={countryLabels}
                viewBox="0 0 800 600"
                initialZoom={1.2}
                initialPan={{ x: 0, y: 0 }}
                theme="light"
                elevationHeight={2}
                taskId={taskId}
                colorTheme="blue"
                activityId="mares-africa"
                region={t.gamesPage.regions.africa}
                gameType={t.gamesPage.gameTypes.map}
            />
        </PhysicalGameLayout>
    );
}
