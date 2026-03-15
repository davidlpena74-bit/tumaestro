'use client';

import { useMemo } from 'react';
import PhysicalMapGame from '@/components/games/PhysicalMapGame';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { AMERICA_SEAS_PATHS } from '@/components/games/data/america-physical-paths';
import { NORTH_AMERICA_PATHS } from '@/components/games/data/north-america-paths';
import { USA_STATES_MILLER_PATHS } from '@/components/games/data/usa-states-miller-paths';
import { useLanguage } from '@/context/LanguageContext';
import { useSearchParams } from 'next/navigation';

export default function MaresUSAClient() {
    const { t, language } = useLanguage();
    const searchParams = useSearchParams();
    const taskId = searchParams.get('taskId');

    // Filter for USA seas/oceans
    const usaSeas = useMemo(() => {
        const selected = ["Golfo de México", "Mar de Bering", "Golfo de California"];
        const filtered: Record<string, string> = {};
        selected.forEach(name => {
            if (AMERICA_SEAS_PATHS[name]) {
                filtered[name] = AMERICA_SEAS_PATHS[name];
            }
        });
        
        // Add Oceans as interactive elements too
        filtered["Océano Atlántico"] = "M600,200 L750,200 L750,550 L600,550 Z"; // Dummy large rects for simplicity if not precise
        filtered["Océano Pacífico"] = "M50,200 L250,200 L250,550 L50,550 Z";
        
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
            title={t.gamesPage.gameTitles.usaOceans}
            description={t.gamesPage.gameTitles.usaOceansDesc}
            colorTheme="blue"
            activityId="mares-usa"
        >
            <PhysicalMapGame
                title={t.gamesPage.gameTitles.usaOceans}
                description={t.gamesPage.gameTitles.usaOceansDesc}
                items={usaSeas}
                itemType="polygon"
                backgroundPaths={bgPaths}
                backgroundColors={backgroundColors}
                viewBox="0 0 800 600"
                initialZoom={1.85}
                initialPan={{ x: 170, y: -140 }}
                theme="light"
                elevationHeight={0}
                colorTheme="blue"
                taskId={taskId}
                activityId="mares-usa"
                region={t.gamesPage.regions.usa}
                gameType={t.gamesPage.gameTypes.map}
            />
        </PhysicalGameLayout>
    );
}
