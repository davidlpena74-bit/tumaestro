'use client';

import { useMemo } from 'react';
import PhysicalMapGame from '@/components/games/PhysicalMapGame';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { SPANISH_PROVINCES_PATHS, PROVINCE_NAMES } from '@/components/games/spanish-provinces';
import { SPAIN_NEIGHBORS_PATHS } from '@/components/games/data/spain-neighbors-paths';
import { calculatePathCentroid } from '@/lib/svg-utils';
import { useLanguage } from '@/context/LanguageContext';
import { useSearchParams } from 'next/navigation';

export default function MapaProvinciasClient() {
    const { t, language } = useLanguage();
    const searchParams = useSearchParams();
    const taskId = searchParams.get('taskId');

    // Prepare Items (Provinces) for the interactive layer
    const provinceItems = useMemo(() => {
        const items: Record<string, string> = {};
        Object.entries(SPANISH_PROVINCES_PATHS).forEach(([id, paths]) => {
            items[id] = Array.isArray(paths) ? paths.join(' ') : paths;
        });
        return items;
    }, []);

    // Combine Provinces + neighboring countries for the sea hole background
    const backgroundPaths = useMemo(() => ({
        ...SPAIN_NEIGHBORS_PATHS,
        ...SPANISH_PROVINCES_PATHS,
    }), []);

    // Memoize province labels
    const provinceLabels = useMemo(() => {
        return Object.entries(SPANISH_PROVINCES_PATHS).map(([id, paths]) => {
            // Special cases for manual positioning if needed
            if (id === 'ceuta') return { id, name: 'Ceuta', x: 232, y: 535 };
            if (id === 'melilla') return { id, name: 'Melilla', x: 281, y: 576 };

            const primaryPath = Array.isArray(paths) ? paths[0] : paths;
            const centroid = calculatePathCentroid(primaryPath);

            // For provinces, we'll only show names if clearly identified to avoid chaos
            return {
                id,
                name: PROVINCE_NAMES[id] || id,
                ...(centroid || { x: 0, y: 0 })
            };
        }).filter(l => l.x !== 0) as { id: string; name: string; x: number; y: number }[];
    }, []);

    // Canary Islands transformation
    const backgroundTransforms = {
        santacruz: "translate(-220, 20)",
        laspalmas: "translate(-220, 20)"
    };

    return (
        <PhysicalGameLayout
            title={t.gamesPage.gameTitles.provinces}
            description={t.gamesPage.gameTitles.provincesDesc}
            colorTheme="teal"
            activityId="mapa-provincias"
        >
            <PhysicalMapGame
                title={t.gamesPage.gameTitles.provinces}
                description={t.gamesPage.gameTitles.provincesDesc}
                items={provinceItems}
                itemType="region"
                backgroundPaths={backgroundPaths}
                backgroundLabels={provinceLabels}
                backgroundTransforms={backgroundTransforms}
                nameMapping={PROVINCE_NAMES}
                theme="light"
                insetFrame={{ x: -190, y: 490, width: 280, height: 180 }}
                viewBox="-140 0 840 700"
                colorTheme="teal"
                taskId={taskId}
                activityId="mapa-provincias"
                elevationHeight={10}
                region={t.gamesPage.regions.spain}
                gameType={t.gamesPage.gameTypes.map}
            />
        </PhysicalGameLayout>
    );
}
