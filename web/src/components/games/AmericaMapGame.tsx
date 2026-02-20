'use client';

import CountryGameBase from './CountryGameBase';
import { AMERICA_PATHS } from './data/america-paths';
import { AMERICA_MAPPING } from './data/country-translations';
import { useLanguage } from '@/context/LanguageContext';

import { useMemo } from 'react';

export default function AmericaMapGame({ taskId = null, activityId }: { taskId?: string | null, activityId?: string }) {
    const { t, language } = useLanguage();

    const mapping = useMemo(() => {
        if (language === 'en') {
            const enMapping: Record<string, string> = {};
            Object.keys(AMERICA_MAPPING).forEach(key => {
                enMapping[key] = key;
            });
            return enMapping;
        }
        return AMERICA_MAPPING;
    }, [language]);

    return (
        <CountryGameBase
            key={language}
            title={t.gamesPage.gameTitles.americaMap}
            regionName={t.gamesPage.regions.america}
            pathData={AMERICA_PATHS}
            nameMapping={mapping}
            colorTheme="emerald"
            initialTime={180}
            initialZoom={1.8} // Reduced 10% from x2
            initialPan={{ x: 0, y: -60 }} // Shifted upwards as requested
            taskId={taskId}
            activityId={activityId}
        />
    );
}
