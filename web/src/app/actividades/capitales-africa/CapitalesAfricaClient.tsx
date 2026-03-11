
'use client';

import CountryGameBase from '@/components/games/CountryGameBase';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { AFRICA_PATHS } from '@/components/games/data/africa-paths';
import { AFRICA_CAPITALS_MAPPING } from '@/components/games/data/country-translations';
import AFRICA_CONTEXT_PATHS, { AFRICA_CONTEXT_COLORS } from '@/components/games/data/africa-context';
import { useLanguage } from '@/context/LanguageContext';
import { useSearchParams } from 'next/navigation';

export default function CapitalesAfricaClient() {
    const { t } = useLanguage();
    const searchParams = useSearchParams();
    const taskId = searchParams.get('taskId');

    return (
        <PhysicalGameLayout
            title={t.gamesPage.gameTitles.africaCapitals}
            description={t.gamesPage.gameTitles.africaCapitalsDesc}
            colorTheme="blue"
            activityId="capitales-africa"
        >
            <CountryGameBase
                title={t.gamesPage.gameTitles.africaCapitals}
                regionName={t.gamesPage.regions.africa}
                pathData={AFRICA_PATHS}
                nameMapping={AFRICA_CAPITALS_MAPPING}
                colorTheme="blue"
                initialTime={300}
                initialZoom={1.31}
                initialPan={{ x: 0, y: -30 }}
                backgroundPaths={AFRICA_CONTEXT_PATHS}
                backgroundColors={AFRICA_CONTEXT_COLORS}
                taskId={taskId}
                activityId="capitales-africa"
                identifyMode="capitals"
                pointSize={3.2}
            />
        </PhysicalGameLayout>
    );
}
