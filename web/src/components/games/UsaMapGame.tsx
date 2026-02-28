'use client';

import CountryGameBase from './CountryGameBase';
import { USA_STATES_PATHS } from './data/usa-states-paths';
import { USA_STATES_MAPPING } from './data/country-translations';
import { useLanguage } from '@/context/LanguageContext';
import { useMemo } from 'react';

export default function UsaMapGame({ taskId = null, activityId }: { taskId?: string | null, activityId?: string }) {
    const { t, language } = useLanguage();
    const mapping = useMemo(() => {
        if (language === 'en') {
            const enMapping: Record<string, string> = {};
            Object.keys(USA_STATES_MAPPING).forEach(key => {
                enMapping[key] = key;
            });
            return enMapping;
        }
        return USA_STATES_MAPPING;
    }, [language]);

    const seaLabels = useMemo(() => [
        { id: 'atlantico', name: 'Océano Atlántico', x: 680, y: 300, fontSize: '8px' },
        { id: 'pacifico', name: 'Océano Pacífico', x: 100, y: 350, fontSize: '8px' },
        { id: 'mexico', name: 'Golfo de México', x: 450, y: 550, fontSize: '7px' }
    ], []);
    return (
        <CountryGameBase
            title={t.gamesPage.gameTitles.usaStatesMap}
            regionName={t.gamesPage.regions.usa}
            pathData={USA_STATES_PATHS}
            nameMapping={mapping}
            colorTheme="emerald"
            initialTime={180}
            initialZoom={2.4}
            taskId={taskId}
            initialPan={{ x: 50, y: 0 }}
            backgroundLabels={seaLabels}
            activityId={activityId || 'game'}
        />
    );
}
