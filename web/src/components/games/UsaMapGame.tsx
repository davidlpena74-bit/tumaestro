import CountryGameBase from './CountryGameBase';
import { NORTH_AMERICA_PATHS } from './data/north-america-paths';
import { USA_STATES_MILLER_PATHS } from './data/usa-states-miller-paths';
import { NORTH_AMERICA_MAPPING, USA_STATES_MAPPING } from './data/country-translations';
import { useLanguage } from '@/context/LanguageContext';
import { useMemo } from 'react';

export default function UsaMapGame({ taskId = null, activityId }: { taskId?: string | null, activityId?: string }) {
    const { t, language } = useLanguage();

    const { statesPaths, bgPaths, mapping } = useMemo(() => {
        const interactivePaths = { ...USA_STATES_MILLER_PATHS };
        const backgroundPaths: Record<string, string> = {};
        const map = { ...USA_STATES_MAPPING };

        Object.entries(NORTH_AMERICA_PATHS).forEach(([key, value]) => {
            if (key !== 'United States of America') {
                backgroundPaths[`__bg_${key}`] = value;
            }
        });

        if (language === 'en') {
            Object.keys(interactivePaths).forEach(key => {
                map[key] = key;
            });
        }

        return { statesPaths: interactivePaths, bgPaths: backgroundPaths, mapping: map };
    }, [language]);

    return (
        <CountryGameBase
            title={t.gamesPage.gameTitles.usaStatesMap}
            regionName={t.gamesPage.regions.usa}
            pathData={statesPaths}
            backgroundPaths={bgPaths}
            backgroundColors={Object.keys(bgPaths).reduce((acc, key) => ({
                ...acc,
                [key]: 'fill-slate-700/20 stroke-slate-500/30'
            }), {})}
            nameMapping={mapping}
            colorTheme="emerald"
            initialTime={180}
            initialZoom={1.85}
            taskId={taskId}
            initialPan={{ x: 170, y: -140 }}
            activityId={activityId || 'game'}
        />
    );
}
