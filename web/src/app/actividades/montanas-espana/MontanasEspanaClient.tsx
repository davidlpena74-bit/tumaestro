'use client';

import { useMemo } from 'react';
import PhysicalMapGame from '@/components/games/PhysicalMapGame';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { SPANISH_MOUNTAINS_DATA } from '@/components/games/data/spanish-mountains-detailed';
import { CONTEXT_PATHS } from '@/components/games/data/map-context-unified';
import { SPAIN_PROVINCES_PATHS_UNIFIED } from '@/components/games/data/spain-provinces-paths-unified';
import { PROVINCE_NAMES } from '@/components/games/data/spain-provinces-names';
import { calculatePathCentroid } from '@/lib/svg-utils';
import { useLanguage } from '@/context/LanguageContext';
import { useSearchParams } from 'next/navigation';

export default function MontanasEspanaClient() {
    const { t } = useLanguage();
    const searchParams = useSearchParams();
    const taskId = searchParams.get('taskId');

    // Memoize region labels (as background)
    const regionLabels = useMemo(() => {
        return Object.entries(SPAIN_PROVINCES_PATHS_UNIFIED).map(([id, paths]) => {
            if (id === 'ceuta') return { id, name: 'Ceuta', x: 212, y: 558, className: 'fill-slate-500/50 italic font-medium', fontSize: '8px' };
            if (id === 'melilla') return { id, name: 'Melilla', x: 310, y: 578, className: 'fill-slate-500/50 italic font-medium', fontSize: '8px' };
            if (id === 'santacruz') return { id: 'label-santacruz', name: 'S.C. Tenerife', x: -50, y: 575, className: 'fill-slate-500/50 italic font-medium', fontSize: '8px' };
            if (id === 'laspalmas') return { id: 'label-laspalmas', name: PROVINCE_NAMES[id as keyof typeof PROVINCE_NAMES] || 'Las Palmas', x: 35, y: 555, className: 'fill-slate-500/50 italic font-medium', fontSize: '8px' };

            const primaryPath = Array.isArray(paths) ? paths[0] : paths;
            const centroid = calculatePathCentroid(primaryPath);
            return {
                id,
                name: PROVINCE_NAMES[id as keyof typeof PROVINCE_NAMES] || id,
                className: 'fill-slate-500/50 italic font-medium',
                fontSize: '8px',
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

    // Colors per Autonomous Community to differentiate provinces in the background
    const provinceColors = useMemo(() => ({
        // Andalucía (Green)
        almeria: 'fill-[#dcfce7] stroke-[#bbf7d0]', cadiz: 'fill-[#dcfce7] stroke-[#bbf7d0]', cordoba: 'fill-[#dcfce7] stroke-[#bbf7d0]', granada: 'fill-[#dcfce7] stroke-[#bbf7d0]', huelva: 'fill-[#dcfce7] stroke-[#bbf7d0]', jaen: 'fill-[#dcfce7] stroke-[#bbf7d0]', malaga: 'fill-[#dcfce7] stroke-[#bbf7d0]', sevilla: 'fill-[#dcfce7] stroke-[#bbf7d0]',
        // Aragón (Red)
        huesca: 'fill-[#fee2e2] stroke-[#fecaca]', teruel: 'fill-[#fee2e2] stroke-[#fecaca]', zaragoza: 'fill-[#fee2e2] stroke-[#fecaca]',
        // Asturias (Blue)
        asturias: 'fill-[#dbeafe] stroke-[#bfdbfe]',
        // Baleares (Yellow)
        baleares: 'fill-[#fef3c7] stroke-[#fde68a]',
        // Canarias (Orange)
        santacruz: 'fill-[#ffedd5] stroke-[#fed7aa]', laspalmas: 'fill-[#ffedd5] stroke-[#fed7aa]',
        // Cantabria (Pink)
        cantabria: 'fill-[#fce7f3] stroke-[#fbcfe8]',
        // Castilla-La Mancha (Purple)
        albacete: 'fill-[#f3e8ff] stroke-[#e9d5ff]', ciudadreal: 'fill-[#f3e8ff] stroke-[#e9d5ff]', cuenca: 'fill-[#f3e8ff] stroke-[#e9d5ff]', guadalajara: 'fill-[#f3e8ff] stroke-[#e9d5ff]', toledo: 'fill-[#f3e8ff] stroke-[#e9d5ff]',
        // Castilla y León (Indigo)
        avila: 'fill-[#e0e7ff] stroke-[#c7d2fe]', burgos: 'fill-[#e0e7ff] stroke-[#c7d2fe]', leon: 'fill-[#e0e7ff] stroke-[#c7d2fe]', palencia: 'fill-[#e0e7ff] stroke-[#c7d2fe]', salamanca: 'fill-[#e0e7ff] stroke-[#c7d2fe]', segovia: 'fill-[#e0e7ff] stroke-[#c7d2fe]', soria: 'fill-[#e0e7ff] stroke-[#c7d2fe]', valladolid: 'fill-[#e0e7ff] stroke-[#c7d2fe]', zamora: 'fill-[#e0e7ff] stroke-[#c7d2fe]',
        // Cataluña (Rose)
        barcelona: 'fill-[#ffe4e6] stroke-[#fecdd3]', girona: 'fill-[#ffe4e6] stroke-[#fecdd3]', lleida: 'fill-[#ffe4e6] stroke-[#fecdd3]', tarragona: 'fill-[#ffe4e6] stroke-[#fecdd3]',
        // Comunidad Valenciana (Teal)
        alicante: 'fill-[#ccfbf1] stroke-[#99f6e4]', castellon: 'fill-[#ccfbf1] stroke-[#99f6e4]', valencia: 'fill-[#ccfbf1] stroke-[#99f6e4]',
        // Extremadura (Emerald)
        badajoz: 'fill-[#ecfdf5] stroke-[#d1fae5]', caceres: 'fill-[#ecfdf5] stroke-[#d1fae5]',
        // Galicia (Sky)
        coruna: 'fill-[#e0f2fe] stroke-[#bae6fd]', lugo: 'fill-[#e0f2fe] stroke-[#bae6fd]', ourense: 'fill-[#e0f2fe] stroke-[#bae6fd]', pontevedra: 'fill-[#e0f2fe] stroke-[#bae6fd]', acoruna: 'fill-[#e0f2fe] stroke-[#bae6fd]',
        // Madrid (Slate)
        madrid: 'fill-[#e2e8f0] stroke-[#cbd5e1]',
        // Murcia (Orange-soft)
        murcia: 'fill-[#fff7ed] stroke-[#ffedd5]',
        // Navarra (Blue-soft)
        navarra: 'fill-[#eff6ff] stroke-[#dbeafe]',
        // País Vasco (Green-soft)
        alava: 'fill-[#dcfce7] stroke-[#bbf7d0]', gipuzkoa: 'fill-[#dcfce7] stroke-[#bbf7d0]', bizkaia: 'fill-[#dcfce7] stroke-[#bbf7d0]',
        // La Rioja (Violet)
        larioja: 'fill-[#f5f3ff] stroke-[#ede9fe]',
        // Ceuta y Melilla
        ceuta: 'fill-[#f8fafc] stroke-[#f1f5f9]', melilla: 'fill-[#f8fafc] stroke-[#f1f5f9]'
    }), []);

    // Sea and Ocean labels
    const environmentalLabels = useMemo(() => [
        { id: 'mar-cantabrico', name: 'Mar Cantábrico', x: 265, y: 0, className: 'fill-sky-800/40 italic font-medium', fontSize: '13px' },
        { id: 'mar-mediterraneo', name: 'Mar Mediterráneo', x: 530, y: 466, className: 'fill-sky-800/40 italic font-medium', fontSize: '13px' },
        { id: 'oceano-atlantico-1', name: 'Océano Atlántico', x: -92, y: 264, className: 'fill-sky-900/40 italic font-medium', fontSize: '13px' },
    ], []);

    const combinedLabels = useMemo(() => [...regionLabels, ...environmentalLabels], [regionLabels, environmentalLabels]);

    const backgroundTransforms = useMemo(() => ({
        santacruz: 'translate(217.5, -88) scale(0.65)',
        laspalmas: 'translate(217.5, -88) scale(0.65)'
    }), []);

    const insetFrame = useMemo(() => ({
        x: -100,
        y: 500,
        width: 192,
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
                itemType="mountain"
                backgroundPaths={backgroundPaths}
                backgroundLabels={combinedLabels}
                backgroundTransforms={backgroundTransforms}
                backgroundColors={provinceColors}
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
