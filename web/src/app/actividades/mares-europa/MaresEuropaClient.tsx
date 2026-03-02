
'use client';

import { useMemo } from 'react';
import PhysicalMapGame from '@/components/games/PhysicalMapGame';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { EUROPE_SEAS_PATHS } from '@/components/games/data/europe-physical-paths';
import { EUROPE_PATHS } from '@/components/games/data/europe-paths';
import { EUROPE_MAPPING } from '@/components/games/data/country-translations';
import { calculatePathCentroid } from '@/lib/svg-utils';
import { useLanguage } from '@/context/LanguageContext';
import { useSearchParams } from 'next/navigation';

export default function MaresEuropaClient() {
    const { t } = useLanguage();
    const searchParams = useSearchParams();
    const taskId = searchParams.get('taskId');

    // Memoize country labels for background context
    const countryLabels = useMemo(() => {
        return Object.entries(EUROPE_PATHS).map(([id, paths]) => {
            const primaryPath = Array.isArray(paths) ? paths[0] : paths;
            const centroid = calculatePathCentroid(primaryPath);
            return {
                id,
                name: (EUROPE_MAPPING as Record<string, string>)[id] || id,
                ...(centroid || { x: 0, y: 0 }),
                className: "fill-slate-500/25 tracking-tight font-medium",
                fontSize: "6px"
            };
        }).filter(l => l.x !== 0) as { id: string; name: string; x: number; y: number; className?: string; fontSize?: string }[];
    }, []);

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
        <PhysicalGameLayout
            title={t.gamesPage.gameTitles.oceansEurope}
            description={t.gamesPage.gameTitles.oceansEuropeDesc}
            colorTheme="blue"
            activityId="mares-europa"
        >
            <PhysicalMapGame
                title={t.gamesPage.gameTitles.oceansEurope}
                description={t.gamesPage.gameTitles.oceansEuropeDesc}
                items={EUROPE_SEAS_PATHS}
                itemType="polygon"
                backgroundPaths={EUROPE_PATHS}
                backgroundLabels={countryLabels}
                backgroundColors={backgroundColors}
                viewBox="0 0 800 600"
                initialZoom={1.98}
                initialPan={{ x: 50, y: -170 }}
                theme="light"
                elevationHeight={2}
                taskId={taskId}
                colorTheme="blue"
                activityId="mares-europa"
                region={t.gamesPage.regions.europe}
                gameType={t.gamesPage.gameTypes.map}
            />
        </PhysicalGameLayout>
    );
}
