'use client';

import IrregularVerbsProGame from '@/components/games/IrregularVerbsProGame';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';

export default function VerbosIrregularesProClient() {
    const { t } = useLanguage();
    const searchParams = useSearchParams();
    const taskId = searchParams.get('taskId');

    return (
        <PhysicalGameLayout
            title="Verbos Irregulares PRO"
            description="Nivel avanzado con 100 verbos irregulares. ¡Demuestra que eres un experto!"
            colorTheme="rose"
        >
            <IrregularVerbsProGame taskId={taskId} type="writing" />
        </PhysicalGameLayout>
    );
}
