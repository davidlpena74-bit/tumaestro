
'use client';

import UsaMapGame from '@/components/games/UsaMapGame';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { useLanguage } from '@/context/LanguageContext';

export default function MapaUsaClient() {
    const { t } = useLanguage();

    return (
        <PhysicalGameLayout
            title={t.gamesPage.gameTitles.usaStatesMap}
            description={t.gamesPage.gameTitles.usaStatesMapDesc}
            colorTheme="emerald"
        >
            <UsaMapGame />
        </PhysicalGameLayout>
    );
}
