
'use client';

import ProvinceGame from '@/components/games/ProvinceGame';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { useLanguage } from '@/context/LanguageContext';
import { useSearchParams } from 'next/navigation';

export default function MapaProvinciasClient() {
    const { t } = useLanguage();
    const searchParams = useSearchParams();
    const taskId = searchParams.get('taskId');

    return (
        <PhysicalGameLayout
            title={t.gamesPage.gameTitles.provinces}
            description={t.gamesPage.gameTitles.provincesDesc}
            colorTheme="teal"
            activityId="mapa-provincias"
        >
            <ProvinceGame taskId={taskId} activityId="mapa-provincias" />
        </PhysicalGameLayout>
    );
}
