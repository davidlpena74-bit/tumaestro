'use client';

import CountryGameBase from './CountryGameBase';
import { ASIA_PATHS } from './data/asia-paths';
import { ASIA_MAPPING } from './data/country-translations';
import { useLanguage } from '@/context/LanguageContext';

export default function AsiaMapGame() {
    const { t } = useLanguage();

    return (
        <CountryGameBase
            title={t.gamesPage.gameTitles.asiaMap}
            regionName={t.gamesPage.regions.asia}
            pathData={ASIA_PATHS}
            nameMapping={ASIA_MAPPING}
            colorTheme="emerald"
            initialTime={180}
        />
    );
}
