
'use client';

import CountryGameBase from '@/components/games/CountryGameBase';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { USA_STATES_MILLER_PATHS } from '@/components/games/data/usa-states-miller-paths';
import { NORTH_AMERICA_PATHS } from '@/components/games/data/north-america-paths';
import { USA_CAPITALS_MAPPING } from '@/components/games/data/country-translations';
import { useLanguage } from '@/context/LanguageContext';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

export default function CapitalesUSAClient() {
    const { t, language } = useLanguage();
    const searchParams = useSearchParams();
    const taskId = searchParams.get('taskId');

    const { bgPaths, mapping } = useMemo(() => {
        const backgroundPaths: Record<string, string> = {};
        const map = { ...USA_CAPITALS_MAPPING };

        Object.entries(NORTH_AMERICA_PATHS).forEach(([key, value]) => {
            if (key !== 'United States of America') {
                backgroundPaths[`__bg_${key}`] = value;
            }
        });

        // Ensure mapping works for both ES and EN if needed
        // but USA_CAPITALS_MAPPING seems to already have the right structure.

        return { bgPaths: backgroundPaths, mapping: map };
    }, [language]);

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
                pathData={USA_STATES_MILLER_PATHS}
                backgroundPaths={bgPaths}
                backgroundColors={Object.keys(bgPaths).reduce((acc, key) => ({
                    ...acc,
                    [key]: 'fill-slate-800/20 stroke-slate-800/30'
                }), {})}
                nameMapping={mapping}
                colorTheme="blue"
                initialTime={300}
                initialZoom={1.85}
                initialPan={{ x: 170, y: -140 }}
                taskId={taskId}
                activityId="capitales-usa"
                identifyMode="capitals"
                pointSize={2}
            />
        </PhysicalGameLayout>
    );
}
