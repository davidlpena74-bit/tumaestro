'use client';

import CountryGameBase from './CountryGameBase';
import { AMERICA_PATHS } from './data/america-paths';
import { AMERICA_MAPPING } from './data/country-translations';
import { useLanguage } from '@/context/LanguageContext';

export default function AmericaMapGame() {
    const { t } = useLanguage();
    return (
        <CountryGameBase
            title={t.gamesPage.gameTitles.americaMap}
            regionName={t.gamesPage.regions.america}
            pathData={AMERICA_PATHS}
            nameMapping={AMERICA_MAPPING}
            colorTheme="emerald"
            initialTime={180}
            initialZoom={1.8} // Reduced 10% from x2
            initialPan={{ x: 0, y: -60 }} // Shifted upwards as requested
        />
    );
}
