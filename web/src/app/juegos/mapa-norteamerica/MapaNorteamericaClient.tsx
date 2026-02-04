
'use client';

import NorthAmericaMapGame from '@/components/games/NorthAmericaMapGame';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { useLanguage } from '@/context/LanguageContext';

export default function MapaNorteamericaClient() {
    const { t } = useLanguage();

    return (
        <PhysicalGameLayout
            title={t.gamesPage.gameTitles.northAmericaMap}
            description={t.gamesPage.gameTitles.northAmericaMapDesc}
            colorTheme="emerald"
        >
            <NorthAmericaMapGame />
        </PhysicalGameLayout>
    );
}
