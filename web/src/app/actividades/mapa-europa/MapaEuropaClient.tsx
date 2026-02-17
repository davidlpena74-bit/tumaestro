
'use client';

import EuropeGame from '@/components/games/EuropeGame';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { useLanguage } from '@/context/LanguageContext';
import { useSearchParams } from 'next/navigation';

export default function MapaEuropaClient() {
    const { t } = useLanguage();
    const searchParams = useSearchParams();
    const taskId = searchParams.get('taskId');

    return (
        <PhysicalGameLayout
            title={t.gamesPage.gameTitles.europeMap}
            description={t.gamesPage.gameTitles.europeMapDesc}
            colorTheme="emerald"
        >
            <EuropeGame taskId={taskId} />
        </PhysicalGameLayout>
    );
}
