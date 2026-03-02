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
        const seas = Object.entries(EUROPE_SEAS_PATHS).map(([name, path]) => {
            const centroid = calculatePathCentroid(path);
            return {
                id: name,
                name: name.toUpperCase(),
                x: centroid?.x || 0,
                y: centroid?.y || 0,
                fontSize: '4.5px',
                className: "fill-slate-500/30"
            };
        }).filter(l => l.x !== 0);

        const oceans = [
            {
                id: 'atlantic',
                name: language === 'es' ? 'OCÉANO ATLÁNTICO' : 'ATLANTIC OCEAN',
                x: 200,
                y: 450,
                fontSize: '5px',
                className: "fill-slate-500/40"
            },
            {
                id: 'arctic',
                name: language === 'es' ? 'OCÉANO ÁRTICO' : 'ARCTIC OCEAN',
                x: 400,
                y: 50,
                fontSize: '5px',
                className: "fill-slate-500/40"
            }
        ];

        return [...seas, ...oceans];
    }, [language]);

    const backgroundColors = useMemo(() => {
        const colors: Record<string, string> = {};
        const contextCountries = ["Morocco", "Algeria", "Tunisia", "Libya", "Egypt", "Israel", "Lebanon", "Syria", "Jordan", "Iraq", "Iran", "Turkmenistan", "Uzbekistan", "Kazakhstan"];
        Object.keys(EUROPE_PATHS).forEach(id => {
            if (contextCountries.includes(id)) {
                colors[id] = "fill-slate-800/30 stroke-slate-800/50";
            } else {
                colors[id] = "fill-[#f5edda] stroke-[#c8b89a]";
            }
        });
        return colors;
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
            initialZoom={1.98}
            initialPan={{ x: 50, y: -170 }}
            elevationHeight={6}
            backgroundLabels={seaLabels}
            backgroundPaths={EUROPE_PATHS}
            backgroundColors={backgroundColors}
            taskId={taskId}
            activityId={activityId || 'game'}
        />
    );
}
