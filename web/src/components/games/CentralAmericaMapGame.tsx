'use client';

import CountryGameBase from './CountryGameBase';
import { CENTRAL_AMERICA_PATHS } from './data/central-america-paths';
import { CENTRAL_AMERICA_MAPPING } from './data/country-translations';
import { useLanguage } from '@/context/LanguageContext';

import { useMemo } from 'react';
import { CENTRAL_AMERICA_BG_PATHS } from './data/central-america-bg-paths';

export default function CentralAmericaMapGame({ taskId = null, activityId }: { taskId?: string | null, activityId?: string }) {
    const { t, language } = useLanguage();

    const mapping = useMemo(() => {
        if (language === 'en') {
            const enMapping: Record<string, string> = {};
            Object.keys(CENTRAL_AMERICA_MAPPING).forEach(key => {
                enMapping[key] = key;
            });
            return enMapping;
        }
        return CENTRAL_AMERICA_MAPPING;
    }, [language]);

    return (
        <CountryGameBase
            key={language}
            title={t.gamesPage.gameTitles.centralAmericaMap || "Mapa de América Central"}
            description={t.gamesPage.gameTitles.centralAmericaMapDesc || "Encuentra los países de América Central en el mapa"}
            regionName={t.gamesPage.regions.centralAmerica || "América Central"}
            pathData={CENTRAL_AMERICA_PATHS}
            nameMapping={mapping}
            backgroundPaths={CENTRAL_AMERICA_BG_PATHS}
            colorTheme="emerald"
            initialTime={120}
            initialZoom={2.2}
            initialPan={{ x: -79, y: 0 }}
            taskId={taskId}
            activityId={activityId || 'game'}
        />
    );
}
