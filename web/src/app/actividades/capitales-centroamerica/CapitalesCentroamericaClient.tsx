
'use client';

import CountryGameBase from '@/components/games/CountryGameBase';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { NORTH_AMERICA_PATHS } from '@/components/games/data/north-america-paths';
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
                pathData={NORTH_AMERICA_PATHS}
                nameMapping={CENTRAL_AMERICA_CAPITALS_MAPPING}
                colorTheme="emerald"
                initialTime={120}
                initialZoom={4.5}
                initialPan={{ x: -900, y: -1900 }}
                taskId={taskId}
                activityId="capitales-centroamerica"
                identifyMode="capitals"
            />
        </PhysicalGameLayout>
    );
}
