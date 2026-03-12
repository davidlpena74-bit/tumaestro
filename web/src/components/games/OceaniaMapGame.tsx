'use client';

import CountryGameBase from './CountryGameBase';
import { OCEANIA_PATHS } from './data/oceania-paths';
import { OCEANIA_NEIGHBORS_PATHS } from './data/oceania-neighbors-paths';
import { OCEANIA_MAPPING } from './data/country-translations';
import { OCEANIA_SEAS_PATHS } from './data/oceania-physical-paths';
import { calculatePathCentroid } from '@/lib/svg-utils';
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

    const seaLabels = useMemo(() => {
        const labels = Object.entries(OCEANIA_SEAS_PATHS)
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
            { id: 'indico', name: 'Océano Índico', x: 100, y: 350, fontSize: '8px' },
            { id: 'pacifico', name: 'Océano Pacífico', x: 700, y: 300, fontSize: '10px' }
        );

        return labels;
    }, []);

    return (
        <CountryGameBase
            key={language}
            title={t.gamesPage.gameTitles.oceaniaMap}
            regionName={t.gamesPage.regions.oceania}
            pathData={OCEANIA_PATHS}
            nameMapping={mapping}
            backgroundPaths={OCEANIA_NEIGHBORS_PATHS}
            colorTheme="blue"
            initialTime={120} // Fewer countries
            initialZoom={1.1}
            initialPan={{ x: 0, y: 0 }}
            backgroundLabels={seaLabels}
            taskId={taskId}
            activityId={activityId || 'game'}
        />
    );
}
