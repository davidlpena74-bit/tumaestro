
'use client';

import PhysicalMapGame from '@/components/games/PhysicalMapGame';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { SPANISH_MOUNTAINS_PATHS } from '@/components/games/data/spanish-mountains-paths';
import { SPANISH_COMMUNITIES_PATHS } from '@/components/games/spanish-communities-paths';
import { useLanguage } from '@/context/LanguageContext';
import { useSearchParams } from 'next/navigation';

export default function MontanasEspanaClient() {
    const { t } = useLanguage();
    const searchParams = useSearchParams();
    const taskId = searchParams.get('taskId');

    return (
        <PhysicalGameLayout
            title={t.gamesPage.gameTitles.mountainsSpain}
            description={t.gamesPage.gameTitles.mountainsSpainDesc}
            colorTheme="emerald"
        >
            <PhysicalMapGame
                title={t.gamesPage.gameTitles.mountainsSpain}
                description={t.gamesPage.gameTitles.mountainsSpainDesc}
                items={SPANISH_MOUNTAINS_PATHS}
                itemType="line"
                backgroundPaths={SPANISH_COMMUNITIES_PATHS}
                viewBox="-140 0 840 700"
                colorTheme="emerald"
                taskId={taskId}
            />
        </PhysicalGameLayout>
    );
}
