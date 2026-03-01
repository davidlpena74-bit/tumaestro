
'use client';

import { useMemo } from 'react';
import CountryGameBase from '@/components/games/CountryGameBase';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { EUROPE_PATHS } from '@/components/games/data/europe-paths';
import { PATH_TO_SPANISH_NAME, PATH_TO_ENGLISH_NAME, EU_MEMBERS_LIST, EU_MEMBERS_LIST_EN } from '@/components/games/data/capitals-data';
import { useLanguage } from '@/context/LanguageContext';
import { useSearchParams } from 'next/navigation';

export default function PaisesUEClient() {
    const { t, language } = useLanguage();
    const searchParams = useSearchParams();
    const taskId = searchParams.get('taskId');

    const nameMapping = useMemo(() =>
        language === 'es' ? PATH_TO_SPANISH_NAME : PATH_TO_ENGLISH_NAME
        , [language]);

    const euMembers = useMemo(() =>
        language === 'es' ? EU_MEMBERS_LIST : EU_MEMBERS_LIST_EN
        , [language]);

    // Filter paths to include only EU members
    const euPaths = useMemo(() => {
        const filtered: Record<string, string> = {};
        Object.entries(EUROPE_PATHS).forEach(([engName, path]) => {
            const localizedName = nameMapping[engName];
            if (localizedName && euMembers.includes(localizedName)) {
                filtered[engName] = path;
            }
        });
        return filtered;
    }, [nameMapping, euMembers]);

    return (
        <PhysicalGameLayout
            title={t.gamesPage.gameTitles.euMap}
            description={t.gamesPage.gameTitles.euMapDesc}
            colorTheme="emerald"
            activityId="paises-ue"
        >
            <CountryGameBase
                title={t.gamesPage.gameTitles.euMap}
                description={t.gamesPage.gameTitles.euMapDesc}
                regionName={t.gamesPage.regions.eu}
                pathData={euPaths}
                nameMapping={nameMapping}
                colorTheme="emerald"
                initialTime={120}
                initialZoom={1.98}
                initialPan={{ x: 50, y: -170 }}
                taskId={taskId}
                activityId="paises-ue"
                backgroundPaths={EUROPE_PATHS}
            />
        </PhysicalGameLayout>
    );
}
