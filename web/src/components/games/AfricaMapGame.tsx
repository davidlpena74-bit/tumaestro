'use client';

import CountryGameBase from './CountryGameBase';
import { AFRICA_PATHS } from './data/africa-paths';
import { AFRICA_MAPPING } from './data/country-translations';
import { AFRICA_SEAS_PATHS } from './data/africa-physical-paths';
import { calculatePathCentroid } from '@/lib/svg-utils';
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

    const seaLabels = useMemo(() => {
        const labels = Object.entries(AFRICA_SEAS_PATHS)
            .filter(([name]) => !name.includes('Lago')) // Only seas/gulfs
            .map(([name, path]) => {
                const centroid = calculatePathCentroid(path);
                return {
                    id: name,
                    name: name,
                    x: centroid?.x || 0,
                    y: centroid?.y || 0,
                    fontSize: '7px'
                };
            }).filter(l => l.x !== 0);

        // Add Oceans manually if not in paths
        labels.push(
            { id: 'atlantico', name: 'Océano Atlántico', x: 100, y: 300, fontSize: '8px' },
            { id: 'indico', name: 'Océano Índico', x: 650, y: 400, fontSize: '8px' }
        );

        return labels;
    }, []);

    return (
        <CountryGameBase
            key={language}
            title={t.gamesPage.gameTitles.africaMap}
            description={t.gamesPage.gameTitles.africaMapDesc}
            regionName={t.gamesPage.regions.africa}
            pathData={AFRICA_PATHS}
            nameMapping={mapping}
            colorTheme="emerald"
            initialTime={180}
            initialZoom={1.36}
            initialPan={{ x: -100, y: 50 }}
            backgroundLabels={seaLabels}
            taskId={taskId}
            activityId={activityId || 'game'}
        />
    );
}
