'use client';

import CountryGameBase from './CountryGameBase';
import { AFRICA_PATHS } from './data/africa-paths';
import { AFRICA_MAPPING } from './data/country-translations';
import { useLanguage } from '@/context/LanguageContext';

export default function AfricaMapGame() {
    const { t } = useLanguage();
    return (
        <CountryGameBase
            title={t.gamesPage.gameTitles.africaMap}
            regionName={t.gamesPage.regions.africa}
            pathData={AFRICA_PATHS}
            nameMapping={AFRICA_MAPPING}
            colorTheme="emerald"
            initialTime={180}
            initialZoom={1.2} // Further 20% increase over optimized height
            initialPan={{ x: 0, y: 0 }}
        />
    );
}
