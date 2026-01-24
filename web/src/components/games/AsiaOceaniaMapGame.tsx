'use client';

import CountryGameBase from './CountryGameBase';
import { ASIA_OCEANIA_PATHS } from './data/asia-oceania-paths';
import { ASIA_OCEANIA_MAPPING } from './data/country-translations';
import { useLanguage } from '@/context/LanguageContext';

export default function AsiaOceaniaMapGame() {
    const { t } = useLanguage();
    return (
        <CountryGameBase
            title="Mapa de Asia y Oceanía"
            regionName="Asia y Oceanía"
            pathData={ASIA_OCEANIA_PATHS}
            nameMapping={ASIA_OCEANIA_MAPPING}
            colorTheme="emerald"
            initialTime={240} // More countries, more time
        />
    );
}
