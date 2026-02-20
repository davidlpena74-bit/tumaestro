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
            description={t.gamesPage.gameTitles.verbsDesc}
            colorTheme="rose"
            activityId="verbos-irregulares-master"
        >
            <IrregularVerbsMasterGame taskId={taskId} type="writing" activityId="verbos-irregulares-master" />
        </PhysicalGameLayout>
    );
}
