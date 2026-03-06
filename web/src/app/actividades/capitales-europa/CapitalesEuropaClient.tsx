
'use client';

import { useMemo } from 'react';
import CapitalGame from '@/components/games/CapitalGame';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { EUROPE_PATHS } from '@/components/games/data/europe-paths';
import { calculatePathCentroid } from '@/lib/svg-utils';
import { useLanguage } from '@/context/LanguageContext';
import { useSearchParams } from 'next/navigation';
import EuropeIcelandInset from '@/components/games/EuropeIcelandInset';

/**
 * Manual overrides for capital coordinates in the current Miller projection.
 * Calculated based on exact lat/lon for city locations.
 */
const CAPITAL_OVERRIDES: Record<string, { x: number, y: number }> = {
    "Norway": { x: 384.8, y: 100.7 },         // Oslo
    "Russia": { x: 792.0, y: 191.9 },         // Moscow
    "United Kingdom": { x: 220.1, y: 279.9 }, // London
    "Sweden": { x: 495.6, y: 113.7 },         // Stockholm
    "Finland": { x: 599.9, y: 94.8 },         // Helsinki
    "Denmark": { x: 412.3, y: 193.6 },        // Copenhagen
    "Spain": { x: 165.8, y: 490.2 },          // Madrid
    "Italy": { x: 411.2, y: 463.3 },          // Rome
    "Greece": { x: 436.4, y: 505.2 }          // Athens
};

export default function CapitalesEuropaClient() {
    const { t } = useLanguage();
    const searchParams = useSearchParams();
    const taskId = searchParams.get('taskId');

    const centroids = useMemo(() => {
        const result: Record<string, { x: number, y: number }> = {};

        Object.entries(EUROPE_PATHS).forEach(([id, paths]) => {
            // Apply override if exists, otherwise calculate centroid
            if (CAPITAL_OVERRIDES[id]) {
                result[id] = CAPITAL_OVERRIDES[id];
            } else {
                const primaryPath = Array.isArray(paths) ? paths[0] : paths;
                const centroid = calculatePathCentroid(primaryPath);
                if (centroid) {
                    result[id] = centroid;
                }
            }
        });

        return result;
    }, []);

    return (
        <PhysicalGameLayout
            title={t.gamesPage.gameTitles.europeCapitalsMap}
            description={t.gamesPage.gameTitles.europeCapitalsMapDesc}
            colorTheme="emerald"
            activityId="capitales-europa"
        >
            <CapitalGame
                taskId={taskId}
                paths={EUROPE_PATHS}
                centroids={centroids}
                title={t.gamesPage.gameTitles.europeCapitalsMap}
                description={t.gamesPage.gameTitles.europeCapitalsMapDesc}
                initialPan={{ x: 0, y: 0 }}
                initialZoom={1}
                activityId="capitales-europa"
                customSvgElements={<EuropeIcelandInset />}
            />
        </PhysicalGameLayout>
    );
}
