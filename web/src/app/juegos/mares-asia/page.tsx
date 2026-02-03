
'use client';

import PhysicalMapGame from '@/components/games/PhysicalMapGame';
import { ASIA_SEAS_PATHS } from '@/components/games/data/asia-physical-paths';
import { ASIA_PATHS } from '@/components/games/data/asia-paths';
import { useLanguage } from '@/context/LanguageContext';

export default function MaresAsiaPage() {
    const { t } = useLanguage();

    return (
        <PhysicalMapGame
            title={t.gamesPage.gameTitles.oceansAsia}
            description={t.gamesPage.gameTitles.oceansAsiaDesc}
            items={ASIA_SEAS_PATHS}
            itemType="polygon"
            backgroundPaths={ASIA_PATHS}
            viewBox="0 0 800 600"
            initialZoom={1.2}
            initialPan={{ x: -40, y: -40 }}
            colorTheme="blue"
        />
    );
}
