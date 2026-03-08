
'use client';

import CountryGameBase from './CountryGameBase';
import { CONTINENT_PATHS } from './data/continent-paths';
import { useLanguage } from '@/context/LanguageContext';
import { useMemo } from 'react';

const CONTINENT_MAPPING: Record<string, string> = {
    'Africa': 'África',
    'Asia': 'Asia',
    'Europe': 'Europa',
    'North America': 'América del Norte',
    'South America': 'América del Sur',
    'Oceania': 'Oceanía',
    'Antarctica': 'Antártida',
    'Greenland': 'Groenlandia'
};

export default function ContinentsMapGame({ taskId = null, activityId }: { taskId?: string | null, activityId?: string }) {
    const { t, language } = useLanguage();

    const mapping = useMemo(() => {
        if (language === 'en') {
            const enMapping: Record<string, string> = {};
            Object.keys(CONTINENT_MAPPING).forEach(key => {
                enMapping[key] = key;
            });
            return enMapping;
        }
        return CONTINENT_MAPPING;
    }, [language]);

    const bgLabels = [
        { id: 'atlantico', name: 'Océano Atlántico', x: 430, y: 340, fontSize: '10px' },
        { id: 'indico', name: 'Océano Índico', x: 680, y: 260, fontSize: '10px' },
        { id: 'pacifico-2', name: 'Océano Pacífico', x: 210, y: 300, fontSize: '10px' },
        { id: 'artico', name: 'Océano Glacial Ártico', x: 520, y: 10, fontSize: '10px' },
        { id: 'antartico', name: 'Océano Glacial Antártico', x: 460, y: 445, fontSize: '10px' },
    ];

    return (
        <CountryGameBase
            key={language}
            title="Continentes del Mundo"
            description="Identifica los siete continentes en el mapa mundial."
            regionName="Mundo"
            pathData={CONTINENT_PATHS}
            nameMapping={mapping}
            colorTheme="emerald"
            initialTime={120}
            initialZoom={1.0}
            initialPan={{ x: -80, y: 0 }}
            backgroundLabels={bgLabels}
            viewBox="0 0 800 460"
            taskId={taskId}
            activityId={activityId || 'game'}
        />
    );
}
