
'use client';

import CountryGameBase from '@/components/games/CountryGameBase';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { useMemo } from 'react';
import { CENTRAL_AMERICA_PATHS } from '@/components/games/data/central-america-paths';
import { CENTRAL_AMERICA_BG_PATHS } from '@/components/games/data/central-america-bg-paths';
import { CENTRAL_AMERICA_MAPPING } from '@/components/games/data/country-translations';
import { useLanguage } from '@/context/LanguageContext';
import { useSearchParams } from 'next/navigation';

export default function MapaCentroamericaClient() {
    const { t } = useLanguage();
    const searchParams = useSearchParams();
    const taskId = searchParams.get('taskId');
    const { language } = useLanguage();

    const seaLabels = useMemo(() => [
        { id: 'caribe', name: 'Mar Caribe', x: 300, y: 260, fontSize: '6px' },
        { id: 'pacifico', name: 'Océano Pacífico', x: 220, y: 310, fontSize: '6px' }
    ], []);

    return (
        <PhysicalGameLayout
            title={t.gamesPage.gameTitles.centralAmericaMap}
            description={t.gamesPage.gameTitles.centralAmericaMapDesc}
            colorTheme="emerald"
            activityId="mapa-centroamerica"
        >
            <CountryGameBase
                title={t.gamesPage.gameTitles.centralAmericaMap}
                regionName={t.gamesPage.regions.centralAmerica}
                pathData={CENTRAL_AMERICA_PATHS}
                nameMapping={CENTRAL_AMERICA_MAPPING}
                backgroundPaths={CENTRAL_AMERICA_BG_PATHS}
                colorTheme="emerald"
                initialTime={120}
                initialZoom={17.42}
                initialPan={{ x: 2340, y: 363 }}
                backgroundLabels={seaLabels}
                taskId={taskId}
                activityId="mapa-centroamerica"
            />
        </PhysicalGameLayout>
    );
}
