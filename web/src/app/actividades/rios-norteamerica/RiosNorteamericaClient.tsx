'use client';

import { useMemo } from 'react';
import PhysicalMapGame from '@/components/games/PhysicalMapGame';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { NORTH_AMERICA_RIVERS_PATHS } from '@/components/games/data/north-america-rivers-paths';
import { NORTH_AMERICA_PATHS } from '@/components/games/data/north-america-paths';
import { calculatePathCentroid } from '@/lib/svg-utils';
import { useLanguage } from '@/context/LanguageContext';
import { useSearchParams } from 'next/navigation';

export default function RiosNorteamericaClient() {
    const { t, language } = useLanguage();
    const searchParams = useSearchParams();
    const taskId = searchParams.get('taskId');

    // Filter for the specific rivers requested by the user
    const northAmericaRivers = useMemo(() => {
        const selected = ["Mississippi", "Missouri", "Rio Grande", "Yukon", "Mackenzie", "St. Lawrence"];
        const filtered: Record<string, string> = {};
        selected.forEach(name => {
            if (NORTH_AMERICA_RIVERS_PATHS[name]) {
                filtered[name] = NORTH_AMERICA_RIVERS_PATHS[name];
            }
        });
        return filtered;
    }, []);

    // Memoize background colors for all countries in North America
    const backgroundColors = useMemo(() => {
        const colors: Record<string, string> = {};
        const contextKeys = [
            'Belize', 'Costa Rica', 'El Salvador', 'Guatemala', 'Honduras', 'Nicaragua', 'Panama',
            'Iceland', 'Greenland'
        ];

        Object.keys(NORTH_AMERICA_PATHS).forEach(key => {
            if (contextKeys.includes(key)) {
                colors[key] = 'fill-[#1e293b4d] stroke-slate-800/50';
            } else {
                colors[key] = 'fill-[#f5edda] stroke-[#c8b89a]';
            }
        });
        return colors;
    }, []);

    // Labels for the oceans and main context
    const seaLabels = useMemo(() => {
        return [
            { id: 'atlantico', name: 'Océano Atlántico', x: 650, y: 300 },
            { id: 'pacifico', name: 'Océano Pacífico', x: 150, y: 350 },
            { id: 'artico', name: 'Océano Ártico', x: 400, y: 50 },
            { id: 'mexico', name: 'Golfo de México', x: 450, y: 480 }
        ];
    }, []);

    return (
        <PhysicalGameLayout
            title={t.gamesPage.gameTitles.northAmericaRivers}
            description={t.gamesPage.gameTitles.northAmericaRiversDesc}
            colorTheme="blue"
            activityId="rios-norteamerica"
        >
            <PhysicalMapGame
                title={t.gamesPage.gameTitles.northAmericaRivers}
                description={t.gamesPage.gameTitles.northAmericaRiversDesc}
                items={northAmericaRivers}
                itemType="line"
                backgroundPaths={NORTH_AMERICA_PATHS}
                backgroundLabels={seaLabels}
                backgroundColors={backgroundColors}
                viewBox="0 0 800 600"
                initialZoom={1.54}
                initialPan={{ x: 130, y: -80 }}
                theme="light"
                elevationHeight={5}
                colorTheme="blue"
                taskId={taskId}
                activityId="rios-norteamerica"
                region={t.gamesPage.regions.northAmerica}
                gameType={t.gamesPage.gameTypes.map}
            />
        </PhysicalGameLayout>
    );
}
