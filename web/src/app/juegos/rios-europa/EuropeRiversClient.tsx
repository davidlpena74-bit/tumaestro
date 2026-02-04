
'use client';

import EuropeRiversGame from '@/components/games/EuropeRiversGame';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { useLanguage } from '@/context/LanguageContext';

export default function EuropeRiversClient() {
    const { t } = useLanguage();

    return (
        <PhysicalGameLayout
            title={t.gamesPage.gameTitles.riversEurope}
            description={t.gamesPage.gameTitles.riversEuropeDesc}
            colorTheme="teal"
        >
            <EuropeRiversGame />
        </PhysicalGameLayout>
    );
}
