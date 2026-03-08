
'use client';

import { useMemo } from 'react';
import CapitalGame from '@/components/games/CapitalGame';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { EUROPE_PATHS } from '@/components/games/data/europe-paths';
import { PATH_TO_SPANISH_NAME, PATH_TO_ENGLISH_NAME, EU_MEMBERS_LIST, EU_MEMBERS_LIST_EN } from '@/components/games/data/capitals-data';
import { EUROPE_CAPITALS_COORDS } from '@/components/games/data/europe-capitals-coords';
import { useLanguage } from '@/context/LanguageContext';
import { useSearchParams } from 'next/navigation';
import EuropeIcelandInset from '@/components/games/EuropeIcelandInset';

export default function CapitalesUeClient() {
    const { t, language } = useLanguage();
    const searchParams = useSearchParams();
    const taskId = searchParams.get('taskId');

    const nameMapping = useMemo(() =>
        language === 'es' ? PATH_TO_SPANISH_NAME : PATH_TO_ENGLISH_NAME
        , [language]);

    const euMembers = useMemo(() =>
        language === 'es' ? EU_MEMBERS_LIST : EU_MEMBERS_LIST_EN
        , [language]);

    // Background styling to grey out non-EU countries
    const backgroundColors = useMemo(() => {
        const colors: Record<string, string> = {};
        Object.keys(EUROPE_PATHS).forEach(id => {
            const localizedName = nameMapping[id];
            const isEU = localizedName && euMembers.includes(localizedName);

            if (isEU) {
                colors[id] = "fill-[#f5edda] stroke-[#c8b89a]"; // Standard land
            } else {
                colors[id] = "fill-slate-800/20 stroke-slate-800/40"; // Greyscale context
            }
        });
        return colors;
    }, [nameMapping, euMembers]);

    return (
        <PhysicalGameLayout
            title={t.gamesPage.gameTitles.euCapitalsMap}
            description={t.gamesPage.gameTitles.euCapitalsMapDesc}
            colorTheme="emerald"
            activityId="capitales-ue"
        >
            <CapitalGame
                taskId={taskId}
                paths={EUROPE_PATHS}
                targetList={euMembers}
                centroids={EUROPE_CAPITALS_COORDS}
                backgroundColors={backgroundColors}
                title={t.gamesPage.gameTitles.euCapitalsMap}
                description={t.gamesPage.gameTitles.euCapitalsMapDesc}
                initialPan={{ x: 0, y: 0 }}
                initialZoom={1}
                activityId="capitales-ue"
                customSvgElements={<EuropeIcelandInset />}
            />
        </PhysicalGameLayout>
    );
}
