'use client';

import CountryGameBase from './CountryGameBase';
import { OCEANIA_PATHS } from './data/oceania-paths';
import { OCEANIA_MAPPING } from './data/country-translations';
import { useLanguage } from '@/context/LanguageContext';

import { useMemo } from 'react';

export default function OceaniaMapGame({ taskId = null, activityId }: { taskId?: string | null, activityId?: string }) {
    const { t, language } = useLanguage();

    const mapping = useMemo(() => {
        if (language === 'en') {
            const enMapping: Record<string, string> = {};
            Object.keys(OCEANIA_MAPPING).forEach(key => {
                enMapping[key] = key;
            });
            return enMapping;
        }
        return OCEANIA_MAPPING;
    }, [language]);

    return (
        <CountryGameBase
            key={language}
            title={t.gamesPage.gameTitles.oceaniaMap}
            regionName={t.gamesPage.regions.oceania}
            pathData={OCEANIA_PATHS}
            nameMapping={mapping}
            colorTheme="blue"
            initialTime={120} // Fewer countries
            initialPan={{ x: 0, y: 0 }}
            taskId={taskId}
            activityId={activityId}
        />
    );
}
