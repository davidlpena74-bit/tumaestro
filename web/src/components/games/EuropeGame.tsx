'use client';

import CountryGameBase from './CountryGameBase';
import { EUROPE_PATHS } from './data/europe-paths';
import { EUROPE_MAPPING } from './data/country-translations';
import { EUROPE_SEAS_PATHS } from './data/europe-physical-paths';
import { calculatePathCentroid } from '@/lib/svg-utils';
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

    const seaLabels = useMemo(() => {
        return Object.entries(EUROPE_SEAS_PATHS).map(([name, path]) => {
            const centroid = calculatePathCentroid(path);
            return {
                id: name,
                name: name,
                x: centroid?.x || 0,
                y: centroid?.y || 0,
                fontSize: '6px'
            };
        }).filter(l => l.x !== 0);
    }, []);

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
            initialZoom={1.1}
            initialPan={{ x: 0, y: 0 }}
            elevationHeight={6}
            backgroundLabels={seaLabels}
            taskId={taskId}
            activityId={activityId || 'game'}
        />
    );
}
