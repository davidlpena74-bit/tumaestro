
'use client';

import PhysicalMapGame from '@/components/games/PhysicalMapGame';
import { OCEANIA_MOUNTAINS_PATHS } from '@/components/games/data/oceania-physical-paths';
import { OCEANIA_PATHS } from '@/components/games/data/oceania-paths';
import { useLanguage } from '@/context/LanguageContext';

export default function MontanasOceaniaPage() {
    const { t } = useLanguage();

    return (
        <PhysicalMapGame
            title={t.gamesPage.gameTitles.mountainsOceania}
            description={t.gamesPage.gameTitles.mountainsOceaniaDesc}
            items={OCEANIA_MOUNTAINS_PATHS}
            itemType="line"
            backgroundPaths={OCEANIA_PATHS}
            viewBox="0 0 800 600"
            colorTheme="emerald"
        />
    );
}
