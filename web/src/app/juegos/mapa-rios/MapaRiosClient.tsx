
'use client';

import RiversGame from '@/components/games/RiversGame';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { useLanguage } from '@/context/LanguageContext';

export default function MapaRiosClient() {
    const { t } = useLanguage();

    return (
        <PhysicalGameLayout
            title={t.gamesPage.gameTitles.riversSpain}
            description={t.gamesPage.gameTitles.riversSpainDesc}
            colorTheme="teal"
        >
            <RiversGame />
        </PhysicalGameLayout>
    );
}
