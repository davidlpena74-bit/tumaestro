'use client';

import { useMemo } from 'react';
import PhysicalMapGame from '@/components/games/PhysicalMapGame';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { SOUTH_AMERICA_PATHS } from '@/components/games/data/south-america-paths';
import { SOUTH_AMERICA_BG_PATHS } from '@/components/games/data/south-america-bg-paths';
import { useLanguage } from '@/context/LanguageContext';
import { useSearchParams } from 'next/navigation';

export default function AguasSudamericaClient() {
    const { t, language } = useLanguage();
    const searchParams = useSearchParams();
    const taskId = searchParams.get('taskId');

    const saWaters = useMemo(() => {
        // Placeholder for South American waters
        return {};
    }, []);

    const seaLabels = useMemo(() => [
        { id: 'atl', name: language === 'es' ? 'Océano Atlántico' : 'Atlantic Ocean', x: 650, y: 400 },
        { id: 'pac', name: language === 'es' ? 'Océano Pacífico' : 'Pacific Ocean', x: 150, y: 450 }
    ], [language]);

    return (
        <PhysicalGameLayout
            title={t.gamesPage.gameTitles.southAmericaWater}
            description={t.gamesPage.gameTitles.southAmericaWaterDesc}
            colorTheme="blue"
            activityId="aguas-sudamerica"
        >
            <PhysicalMapGame
                title={t.gamesPage.gameTitles.southAmericaWater}
                description={t.gamesPage.gameTitles.southAmericaWaterDesc}
                items={saWaters}
                itemType="line"
                backgroundPaths={{ ...SOUTH_AMERICA_PATHS, ...SOUTH_AMERICA_BG_PATHS }}
                backgroundLabels={seaLabels}
                viewBox="0 0 800 600"
                initialZoom={1.2}
                initialPan={{ x: 200, y: -50 }}
                theme="light"
                elevationHeight={5}
                colorTheme="blue"
                taskId={taskId}
                activityId="aguas-sudamerica"
                region={t.gamesPage.regions.southAmerica}
                gameType={t.gamesPage.gameTypes.map}
            />
        </PhysicalGameLayout>
    );
}
