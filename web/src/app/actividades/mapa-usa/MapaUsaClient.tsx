
'use client';

import UsaMapGame from '@/components/games/UsaMapGame';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { useLanguage } from '@/context/LanguageContext';
import { useSearchParams } from 'next/navigation';

export default function MapaUsaClient() {
    const { t } = useLanguage();
    const searchParams = useSearchParams();
    const taskId = searchParams.get('taskId');

    return (
        <PhysicalGameLayout
            title={t.gamesPage.gameTitles.usaStatesMap}
            description={t.gamesPage.gameTitles.usaStatesMapDesc}
            colorTheme="emerald"
            activityId="mapa-usa"
        >
            <UsaMapGame taskId={taskId} activityId="mapa-usa" />
        </PhysicalGameLayout>
    );
}
