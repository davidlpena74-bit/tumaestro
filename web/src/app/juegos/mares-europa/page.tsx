
'use client';

import PhysicalMapGame from '@/components/games/PhysicalMapGame';
import { EUROPE_SEAS_PATHS } from '@/components/games/data/europe-physical-paths';
import { EUROPE_PATHS } from '@/components/games/data/europe-paths';
import { useLanguage } from '@/context/LanguageContext';

export default function MaresEuropaPage() {
    const { t } = useLanguage();

    return (
        <PhysicalMapGame
            title={t.gamesPage.gameTitles.oceansEurope}
            description={t.gamesPage.gameTitles.oceansEuropeDesc}
            items={EUROPE_SEAS_PATHS}
            itemType="polygon"
            backgroundPaths={EUROPE_PATHS}
            viewBox="0 0 800 600"
            initialZoom={1.5}
            initialPan={{ x: -100, y: -100 }}
            colorTheme="blue"
        />
    );
}
