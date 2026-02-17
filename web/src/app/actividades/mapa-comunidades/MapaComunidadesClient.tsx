
'use client';

import RegionGame from '@/components/games/RegionGame';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { useLanguage } from '@/context/LanguageContext';
import { useSearchParams } from 'next/navigation';

export default function MapaComunidadesClient() {
    const { t } = useLanguage();
    const searchParams = useSearchParams();
    const taskId = searchParams.get('taskId');

    return (
        <PhysicalGameLayout
            title={t.gamesPage.gameTitles.region}
            description={t.gamesPage.gameTitles.regionDesc}
            colorTheme="emerald"
        >
            <RegionGame taskId={taskId} />
        </PhysicalGameLayout>
    );
}
