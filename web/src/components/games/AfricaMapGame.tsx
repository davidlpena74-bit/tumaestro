'use client';

import CountryGameBase from './CountryGameBase';
import { AFRICA_PATHS } from './data/africa-paths';
import { AFRICA_MAPPING } from './data/country-translations';
import { useLanguage } from '@/context/LanguageContext';

import { useMemo } from 'react';

export default function AfricaMapGame({ taskId = null, activityId }: { taskId?: string | null, activityId?: string }) {
    const { t, language } = useLanguage();

    const mapping = useMemo(() => {
        if (language === 'en') {
            const enMapping: Record<string, string> = {};
            Object.keys(AFRICA_MAPPING).forEach(key => {
                enMapping[key] = key;
            });
            return enMapping;
        }
        return AFRICA_MAPPING;
    }, [language]);

    return (
        <CountryGameBase
            key={language}
            title={t.gamesPage.gameTitles.africaMap}
            regionName={t.gamesPage.regions.africa}
            pathData={AFRICA_PATHS}
            nameMapping={mapping}
            colorTheme="emerald"
            initialTime={180}
            initialZoom={1.2} // Further 20% increase over optimized height
            initialPan={{ x: 0, y: 0 }}
            taskId={taskId}
            activityId={activityId}
        />
    );
}
