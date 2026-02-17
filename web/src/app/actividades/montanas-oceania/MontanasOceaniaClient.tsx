
'use client';

import PhysicalMapGame from '@/components/games/PhysicalMapGame';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { OCEANIA_MOUNTAINS_PATHS } from '@/components/games/data/oceania-physical-paths';
import { OCEANIA_PATHS } from '@/components/games/data/oceania-paths';
import { useLanguage } from '@/context/LanguageContext';
import { useSearchParams } from 'next/navigation';

export default function MontanasOceaniaClient() {
    const { t } = useLanguage();
    const searchParams = useSearchParams();
    const taskId = searchParams.get('taskId');

    return (
        <PhysicalGameLayout
            title={t.gamesPage.gameTitles.mountainsOceania}
            description={t.gamesPage.gameTitles.mountainsOceaniaDesc}
            colorTheme="emerald"
        >
            <PhysicalMapGame
                title={t.gamesPage.gameTitles.mountainsOceania}
                description={t.gamesPage.gameTitles.mountainsOceaniaDesc}
                items={OCEANIA_MOUNTAINS_PATHS}
                itemType="line"
                backgroundPaths={OCEANIA_PATHS}
                viewBox="0 0 800 600"
                colorTheme="emerald"
                elevationHeight={2}
                taskId={taskId}
            />
        </PhysicalGameLayout>
    );
}
