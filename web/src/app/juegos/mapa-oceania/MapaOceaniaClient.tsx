
'use client';

import OceaniaMapGame from '@/components/games/OceaniaMapGame';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { useLanguage } from '@/context/LanguageContext';

export default function MapaOceaniaClient() {
    const { t } = useLanguage();

    return (
        <PhysicalGameLayout
            title={t.gamesPage.gameTitles.oceaniaMap}
            description={t.gamesPage.gameTitles.oceaniaMapDesc}
            colorTheme="emerald"
        >
            <OceaniaMapGame />
        </PhysicalGameLayout>
    );
}
