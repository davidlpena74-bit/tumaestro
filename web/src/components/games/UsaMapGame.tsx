'use client';

import CountryGameBase from './CountryGameBase';
import { USA_STATES_PATHS } from './data/usa-states-paths';
import { USA_STATES_MAPPING } from './data/country-translations';
import { useLanguage } from '@/context/LanguageContext';

export default function UsaMapGame({ taskId = null }: { taskId?: string | null }) {
    const { t } = useLanguage();
    return (
        <CountryGameBase
            title={t.gamesPage.gameTitles.usaStatesMap}
            regionName={t.gamesPage.regions.usa}
            pathData={USA_STATES_PATHS}
            nameMapping={USA_STATES_MAPPING}
            colorTheme="emerald"
            initialTime={180}
            initialZoom={2}
            taskId={taskId}
            initialPan={{ x: 0, y: 0 }}
        />
    );
}
