'use client';

import CountryGameBase from './CountryGameBase';
import { EUROPE_PATHS } from './data/europe-paths';
import { EUROPE_MAPPING } from './data/country-translations'; // I'll add Europe to translations too
import { useLanguage } from '@/context/LanguageContext';

export default function EuropeGame() {
    const { t } = useLanguage();
    return (
        <CountryGameBase
            title="Mapa de Europa"
            regionName="Europa"
            pathData={EUROPE_PATHS}
            nameMapping={EUROPE_MAPPING}
            colorTheme="emerald"
            initialTime={180}
            initialZoom={1.5}
            initialPan={{ x: 200, y: 0 }}
        />
    );
}
