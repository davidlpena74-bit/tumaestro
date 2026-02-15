'use client';

import CountryGameBase from './CountryGameBase';
import { NORTH_AMERICA_PATHS } from './data/north-america-paths';
import { NORTH_AMERICA_MAPPING } from './data/country-translations';
import { useLanguage } from '@/context/LanguageContext';

import { useMemo } from 'react';

export default function NorthAmericaMapGame() {
    const { t, language } = useLanguage();

    const mapping = useMemo(() => {
        if (language === 'en') {
            const enMapping: Record<string, string> = {};
            Object.keys(NORTH_AMERICA_MAPPING).forEach(key => {
                enMapping[key] = key;
            });
            return enMapping;
        }
        return NORTH_AMERICA_MAPPING;
    }, [language]);

    return (
        <CountryGameBase
            key={language}
            title={t.gamesPage.gameTitles.northAmericaMap}
            regionName={t.gamesPage.regions.northAmerica}
            pathData={NORTH_AMERICA_PATHS}
            nameMapping={mapping}
            colorTheme="emerald"
            initialTime={180}
            initialZoom={1.2}
            initialPan={{ x: 0, y: 0 }}
        />
    );
}
