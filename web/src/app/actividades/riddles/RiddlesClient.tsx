'use client';

import QuizGame from '@/components/games/QuizGame';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from '@phosphor-icons/react';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { RIDDLES_QUESTIONS } from '@/components/games/data/riddles-questions';
import { useLanguage } from '@/context/LanguageContext';

export default function RiddlesClient() {
    const searchParams = useSearchParams();
    const taskId = searchParams.get('taskId');
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const { t } = useLanguage();

    return (
        <main className="min-h-screen bg-transparent text-white pt-24 pb-8 px-4 md:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <div className="flex items-center gap-6 mb-6">
                        <div className="relative w-fit flex-shrink-0">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onMouseEnter={() => setTooltipOpen(true)}
                                onMouseLeave={() => setTooltipOpen(false)}
                                onClick={() => window.location.href = '/actividades'}
                                className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg border border-slate-200 text-slate-500 hover:text-amber-600 hover:border-amber-200 transition-all z-20 cursor-pointer"
                            >
                                <ArrowLeft size={24} weight="bold" />
                                <AnimatePresence>
                                    {tooltipOpen && (
                                        <motion.span
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -10 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute left-full ml-4 px-3 py-1.5 bg-slate-800 text-white text-[10px] font-black rounded-lg whitespace-nowrap shadow-xl pointer-events-none z-50 uppercase tracking-wider border border-white/10"
                                        >
                                            {t.common.back}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </motion.button>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-slate-800">
                            Adivinanzas Mágicas
                        </h1>
                    </div>
                    <p className="text-slate-700 font-medium text-lg max-w-2xl mb-8 leading-relaxed">
                        Pon a prueba tu ingenio con acertijos y adivinanzas clásicas. ¿Cuántas podrás resolver?
                    </p>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-1 md:p-8 border border-white/10 shadow-2xl">
                    <QuizGame
                        taskId={taskId}
                        customQuestions={RIDDLES_QUESTIONS}
                        title="Reto de Adivinanzas"
                        gameTypeLabel="Lógica"
                    />
                </div>
            </div>
        </main>
    );
}
