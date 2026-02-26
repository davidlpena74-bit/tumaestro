'use client';

import CountryGameBase from './CountryGameBase';
import { EUROPE_PATHS } from './data/europe-paths';
import { EUROPE_MAPPING } from './data/country-translations';
import { useLanguage } from '@/context/LanguageContext';
import { useMemo } from 'react';


export default function EuropeGame({ taskId = null, activityId }: { taskId?: string | null, activityId?: string }) {
    const { t, language } = useLanguage();

    const mergedPaths = useMemo(() => {
        return EUROPE_PATHS;
    }, []);

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
            description={t.gamesPage.gameTitles.europeMapDesc}
            regionName={t.gamesPage.regions.europe}
            pathData={mergedPaths}
            nameMapping={mapping}
            colorTheme="emerald"
            initialTime={180}
            initialZoom={1.98}
            initialPan={{ x: 50, y: -170 }}
            elevationHeight={6}
            taskId={taskId}
            activityId={activityId || 'game'}
        />
    );
}
