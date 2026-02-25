'use client';

import EuropeCapitalsGame from '@/components/games/EuropeCapitalsGame';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { useSearchParams } from 'next/navigation';

export default function EuropeCapitalsMatchClient() {
    const searchParams = useSearchParams();
    const taskId = searchParams.get('taskId');

    return (
        <PhysicalGameLayout
            title="Puzzle: Capitales Europa 🧩"
            description="Relaciona cada país europeo con su capital correspondiente."
            colorTheme="purple"
            activityId="capitales-europa"
        >
            <EuropeCapitalsGame taskId={taskId} activityId="capitales-europa" />
        </PhysicalGameLayout>
    );
}
