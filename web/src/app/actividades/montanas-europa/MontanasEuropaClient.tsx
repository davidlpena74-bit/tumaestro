
'use client';

import PhysicalMapGame from '@/components/games/PhysicalMapGame';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { EUROPE_MOUNTAINS_PATHS } from '@/components/games/data/europe-physical-paths';
import { EUROPE_PATHS } from '@/components/games/data/europe-paths';
import { useLanguage } from '@/context/LanguageContext';
import { useSearchParams } from 'next/navigation';

export default function MontanasEuropaClient() {
    const { t } = useLanguage();
    const searchParams = useSearchParams();
    const taskId = searchParams.get('taskId');

    return (
        <PhysicalGameLayout
            title={t.gamesPage.gameTitles.mountainsEurope}
            description={t.gamesPage.gameTitles.mountainsEuropeDesc}
            colorTheme="emerald"
        >
            <PhysicalMapGame
                title={t.gamesPage.gameTitles.mountainsEurope}
                description={t.gamesPage.gameTitles.mountainsEuropeDesc}
                items={EUROPE_MOUNTAINS_PATHS}
                itemType="line"
                backgroundPaths={EUROPE_PATHS}
                viewBox="0 0 800 600"
                initialZoom={1.94}
                initialPan={{ x: -160, y: -230 }}
                elevationHeight={2}
                taskId={taskId}
                colorTheme="emerald"
            />
        </PhysicalGameLayout>
    );
}
