'use client';

import { useMemo } from 'react';
import PhysicalMapGame from '@/components/games/PhysicalMapGame';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { SPANISH_COMMUNITIES_PATHS } from '@/components/games/data/spain-communities-paths-unified';
import { CONTEXT_PATHS } from '@/components/games/data/map-context-unified';

import { useLanguage } from '@/context/LanguageContext';
import { useSearchParams } from 'next/navigation';

export default function MapaComunidadesClient() {
    const { t } = useLanguage();
    const searchParams = useSearchParams();
    const taskId = searchParams.get('taskId');

    // Prepare Items (Communities) for the interactive layer
    const communityItems = useMemo(() => {
        const items: Record<string, string> = {};
        Object.entries(SPANISH_COMMUNITIES_PATHS).forEach(([id, paths]) => {
            // Join paths for regions with multiple parts (islands)
            const combinedPath = Array.isArray(paths) ? paths.join(' ') : paths;
            items[id] = combinedPath;
        });
        return items;
    }, []);

    // Spain communities and context countries as background
    const backgroundPaths = useMemo(() => ({
        ...SPANISH_COMMUNITIES_PATHS,      // Spain regions
        portugal: CONTEXT_PATHS.portugal,  // Portugal context
        france: CONTEXT_PATHS.france,      // France context
        andorra: CONTEXT_PATHS.andorra,    // Andorra context
        morocco: CONTEXT_PATHS.morocco,    // Morocco context
        algeria: CONTEXT_PATHS.algeria,    // Algeria context (Morocco neighbor)
    }), []);

    // Sea and Ocean labels
    const seaLabels = useMemo(() => [
        { id: 'mar-cantabrico', name: 'Mar Cantábrico', x: 265, y: 0, className: 'fill-sky-800/40 italic font-medium', fontSize: '13px' },
        { id: 'mar-mediterraneo', name: 'Mar Mediterráneo', x: 530, y: 466, className: 'fill-sky-800/40 italic font-medium', fontSize: '13px' },
        { id: 'oceano-atlantico-1', name: 'Océano Atlántico', x: -92, y: 264, className: 'fill-sky-900/40 italic font-medium', fontSize: '13px' },
    ], []);


    // Canary Islands transformation
    const backgroundTransforms = useMemo(() => ({
        canarias: 'translate(217.5, -88) scale(0.65)'
    }), []);

    const insetFrame = useMemo(() => ({
        x: -100,
        y: 500,
        width: 192,
        height: 120
    }), []);

    return (
        <PhysicalGameLayout
            title={t.gamesPage.gameTitles.region}
            description={t.gamesPage.gameTitles.regionDesc}
            colorTheme="emerald"
            activityId="mapa-comunidades"
        >
            <PhysicalMapGame
                title={t.gamesPage.gameTitles.region}
                description={t.gamesPage.gameTitles.regionDesc}
                items={communityItems}
                itemType="region"
                backgroundPaths={backgroundPaths}
                backgroundLabels={seaLabels}
                backgroundTransforms={backgroundTransforms}
                insetFrame={insetFrame}
                theme="light"
                viewBox="-92 -41 675 675"
                colorTheme="emerald"
                taskId={taskId}
                activityId="mapa-comunidades"
                elevationHeight={12}
                region={t.gamesPage.regions.spain}
                gameType={t.gamesPage.gameTypes.map}
            />
        </PhysicalGameLayout>
    );
}
