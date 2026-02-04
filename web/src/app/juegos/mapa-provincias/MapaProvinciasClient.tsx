
'use client';

import ProvinceGame from '@/components/games/ProvinceGame';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { useLanguage } from '@/context/LanguageContext';

export default function MapaProvinciasClient() {
    const { t } = useLanguage();

    return (
        <PhysicalGameLayout
            title={t.gamesPage.gameTitles.provinces}
            description={t.gamesPage.gameTitles.provincesDesc}
            colorTheme="emerald"
        >
            <ProvinceGame />
        </PhysicalGameLayout>
    );
}
