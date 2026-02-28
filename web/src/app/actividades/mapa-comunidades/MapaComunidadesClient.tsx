'use client';

import { useMemo } from 'react';
import PhysicalMapGame from '@/components/games/PhysicalMapGame';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { SPANISH_COMMUNITIES_PATHS } from '@/components/games/spanish-communities-paths';
import { SPAIN_NEIGHBORS_PATHS } from '@/components/games/data/spain-neighbors-paths';

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

    // Combine Spain communities + neighboring countries as one background object (for the sea hole)
    const backgroundPaths = useMemo(() => ({
        ...SPAIN_NEIGHBORS_PATHS,          // Portugal, France, Morocco, Andorra (rendered first = below)
        ...SPANISH_COMMUNITIES_PATHS,      // Spain regions on top
    }), []);

    // Sea and Ocean labels
    const seaLabels = useMemo(() => [
        { id: 'mar-cantabrico', name: 'Mar Cantábrico', x: 243, y: 20, className: 'fill-sky-800/40 italic font-medium', fontSize: '13px' },
        { id: 'mar-mediterraneo', name: 'Mar Mediterráneo', x: 580, y: 418, className: 'fill-sky-800/40 italic font-medium', fontSize: '13px' },
        { id: 'oceano-atlantico-1', name: 'Océano Atlántico', x: -128, y: 240, className: 'fill-sky-900/40 italic font-medium', fontSize: '13px' },
    ], []);


    // Canary Islands transformation
    const backgroundTransforms = {
        canarias: "translate(-220, 40)"
    };

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
                theme="light"
                insetFrame={{ x: -190, y: 510, width: 280, height: 180 }}
                viewBox="-140 0 840 700"
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
