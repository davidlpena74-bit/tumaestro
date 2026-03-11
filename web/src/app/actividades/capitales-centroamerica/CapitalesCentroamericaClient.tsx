
'use client';

import CountryGameBase from '@/components/games/CountryGameBase';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { CENTRAL_AMERICA_PATHS } from '@/components/games/data/central-america-paths';
import { CENTRAL_AMERICA_BG_PATHS } from '@/components/games/data/central-america-bg-paths';
import { CENTRAL_AMERICA_CAPITALS_MAPPING } from '@/components/games/data/country-translations';
import { useLanguage } from '@/context/LanguageContext';
import { useSearchParams } from 'next/navigation';

export default function CapitalesCentroamericaClient() {
    const { t } = useLanguage();
    const searchParams = useSearchParams();
    const taskId = searchParams.get('taskId');

    return (
        <PhysicalGameLayout
            title={t.gamesPage.gameTitles.centralAmericaCapitals}
            description={t.gamesPage.gameTitles.centralAmericaCapitalsDesc}
            colorTheme="emerald"
            activityId="capitales-centroamerica"
        >
            <CountryGameBase
                title={t.gamesPage.gameTitles.centralAmericaCapitals}
                regionName={t.gamesPage.regions.centralAmerica}
                pathData={CENTRAL_AMERICA_PATHS}
                nameMapping={CENTRAL_AMERICA_CAPITALS_MAPPING}
                backgroundPaths={CENTRAL_AMERICA_BG_PATHS}
                colorTheme="emerald"
                initialTime={120}
                initialZoom={2.2}
                initialPan={{ x: -79, y: 0 }}
                taskId={taskId}
                activityId="capitales-centroamerica"
                identifyMode="capitals"
            />
        </PhysicalGameLayout>
    );
}
