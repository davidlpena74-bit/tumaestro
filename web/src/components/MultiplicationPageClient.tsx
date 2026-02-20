'use client';

import Header from '@/components/Header';
import PageBackground from '@/components/PageBackground';
import MultiplicationGame from '@/components/games/MultiplicationGame';
import ContentWrapper from '@/components/ContentWrapper';
import { useLanguage } from '@/context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from '@phosphor-icons/react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function MultiplicationPageClient() {
    const searchParams = useSearchParams();
    const taskId = searchParams.get('taskId');
    const { t } = useLanguage();
    const [tooltipOpen, setTooltipOpen] = useState(false);

    return (
        <main className="min-h-screen">
            <Header />
            <PageBackground />

            <ContentWrapper className="pt-24 pb-12 relative z-10">
                <div className="mb-8">
                    <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8">
                        <div className="relative w-fit flex-shrink-0">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onMouseEnter={() => setTooltipOpen(true)}
                                onMouseLeave={() => setTooltipOpen(false)}
                                onClick={() => window.location.href = '/actividades'}
                                className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg border border-slate-200 text-slate-500 hover:text-emerald-600 hover:border-emerald-200 transition-all z-20 cursor-pointer"
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
                                            Volver a Actividades
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </motion.button>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex-1"
                        >
                            <h1 className="text-4xl md:text-6xl font-black text-white mb-2 tracking-tight uppercase">
                                {t.gamesPage.multiplicationGame.title}
                            </h1>
                            <p className="text-xl text-blue-300 font-medium max-w-2xl">
                                {t.gamesPage.multiplicationGame.description}
                            </p>
                        </motion.div>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <MultiplicationGame taskId={taskId} activityId="multiplicaciones" />
                </motion.div>

                {/* Info Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mt-16 grid md:grid-cols-3 gap-8"
                >
                    <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                        <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4 text-blue-400 font-bold text-xl">1</div>
                        <h3 className="text-white font-bold text-lg mb-2">Dibuja Líneas</h3>
                        <p className="text-gray-400 text-sm">Representamos cada número con un conjunto de líneas paralelas.</p>
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                        <div className="w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center mb-4 text-pink-400 font-bold text-xl">2</div>
                        <h3 className="text-white font-bold text-lg mb-2">Cruza los Factores</h3>
                        <p className="text-gray-400 text-sm">Cruzamos las líneas de ambos números para ver las intersecciones.</p>
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                        <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center mb-4 text-emerald-400 font-bold text-xl">3</div>
                        <h3 className="text-white font-bold text-lg mb-2">Cuenta los Puntos</h3>
                        <p className="text-gray-400 text-sm">El número total de puntos donde se cruzan las líneas es el resultado.</p>
                    </div>
                </motion.div>
            </ContentWrapper>
        </main>
    );
}
