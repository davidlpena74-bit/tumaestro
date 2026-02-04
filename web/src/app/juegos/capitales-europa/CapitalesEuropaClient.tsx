
'use client';

import CapitalGame from '@/components/games/CapitalGame';
import { EUROPE_PATHS } from '@/components/games/data/europe-paths';
import { EUROPE_CAPITALS_COORDS } from '@/components/games/data/europe-capitals-coords';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { useLanguage } from '@/context/LanguageContext';

export default function CapitalesEuropaClient() {
    const { t } = useLanguage();

    return (
        <PhysicalGameLayout
            title={t.gamesPage.gameTitles.europeCapitalsMap}
            description={t.gamesPage.gameTitles.europeCapitalsMapDesc}
            colorTheme="teal"
        >
            <CapitalGame
                paths={EUROPE_PATHS}
                centroids={EUROPE_CAPITALS_COORDS}
                title={t.gamesPage.gameTitles.europeCapitalsMap}
                initialPan={{ x: -80, y: -170 }}
                initialZoom={1.8}
            />
        </PhysicalGameLayout>
    );
}
