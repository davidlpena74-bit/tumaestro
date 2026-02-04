
'use client';

import RegionGame from '@/components/games/RegionGame';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { useLanguage } from '@/context/LanguageContext';

export default function MapaComunidadesClient() {
    const { t } = useLanguage();

    return (
        <PhysicalGameLayout
            title={t.gamesPage.gameTitles.region}
            description={t.gamesPage.gameTitles.regionDesc}
            colorTheme="emerald"
        >
            <RegionGame />
        </PhysicalGameLayout>
    );
}
