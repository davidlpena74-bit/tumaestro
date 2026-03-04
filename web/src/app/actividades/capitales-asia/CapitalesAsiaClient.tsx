
'use client';

import CountryGameBase from '@/components/games/CountryGameBase';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { ASIA_PATHS } from '@/components/games/data/asia-paths';
import { ASIA_BG_PATHS } from '@/components/games/data/asia-bg-paths';
import { ASIA_CAPITALS_MAPPING } from '@/components/games/data/country-translations';
import { useLanguage } from '@/context/LanguageContext';
import { useSearchParams } from 'next/navigation';

export default function CapitalesAsiaClient() {
    const { t } = useLanguage();
    const searchParams = useSearchParams();
    const taskId = searchParams.get('taskId');

    return (
        <PhysicalGameLayout
            title={t.gamesPage.gameTitles.asiaCapitals || "Capitales de Asia"}
            description={t.gamesPage.gameTitles.asiaCapitalsDesc || "Localiza las capitales de los países de Asia en el mapa"}
            colorTheme="emerald"
            activityId="capitales-asia"
        >
            <CountryGameBase
                title={t.gamesPage.gameTitles.asiaCapitals || "Capitales de Asia"}
                regionName={t.gamesPage.regions.asia || "Asia"}
                pathData={ASIA_PATHS}
                nameMapping={ASIA_CAPITALS_MAPPING}
                backgroundPaths={ASIA_BG_PATHS}
                colorTheme="emerald"
                initialTime={180}
                initialZoom={0.7}
                initialPan={{ x: 120, y: 120 }}
                taskId={taskId}
                activityId="capitales-asia"
                identifyMode="capitals"
            />
        </PhysicalGameLayout>
    );
}
