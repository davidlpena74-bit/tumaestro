
'use client';

import SouthAmericaMapGame from '@/components/games/SouthAmericaMapGame';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { useLanguage } from '@/context/LanguageContext';

export default function MapaSudamericaClient() {
    const { t } = useLanguage();

    return (
        <PhysicalGameLayout
            title={t.gamesPage.gameTitles.southAmericaMap}
            description={t.gamesPage.gameTitles.southAmericaMapDesc}
            colorTheme="emerald"
        >
            <SouthAmericaMapGame />
        </PhysicalGameLayout>
    );
}
