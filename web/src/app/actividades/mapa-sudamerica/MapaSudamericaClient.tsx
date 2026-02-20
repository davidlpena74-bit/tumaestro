
'use client';

import SouthAmericaMapGame from '@/components/games/SouthAmericaMapGame';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { useLanguage } from '@/context/LanguageContext';
import { useSearchParams } from 'next/navigation';

export default function MapaSudamericaClient() {
    const { t } = useLanguage();
    const searchParams = useSearchParams();
    const taskId = searchParams.get('taskId');

    return (
        <PhysicalGameLayout
            title={t.gamesPage.gameTitles.southAmericaMap}
            description={t.gamesPage.gameTitles.southAmericaMapDesc}
            colorTheme="emerald"
            activityId="mapa-sudamerica"
        >
            <SouthAmericaMapGame taskId={taskId} activityId="mapa-sudamerica" />
        </PhysicalGameLayout>
    );
}
