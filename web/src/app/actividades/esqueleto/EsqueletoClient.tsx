'use client';

import HumanSkeletonGame from '@/components/games/HumanSkeletonGame';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { useSearchParams } from 'next/navigation';

export default function EsqueletoClient() {
    const searchParams = useSearchParams();
    const taskId = searchParams.get('taskId');

    return (
        <PhysicalGameLayout
            title="El Esqueleto Humano 💀"
            description="Descubre los principales huesos de nuestro cuerpo. Ubica cada pieza en el sistema óseo para completar el desafío. Arrastra cada etiqueta para conectarla con su hueso correspondiente. Si te equivocas, la línea no se fijará."
            colorTheme="blue"
            activityId="esqueleto"
        >
            <HumanSkeletonGame taskId={taskId} activityId="esqueleto" />
        </PhysicalGameLayout>
    );
}

