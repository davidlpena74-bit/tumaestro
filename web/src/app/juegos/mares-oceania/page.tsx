
'use client';

import PhysicalMapGame from '@/components/games/PhysicalMapGame';
import { OCEANIA_SEAS_PATHS } from '@/components/games/data/oceania-physical-paths';
import { OCEANIA_PATHS } from '@/components/games/data/oceania-paths';
import { useLanguage } from '@/context/LanguageContext';

export default function MaresOceaniaPage() {
    const { t } = useLanguage();

    return (
        <PhysicalMapGame
            title={t.gamesPage.gameTitles.oceansOceania}
            description={t.gamesPage.gameTitles.oceansOceaniaDesc}
            items={OCEANIA_SEAS_PATHS}
            itemType="polygon"
            backgroundPaths={OCEANIA_PATHS}
            viewBox="0 0 800 600"
            colorTheme="blue"
        />
    );
}
