
'use client';

import PhysicalMapGame from '@/components/games/PhysicalMapGame';
import { SPANISH_MOUNTAINS_PATHS } from '@/components/games/data/spanish-mountains-paths';
import { SPANISH_COMMUNITIES_PATHS } from '@/components/games/spanish-communities-paths';
import { useLanguage } from '@/context/LanguageContext';

export default function MontanasEspanaPage() {
    const { t } = useLanguage();

    return (
        <PhysicalMapGame
            title={t.gamesPage.gameTitles.mountainsSpain}
            description={t.gamesPage.gameTitles.mountainsSpainDesc}
            items={SPANISH_MOUNTAINS_PATHS}
            itemType="line"
            backgroundPaths={SPANISH_COMMUNITIES_PATHS}
            viewBox="-140 0 840 700"
            colorTheme="emerald"
        />
    );
}
