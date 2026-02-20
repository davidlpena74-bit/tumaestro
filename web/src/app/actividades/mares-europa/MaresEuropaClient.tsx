
'use client';

import PhysicalMapGame from '@/components/games/PhysicalMapGame';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { EUROPE_SEAS_PATHS } from '@/components/games/data/europe-physical-paths';
import { EUROPE_PATHS } from '@/components/games/data/europe-paths';
import { useLanguage } from '@/context/LanguageContext';
import { useSearchParams } from 'next/navigation';

export default function MaresEuropaClient() {
    const { t } = useLanguage();
    const searchParams = useSearchParams();
    const taskId = searchParams.get('taskId');

    return (
        <PhysicalGameLayout
            title={t.gamesPage.gameTitles.oceansEurope}
            description={t.gamesPage.gameTitles.oceansEuropeDesc}
            colorTheme="blue"
            activityId="mares-europa"
        >
            <PhysicalMapGame
                title={t.gamesPage.gameTitles.oceansEurope}
                description={t.gamesPage.gameTitles.oceansEuropeDesc}
                items={EUROPE_SEAS_PATHS}
                itemType="polygon"
                backgroundPaths={EUROPE_PATHS}
                viewBox="0 0 800 600"
                initialZoom={1.35}
                initialPan={{ x: -100, y: -160 }}
                elevationHeight={2}
                taskId={taskId}
                colorTheme="blue"
                activityId="mares-europa"
            />
        </PhysicalGameLayout>
    );
}
