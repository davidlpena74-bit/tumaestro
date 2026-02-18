'use client';

import IrregularVerbsGame from '@/components/games/IrregularVerbsGame';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';

export default function VerbosIrregularesPronunciacionClient() {
    const { t } = useLanguage();
    const searchParams = useSearchParams();
    const taskId = searchParams.get('taskId');

    return (
        <PhysicalGameLayout
            title="Verbos Irregulares MEDIO (Voz)"
            description={t.gamesPage.gameTitles.verbsPronunciationDesc}
            colorTheme="rose"
        >
            <IrregularVerbsGame taskId={taskId} type="pronunciation" />
        </PhysicalGameLayout>
    );
}
