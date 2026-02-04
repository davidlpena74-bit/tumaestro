
'use client';

import EuropeGame from '@/components/games/EuropeGame';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { useLanguage } from '@/context/LanguageContext';

export default function MapaEuropaClient() {
    const { t } = useLanguage();

    return (
        <PhysicalGameLayout
            title={t.gamesPage.gameTitles.europeMap}
            description={t.gamesPage.gameTitles.europeMapDesc}
            colorTheme="emerald"
        >
            <EuropeGame />
        </PhysicalGameLayout>
    );
}
