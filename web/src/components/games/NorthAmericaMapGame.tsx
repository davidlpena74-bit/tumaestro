'use client';

import CountryGameBase from './CountryGameBase';
import { NORTH_AMERICA_PATHS } from './data/north-america-paths';
import { NORTH_AMERICA_MAPPING } from './data/country-translations';
import { useLanguage } from '@/context/LanguageContext';

export default function NorthAmericaMapGame() {
    const { t } = useLanguage();
    return (
        <CountryGameBase
            title={t.gamesPage.gameTitles.northAmericaMap}
            regionName={t.gamesPage.regions.northAmerica}
            pathData={NORTH_AMERICA_PATHS}
            nameMapping={NORTH_AMERICA_MAPPING}
            colorTheme="emerald"
            initialTime={180}
            initialZoom={1.2}
            initialPan={{ x: 0, y: 0 }}
        />
    );
}
