'use client';

import { useMemo } from 'react';
import PhysicalMapGame from '@/components/games/PhysicalMapGame';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { AMERICA_MOUNTAINS_PATHS } from '@/components/games/data/america-physical-paths';
import { NORTH_AMERICA_PATHS } from '@/components/games/data/north-america-paths';
import { USA_STATES_MILLER_PATHS } from '@/components/games/data/usa-states-miller-paths';
import { useLanguage } from '@/context/LanguageContext';
import { useSearchParams } from 'next/navigation';

export default function MontanasUSAClient() {
    const { t, language } = useLanguage();
    const searchParams = useSearchParams();
    const taskId = searchParams.get('taskId');

    // Filter for USA mountains
    const usaMountains = useMemo(() => {
        const selected = ["Rocosas", "Apalaches", "Sierra Nevada"];
        const filtered: Record<string, any> = {};
        selected.forEach(name => {
            if (AMERICA_MOUNTAINS_PATHS[name]) {
                filtered[name] = AMERICA_MOUNTAINS_PATHS[name];
            }
        });
        return filtered;
    }, []);

    // Combine backgrounds
    const bgPaths = useMemo(() => {
        const combined: Record<string, string> = {};
        Object.entries(NORTH_AMERICA_PATHS).forEach(([key, value]) => {
            if (key !== 'United States of America') combined[`ctx_${key}`] = value;
        });
        Object.entries(USA_STATES_MILLER_PATHS).forEach(([key, value]) => {
            combined[key] = value;
        });
        return combined;
    }, []);

    const backgroundColors = useMemo(() => {
        const colors: Record<string, string> = {};
        Object.keys(bgPaths).forEach(key => {
            if (key.startsWith('ctx_')) {
                colors[key] = 'fill-slate-800/20 stroke-slate-800/30';
            } else {
                colors[key] = 'fill-[#f5edda] stroke-[#c8b89a]';
            }
        });
        return colors;
    }, [bgPaths]);

    return (
        <PhysicalGameLayout
            title={t.gamesPage.gameTitles.usaMountains}
            description={t.gamesPage.gameTitles.usaMountainsDesc}
            colorTheme="emerald"
            activityId="montanas-usa"
        >
            <PhysicalMapGame
                title={t.gamesPage.gameTitles.usaMountains}
                description={t.gamesPage.gameTitles.usaMountainsDesc}
                items={usaMountains}
                itemType="polygon"
                backgroundPaths={bgPaths}
                backgroundColors={backgroundColors}
                viewBox="0 0 800 600"
                initialZoom={1.85}
                initialPan={{ x: 170, y: -140 }}
                theme="light"
                elevationHeight={15}
                colorTheme="emerald"
                taskId={taskId}
                activityId="montanas-usa"
                region={t.gamesPage.regions.usa}
                gameType={t.gamesPage.gameTypes.map}
            />
        </PhysicalGameLayout>
    );
}
