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
            title={t.gamesPage.gameTitles.verbsPronunciation}
            description={t.gamesPage.gameTitles.verbsDesc}
            colorTheme="rose"
            activityId="verbos-irregulares-pronunciacion"
        >
            <IrregularVerbsGame taskId={taskId} type="pronunciation" activityId="verbos-irregulares-pronunciacion" />
        </PhysicalGameLayout>
    );
}
