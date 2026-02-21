'use client';

import AnimalCellGame from '@/components/games/AnimalCellGame';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { useSearchParams } from 'next/navigation';

export default function CelulaAnimalClient() {
    const searchParams = useSearchParams();
    const taskId = searchParams.get('taskId');

    return (
        <PhysicalGameLayout
            title="La Célula Animal 🧬"
            description="Aprende las partes fundamentales de la célula animal. Arrastra cada nombre a su posición correcta en el modelo interactivo. Arrastra cada etiqueta para conectarla con su ubicación correspondiente. Si te equivocas, la línea no se fijará."
            colorTheme="blue"
            activityId="celula-animal"
        >
            <AnimalCellGame taskId={taskId} activityId="celula-animal" />
        </PhysicalGameLayout>
    );
}

