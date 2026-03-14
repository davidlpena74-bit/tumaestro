'use client';

import { useMemo } from 'react';
import PhysicalMapGame from '@/components/games/PhysicalMapGame';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { AMERICA_MOUNTAINS_PATHS, AMERICA_SEAS_PATHS } from '@/components/games/data/america-physical-paths';
import { NORTH_AMERICA_PATHS } from '@/components/games/data/north-america-paths';
import { calculatePathCentroid } from '@/lib/svg-utils';
import { useLanguage } from '@/context/LanguageContext';
import { useSearchParams } from 'next/navigation';

export default function MontanasNorteamericaClient() {
    const { t, language } = useLanguage();
    const searchParams = useSearchParams();
    const taskId = searchParams.get('taskId');

    // Filter for North American Mountains
    const northAmericaMountains = useMemo(() => {
        const selected = ["Rocosas", "Apalaches", "Sierra Nevada", "Sierra Madre Occidental", "Sierra Madre Oriental"];
        const filtered: Record<string, any> = {};
        selected.forEach(name => {
            if (AMERICA_MOUNTAINS_PATHS[name]) {
                filtered[name] = AMERICA_MOUNTAINS_PATHS[name];
            }
        });
        return filtered;
    }, []);

    // Memoize sea labels for background context to match standard North America map
    const seaLabels = useMemo(() => {
        const labels = Object.entries(AMERICA_SEAS_PATHS)
            .map(([name, path]) => {
                const centroid = calculatePathCentroid(path as string);
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

    // Memoize background colors for all countries in North America
    const backgroundColors = useMemo(() => {
        const playableCountries = [
            'Canada', 'United States of America', 'Mexico', 'Cuba', 'Dominican Rep.',
            'Haiti', 'Jamaica', 'Puerto Rico', 'Bahamas'
        ];
        const contextCountries = [
            'Belize', 'Costa Rica', 'El Salvador', 'Guatemala', 'Honduras', 'Nicaragua', 'Panama',
            'Iceland', 'Greenland'
        ];
        
        const colors: Record<string, string> = {};
        
        playableCountries.forEach(id => {
            // Match CountryGameBase: fill-[#f5edda] stroke-slate-900/30
            colors[id] = "fill-[#f5edda] stroke-slate-900/30";
        });
        
        contextCountries.forEach(id => {
            // Match CountryGameBase neighbor style: fill-slate-800/30 stroke-slate-800/50
            colors[id] = "fill-slate-800/30 stroke-slate-800/50";
        });
        
        return colors;
    }, []);

    return (
        <PhysicalGameLayout
            title={t.gamesPage.gameTitles.northAmericaMountains}
            description={t.gamesPage.gameTitles.northAmericaMountainsDesc}
            colorTheme="teal"
            activityId="montanas-norteamerica"
        >
            <PhysicalMapGame
                title={t.gamesPage.gameTitles.northAmericaMountains}
                description={t.gamesPage.gameTitles.northAmericaMountainsDesc}
                items={northAmericaMountains}
                itemType="polygon"
                backgroundPaths={NORTH_AMERICA_PATHS}
                backgroundLabels={seaLabels}
                backgroundColors={backgroundColors}
                viewBox="0 0 800 600"
                initialZoom={1.54}
                initialPan={{ x: 130, y: -80 }}
                theme="light"
                elevationHeight={15}
                baseLabelSize={3}
                colorTheme="teal"
                taskId={taskId}
                activityId="montanas-norteamerica"
                region={t.gamesPage.regions.northAmerica}
                gameType={t.gamesPage.gameTypes.map}
            />
        </PhysicalGameLayout>
    );
}
