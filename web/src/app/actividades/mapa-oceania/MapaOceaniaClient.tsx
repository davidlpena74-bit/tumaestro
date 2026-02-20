
'use client';

import OceaniaMapGame from '@/components/games/OceaniaMapGame';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { useLanguage } from '@/context/LanguageContext';
import { useSearchParams } from 'next/navigation';

export default function MapaOceaniaClient() {
    const { t } = useLanguage();
    const searchParams = useSearchParams();
    const taskId = searchParams.get('taskId');

    return (
        <PhysicalGameLayout
            title={t.gamesPage.gameTitles.oceaniaMap}
            description={t.gamesPage.gameTitles.oceaniaMapDesc}
            colorTheme="emerald"
            activityId="mapa-oceania"
        >
            <OceaniaMapGame taskId={taskId} activityId="mapa-oceania" />
        </PhysicalGameLayout>
    );
}
