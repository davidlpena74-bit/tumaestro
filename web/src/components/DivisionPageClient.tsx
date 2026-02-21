'use client';

import DivisionGame from '@/components/games/DivisionGame';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { useSearchParams } from 'next/navigation';

export default function DivisionPageClient() {
    const searchParams = useSearchParams();
    const taskId = searchParams.get('taskId');

    return (
        <PhysicalGameLayout
            title="Reparto de Pizzas 🍕"
            description="Ayuda a repartir las pizzas equitativamente entre los amigos. ¡Aprende a dividir jugando!"
            colorTheme="yellow"
            activityId="divisiones"
        >
            <DivisionGame taskId={taskId} activityId="divisiones" />
        </PhysicalGameLayout>
    );
}

