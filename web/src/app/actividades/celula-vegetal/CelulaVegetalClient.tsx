'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from '@phosphor-icons/react';
import PlantCellGame from '@/components/games/PlantCellGame';
import { useLanguage } from '@/context/LanguageContext';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function CelulaVegetalClient() {
    const searchParams = useSearchParams();
    const taskId = searchParams.get('taskId');
    const { t } = useLanguage();
    const [tooltipOpen, setTooltipOpen] = useState(false);

    return (
        <div className="min-h-screen bg-transparent flex flex-col">
            <main className="flex-1 p-4 pt-24 pb-12 relative overflow-hidden">
                {/* Visual Glows (Template consistency) */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px]" />
                    <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-green-600/10 rounded-full blur-[100px]" />
                </div>

                <div className="relative z-10 w-full max-w-7xl mx-auto">
                    <div className="px-4 md:px-8">
                        <div className="flex items-center gap-6 mb-6">
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
                        </div>
                    </div>

                    <PlantCellGame taskId={taskId} activityId="celula-vegetal" />
                </div>
            </main>
        </div>
    );
}
