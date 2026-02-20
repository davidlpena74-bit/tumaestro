'use client';

import IrregularVerbsGame from '@/components/games/IrregularVerbsGame';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from '@phosphor-icons/react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';

export default function VerbosIrregularesClient() {
    const { t } = useLanguage();
    const searchParams = useSearchParams();
    const taskId = searchParams.get('taskId');

    return (
        <PhysicalGameLayout
            title="Verbos Irregulares MEDIO"
            description={t.gamesPage.gameTitles.verbsDesc}
            colorTheme="rose"
            activityId="verbos-irregulares"
        >
            <IrregularVerbsGame taskId={taskId} type="writing" activityId="verbos-irregulares" />
        </PhysicalGameLayout>
    );
}
