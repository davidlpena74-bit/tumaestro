
'use client';

import CountryGameBase from '@/components/games/CountryGameBase';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { USA_STATES_PATHS } from '@/components/games/data/usa-states-paths';
import { USA_CAPITALS_MAPPING } from '@/components/games/data/country-translations';
import { useLanguage } from '@/context/LanguageContext';
import { useSearchParams } from 'next/navigation';

export default function CapitalesUSAClient() {
    const { t } = useLanguage();
    const searchParams = useSearchParams();
    const taskId = searchParams.get('taskId');

    return (
        <PhysicalGameLayout
            title={t.gamesPage.gameTitles.usaCapitals}
            description={t.gamesPage.gameTitles.usaCapitalsDesc}
            colorTheme="blue"
            activityId="capitales-usa"
        >
            <CountryGameBase
                title={t.gamesPage.gameTitles.usaCapitals}
                regionName={t.gamesPage.regions.usa}
                pathData={USA_STATES_PATHS}
                nameMapping={USA_CAPITALS_MAPPING}
                colorTheme="blue"
                initialTime={300}
                initialZoom={0.8}
                initialPan={{ x: 20, y: 30 }}
                taskId={taskId}
                activityId="capitales-usa"
                identifyMode="capitals"
            />
        </PhysicalGameLayout>
    );
}
