'use client';

import IrregularVerbsGame from '@/components/games/IrregularVerbsGame';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from '@phosphor-icons/react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function VerbosIrregularesClient() {
    const searchParams = useSearchParams();
    const taskId = searchParams.get('taskId');
    const [tooltipOpen, setTooltipOpen] = useState(false);
    return (
        <main className="min-h-screen bg-transparent pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col mb-8">
                    <div className="mb-6 relative w-fit">
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
                    <div>
                        <h1 className="text-4xl md:text-5xl font-black text-slate-800 mb-2">Verbos Irregulares</h1>
                        <p className="text-slate-700 font-medium text-lg">Pon a prueba tu conocimiento de los verbos irregulares en inglés.</p>
                    </div>
                </div>

                <IrregularVerbsGame taskId={taskId} />
            </div>
        </main>
    );
}
