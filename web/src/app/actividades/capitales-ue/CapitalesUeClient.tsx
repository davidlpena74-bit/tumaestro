
'use client';

import { useMemo } from 'react';
import CapitalGame from '@/components/games/CapitalGame';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { EUROPE_PATHS } from '@/components/games/data/europe-paths';
import { PATH_TO_SPANISH_NAME, PATH_TO_ENGLISH_NAME, EU_MEMBERS_LIST, EU_MEMBERS_LIST_EN } from '@/components/games/data/capitals-data';
import { calculatePathCentroid } from '@/lib/svg-utils';
import { useLanguage } from '@/context/LanguageContext';
import { useSearchParams } from 'next/navigation';
import EuropeIcelandInset from '@/components/games/EuropeIcelandInset';

/**
 * Manual overrides for capital coordinates in the current Miller projection.
 */
const CAPITAL_OVERRIDES: Record<string, { x: number, y: number }> = {
    "Sweden": { x: 495.6, y: 113.7 },         // Stockholm
    "Finland": { x: 599.9, y: 94.8 },         // Helsinki
    "Denmark": { x: 412.3, y: 193.6 },        // Copenhagen
    "Spain": { x: 165.8, y: 490.2 },          // Madrid
    "Italy": { x: 411.2, y: 463.3 },          // Rome
    "Greece": { x: 436.4, y: 505.2 }          // Athens
};

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

    // Calculate centroids dynamically for EU members
    const euCapitalsCoords = useMemo(() => {
        const result: Record<string, { x: number, y: number }> = {};
        Object.entries(EUROPE_PATHS).forEach(([engName, path]) => {
            const localizedName = nameMapping[engName];
            if (localizedName && euMembers.includes(localizedName)) {
                if (CAPITAL_OVERRIDES[engName]) {
                    result[engName] = CAPITAL_OVERRIDES[engName];
                } else {
                    const primaryPath = Array.isArray(path) ? path[0] : path;
                    const centroid = calculatePathCentroid(primaryPath);
                    if (centroid) {
                        result[engName] = centroid;
                    }
                }
            }
        });
        return result;
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
                centroids={euCapitalsCoords}
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
