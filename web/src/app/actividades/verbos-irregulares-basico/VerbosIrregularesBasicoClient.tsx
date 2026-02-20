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
            description={t.gamesPage.gameTitles.verbsDesc}
            colorTheme="rose"
            activityId="verbos-irregulares-basico"
        >
            <IrregularVerbsBasicGame taskId={taskId} type="writing" activityId="verbos-irregulares-basico" />
        </PhysicalGameLayout>
    );
}
