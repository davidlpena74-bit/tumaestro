'use client';

import { useMemo } from 'react';
import PhysicalMapGame from '@/components/games/PhysicalMapGame';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { SOUTH_AMERICA_PATHS } from '@/components/games/data/south-america-paths';
import { SOUTH_AMERICA_BG_PATHS } from '@/components/games/data/south-america-bg-paths';
import { AMERICA_MOUNTAINS_PATHS } from '@/components/games/data/america-physical-paths';
import { useLanguage } from '@/context/LanguageContext';
import { useSearchParams } from 'next/navigation';

export default function MontanasSudamericaClient() {
    const { t, language } = useLanguage();
    const searchParams = useSearchParams();
    const taskId = searchParams.get('taskId');

    const saMountains = useMemo(() => {
        const filtered: Record<string, any> = {};
        if (AMERICA_MOUNTAINS_PATHS["Andes"]) {
            filtered["Andes"] = AMERICA_MOUNTAINS_PATHS["Andes"];
        }
        return filtered;
    }, []);

    const seaLabels = useMemo(() => [
        { id: 'atl', name: language === 'es' ? 'Océano Atlántico' : 'Atlantic Ocean', x: 650, y: 400 },
        { id: 'pac', name: language === 'es' ? 'Océano Pacífico' : 'Pacific Ocean', x: 150, y: 450 }
    ], [language]);

    return (
        <PhysicalGameLayout
            title={t.gamesPage.gameTitles.southAmericaMountains}
            description={t.gamesPage.gameTitles.southAmericaMountainsDesc}
            colorTheme="emerald"
            activityId="montanas-sudamerica"
        >
            <PhysicalMapGame
                title={t.gamesPage.gameTitles.southAmericaMountains}
                description={t.gamesPage.gameTitles.southAmericaMountainsDesc}
                items={saMountains}
                itemType="polygon"
                backgroundPaths={{ ...SOUTH_AMERICA_PATHS, ...SOUTH_AMERICA_BG_PATHS }}
                backgroundLabels={seaLabels}
                viewBox="0 0 800 600"
                initialZoom={1.2}
                initialPan={{ x: 200, y: -50 }}
                theme="light"
                elevationHeight={15}
                colorTheme="emerald"
                taskId={taskId}
                activityId="montanas-sudamerica"
                region={t.gamesPage.regions.southAmerica}
                gameType={t.gamesPage.gameTypes.map}
            />
        </PhysicalGameLayout>
    );
}
