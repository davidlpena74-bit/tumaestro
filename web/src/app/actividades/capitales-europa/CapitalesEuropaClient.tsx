
'use client';

import { useMemo } from 'react';
import CapitalGame from '@/components/games/CapitalGame';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { EUROPE_PATHS } from '@/components/games/data/europe-paths';
import { calculatePathCentroid } from '@/lib/svg-utils';
import { useLanguage } from '@/context/LanguageContext';
import { useSearchParams } from 'next/navigation';
import EuropeIcelandInset from '@/components/games/EuropeIcelandInset';

import { EUROPE_CAPITALS_COORDS } from '@/components/games/data/europe-capitals-coords';

export default function CapitalesEuropaClient() {
    const { t } = useLanguage();
    const searchParams = useSearchParams();
    const taskId = searchParams.get('taskId');

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
                centroids={EUROPE_CAPITALS_COORDS}
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
