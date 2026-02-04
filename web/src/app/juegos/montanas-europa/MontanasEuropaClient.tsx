
'use client';

import PhysicalMapGame from '@/components/games/PhysicalMapGame';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { EUROPE_MOUNTAINS_PATHS } from '@/components/games/data/europe-physical-paths';
import { EUROPE_PATHS } from '@/components/games/data/europe-paths';
import { useLanguage } from '@/context/LanguageContext';

export default function MontanasEuropaClient() {
    const { t } = useLanguage();

    return (
        <PhysicalGameLayout
            title={t.gamesPage.gameTitles.mountainsEurope}
            description={t.gamesPage.gameTitles.mountainsEuropeDesc}
            colorTheme="emerald"
        >
            <PhysicalMapGame
                title={t.gamesPage.gameTitles.mountainsEurope}
                description={t.gamesPage.gameTitles.mountainsEuropeDesc}
                items={EUROPE_MOUNTAINS_PATHS}
                itemType="line"
                backgroundPaths={EUROPE_PATHS}
                viewBox="0 0 800 600"
                initialZoom={1.8}
                initialPan={{ x: -160, y: -170 }}
                colorTheme="emerald"
            />
        </PhysicalGameLayout>
    );
}
