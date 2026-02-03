
'use client';

import PhysicalMapGame from '@/components/games/PhysicalMapGame';
import { AMERICA_MOUNTAINS_PATHS } from '@/components/games/data/america-physical-paths';
import { NORTH_AMERICA_PATHS } from '@/components/games/data/north-america-paths';
import { SOUTH_AMERICA_PATHS } from '@/components/games/data/south-america-paths';
import { useLanguage } from '@/context/LanguageContext';

export default function MontanasAmericaPage() {
    const { t } = useLanguage();

    // Combine background paths
    const background = { ...NORTH_AMERICA_PATHS, ...SOUTH_AMERICA_PATHS };

    return (
        <PhysicalMapGame
            title={t.gamesPage.gameTitles.mountainsAmerica}
            description={t.gamesPage.gameTitles.mountainsAmericaDesc}
            items={AMERICA_MOUNTAINS_PATHS}
            itemType="line"
            backgroundPaths={background}
            viewBox="0 0 800 600"
            initialZoom={0.8}
            initialPan={{ x: 80, y: 40 }}
            colorTheme="emerald"
        />
    );
}
