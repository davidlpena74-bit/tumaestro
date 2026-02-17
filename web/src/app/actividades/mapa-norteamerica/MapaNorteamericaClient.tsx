
'use client';

import NorthAmericaMapGame from '@/components/games/NorthAmericaMapGame';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { useLanguage } from '@/context/LanguageContext';
import { useSearchParams } from 'next/navigation';

export default function MapaNorteamericaClient() {
    const { t } = useLanguage();
    const searchParams = useSearchParams();
    const taskId = searchParams.get('taskId');

    return (
        <PhysicalGameLayout
            title={t.gamesPage.gameTitles.northAmericaMap}
            description={t.gamesPage.gameTitles.northAmericaMapDesc}
            colorTheme="emerald"
        >
            <NorthAmericaMapGame taskId={taskId} />
        </PhysicalGameLayout>
    );
}
