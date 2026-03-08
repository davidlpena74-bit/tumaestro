'use client';

import CountryGameBase from './CountryGameBase';
import { NORTH_AMERICA_PATHS } from './data/north-america-paths';
import { NORTH_AMERICA_MAPPING } from './data/country-translations';
import { AMERICA_SEAS_PATHS } from './data/america-physical-paths';
import { calculatePathCentroid } from '@/lib/svg-utils';
import { useLanguage } from '@/context/LanguageContext';

import { useMemo } from 'react';

export default function NorthAmericaMapGame({ taskId = null, activityId }: { taskId?: string | null, activityId?: string }) {
    const { t, language } = useLanguage();

    const mapping = useMemo(() => {
        const contextKeys = [
            'Belize', 'Costa Rica', 'El Salvador', 'Guatemala', 'Honduras', 'Nicaragua', 'Panama',
            'Iceland', 'Greenland'
        ];

        if (language === 'en') {
            const enMapping: Record<string, string> = {};
            Object.keys(NORTH_AMERICA_MAPPING).forEach(key => {
                if (!contextKeys.includes(key)) {
                    enMapping[key] = key;
                }
            });
            return enMapping;
        }

        const esMapping: Record<string, string> = {};
        Object.keys(NORTH_AMERICA_MAPPING).forEach(key => {
            if (!contextKeys.includes(key)) {
                esMapping[key] = NORTH_AMERICA_MAPPING[key];
            }
        });
        return esMapping;
    }, [language]);

    const seaLabels = useMemo(() => {
        const labels = Object.entries(AMERICA_SEAS_PATHS)
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
            { id: 'atlantico', name: 'Océano Atlántico', x: 650, y: 300, fontSize: '8px' },
            { id: 'pacifico', name: 'Océano Pacífico', x: 150, y: 350, fontSize: '8px' }
        );

        return labels;
    }, []);

    return (
        <CountryGameBase
            key={language}
            title={t.gamesPage.gameTitles.northAmericaMap}
            regionName={t.gamesPage.regions.northAmerica}
            pathData={NORTH_AMERICA_PATHS}
            nameMapping={mapping}
            colorTheme="emerald"
            initialTime={180}
            initialZoom={1.54}
            initialPan={{ x: 130, y: -80 }}
            backgroundLabels={seaLabels}
            taskId={taskId}
            activityId={activityId || 'game'}
        />
    );
}
