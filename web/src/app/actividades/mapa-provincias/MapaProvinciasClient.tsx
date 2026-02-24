'use client';

import { useMemo } from 'react';
import PhysicalMapGame from '@/components/games/PhysicalMapGame';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { SPANISH_PROVINCES_PATHS, PROVINCE_NAMES } from '@/components/games/spanish-provinces';
import { SPAIN_PROVINCES_NEIGHBORS_PATHS } from '@/components/games/data/spain-neighbors-provinces-paths';
import { calculatePathCentroid } from '@/lib/svg-utils';
import { useLanguage } from '@/context/LanguageContext';
import { useSearchParams } from 'next/navigation';

import { SPAIN_PROVINCES_PATHS_UNIFIED } from '@/components/games/data/spain-provinces-paths-unified';

export default function MapaProvinciasClient() {
    const { t, language } = useLanguage();
    const searchParams = useSearchParams();
    const taskId = searchParams.get('taskId');

    // Capa interactiva: Todas las provincias unificadas
    const provinceItems = useMemo(() => {
        return SPAIN_PROVINCES_PATHS_UNIFIED;
    }, []);

    // Fondo: Bloque unificado (Contorno + Vecinos + Provincias)
    const backgroundPaths = useMemo(() => ({
        ...SPAIN_PROVINCES_NEIGHBORS_PATHS,
        ...SPAIN_PROVINCES_PATHS_UNIFIED,
    }), []);

    // Etiquetas para todas las provincias
    const provinceLabels = useMemo(() => {
        return Object.entries(SPAIN_PROVINCES_PATHS_UNIFIED).map(([id, path]) => {
            // Casos especiales para Ceuta y Melilla (calibrados para el motor D3)
            if (id === 'ceuta') return { id, name: 'Ceuta', x: 194, y: 539 };
            if (id === 'melilla') return { id, name: 'Melilla', x: 313, y: 578 };

            const centroid = calculatePathCentroid(path);
            return {
                id,
                name: PROVINCE_NAMES[id] || id,
                ...(centroid || { x: 0, y: 0 })
            };
        }).filter(l => l.x !== 0) as { id: string; name: string; x: number; y: number }[];
    }, []);

    const backgroundTransforms = {
        // Canarias → inset box inferior izquierdo
        // Ajuste manual: +80 X (derecha) desde el estado anterior
        santacruz: "translate(260, -400)",
        laspalmas: "translate(260, -400)",
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
                insetFrame={{ x: -260, y: 490, width: 350, height: 180 }}
                viewBox="-270 0 970 700"
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
