
'use client';

import AmericaMapGame from '@/components/games/AmericaMapGame';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { useLanguage } from '@/context/LanguageContext';
import { useSearchParams } from 'next/navigation';

export default function MapaAmericaClient() {
    const { t } = useLanguage();
    const searchParams = useSearchParams();
    const taskId = searchParams.get('taskId');

    return (
        <PhysicalGameLayout
            title={t.gamesPage.gameTitles.americaMap}
            description={t.gamesPage.gameTitles.americaMapDesc}
            colorTheme="emerald"
        >
            <AmericaMapGame taskId={taskId} />
        </PhysicalGameLayout>
    );
}
