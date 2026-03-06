'use client';

import { useMemo } from 'react';
import CountryGameBase from './CountryGameBase';
import { EUROPE_PATHS } from './data/europe-paths';
import { EUROPE_MAPPING } from './data/country-translations';
import { PATH_TO_SPANISH_NAME, PATH_TO_ENGLISH_NAME } from './data/capitals-data';
import { useLanguage } from '@/context/LanguageContext';
import EuropeIcelandInset from './EuropeIcelandInset';

export default function EuropeGame({ taskId = null, activityId }: { taskId?: string | null, activityId?: string }) {
    const { language, t } = useLanguage();

    const mapping = useMemo(() =>
        language === 'es' ? PATH_TO_SPANISH_NAME : PATH_TO_ENGLISH_NAME,
        [language]);

    const backgroundLabels = useMemo(() => [
        { id: 'atlantic', name: language === 'es' ? 'OCÉANO ATLÁNTICO' : 'ATLANTIC OCEAN', x: 80, y: 400, className: "fill-slate-500/30", fontSize: "10px" },
        { id: 'arctic', name: language === 'es' ? 'OCÉANO ÁRTICO' : 'ARCTIC OCEAN', x: 450, y: 70, className: "fill-slate-500/30", fontSize: "10px" },
        { id: 'mediterranean', name: language === 'es' ? 'MAR MEDITERRÁNEO' : 'MEDITERRANEAN SEA', x: 450, y: 530, className: "fill-slate-500/20 italic", fontSize: "8px" },
        { id: 'black-sea', name: language === 'es' ? 'MAR NEGRO' : 'BLACK SEA', x: 720, y: 425, className: "fill-slate-500/20 italic", fontSize: "7px" }
    ], [language]);

    const backgroundColors = useMemo(() => {
        const colors: Record<string, string> = {};
        const contextCountries = ["Morocco", "Algeria", "Tunisia", "Libya", "Egypt", "Israel", "Lebanon", "Syria", "Jordan", "Iraq", "Iran", "Turkmenistan", "Uzbekistan", "Kazakhstan"];
        Object.keys(EUROPE_PATHS).forEach(id => {
            if (contextCountries.includes(id)) {
                colors[id] = "fill-slate-800/30 stroke-slate-800/50";
            } else {
                colors[id] = "fill-[#f5edda] stroke-[#c8b89a]";
            }
        });
        return colors;
    }, []);

    return (
        <CountryGameBase
            key={language}
            title={t.gamesPage.gameTitles.europeMap}
            description={t.gamesPage.gameTitles.europeMapDesc}
            regionName={t.gamesPage.regions.europe}
            pathData={EUROPE_PATHS}
            nameMapping={mapping}
            colorTheme="emerald"
            initialTime={180}
            elevationHeight={6}
            backgroundLabels={backgroundLabels}
            backgroundPaths={EUROPE_PATHS}
            backgroundColors={backgroundColors}
            taskId={taskId}
            activityId={activityId || 'game'}
            customSvgElements={<EuropeIcelandInset />}
        />
    );
}
