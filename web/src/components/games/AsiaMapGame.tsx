'use client';

import CountryGameBase from './CountryGameBase';
import { ASIA_PATHS } from './data/asia-paths';
import { ASIA_MAPPING } from './data/country-translations';
import { ASIA_SEAS_PATHS } from './data/asia-physical-paths';
import { calculatePathCentroid } from '@/lib/svg-utils';
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

    const seaLabels = useMemo(() => {
        const labels = Object.entries(ASIA_SEAS_PATHS)
            .map(([name, path]) => {
                const centroid = calculatePathCentroid(path);
                return {
                    id: name,
                    name: name,
                    x: centroid?.x || 0,
                    y: centroid?.y || 0,
                    fontSize: '6px'
                };
            }).filter(l => l.x !== 0);

        // Add Oceans manually
        labels.push(
            { id: 'indico', name: 'Océano Índico', x: 400, y: 530, fontSize: '8px' },
            { id: 'pacifico', name: 'Océano Pacífico', x: 700, y: 400, fontSize: '8px' }
        );

        return labels;
    }, []);

    return (
        <CountryGameBase
            key={language}
            title={t.gamesPage.gameTitles.asiaMap}
            description={t.gamesPage.gameTitles.asiaMapDesc}
            regionName={t.gamesPage.regions.asia}
            pathData={ASIA_PATHS}
            nameMapping={mapping}
            colorTheme="emerald"
            initialTime={180}
            initialZoom={1.2}
            initialPan={{ x: -150, y: 100 }}
            backgroundLabels={seaLabels}
            taskId={taskId}
            activityId={activityId || 'game'}
        />
    );
}
