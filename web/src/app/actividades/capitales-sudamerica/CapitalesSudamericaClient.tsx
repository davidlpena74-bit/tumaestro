
'use client';

import CountryGameBase from '@/components/games/CountryGameBase';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { SOUTH_AMERICA_PATHS } from '@/components/games/data/south-america-paths';
import { SOUTH_AMERICA_CAPITALS_MAPPING } from '@/components/games/data/country-translations';
import { useLanguage } from '@/context/LanguageContext';
import { useSearchParams } from 'next/navigation';

export default function CapitalesSudamericaClient() {
    const { t } = useLanguage();
    const searchParams = useSearchParams();
    const taskId = searchParams.get('taskId');

    return (
        <PhysicalGameLayout
            title={t.gamesPage.gameTitles.southAmericaCapitals}
            description={t.gamesPage.gameTitles.southAmericaCapitalsDesc}
            colorTheme="blue"
            activityId="capitales-sudamerica"
        >
            <CountryGameBase
                title={t.gamesPage.gameTitles.southAmericaCapitals}
                regionName={t.gamesPage.regions.southAmerica}
                pathData={SOUTH_AMERICA_PATHS}
                nameMapping={SOUTH_AMERICA_CAPITALS_MAPPING}
                colorTheme="blue"
                initialTime={180}
                initialZoom={0.6}
                initialPan={{ x: 50, y: 150 }}
                taskId={taskId}
                activityId="capitales-sudamerica"
                identifyMode="capitals"
            />
        </PhysicalGameLayout>
    );
}
