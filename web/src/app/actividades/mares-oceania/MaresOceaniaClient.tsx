
'use client';

import PhysicalMapGame from '@/components/games/PhysicalMapGame';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { OCEANIA_SEAS_PATHS } from '@/components/games/data/oceania-physical-paths';
import { OCEANIA_PATHS } from '@/components/games/data/oceania-paths';
import { useLanguage } from '@/context/LanguageContext';
import { useSearchParams } from 'next/navigation';

export default function MaresOceaniaClient() {
    const { t } = useLanguage();
    const searchParams = useSearchParams();
    const taskId = searchParams.get('taskId');

    return (
        <PhysicalGameLayout
            title={t.gamesPage.gameTitles.oceansOceania}
            description={t.gamesPage.gameTitles.oceansOceaniaDesc}
            colorTheme="blue"
            activityId="mares-oceania"
        >
            <PhysicalMapGame
                title={t.gamesPage.gameTitles.oceansOceania}
                description={t.gamesPage.gameTitles.oceansOceaniaDesc}
                items={OCEANIA_SEAS_PATHS}
                itemType="polygon"
                backgroundPaths={OCEANIA_PATHS}
                viewBox="0 0 800 600"
                elevationHeight={2}
                taskId={taskId}
                activityId="mares-oceania"
                colorTheme="emerald"
            />
        </PhysicalGameLayout>
    );
}
