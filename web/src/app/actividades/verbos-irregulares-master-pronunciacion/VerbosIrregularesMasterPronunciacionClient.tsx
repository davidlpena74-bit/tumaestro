'use client';

import IrregularVerbsMasterGame from '@/components/games/IrregularVerbsMasterGame';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';

export default function VerbosIrregularesMasterPronunciacionClient() {
    const { t } = useLanguage();
    const searchParams = useSearchParams();
    const taskId = searchParams.get('taskId');

    return (
        <PhysicalGameLayout
            title="Verbos Irregulares MASTER"
            description={t.gamesPage.gameTitles.verbsPronunciationDesc}
            colorTheme="yellow"
        >
            <IrregularVerbsMasterGame taskId={taskId} type="pronunciation" />
        </PhysicalGameLayout>
    );
}
