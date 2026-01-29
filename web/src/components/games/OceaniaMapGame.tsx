'use client';

import CountryGameBase from './CountryGameBase';
import { OCEANIA_PATHS } from './data/oceania-paths';
import { OCEANIA_MAPPING } from './data/country-translations';
import { useLanguage } from '@/context/LanguageContext';

export default function OceaniaMapGame() {
    const { t } = useLanguage();

    return (
        <CountryGameBase
            title={t.gamesPage.gameTitles.oceaniaMap}
            regionName={t.gamesPage.regions.oceania}
            pathData={OCEANIA_PATHS}
            nameMapping={OCEANIA_MAPPING}
            colorTheme="blue"
            initialTime={120} // Fewer countries
        />
    );
}
