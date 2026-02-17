'use client';

import CountryGameBase from './CountryGameBase';
import { EUROPE_PATHS } from './data/europe-paths';
import { EUROPE_MAPPING } from './data/country-translations'; // I'll add Europe to translations too
import { useLanguage } from '@/context/LanguageContext';
import { useMemo } from 'react';

export default function EuropeGame({ taskId = null }: { taskId?: string | null }) {
    const { t, language } = useLanguage();

    const mapping = useMemo(() => {
        if (language === 'en') {
            const enMapping: Record<string, string> = {};
            Object.keys(EUROPE_MAPPING).forEach(key => {
                enMapping[key] = key;
            });
            return enMapping;
        }
        return EUROPE_MAPPING;
    }, [language]);

    return (
        <CountryGameBase
            key={language}
            title={t.gamesPage.gameTitles.europeMap}
            regionName={t.gamesPage.regions.europe}
            pathData={EUROPE_PATHS}
            nameMapping={mapping}
            colorTheme="emerald"
            initialTime={180}
            initialZoom={1.53}
            initialPan={{ x: -40, y: -100 }}
            elevationHeight={6}
            taskId={taskId}
        />
    );
}
