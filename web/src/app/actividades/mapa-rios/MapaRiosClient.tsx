
'use client';

import RiversGame from '@/components/games/RiversGame';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { useLanguage } from '@/context/LanguageContext';
import { useSearchParams } from 'next/navigation';

export default function MapaRiosClient() {
    const { t } = useLanguage();
    const searchParams = useSearchParams();
    const taskId = searchParams.get('taskId');

    return (
        <PhysicalGameLayout
            title={t.gamesPage.gameTitles.riversSpain}
            description={t.gamesPage.gameTitles.riversSpainDesc}
            colorTheme="blue"
            activityId="mapa-rios"
        >
            <RiversGame activityId="mapa-rios" taskId={taskId} />
        </PhysicalGameLayout>
    );
}
