'use client';

import { useMemo } from 'react';
import PhysicalMapGame from '@/components/games/PhysicalMapGame';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { CENTRAL_AMERICA_PATHS } from '@/components/games/data/central-america-paths';
import { CENTRAL_AMERICA_BG_PATHS } from '@/components/games/data/central-america-bg-paths';
import { useLanguage } from '@/context/LanguageContext';
import { useSearchParams } from 'next/navigation';

export default function MontanasCentroamericaClient() {
    const { t, language } = useLanguage();
    const searchParams = useSearchParams();
    const taskId = searchParams.get('taskId');

    const caMountains = useMemo(() => {
        // Placeholder for Central American mountains
        return {};
    }, []);

    const seaLabels = useMemo(() => [
        { id: 'caribe', name: language === 'es' ? 'Mar Caribe' : 'Caribbean Sea', x: 485, y: 255, fontSize: '6px' },
        { id: 'pacifico', name: language === 'es' ? 'Océano Pacífico' : 'Pacific Ocean', x: 255, y: 325, fontSize: '6px' }
    ], [language]);

    return (
        <PhysicalGameLayout
            title={t.gamesPage.gameTitles.centralAmericaMountains}
            description={t.gamesPage.gameTitles.centralAmericaMountainsDesc}
            colorTheme="emerald"
            activityId="montanas-centroamerica"
        >
            <PhysicalMapGame
                title={t.gamesPage.gameTitles.centralAmericaMountains}
                description={t.gamesPage.gameTitles.centralAmericaMountainsDesc}
                items={caMountains}
                itemType="polygon"
                backgroundPaths={{ ...CENTRAL_AMERICA_PATHS, ...CENTRAL_AMERICA_BG_PATHS }}
                backgroundLabels={seaLabels}
                viewBox="0 0 800 600"
                initialZoom={2.2}
                initialPan={{ x: -79, y: 0 }}
                theme="light"
                elevationHeight={15}
                colorTheme="emerald"
                taskId={taskId}
                activityId="montanas-centroamerica"
                region={t.gamesPage.regions.centralAmerica}
                gameType={t.gamesPage.gameTypes.map}
            />
        </PhysicalGameLayout>
    );
}
