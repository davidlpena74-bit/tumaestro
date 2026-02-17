
'use client';

import AsiaMapGame from '@/components/games/AsiaMapGame';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { useLanguage } from '@/context/LanguageContext';
import { useSearchParams } from 'next/navigation';

export default function MapaAsiaClient() {
    const { t } = useLanguage();
    const searchParams = useSearchParams();
    const taskId = searchParams.get('taskId');

    return (
        <PhysicalGameLayout
            title={t.gamesPage.gameTitles.asiaMap}
            description={t.gamesPage.gameTitles.asiaMapDesc}
            colorTheme="emerald"
        >
            <AsiaMapGame taskId={taskId} />
        </PhysicalGameLayout>
    );
}
