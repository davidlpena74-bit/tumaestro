'use client';

import MaleReproductiveGame from '@/components/games/MaleReproductiveGame';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { useLanguage } from '@/context/LanguageContext';
import { useSearchParams } from 'next/navigation';

export default function SistemaReproductorMasculinoClient() {
    const searchParams = useSearchParams();
    const taskId = searchParams.get('taskId');
    const { t } = useLanguage();

    return (
        <PhysicalGameLayout
            title={t.gamesPage.gameTitles.maleReproductive}
            description={`${t.gamesPage.gameTitles.maleReproductiveDesc}. Arrastra cada etiqueta para conectarla con su ubicación correspondiente. Si te equivocas, la línea no se fijará.`}
            colorTheme="blue"
            activityId="sistema-reproductor-masculino"
        >
            <MaleReproductiveGame taskId={taskId} activityId="sistema-reproductor-masculino" />
        </PhysicalGameLayout>
    );
}

