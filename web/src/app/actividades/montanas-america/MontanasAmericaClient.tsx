
'use client';

import { useMemo } from 'react';
import PhysicalMapGame from '@/components/games/PhysicalMapGame';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { AMERICA_MOUNTAINS_PATHS } from '@/components/games/data/america-physical-paths';
import { NORTH_AMERICA_PATHS } from '@/components/games/data/north-america-paths';
import { SOUTH_AMERICA_PATHS } from '@/components/games/data/south-america-paths';
import { AMERICA_SEAS_PATHS } from '@/components/games/data/america-physical-paths';
import { calculatePathCentroid } from '@/lib/svg-utils';
import { useLanguage } from '@/context/LanguageContext';
import { useSearchParams } from 'next/navigation';

export default function MontanasAmericaClient() {
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

    // Combine country labels with sea labels
    const combinedLabels = useMemo(() => {
        const seaLabels = Object.entries(AMERICA_SEAS_PATHS).map(([name, path]) => {
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
            { id: 'atlantico', name: 'Océano Atlántico', x: 650, y: 350, fontSize: '8px' },
            { id: 'pacifico', name: 'Océano Pacífico', x: 150, y: 350, fontSize: '8px' }
        );

        return [...countryLabels, ...seaLabels];
    }, [countryLabels]);

    return (
        <PhysicalGameLayout
            title={t.gamesPage.gameTitles.mountainsAmerica}
            description={t.gamesPage.gameTitles.mountainsAmericaDesc}
            colorTheme="teal"
            activityId="montanas-america"
        >
            <PhysicalMapGame
                title={t.gamesPage.gameTitles.mountainsAmerica}
                description={t.gamesPage.gameTitles.mountainsAmericaDesc}
                items={AMERICA_MOUNTAINS_PATHS}
                itemType="polygon"
                backgroundPaths={background}
                backgroundLabels={combinedLabels}
                viewBox="0 0 840 700"
                initialZoom={0.8}
                initialPan={{ x: 80, y: 40 }}
                theme="light"
                elevationHeight={15}
                baseLabelSize={3}
                colorTheme="teal"
                taskId={taskId}
                activityId="montanas-america"
                region={t.gamesPage.regions.america}
                gameType={t.gamesPage.gameTypes.map}
            />
        </PhysicalGameLayout>
    );
}
