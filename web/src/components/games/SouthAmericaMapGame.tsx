'use client';

import CountryGameBase from './CountryGameBase';
import { SOUTH_AMERICA_PATHS } from './data/south-america-paths';
import { SOUTH_AMERICA_MAPPING } from './data/country-translations';
import { useLanguage } from '@/context/LanguageContext';

export default function SouthAmericaMapGame() {
    const { t } = useLanguage();
    return (
        <CountryGameBase
            title={t.gamesPage.gameTitles.southAmericaMap}
            regionName={t.gamesPage.regions.southAmerica}
            pathData={SOUTH_AMERICA_PATHS}
            nameMapping={SOUTH_AMERICA_MAPPING}
            colorTheme="emerald"
            initialTime={180}
            initialZoom={1.5}
            initialPan={{ x: 0, y: 0 }}
        />
    );
}
