
'use client';

import ContinentsMapGame from '@/components/games/ContinentsMapGame';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { useLanguage } from '@/context/LanguageContext';
import { useSearchParams } from 'next/navigation';

export default function MapaContinentesClient() {
    const { t } = useLanguage();
    const searchParams = useSearchParams();
    const taskId = searchParams.get('taskId');

    return (
        <PhysicalGameLayout
            title="Continentes del Mundo"
            description="Actividad interactiva para identificar los continentes en el mapa global."
            colorTheme="emerald"
            activityId="mapa-continentes"
        >
            <ContinentsMapGame taskId={taskId} activityId="mapa-continentes" />
        </PhysicalGameLayout>
    );
}
