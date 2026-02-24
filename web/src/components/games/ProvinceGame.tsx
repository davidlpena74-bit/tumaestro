'use client';

import MapGameTemplate from './MapGameTemplate';
import { SPANISH_PROVINCES_PATHS, PROVINCE_NAMES } from './spanish-provinces';
import { useLanguage } from '@/context/LanguageContext';
import { MapPin } from 'lucide-react';
import { useMemo } from 'react';

export default function ProvinceGame({ taskId = null, activityId }: { taskId?: string | null, activityId?: string }) {
    const { language, t } = useLanguage();

    const { paths, names } = useMemo(() => {
        const p = { ...SPANISH_PROVINCES_PATHS };
        const n = { ...PROVINCE_NAMES };

        return { paths: p, names: n };
    }, [language]);

    const canariaTransform = "translate(10, 586) scale(1.5) translate(-565, -471)";

    return (
        <MapGameTemplate
            title={true ? "Provincias de España" : "Provinces of Spain"}
            description={true
                ? "¿Eres capaz de ubicar las 50 provincias y las 2 ciudades autónomas?"
                : "Can you locate the 50 provinces and the 2 autonomous cities?"}
            regionName={t.gamesPage.regions.spain}
            pathData={paths}
            nameMapping={names}
            viewBox="-140 0 840 700"
            initialTime={180}
            colorTheme="teal"
            icon={<MapPin className="w-8 h-8" />}
            svgTransform="translateY(1cm)"
            taskId={taskId}
            insetBox={{
                x: -102,
                y: 522,
                width: 224,
                height: 128,
                regionId: 'santacruz',
                transform: canariaTransform
            }}
            specialTransforms={{
                laspalmas: canariaTransform,
                ceuta: "translate(188, 541) scale(3) translate(-188, -541)",
                melilla: "translate(322, 582) scale(3) translate(-322, -582)"
            }}
            activityId={activityId || "mapa-provincias"}
        />
    );
}
