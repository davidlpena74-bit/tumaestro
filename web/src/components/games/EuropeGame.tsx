'use client';

import CountryGameBase from './CountryGameBase';
import { EUROPE_PATHS } from './data/europe-paths';
import { EUROPE_MAPPING } from './data/country-translations'; // I'll add Europe to translations too
import { useLanguage } from '@/context/LanguageContext';

export default function EuropeGame() {
    const { t } = useLanguage();
    return (
        <CountryGameBase
            title={t.gamesPage.gameTitles.europeMap}
            regionName={t.gamesPage.regions.europe}
            pathData={EUROPE_PATHS}
            nameMapping={EUROPE_MAPPING}
            colorTheme="emerald"
            initialTime={180}
            initialZoom={1.8975}
            initialPan={{ x: 40, y: -150 }}
            elevationHeight={6}
        />
    );
}
