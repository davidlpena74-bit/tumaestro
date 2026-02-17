'use client';

import CountryGameBase from './CountryGameBase';
import { SOUTH_AMERICA_PATHS } from './data/south-america-paths';
import { SOUTH_AMERICA_MAPPING } from './data/country-translations';
import { useLanguage } from '@/context/LanguageContext';

import { useMemo } from 'react';

export default function SouthAmericaMapGame({ taskId = null }: { taskId?: string | null }) {
    const { t, language } = useLanguage();

    const mapping = useMemo(() => {
        if (language === 'en') {
            const enMapping: Record<string, string> = {};
            Object.keys(SOUTH_AMERICA_MAPPING).forEach(key => {
                enMapping[key] = key;
            });
            return enMapping;
        }
        return SOUTH_AMERICA_MAPPING;
    }, [language]);

    return (
        <CountryGameBase
            key={language}
            title={t.gamesPage.gameTitles.southAmericaMap}
            regionName={t.gamesPage.regions.southAmerica}
            pathData={SOUTH_AMERICA_PATHS}
            nameMapping={mapping}
            colorTheme="emerald"
            initialTime={180}
            initialZoom={1.5}
            initialPan={{ x: 0, y: 0 }}
            taskId={taskId}
        />
    );
}
