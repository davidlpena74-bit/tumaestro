'use client';

import CountryGameBase from './CountryGameBase';
import { ASIA_PATHS } from './data/asia-paths';
import { ASIA_MAPPING } from './data/country-translations';
import { useLanguage } from '@/context/LanguageContext';

import { useMemo } from 'react';

export default function AsiaMapGame({ taskId = null, activityId }: { taskId?: string | null, activityId?: string }) {
    const { t, language } = useLanguage();

    const mapping = useMemo(() => {
        if (language === 'en') {
            const enMapping: Record<string, string> = {};
            Object.keys(ASIA_MAPPING).forEach(key => {
                enMapping[key] = key;
            });
            return enMapping;
        }
        return ASIA_MAPPING;
    }, [language]);

    return (
        <CountryGameBase
            key={language}
            title={t.gamesPage.gameTitles.asiaMap}
            regionName={t.gamesPage.regions.asia}
            pathData={ASIA_PATHS}
            nameMapping={mapping}
            colorTheme="emerald"
            initialTime={180}
            initialPan={{ x: 0, y: 0 }}
            taskId={taskId}
            activityId={activityId}
        />
    );
}
