'use client';

import PlantCellGame from '@/components/games/PlantCellGame';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { useSearchParams } from 'next/navigation';

export default function CelulaVegetalClient() {
    const searchParams = useSearchParams();
    const taskId = searchParams.get('taskId');

    return (
        <PhysicalGameLayout
            title="La Célula Vegetal 🌿"
            description="Explora la estructura de la célula vegetal. Identifica la pared celular, los cloroplastos y otros orgánulos clave arrastrando las etiquetas a su lugar correcto."
            colorTheme="emerald"
            activityId="celula-vegetal"
        >
            <PlantCellGame taskId={taskId} activityId="celula-vegetal" />
        </PhysicalGameLayout>
    );
}

