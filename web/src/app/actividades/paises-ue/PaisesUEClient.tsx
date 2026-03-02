
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

    // Add manual labels for Oceans
    const oceanLabels = useMemo(() => [
        {
            id: 'atlantic',
            name: language === 'es' ? 'OCÉANO ATLÁNTICO' : 'ATLANTIC OCEAN',
            x: 200,
            y: 450,
            className: "fill-slate-500/40",
            fontSize: "5px"
        },
        {
            id: 'arctic',
            name: language === 'es' ? 'OCÉANO ÁRTICO' : 'ARCTIC OCEAN',
            x: 400,
            y: 50,
            className: "fill-slate-500/40",
            fontSize: "5px"
        }
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
                backgroundColors={backgroundColors}
                backgroundLabels={oceanLabels}
            />
        </PhysicalGameLayout>
    );
}
