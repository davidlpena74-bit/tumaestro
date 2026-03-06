
'use client';

import { useMemo } from 'react';
import PhysicalMapGame from '@/components/games/PhysicalMapGame';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { EUROPE_RIVERS_PATHS } from '@/components/games/data/europe-rivers-paths';
import { EUROPE_PATHS } from '@/components/games/data/europe-paths';
import { EUROPE_MAPPING } from '@/components/games/data/country-translations';
import { EUROPE_SEAS_PATHS } from '@/components/games/data/europe-physical-paths';
import { calculatePathCentroid } from '@/lib/svg-utils';
import { useLanguage } from '@/context/LanguageContext';
import { useSearchParams } from 'next/navigation';
import EuropeIcelandInset from '@/components/games/EuropeIcelandInset';

export default function EuropeRiversClient() {
    const { t, language } = useLanguage();
    const searchParams = useSearchParams();
    const taskId = searchParams.get('taskId');

    // Memoize country colors
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

    // Memoize background labels
    const backgroundLabels = useMemo(() => {
        const countries = Object.entries(EUROPE_PATHS).map(([id, paths]) => {
            const primaryPath = Array.isArray(paths) ? paths[0] : paths;
            const centroid = calculatePathCentroid(primaryPath);
            return {
                id,
                name: (EUROPE_MAPPING as Record<string, string>)[id] || id,
                ...(centroid || { x: 0, y: 0 }),
                className: "fill-slate-500/25 tracking-tight font-medium",
                fontSize: "6px"
            };
        }).filter(l => l.x !== 0);

        const seas = Object.entries(EUROPE_SEAS_PATHS).map(([name, path]) => {
            const centroid = calculatePathCentroid(path);
            return {
                id: name,
                name: name,
                x: centroid?.x || 0,
                y: centroid?.y || 0,
                className: "fill-slate-500/25 tracking-tight font-medium",
                fontSize: '6px'
            };
        }).filter(l => l.x !== 0);

        const oceans = [
            { id: 'atlantic', name: language === 'es' ? 'OCÉANO ATLÁNTICO' : 'ATLANTIC OCEAN', x: 80, y: 400, className: "fill-slate-500/30", fontSize: "10px" },
            { id: 'arctic', name: language === 'es' ? 'OCÉANO ÁRTICO' : 'ARCTIC OCEAN', x: 450, y: 70, className: "fill-slate-500/30", fontSize: "10px" }
        ];

        return [...countries, ...seas, ...oceans];
    }, [language]);

    return (
        <PhysicalGameLayout
            title={t.gamesPage.gameTitles.riversEurope}
            description={t.gamesPage.gameTitles.riversEuropeDesc}
            colorTheme="blue"
            activityId="rios-europa"
        >
            <PhysicalMapGame
                title={t.gamesPage.gameTitles.riversEurope}
                description={t.gamesPage.gameTitles.riversEuropeDesc}
                items={EUROPE_RIVERS_PATHS}
                itemType="line"
                backgroundPaths={EUROPE_PATHS}
                backgroundColors={backgroundColors}
                backgroundLabels={backgroundLabels}
                viewBox="0 0 800 600"
                initialZoom={1}
                initialPan={{ x: 0, y: 0 }}
                theme="light"
                elevationHeight={5}
                colorTheme="blue"
                taskId={taskId}
                activityId="rios-europa"
                region={t.gamesPage.regions.europe}
                gameType={t.gamesPage.gameTypes.map}
                customSvgElements={<EuropeIcelandInset />}
            />
        </PhysicalGameLayout>
    );
}
