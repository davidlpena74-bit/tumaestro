
'use client';

import { useMemo } from 'react';
import CountryGameBase from '@/components/games/CountryGameBase';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { EUROPE_PATHS } from '@/components/games/data/europe-paths';
import { PATH_TO_SPANISH_NAME, PATH_TO_ENGLISH_NAME, EU_MEMBERS_LIST, EU_MEMBERS_LIST_EN } from '@/components/games/data/capitals-data';
import { useLanguage } from '@/context/LanguageContext';
import { useSearchParams } from 'next/navigation';
import EuropeIcelandInset from '@/components/games/EuropeIcelandInset';

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
    const backgroundLabels = useMemo(() => [
        { id: 'atlantic', name: language === 'es' ? 'OCÉANO ATLÁNTICO' : 'ATLANTIC OCEAN', x: 80, y: 400, className: "fill-slate-500/30", fontSize: "10px" },
        { id: 'arctic', name: language === 'es' ? 'OCÉANO ÁRTICO' : 'ARCTIC OCEAN', x: 450, y: 70, className: "fill-slate-500/30", fontSize: "10px" },
        { id: 'mediterranean', name: language === 'es' ? 'MAR MEDITERRÁNEO' : 'MEDITERRANEAN SEA', x: 450, y: 530, className: "fill-slate-500/20 italic", fontSize: "8px" },
        { id: 'black-sea', name: language === 'es' ? 'MAR NEGRO' : 'BLACK SEA', x: 720, y: 425, className: "fill-slate-500/20 italic", fontSize: "7px" }
    ], [language]);

    const backgroundColors = useMemo(() => {
        const colors: Record<string, string> = {};
        Object.keys(EUROPE_PATHS).forEach(id => {
            const localizedName = nameMapping[id];
            const isEU = localizedName && euMembers.includes(localizedName);

            if (isEU) {
                colors[id] = "fill-[#f5edda] stroke-[#c8b89a]"; // Standard land color for EU members
            } else {
                colors[id] = "fill-slate-800/20 stroke-slate-800/40"; // Greyscale for context (non-EU)
            }
        });
        return colors;
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
                initialZoom={1}
                initialPan={{ x: 0, y: 0 }}
                taskId={taskId}
                activityId="paises-ue"
                backgroundPaths={EUROPE_PATHS}
                backgroundColors={backgroundColors}
                backgroundLabels={backgroundLabels}
                customSvgElements={<EuropeIcelandInset />}
            />
        </PhysicalGameLayout>
    );
}
