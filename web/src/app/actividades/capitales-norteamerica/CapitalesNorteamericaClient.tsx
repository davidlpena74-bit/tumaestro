
'use client';

import CountryGameBase from '@/components/games/CountryGameBase';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { NORTH_AMERICA_PATHS } from '@/components/games/data/north-america-paths';
import { NORTH_AMERICA_MAPPING, NORTH_AMERICA_CAPITALS_MAPPING } from '@/components/games/data/country-translations';
import { useLanguage } from '@/context/LanguageContext';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

export default function CapitalesNorteamericaClient() {
    const { t, language } = useLanguage();
    const searchParams = useSearchParams();
    const taskId = searchParams.get('taskId');

    const mapping = useMemo(() => {
        if (language === 'en') {
            const enMapping: Record<string, string> = {};
            Object.keys(NORTH_AMERICA_CAPITALS_MAPPING || {}).forEach(key => {
                enMapping[key] = key;
            });
            return enMapping;
        }
        return NORTH_AMERICA_CAPITALS_MAPPING || {};
    }, [language]);

    return (
        <PhysicalGameLayout
            title={t.gamesPage.gameTitles.northAmericaCapitals}
            description={t.gamesPage.gameTitles.northAmericaCapitalsDesc}
            colorTheme="emerald"
            activityId="capitales-norteamerica"
        >
            <CountryGameBase
                title={t.gamesPage.gameTitles.northAmericaCapitals}
                regionName={t.gamesPage.regions.northAmerica}
                pathData={NORTH_AMERICA_PATHS}
                nameMapping={mapping}
                colorTheme="emerald"
                initialTime={180}
                initialZoom={1.73}
                initialPan={{ x: 50, y: -180 }}
                taskId={taskId}
                activityId="capitales-norteamerica"
                identifyMode="capitals"
            />
        </PhysicalGameLayout>
    );
}
