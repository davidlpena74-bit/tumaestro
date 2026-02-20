
'use client';

import PhysicalMapGame from '@/components/games/PhysicalMapGame';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { ASIA_SEAS_PATHS } from '@/components/games/data/asia-physical-paths';
import { ASIA_PATHS } from '@/components/games/data/asia-paths';
import { useLanguage } from '@/context/LanguageContext';
import { useSearchParams } from 'next/navigation';

export default function MaresAsiaClient() {
    const { t } = useLanguage();
    const searchParams = useSearchParams();
    const taskId = searchParams.get('taskId');

    return (
        <PhysicalGameLayout
            title={t.gamesPage.gameTitles.oceansAsia}
            description={t.gamesPage.gameTitles.oceansAsiaDesc}
            colorTheme="blue"
            activityId="mares-asia"
        >
            <PhysicalMapGame
                title={t.gamesPage.gameTitles.oceansAsia}
                description={t.gamesPage.gameTitles.oceansAsiaDesc}
                items={ASIA_SEAS_PATHS}
                itemType="polygon"
                backgroundPaths={ASIA_PATHS}
                viewBox="0 0 800 600"
                elevationHeight={2}
                taskId={taskId}
                initialZoom={1.2}
                initialPan={{ x: -40, y: -40 }}
                activityId="mares-asia"
            />
        </PhysicalGameLayout>
    );
}
