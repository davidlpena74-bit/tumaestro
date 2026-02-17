
'use client';

import AfricaMapGame from '@/components/games/AfricaMapGame';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { useLanguage } from '@/context/LanguageContext';
import { useSearchParams } from 'next/navigation';

export default function MapaAfricaClient() {
    const { t } = useLanguage();
    const searchParams = useSearchParams();
    const taskId = searchParams.get('taskId');

    return (
        <PhysicalGameLayout
            title={t.gamesPage.gameTitles.africaMap}
            description={t.gamesPage.gameTitles.africaMapDesc}
            colorTheme="emerald"
        >
            <AfricaMapGame taskId={taskId} />
        </PhysicalGameLayout>
    );
}
