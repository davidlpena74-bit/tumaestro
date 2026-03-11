
'use client';

import { useMemo } from 'react';
import PhysicalMapGame from '@/components/games/PhysicalMapGame';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { AFRICA_MOUNTAINS_PATHS } from '@/components/games/data/africa-physical-paths';
import { AFRICA_PATHS } from '@/components/games/data/africa-paths';
import { AFRICA_MAPPING } from '@/components/games/data/country-translations';
import { AFRICA_SEAS_PATHS } from '@/components/games/data/africa-physical-paths';
import { calculatePathCentroid } from '@/lib/svg-utils';
import { useLanguage } from '@/context/LanguageContext';
import { useSearchParams } from 'next/navigation';

export default function MontanasAfricaClient() {
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

    // Combine country labels with sea labels
    const combinedLabels = useMemo(() => {
        const seaLabels = Object.entries(AFRICA_SEAS_PATHS)
            .filter(([name]) => !name.includes('Lago'))
            .map(([name, path]) => {
                const centroid = calculatePathCentroid(path);
                return {
                    id: name,
                    name: name,
                    x: centroid?.x || 0,
                    y: centroid?.y || 0,
                    fontSize: '6px'
                };
            }).filter(l => l.x !== 0);

        // Add Oceans
        seaLabels.push(
            { id: 'atlantico', name: 'Océano Atlántico', x: 100, y: 300, fontSize: '8px' },
            { id: 'indico', name: 'Océano Índico', x: 650, y: 400, fontSize: '8px' }
        );

        return [...countryLabels, ...seaLabels];
    }, [countryLabels]);

    return (
        <PhysicalGameLayout
            title={t.gamesPage.gameTitles.africaMountains}
            description={t.gamesPage.gameTitles.africaMountainsDesc}
            colorTheme="teal"
            activityId="montanas-africa"
        >
            <PhysicalMapGame
                title={t.gamesPage.gameTitles.africaMountains}
                description={t.gamesPage.gameTitles.africaMountainsDesc}
                items={AFRICA_MOUNTAINS_PATHS}
                itemType="polygon"
                backgroundPaths={AFRICA_PATHS}
                backgroundLabels={combinedLabels}
                viewBox="0 0 800 600"
                initialZoom={1.32}
                initialPan={{ x: 0, y: 0 }}
                theme="light"
                elevationHeight={15}
                baseLabelSize={3}
                taskId={taskId}
                colorTheme="teal"
                activityId="montanas-africa"
                region={t.gamesPage.regions.africa}
                gameType={t.gamesPage.gameTypes.map}
            />
        </PhysicalGameLayout>
    );
}
