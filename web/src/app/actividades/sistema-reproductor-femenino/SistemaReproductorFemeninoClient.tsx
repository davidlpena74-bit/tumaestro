'use client';

import FemaleReproductiveGame from '@/components/games/FemaleReproductiveGame';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { useLanguage } from '@/context/LanguageContext';
import { useSearchParams } from 'next/navigation';

export default function SistemaReproductorFemeninoClient() {
    const searchParams = useSearchParams();
    const taskId = searchParams.get('taskId');
    const { t } = useLanguage();

    return (
        <PhysicalGameLayout
            title={t.gamesPage.gameTitles.femaleReproductive}
            description={`${t.gamesPage.gameTitles.femaleReproductiveDesc}. Arrastra cada etiqueta para conectarla con su ubicación correspondiente en el diagrama frontal.`}
            colorTheme="blue"
            activityId="sistema-reproductor-femenino"
        >
            <FemaleReproductiveGame taskId={taskId} activityId="sistema-reproductor-femenino" />
        </PhysicalGameLayout>
    );
}

