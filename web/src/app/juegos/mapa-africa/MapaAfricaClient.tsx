
'use client';

import AfricaMapGame from '@/components/games/AfricaMapGame';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { useLanguage } from '@/context/LanguageContext';

export default function MapaAfricaClient() {
    const { t } = useLanguage();

    return (
        <PhysicalGameLayout
            title={t.gamesPage.gameTitles.africaMap}
            description={t.gamesPage.gameTitles.africaMapDesc}
            colorTheme="emerald"
        >
            <AfricaMapGame />
        </PhysicalGameLayout>
    );
}
