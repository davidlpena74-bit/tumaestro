
'use client';

import PhysicalMapGame from '@/components/games/PhysicalMapGame';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { ASIA_MOUNTAINS_PATHS } from '@/components/games/data/asia-physical-paths';
import { ASIA_PATHS } from '@/components/games/data/asia-paths';
import { useLanguage } from '@/context/LanguageContext';
import { useSearchParams } from 'next/navigation';

export default function MontanasAsiaClient() {
    const { t } = useLanguage();
    const searchParams = useSearchParams();
    const taskId = searchParams.get('taskId');

    return (
        <PhysicalGameLayout
            title={t.gamesPage.gameTitles.mountainsAsia}
            description={t.gamesPage.gameTitles.mountainsAsiaDesc}
            colorTheme="emerald"
        >
            <PhysicalMapGame
                title={t.gamesPage.gameTitles.mountainsAsia}
                description={t.gamesPage.gameTitles.mountainsAsiaDesc}
                items={ASIA_MOUNTAINS_PATHS}
                itemType="line"
                backgroundPaths={ASIA_PATHS}
                viewBox="0 0 800 600"
                initialZoom={1.2}
                initialPan={{ x: -40, y: -40 }}
                colorTheme="emerald"
                taskId={taskId}
            />
        </PhysicalGameLayout>
    );
}
