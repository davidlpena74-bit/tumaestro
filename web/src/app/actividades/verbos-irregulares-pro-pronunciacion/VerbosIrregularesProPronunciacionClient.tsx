'use client';

import IrregularVerbsProGame from '@/components/games/IrregularVerbsProGame';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';

export default function VerbosIrregularesProPronunciacionClient() {
    const { t } = useLanguage();
    const searchParams = useSearchParams();
    const taskId = searchParams.get('taskId');

    return (
        <PhysicalGameLayout
            title="Verbos Irregulares PRO"
            description={t.gamesPage.gameTitles.verbsPronunciationDesc}
            colorTheme="yellow"
        >
            <IrregularVerbsProGame taskId={taskId} type="pronunciation" />
        </PhysicalGameLayout>
    );
}
