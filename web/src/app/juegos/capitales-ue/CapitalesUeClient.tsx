
'use client';

import CapitalGame from '@/components/games/CapitalGame';
import { EUROPE_PATHS } from '@/components/games/data/europe-paths';
import { EUROPE_CAPITALS_COORDS } from '@/components/games/data/europe-capitals-coords';
import { EU_MEMBERS_LIST } from '@/components/games/data/capitals-data';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { useLanguage } from '@/context/LanguageContext';

export default function CapitalesUeClient() {
    const { t } = useLanguage();

    return (
        <PhysicalGameLayout
            title={t.gamesPage.gameTitles.euCapitalsMap}
            description={t.gamesPage.gameTitles.euCapitalsMapDesc}
            colorTheme="teal"
        >
            <CapitalGame
                paths={EUROPE_PATHS}
                centroids={EUROPE_CAPITALS_COORDS}
                targetList={EU_MEMBERS_LIST}
                title={t.gamesPage.gameTitles.euCapitalsMap}
                initialPan={{ x: 0, y: -180 }}
                initialZoom={1.75}
            />
        </PhysicalGameLayout>
    );
}
