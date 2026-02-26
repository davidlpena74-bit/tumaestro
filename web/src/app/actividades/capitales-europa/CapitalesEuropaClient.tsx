
'use client';

import CapitalGame from '@/components/games/CapitalGame';
import { EUROPE_PATHS } from '@/components/games/data/europe-paths';
import { EUROPE_CAPITALS_COORDS } from '@/components/games/data/europe-capitals-coords';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { useLanguage } from '@/context/LanguageContext';
import { useSearchParams } from 'next/navigation';

export default function CapitalesEuropaClient() {
    const { t } = useLanguage();
    const searchParams = useSearchParams();
    const taskId = searchParams.get('taskId');

    return (
        <PhysicalGameLayout
            title={t.gamesPage.gameTitles.europeCapitalsMap}
            description={t.gamesPage.gameTitles.europeCapitalsMapDesc}
            colorTheme="emerald"
            activityId="capitales-europa"
        >
            <CapitalGame
                taskId={taskId}
                paths={EUROPE_PATHS}
                centroids={EUROPE_CAPITALS_COORDS}
                title={t.gamesPage.gameTitles.europeCapitalsMap}
                description={t.gamesPage.gameTitles.europeCapitalsMapDesc}
                initialPan={{ x: 40, y: -130 }}
                initialZoom={1.8}
                activityId="capitales-europa"
            />
        </PhysicalGameLayout>
    );
}
