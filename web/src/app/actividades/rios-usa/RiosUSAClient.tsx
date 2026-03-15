'use client';

import { useMemo } from 'react';
import PhysicalMapGame from '@/components/games/PhysicalMapGame';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { NORTH_AMERICA_RIVERS_PATHS } from '@/components/games/data/north-america-rivers-paths';
import { NORTH_AMERICA_PATHS } from '@/components/games/data/north-america-paths';
import { USA_STATES_MILLER_PATHS } from '@/components/games/data/usa-states-miller-paths';
import { useLanguage } from '@/context/LanguageContext';
import { useSearchParams } from 'next/navigation';

export default function RiosUSAClient() {
    const { t, language } = useLanguage();
    const searchParams = useSearchParams();
    const taskId = searchParams.get('taskId');

    // Filter for USA rivers
    const usaRivers = useMemo(() => {
        const selected = ["Mississippi", "Missouri", "Rio Grande", "Colorado", "Columbia", "Arkansas", "Ohio", "Snake"];
        const filtered: Record<string, string> = {};
        selected.forEach(name => {
            if (NORTH_AMERICA_RIVERS_PATHS[name]) {
                filtered[name] = NORTH_AMERICA_RIVERS_PATHS[name];
            }
        });
        return filtered;
    }, []);

    // Mix North America background with USA States background
    const bgPaths = useMemo(() => {
        const combined: Record<string, string> = {};
        
        // Add North America context countries
        Object.entries(NORTH_AMERICA_PATHS).forEach(([key, value]) => {
            if (key !== 'United States of America') {
                combined[`ctx_${key}`] = value;
            }
        });

        // Add USA States
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

    const seaLabels = useMemo(() => [
        { id: 'atl', name: language === 'es' ? 'Océano Atlántico' : 'Atlantic Ocean', x: 650, y: 400 },
        { id: 'pac', name: language === 'es' ? 'Océano Pacífico' : 'Pacific Ocean', x: 150, y: 450 },
        { id: 'mex', name: language === 'es' ? 'Golfo de México' : 'Gulf of Mexico', x: 450, y: 550 }
    ], [language]);

    return (
        <PhysicalGameLayout
            title={t.gamesPage.gameTitles.usaRiversLakes}
            description={t.gamesPage.gameTitles.usaRiversLakesDesc}
            colorTheme="blue"
            activityId="rios-usa"
        >
            <PhysicalMapGame
                title={t.gamesPage.gameTitles.usaRiversLakes}
                description={t.gamesPage.gameTitles.usaRiversLakesDesc}
                items={usaRivers}
                itemType="line"
                backgroundPaths={bgPaths}
                backgroundLabels={seaLabels}
                backgroundColors={backgroundColors}
                viewBox="0 0 800 600"
                initialZoom={1.85}
                initialPan={{ x: 170, y: -140 }}
                theme="light"
                elevationHeight={5}
                colorTheme="blue"
                taskId={taskId}
                activityId="rios-usa"
                region={t.gamesPage.regions.usa}
                gameType={t.gamesPage.gameTypes.map}
            />
        </PhysicalGameLayout>
    );
}
