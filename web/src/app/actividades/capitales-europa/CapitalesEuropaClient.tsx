
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
            colorTheme="teal"
        >
            <CapitalGame
                taskId={taskId}
                paths={EUROPE_PATHS}
                centroids={EUROPE_CAPITALS_COORDS}
                title={t.gamesPage.gameTitles.europeCapitalsMap}
                initialPan={{ x: -80, y: -80 }}
                initialZoom={1.46}
            />
        </PhysicalGameLayout>
    );
}
