
'use client';

import PhysicalMapGame from '@/components/games/PhysicalMapGame';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { AMERICA_SEAS_PATHS } from '@/components/games/data/america-physical-paths';
import { NORTH_AMERICA_PATHS } from '@/components/games/data/north-america-paths';
import { SOUTH_AMERICA_PATHS } from '@/components/games/data/south-america-paths';
import { AMERICA_PATHS } from '@/components/games/data/america-paths';
import { useLanguage } from '@/context/LanguageContext';
import { useSearchParams } from 'next/navigation';

export default function MaresAmericaClient() {
    const { t } = useLanguage();
    const searchParams = useSearchParams();
    const taskId = searchParams.get('taskId');

    // Combine background paths
    const background = { ...NORTH_AMERICA_PATHS, ...SOUTH_AMERICA_PATHS };

    return (
        <PhysicalGameLayout
            title={t.gamesPage.gameTitles.oceansAmerica}
            description={t.gamesPage.gameTitles.oceansAmericaDesc}
            colorTheme="blue"
        >
            <PhysicalMapGame
                title={t.gamesPage.gameTitles.oceansAmerica}
                description={t.gamesPage.gameTitles.oceansAmericaDesc}
                items={AMERICA_SEAS_PATHS}
                itemType="polygon"
                backgroundPaths={background}
                viewBox="0 0 800 600"
                initialZoom={0.8}
                initialPan={{ x: 80, y: 40 }}
                elevationHeight={2}
                taskId={taskId}
            />
        </PhysicalGameLayout>
    );
}
