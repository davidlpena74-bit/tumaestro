
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
        const contextKeys = [
            'Belize', 'Costa Rica', 'El Salvador', 'Guatemala', 'Honduras', 'Nicaragua', 'Panama',
            'Iceland', 'Greenland'
        ];

        const baseMapping = NORTH_AMERICA_CAPITALS_MAPPING || {};
        const filteredMapping: Record<string, string> = {};

        Object.keys(baseMapping).forEach(key => {
            if (!contextKeys.includes(key)) {
                if (language === 'en') {
                    filteredMapping[key] = key;
                } else {
                    filteredMapping[key] = baseMapping[key];
                }
            }
        });

        return filteredMapping;
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
                initialZoom={1.54}
                initialPan={{ x: 130, y: -80 }}
                taskId={taskId}
                activityId="capitales-norteamerica"
                identifyMode="capitals"
            />
        </PhysicalGameLayout>
    );
}
