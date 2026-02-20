
'use client';

import EuropeRiversGame from '@/components/games/EuropeRiversGame';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { useLanguage } from '@/context/LanguageContext';
import { useSearchParams } from 'next/navigation';

export default function EuropeRiversClient() {
    const { t } = useLanguage();
    const searchParams = useSearchParams();
    const taskId = searchParams.get('taskId');

    return (
        <PhysicalGameLayout
            title={t.gamesPage.gameTitles.riversEurope}
            description={t.gamesPage.gameTitles.riversEuropeDesc}
            colorTheme="blue"
            activityId="rios-europa"
        >
            <EuropeRiversGame taskId={taskId} activityId="rios-europa" />
        </PhysicalGameLayout>
    );
}
