'use client';

import { useMemo } from 'react';
import PhysicalMapGame from '@/components/games/PhysicalMapGame';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { SPANISH_MOUNTAINS_DATA } from '@/components/games/data/spanish-mountains-detailed';
import { CONTEXT_PATHS } from '@/components/games/data/map-context-unified';
import { SPAIN_PROVINCES_PATHS_UNIFIED } from '@/components/games/data/spain-provinces-paths-unified';
import { SPANISH_COMMUNITIES_PATHS, REGION_DISPLAY_NAMES } from '@/components/games/data/spain-communities-paths-unified';
import { calculatePathCentroid } from '@/lib/svg-utils';
import { useLanguage } from '@/context/LanguageContext';
import { useSearchParams } from 'next/navigation';

export default function MontanasEspanaClient() {
    const { t } = useLanguage();
    const searchParams = useSearchParams();
    const taskId = searchParams.get('taskId');

    // Memoize region labels (as background)
    const regionLabels = useMemo(() => {
        return Object.entries(SPANISH_COMMUNITIES_PATHS).map(([id, paths]) => {
            if (id === 'ceuta') return { id, name: 'Ceuta', x: 232, y: 535 };
            if (id === 'melilla') return { id, name: 'Melilla', x: 281, y: 576 };

            const primaryPath = Array.isArray(paths) ? paths[0] : paths;
            const centroid = calculatePathCentroid(primaryPath);
            return {
                id,
                name: REGION_DISPLAY_NAMES[id] || id,
                ...(centroid || { x: 0, y: 0 })
            };
        }).filter(l => l.x !== 0) as { id: string; name: string; x: number; y: number }[];
    }, []);

    // Fondo: Vecinos y provincias individuales usando projección unificada
    const backgroundPaths = useMemo(() => {
        return {
            ...CONTEXT_PATHS,
            ...SPAIN_PROVINCES_PATHS_UNIFIED
        };
    }, []);

    // Sea and Ocean labels
    const environmentalLabels = useMemo(() => [
        { id: 'mar-cantabrico', name: 'MAR CANTÁBRICO', x: 265, y: 0, className: 'fill-sky-800/40', fontSize: '13px' },
        { id: 'mar-mediterraneo', name: 'MAR MEDITERRÁNEO', x: 530, y: 466, className: 'fill-sky-800/40', fontSize: '13px' },
        { id: 'oceano-atlantico-1', name: 'OCÉANO ATLÁNTICO', x: -92, y: 264, className: 'fill-sky-900/40', fontSize: '13px' },
    ], []);

    const combinedLabels = useMemo(() => [...regionLabels, ...environmentalLabels], [regionLabels, environmentalLabels]);

    const backgroundTransforms = useMemo(() => ({
        santacruz: 'translate(217.5, -88) scale(0.65)',
        laspalmas: 'translate(217.5, -88) scale(0.65)'
    }), []);

    const insetFrame = useMemo(() => ({
        x: -85,
        y: 500,
        width: 165,
        height: 120
    }), []);

    return (
        <PhysicalGameLayout
            title={t.gamesPage.gameTitles.mountainsSpain}
            description={t.gamesPage.gameTitles.mountainsSpainDesc}
            colorTheme="teal"
            activityId="montanas-espana"
        >
            <PhysicalMapGame
                title={t.gamesPage.gameTitles.mountainsSpain}
                description={t.gamesPage.gameTitles.mountainsSpainDesc}
                items={SPANISH_MOUNTAINS_DATA}
                itemType="polygon"
                backgroundPaths={backgroundPaths}
                backgroundLabels={combinedLabels}
                backgroundTransforms={backgroundTransforms}
                theme="light"
                insetFrame={insetFrame}
                viewBox="-92 -41 675 675"
                colorTheme="teal"
                taskId={taskId}
                activityId="montanas-espana"
                elevationHeight={12}
                baseLabelSize={8}
                region={t.gamesPage.regions.spain}
                gameType={t.gamesPage.gameTypes.map}
            />
        </PhysicalGameLayout>
    );
}
