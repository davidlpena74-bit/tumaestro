
'use client';

import AsiaMapGame from '@/components/games/AsiaMapGame';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { useLanguage } from '@/context/LanguageContext';

export default function MapaAsiaClient() {
    const { t } = useLanguage();

    return (
        <PhysicalGameLayout
            title={t.gamesPage.gameTitles.asiaMap}
            description={t.gamesPage.gameTitles.asiaMapDesc}
            colorTheme="emerald"
        >
            <AsiaMapGame />
        </PhysicalGameLayout>
    );
}
