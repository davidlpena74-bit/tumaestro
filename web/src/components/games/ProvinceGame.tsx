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

        // Merge Canarias
        p['canarias'] = [
            ...(SPANISH_PROVINCES_PATHS['santacruz'] || []),
            ...(SPANISH_PROVINCES_PATHS['laspalmas'] || [])
        ];
        delete (p as any)['santacruz'];
        delete (p as any)['laspalmas'];

        n['canarias'] = language === 'es' ? "Canarias" : "Canary Islands";
        delete (n as any)['santacruz'];
        delete (n as any)['laspalmas'];

        return { paths: p, names: n };
    }, [language]);

    return (
        <MapGameTemplate
            title={language === 'es' ? "Provincias de España" : "Provinces of Spain"}
            description={language === 'es'
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
                regionId: 'canarias',
                transform: "translate(10, 586) scale(1.5) translate(-565, -471)"
            }}
            specialTransforms={{
                ceuta: "translate(188, 541) scale(3) translate(-188, -541)",
                melilla: "translate(322, 582) scale(3) translate(-322, -582)"
            }}
            activityId={activityId}
        />
    );
}
