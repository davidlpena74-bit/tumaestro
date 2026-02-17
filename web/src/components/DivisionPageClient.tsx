'use client';

import DivisionGame from '@/components/games/DivisionGame';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from '@phosphor-icons/react';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function DivisionPageClient() {
    const searchParams = useSearchParams();
    const taskId = searchParams.get('taskId');
    const [tooltipOpen, setTooltipOpen] = useState(false);
    return (
        <main className="min-h-screen bg-transparent pt-24 pb-12 px-4 relative overflow-hidden">

            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[10%] right-[10%] w-[500px] h-[500px] bg-orange-600/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[10%] left-[10%] w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex items-center gap-6 mb-12">
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

                    <div className="flex-1">
                        <h1 className="text-4xl md:text-6xl font-black text-slate-800 mb-2">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-yellow-400">Reparto de Pizzas</span> 🍕
                        </h1>
                        <p className="text-xl text-slate-700 max-w-2xl">
                            Ayuda a repartir las pizzas equitativamente entre los amigos. ¡Aprende a dividir jugando!
                        </p>
                    </div>
                </div>

                <DivisionGame taskId={taskId} />
            </div>
        </main>
    );
}
