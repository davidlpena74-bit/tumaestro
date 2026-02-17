
'use client';

import CapitalGame from '@/components/games/CapitalGame';
import { EUROPE_PATHS } from '@/components/games/data/europe-paths';
import { EUROPE_CAPITALS_COORDS } from '@/components/games/data/europe-capitals-coords';
import { EU_MEMBERS_LIST, EU_MEMBERS_LIST_EN } from '@/components/games/data/capitals-data';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { useLanguage } from '@/context/LanguageContext';
import { useSearchParams } from 'next/navigation';

export default function CapitalesUeClient() {
    const { t, language } = useLanguage();
    const searchParams = useSearchParams();
    const taskId = searchParams.get('taskId');

    return (
        <PhysicalGameLayout
            title={t.gamesPage.gameTitles.euCapitalsMap}
            description={t.gamesPage.gameTitles.euCapitalsMapDesc}
            colorTheme="teal"
        >
            <CapitalGame
                taskId={taskId}
                paths={EUROPE_PATHS}
                centroids={EUROPE_CAPITALS_COORDS}
                targetList={language === 'es' ? EU_MEMBERS_LIST : EU_MEMBERS_LIST_EN}
                title={t.gamesPage.gameTitles.euCapitalsMap}
                initialPan={{ x: 0, y: -150 }}
                initialZoom={1.74}
            />
        </PhysicalGameLayout>
    );
}
