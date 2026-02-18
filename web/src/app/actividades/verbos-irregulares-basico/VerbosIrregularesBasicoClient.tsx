'use client';

import IrregularVerbsBasicGame from '@/components/games/IrregularVerbsBasicGame';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';

export default function VerbosIrregularesBasicoClient() {
    const { t } = useLanguage();
    const searchParams = useSearchParams();
    const taskId = searchParams.get('taskId');

    return (
        <PhysicalGameLayout
            title="Verbos Irregulares BÁSICO"
            description="Comienza tu camino con los 25 verbos más fundamentales del inglés."
            colorTheme="rose"
        >
            <IrregularVerbsBasicGame taskId={taskId} type="writing" />
        </PhysicalGameLayout>
    );
}
