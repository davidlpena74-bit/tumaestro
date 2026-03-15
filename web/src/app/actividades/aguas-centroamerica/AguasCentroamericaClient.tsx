'use client';

import { useMemo } from 'react';
import PhysicalMapGame from '@/components/games/PhysicalMapGame';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { CENTRAL_AMERICA_PATHS } from '@/components/games/data/central-america-paths';
import { CENTRAL_AMERICA_BG_PATHS } from '@/components/games/data/central-america-bg-paths';
import { useLanguage } from '@/context/LanguageContext';
import { useSearchParams } from 'next/navigation';

export default function AguasCentroamericaClient() {
    const { t, language } = useLanguage();
    const searchParams = useSearchParams();
    const taskId = searchParams.get('taskId');

    const caWaters = useMemo(() => {
        // Placeholder for Central American waters
        return {};
    }, []);

    const seaLabels = useMemo(() => [
        { id: 'caribe', name: language === 'es' ? 'Mar Caribe' : 'Caribbean Sea', x: 485, y: 255, fontSize: '6px' },
        { id: 'pacifico', name: language === 'es' ? 'Océano Pacífico' : 'Pacific Ocean', x: 255, y: 325, fontSize: '6px' }
    ], [language]);

    return (
        <PhysicalGameLayout
            title={t.gamesPage.gameTitles.centralAmericaWater}
            description={t.gamesPage.gameTitles.centralAmericaWaterDesc}
            colorTheme="blue"
            activityId="aguas-centroamerica"
        >
            <PhysicalMapGame
                title={t.gamesPage.gameTitles.centralAmericaWater}
                description={t.gamesPage.gameTitles.centralAmericaWaterDesc}
                items={caWaters}
                itemType="line"
                backgroundPaths={{ ...CENTRAL_AMERICA_PATHS, ...CENTRAL_AMERICA_BG_PATHS }}
                backgroundLabels={seaLabels}
                viewBox="0 0 800 600"
                initialZoom={2.2}
                initialPan={{ x: -79, y: 0 }}
                theme="light"
                elevationHeight={5}
                colorTheme="blue"
                taskId={taskId}
                activityId="aguas-centroamerica"
                region={t.gamesPage.regions.centralAmerica}
                gameType={t.gamesPage.gameTypes.map}
            />
        </PhysicalGameLayout>
    );
}
