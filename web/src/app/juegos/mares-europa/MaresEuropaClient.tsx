
'use client';

import PhysicalMapGame from '@/components/games/PhysicalMapGame';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { EUROPE_SEAS_PATHS } from '@/components/games/data/europe-physical-paths';
import { EUROPE_PATHS } from '@/components/games/data/europe-paths';
import { useLanguage } from '@/context/LanguageContext';

export default function MaresEuropaClient() {
    const { t } = useLanguage();

    return (
        <PhysicalGameLayout
            title={t.gamesPage.gameTitles.oceansEurope}
            description={t.gamesPage.gameTitles.oceansEuropeDesc}
            colorTheme="blue"
        >
            <PhysicalMapGame
                title={t.gamesPage.gameTitles.oceansEurope}
                description={t.gamesPage.gameTitles.oceansEuropeDesc}
                items={EUROPE_SEAS_PATHS}
                itemType="polygon"
                backgroundPaths={EUROPE_PATHS}
                viewBox="0 0 800 600"
                initialZoom={1.35}
                initialPan={{ x: -100, y: -160 }}
                colorTheme="emerald"
            />
        </PhysicalGameLayout>
    );
}
