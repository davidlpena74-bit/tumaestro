'use client';

import HumanMusclesGame from '@/components/games/HumanMusclesGame';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { useSearchParams } from 'next/navigation';

export default function MusculosClient() {
    const searchParams = useSearchParams();
    const taskId = searchParams.get('taskId');

    return (
        <PhysicalGameLayout
            title="Los Músculos del Cuerpo 💪"
            description="Pon a prueba tus conocimientos sobre el sistema muscular. ¿Puedes identificar los principales músculos del cuerpo humano? Arrastra cada etiqueta para conectarla con su músculo correspondiente. Si te equivocas, la línea no se fijará."
            colorTheme="rose"
            activityId="musculos"
        >
            <HumanMusclesGame taskId={taskId} activityId="musculos" />
        </PhysicalGameLayout>
    );
}

