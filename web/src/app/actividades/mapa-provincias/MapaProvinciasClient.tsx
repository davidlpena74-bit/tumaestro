'use client';

import { useMemo } from 'react';
import PhysicalMapGame from '@/components/games/PhysicalMapGame';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { PROVINCE_NAMES } from '@/components/games/data/spain-provinces-names';
import { SPAIN_PROVINCES_NEIGHBORS_PATHS } from '@/components/games/data/spain-neighbors-provinces-paths';
import { useLanguage } from '@/context/LanguageContext';
import { useSearchParams } from 'next/navigation';

import { SPAIN_PROVINCES_PATHS_UNIFIED } from '@/components/games/data/spain-provinces-paths-unified';

export default function MapaProvinciasClient() {
    const { t } = useLanguage();
    const searchParams = useSearchParams();
    const taskId = searchParams.get('taskId');

    // Capa interactiva: Usamos la fuente unificada para evitar desdoblamientos
    // Y añadimos áreas circulares invisibles más grandes para Ceuta y Melilla
    const provinceItems = useMemo(() => {
        const items = { ...SPAIN_PROVINCES_PATHS_UNIFIED };

        // Ceuta: Círculo ampliado sobre su posición en la proyección unificada
        items.ceuta = "M 176, 541 a 12,12 0 1,0 24,0 a 12,12 0 1,0 -24,0";

        // Melilla: Círculo ampliado sobre su posición en la proyección unificada
        items.melilla = "M 310, 582 a 12,12 0 1,0 24,0 a 12,12 0 1,0 -24,0";

        return items;
    }, []);

    // Fondo: Solo vecinos y provincias individuales (SIN Spain_Outline para evitar capas dobles)
    const backgroundPaths = useMemo(() => {
        const { Spain_Outline, ...neighbors } = SPAIN_PROVINCES_NEIGHBORS_PATHS;
        return {
            ...neighbors,
            ...SPAIN_PROVINCES_PATHS_UNIFIED,
        };
    }, []);

    // Colores por Comunidad Autónoma
    const provinceColors = useMemo(() => ({
        // Andalucía (Verde)
        almeria: '#dcfce7', cadiz: '#dcfce7', cordoba: '#dcfce7', granada: '#dcfce7', huelva: '#dcfce7', jaen: '#dcfce7', malaga: '#dcfce7', sevilla: '#dcfce7',
        // Aragón (Rojo)
        huesca: '#fee2e2', teruel: '#fee2e2', zaragoza: '#fee2e2',
        // Asturias (Azul)
        asturias: '#dbeafe',
        // Baleares (Amarillo)
        baleares: '#fef3c7',
        // Canarias (Naranja)
        santacruz: '#ffedd5', laspalmas: '#ffedd5',
        // Cantabria (Rosa)
        cantabria: '#fce7f3',
        // Castilla-La Mancha (Morado)
        albacete: '#f3e8ff', ciudadreal: '#f3e8ff', cuenca: '#f3e8ff', guadalajara: '#f3e8ff', toledo: '#f3e8ff',
        // Castilla y León (Índigo)
        avila: '#e0e7ff', burgos: '#e0e7ff', leon: '#e0e7ff', palencia: '#e0e7ff', salamanca: '#e0e7ff', segovia: '#e0e7ff', soria: '#e0e7ff', valladolid: '#e0e7ff', zamora: '#e0e7ff',
        // Cataluña (Rosa fuerte/Rose)
        barcelona: '#ffe4e6', girona: '#ffe4e6', lleida: '#ffe4e6', tarragona: '#ffe4e6',
        // Comunidad Valenciana (Cian/Teal)
        alicante: '#ccfbf1', castellon: '#ccfbf1', valencia: '#ccfbf1',
        // Extremadura (Esmeralda)
        badajoz: '#ecfdf5', caceres: '#ecfdf5',
        // Galicia (Cielo)
        coruna: '#e0f2fe', lugo: '#e0f2fe', ourense: '#e0f2fe', pontevedra: '#e0f2fe', acoruna: '#e0f2fe',
        // Madrid (Gris pizarra)
        madrid: '#e2e8f0',
        // Murcia (Naranja suave)
        murcia: '#fff7ed',
        // Navarra (Azul claro)
        navarra: '#eff6ff',
        // País Vasco (Verde suave)
        alava: '#dcfce7', gipuzkoa: '#dcfce7', bizkaia: '#dcfce7',
        // La Rioja (Violeta)
        larioja: '#f5f3ff',
        // Ceuta y Melilla
        ceuta: '#f8fafc', melilla: '#f8fafc'
    }), []);

    // Etiquetas de Mares y Océanos
    const environmentalLabels = useMemo(() => [
        { id: 'mar-cantabrico', name: 'Mar Cantábrico', x: 243, y: 20, className: 'fill-sky-800/40 italic font-medium', fontSize: '13px' },
        { id: 'mar-mediterraneo', name: 'Mar Mediterráneo', x: 580, y: 418, className: 'fill-sky-800/40 italic font-medium', fontSize: '13px' },
        { id: 'oceano-atlantico-1', name: 'Océano Atlántico', x: -128, y: 240, className: 'fill-sky-900/40 italic font-medium', fontSize: '13px' },
    ], []);

    const backgroundTransforms = {
        santacruz: "translate(243.5, -416)",
        laspalmas: "translate(243.5, -416)",
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
                backgroundLabels={environmentalLabels}
                backgroundTransforms={backgroundTransforms}
                customColors={provinceColors}
                nameMapping={PROVINCE_NAMES}
                theme="light"
                insetFrame={{ x: -228, y: 475, width: 280, height: 144 }}
                viewBox="-270 -35 970 700"
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
