
'use client';

import CapitalGame from '@/components/games/CapitalGame';
import { EUROPE_PATHS } from '@/components/games/data/europe-paths';
import { EUROPE_CAPITALS_COORDS } from '@/components/games/data/europe-capitals-coords';
import { EU_MEMBERS_LIST, EU_MEMBERS_LIST_EN } from '@/components/games/data/capitals-data';
import { useLanguage } from '@/context/LanguageContext';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { MapPin } from 'lucide-react';

export default function CapitalesUeClient() {
    const { t, language } = useLanguage();
    const searchParams = useSearchParams();
    const taskId = searchParams.get('taskId');

    const targetList = useMemo(() =>
        language === 'es' ? EU_MEMBERS_LIST : EU_MEMBERS_LIST_EN
        , [language]);

    return (
        <PhysicalGameLayout
            title={t.gamesPage.gameTitles.euCapitalsMap}
            description={t.gamesPage.gameTitles.euCapitalsMapDesc}
            colorTheme="emerald"
            activityId="capitales-ue"
        >
            <CapitalGame
                activityId="capitales-ue"
                taskId={taskId}
                paths={EUROPE_PATHS}
                centroids={EUROPE_CAPITALS_COORDS}
                targetList={targetList}
                title={t.gamesPage.gameTitles.euCapitalsMap}
                description={t.gamesPage.gameTitles.euCapitalsMapDesc}
                initialPan={{ x: 50, y: -170 }}
                initialZoom={1.98}
                colorTheme="emerald"
                icon={<MapPin className="w-8 h-8 text-white" />}
            />
        </PhysicalGameLayout>
    );
}
