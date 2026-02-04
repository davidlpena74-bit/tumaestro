
'use client';

import AmericaMapGame from '@/components/games/AmericaMapGame';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { useLanguage } from '@/context/LanguageContext';

export default function MapaAmericaClient() {
    const { t } = useLanguage();

    return (
        <PhysicalGameLayout
            title={t.gamesPage.gameTitles.americaMap}
            description={t.gamesPage.gameTitles.americaMapDesc}
            colorTheme="emerald"
        >
            <AmericaMapGame />
        </PhysicalGameLayout>
    );
}
