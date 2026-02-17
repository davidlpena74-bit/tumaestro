'use client';

import IrregularVerbsMasterGame from '@/components/games/IrregularVerbsMasterGame';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';

export default function VerbosIrregularesMasterClient() {
    const { t } = useLanguage();
    const searchParams = useSearchParams();
    const taskId = searchParams.get('taskId');

    return (
        <PhysicalGameLayout
            title="Verbos Irregulares MASTER"
            description="El desafío máximo: 150 verbos irregulares para dominar el inglés como un nativo."
            colorTheme="rose"
        >
            <IrregularVerbsMasterGame taskId={taskId} />
        </PhysicalGameLayout>
    );
}
